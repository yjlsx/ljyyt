# 搜索和播放速度优化方案

## 当前问题分析

### 搜索慢的原因
1. **串行请求**：虽然用了 `forEach` + `Promise`，但每个音源内部可能有多个分页请求
2. **等待所有音源**：即使一个快速音源已返回结果，UI 仍等待慢速音源
3. **无缓存**：相同搜索词重复请求
4. **GD API 限制**：每个音源请求可能需要多次分页

### 播放慢的原因
1. **获取 URL 是串行的**：点击播放后才开始请求 URL
2. **无预加载**：没有提前获取下一首的 URL
3. **回退机制慢**：音源失败后才尝试下一个

## 优化策略

### 1. 渐进式搜索结果（最快可见）

**目标**: 200ms 内显示第一批结果

```javascript
// 策略：谁先返回谁先显示
async function performSearchProgressive(query) {
  const sources = getActiveSearchSources();
  const results = [];
  
  // 并行发起所有请求，但不等待
  sources.forEach(async (source) => {
    try {
      const tracks = await fetchExternalSourceTracks(query, source, 20);
      // 立即追加到结果
      results.push(...tracks);
      renderSearchRows(deduplicateSearchResults(results));
    } catch (err) {
      console.warn(`${source} search failed:`, err);
    }
  });
}
```

### 2. 智能音源优先级（快速音源优先）

**根据历史响应时间动态调整音源顺序**

```javascript
// 记录每个音源的响应时间
const sourcePerformance = {
  'netease': { avgTime: 500, successRate: 0.95 },
  'qq': { avgTime: 800, successRate: 0.90 },
  'kuwo': { avgTime: 1200, successRate: 0.85 },
  // ...
};

function getSortedSources() {
  return sources.sort((a, b) => {
    const scoreA = sourcePerformance[a].successRate / sourcePerformance[a].avgTime;
    const scoreB = sourcePerformance[b].successRate / sourcePerformance[b].avgTime;
    return scoreB - scoreA; // 高分优先
  });
}
```

### 3. 搜索结果缓存（避免重复请求）

**LRU 缓存，5 分钟过期**

```javascript
class SearchCache {
  constructor(maxSize = 100, ttl = 5 * 60 * 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  get(query, source) {
    const key = `${query}:${source}`;
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    // LRU: 移到最后
    this.cache.delete(key);
    this.cache.set(key, cached);
    return cached.data;
  }

  set(query, source, data) {
    const key = `${query}:${source}`;
    
    // 超过容量，删除最旧的
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
}

const searchCache = new SearchCache();
```

### 4. 播放 URL 预加载（提前获取）

**在用户可能点击前就获取 URL**

```javascript
// 策略 1: 搜索结果返回时，预加载前 3 首
async function preloadTopResults(tracks) {
  const topTracks = tracks.slice(0, 3);
  
  topTracks.forEach(async (track, index) => {
    // 延迟加载，避免阻塞
    setTimeout(async () => {
      try {
        const url = await resolveExternalTrackUrl(track);
        // 缓存 URL
        urlCache.set(track, url);
      } catch (err) {
        console.warn(`Preload failed for ${track.title}`);
      }
    }, index * 200); // 错开请求
  });
}

// 策略 2: 当前播放时，预加载下一首
function preloadNextTrack() {
  const nextTrack = getNextTrackInQueue();
  if (!nextTrack) return;
  
  resolveExternalTrackUrl(nextTrack).then(url => {
    urlCache.set(nextTrack, url);
  }).catch(() => {});
}
```

### 5. URL 缓存（避免重复解析）

**播放 URL 通常有 20 分钟有效期**

```javascript
class UrlCache {
  constructor() {
    this.cache = new Map();
  }

  getKey(track) {
    return `${track.source}:${track.urlId || track.id}`;
  }

  get(track) {
    const key = this.getKey(track);
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    // 检查是否过期
    if (cached.expiresAt && Date.now() > cached.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.url;
  }

  set(track, url, expiresIn = 20 * 60 * 1000) {
    const key = this.getKey(track);
    this.cache.set(key, {
      url,
      expiresAt: Date.now() + expiresIn
    });
  }
}

const urlCache = new UrlCache();
```

