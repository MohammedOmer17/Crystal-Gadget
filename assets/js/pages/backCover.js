/* =====================================================
   PHONE CASES (BACK COVER) PAGE
   ===================================================== */

// ── LAZY LOAD ──
initLazyLoad('100px');

// ── CARD REVEAL ──
const cards = document.querySelectorAll('.card');
initCardReveal(cards, { threshold: 0.08, stagger: (idx) => (idx % 3) * 80 });

// ── LIGHTBOX ──
const allImgs = [...document.querySelectorAll('.card img')];

const lightbox = createLightbox({
  getItems: () => allImgs.map(img => ({
    src: img.dataset.src || img.src,
    alt: img.alt
  })),
  showName: false
});

cards.forEach((card, i) => {
  card.addEventListener('click', () => lightbox.open(i));
});

// ── FILTER PILLS (visual only — adapt to your data) ──
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
  });
});
