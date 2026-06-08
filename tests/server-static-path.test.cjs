const fs = require('fs');

const server = fs.readFileSync('server.js', 'utf8');

if (!server.includes('function safeDecodePathname')) {
  throw new Error('server.js is missing safeDecodePathname for bad URI handling');
}

if (!server.includes('function resolveStaticPath')) {
  throw new Error('server.js is missing resolveStaticPath for static file boundary checks');
}

if (server.includes('parsedPath.startsWith(ROOT)')) {
  throw new Error('server.js still uses unsafe prefix matching for static paths');
}

if (!server.includes("sendJson(res, 400, { error: 'Bad request path' })")) {
  throw new Error('server.js does not return 400 for invalid encoded pathnames');
}

if (!server.includes("'Cache-Control': ext === '.html' ? 'no-store' : 'public, max-age=300'")) {
  throw new Error('server.js should serve local HTML with no-store so inline playback UI code cannot stay stale');
}

if (server.includes("ext === '.html' ? 'no-cache'")) {
  throw new Error('server.js still allows revalidation caching for local HTML');
}

const helperStart = server.indexOf('function safeDecodePathname');
const helperEnd = server.indexOf('function sendFile');
if (helperStart < 0 || helperEnd < helperStart) {
  throw new Error('Could not extract static path helper block');
}

const helperModule = { exports: {} };
new Function('module', 'exports', 'require', '__dirname', `
const path = require('path');
const ROOT = __dirname;
` + server.slice(helperStart, helperEnd) + `
module.exports = { safeDecodePathname, resolveStaticPath };
`)(helperModule, helperModule.exports, require, process.cwd());

const { safeDecodePathname, resolveStaticPath } = helperModule.exports;

if (safeDecodePathname('/%E0%A4%A') !== null) {
  throw new Error('safeDecodePathname should reject malformed URI sequences');
}

if (!resolveStaticPath('/index.html').endsWith('index.html')) {
  throw new Error('resolveStaticPath should allow normal in-root paths');
}

for (const attack of [
  '/..%5Cljyyt2%5Csecret.txt',
  '/../ljyyt2/secret.txt',
  '/..%2F..%2FWindows%2Fwin.ini'
]) {
  if (resolveStaticPath(attack)) {
    throw new Error('resolveStaticPath allowed traversal path: ' + attack);
  }
}
