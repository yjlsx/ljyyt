import type {
  MusicProvider,
  ProviderManager,
  SearchResult,
  PlayUrlInfo,
  MatchResult,
  FallbackStrategy,
  MusicSource,
} from '../types/provider';
import type { Track } from '../types/music';

/**
 * Provider 管理器实现
 * 负责管理所有音源 Provider，提供聚合搜索、自动匹配等功能
 */
export class ProviderManagerImpl implements ProviderManager {
  private providers = new Map<MusicSource, MusicProvider>();

  /**
   * 注册 Provider
   */
  register(provider: MusicProvider): void {
    this.providers.set(provider.name, provider);
    console.log(`[ProviderManager] Registered: ${provider.name}`);
  }

  /**
   * 获取 Provider
   */
  getProvider(name: MusicSource): MusicProvider | undefined {
    return this.providers.get(name);
  }

  /**
   * 获取所有启用的 Provider
   */
  getEnabledProviders(): MusicProvider[] {
    return Array.from(this.providers.values()).filter((p) => p.enabled);
  }

  /**
   * 聚合搜索（并行搜索所有音源）
   */
  async searchAll(keyword: string, limit = 20): Promise<SearchResult> {
    const providers = this.getEnabledProviders();

    // 并行搜索所有音源
    const results = await Promise.allSettled(
      providers.map((provider) =>
        provider.search(keyword, 1, limit).catch((error) => {
          console.warn(`[${provider.name}] Search failed:`, error);
          return { tracks: [], total: 0 };
        })
      )
    );

    // 合并结果
    const allTracks: Track[] = [];
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        allTracks.push(...result.value.tracks);
      }
    });

    // 去重（基于歌名+艺术家）
    const uniqueTracks = this.deduplicateTracks(allTracks);

    return {
      tracks: uniqueTracks.slice(0, limit),
      total: uniqueTracks.length,
      hasMore: uniqueTracks.length > limit,
    };
  }

  /**
   * 自动匹配：从其他音源找到相同歌曲
   */
  async autoMatch(track: Track): Promise<MatchResult[]> {
    const providers = this.getEnabledProviders().filter(
      (p) => p.name !== track.source
    );

    const keyword = `${track.name} ${track.artist}`;
    const results: MatchResult[] = [];

    // 并行搜索所有其他音源
    await Promise.allSettled(
      providers.map(async (provider) => {
        try {
          const searchResult = await provider.search(keyword, 1, 10);

          // 找到最相似的歌曲
          for (const matched of searchResult.tracks) {
            const score = this.calculateSimilarity(track, matched);

            // 相似度大于 0.8 才认为是同一首歌
            if (score > 0.8) {
              results.push({
                original: track,
                matched,
                score,
                source: provider.name,
              });
            }
          }
        } catch (error) {
          console.warn(`[${provider.name}] Auto match failed:`, error);
        }
      })
    );

    // 按相似度排序
    return results.sort((a, b) => b.score - a.score);
  }

  /**
   * 获取播放 URL（带回退）
   */
  async getPlayUrlWithFallback(
    track: Track,
    strategy: FallbackStrategy = 'auto-switch'
  ): Promise<PlayUrlInfo> {
    const provider = this.getProvider(track.source);
    if (!provider) {
      throw new Error(`Provider not found: ${track.source}`);
    }

    try {
      // 尝试获取原音源的播放 URL
      return await provider.getPlayUrl(track);
    } catch (error) {
      console.warn(`[${track.source}] Get play URL failed:`, error);

      // 根据策略处理
      if (strategy === 'auto-switch') {
        // 自动切换到其他音源
        const matches = await this.autoMatch(track);

        for (const match of matches) {
          const fallbackProvider = this.getProvider(match.source);
          if (!fallbackProvider) continue;

          try {
            const playUrl = await fallbackProvider.getPlayUrl(match.matched);
            console.log(
              `[Fallback] Switched from ${track.source} to ${match.source}`
            );
            return playUrl;
          } catch (fallbackError) {
            console.warn(`[${match.source}] Fallback failed:`, fallbackError);
          }
        }
      }

      // 所有回退都失败，抛出原始错误
      throw error;
    }
  }

  /**
   * 去重（基于歌名+艺术家）
   */
  private deduplicateTracks(tracks: Track[]): Track[] {
    const seen = new Set<string>();
    const result: Track[] = [];

    for (const track of tracks) {
      const key = this.normalizeString(`${track.name}-${track.artist}`);
      if (!seen.has(key)) {
        seen.add(key);
        result.push(track);
      }
    }

    return result;
  }

  /**
   * 计算歌曲相似度
   */
  private calculateSimilarity(track1: Track, track2: Track): number {
    const name1 = this.normalizeString(track1.name);
    const name2 = this.normalizeString(track2.name);
    const artist1 = this.normalizeString(track1.artist);
    const artist2 = this.normalizeString(track2.artist);

    const nameScore = this.stringSimilarity(name1, name2);
    const artistScore = this.stringSimilarity(artist1, artist2);

    return nameScore * 0.6 + artistScore * 0.4;
  }

  /**
   * 字符串归一化
   */
  private normalizeString(str: string): string {
    return str
      .toLowerCase()
      .replace(/[\s\-_()（）【】\[\]]/g, '')
      .trim();
  }

  /**
   * 计算字符串相似度
   */
  private stringSimilarity(str1: string, str2: string): number {
    if (str1 === str2) return 1;
    if (str1.length === 0 || str2.length === 0) return 0;

    const matrix: number[][] = [];

    for (let i = 0; i <= str1.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str2.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    const distance = matrix[str1.length][str2.length];
    const maxLength = Math.max(str1.length, str2.length);
    return 1 - distance / maxLength;
  }
}

// 导出全局单例
export const providerManager = new ProviderManagerImpl();
