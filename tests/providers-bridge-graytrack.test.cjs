const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

function pickFunction(script, name) {
  let start = script.indexOf('function ' + name);
  if (start > 6 && script.slice(start - 6, start) === 'async ') start -= 6;
  if (start < 0) throw new Error('Missing function ' + name);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let opened = false;
  for (let index = start; index < script.length; index += 1) {
    const char = script[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') {
      depth += 1;
      opened = true;
    } else if (char === '}') {
      depth -= 1;
      if (opened && depth === 0) return script.slice(start, index + 1);
    }
  }
  throw new Error('Could not parse function ' + name);
}

function readInlineScript(file) {
  const html = fs.readFileSync(file, 'utf8');
  const m = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i);
  if (!m) throw new Error('inline script not found in ' + file);
  return m[1];
}

function makeBaseSandbox(extras) {
  const win = Object.assign({}, extras && extras.window || {});
  const sandbox = {
    window: win,
    DEFAULT_COVER: 'cover.jpg',
    SEARCH_RESULT_LIMIT: 100,
    AbortController,
    DOMException,
    Promise,
    setTimeout,
    clearTimeout,
    console: { warn() {}, info() {}, error() {} },
    appSettings: { quality: '320' },
    gdMusicApiBase: '/api/gd-music',
    qqApiBase: 'https://primary.example/api/qq',
    qqFallbackProxyBase: 'https://otter.example/music-api/qqmusic/proxy',
    safeCover(v) { return v || 'cover.jpg'; },
    parseTrackDuration(v) { return Number(v) || 0; },
    normalizeAudioUrl(u) { return String(u || '').trim(); },
    isBlockedAudioUrl() { return false; },
    getAudioProxyUrl(u) { return '/proxy?u=' + encodeURIComponent(u); },
    getSourceLabel(source) {
      return { _netease: 'Netease', qq: 'QQ音乐', kuwo: '酷我音乐' }[source] || source;
    },
    fetchGdMusicJson() { throw new Error('fetchGdMusicJson should not be called when bridge succeeds'); },
    fetchOtterNetease() { throw new Error('fetchOtterNetease should not be called when bridge succeeds'); },
    fetchQqTrackUrlPayload() { throw new Error('fetchQqTrackUrlPayload should not be called when bridge succeeds'); },
    fetchLxTrackUrlPayload() { throw new Error('fetchLxTrackUrlPayload should not be called when bridge succeeds'); },
    resolveNeteaseApiTrackUrl() { throw new Error('resolveNeteaseApiTrackUrl should not be called when bridge succeeds'); },
    normalizeExternalTrack(t) { return Object.assign({}, t, { title: t.name || t.title || '', urlId: t.url_id || t.id || '' }); }
  };
  if (extras && extras.overrides) Object.assign(sandbox, extras.overrides);
  vm.createContext(sandbox);
  return sandbox;
}

function loadInlineFns(sandbox, script, names) {
  const body = names.map((n) => pickFunction(script, n)).join('\n');
  vm.runInContext(body, sandbox);
}

function makeBridgeProvider(impl) {
  return Object.assign({ source: '', label: '', enabled: true }, impl);
}

function makeBridge(providers, getPlayUrlWithFallback) {
  const map = new Map();
  providers.forEach((p) => map.set(p.source, p));
  return {
    getProvider(s) { return map.get(s); },
    getEnabledProviders() { return [...map.values()]; },
    getPlayUrlWithFallback: getPlayUrlWithFallback || (() => Promise.reject(new Error('no bridge play url'))),
    searchAll() { return Promise.resolve({ tracks: [] }); },
    autoMatch() { return Promise.resolve([]); },
    register() {}, unregister() {}
  };
}

// ---------- 1. searchQqApiTracks 灰度 ----------

