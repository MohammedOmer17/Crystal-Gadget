/* =====================================================
   SHARED — STAGGERED CARD REVEAL
   Adds the "revealed" class to elements as they enter
   the viewport, with a configurable stagger delay.
   The actual opacity/transform animation lives in each
   page's CSS via the .revealed class.
   ===================================================== */

function initCardReveal(elements, { threshold = 0.1, stagger = (idx) => idx * 80 } = {}) {
  const els = Array.from(elements);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = els.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, stagger(idx));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold });

  els.forEach(el => observer.observe(el));

  return observer;
}
