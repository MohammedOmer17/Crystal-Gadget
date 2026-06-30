/* =====================================================
   SHARED — LAZY IMAGE LOADER
   Loads img[data-src] elements as they approach the
   viewport, then marks them "loaded" so CSS can swap
   the shimmer placeholder for the real image.
   ===================================================== */

function initLazyLoad(rootMargin = '100px') {
  const images = document.querySelectorAll('img[data-src]');

  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.onload = () => img.classList.add('loaded');
        }
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin });

  images.forEach(img => imgObserver.observe(img));

  return imgObserver;
}
