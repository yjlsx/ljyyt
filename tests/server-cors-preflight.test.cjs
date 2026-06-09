const fs = require('fs');
const vm = require('vm');

const server = fs.readFileSync('server.js', 'utf8');

function extractFunction(source, name, prefix = 'function') {
  const start = source.indexOf(prefix + ' ' + name);
  if (start < 0) throw new Error('Missing function ' + name);
  const bodyStart = source.indexOf('{', source.indexOf(')', start));
  if (bodyStart < 0) throw new Error('Missing function body ' + name);
  let depth = 0;
  let opened = false;
  for (let index = bodyStart; index < source.length; index += 1) {
    const char = source[index];
    if (char === '{') {
      depth += 1;
      opened = true;
    } else if (char === '}') {
      depth -= 1;
      if (opened && depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error('Could not extract function ' + name);
}

const corsBody = extractFunction(server, 'corsHeaders');
if (!corsBody.includes("'Access-Control-Allow-Headers': 'Content-Type, Accept, Range'")) {
  throw new Error('server CORS preflight should allow Range for browser audio requests');
}

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext([
  corsBody,
  extractFunction(server, 'sendCorsPreflight')
].join('\n'), sandbox);

const headers = sandbox.corsHeaders();
if (headers['Access-Control-Allow-Origin'] !== '*') {
  throw new Error('server CORS headers should allow hosted pages to call the local API');
}
if (headers['Access-Control-Allow-Methods'] !== 'GET, POST, OPTIONS') {
  throw new Error('server CORS preflight should allow GET audio/search requests and POST account requests');
}
if (headers['Access-Control-Allow-Headers'] !== 'Content-Type, Accept, Range') {
  throw new Error('server CORS preflight should allow Range request headers');
}

const writes = [];
const mockResponse = {
  writeHead(statusCode, responseHeaders) {
    writes.push({ statusCode, responseHeaders });
  },
  end(body) {
    writes.push({ body });
  }
};
sandbox.sendCorsPreflight(mockResponse);
if (!writes.length || writes[0].statusCode !== 204) {
  throw new Error('server CORS preflight should return 204');
}
if (writes[0].responseHeaders['Access-Control-Allow-Headers'] !== 'Content-Type, Accept, Range') {
  throw new Error('server CORS preflight response should include allowed headers');
}
if (writes[0].responseHeaders['Cache-Control'] !== 'no-store') {
  throw new Error('server CORS preflight response should not be cached');
}
if (writes[1].body !== undefined) {
  throw new Error('server CORS preflight should end without a response body');
}

const sendJsonBody = extractFunction(server, 'sendJson');
if (!sendJsonBody.includes('...corsHeaders()')) {
  throw new Error('sendJson should share the same CORS headers as preflight responses');
}

if (!server.includes("if (req.method === 'OPTIONS')")) {
  throw new Error('server.js should answer OPTIONS preflight requests before API routing');
}
