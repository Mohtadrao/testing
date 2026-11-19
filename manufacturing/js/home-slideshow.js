/* Homepage brand-statement background: cross-fading slideshow of the client photos */
(function () {
  var slides = document.querySelectorAll('.cp-slideshow .cp-slide');
  if (slides.length < 2) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  slides.forEach(function (img) { img.loading = 'eager'; });
  var i = 0;
  setInterval(function () {
    slides[i].classList.remove('is-on');
    i = (i + 1) % slides.length;
    slides[i].classList.add('is-on');
  }, 5000);
})();
