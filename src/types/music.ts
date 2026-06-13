/**
 * 音乐相关的核心类型定义
 */

/** 音源提供商类型 */
export type MusicSource =
  | '丽江曲库'
  | 'Joox'
  | 'QQ音乐'
  | '网易云音乐'
  | '酷我音乐'
  | 'Migu'
  | 'B站'
  | 'Netease';

/** 音质类型 */
export type AudioQuality = 'standard' | 'high' | 'lossless' | 'hires';

/** 歌曲信息 */
export interface Track {
  /** 歌曲 ID */
  id: string;
  /** 歌曲名 */
  name: string;
  /** 艺术家 */
  artist: string;
  /** 专辑 */
  album?: string;
  /** 封面图片 URL */
  cover?: string;
  /** 时长（秒） */
  duration?: number;
  /** 音源 */
  source: MusicSource;
  /** 原始数据（用于音源特定字段） */
  raw?: any;
}

/** 搜索结果 */
export interface SearchResult {
  /** 歌曲列表 */
  tracks: Track[];
  /** 总数 */
  total?: number;
  /** 是否有更多 */
  hasMore?: boolean;
}

/** 播放 URL 信息 */
export interface PlayUrlInfo {
  /** 播放 URL */
  url: string;
  /** 音质 */
  quality?: AudioQuality;
  /** 比特率 */
  bitrate?: number;
  /** 是否需要代理 */
  needProxy?: boolean;
  /** 过期时间（时间戳） */
  expiresAt?: number;
}

/** 歌词行 */
export interface LyricLine {
  /** 时间（秒） */
  time: number;
  /** 歌词文本 */
  text: string;
  /** 翻译（可选） */
  translation?: string;
}

/** 歌词信息 */
export interface Lyric {
  /** 歌词行列表 */
  lines: LyricLine[];
  /** 原始歌词文本 */
  raw?: string;
}

/** 歌单信息 */
export interface Playlist {
  /** 歌单 ID */
  id: string;
  /** 歌单名 */
  name: string;
  /** 创建者 */
  creator?: string;
  /** 封面 */
  cover?: string;
  /** 描述 */
  description?: string;
  /** 歌曲数量 */
  trackCount?: number;
  /** 播放次数 */
  playCount?: number;
  /** 音源 */
  source: MusicSource;
}

/** 艺术家信息 */
export interface Artist {
  /** 艺术家 ID */
  id: string;
  /** 艺术家名 */
  name: string;
  /** 头像 */
  avatar?: string;
  /** 简介 */
  description?: string;
  /** 粉丝数 */
  followerCount?: number;
  /** 音源 */
  source: MusicSource;
}

/** 专辑信息 */
export interface Album {
  /** 专辑 ID */
  id: string;
  /** 专辑名 */
  name: string;
  /** 艺术家 */
  artist: string;
  /** 封面 */
  cover?: string;
  /** 发行时间 */
  releaseDate?: string;
  /** 歌曲数量 */
  trackCount?: number;
  /** 音源 */
  source: MusicSource;
}

/** 搜索建议 */
export interface SearchSuggestion {
  /** 建议文本 */
  text: string;
  /** 类型 */
  type?: 'track' | 'artist' | 'album' | 'playlist';
}
