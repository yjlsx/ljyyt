/**
 * 性能优化集成补丁
 * 将优化功能集成到现有代码中，无需大规模重构
 */

(function() {
  'use strict';

  console.log('[Performance Patch] Loading...');

  // 等待 DOM 和原有函数加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // 1. 增强 resolveExternalTrackUrl 使用缓存
    if (typeof resolveExternalTrackUrl === 'function') {
      const originalResolve = resolveExternalTrackUrl;

      window.resolveExternalTrackUrl = async function(track) {
        // 先检查缓存
        if (window.urlCache) {
          const cached = window.urlCache.get(track);
          if (cached) {
            console.log(`[Cache Hit] ${track?.title || 'Unknown'}`);
            return cached;
          }
        }

        // 调用原函数
        const startTime = Date.now();
        try {
          const url = await originalResolve(track);

          // 缓存结果
          if (url && window.urlCache) {
            window.urlCache.set(track, url);
          }

          // 记录性能
          if (window.performanceTracker) {
            window.performanceTracker.recordUrlResolve(
              track?.source,
              Date.now() - startTime,
              !!url
            );
          }

          return url;
        } catch (error) {
          if (window.performanceTracker) {
            window.performanceTracker.recordUrlResolve(
              track?.source,
              Date.now() - startTime,
              false
            );
          }
          throw error;
        }
      };

      console.log('[Performance Patch] Enhanced resolveExternalTrackUrl with cache');
    }

    // 2. 增强 fetchExternalSourceTracks 使用缓存
    if (typeof fetchExternalSourceTracks === 'function') {
      const originalFetch = fetchExternalSourceTracks;

      window.fetchExternalSourceTracks = async function(query, source, count, signal) {
        // 先检查缓存
        if (window.searchCache) {
          const cached = window.searchCache.get(query, source);
          if (cached) {
            console.log(`[Cache Hit] ${source} search for "${query}"`);
            return cached;
          }
        }

        // 调用原函数
        const startTime = Date.now();
        try {
          const tracks = await originalFetch(query, source, count, signal);

          // 缓存结果
          if (tracks && window.searchCache) {
            window.searchCache.set(query, source, tracks);
          }

          // 记录性能
          if (window.performanceTracker) {
            window.performanceTracker.recordSearch(source, Date.now() - startTime);
          }

          return tracks;
        } catch (error) {
          if (window.performanceTracker) {
            window.performanceTracker.recordSearch(source, Date.now() - startTime);
          }
          throw error;
        }
      };

      console.log('[Performance Patch] Enhanced fetchExternalSourceTracks with cache');
    }

    // 3. 在播放时预加载下一首
    if (typeof playCurrentTrack === 'function') {
      const originalPlay = playCurrentTrack;

      window.playCurrentTrack = function() {
        const result = originalPlay.apply(this, arguments);

        // 异步预加载下一首（不阻塞播放）
        setTimeout(() => {
          if (window.preloadNextTrack) {
            window.preloadNextTrack();
          }
        }, 1000); // 播放 1 秒后开始预加载

        return result;
      };

      console.log('[Performance Patch] Enhanced playCurrentTrack with preload');
    }

    // 4. 在搜索结果渲染后预加载前 3 首
    if (typeof renderSearchRows === 'function') {
      const originalRender = renderSearchRows;
      let preloadTimer = null;

      window.renderSearchRows = function(tracks, provider) {
        const result = originalRender.apply(this, arguments);

        // 防抖：避免频繁预加载
        clearTimeout(preloadTimer);
        preloadTimer = setTimeout(() => {
          if (window.preloadTopSearchResults && tracks && tracks.length > 0) {
            window.preloadTopSearchResults(tracks.slice(0, 3));
          }
        }, 500);

        return result;
      };

      console.log('[Performance Patch] Enhanced renderSearchRows with preload');
    }

    // 5. 添加性能监控命令到控制台
    if (typeof window !== 'undefined') {
      window.showPerformanceReport = function() {
        if (window.getPerformanceReport) {
          console.log(window.getPerformanceReport());
        } else {
          console.log('Performance report not available');
        }
      };

      window.clearCaches = function() {
        if (window.clearAllCaches) {
          window.clearAllCaches();
        }
        console.log('Caches cleared');
      };

      window.showCacheStats = function() {
        if (window.searchCache && window.urlCache) {
          console.log('Search Cache:', window.searchCache.getStats());
          console.log('URL Cache:', window.urlCache.getStats());
        }
      };
    }

    console.log('[Performance Patch] Loaded successfully!');
    console.log('[Performance Patch] Try: showPerformanceReport(), showCacheStats(), clearCaches()');
  }
})();
