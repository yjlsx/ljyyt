import { BaseProvider } from './BaseProvider';
import type {
  SearchResult,
  PlayUrlInfo,
  Lyric,
  Track,
  AudioQuality,
} from '../types/provider';

/**
 * 网易云音乐 Provider 示例实现
 * 演示如何实现一个具体的音源 Provider
 */
export class NeteaseProvider extends BaseProvider {
  readonly name = '网易云音乐' as const;

  /**
   * 搜索歌曲
   */
  async search(
    keyword: string,
    page = 1,
    limit = 20
  ): Promise<SearchResult> {
    // TODO: 实现网易云搜索 API 调用
    // 这里只是示例，需要根据实际 API 实现
    const offset = (page - 1) * limit;

    try {
      const data = await this.fetch<any>(
        `https://music-api.example.com/search?keywords=${encodeURIComponent(keyword)}&limit=${limit}&offset=${offset}`
      );

      const tracks: Track[] = data.result.songs.map((song: any) => ({
        id: String(song.id),
        name: song.name,
        artist: song.artists.map((a: any) => a.name).join('/'),
        album: song.album.name,
        cover: song.album.picUrl,
        duration: Math.floor(song.duration / 1000),
        source: this.name,
        raw: song,
      }));

      return {
        tracks,
        total: data.result.songCount,
        hasMore: offset + limit < data.result.songCount,
      };
    } catch (error) {
      console.error('[Netease] Search failed:', error);
      return { tracks: [], total: 0 };
    }
  }

  /**
   * 获取播放 URL
   */
  async getPlayUrl(
    track: Track,
    quality: AudioQuality = 'high'
  ): Promise<PlayUrlInfo> {
    // TODO: 实现获取播放 URL
    try {
      const data = await this.fetch<any>(
        `https://music-api.example.com/song/url?id=${track.id}&quality=${quality}`
      );

      if (!data.data[0]?.url) {
        throw new Error('No playable URL found');
      }

      return {
        url: data.data[0].url,
        quality,
        bitrate: data.data[0].br,
        expiresAt: Date.now() + 20 * 60 * 1000, // 20分钟过期
      };
    } catch (error) {
      console.error('[Netease] Get play URL failed:', error);
      throw error;
    }
  }

  /**
   * 获取歌词
   */
  async getLyric(track: Track): Promise<Lyric> {
    // TODO: 实现获取歌词
    try {
      const data = await this.fetch<any>(
        `https://music-api.example.com/lyric?id=${track.id}`
      );

      if (!data.lrc?.lyric) {
        return { lines: [] };
      }

      return this.parseLrc(data.lrc.lyric);
    } catch (error) {
      console.error('[Netease] Get lyric failed:', error);
      return { lines: [] };
    }
  }
}
