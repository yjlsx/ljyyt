import type {
  Track,
  SearchResult,
  PlayUrlInfo,
  Lyric,
  Playlist,
  Artist,
  Album,
  SearchSuggestion,
  AudioQuality,
  MusicSource,
} from './music';

/**
 * 音源 Provider 统一接口
 *
 * 所有音源（网易云、QQ音乐、酷我等）都需要实现这个接口
 * 这样可以统一管理和调用不同音源
 */
export interface MusicProvider {
  /** Provider 名称 */
  readonly name: MusicSource;

  /** 是否可用 */
  readonly enabled: boolean;

  /**
   * 搜索歌曲
   * @param keyword 关键词
   * @param page 页码（从 1 开始）
   * @param limit 每页数量
   */
  search(keyword: string, page?: number, limit?: number): Promise<SearchResult>;

  /**
   * 获取播放 URL
   * @param track 歌曲信息
   * @param quality 音质（可选）
   */
  getPlayUrl(track: Track, quality?: AudioQuality): Promise<PlayUrlInfo>;

  /**
   * 获取歌词
   * @param track 歌曲信息
   */
  getLyric(track: Track): Promise<Lyric>;

  /**
   * 获取歌曲详情（可选）
   * @param id 歌曲 ID
   */
  getTrackDetail?(id: string): Promise<Track>;

  /**
   * 获取歌单详情（可选）
   * @param id 歌单 ID
   */
  getPlaylist?(id: string): Promise<Playlist>;

  /**
   * 获取歌单歌曲列表（可选）
   * @param id 歌单 ID
   */
  getPlaylistTracks?(id: string): Promise<Track[]>;

  /**
   * 获取艺术家详情（可选）
   * @param id 艺术家 ID
   */
  getArtist?(id: string): Promise<Artist>;

  /**
   * 获取艺术家热门歌曲（可选）
   * @param id 艺术家 ID
   * @param limit 数量限制
   */
  getArtistTracks?(id: string, limit?: number): Promise<Track[]>;

  /**
   * 获取专辑详情（可选）
   * @param id 专辑 ID
   */
  getAlbum?(id: string): Promise<Album>;

  /**
   * 获取专辑歌曲列表（可选）
   * @param id 专辑 ID
   */
  getAlbumTracks?(id: string): Promise<Track[]>;

  /**
   * 搜索建议（可选）
   * @param keyword 关键词
   */
  getSearchSuggestions?(keyword: string): Promise<SearchSuggestion[]>;
}

/**
 * Provider 配置
 */
export interface ProviderConfig {
  /** 是否启用 */
  enabled: boolean;
  /** 优先级（数字越小优先级越高） */
  priority: number;
  /** API 基础 URL（可选） */
  baseUrl?: string;
  /** 超时时间（毫秒） */
  timeout?: number;
  /** 其他配置 */
  [key: string]: any;
}

/**
 * 音源匹配结果
 */
export interface MatchResult {
  /** 原始歌曲 */
  original: Track;
  /** 匹配到的歌曲 */
  matched: Track;
  /** 匹配分数（0-1） */
  score: number;
  /** 音源 */
  source: MusicSource;
}

/**
 * 播放失败回退策略
 */
export type FallbackStrategy =
  | 'auto-switch' // 自动切换其他音源
  | 'manual' // 手动选择
  | 'skip' // 跳过这首歌
  | 'none'; // 不处理

/**
 * Provider 管理器接口
 */
export interface ProviderManager {
  /**
   * 注册 Provider
   */
  register(provider: MusicProvider): void;

  /**
   * 获取 Provider
   */
  getProvider(name: MusicSource): MusicProvider | undefined;

  /**
   * 获取所有启用的 Provider
   */
  getEnabledProviders(): MusicProvider[];

  /**
   * 聚合搜索（所有音源）
   */
  searchAll(keyword: string, limit?: number): Promise<SearchResult>;

  /**
   * 自动匹配：尝试从其他音源找到相同歌曲
   */
  autoMatch(track: Track): Promise<MatchResult[]>;

  /**
   * 获取播放 URL（带回退）
   */
  getPlayUrlWithFallback(
    track: Track,
    strategy?: FallbackStrategy
  ): Promise<PlayUrlInfo>;
}
