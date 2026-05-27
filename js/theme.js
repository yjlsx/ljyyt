(function() {
  'use strict';

  var THEME_KEY = 'ljyyt_theme';
  var LEGACY_KEY = 'ljyyt_dark_mode';

  function normalizeTheme(theme) {
    return theme === 'dark' || theme === 'system' ? theme : 'light';
  }

  function resolveTheme(theme) {
    theme = normalizeTheme(theme);
    if (theme === 'system') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  }

  function getSavedTheme() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved) return normalizeTheme(saved);
      var legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy === 'true' || legacy === 'false') {
        var migrated = legacy === 'true' ? 'dark' : 'light';
        localStorage.setItem(THEME_KEY, migrated);
        return migrated;
      }
    } catch (error) {}
    return 'light';
  }

  function applyTheme(theme) {
    var normalized = normalizeTheme(theme);
    var resolved = resolveTheme(normalized);
    document.documentElement.dataset.theme = resolved;
    document.documentElement.classList.toggle('dark', resolved === 'dark');
    document.documentElement.classList.toggle('dark-mode', resolved === 'dark');
    if (document.body) {
      document.body.classList.toggle('dark-mode', resolved === 'dark');
    }
    var buttons = document.querySelectorAll('#btn-dark, #theme-toggle, [data-theme-toggle]');
    buttons.forEach(function(btn) {
      btn.setAttribute('aria-pressed', resolved === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', resolved === 'dark' ? '切换到浅色模式' : '切换到深色模式');
      if ((btn.id === 'btn-dark' || (btn.dataset && btn.dataset.themeIconOnly === 'true')) && window.LJYYTIcons) {
        btn.innerHTML = resolved === 'dark' ? window.LJYYTIcons.sun || '☀' : window.LJYYTIcons.moon || '☾';
      }
    });
  }

  function setTheme(theme) {
    var normalized = normalizeTheme(theme);
    try {
      localStorage.setItem(THEME_KEY, normalized);
      localStorage.setItem(LEGACY_KEY, resolveTheme(normalized) === 'dark' ? 'true' : 'false');
    } catch (error) {}
    applyTheme(normalized);
  }

  function toggleTheme() {
    setTheme(resolveTheme(getSavedTheme()) === 'dark' ? 'light' : 'dark');
  }

  window.LJYYTTheme = {
    key: THEME_KEY,
    get: getSavedTheme,
    set: setTheme,
    apply: applyTheme,
    toggle: toggleTheme
  };

  applyTheme(getSavedTheme());

  document.addEventListener('DOMContentLoaded', function() {
    applyTheme(getSavedTheme());
    document.addEventListener('click', function(event) {
      var target = event.target && event.target.closest && event.target.closest('#btn-dark, #theme-toggle, [data-theme-toggle]');
      if (!target) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      toggleTheme();
    }, true);
  });
})();
