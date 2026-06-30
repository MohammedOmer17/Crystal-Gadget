/* =====================================================
   SHARED — LIGHTBOX CONTROLLER
   Handles open/close/navigate, keyboard, and swipe
   gestures for the product image lightbox used across
   the headphones, chargers, and back-cover pages.

   Usage:
     const lightbox = createLightbox({
       getItems: () => [{ src, alt, label }, ...],
       showName: true // false on pages with no name label
     });
     lightbox.open(index);
   ===================================================== */

function createLightbox({ getItems, showName = true } = {}) {
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lbImg');
  const lbName     = showName ? document.getElementById('lbName') : null;
  const lbCount    = document.getElementById('lbCount');
  const lbClose    = document.getElementById('lbClose');
  const lbBackdrop = document.getElementById('lbBackdrop');
  const lbPrev     = document.getElementById('lbPrev');
  const lbNext     = document.getElementById('lbNext');

  let current = 0;
  let items = [];

  function render() {
    const item = items[current];
    lbImg.src = item.src;
    lbImg.alt = item.alt || '';
    if (lbName) lbName.textContent = item.label || '';
    if (lbCount) lbCount.textContent = `${current + 1} / ${items.length}`;
  }

  function open(idx) {
    items = getItems();
    current = idx;
    render();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    current = (current + dir + items.length) % items.length;
    lbImg.style.opacity = '0';
    lbImg.style.transform = `translateX(${dir > 0 ? '30px' : '-30px'})`;
    setTimeout(() => {
      render();
      lbImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      lbImg.style.opacity = '1';
      lbImg.style.transform = 'translateX(0)';
    }, 150);
  }

  lbClose?.addEventListener('click', (e) => { e.stopPropagation(); close(); });
  lbBackdrop?.addEventListener('click', close);
  lbPrev?.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
  lbNext?.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'ArrowLeft')  navigate(-1);
  });

  let touchStart = 0;
  lightbox.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; });
  lightbox.addEventListener('touchend', e => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
  });

  return { open, close, navigate };
}
