/* Scale-in reveal: each block fades up from 92% scale as it scrolls into view.
   The <head> adds .reveal to <html> only when motion is allowed and
   IntersectionObserver exists, so without JS everything is simply visible. */
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('reveal')) return;

  var STAGGER = 0.09; // seconds between blocks that enter together
  var MAX_DELAY = 0.45;

  var observer = new IntersectionObserver(function (entries) {
    var entering = entries
      .filter(function (e) { return e.isIntersecting; })
      .sort(function (a, b) {
        return a.boundingClientRect.top - b.boundingClientRect.top ||
               a.boundingClientRect.left - b.boundingClientRect.left;
      });
    entering.forEach(function (e, i) {
      e.target.style.setProperty('--reveal-delay', Math.min(i * STAGGER, MAX_DELAY) + 's');
      e.target.classList.add('is-visible');
      observer.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  document.querySelectorAll('.blk').forEach(function (el) { observer.observe(el); });
})();
