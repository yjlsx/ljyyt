import type {
  MusicProvider,
  ProviderConfig,
  SearchResult,
  PlayUrlInfo,
  Lyric,
  Track,
  AudioQuality,
  MusicSourceCode,
  MusicSourceLabel,
} from '../types/provider';

/**
 * Provider 抽象基类。
 *
 * 把 app.js 里成熟的请求模式（多 base fallback、AbortSignal 透传、
 * 超时、对非 JSON 响应的容忍度）抽到一个共用层，让具体 Provider
 * 只负责字段映射和参数构造。
 */
export interface RequestOptions {
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
  responseType?: 'json' | 'text';
  timeout?: number;
  validate?: (data: unknown) => boolean;
}

export abstract class BaseProvider implements MusicProvider {
  abstract readonly source: MusicSourceCode;
  abstract readonly label: MusicSourceLabel;

  protected config: Required<Pick<ProviderConfig, 'enabled' | 'priority' | 'timeout'>> &
    Omit<ProviderConfig, 'enabled' | 'priority' | 'timeout'>;

  constructor(config: ProviderConfig = {}) {
    this.config = {
      enabled: config.enabled ?? true,
      priority: config.priority ?? 100,
      timeout: config.timeout ?? 10000,
      ...config,
    };
  }

  get enabled(): boolean {
    return this.config.enabled;
  }

  setEnabled(value: boolean): void {
    this.config.enabled = !!value;
  }

  get priority(): number {
    return this.config.priority;
  }

  /**
   * 发起 HTTP 请求，支持：
   * - 单 URL 或 URL 候选数组（`Promise.any` 取首个成功）
   * - 外部 AbortSignal 透传 + 内置超时
   * - JSON 或 text 响应（responseType 决定）
   * - 自定义 `validate` 用来过滤"成功但内容无效"（例如健康检查响应）
   */
  protected async request<T = unknown>(
    urls: string | string[],
    options: RequestOptions = {}
  ): Promise<T> {
    const list = (Array.isArray(urls) ? urls : [urls]).filter(Boolean);
    if (!list.length) throw new Error(`[${this.source}] request: no url`);
    if (options.signal?.aborted) throw new DOMException('Aborted', 'AbortError');

    const controller = new AbortController();
    const onAbort = (): void => controller.abort();
    options.signal?.addEventListener('abort', onAbort);
    const timeout = options.timeout ?? this.config.timeout;
    const timer = setTimeout(() => controller.abort(), timeout);

    const responseType = options.responseType ?? 'json';
    const method = options.method ?? 'GET';
    const headers: Record<string, string> = { ...(options.headers ?? {}) };
    let body: BodyInit | undefined;
    if (options.body !== undefined) {
      if (typeof options.body === 'string' || options.body instanceof FormData) {
        body = options.body as BodyInit;
      } else {
        headers['Content-Type'] = headers['Content-Type'] ?? 'application/json';
        body = JSON.stringify(options.body);
      }
    }

    try {
      const result = await Promise.any(
        list.map(async (url) => {
          const response = await fetch(url, {
            method,
            headers,
            body,
            signal: controller.signal,
          });
          if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
          const data =
            responseType === 'json'
              ? ((await response.json()) as unknown)
              : ((await response.text()) as unknown);
          if (options.validate && !options.validate(data)) {
            throw new Error(`[${this.source}] response failed validation`);
          }
          return data as T;
        })
      );
      return result;
    } catch (error) {
      if (options.signal?.aborted) throw new DOMException('Aborted', 'AbortError');
      if (controller.signal.aborted) throw new Error(`[${this.source}] request timeout after ${timeout}ms`);
      if (error instanceof AggregateError) {
        const messages = error.errors.map((e) => (e as Error)?.message ?? String(e)).join('; ');
        throw new Error(`[${this.source}] all endpoints failed: ${messages}`);
      }
      throw error;
    } finally {
      clearTimeout(timer);
      options.signal?.removeEventListener('abort', onAbort);
    }
  }

  /** 字符串归一化：去括号、空白和大小写差异 */
  protected normalizeString(str: string): string {
    return String(str ?? '')
      .toLowerCase()
      .replace(/[\s\-_()()【】\[\]]/g, '')
      .trim();
  }

  /** Levenshtein 距离归一化到 [0, 1] 的相似度 */
  protected stringSimilarity(a: string, b: string): number {
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

  /** 加权相似度（歌名 60%，艺术家 40%） */
  protected calculateSimilarity(a: Track, b: Track): number {
    const nameScore = this.stringSimilarity(this.normalizeString(a.name), this.normalizeString(b.name));
    const artistScore = this.stringSimilarity(this.normalizeString(a.artist), this.normalizeString(b.artist));
    return nameScore * 0.6 + artistScore * 0.4;
  }

  /** 解析 LRC 歌词 */
  protected parseLrc(lrcText: string): Lyric {
    const lines: Lyric['lines'] = [];
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;
    String(lrcText ?? '')
      .split('\n')
      .forEach((line) => {
        const matches = [...line.matchAll(timeRegex)];
        if (!matches.length) return;
        const text = line.replace(timeRegex, '').trim();
        if (!text) return;
        for (const match of matches) {
          const minutes = parseInt(match[1] ?? '0', 10);
          const seconds = parseInt(match[2] ?? '0', 10);
          const milliseconds = parseInt((match[3] ?? '0').padEnd(3, '0'), 10);
          const time = minutes * 60 + seconds + milliseconds / 1000;
          lines.push({ time, text });
        }
      });
    return { lines: lines.sort((a, b) => a.time - b.time), raw: lrcText };
  }

  abstract search(
    keyword: string,
    page?: number,
    limit?: number,
    signal?: AbortSignal
  ): Promise<SearchResult>;

  abstract getPlayUrl(
    track: Track,
    quality?: AudioQuality,
    signal?: AbortSignal
  ): Promise<PlayUrlInfo>;

  abstract getLyric(track: Track, signal?: AbortSignal): Promise<Lyric>;
}
