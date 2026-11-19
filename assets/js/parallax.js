/* Parallax for section background images marked [data-parallax].
   The image is drawn taller than its section (see .section-bg[data-parallax] in
   site.css) and shifted as the section crosses the viewport, so it scrolls more
   slowly than the page. Skipped for reduced-motion users. */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var layers = Array.prototype.slice.call(document.querySelectorAll('.section-bg[data-parallax]'));
  if (!layers.length) return;

  var active = new Set();
  var ticking = false;

  function update() {
    ticking = false;
    var vh = window.innerHeight;
    active.forEach(function (bg) {
      var img = bg.querySelector('img');
      var rect = bg.getBoundingClientRect();
      // -1 when the section is just leaving the top, +1 when just entering at the bottom
      var progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      progress = Math.max(-1, Math.min(1, progress));
      var range = parseFloat(bg.getAttribute('data-parallax')) || 0.2; // fraction of section height
      img.style.transform = 'translate3d(0,' + (-progress * range * rect.height).toFixed(1) + 'px,0)';
    });
  }

  function requestUpdate() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  document.documentElement.classList.add('parallax');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.isIntersecting ? active.add(e.target) : active.delete(e.target); });
      requestUpdate();
    }, { rootMargin: '100px 0px' });
    layers.forEach(function (bg) { io.observe(bg); });
  } else {
    layers.forEach(function (bg) { active.add(bg); });
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  requestUpdate();
})();
