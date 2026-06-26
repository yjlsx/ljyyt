/**
 * 音乐相关的核心类型定义
 *
 * 命名约定：
 * - `MusicSourceCode` 是 app.js 历史上一直在用的内部代号（'netease' / 'qq' / 'kuwo' …）。
 *   Provider 之间用这套代号互相识别，跟后端 API 的 `source` 参数也是同一套。
 * - `MusicSourceLabel` 是给用户看的中文名（'网易云音乐'、'QQ音乐' …），跟 UI 一一对应。
 * - 旧代码里把两者混在一起叫 `MusicSource`，这里保留作为 alias 以便迁移。
 */

/** 音源内部代号 —— 跟 app.js 中现有的 source 字段保持一致 */
export type MusicSourceCode =
  | 'netease'
  | '_netease'
  | 'qq'
  | 'lx_qq'
  | 'kuwo'
  | 'lx_kuwo'
  | 'migu'
  | 'joox'
  | 'bilibili'
  | 'kugou'
  | 'tidal'
  | 'spotify'
  | 'ytmusic';

/** 音源显示名（给用户看） */
export type MusicSourceLabel = string;

/** 历史兼容：保留 MusicSource 作为 MusicSourceCode 的别名 */
export type MusicSource = MusicSourceCode;

/** 音质类型 */
export type AudioQuality = 'standard' | 'high' | 'lossless' | 'hires';

/** 历史 app.js 中使用的数字音质，按 kbps 表达 */
export type LegacyBitrateQuality = '128' | '192' | '320' | '999';

/** 歌曲信息 —— 字段集兼容旧 src/types/music.ts 和 app.js 运行时使用的字段 */
export interface Track {
  id: string;
  name: string;
  title?: string;
  artist: string;
  album?: string;
  cover?: string;
  duration?: number;
  source: MusicSourceCode;
  sourceLabel?: MusicSourceLabel;
  provider?: string;
  urlId?: string;
  lyric_id?: string;
  coverApi?: string;
  src?: string;
  raw?: unknown;
}

export interface SearchResult {
  tracks: Track[];
  total?: number;
  hasMore?: boolean;
}

export interface PlayUrlInfo {
  url: string;
  quality?: AudioQuality;
  bitrate?: number;
  needProxy?: boolean;
  expiresAt?: number;
}

export interface LyricLine {
  time: number;
  text: string;
  translation?: string;
}

export interface Lyric {
  lines: LyricLine[];
  raw?: string;
}

export interface Playlist {
  id: string;
  name: string;
  creator?: string;
  cover?: string;
  description?: string;
  trackCount?: number;
  playCount?: number;
  source: MusicSourceCode;
}

export interface Artist {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
  followerCount?: number;
  source: MusicSourceCode;
}

export interface Album {
  id: string;
  name: string;
  artist: string;
  cover?: string;
  releaseDate?: string;
  trackCount?: number;
  source: MusicSourceCode;
}

export interface SearchSuggestion {
  text: string;
  type?: 'track' | 'artist' | 'album' | 'playlist';
}
