import type {
  MusicProvider,
  ProviderConfig,
  SearchResult,
  PlayUrlInfo,
  Lyric,
  Track,
  AudioQuality,
  MusicSource,
} from '../types/provider';

/**
 * Provider 抽象基类
 * 提供通用功能和默认实现
 */
export abstract class BaseProvider implements MusicProvider {
  abstract readonly name: MusicSource;

  protected config: ProviderConfig;

  constructor(config: Partial<ProviderConfig> = {}) {
    this.config = {
      enabled: true,
      priority: 100,
      timeout: 10000,
      ...config,
    };
  }

  get enabled(): boolean {
    return this.config.enabled;
  }

  /**
   * 发起 HTTP 请求（带超时和错误处理）
   */
  protected async fetch<T = any>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${this.config.timeout}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * 计算歌曲相似度（用于自动匹配）
   */
  protected calculateSimilarity(track1: Track, track2: Track): number {
    const name1 = this.normalizeString(track1.name);
    const name2 = this.normalizeString(track2.name);
    const artist1 = this.normalizeString(track1.artist);
    const artist2 = this.normalizeString(track2.artist);

    // 歌名匹配度
    const nameScore = this.stringSimilarity(name1, name2);

    // 艺术家匹配度
    const artistScore = this.stringSimilarity(artist1, artist2);

    // 加权计算（歌名占 60%，艺术家占 40%）
    return nameScore * 0.6 + artistScore * 0.4;
  }

  /**
   * 字符串归一化（移除特殊字符、转小写）
   */
  protected normalizeString(str: string): string {
    return str
      .toLowerCase()
      .replace(/[\s\-_()（）【】\[\]]/g, '')
      .trim();
  }

  /**
   * 计算两个字符串的相似度（Levenshtein 距离）
   */
  protected stringSimilarity(str1: string, str2: string): number {
    if (str1 === str2) return 1;
    if (str1.length === 0 || str2.length === 0) return 0;

    const matrix: number[][] = [];

    // 初始化矩阵
    for (let i = 0; i <= str1.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str2.length; j++) {
      matrix[0][j] = j;
    }

    // 填充矩阵
    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // 删除
          matrix[i][j - 1] + 1, // 插入
          matrix[i - 1][j - 1] + cost // 替换
        );
      }
    }

    const distance = matrix[str1.length][str2.length];
    const maxLength = Math.max(str1.length, str2.length);
    return 1 - distance / maxLength;
  }

  /**
   * 解析 LRC 格式歌词
   */
  protected parseLrc(lrcText: string): Lyric {
    const lines: Lyric['lines'] = [];
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;

    lrcText.split('\n').forEach((line) => {
      const matches = [...line.matchAll(timeRegex)];
      if (matches.length === 0) return;

      const text = line.replace(timeRegex, '').trim();
      if (!text) return;

      matches.forEach((match) => {
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        const milliseconds = parseInt(match[3].padEnd(3, '0'), 10);
        const time = minutes * 60 + seconds + milliseconds / 1000;

        lines.push({ time, text });
      });
    });

    return {
      lines: lines.sort((a, b) => a.time - b.time),
      raw: lrcText,
    };
  }

  // 必须实现的抽象方法
  abstract search(
    keyword: string,
    page?: number,
    limit?: number
  ): Promise<SearchResult>;

  abstract getPlayUrl(
    track: Track,
    quality?: AudioQuality
  ): Promise<PlayUrlInfo>;

  abstract getLyric(track: Track): Promise<Lyric>;
}
