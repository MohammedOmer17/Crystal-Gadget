/* =====================================================
   HEADPHONES PAGE
   ===================================================== */

// ── VIDEO PLACEHOLDER LOGIC ──
const promoVideo = document.getElementById('promo-video');
const videoPlaceholder = document.getElementById('video-placeholder');

// Show video player only when media is actually loadable
promoVideo.addEventListener('loadeddata', () => {
  videoPlaceholder.style.display = 'none';
  promoVideo.style.display = 'block';
});

promoVideo.addEventListener('error', () => {
  promoVideo.style.display = 'none';
  videoPlaceholder.style.display = 'flex';
});

// Check if src is valid on page load
if (!promoVideo.currentSrc || promoVideo.networkState === promoVideo.NETWORK_NO_SOURCE) {
  promoVideo.style.display = 'none';
}

// ── LAZY LOAD ──
initLazyLoad('100px');

// ── CARD REVEAL ──
const cards = document.querySelectorAll('.card');
initCardReveal(cards, { threshold: 0.08, stagger: (idx) => (idx % 3) * 80 });

// ── LIGHTBOX ──
let visibleCards = [...cards];

function getImgSrc(card) {
  const img = card.querySelector('img');
  return img.dataset.src || img.src;
}

const lightbox = createLightbox({
  getItems: () => visibleCards.map(card => ({
    src: getImgSrc(card),
    alt: card.querySelector('img').alt,
    label: card.dataset.label
  })),
  showName: true
});

cards.forEach(card => {
  card.addEventListener('click', () => {
    const idx = visibleCards.indexOf(card);
    if (idx !== -1) lightbox.open(idx);
  });
});

// ── FILTER PILLS ──
const itemCountEl = document.getElementById('item-count');

document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    const filter = pill.dataset.filter;

    cards.forEach(card => {
      const show = filter === 'All' || card.dataset.category === filter;
      card.style.display = show ? '' : 'none';
    });

    visibleCards = [...cards].filter(c => c.style.display !== 'none');
    if (itemCountEl) {
      itemCountEl.textContent = `Showing ${visibleCards.length} design${visibleCards.length !== 1 ? 's' : ''}`;
    }
  });
});
