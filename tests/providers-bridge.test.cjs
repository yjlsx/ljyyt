const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

// ---------- 1. 静态结构：source + dist 都要有 bridge 脚本，且挂在正确位置 ----------

for (const dir of ['', 'dist/']) {
  const htmlPath = path.join(ROOT, dir + 'index.html');
  const jsPath = path.join(ROOT, dir + 'js/providers-bridge.js');

  if (!fs.existsSync(jsPath)) {
    throw new Error(jsPath + ' missing');
  }
  const html = fs.readFileSync(htmlPath, 'utf8');

  const bridgeTagIdx = html.indexOf('<script src="js/providers-bridge.js"></script>');
  if (bridgeTagIdx < 0) {
    throw new Error(htmlPath + ' should reference js/providers-bridge.js');
  }

  const fixWechatIdx = html.indexOf('<script src="/fix_wechat_images.js"></script>');
  if (fixWechatIdx < 0 || fixWechatIdx > bridgeTagIdx) {
    throw new Error(htmlPath + ' providers-bridge.js must load after fix_wechat_images.js');
  }

  const inlineMatch = html.match(/<script(?![^>]*\bsrc=)[^>]*>\s*const tabs/);
  if (!inlineMatch) {
    throw new Error(htmlPath + ' should contain inline app script starting with const tabs');
  }
  const inlineIdx = inlineMatch.index;
  if (bridgeTagIdx > inlineIdx) {
    throw new Error(htmlPath + ' providers-bridge.js must load before the inline app script');
  }
}

// ---------- 2. 功能：在 sandbox 中加载 bridge ----------

const bridgeSource = fs.readFileSync(path.join(ROOT, 'js/providers-bridge.js'), 'utf8');

function makeSandbox(extra) {
  const w = Object.assign({}, extra || {});
  const sandbox = {
    window: w,
    console: console,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    fetch: (extra && extra.fetch) || function () {
      return Promise.reject(new Error('fetch not used in this test'));
    },
    AbortController: AbortController,
    DOMException: typeof DOMException !== 'undefined' ? DOMException : Error,
    FormData: typeof FormData !== 'undefined' ? FormData : function () {},
    Promise: Promise,
  };
  sandbox.globalThis = sandbox;
  return sandbox;
}

// 默认（开关关）：不自动注册
(function bridgeDefaultOff() {
  const sandbox = makeSandbox({ LJYYT_API_BASE: 'https://example.com' });
  vm.createContext(sandbox);
  vm.runInContext(bridgeSource, sandbox);
  const bridge = sandbox.window.LjyytProviders;
  if (!bridge) throw new Error('bridge should expose window.LjyytProviders');
  if (typeof bridge.register !== 'function') throw new Error('bridge.register missing');
  if (typeof bridge.createNeteaseProvider !== 'function') throw new Error('bridge.createNeteaseProvider missing');
  if (typeof bridge.createQqProvider !== 'function') throw new Error('bridge.createQqProvider missing');
  if (typeof bridge.createGdMusicProvider !== 'function') throw new Error('bridge.createGdMusicProvider missing');
  const list = bridge.getEnabledProviders();
  if (list.length !== 0) {
    throw new Error('bridge should not auto-register providers when toggle is off, got ' + list.length);
  }
})();

// 开关开：自动注册 netease + qq + kuwo
(function bridgeDefaultOn() {
  const sandbox = makeSandbox({
    LJYYT_API_BASE: 'https://example.com',
    LJYYT_ENABLE_PROVIDERS_BRIDGE: true,
  });
  vm.createContext(sandbox);
  vm.runInContext(bridgeSource, sandbox);
  const bridge = sandbox.window.LjyytProviders;
  const enabled = bridge.getEnabledProviders();
  const sources = enabled.map(function (p) { return p.source; }).sort();
  const expected = ['_netease', 'kuwo', 'qq'];
  if (enabled.length !== expected.length) {
    throw new Error('expected ' + expected.length + ' auto-registered providers, got ' + enabled.length);
  }
  for (let i = 0; i < expected.length; i += 1) {
    if (sources[i] !== expected[i]) {
      throw new Error('auto providers mismatch: expected ' + expected.join(',') + ' got ' + sources.join(','));
    }
  }
})();

