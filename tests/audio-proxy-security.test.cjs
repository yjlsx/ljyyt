const fs = require('fs');

const server = fs.readFileSync('server.js', 'utf8');
const worker = fs.readFileSync('cloudflare-worker/worker.js', 'utf8');

function extractFunction(source, name, prefix = 'function') {
  const start = source.indexOf(prefix + ' ' + name);
  if (start < 0) {
    throw new Error('Missing function ' + name);
  }
  let depth = 0;
  let opened = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (char === '{') {
      depth += 1;
      opened = true;
    } else if (char === '}') {
      depth -= 1;
      if (opened && depth === 0) {
        return source.slice(start, index + 1);
      }
    }
  }
  throw new Error('Could not extract function ' + name);
}

for (const [name, content] of [['server.js', server], ['cloudflare-worker/worker.js', worker]]) {
  if (!content.includes('function isBlockedAudioProxyHost')) {
    throw new Error(name + ' is missing the audio proxy host guard');
  }
  if (!/isBlockedAudioProxyHost\((?:audioUrl|parsed)\.hostname\)/.test(content)) {
    throw new Error(name + ' does not reject blocked audio proxy hosts');
  }
}

const helperStart = server.indexOf('function isBlockedAudioProxyHost');
const helperEnd = server.indexOf('async function streamRemoteAudio');
if (helperStart < 0 || helperEnd < helperStart) {
  throw new Error('Could not extract server audio proxy helper block');
}

const mockDns = {
  promises: {
    lookup: async (hostname, options) => {
      if (!options || options.all !== true) {
        throw new Error('audio proxy DNS guard should request all resolved addresses');
      }
      if (hostname === 'rebind.test') return [{ address: '127.0.0.1', family: 4 }];
      if (hostname === 'mixed.test') {
        return [
          { address: '8.8.8.8', family: 4 },
          { address: '10.0.0.5', family: 4 }
        ];
      }
      if (hostname === 'public.test') return [{ address: '8.8.8.8', family: 4 }];
      throw new Error('Unexpected DNS lookup for ' + hostname);
    }
  }
};

const helperModule = { exports: {} };
new Function('module', 'exports', 'dns', server.slice(helperStart, helperEnd) + `
module.exports = { isBlockedAudioProxyHost, createSafeAudioProxyLookup };
`)(helperModule, helperModule.exports, mockDns);

const { isBlockedAudioProxyHost, createSafeAudioProxyLookup } = helperModule.exports;

const workerHelperModule = { exports: {} };
new Function('module', 'exports', extractFunction(worker, 'isBlockedAudioProxyHost') + `
module.exports = { isBlockedAudioProxyHost };
`)(workerHelperModule, workerHelperModule.exports);

const blockedHosts = [
  'localhost',
  '127.0.0.1',
  '10.0.0.1',
  '172.16.0.1',
  '172.31.255.255',
  '192.168.1.1',
  '169.254.169.254',
  '[::1]',
  '::1',
  '::',
  '::ffff:127.0.0.1',
  '::ffff:10.0.0.1',
  '::ffff:192.168.1.1',
  'fc00::1',
  'fe80::1'
];

const publicHosts = [
  'music.163.com',
  'other.web.ra01.sycdn.kuwo.cn',
  'example.com',
  '8.8.8.8'
];

for (const [name, guard] of [
  ['server.js', isBlockedAudioProxyHost],
  ['cloudflare-worker/worker.js', workerHelperModule.exports.isBlockedAudioProxyHost]
]) {
  for (const host of blockedHosts) {
    if (!guard(host)) {
      throw new Error(name + ' audio proxy host guard allowed blocked host: ' + host);
    }
  }

  for (const host of publicHosts) {
    if (guard(host)) {
      throw new Error(name + ' audio proxy host guard blocked public host: ' + host);
    }
  }
}

async function expectBlockedResolvedHost(hostname) {
  try {
    await createSafeAudioProxyLookup(new URL('https://' + hostname + '/song.mp3'));
  } catch (error) {
    if (/Blocked audio proxy resolved host/.test(error.message)) return;
    throw new Error('audio proxy DNS guard returned unexpected error for ' + hostname + ': ' + error.message);
  }
  throw new Error('audio proxy DNS guard allowed resolved private host: ' + hostname);
}

(async () => {
  if (typeof createSafeAudioProxyLookup !== 'function') {
    throw new Error('server.js is missing createSafeAudioProxyLookup for DNS rebinding protection');
  }

  await expectBlockedResolvedHost('rebind.test');
  await expectBlockedResolvedHost('mixed.test');

  const safeLookup = await createSafeAudioProxyLookup(new URL('https://public.test/song.mp3'));
  await new Promise((resolve, reject) => {
    safeLookup('public.test', {}, (error, address, family) => {
      if (error) {
        reject(error);
        return;
      }
      if (address !== '8.8.8.8' || family !== 4) {
        reject(new Error('audio proxy DNS guard did not preserve safe resolved address'));
        return;
      }
      resolve();
    });
  });
})();
