(function () {
  'use strict';

  /* ---------------------------------------------------------
     Clearpath landing stage — no buttons, no dots, no hint text.

     Desktop: hover the left half to preview Oil & Gas, the
     right half to preview EPC, moving the mouse off eases back
     to the black & white overview. Click while a preview is
     showing to open its page.

     Mobile: swipe up to preview Oil & Gas, swipe down to
     preview EPC — one swipe = one step, so from a preview a
     swipe the other way returns to the overview first, it
     doesn't jump straight to the opposite side. Tap while a
     preview is showing to open its page.

     Model: a single signed value P in [-1, 1].
       P = -1  ->  Oil & Gas Manufacturing
       P =  0  ->  Overview (home, black & white split)
       P = +1  ->  EPC Management
  --------------------------------------------------------- */

  var stage     = document.getElementById('stage');
  var robotImg  = document.getElementById('robotImg');
  var workerImg = document.getElementById('workerImg');
  var panelOil  = document.getElementById('panelOilGas');
  var panelEpc  = document.getElementById('panelEpc');

  var labelOil  = document.getElementById('labelOil');
  var labelEpc  = document.getElementById('labelEpc');
  var mGuideIcon = document.getElementById('mGuideIcon');
  var mGuideText = document.getElementById('mGuideText');

  var GUIDE = {
    home:   { icon: '\u21C5', text: 'Swipe up or down' },   // ⇅
    oilgas: { icon: '\u25B2', text: 'EPC Management' }, // ▲
    epc:    { icon: '\u25BC', text: 'Oil & Gas Manufacturing' }      // ▼
  };

  var PAGES = { oilgas: 'oilngas/index.html', epc: 'manufacturing/index.html' };
  var STATE_P = { oilgas: -1, home: 0, epc: 1 };

  var CFG = {
    desktop: { robotHome: 0, robotOil: 50, robotEpcExit: -25,
               workerHome: 50, workerEpc: 0, workerOilExit: 120 },
    mobile:  { robotHome: 0, robotOil: 45, robotEpcExit: -30,
               workerHome: 45, workerEpc: 0, workerOilExit: 100 }
  };

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var hoverCapable = window.matchMedia &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var state   = 'home';
  var target  = 0;
  var current = 0;

  // Fully independent of P/state — a small pixel nudge used only
  // for the one-time load-in demo, so it can never touch opacity
  // or grayscale and can never cause the photos to cross-fade.
  var peekTarget  = 0;
  var peekCurrent = 0;

  var isDragging   = false;
  var dragStartY   = 0;
  var dragStartCur = 0;
  var pointerId    = null;

  var TAP_PX = 8;

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smoothstep(edge0, edge1, x) {
    var t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }
  function isMobile() { return window.innerWidth <= 1024; }

  function setState(key) {
    state = key;
    target = STATE_P[key];
    stage.style.cursor = key === 'home' ? 'default' : 'pointer';

    labelOil.classList.toggle('is-active', key === 'oilgas');
    labelEpc.classList.toggle('is-active', key === 'epc');
    mGuideIcon.textContent = GUIDE[key].icon;
    mGuideText.textContent = GUIDE[key].text;
  }

  function nearestState(p) {
    var best = 'home', bestD = Infinity;
    Object.keys(STATE_P).forEach(function (k) {
      var d = Math.abs(STATE_P[k] - p);
      if (d < bestD) { bestD = d; best = k; }
    });
    return best;
  }

  function openCurrent() {
    if (PAGES[state]) window.location.href = PAGES[state];
  }

  /* ---------------- render: P -> visual state ---------------- */

  function render(P) {
    P = clamp(P, -1, 1);
    var mobile = isMobile();
    var c = mobile ? CFG.mobile : CFG.desktop;

    var robotPos, robotOpacity, robotGray, robotScale;
    if (P <= 0) {
      var m = -P;
      robotPos = lerp(c.robotHome, c.robotOil, m);
      robotOpacity = 1;
      robotGray = 1 - smoothstep(0.72, 1.0, m);
      robotScale = 1 + 0.035 * smoothstep(0, 1, m);
    } else {
      robotPos = lerp(c.robotHome, c.robotEpcExit, P);
      robotOpacity = 1 - smoothstep(0, 0.25, P);
      robotGray = 1;
      robotScale = 1;
    }

    var workerPos, workerOpacity, workerGray, workerScale;
    if (P >= 0) {
      var m2 = P;
      workerPos = lerp(c.workerHome, c.workerEpc, m2);
      workerOpacity = 1;
      workerGray = 1 - smoothstep(0.72, 1.0, m2);
      workerScale = 1 + 0.035 * smoothstep(0, 1, m2);
    } else {
      workerPos = lerp(c.workerHome, c.workerOilExit, -P);
      workerOpacity = 1 - smoothstep(0, 0.25, -P);
      workerGray = 1;
      workerScale = 1;
    }

    if (mobile) {
      robotImg.style.left = '0';
      robotImg.style.top = robotPos + 'vh';
      workerImg.style.left = '0';
      workerImg.style.top = workerPos + 'vh';
    } else {
      robotImg.style.top = '0';
      robotImg.style.left = robotPos + 'vw';
      workerImg.style.top = '0';
      workerImg.style.left = workerPos + 'vw';
    }

    robotImg.style.opacity = robotOpacity;
    robotImg.style.filter = 'grayscale(' + robotGray + ')';
    robotImg.style.transform = 'translateY(' + peekCurrent + 'px) scale(' + robotScale + ')';

    workerImg.style.opacity = workerOpacity;
    workerImg.style.filter = 'grayscale(' + workerGray + ')';
    workerImg.style.transform = 'translateY(' + peekCurrent + 'px) scale(' + workerScale + ')';

    var oilOpacity = P < 0 ? smoothstep(0.68, 1.0, -P) : 0;
    panelOil.style.opacity = oilOpacity;
    panelOil.style.transform = 'translateY(' + (1 - oilOpacity) * 22 + 'px)';
    panelOil.setAttribute('aria-hidden', oilOpacity < 0.5 ? 'true' : 'false');

    var epcOpacity = P > 0 ? smoothstep(0.68, 1.0, P) : 0;
    panelEpc.style.opacity = epcOpacity;
    panelEpc.style.transform = 'translateY(' + (1 - epcOpacity) * 22 + 'px)';
    panelEpc.setAttribute('aria-hidden', epcOpacity < 0.5 ? 'true' : 'false');
  }

  function tick() {
    if (!isDragging) {
      var factor = reduceMotion ? 1 : 0.085;
      current += (target - current) * factor;
      if (Math.abs(target - current) < 0.0006) current = target;
      peekCurrent += (peekTarget - peekCurrent) * 0.09;
    }
    render(current);
    requestAnimationFrame(tick);
  }

  /* ---------------- mobile: swipe to preview, tap to open ---------------- */

  var peekTimers = [];
  function clearPeek() {
    peekTimers.forEach(function (t) { clearTimeout(t); });
    peekTimers = [];
    peekTarget = 0;
  }

  // A one-time, un-asked-for little demo on first mobile load: the
  // photos nudge up then down a few pixels — purely a positional
  // wiggle, opacity/grayscale untouched — so the person *sees* the
  // page move instead of having to guess that swiping does
  // anything. Cancelled immediately on real touch.
  function schedulePeek() {
    if (reduceMotion || !isMobile()) return;
    peekTimers.push(setTimeout(function () { peekTarget = -10; }, 900));
    peekTimers.push(setTimeout(function () { peekTarget = 0; }, 1500));
    peekTimers.push(setTimeout(function () { peekTarget = 10; }, 2000));
    peekTimers.push(setTimeout(function () { peekTarget = 0; }, 2600));
  }

  stage.addEventListener('pointerdown', function (e) {
    if (!isMobile()) return;
    clearPeek();
    isDragging = true;
    dragStartY = e.clientY;
    dragStartCur = current;
    pointerId = e.pointerId;
    stage.setPointerCapture(pointerId);
  });

  stage.addEventListener('pointermove', function (e) {
    if (!isDragging) return;
    e.preventDefault();
    var dy = e.clientY - dragStartY;
    var span = Math.max(window.innerHeight, 320);
    current = clamp(dragStartCur + dy / span, -1, 1);
    render(current);
  }, { passive: false });

  function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    if (pointerId !== null) {
      try { stage.releasePointerCapture(pointerId); } catch (err) {}
    }
    var dy = e.clientY - dragStartY;
    if (Math.abs(dy) < TAP_PX) {
      setState(nearestState(current)); // stays put; a tap doesn't move it
      openCurrent();
    } else {
      setState(nearestState(current));
    }
  }

  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', function () { isDragging = false; });

  /* ---------------- desktop: hover to preview, click to open ---------------- */

  function onHoverMove(e) {
    if (isMobile()) return;
    var half = window.innerWidth / 2;
    setState(e.clientX < half ? 'oilgas' : 'epc');
  }

  function onHoverLeave() {
    if (isMobile()) return;
    setState('home');
  }

  if (hoverCapable) {
    stage.addEventListener('mousemove', onHoverMove);
    stage.addEventListener('mouseleave', onHoverLeave);
  }

  stage.addEventListener('click', function (e) {
    if (isMobile()) return; // tablet/mobile retains the original swipe-to-preview, tap-to-enter
    if (state === 'home') setState(e.clientX < window.innerWidth / 2 ? 'oilgas' : 'epc');
    openCurrent();
  });

  /* ---------------- go ---------------- */

  setState('home');
  render(0);
  requestAnimationFrame(tick);
  schedulePeek();

})();