// internals
(function bridgeInternals() {
  const sandbox = makeSandbox();
  vm.createContext(sandbox);
  vm.runInContext(bridgeSource, sandbox);
  const internal = sandbox.window.LjyytProviders._internal;

  if (internal.normalizeString('  HelloWorld ') !== 'helloworld') throw new Error('normalizeString trim/lower failed');
  if (internal.normalizeString('A (Live)【加长】') !== 'alive加长') {
    throw new Error('normalizeString bracket strip failed: ' + internal.normalizeString('A (Live)【加长】'));
  }

  if (internal.stringSimilarity('abc', 'abc') !== 1) throw new Error('similarity self != 1');
  const s = internal.stringSimilarity('hello', 'hallo');
  if (!(s > 0.7 && s < 1)) throw new Error('similarity hello/hallo unexpected: ' + s);

  if (!internal.isNeteaseHealthPayload({ ok: true, service: 'ljyyt-worker' })) throw new Error('health payload should be filtered');
  if (internal.isNeteaseHealthPayload({ ok: true, service: 'ljyyt-worker', data: { result: { songs: [] } } })) {
    throw new Error('payload with data should not be flagged as health');
  }
  if (internal.isNeteaseHealthPayload(null)) throw new Error('null should not be flagged as health');

  if (!internal.isQqProxyHealthPayload({ ok: true, service: 'whatever' })) throw new Error('qq health payload should be flagged');
  if (internal.isQqProxyHealthPayload([{ id: 1 }])) throw new Error('qq array payload should not be flagged');
  if (internal.isQqProxyHealthPayload(null)) throw new Error('null should not be flagged as qq health');

  const bases = internal.defaultNeteaseBases();
  if (!Array.isArray(bases) || bases.length !== 2) throw new Error('defaultNeteaseBases should return 2 bases');
  if (!bases[0].endsWith('/api/netease')) throw new Error('first netease base wrong: ' + bases[0]);

  const gdBases = internal.defaultGdMusicBases();
  if (!Array.isArray(gdBases) || gdBases.length !== 3) throw new Error('defaultGdMusicBases should return 3 bases');

  const qqBases = internal.defaultQqBases();
  if (!qqBases.primaryBase.endsWith('/api/qq')) throw new Error('qq primary base wrong: ' + qqBases.primaryBase);
  if (!qqBases.fallbackProxy.endsWith('/qqmusic/proxy')) throw new Error('qq fallback proxy wrong: ' + qqBases.fallbackProxy);
})();

// netease search 流程
function neteaseSearchFlow() {
  const calls = [];
  const sandbox = makeSandbox({
    LJYYT_API_BASE: 'https://example.com',
    fetch: function (url, init) {
      calls.push({ url: url, init: init });
      const body = {
        data: {
          result: {
            songs: [
              { id: 123, name: 'Song A', ar: [{ name: 'Artist A' }], al: { name: 'Album A', picUrl: 'https://img/a.jpg' }, dt: 240000 }
            ],
            songCount: 1
          }
        }
      };
      return Promise.resolve({
        ok: true,
        status: 200,
        json: function () { return Promise.resolve(body); },
        text: function () { return Promise.resolve(JSON.stringify(body)); }
      });
    }
  });
  vm.createContext(sandbox);
  vm.runInContext(bridgeSource, sandbox);
  const bridge = sandbox.window.LjyytProviders;
  const provider = bridge.createNeteaseProvider({
    bases: ['https://example.com/api/netease'],
    useGlobalSourceCode: '_netease'
  });
  bridge.register(provider);

  return provider.search('test', 1, 5).then(function (result) {
    if (!calls.length) throw new Error('netease: expected fetch');
    if (calls[0].url !== 'https://example.com/api/netease/search') throw new Error('netease URL wrong: ' + calls[0].url);
    if (calls[0].init.method !== 'POST') throw new Error('netease: expected POST');
    const payload = JSON.parse(calls[0].init.body);
    if (payload.keyword !== 'test' || payload.type !== 1 || payload.limit !== 5) {
      throw new Error('netease payload wrong: ' + calls[0].init.body);
    }
    if (!result.tracks.length || result.tracks[0].id !== '123') throw new Error('netease normalize failed');
    const track = result.tracks[0];
    if (track.source !== '_netease' || track.sourceLabel !== '网易云音乐') throw new Error('netease source/label wrong');
    if (track.urlId !== '123' || track.lyric_id !== '123') throw new Error('netease urlId/lyric_id wrong');
    if (track.duration !== 240) throw new Error('netease duration wrong: ' + track.duration);
  });
}

// qq search 流程：primary 返回数组 -> 正常解析
function qqSearchFlow() {
  const calls = [];
  const sandbox = makeSandbox({
    LJYYT_API_BASE: 'https://example.com',
    fetch: function (url, init) {
      calls.push({ url: String(url), init: init });
      let body;
      if (String(url).indexOf('/api/qq/search') >= 0) {
        body = [{ id: 'qq_001', name: 'QSong', artist: ['Q Artist'], album: 'Q Album', url_id: 'q001', lyric_id: 'q001' }];
      } else {
        // fallback never resolves in this path; return health to force ignore
        body = { ok: true, service: 'qq-fallback' };
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: function () { return Promise.resolve(body); },
        text: function () { return Promise.resolve(JSON.stringify(body)); }
      });
    }
  });
  vm.createContext(sandbox);
  vm.runInContext(bridgeSource, sandbox);
  const bridge = sandbox.window.LjyytProviders;
  const qq = bridge.createQqProvider({
    primaryBase: 'https://example.com/api/qq',
    fallbackProxy: 'https://otter.dev/qqmusic/proxy',
    useGlobalSourceCode: 'qq'
  });

  return qq.search('hello', 1, 3).then(function (result) {
    if (!result.tracks.length) throw new Error('qq search returned no tracks');
    const t = result.tracks[0];
    if (t.source !== 'qq' || t.sourceLabel !== 'QQ音乐') throw new Error('qq source/label wrong');
    if (t.urlId !== 'q001') throw new Error('qq urlId wrong: ' + t.urlId);
    if (t.artist !== 'Q Artist') throw new Error('qq artist wrong: ' + t.artist);
    if (t.provider !== 'qq-api') throw new Error('qq provider tag wrong');
    const primaryHit = calls.some(function (c) { return c.url.indexOf('/api/qq/search') >= 0; });
    if (!primaryHit) throw new Error('qq primary URL not hit');
  });
}

