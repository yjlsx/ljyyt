# Oracle 轻量部署说明

这套部署方式适合把网站和 API 都放到 Oracle 服务器上，音频、封面、歌词默认走外链或实时查询，不把媒体文件下载到服务器，尽量少占磁盘。

## 1. 生成瘦身包

在本地项目根目录执行：

```bash
npm run build:oracle
```

生成的 `dist/` 只包含运行必需文件：页面、样式、脚本、`server.js`、`data/`、`images/` 和视频数据文件。默认不会复制本地 `.mp4` 等媒体文件。

如果你确实要把本地媒体也一起传上去：

```bash
INCLUDE_MEDIA=1 npm run build:oracle
```

## 2. 上传到 Oracle

把 `dist/` 上传到服务器，例如：

```bash
scp -r dist/* opc@your-server-ip:/opt/ljyyt/
```

服务器上运行：

```bash
cd /opt/ljyyt
npm start
```

默认监听 `0.0.0.0:3000`，也可以这样改端口：

```bash
PORT=8080 npm start
```

## 3. 音源接入

建议把两件事分开：

- `script.js` 里的现有曲库：只当“歌曲目录”，保留标题、歌手、封面、原始 `src`。
- `data/audio-sources.json`：只当“授权播放来源”，同一首歌可以写多条候选。

默认策略是 `library-first`：优先使用 `data/audio-sources.json` 或授权解析服务返回的音源，失败时自动回退到曲库里已有的 `src`。

如果你想先用现在已有的 `src`，只有失败时才尝试授权音源：

```bash
AUDIO_SOURCE_PRIORITY=existing-first npm start
```

如果你有自有或已授权音频地址，可以填到：

```text
data/audio-sources.json
```

格式参考：

```json
[
  {
    "id": "1",
    "title": "快乐人生",
    "artist": "和月圆",
    "album": "纳西音乐精选",
    "src": "https://example.com/audio/happy-life.mp3",
    "quality": "128k",
    "source": "self-hosted-or-authorized",
    "license": "authorized"
  }
]
```

同一首歌可以配置多条候选。播放器会按顺序尝试，当前音源不可播放时自动切换下一条。

播放器页会显示：

- 当前音源来源
- 候选链位置，例如 `1 / 3 条`
- 是否走 Oracle 代理

如果你更新了 `data/audio-sources.json`，页面上可以点“刷新音源”重新解析当前歌曲，不必刷新整个页面。

也可以接你自己的授权解析服务：

```bash
AUDIO_RESOLVER_URL=https://your-api.example.com/audio/resolve npm start
```

这个上游接口返回 JSON 即可，例如：

```json
{
  "found": true,
  "playableUrl": "https://example.com/audio.mp3",
  "source": "authorized-api",
  "quality": "320k"
}
```

也支持返回候选链：

```json
{
  "found": true,
  "candidates": [
    {
      "playableUrl": "https://cdn1.example.com/audio.mp3",
      "source": "cdn-1",
      "quality": "320k"
    },
    {
      "playableUrl": "https://cdn2.example.com/audio.mp3",
      "source": "cdn-2",
      "quality": "128k"
    }
  ]
}
```

## 4. 音频代理

如果某些授权音频地址需要由 Oracle 服务器转发，页面会通过同源接口 `/api/audio-proxy?url=...` 拉取音频。该代理默认可用，但只接受 `http`/`https` 公网地址；服务器会拒绝 localhost、内网、链路本地地址，并在 DNS 解析后再次检查，降低 SSRF 和 DNS rebinding 风险。

代理会转发浏览器的 `Range` 请求，并向响应暴露 `Accept-Ranges`、`Content-Range`、`Content-Length` 和 `Content-Type`，便于播放器显示进度和拖动。代理响应使用 `Cache-Control: no-store`，不缓存用户提供的音频地址。

## 5. 歌词和封面

页面会请求本机 API：

- `/api/lyrics`
- `/api/lyrics/search`
- `/api/cover`
- `/api/audio/resolve`

本地歌词可放在 `data/lyrics.json`。线上部署后，`site-config.js` 默认使用同源 API，不再依赖 Cloudflare Worker。