async function testQqSearchGray() {
  for (const file of ['index.html', 'dist/index.html']) {
    const script = readInlineScript(path.join(ROOT, file));

    // (a) 开关开 + 桥成功：必须走桥，不应该调用 fetch
    {
      let fetchCalls = 0;
      const sandbox = makeBaseSandbox({
        window: {
          LJYYT_USE_PROVIDERS_BRIDGE: true,
          LjyytProviders: makeBridge([
            makeBridgeProvider({
              source: 'qq',
              search: () => Promise.resolve({
                tracks: [{ id: 'bridge1', name: 'Bridge Song', artist: 'Bridge Artist', urlId: 'bridge1', source: 'qq', sourceLabel: 'QQ音乐', duration: 200 }]
              })
            })
          ])
        },
        overrides: { fetch: () => { fetchCalls += 1; return Promise.reject(new Error('fetch should not be called')); } }
      });
      loadInlineFns(sandbox, script, ['adaptBridgeExternalTrack', 'normalizeQqProxyTrack', 'isQqProxyHealthPayload', 'fetchQqSearchPage', 'searchQqApiTracks']);

      const out = await sandbox.searchQqApiTracks('test', 5);
      if (fetchCalls !== 0) throw new Error('[' + file + '] qq bridge: fetch should not have been called, got ' + fetchCalls);
      if (out.length !== 1 || out[0].title !== 'Bridge Song' || out[0].source !== 'qq' || out[0].urlId !== 'bridge1') {
        throw new Error('[' + file + '] qq bridge: bad adapted track ' + JSON.stringify(out));
      }
    }

    // (b) 开关开 + 桥失败：必须回退到 fetch
    {
      let fetchCalls = 0;
      const sandbox = makeBaseSandbox({
        window: {
          LJYYT_USE_PROVIDERS_BRIDGE: true,
          LjyytProviders: makeBridge([
            makeBridgeProvider({
              source: 'qq',
              search: () => Promise.reject(new Error('bridge boom'))
            })
          ])
        },
        overrides: {
          fetch(url) {
            fetchCalls += 1;
            if (String(url).indexOf('/qqmusic/proxy') >= 0) {
              return Promise.resolve({ ok: true, json: () => Promise.resolve({ items: [{ id: 1, name: 'Fallback Song', artist: ['F'], url_id: 'f1' }] }) });
            }
            return Promise.resolve({ ok: true, json: () => Promise.resolve([{ id: 1, name: 'Fallback Song', artist: ['F'], url_id: 'f1' }]) });
          }
        }
      });
      loadInlineFns(sandbox, script, ['adaptBridgeExternalTrack', 'normalizeQqProxyTrack', 'isQqProxyHealthPayload', 'fetchQqSearchPage', 'searchQqApiTracks']);

      const out = await sandbox.searchQqApiTracks('test', 5);
      if (fetchCalls === 0) throw new Error('[' + file + '] qq fallback: fetch should have been called');
      if (out.length !== 1 || out[0].title !== 'Fallback Song') throw new Error('[' + file + '] qq fallback: bad track ' + JSON.stringify(out));
    }

    // (c) 开关关：完全不碰桥
    {
      let bridgeCalls = 0;
      let fetchCalls = 0;
      const sandbox = makeBaseSandbox({
        window: {
          LJYYT_USE_PROVIDERS_BRIDGE: false,
          LjyytProviders: makeBridge([
            makeBridgeProvider({ source: 'qq', search: () => { bridgeCalls += 1; return Promise.resolve({ tracks: [] }); } })
          ])
        },
        overrides: {
          fetch(url) {
            fetchCalls += 1;
            if (String(url).indexOf('/qqmusic/proxy') >= 0) {
              return Promise.resolve({ ok: true, json: () => Promise.resolve({ items: [{ id: 2, name: 'Direct', artist: ['A'], url_id: 'd2' }] }) });
            }
            return Promise.resolve({ ok: true, json: () => Promise.resolve([{ id: 2, name: 'Direct', artist: ['A'], url_id: 'd2' }]) });
          }
        }
      });
      loadInlineFns(sandbox, script, ['adaptBridgeExternalTrack', 'normalizeQqProxyTrack', 'isQqProxyHealthPayload', 'fetchQqSearchPage', 'searchQqApiTracks']);
      const out = await sandbox.searchQqApiTracks('test', 5);
      if (bridgeCalls !== 0) throw new Error('[' + file + '] qq off: bridge should not be called');
      if (fetchCalls === 0) throw new Error('[' + file + '] qq off: fetch should be called');
      if (out.length !== 1 || out[0].title !== 'Direct') throw new Error('[' + file + '] qq off: bad track');
    }
  }
}

// ---------- 2. searchGdMusicSourceTracks (kuwo) 灰度 ----------