// qq url 流程：primary 拒绝（health payload），fallback 给真正的 url
function qqUrlFallback() {
  const calls = [];
  const sandbox = makeSandbox({
    fetch: function (url, init) {
      calls.push({ url: String(url), init: init });
      let body;
      if (String(url).indexOf('/api/qq/url') >= 0) {
        body = { ok: true, service: 'ljyyt-worker' };
      } else {
        body = { url: 'http://media.example.com/q001.mp3', br: 320 };
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: function () { return Promise.resolve(body); },
        text: function () { return Promise.resolve(JSON.stringify(body)); }
      });
    }
  });
  vm.createContext(sandbox);
  vm.runInContext(bridgeSource, sandbox);
  const bridge = sandbox.window.LjyytProviders;
  const qq = bridge.createQqProvider({
    primaryBase: 'https://example.com/api/qq',
    fallbackProxy: 'https://otter.dev/qqmusic/proxy',
    useGlobalSourceCode: 'qq'
  });
  const track = { id: 'q001', urlId: 'q001', name: 'X', artist: 'Y', source: 'qq' };
  return qq.getPlayUrl(track, '320').then(function (info) {
    if (!info || !info.url) throw new Error('qq url empty');
    if (!info.url.startsWith('https://')) throw new Error('qq url should be upgraded to https: ' + info.url);
    if (info.bitrate !== 320) throw new Error('qq bitrate wrong: ' + info.bitrate);
  });
}

// kuwo search 走 gd-music：保留 http，不强制 https
function kuwoSearchAndUrl() {
  const calls = [];
  const sandbox = makeSandbox({
    fetch: function (url, init) {
      calls.push({ url: String(url), init: init });
      let body;
      const u = String(url);
      if (u.indexOf('types=search') >= 0) {
        body = [{ id: 'kw1', name: 'KSong', artist: 'KArtist', album: 'KAlbum', url_id: 'kw1', lyric_id: 'kw1' }];
      } else if (u.indexOf('types=url') >= 0) {
        body = { url: 'http://kuwo.example.com/kw1.aac', br: 320 };
      } else if (u.indexOf('types=lyric') >= 0) {
        body = { lyric: '[00:00.00]Hello\n[00:01.00]World' };
      } else {
        body = {};
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: function () { return Promise.resolve(body); },
        text: function () { return Promise.resolve(JSON.stringify(body)); }
      });
    }
  });
  vm.createContext(sandbox);
  vm.runInContext(bridgeSource, sandbox);
  const bridge = sandbox.window.LjyytProviders;
  const kuwo = bridge.createGdMusicProvider({
    bases: ['https://otter.dev/music-api'],
    useGlobalSourceCode: 'kuwo',
    gdSource: 'kuwo',
    label: '酷我音乐',
    keepHttpUrl: true
  });

  return kuwo.search('hello', 1, 5)
    .then(function (result) {
      if (!result.tracks.length) throw new Error('kuwo search empty');
      const t = result.tracks[0];
      if (t.source !== 'kuwo' || t.sourceLabel !== '酷我音乐') throw new Error('kuwo source/label wrong');
      if (t.provider !== 'gd-music') throw new Error('kuwo provider tag wrong');
      const firstCall = calls[0];
      if (firstCall.url.indexOf('types=search') < 0) throw new Error('kuwo search URL malformed: ' + firstCall.url);
      if (firstCall.url.indexOf('source=kuwo') < 0) throw new Error('kuwo source param missing');
      return kuwo.getPlayUrl({ id: 'kw1', urlId: 'kw1', source: 'kuwo' }, '320');
    })
    .then(function (info) {
      if (info.url !== 'http://kuwo.example.com/kw1.aac') throw new Error('kuwo should keep http url: ' + info.url);
      return kuwo.getLyric({ id: 'kw1', lyric_id: 'kw1', source: 'kuwo' });
    })
    .then(function (lyric) {
      if (!lyric.lines || lyric.lines.length !== 2) throw new Error('kuwo lyric parse failed');
      if (lyric.lines[0].text !== 'Hello' || lyric.lines[1].text !== 'World') throw new Error('kuwo lyric text wrong');
    });
}

Promise.resolve()
  .then(neteaseSearchFlow)
  .then(qqSearchFlow)
  .then(qqUrlFallback)
  .then(kuwoSearchAndUrl)
  .then(function () { console.log('providers-bridge: ok'); })
  .catch(function (err) {
    console.error(err && err.stack || err);
    process.exit(1);
  });
