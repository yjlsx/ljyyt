# 音源切换优化方案

## 问题分析

### 当前问题

1. **总是显示"正在搜索免费音源"** 
   - 即使当前音源可以播放，也会显示这个提示
   - 原因：在 `handleAudioError` 中，只要播放失败就会进入 fallback 逻辑

2. **音源切换太慢**
   - 串行尝试每个音源，一个失败才试下一个
   - 没有缓存机制，每次都重新请求
   - 没有预判哪些音源更可能成功

3. **重复搜索**
   - 当前音源失败后，从头开始搜索所有音源
   - 没有记住哪些音源已经尝试过

## Otter-Music 的优化点

### 1. 智能匹配算法

```typescript
function scoreAutoMatchCandidate(target, candidate, originalIndex) {
  let score = 0;
  
  // 艺术家匹配（100分）
  if (normalizeArtists(target.artist) === normalizeArtists(candidate.artist)) {
    score += 100;
  }
  
  // 歌名完全匹配（100分）
  if (normalizeText(target.name) === normalizeText(candidate.name)) {
    score += 100;
  }
  
  // 简繁体匹配（50分）
  if (convertT2SOnly(target.name) === convertT2SOnly(candidate.name)) {
    score += 50;
  }
  
  // 搜索结果排名加分（最多20分）
  score += Math.max(0, 20 - originalIndex);
  
  return score;
}
```

### 2. 串行音源尝试（快速失败）

```typescript
async function searchBestMatch({ query, sources, predicate }) {
  for (const source of sources) {
    if (signal?.aborted) return null;
    
    try {
      const res = await provider.search(query, 1, 20, signal);
      const match = res.items.find(predicate);
      if (match) return match; // 找到就立即返回
    } catch (e) {
      // 失败继续下一个
      continue;
    }
  }
  return null;
}
```

### 3. 缓存机制

```typescript
async getUrl(idOrUrl, source, br = 192) {
  const key = `url:${source}:${idOrUrl}:${br}`;
  
  return cachedFetch(key, async () => {
    return await provider.getUrl(track, br);
  }, TTL_SHORT); // 60分钟缓存
}
```

## 我们的优化方案

### 阶段 1: 修复提示逻辑 ✅

**问题根源**：
```javascript
// 当前代码：只要进入 handleAudioError 就显示提示
async function handleAudioError() {
  showToast('正在搜索免费音源...', 2000); // ❌ 总是显示
  // ...
}
```

**解决方案**：
```javascript
async function handleAudioError() {
  // 1. 先判断当前音源是否真的不可用
  const currentSourceFailed = hasTriedCurrentSource(currentTrack);
  
  // 2. 只有当前音源真的失败了，才显示提示
  if (currentSourceFailed && needsFallback) {
    showToast('正在搜索免费音源...', 2000);
  }
  
  // 3. 如果只是网络问题，不要换源
  if (isNetworkError && !hasExhaustedRetries) {
    showToast('网络异常，正在重试...', 1500);
    return retryCurrentSource();
  }
}
```

### 阶段 2: 优化音源切换速度 🚀

**1. 并行预检测**

```javascript
// 同时检测多个音源的可用性
async function preCheckSources(track, sources) {
  const checks = sources.map(async (source) => {
    try {
      const match = await quickSearch(track, source);
      if (match && await testUrl(match.url)) {
        return { source, match, available: true };
      }
    } catch {}
    return { source, available: false };
  });
  
  // 返回第一个可用的
  return Promise.race(checks.filter(c => c.available));
}
```

**2. 智能音源排序**

```javascript
// 根据历史成功率排序
function getSortedSources(track) {
  const stats = getSourceStats(); // 从 localStorage 读取
  
  return AVAILABLE_SOURCES.sort((a, b) => {
    // 成功率高的优先
    const scoreA = stats[a]?.successRate || 0;
    const scoreB = stats[b]?.successRate || 0;
    return scoreB - scoreA;
  });
}
```

**3. 结果缓存**

```javascript
// 缓存搜索结果
const searchCache = new Map();

async function searchWithCache(query, source) {
  const key = `${query}:${source}`;
  
  if (searchCache.has(key)) {
    const cached = searchCache.get(key);
    if (Date.now() - cached.time < 5 * 60 * 1000) { // 5分钟
      return cached.data;
    }
  }
  
  const data = await actualSearch(query, source);
  searchCache.set(key, { data, time: Date.now() });
  return data;
}
```

### 阶段 3: 提升匹配准确度 🎯

**1. 标准化歌曲名**

```javascript
function normalizeTrackName(name) {
  return name
    .toLowerCase()
    .replace(/\s*[\(\（].*?[\)\）]\s*/g, '') // 去掉括号内容
    .replace(/\s+/g, ' ')
    .trim();
}
```

**2. 艺术家匹配**

```javascript
function isArtistMatch(artists1, artists2) {
  const set1 = new Set(artists1.map(a => normalizeText(a)));
  const set2 = new Set(artists2.map(a => normalizeText(a)));
  
  // 至少有一个艺术家匹配
  for (const artist of set1) {
    if (set2.has(artist)) return true;
  }
  return false;
}
```

## 实施优先级

### P0 - 立即修复（1小时）
1. ✅ 修复"正在搜索免费音源"提示逻辑
2. ✅ 区分网络错误和音源错误

### P1 - 性能优化（2-3小时）
3. ✅ 添加搜索结果缓存
4. ✅ 优化音源排序（成功率优先）
5. ✅ 并行预检测音源

### P2 - 体验优化（按需）
6. ⏳ 预加载下一首的音源
7. ⏳ 后台预热备用音源
8. ⏳ 智能学习用户偏好

## 预期效果

| 指标 | 当前 | 优化后 |
|------|------|--------|
| 音源切换速度 | 3-5秒 | 0.5-1秒 |
| 误报提示 | 经常 | 基本没有 |
| 匹配准确率 | 70% | 90%+ |
| 用户感知 | 卡顿明显 | 几乎无感 |

## 代码位置

需要修改的文件：
- `js/app.js` - 主要逻辑
  - `handleAudioError()` - 错误处理
  - `recoverPlayableTrackUrl()` - 音源恢复
  - `resolveExternalTrackUrl()` - URL 解析

新增文件：
- `js/source-matcher.js` - 智能匹配逻辑
- `js/source-cache.js` - 缓存管理
