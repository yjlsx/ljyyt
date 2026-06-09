const fs = require('fs');

for (const relPath of ['ORACLE_DEPLOY.md', 'dist/ORACLE_DEPLOY.md']) {
  const doc = fs.readFileSync(relPath, 'utf8');

  if (/AUDIO_PROXY_ALLOWLIST|AUDIO_PROXY_MODE=allowlist/.test(doc)) {
    throw new Error(relPath + ' still documents a non-existent audio proxy allowlist mode');
  }

  if (/AUDIO_SOURCE_PRIORITY|AUDIO_RESOLVER_URL|\/api\/audio\/resolve/.test(doc)) {
    throw new Error(relPath + ' still documents an audio resolver setting or route that server.js does not implement');
  }

  if (!doc.includes('/api/audio-proxy')) {
    throw new Error(relPath + ' should document the current local audio proxy route');
  }

  if (!/SSRF|DNS/.test(doc)) {
    throw new Error(relPath + ' should mention the current SSRF/DNS protection for the audio proxy');
  }

  if (!/Range|Accept-Ranges|Content-Range/.test(doc)) {
    throw new Error(relPath + ' should document range-aware audio proxy behavior');
  }
}