async function testKuwoSearchGray() {
  for (const file of ['index.html', 'dist/index.html']) {
    const script = readInlineScript(path.join(ROOT, file));

    // (a) source=kuwo + 桥成功：走桥
    {
      let fetchCalls = 0;
      const sandbox = makeBaseSandbox({
        window: {
          LJYYT_USE_PROVIDERS_BRIDGE: true,
          LjyytProviders: makeBridge([
            makeBridgeProvider({
              source: 'kuwo',
              search: () => Promise.resolve({
                tracks: [{ id: 'kw1', name: 'Kuwo Song', artist: 'KA', urlId: 'kw1', source: 'kuwo', sourceLabel: '酷我音乐', duration: 180 }]
              })
            })
          ])
        },
        overrides: { fetch: () => { fetchCalls += 1; return Promise.reject(new Error('not used')); } }
      });
      loadInlineFns(sandbox, script, ['adaptBridgeExternalTrack', 'fetchGdMusicJson', 'searchGdMusicSourceTracks']);

      // 重写 fetchGdMusicJson 让它"失败"以便确认确实没用它
      sandbox.fetchGdMusicJson = () => { throw new Error('fetchGdMusicJson should not be called'); };

      const out = await sandbox.searchGdMusicSourceTracks('test', 'kuwo', 5);
      if (out.length !== 1 || out[0].title !== 'Kuwo Song' || out[0].source !== 'kuwo' || out[0].urlId !== 'kw1') {
        throw new Error('[' + file + '] kuwo bridge: bad track ' + JSON.stringify(out));
      }
    }

    // (b) source=joox（非 kuwo）：不走桥，即使开关开
    {
      let bridgeCalls = 0;
      const sandbox = makeBaseSandbox({
        window: {
          LJYYT_USE_PROVIDERS_BRIDGE: true,
          LjyytProviders: makeBridge([
            makeBridgeProvider({ source: 'kuwo', search: () => { bridgeCalls += 1; return Promise.resolve({ tracks: [] }); } })
          ])
        },
        overrides: {
          fetchGdMusicJson(url) {
            if (String(url).indexOf('source=joox') < 0) throw new Error('expected joox in url, got ' + url);
            return Promise.resolve([{ id: 'j1', name: 'Joox Song', artist: ['J'], url_id: 'j1', source: 'joox' }]);
          }
        }
      });
      loadInlineFns(sandbox, script, ['adaptBridgeExternalTrack', 'searchGdMusicSourceTracks']);

      const out = await sandbox.searchGdMusicSourceTracks('test', 'joox', 5);
      if (bridgeCalls !== 0) throw new Error('[' + file + '] joox: bridge.kuwo should not be called');
      if (out.length !== 1 || out[0].title !== 'Joox Song') throw new Error('[' + file + '] joox: bad track ' + JSON.stringify(out));
    }
  }
}

// ---------- 3. resolveExternalTrackUrl 灰度 ----------

