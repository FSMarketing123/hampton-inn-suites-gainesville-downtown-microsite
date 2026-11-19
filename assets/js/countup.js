/* Count-up for numbers marked [data-count]. Each counts from its
   data-count-from value (default 0) to the number already in the markup the
   first time it scrolls into view. Without JS, or with reduced motion, the
   final number simply shows. */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var DURATION = 1600; // ms
  var els = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function run(el) {
    var to = parseInt(el.getAttribute('data-count'), 10);
    var from = parseInt(el.getAttribute('data-count-from') || '0', 10);
    var start = null;
    function frame(now) {
      if (start === null) start = now;
      var t = Math.min(1, (now - start) / DURATION);
      el.textContent = Math.round(from + (to - from) * easeOutCubic(t));
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = to;
    }
    requestAnimationFrame(frame);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      run(e.target);
    });
  }, { threshold: 0.6 });

  els.forEach(function (el) {
    el.textContent = el.getAttribute('data-count-from') || '0';
    io.observe(el);
  });
})();
