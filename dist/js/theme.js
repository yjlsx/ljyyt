(function() {
  'use strict';

  var THEME_KEY = 'ljyyt_theme';
  var LEGACY_KEY = 'ljyyt_dark_mode';
  var ALT_KEYS = ['theme', 'color-theme', 'preferred-theme', 'ljyyt_color_theme'];

  function normalizeTheme(theme) {
    theme = String(theme || '').toLowerCase();
    if (theme === 'dark' || theme === 'light' || theme === 'system') return theme;
    if (theme === 'true' || theme === 'night' || theme === 'dark-mode') return 'dark';
    if (theme === 'false' || theme === 'day' || theme === 'light-mode') return 'light';
    return 'light';
  }

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (error) { return null; }
  }

  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (error) {}
  }

  function resolveTheme(theme) {
    theme = normalizeTheme(theme);
    if (theme === 'system') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  }

  function getSavedTheme() {
    var saved = safeGet(THEME_KEY);
    if (saved) return normalizeTheme(saved);

    var legacy = safeGet(LEGACY_KEY);
    if (legacy === 'true' || legacy === 'false') {
      var migrated = legacy === 'true' ? 'dark' : 'light';
      persistTheme(migrated);
      return migrated;
    }

    for (var i = 0; i < ALT_KEYS.length; i++) {
      var value = safeGet(ALT_KEYS[i]);
      if (value) {
        var normalized = normalizeTheme(value);
        persistTheme(normalized);
        return normalized;
      }
    }
    return 'light';
  }

  function persistTheme(theme) {
    var normalized = normalizeTheme(theme);
    var resolved = resolveTheme(normalized);
    safeSet(THEME_KEY, normalized);
    safeSet(LEGACY_KEY, resolved === 'dark' ? 'true' : 'false');
    safeSet('theme', normalized);
    safeSet('color-theme', normalized);
    safeSet('preferred-theme', normalized);
    safeSet('ljyyt_color_theme', normalized);
  }

  function applyTheme(theme) {
    var normalized = normalizeTheme(theme);
    var resolved = resolveTheme(normalized);
    var root = document.documentElement;
    root.dataset.theme = resolved;
    root.dataset.themePreference = normalized;
    root.style.colorScheme = resolved;
    root.classList.toggle('dark', resolved === 'dark');
    root.classList.toggle('dark-mode', resolved === 'dark');
    root.classList.toggle('light', resolved === 'light');
    root.classList.toggle('light-mode', resolved === 'light');
    if (document.body) {
      document.body.dataset.theme = resolved;
      document.body.classList.toggle('dark-mode', resolved === 'dark');
      document.body.classList.toggle('light-mode', resolved === 'light');
    }
    var buttons = document.querySelectorAll('#btn-dark, #theme-toggle, [data-theme-toggle]');
    buttons.forEach(function(btn) {
      var isDark = resolved === 'dark';
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute('aria-label', isDark ? '切换到浅色模式' : '切换到深色模式');
      btn.setAttribute('title', isDark ? '切换到浅色模式' : '切换到深色模式');
      if ((btn.id === 'btn-dark' || (btn.dataset && btn.dataset.themeIconOnly === 'true')) && window.LJYYTIcons) {
        btn.innerHTML = isDark ? window.LJYYTIcons.sun || '☀' : window.LJYYTIcons.moon || '☾';
      }
    });
  }

  function setTheme(theme) {
    var normalized = normalizeTheme(theme);
    persistTheme(normalized);
    applyTheme(normalized);
    try {
      window.dispatchEvent(new CustomEvent('ljyyt:themechange', {
        detail: { preference: normalized, theme: resolveTheme(normalized) }
      }));
    } catch (error) {}
  }

  function toggleTheme() {
    setTheme(resolveTheme(getSavedTheme()) === 'dark' ? 'light' : 'dark');
  }

  window.LJYYTTheme = {
    key: THEME_KEY,
    get: getSavedTheme,
    set: setTheme,
    apply: applyTheme,
    toggle: toggleTheme,
    resolve: resolveTheme
  };

  applyTheme(getSavedTheme());

  if (window.matchMedia) {
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    var onSystemChange = function() {
      if (getSavedTheme() === 'system') applyTheme('system');
    };
    if (media.addEventListener) media.addEventListener('change', onSystemChange);
    else if (media.addListener) media.addListener(onSystemChange);
  }

  document.addEventListener('DOMContentLoaded', function() {
    applyTheme(getSavedTheme());
    document.addEventListener('click', function(event) {
      var target = event.target && event.target.closest && event.target.closest('#btn-dark, #theme-toggle, [data-theme-toggle]');
      if (!target) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      var explicit = target.getAttribute('data-theme-set');
      if (explicit) setTheme(explicit);
      else toggleTheme();
    }, true);
  });
})();
