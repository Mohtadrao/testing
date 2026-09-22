/*!
 * Clearpath group switcher
 * A small floating pill (bottom-left) shown on every page of /manufacturing/
 * and /oilngas/. It links back to the Clearpath landing page and to the
 * sibling site. Self-contained: injects its own CSS, no dependencies.
 *
 * Loaded with an absolute path (/shared/clearpath-switcher.js) so a single
 * copy serves all 57 pages regardless of folder depth.
 */
(function () {
  'use strict';
  if (window.__cpSwitcher) return;
  window.__cpSwitcher = true;

  var path = location.pathname;
  var inMfg = /^\/manufacturing(\/|$)/.test(path);
  var inWp  = /^\/oilngas(\/|$)/.test(path);
  if (!inMfg && !inWp) return;

  var css = [
    '@font-face{font-family:"CP Poppins";font-weight:500;font-display:swap;',
    'src:url(/shared/Poppins-Medium.woff) format("woff")}',
    '@font-face{font-family:"CP Poppins";font-weight:700;font-display:swap;',
    'src:url(/shared/Poppins-Bold.woff) format("woff")}',
    '.cp-switch{position:fixed;left:16px;bottom:16px;z-index:2147483000;',
    'font:500 12px/1 "CP Poppins",Poppins,Arial,Helvetica,sans-serif;letter-spacing:.04em;',
    'display:flex;align-items:stretch;background:#151515;color:#fff;',
    'border-radius:999px;box-shadow:0 6px 24px rgba(0,0,0,.28);overflow:hidden;',
    'max-width:calc(100vw - 32px)}',
    '.cp-switch a{color:#fff;text-decoration:none;padding:11px 14px;display:flex;',
    'align-items:center;gap:6px;white-space:nowrap;transition:background .2s}',
    '.cp-switch a:hover,.cp-switch a:focus-visible{background:#c8370b;outline:none}',
    '.cp-switch a+a{border-left:1px solid rgba(255,255,255,.18)}',
    '.cp-switch a[aria-current="page"]{background:#c8370b;cursor:default;pointer-events:none}',
    '.cp-switch__home{font-weight:700}',
    '@media (max-width:520px){.cp-switch{left:10px;bottom:10px;font-size:11px}',
    '.cp-switch a{padding:10px 11px}.cp-switch__label{display:none}}',
    '@media print{.cp-switch{display:none}}'
  ].join('');

  var style = document.createElement('style');
  style.setAttribute('data-cp-switcher', '');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  var nav = document.createElement('nav');
  nav.className = 'cp-switch';
  nav.setAttribute('aria-label', 'Clearpath sections');
  nav.innerHTML =
    '<a class="cp-switch__home" href="/" title="Back to Clearpath home">&#8592;<span class="cp-switch__label"> Clearpath</span></a>' +
    '<a href="/manufacturing/index.html"' + (inMfg ? ' aria-current="page"' : '') + '>Manufacturing</a>' +
    '<a href="/oilngas/index.html"' + (inWp ? ' aria-current="page"' : '') + '>EPC Management</a>';

  function mount() { document.body.appendChild(nav); }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
