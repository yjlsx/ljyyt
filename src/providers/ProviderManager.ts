import type {
  MusicProvider,
  ProviderManager,
  SearchResult,
  PlayUrlInfo,
  MatchResult,
  FallbackStrategy,
  MusicSourceCode,
  Track,
  AudioQuality,
} from '../types/provider';

/**
 * Provider 管理器实现。
 *
 * 与早期占位实现的差异：
 * - register 用 source code（而不是 label）作 key；label 可重复，code 唯一
 * - 多个 Provider 共享一个 source code 时按 `priority` 排序
 * - 暴露 `unregister` / `setEnabled`，便于运行时切换
 * - `getPlayUrlWithFallback` 全程透传外部 AbortSignal
 */
export class ProviderManagerImpl implements ProviderManager {
  private providers = new Map<MusicSourceCode, MusicProvider[]>();

  register(provider: MusicProvider): void {
    const list = this.providers.get(provider.source) ?? [];
    if (list.includes(provider)) return;
    list.push(provider);
    list.sort((a, b) => (this.priorityOf(a) - this.priorityOf(b)));
    this.providers.set(provider.source, list);
  }

  unregister(provider: MusicProvider): void {
    const list = this.providers.get(provider.source);
    if (!list) return;
    const next = list.filter((p) => p !== provider);
    if (next.length) this.providers.set(provider.source, next);
    else this.providers.delete(provider.source);
  }

  setEnabled(source: MusicSourceCode, enabled: boolean): void {
    const list = this.providers.get(source);
    list?.forEach((p) => {
      const target = p as { setEnabled?: (v: boolean) => void };
      if (typeof target.setEnabled === 'function') target.setEnabled(enabled);
    });
  }

  getProvider(source: MusicSourceCode): MusicProvider | undefined {
    return this.providers.get(source)?.find((p) => p.enabled);
  }

  getProviders(source: MusicSourceCode): MusicProvider[] {
    return (this.providers.get(source) ?? []).filter((p) => p.enabled);
  }

  getEnabledProviders(): MusicProvider[] {
    const out: MusicProvider[] = [];
    this.providers.forEach((list) => {
      list.forEach((p) => {
        if (p.enabled) out.push(p);
      });
    });
    return out;
  }

  async searchAll(keyword: string, limit = 20, signal?: AbortSignal): Promise<SearchResult> {
    const providers = this.getEnabledProviders();
    const results = await Promise.allSettled(
      providers.map((provider) =>
        provider.search(keyword, 1, limit, signal).catch((err: unknown) => {
          console.warn(`[${provider.source}] search failed:`, err);
          return { tracks: [], total: 0 } as SearchResult;
        })
      )
    );

    const allTracks: Track[] = [];
    for (const r of results) {
      if (r.status === 'fulfilled') allTracks.push(...r.value.tracks);
    }
    const unique = this.deduplicate(allTracks);
    return {
      tracks: unique.slice(0, limit),
      total: unique.length,
      hasMore: unique.length > limit,
    };
  }

  async autoMatch(track: Track, signal?: AbortSignal): Promise<MatchResult[]> {
    const providers = this.getEnabledProviders().filter((p) => p.source !== track.source);
    const keyword = `${track.name} ${track.artist}`.trim();
    const results: MatchResult[] = [];

    await Promise.allSettled(
      providers.map(async (provider) => {
        try {
          const found = await provider.search(keyword, 1, 10, signal);
          for (const matched of found.tracks) {
            const score = this.calculateSimilarity(track, matched);
            if (score > 0.8) {
              results.push({ original: track, matched, score, source: provider.source });
            }
          }
        } catch (err) {
          console.warn(`[${provider.source}] auto-match failed:`, err);
        }
      })
    );

    return results.sort((a, b) => b.score - a.score);
  }

  async getPlayUrlWithFallback(
    track: Track,
    strategy: FallbackStrategy = 'auto-switch',
    quality?: AudioQuality,
    signal?: AbortSignal
  ): Promise<PlayUrlInfo> {
    const provider = this.getProvider(track.source);
    if (!provider) throw new Error(`[ProviderManager] provider not found for ${track.source}`);

    try {
      return await provider.getPlayUrl(track, quality, signal);
    } catch (error) {
      console.warn(`[${track.source}] play url failed, strategy=${strategy}:`, error);
      if (strategy !== 'auto-switch') throw error;

      const matches = await this.autoMatch(track, signal);
      for (const match of matches) {
        const fallback = this.getProvider(match.source);
        if (!fallback) continue;
        try {
          const url = await fallback.getPlayUrl(match.matched, quality, signal);
          console.info(
            `[Fallback] ${track.source} → ${match.source} (score=${match.score.toFixed(2)})`
          );
          return url;
        } catch (fallbackError) {
          console.warn(`[${match.source}] fallback failed:`, fallbackError);
        }
      }
      throw error;
    }
  }

  private priorityOf(p: MusicProvider): number {
    const v = (p as { priority?: number }).priority;
    return typeof v === 'number' ? v : 100;
  }

  private calculateSimilarity(a: Track, b: Track): number {
    const name = this.stringSimilarity(this.normalize(a.name), this.normalize(b.name));
    const artist = this.stringSimilarity(this.normalize(a.artist), this.normalize(b.artist));
    return name * 0.6 + artist * 0.4;
  }

  private deduplicate(tracks: Track[]): Track[] {
    const seen = new Set<string>();
    const out: Track[] = [];
    for (const t of tracks) {
      const key = this.normalize(`${t.name}-${t.artist}-${t.source}`);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(t);
    }
    return out;
  }

  private normalize(s: string): string {
    return String(s ?? '')
      .toLowerCase()
      .replace(/[\s\-_()()【】\[\]]/g, '')
      .trim();
  }

  private stringSimilarity(a: string, b: string): number {
    if (a === b) return 1;
    if (!a.length || !b.length) return 0;
    const m = a.length;
    const n = b.length;
    const prev = new Array<number>(n + 1);
    const curr = new Array<number>(n + 1);
    for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      curr[0] = i;
      for (let j = 1; j <= n; j++) {
        const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        const del = (prev[j] ?? 0) + 1;
        const ins = (curr[j - 1] ?? 0) + 1;
        const sub = (prev[j - 1] ?? 0) + cost;
        curr[j] = Math.min(del, ins, sub);
      }
      for (let j = 0; j <= n; j++) prev[j] = curr[j] ?? 0;
    }
    const distance = prev[n] ?? 0;
    return 1 - distance / Math.max(m, n);
  }
}

export const providerManager = new ProviderManagerImpl();
