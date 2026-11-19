(function () {
  var track = document.getElementById('cpTrack');
  if (!track) return;
  var prev = document.getElementById('cpPrev'), next = document.getElementById('cpNext');
  function step() {
    var card = track.querySelector('.cp-product-card');
    return card ? card.getBoundingClientRect().width + 20 : 300;
  }
  function update() {
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  }
  prev.addEventListener('click', function () { track.scrollBy({ left: -step() * 2, behavior: 'smooth' }); });
  next.addEventListener('click', function () { track.scrollBy({ left: step() * 2, behavior: 'smooth' }); });
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