async function testResolvePlayUrlGray() {
  for (const file of ['index.html', 'dist/index.html']) {
    const script = readInlineScript(path.join(ROOT, file));

    // (a) qq + 桥成功 + url 是 https：直接返回，不走原路径
    {
      let bridgeCalls = 0;
      const sandbox = makeBaseSandbox({
        window: {
          LJYYT_USE_PROVIDERS_BRIDGE: true,
          LjyytProviders: makeBridge([], () => {
            bridgeCalls += 1;
            return Promise.resolve({ url: 'https://cdn.example/qq.mp3' });
          })
        }
      });
      loadInlineFns(sandbox, script, ['resolveExternalTrackUrl']);
      const url = await sandbox.resolveExternalTrackUrl({ source: 'qq', urlId: 'qq1', name: 'X', artist: 'Y' });
      if (bridgeCalls !== 1) throw new Error('[' + file + '] qq resolve: bridge should be called once, got ' + bridgeCalls);
      if (url !== 'https://cdn.example/qq.mp3') throw new Error('[' + file + '] qq resolve: bad url ' + url);
    }

    // (b) qq + 桥返回 http：必须走 proxy
    {
      const sandbox = makeBaseSandbox({
        window: {
          LJYYT_USE_PROVIDERS_BRIDGE: true,
          LjyytProviders: makeBridge([], () => Promise.resolve({ url: 'http://cdn.example/qq.mp3' }))
        }
      });
      loadInlineFns(sandbox, script, ['resolveExternalTrackUrl']);
      const url = await sandbox.resolveExternalTrackUrl({ source: 'qq', urlId: 'qq1', name: 'X', artist: 'Y' });
      if (!url.startsWith('/proxy?')) throw new Error('[' + file + '] qq http resolve: should go through proxy, got ' + url);
    }

    // (c) kuwo + 桥返回 http：保留 http，不走 proxy
    {
      const sandbox = makeBaseSandbox({
        window: {
          LJYYT_USE_PROVIDERS_BRIDGE: true,
          LjyytProviders: makeBridge([], () => Promise.resolve({ url: 'http://kuwo.example/k.mp3' }))
        }
      });
      loadInlineFns(sandbox, script, ['resolveExternalTrackUrl']);
      const url = await sandbox.resolveExternalTrackUrl({ source: 'kuwo', urlId: 'kw1', name: 'X', artist: 'Y' });
      if (url !== 'http://kuwo.example/k.mp3') throw new Error('[' + file + '] kuwo http resolve: should keep http, got ' + url);
    }

    // (d) qq + 桥失败 + 原 fetchQqTrackUrlPayload 成功：回退
    {
      let fallbackCalls = 0;
      const sandbox = makeBaseSandbox({
        window: {
          LJYYT_USE_PROVIDERS_BRIDGE: true,
          LjyytProviders: makeBridge([], () => Promise.reject(new Error('bridge boom')))
        },
        overrides: {
          fetchQqTrackUrlPayload(urlId) {
            fallbackCalls += 1;
            return Promise.resolve({ url: 'https://fallback.example/q.mp3' });
          }
        }
      });
      loadInlineFns(sandbox, script, ['resolveExternalTrackUrl']);
      const url = await sandbox.resolveExternalTrackUrl({ source: 'qq', urlId: 'qq1', name: 'X', artist: 'Y' });
      if (fallbackCalls !== 1) throw new Error('[' + file + '] qq fallback: should call original path, got ' + fallbackCalls);
      if (url !== 'https://fallback.example/q.mp3') throw new Error('[' + file + '] qq fallback: bad url ' + url);
    }

    // (e) 开关关：完全不碰桥（不调 getPlayUrlWithFallback）
    {
      let bridgeCalls = 0;
      let fallbackCalls = 0;
      const sandbox = makeBaseSandbox({
        window: {
          LJYYT_USE_PROVIDERS_BRIDGE: false,
          LjyytProviders: makeBridge([], () => { bridgeCalls += 1; return Promise.resolve({ url: 'https://nope/' }); })
        },
        overrides: {
          fetchQqTrackUrlPayload() {
            fallbackCalls += 1;
            return Promise.resolve({ url: 'https://direct.example/q.mp3' });
          }
        }
      });
      loadInlineFns(sandbox, script, ['resolveExternalTrackUrl']);
      const url = await sandbox.resolveExternalTrackUrl({ source: 'qq', urlId: 'qq1', name: 'X', artist: 'Y' });
      if (bridgeCalls !== 0) throw new Error('[' + file + '] off: bridge should not be called');
      if (fallbackCalls !== 1) throw new Error('[' + file + '] off: fallback should be called');
      if (url !== 'https://direct.example/q.mp3') throw new Error('[' + file + '] off: bad url ' + url);
    }

    // (f) 其他源（migu）：开关开但桥不该被调（不在 _netease/qq/kuwo 名单里）
    {
      let bridgeCalls = 0;
      const sandbox = makeBaseSandbox({
        window: {
          LJYYT_USE_PROVIDERS_BRIDGE: true,
          LjyytProviders: makeBridge([], () => { bridgeCalls += 1; return Promise.resolve({ url: 'https://nope/' }); })
        },
        overrides: {
          fetchGdMusicJson(url) {
            if (String(url).indexOf('source=migu') < 0) throw new Error('expected migu in url, got ' + url);
            return Promise.resolve({ url: 'https://migu.example/m.mp3' });
          }
        }
      });
      loadInlineFns(sandbox, script, ['resolveExternalTrackUrl']);
      const url = await sandbox.resolveExternalTrackUrl({ source: 'migu', urlId: 'm1', name: 'X', artist: 'Y' });
      if (bridgeCalls !== 0) throw new Error('[' + file + '] migu: bridge should not be called for non-listed source');
      if (url !== 'https://migu.example/m.mp3') throw new Error('[' + file + '] migu: bad url ' + url);
    }
  }
}

(async () => {
  try {
    await testQqSearchGray();
    await testKuwoSearchGray();
    await testResolvePlayUrlGray();
    console.log('providers-bridge-graytrack: ok');
  } catch (err) {
    console.error(err && err.stack || err);
    process.exit(1);
  }
})();
