const fs = require('fs');

for (const file of ['index.html', 'dist/index.html']) {
  const html = fs.readFileSync(file, 'utf8');

  if (!/var\s+_isLocalDev\s*=/.test(html)) {
    throw new Error(file + ' is missing the _isLocalDev runtime flag used by playback URL helpers');
  }

  if (!html.includes('function isLocalDevHostname')) {
    throw new Error(file + ' should centralize local-host detection for API route helpers');
  }

  if (!html.includes("hostname === 'localhost'") ||
      !html.includes("hostname === '127.0.0.1'") ||
      !html.includes("hostname === '::1'")) {
    throw new Error(file + ' should align local-host detection with site-config.js, including IPv6 loopback');
  }

  if (!html.includes('var _isLocalDev = isLocalDevHostname(location.hostname);')) {
    throw new Error(file + ' should derive _isLocalDev from the shared hostname helper');
  }

  if (/var\s+_isLocalDev\s*=\s*\/\^\(localhost\|127\\\.\)\//.test(html)) {
    throw new Error(file + ' still uses broad prefix matching that can misclassify hosted domains');
  }
}
