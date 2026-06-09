# 丽江音悦台

`D:\GitHub\ljyyt\` 是丽江音悦台的前端与轻量 API 仓库。当前主入口是 `index.html`，本地开发和 Oracle 部署由 `server.js` 提供同源 API；静态站部署可以通过 Cloudflare Worker 提供歌词、封面、聚合搜索和音频代理接口。

## 主要能力

- 首页、发现页、搜索页、歌单详情、喜欢、最近播放和播放队列
- 多音源搜索与播放失败后的免费音源自动切换
- 酷我、网易、Joox 等外部来源的搜索、歌词、封面与播放地址解析
- 全屏播放器、歌词面板、队列抽屉、喜欢/下一首/下载/分享等曲目操作
- 本地存储兼容旧版 Otter 数据，带存储异常保护
- Oracle 同源 API 部署与 Cloudflare Worker API 部署两种运行模式

## 关键文件

- `index.html`：当前主应用，包含内联 UI、播放、搜索、歌单和设置逻辑
- `server.js`：本地/Oracle Node API，包含歌词、封面、GD Music、酷我和音频代理接口
- `site-config.js`：前端 API base 配置。普通静态构建默认走 Worker，Oracle 构建会生成同源配置
- `cloudflare-worker/worker.js`：Cloudflare Worker API 实现
- `scripts/build-dist.cjs`：统一构建脚本，负责生成 `dist/`
- `data/audio-sources.json`：自有或授权音频候选来源
- `tests/`：Node 脚本式回归测试，覆盖播放、搜索、存储、部署和 Worker 行为
- `dist/`：部署产物，由 `npm run build` 或 `npm run build:oracle` 生成，不要手工改

## 本地开发

```bash
npm install
npm run dev
```

然后打开：

```text
http://localhost:3000/index.html
```

本地页面会通过同源 `/api/*` 调用 `server.js`。不要直接用文件方式打开 `index.html` 来验证播放和 API 行为。

## 测试与构建

```bash
npm test
npm run build
```

`npm run build` 会重新生成 `dist/`，默认不复制本地 mp4 媒体文件。修改 `index.html`、`server.js`、`site-config.js`、`data/`、Worker 或部署文档后，都应运行相关定向测试，并在需要时跑完整 `npm test`。

## Oracle 部署

```bash
npm run build:oracle
```

`build:oracle` 会生成同源 API 版 `dist/site-config.js`，适合把前端和 `server.js` 一起部署到 Oracle 服务器。详细步骤见 `ORACLE_DEPLOY.md`。

## Cloudflare Worker 部署

```bash
npm run worker:login
npm run deploy:worker
```

Worker 使用仓库内的 `wrangler` devDependency 和 `cloudflare-worker/wrangler.toml`。部署后，把 `site-config.js` 里的 `window.LJYYT_API_BASE` 指向你的 Worker 地址。详细步骤见 `CLOUDFLARE_WORKERS_SETUP.md`。

## 配置说明

普通静态构建的 `site-config.js` 在非本地环境默认使用：

```js
window.LJYYT_API_BASE = 'https://ljyyt-api.yjlsx0.workers.dev';
```

如需使用自己的 Worker 或后端，只改 `window.LJYYT_API_BASE` 即可，歌词、封面、酷我和音频代理接口会从这个 base 派生。

## 维护规则

- 改源码后用 `npm run build` 同步 `dist/`
- `dist/` 是构建产物，不直接手工维护
- 新行为和修复尽量先加 `tests/*.cjs` 回归测试
- 根 `package.json` 的 Node 版本约束面向开发/部署工具链，Oracle 运行包的 `dist/package.json` 保持更轻量
- 上传 GitHub 前确认 `git status -sb` 干净，并确保完整测试通过
