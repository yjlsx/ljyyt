const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const scripts = pkg.scripts || {};
const doc = fs.readFileSync('CLOUDFLARE_WORKERS_SETUP.md', 'utf8');

if (scripts['worker:login'] !== 'npm exec -- wrangler login') {
  throw new Error('package.json should expose worker:login through the local Wrangler dependency');
}

if (scripts['deploy:worker'] !== 'npm exec -- wrangler deploy --config cloudflare-worker/wrangler.toml') {
  throw new Error('package.json should expose deploy:worker through the local Wrangler dependency and checked-in config');
}

if (/npm\s+install\s+-g\s+wrangler|(^|\s)wrangler\s+(login|deploy)/m.test(doc)) {
  throw new Error('Cloudflare setup docs should not require globally installed Wrangler commands');
}

for (const marker of [
  'npm run worker:login',
  'npm run deploy:worker',
  "window.LJYYT_API_BASE = 'https://ljyyt-api.<your-subdomain>.workers.dev';",
  '/api/gd-music',
  '/api/kuwo-url',
  '/api/kuwo-audio',
  '/api/audio-proxy'
]) {
  if (!doc.includes(marker)) {
    throw new Error('Cloudflare setup docs are missing marker: ' + marker);
  }
}
