/* Homepage service cards: "+" opens the Features list, "−" closes it.
   Clicking anywhere else on the card still opens the service page. */
(function () {
  function toggle(btn) {
    var card = btn.closest('.service-info-link');
    var open = card.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Hide features' : 'Show features');
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.cp-toggle');
    if (!btn) return;
    e.preventDefault(); e.stopPropagation();
    toggle(btn);
  }, true);
  document.addEventListener('keydown', function (e) {
    var btn = e.target.closest && e.target.closest('.cp-toggle');
    if (btn && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.stopPropagation(); toggle(btn); }
  }, true);
})();
