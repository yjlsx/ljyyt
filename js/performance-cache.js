/**
 * 搜索结果缓存
 * LRU 策略，5 分钟过期
 */
class SearchCache {
  constructor(maxSize = 100, ttl = 5 * 60 * 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  /**
   * 获取缓存
   */
  get(query, source) {
    const key = this.makeKey(query, source);
    const cached = this.cache.get(key);

    if (!cached) return null;

    // 检查过期
    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    // LRU: 移到最后
    this.cache.delete(key);
    this.cache.set(key, cached);

    return cached.data;
  }

  /**
   * 设置缓存
   */
  set(query, source, data) {
    const key = this.makeKey(query, source);

    // 超过容量，删除最旧的
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * 生成缓存键
   */
  makeKey(query, source) {
    const normalizedQuery = String(query || '')
      .toLowerCase()
      .trim();
    return `${normalizedQuery}:${source}`;
  }

  /**
   * 清空缓存
   */
  clear() {
    this.cache.clear();
  }

  /**
   * 获取缓存统计
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      ttl: this.ttl,
    };
  }
}

/**
 * 播放 URL 缓存
 * 缓存播放 URL（通常 20 分钟有效）
 */
class UrlCache {
  constructor() {
    this.cache = new Map();
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * 获取缓存的 URL
   */
  get(track) {
    const key = this.makeKey(track);
    const cached = this.cache.get(key);

    if (!cached) {
      this.misses++;
      return null;
    }

    // 检查过期
    if (cached.expiresAt && Date.now() > cached.expiresAt) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    this.hits++;
    return cached.url;
  }

  /**
   * 设置 URL 缓存
   */
  set(track, url, expiresIn = 20 * 60 * 1000) {
    const key = this.makeKey(track);
    this.cache.set(key, {
      url,
      expiresAt: Date.now() + expiresIn,
      cachedAt: Date.now(),
    });
  }

  /**
   * 生成缓存键
   */
  makeKey(track) {
    if (!track) return 'unknown';
    const source = track.source || 'unknown';
    const id = track.urlId || track.id || track.title || 'unknown';
    return `${source}:${id}`;
  }

  /**
   * 清理过期缓存
   */
  cleanup() {
    const now = Date.now();
    for (const [key, cached] of this.cache.entries()) {
      if (cached.expiresAt && now > cached.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * 获取缓存统计
   */
  getStats() {
    const total = this.hits + this.misses;
    const hitRate = total > 0 ? (this.hits / total * 100).toFixed(1) : 0;

    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: `${hitRate}%`,
    };
  }

  /**
   * 清空缓存
   */
  clear() {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }
}

/**
 * 性能追踪器
 */
class PerformanceTracker {
  constructor() {
    this.metrics = {
      searchTime: [],
      urlResolveTime: [],
      preloadCount: 0,
    };
  }

  /**
   * 记录搜索时间
   */
  recordSearch(source, time) {
    this.metrics.searchTime.push({ source, time, timestamp: Date.now() });

    // 只保留最近 100 条
    if (this.metrics.searchTime.length > 100) {
      this.metrics.searchTime.shift();
    }
  }

  /**
   * 记录 URL 解析时间
   */
  recordUrlResolve(source, time, success) {
    this.metrics.urlResolveTime.push({
      source,
      time,
      success,
      timestamp: Date.now(),
    });

    // 只保留最近 100 条
    if (this.metrics.urlResolveTime.length > 100) {
      this.metrics.urlResolveTime.shift();
    }
  }

  /**
   * 记录预加载
   */
  recordPreload() {
    this.metrics.preloadCount++;
  }

  /**
   * 获取平均搜索时间
   */
  getAvgSearchTime(source) {
    const filtered = source
      ? this.metrics.searchTime.filter((m) => m.source === source)
      : this.metrics.searchTime;

    if (filtered.length === 0) return 0;

    const sum = filtered.reduce((acc, m) => acc + m.time, 0);
    return Math.round(sum / filtered.length);
  }

  /**
   * 获取音源成功率
   */
  getSourceSuccessRate(source) {
    const filtered = this.metrics.urlResolveTime.filter(
      (m) => m.source === source
    );

    if (filtered.length === 0) return 0;

    const successCount = filtered.filter((m) => m.success).length;
    return (successCount / filtered.length * 100).toFixed(1);
  }

  /**
   * 获取统计信息
   */
  getStats() {
    return {
      avgSearchTime: this.getAvgSearchTime(),
      preloadCount: this.metrics.preloadCount,
      totalSearches: this.metrics.searchTime.length,
      totalUrlResolves: this.metrics.urlResolveTime.length,
    };
  }

  /**
   * 获取音源性能排名
   */
  getSourceRanking() {
    const sources = new Set(this.metrics.searchTime.map((m) => m.source));
    const ranking = [];

    sources.forEach((source) => {
      const avgTime = this.getAvgSearchTime(source);
      const successRate = parseFloat(this.getSourceSuccessRate(source));

      // 综合评分：成功率 / 平均时间
      const score = avgTime > 0 ? successRate / avgTime : 0;

      ranking.push({ source, avgTime, successRate, score });
    });

    // 按评分降序排序
    return ranking.sort((a, b) => b.score - a.score);
  }
}

// 导出单例
if (typeof window !== 'undefined') {
  window.searchCache = new SearchCache();
  window.urlCache = new UrlCache();
  window.performanceTracker = new PerformanceTracker();

  // 定期清理过期缓存
  setInterval(() => {
    window.urlCache.cleanup();
  }, 5 * 60 * 1000); // 每 5 分钟清理一次
}
