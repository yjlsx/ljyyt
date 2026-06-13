/**
 * 搜索和播放优化模块
 * 提供渐进式搜索、URL 预加载等功能
 */

/**
 * 渐进式搜索：谁先返回谁先显示
 * 相比原版 performSearch，不等待所有音源，而是逐步显示结果
 */
async function performSearchProgressive(query, sources) {
  const allTracks = [];
  const seenKeys = new Set();
  let completedSources = 0;
  const totalSources = sources.length;

  // 并行搜索所有音源
  const searchPromises = sources.map(async (source) => {
    const startTime = Date.now();

    try {
      // 先检查缓存
      const cached = window.searchCache?.get(query, source);
      if (cached) {
        console.log(`[Cache Hit] ${source} from cache`);
        return { source, tracks: cached, fromCache: true };
      }

      // 实际搜索
      const tracks = await fetchExternalSourceTracks(
        query,
        source,
        20,
        null
      );

      // 缓存结果
      if (window.searchCache) {
        window.searchCache.set(query, source, tracks);
      }

      // 记录性能
      const elapsed = Date.now() - startTime;
      if (window.performanceTracker) {
        window.performanceTracker.recordSearch(source, elapsed);
      }

      return { source, tracks, fromCache: false };
    } catch (error) {
      console.warn(`[${source}] Search failed:`, error);
      return { source, tracks: [], error };
    }
  });

  // 使用 Promise.allSettled 逐个处理结果
  for (const promise of searchPromises) {
    promise.then((result) => {
      if (!result || !result.tracks) return;

      // 去重并添加到总结果
      const newTracks = result.tracks.filter((track) => {
        if (!track || !track.title) return false;

        const key = makeTrackKey(track);
        if (seenKeys.has(key)) return false;

        seenKeys.add(key);
        return true;
      });

      if (newTracks.length > 0) {
        allTracks.push(...newTracks);

        // 立即渲染（如果有渲染函数）
        if (typeof renderSearchRows === 'function') {
          renderSearchRows(allTracks, activeProvider);
        }

        // 预加载前 3 首
        if (allTracks.length <= 3) {
          preloadTrackUrl(newTracks[0]);
        }
      }

      completedSources++;

      // 所有音源完成后的处理
      if (completedSources === totalSources) {
        console.log(
          `Search completed: ${allTracks.length} tracks from ${totalSources} sources`
        );

        // 预加载前 3 首的 URL
        if (window.preloadTopSearchResults) {
          preloadTopSearchResults(allTracks.slice(0, 3));
        }
      }
    });
  }

  return allTracks;
}

/**
 * 生成歌曲唯一键（用于去重）
 */
function makeTrackKey(track) {
  const normTitle = normalizeTrackText(track.title || '')
    .replace(/\s*[（(].*?[）)]\s*/g, '');
  const normArtist = normalizeTrackText(track.artist || '')
    .replace(/[\s/、，,]+/g, '/');
  return `${normTitle}|${normArtist}`;
}

/**
 * 预加载搜索结果中的前几首歌曲的播放 URL
 */
function preloadTopSearchResults(tracks) {
  if (!tracks || tracks.length === 0) return;

  const topTracks = tracks.slice(0, 3);

  topTracks.forEach((track, index) => {
    // 错开请求，避免阻塞
    setTimeout(() => {
      preloadTrackUrl(track);
    }, index * 300);
  });
}

/**
 * 预加载单个歌曲的播放 URL
 */
async function preloadTrackUrl(track) {
  if (!track) return;

  // 检查缓存
  if (window.urlCache && window.urlCache.get(track)) {
    return; // 已缓存，无需预加载
  }

  try {
    const url = await resolveExternalTrackUrl(track);

    if (url && window.urlCache) {
      window.urlCache.set(track, url);

      if (window.performanceTracker) {
        window.performanceTracker.recordPreload();
      }

      console.log(`[Preload] ${track.title} - ${track.artist}`);
    }
  } catch (error) {
    console.warn(`[Preload] Failed for ${track.title}:`, error);
  }
}

/**
 * 预加载下一首歌曲（在当前歌曲播放时调用）
 */
function preloadNextTrack() {
  if (typeof getNextTrackInQueue !== 'function') return;

  const nextTrack = getNextTrackInQueue();
  if (!nextTrack) return;

  preloadTrackUrl(nextTrack);
}

/**
 * 优化后的 URL 解析（带缓存）
 */
async function resolveTrackUrlWithCache(track) {
  if (!track) return '';

  // 1. 检查缓存
  if (window.urlCache) {
    const cached = window.urlCache.get(track);
    if (cached) {
      console.log(`[URL Cache Hit] ${track.title}`);
      return cached;
    }
  }

  // 2. 实际解析
  const startTime = Date.now();
  let url = '';
  let success = false;

  try {
    url = await resolveExternalTrackUrl(track);
    success = !!url;

    // 3. 缓存结果
    if (url && window.urlCache) {
      window.urlCache.set(track, url);
    }
  } catch (error) {
    console.warn(`[URL Resolve] Failed for ${track.title}:`, error);
  } finally {
    // 记录性能
    const elapsed = Date.now() - startTime;
    if (window.performanceTracker) {
      window.performanceTracker.recordUrlResolve(
        track.source,
        elapsed,
        success
      );
    }
  }

  return url;
}

/**
 * 获取优化建议
 */
function getPerformanceReport() {
  if (!window.performanceTracker || !window.searchCache || !window.urlCache) {
    return 'Performance modules not loaded';
  }

  const tracker = window.performanceTracker;
  const searchStats = window.searchCache.getStats();
  const urlStats = window.urlCache.getStats();
  const sourceRanking = tracker.getSourceRanking();

  const report = `
=== 性能报告 ===

搜索缓存:
  - 缓存大小: ${searchStats.size}/${searchStats.maxSize}
  - TTL: ${Math.round(searchStats.ttl / 1000)}s

URL 缓存:
  - 缓存大小: ${urlStats.size}
  - 命中率: ${urlStats.hitRate}
  - 命中次数: ${urlStats.hits}
  - 未命中: ${urlStats.misses}

性能统计:
  - 平均搜索时间: ${tracker.getAvgSearchTime()}ms
  - 预加载次数: ${tracker.getStats().preloadCount}
  - 总搜索次数: ${tracker.getStats().totalSearches}

音源排名 (按性能):
${sourceRanking
  .map(
    (s, i) =>
      `  ${i + 1}. ${s.source}: ${s.avgTime}ms, 成功率 ${s.successRate}%`
  )
  .join('\n')}

建议:
${
  urlStats.hits > 0
    ? `✅ URL 缓存工作良好，节省了 ${urlStats.hits} 次请求`
    : '⚠️ URL 缓存命中率低，考虑增加预加载'
}
${
  tracker.getStats().preloadCount > 0
    ? `✅ 已预加载 ${tracker.getStats().preloadCount} 首歌曲`
    : '💡 启用预加载可以加快播放速度'
}
  `;

  return report;
}

/**
 * 清空所有缓存
 */
function clearAllCaches() {
  if (window.searchCache) window.searchCache.clear();
  if (window.urlCache) window.urlCache.clear();
  console.log('All caches cleared');
}

// 导出到全局
if (typeof window !== 'undefined') {
  window.performSearchProgressive = performSearchProgressive;
  window.preloadTopSearchResults = preloadTopSearchResults;
  window.preloadNextTrack = preloadNextTrack;
  window.resolveTrackUrlWithCache = resolveTrackUrlWithCache;
  window.getPerformanceReport = getPerformanceReport;
  window.clearAllCaches = clearAllCaches;
}
