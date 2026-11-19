/* Fades the fixed HWE logo out as the page scrolls down past the hero and
   back in when scrolling up. Fully visible at the top, gone after 45% of a
   screen height. Once invisible it stops catching clicks. */
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;

  var FADE_DISTANCE = 0.45; // fraction of the viewport height
  var ticking = false;

  function update() {
    ticking = false;
    var distance = window.innerHeight * FADE_DISTANCE;
    var opacity = Math.max(0, Math.min(1, 1 - window.scrollY / distance));
    header.style.opacity = opacity.toFixed(3);
    header.style.visibility = opacity === 0 ? 'hidden' : '';
  }

  function requestUpdate() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();
})();
