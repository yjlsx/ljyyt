const http = require('http');
const { spawn } = require('child_process');

const PORT = 3137;

function waitForServer(proc) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      if (Date.now() - started > 15000) {
        clearInterval(timer);
        reject(new Error('Timed out waiting for local server'));
        return;
      }
      const req = http.get(`http://127.0.0.1:${PORT}/index.html`, (res) => {
        res.resume();
        clearInterval(timer);
        resolve();
      });
      req.on('error', () => {});
      req.setTimeout(1000, () => req.destroy());
    }, 250);
    proc.once('exit', (code) => {
      clearInterval(timer);
      reject(new Error('Local server exited before readiness: ' + code));
    });
  });
}

function postJson(path, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload || {});
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body)
        }
      },
      (res) => {
        let text = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          text += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            contentType: res.headers['content-type'] || '',
            text
          });
        });
      }
    );
    req.on('error', reject);
    req.setTimeout(20000, () => req.destroy(new Error('request timeout')));
    req.end(body);
  });
}

(async () => {
  const proc = spawn(process.execPath, ['server.js'], {
    cwd: process.cwd(),
    env: { ...process.env, HOST: '127.0.0.1', PORT: String(PORT) },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  try {
    await waitForServer(proc);
    const response = await postJson('/api/netease/playlist', {
      playlistId: '26467411',
      cookie: ''
    });

    if (response.statusCode !== 200) {
      throw new Error('Expected 200 from playlist detail, got ' + response.statusCode + ': ' + response.text.slice(0, 200));
    }
    if (!/application\/json/i.test(response.contentType)) {
      throw new Error('Expected JSON content-type, got ' + response.contentType);
    }
    if (/^\s*</.test(response.text)) {
      throw new Error('Playlist detail returned HTML instead of JSON');
    }

    const payload = JSON.parse(response.text);
    const playlist = payload && (payload.playlist || payload.data && payload.data.playlist || payload.data || payload);
    if (!playlist || String(playlist.id) !== '26467411') {
      throw new Error('Playlist payload missing requested id');
    }
    if (!playlist.name || !Array.isArray(playlist.tracks) || playlist.tracks.length < 10) {
      throw new Error('Playlist payload missing name or tracks');
    }
    if (playlist.trackCount > 10 && playlist.tracks.length < playlist.trackCount) {
      throw new Error(`Playlist should expand trackIds into full tracks, got ${playlist.tracks.length}/${playlist.trackCount}`);
    }
    if (!playlist.tracks.some((track) => track && track.id && track.name && track.al && track.ar)) {
      throw new Error('Playlist tracks should include normalized NetEase song fields');
    }
  } finally {
    proc.kill();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
