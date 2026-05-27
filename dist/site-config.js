window.LJYYT_API_BASE = window.LJYYT_API_BASE || (function() {
  var host = window.location && window.location.hostname ? window.location.hostname : '';
  var isLocal = host === 'localhost' || host === '127.0.0.1' || host === '::1';
  return isLocal && window.location.origin ? window.location.origin : 'https://ljyyt-api.yjlsx0.workers.dev';
})();
window.LYRICS_API_ENDPOINT = window.LJYYT_API_BASE + '/api/lyrics';
window.LYRICS_SEARCH_API_ENDPOINT = window.LJYYT_API_BASE + '/api/lyrics/search';
window.COVER_API_ENDPOINT = window.LJYYT_API_BASE + '/api/cover';
window.AUDIO_API_ENDPOINT = window.AUDIO_API_ENDPOINT || '';
window.LJYYT_ENABLE_SAME_ORIGIN_AUDIO_API = window.LJYYT_ENABLE_SAME_ORIGIN_AUDIO_API || false;
