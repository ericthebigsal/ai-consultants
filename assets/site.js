// ai-consultants — shared theme toggle (light / dark / system)
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  var order = ['system', 'light', 'dark'];
  var stored = null;
  try { stored = localStorage.getItem('aic-theme'); } catch (e) {}
  var state = order.indexOf(stored) > -1 ? stored : 'system';

  function apply() {
    if (state === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', state);
    btn.textContent = state === 'system' ? 'Theme: Auto' : (state === 'light' ? 'Theme: Light' : 'Theme: Dark');
  }
  apply();
  btn.addEventListener('click', function () {
    state = order[(order.indexOf(state) + 1) % order.length];
    try { localStorage.setItem('aic-theme', state); } catch (e) {}
    apply();
  });
})();
