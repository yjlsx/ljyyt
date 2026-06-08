const fs = require('fs');

const server = fs.readFileSync('server.js', 'utf8');
const worker = fs.readFileSync('cloudflare-worker/worker.js', 'utf8');

for (const [name, content] of [['server.js', server], ['cloudflare-worker/worker.js', worker]]) {
  if (!content.includes('function isBlockedAudioProxyHost')) {
    throw new Error(name + ' is missing the audio proxy host guard');
  }
  if (!/isBlockedAudioProxyHost\((?:audioUrl|parsed)\.hostname\)/.test(content)) {
    throw new Error(name + ' does not reject blocked audio proxy hosts');
  }
}

const helperStart = server.indexOf('function isBlockedAudioProxyHost');
const helperEnd = server.indexOf('function streamRemoteAudio');
if (helperStart < 0 || helperEnd < helperStart) {
  throw new Error('Could not extract server audio proxy helper block');
}

const helperModule = { exports: {} };
new Function('module', 'exports', server.slice(helperStart, helperEnd) + `
module.exports = { isBlockedAudioProxyHost };
`)(helperModule, helperModule.exports);

const { isBlockedAudioProxyHost } = helperModule.exports;

for (const host of [
  'localhost',
  '127.0.0.1',
  '10.0.0.1',
  '172.16.0.1',
  '172.31.255.255',
  '192.168.1.1',
  '169.254.169.254',
  '[::1]',
  '::1',
  'fc00::1',
  'fe80::1'
]) {
  if (!isBlockedAudioProxyHost(host)) {
    throw new Error('audio proxy host guard allowed blocked host: ' + host);
  }
}

for (const host of [
  'music.163.com',
  'other.web.ra01.sycdn.kuwo.cn',
  'example.com',
  '8.8.8.8'
]) {
  if (isBlockedAudioProxyHost(host)) {
    throw new Error('audio proxy host guard blocked public host: ' + host);
  }
}
