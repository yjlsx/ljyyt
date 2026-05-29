const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const script = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/i)[1];

const applyRouteStart = script.indexOf('function applyInitialRoute()');
if (applyRouteStart < 0) {
  throw new Error('Missing applyInitialRoute');
}

const routeBody = script.slice(applyRouteStart, script.indexOf('async function chooseTrack', applyRouteStart));
const detailStart = script.indexOf('async function fetchMarketPlaylistDetail');
const detailBody = script.slice(detailStart, script.indexOf('function renderMarketPlaylistDetail', detailStart));

if (!routeBody.includes("view === 'market-playlist'")) {
  throw new Error('Initial route does not handle market playlist view');
}

if (!routeBody.includes("params.get('playlist')")) {
  throw new Error('Initial route does not read playlist id');
}

if (!routeBody.includes('fetchMarketPlaylistDetail')) {
  throw new Error('Initial route does not fetch market playlist detail');
}

for (const id of [
  'market-playlist-creator',
  'market-playlist-description',
  'market-playlist-date'
]) {
  if (!html.includes(id)) {
    throw new Error('Market playlist header missing #' + id);
  }
}

if (!detailBody.includes('playlist.description')) {
  throw new Error('Market playlist detail does not keep description');
}

if (!detailBody.includes('creator.nickname')) {
  throw new Error('Market playlist detail does not keep creator nickname');
}