### 6. 并行音源回退（同时尝试多个音源）

**不等第一个失败，直接尝试多个**

```javascript
async function resolveTrackUrlWithRace(track) {
  // 检查缓存
  const cached = urlCache.get(track);
  if (cached) return cached;

  // 获取可能的音源
  const sources = [
    { source: track.source, track: track },
    // 添加备选音源（基于相似度匹配）
  ];

  // Promise.race: 谁先成功用谁
  const promises = sources.map(async ({ source, track }) => {
    const url = await resolveExternalTrackUrl(track);
    if (!url) throw new Error('No URL');
    return { url, source };
  });

  try {
    const result = await Promise.race(promises);
    urlCache.set(track, result.url);
    return result.url;
  } catch (err) {
    // 所有都失败
    throw new Error('All sources failed');
  }
}
```

### 7. 请求合并（批量获取）

**如果 API 支持，一次请求多个 ID**

```javascript
class BatchRequester {
  constructor(batchSize = 10, delay = 50) {
    this.queue = [];
    this.batchSize = batchSize;
    this.delay = delay;
    this.timer = null;
  }

  request(track) {
    return new Promise((resolve, reject) => {
      this.queue.push({ track, resolve, reject });
      
      if (this.queue.length >= this.batchSize) {
        this.flush();
      } else if (!this.timer) {
        this.timer = setTimeout(() => this.flush(), this.delay);
      }
    });
  }

  async flush() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    const batch = this.queue.splice(0, this.batchSize);
    if (batch.length === 0) return;

    try {
      // 批量请求
      const ids = batch.map(item => item.track.urlId);
      const urls = await fetchBatchUrls(ids);
      
      batch.forEach((item, index) => {
        item.resolve(urls[index]);
      });
    } catch (err) {
      batch.forEach(item => item.reject(err));
    }
  }
}

const batchRequester = new BatchRequester();
```

## 优化效果预期

| 优化项 | 当前耗时 | 优化后 | 提升 |
|--------|---------|--------|------|
| 首批结果显示 | 1-2s | 200-500ms | **60-75% ↓** |
| 完整搜索结果 | 3-5s | 1-2s | **60% ↓** |
| 点击播放延迟 | 500-1000ms | 0-100ms（缓存命中） | **90% ↓** |
| 切换下一首 | 500-1000ms | 0-50ms（预加载） | **95% ↓** |

## 实施优先级

### Phase 1: 快速见效（1-2 小时）
1. ✅ **渐进式搜索结果** - 最快可见
2. ✅ **搜索结果缓存** - 避免重复
3. ✅ **URL 缓存** - 播放更快

### Phase 2: 体验优化（2-3 小时）
4. ✅ **播放 URL 预加载** - 下一首秒播
5. ✅ **智能音源优先级** - 快速音源优先
6. ✅ **并行音源回退** - 不等失败

### Phase 3: 进阶优化（按需）
7. ⏳ **请求合并** - 批量获取（需 API 支持）
8. ⏳ **ServiceWorker 缓存** - 离线支持

## 代码实现位置

```
js/
├── app.js
│   ├── performSearch() ← 修改为渐进式
│   ├── searchExternalSource() ← 添加缓存
│   ├── resolveExternalTrackUrl() ← 添加缓存和预加载
│   └── playCurrentTrack() ← 添加预加载下一首
└── (新文件)
    ├── search-cache.js ← 搜索缓存
    ├── url-cache.js ← URL 缓存
    └── performance-tracker.js ← 性能追踪
```

## 监控指标

```javascript
// 添加性能监控
const performanceMetrics = {
  searchTime: [],
  urlResolveTime: [],
  cacheHitRate: 0,
  
  recordSearch(time) {
    this.searchTime.push(time);
    console.log(`Search: ${time}ms, Avg: ${this.getAvgSearchTime()}ms`);
  },
  
  getAvgSearchTime() {
    if (this.searchTime.length === 0) return 0;
    return this.searchTime.reduce((a, b) => a + b) / this.searchTime.length;
  }
};
```
