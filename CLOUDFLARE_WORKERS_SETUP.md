# Render 静态站 + Cloudflare Workers

这套方案适合当前仓库继续保持 Render 静态托管，同时把歌词和封面查询放到 Cloudflare Workers。

## 1. 创建 Worker

在本仓库根目录执行：

```powershell
npm install -g wrangler
cd cloudflare-worker
wrangler login
wrangler deploy
```

部署成功后会拿到一个类似下面的地址：

```text
https://ljyyt-api.<your-subdomain>.workers.dev
```

## 2. 配置前端

编辑根目录的 [site-config.js](D:/GitHub/ljyyt/site-config.js:1)，填入你自己的 Worker 地址：

```js
window.LYRICS_API_ENDPOINT = 'https://ljyyt-api.<your-subdomain>.workers.dev/api/lyrics';
window.LYRICS_SEARCH_API_ENDPOINT = 'https://ljyyt-api.<your-subdomain>.workers.dev/api/lyrics/search';
window.COVER_API_ENDPOINT = 'https://ljyyt-api.<your-subdomain>.workers.dev/api/cover';
```

然后把前端重新部署到 Render 静态站即可。

## 3. 当前 Worker 能做什么

- `/api/lyrics`
  - 先查 `LRCLIB`
  - 再试 `LRCLIB search`
  - 再试 `lyrics.ovh`
  - 再试 `rangotec`
  - 最后试网易云搜索 + 歌词接口
- `/api/lyrics/search`
  - 合并 `LRCLIB`、`rangotec` 和网易云搜索候选
- `/api/cover`
  - 通过 `api.lrc.cx/cover` 跟随跳转，返回最终图片地址 JSON

## 4. 说明

- 这套方案比 Render 常驻 `Web Service` 更省资源，但不是无限免费。
- 小众歌曲的歌词命中率仍然取决于外部歌词源本身。
- `api.lrc.cx/cover` 如果上游限流，Worker 也只能返回未找到，不会凭空生成封面。
