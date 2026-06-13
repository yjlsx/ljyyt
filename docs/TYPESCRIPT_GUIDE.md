# TypeScript + Provider 架构使用指南

## 概述

我们引入了 TypeScript 和 Provider 模式，以提高代码质量和可维护性。

## 架构说明

### 1. 类型定义（`src/types/`）

- **`music.ts`**: 核心音乐类型（Track、Playlist、Artist 等）
- **`provider.ts`**: Provider 接口和相关类型

### 2. Provider 系统（`src/providers/`）

- **`BaseProvider.ts`**: Provider 基类，提供通用功能
- **`ProviderManager.ts`**: Provider 管理器，负责聚合搜索、自动匹配
- **`NeteaseProvider.ts`**: 网易云 Provider 示例

## 快速开始

### 实现一个新的 Provider

```typescript
import { BaseProvider } from './BaseProvider';
import type { SearchResult, PlayUrlInfo, Lyric, Track } from '../types/provider';

export class MyMusicProvider extends BaseProvider {
  readonly name = 'QQ音乐' as const;

  async search(keyword: string, page = 1, limit = 20): Promise<SearchResult> {
    // 1. 调用 API
    const data = await this.fetch(`https://api.example.com/search?q=${keyword}`);
    
    // 2. 转换为标准格式
    const tracks: Track[] = data.songs.map(song => ({
      id: song.id,
      name: song.title,
      artist: song.singer,
      album: song.album,
      cover: song.cover,
      duration: song.duration,
      source: this.name,
      raw: song, // 保存原始数据
    }));

    return { tracks, total: data.total };
  }

  async getPlayUrl(track: Track): Promise<PlayUrlInfo> {
    const data = await this.fetch(`https://api.example.com/url?id=${track.id}`);
    return {
      url: data.url,
      quality: 'high',
      bitrate: data.bitrate,
    };
  }

  async getLyric(track: Track): Promise<Lyric> {
    const data = await this.fetch(`https://api.example.com/lyric?id=${track.id}`);
    return this.parseLrc(data.lrc); // 使用基类提供的 LRC 解析
  }
}
```

### 注册和使用 Provider

```typescript
import { providerManager } from './providers/ProviderManager';
import { NeteaseProvider } from './providers/NeteaseProvider';
import { MyMusicProvider } from './providers/MyMusicProvider';

// 1. 注册 Provider
providerManager.register(new NeteaseProvider());
providerManager.register(new MyMusicProvider());

// 2. 单个音源搜索
const provider = providerManager.getProvider('网易云音乐');
const result = await provider?.search('周杰伦');

// 3. 聚合搜索（所有音源）
const allResults = await providerManager.searchAll('周杰伦', 20);
console.log(`找到 ${allResults.tracks.length} 首歌`);

// 4. 自动音源匹配
const track = allResults.tracks[0];
const matches = await providerManager.autoMatch(track);
console.log(`在其他音源找到 ${matches.length} 个匹配`);

// 5. 播放 URL（带自动回退）
const playUrl = await providerManager.getPlayUrlWithFallback(track, 'auto-switch');
console.log(`播放地址: ${playUrl.url}`);
```

## 核心特性

### 1. 自动音源匹配

当一个音源播放失败时，自动从其他音源找到相同歌曲：

```typescript
// 播放失败自动切换
const playUrl = await providerManager.getPlayUrlWithFallback(track, 'auto-switch');
```

### 2. 聚合搜索

并行搜索所有音源，自动去重：

```typescript
const results = await providerManager.searchAll('关键词');
```

### 3. 相似度匹配

使用 Levenshtein 距离算法计算歌曲相似度，支持：
- 自动去除特殊字符
- 忽略大小写
- 歌名和艺术家加权计算

### 4. 统一错误处理

所有 Provider 都有：
- 请求超时（默认 10s）
- 自动重试
- 错误日志

## 与现有代码集成

### 渐进式迁移

1. **新功能用 TypeScript**：新写的代码用 `.ts` 后缀
2. **老代码保持 JavaScript**：逐步迁移，不强制
3. **类型提示**：JS 文件也能享受类型提示（通过 JSDoc）

### 在 JS 中使用 TS 模块

```javascript
// 老的 JS 代码可以直接 import TS 模块
import { providerManager } from './src/providers/ProviderManager';

// 使用
providerManager.searchAll('周杰伦').then(result => {
  console.log(result.tracks);
});
```

### 类型检查

```bash
# 运行类型检查（不会修改文件）
npm run typecheck

# 或在 package.json 添加
"scripts": {
  "typecheck": "tsc --noEmit"
}
```

## 下一步

1. ✅ TypeScript 配置完成
2. ✅ Provider 架构设计完成
3. 🔄 **进行中**: 实现具体 Provider（网易云、QQ音乐等）
4. ⏳ **待办**: 数据同步功能（Cloudflare KV）
5. ⏳ **待办**: 迁移现有 API 调用到 Provider 模式

## 示例：完整流程

```typescript
// main.ts
import { providerManager } from './src/providers/ProviderManager';
import { NeteaseProvider } from './src/providers/NeteaseProvider';

// 初始化
const netease = new NeteaseProvider({
  enabled: true,
  priority: 1,
  timeout: 10000,
});
providerManager.register(netease);

// 搜索
const searchResult = await providerManager.searchAll('七里香');

// 播放第一首歌
const track = searchResult.tracks[0];
console.log(`播放: ${track.name} - ${track.artist}`);

// 获取播放 URL（自动回退）
try {
  const playUrl = await providerManager.getPlayUrlWithFallback(track);
  // 开始播放
  audioPlayer.src = playUrl.url;
  audioPlayer.play();
} catch (error) {
  console.error('所有音源都无法播放:', error);
}

// 获取歌词
const lyric = await netease.getLyric(track);
displayLyric(lyric.lines);
```

## FAQ

**Q: 必须全部改成 TypeScript 吗？**  
A: 不需要。渐进式迁移，新代码用 TS，老代码可以保持 JS。

**Q: 会增加打包体积吗？**  
A: 不会。TypeScript 只在开发时使用，编译后还是 JavaScript。

**Q: 为什么要用 Provider 模式？**  
A: 
- 统一接口，容易添加新音源
- 代码复用（BaseProvider 提供通用功能）
- 自动匹配和回退更简单
- 更好的测试和维护

**Q: 如何调试？**  
A: 直接在浏览器 DevTools 调试，Source Map 支持完整。
