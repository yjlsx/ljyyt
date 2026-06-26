import { BaseProvider } from './BaseProvider';
import type {
  SearchResult,
  PlayUrlInfo,
  Lyric,
  Track,
  AudioQuality,
  ProviderConfig,
  MusicSourceCode,
} from '../types/provider';

/**
 * 网易云音乐 Provider。
 *
 * 与 app.js 中的 `fetchOtterNetease` 行为对齐：
 * - 默认走 `https://ljyyt-api.yjlsx0.workers.dev/api/netease`
 * - 失败时回退到 `otter-music.pages.dev/music-api/netease`
 * - 排除 ljyyt-worker 健康响应（payload.ok === true 但无实际 data）
 *
 * `useGlobalSourceCode` 决定 Provider 注册时使用的 source 代号：
 * - `'netease'`：作为聚合源主路径
 * - `'_netease'`：app.js 中 `searchNeteaseApiTracks` 使用的备用代号
 */
export interface NeteaseProviderConfig extends ProviderConfig {
  /** 基础 URL 列表，按顺序作为多 base 候选 */
  bases: string[];
  /** 注册时使用的 source code */
  useGlobalSourceCode?: 'netease' | '_netease';
  /** 默认请求比特率（kbps），与 app.js 中 192000 对齐 */
  defaultBitrate?: number;
}

interface OtterEnvelope {
  ok?: boolean;
  service?: string;
  data?: unknown;
  result?: unknown;
  playlist?: unknown;
  playlists?: unknown;
}

interface NeteaseSongDto {
  id?: number | string;
  name?: string;
  ar?: Array<{ name?: string }>;
  artists?: Array<{ name?: string }>;
  al?: { name?: string; picUrl?: string };
  album?: string | { name?: string; picUrl?: string };
  dt?: number;
  duration?: number;
}

interface SongUrlDto {
  url?: string;
  br?: number;
}

const DEFAULT_BITRATE = 192000;

export class NeteaseProvider extends BaseProvider {
  readonly name: MusicSourceCode;
  readonly label = '网易云音乐';

  private readonly bases: string[];
  private readonly defaultBitrate: number;

  constructor(config: NeteaseProviderConfig) {
    super(config);
    this.bases = (config.bases ?? []).filter(Boolean);
    if (!this.bases.length) throw new Error('NeteaseProvider: empty bases');
    this.name = config.useGlobalSourceCode ?? '_netease';
    this.defaultBitrate = config.defaultBitrate ?? DEFAULT_BITRATE;
  }

  /** otter 风格 POST：多 base 并发取最先成功的，过滤健康响应 */
  private async post<T = OtterEnvelope>(
    path: string,
    payload: Record<string, unknown>,
    signal?: AbortSignal
  ): Promise<T> {
    const urls = this.bases.map((b) => b.replace(/\/+$/, '') + path);
    return this.request<T>(urls, {
      method: 'POST',
      body: payload,
      responseType: 'json',
      signal,
      validate: (data) => {
        if (!data || typeof data !== 'object') return false;
        const env = data as OtterEnvelope;
        // 过滤 ljyyt-worker 健康检查 payload
        if (
          env.ok === true &&
          env.service === 'ljyyt-worker' &&
          !env.data &&
          !env.result &&
          !env.playlist &&
          !env.playlists
        ) {
          return false;
        }
        return true;
      },
    });
  }

  async search(
    keyword: string,
    page = 1,
    limit = 20,
    signal?: AbortSignal
  ): Promise<SearchResult> {
    const payload = await this.post<OtterEnvelope>(
      '/search',
      {
        keyword: String(keyword || ''),
        type: 1,
        page,
        limit: Math.max(1, Math.min(100, limit)),
        cookie: '',
      },
      signal
    );

    const data = (payload?.data ?? {}) as { result?: { songs?: NeteaseSongDto[]; songCount?: number } };
    const songs = data.result?.songs ?? [];
    const tracks: Track[] = songs.map((s) => this.normalizeSong(s));
    return {
      tracks,
      total: data.result?.songCount ?? tracks.length,
      hasMore: tracks.length === limit,
    };
  }

  async getPlayUrl(
    track: Track,
    _quality?: AudioQuality,
    signal?: AbortSignal
  ): Promise<PlayUrlInfo> {
    const id = track.urlId || track.id;
    if (!id) throw new Error('[netease] missing track id');

    const payload = await this.post<OtterEnvelope>(
      '/song-url',
      { id: String(id), br: this.defaultBitrate, cookie: '' },
      signal
    );

    const outer = (payload?.data ?? {}) as { data?: SongUrlDto[] };
    const item = Array.isArray(outer.data) ? outer.data[0] : undefined;
    const raw = String(item?.url ?? '');
    if (!raw) throw new Error('[netease] no playable url');

    const url = raw.replace(/^http:\/\//i, 'https://');
    return {
      url,
      bitrate: item?.br ?? this.defaultBitrate,
      expiresAt: Date.now() + 20 * 60 * 1000,
    };
  }

  async getLyric(track: Track, signal?: AbortSignal): Promise<Lyric> {
    const id = track.lyric_id || track.urlId || track.id;
    if (!id) return { lines: [] };

    const payload = await this.post<OtterEnvelope & { lrc?: { lyric?: string } }>(
      '/lyric',
      { id: String(id), cookie: '' },
      signal
    );

    const data = (payload?.data ?? payload) as { lrc?: { lyric?: string } };
    const lrcText = data?.lrc?.lyric ?? '';
    return lrcText ? this.parseLrc(lrcText) : { lines: [] };
  }

  private normalizeSong(song: NeteaseSongDto): Track {
    const artists = song.ar ?? song.artists ?? [];
    const artistText = artists
      .map((a) => a?.name)
      .filter((n): n is string => Boolean(n))
      .join(' / ');

    const album = song.al ?? song.album ?? {};
    const albumName = typeof album === 'string' ? album : album?.name ?? '';
    const cover = typeof album === 'object' ? album?.picUrl ?? '' : '';

    const durationSec = song.dt ? Math.floor(song.dt / 1000) : song.duration ?? 0;
    const idStr = String(song.id ?? '');

    return {
      id: idStr,
      name: String(song.name ?? ''),
      artist: artistText || '未知歌手',
      album: albumName,
      cover: cover || undefined,
      duration: durationSec,
      source: this.name,
      sourceLabel: this.label,
      provider: 'netease-api',
      urlId: idStr,
      lyric_id: idStr,
    };
  }
}
