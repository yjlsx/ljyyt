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
  MusicSourceCode,
  MusicSourceLabel,
  MusicSource,
} from './music';

export type {
  Track,
  SearchResult,
  PlayUrlInfo,
  Lyric,
  Playlist,
  Artist,
  Album,
  SearchSuggestion,
  AudioQuality,
  MusicSourceCode,
  MusicSourceLabel,
  MusicSource,
};

/**
 * 音源 Provider 统一接口
 */
export interface MusicProvider {
  readonly source: MusicSourceCode;
  readonly label: MusicSourceLabel;
  readonly enabled: boolean;
  readonly priority?: number;

  search(keyword: string, page?: number, limit?: number, signal?: AbortSignal): Promise<SearchResult>;
  getPlayUrl(track: Track, quality?: AudioQuality, signal?: AbortSignal): Promise<PlayUrlInfo>;
  getLyric(track: Track, signal?: AbortSignal): Promise<Lyric>;

  getTrackDetail?(id: string, signal?: AbortSignal): Promise<Track>;
  getPlaylist?(id: string, signal?: AbortSignal): Promise<Playlist>;
  getPlaylistTracks?(id: string, signal?: AbortSignal): Promise<Track[]>;
  getArtist?(id: string, signal?: AbortSignal): Promise<Artist>;
  getArtistTracks?(id: string, limit?: number, signal?: AbortSignal): Promise<Track[]>;
  getAlbum?(id: string, signal?: AbortSignal): Promise<Album>;
  getAlbumTracks?(id: string, signal?: AbortSignal): Promise<Track[]>;
  getSearchSuggestions?(keyword: string, signal?: AbortSignal): Promise<SearchSuggestion[]>;
}

export interface ProviderConfig {
  enabled?: boolean;
  priority?: number;
  baseUrl?: string;
  fallbackBaseUrls?: string[];
  timeout?: number;
  [key: string]: unknown;
}

export interface MatchResult {
  original: Track;
  matched: Track;
  score: number;
  source: MusicSourceCode;
}

export type FallbackStrategy = 'auto-switch' | 'manual' | 'skip' | 'none';

export interface ProviderManager {
  register(provider: MusicProvider): void;
  unregister(provider: MusicProvider): void;
  setEnabled(source: MusicSourceCode, enabled: boolean): void;
  getProvider(source: MusicSourceCode): MusicProvider | undefined;
  getProviders(source: MusicSourceCode): MusicProvider[];
  getEnabledProviders(): MusicProvider[];
  searchAll(keyword: string, limit?: number, signal?: AbortSignal): Promise<SearchResult>;
  autoMatch(track: Track, signal?: AbortSignal): Promise<MatchResult[]>;
  getPlayUrlWithFallback(
    track: Track,
    strategy?: FallbackStrategy,
    quality?: AudioQuality,
    signal?: AbortSignal
  ): Promise<PlayUrlInfo>;
}
