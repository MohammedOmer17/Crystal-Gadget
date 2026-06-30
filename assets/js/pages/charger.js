/* =====================================================
   CHARGERS PAGE
   ===================================================== */

// ── CARD REVEAL ──
const cards = document.querySelectorAll('.bento-card');
const infoCard = document.getElementById('infoCard');
initCardReveal([...cards, infoCard], { threshold: 0.1, stagger: (idx) => idx * 80 });

// ── LAZY LOAD ──
initLazyLoad('200px');

// ── FILTER ──
const pills = document.querySelectorAll('.pill');
pills.forEach(p => p.addEventListener('click', () => {
  pills.forEach(x => x.classList.remove('active'));
  p.classList.add('active');
  const filter = p.dataset.filter;
  let vis = 0;
  cards.forEach(c => {
    const match = filter === 'All' || c.dataset.category === filter;
    c.style.display = match ? '' : 'none';
    if (match) vis++;
  });
  document.getElementById('itemCount').textContent =
    `Showing ${vis} of ${cards.length} chargers`;
}));

// ── LIGHTBOX ──
function getVisibleCards() {
  return [...cards].filter(c => c.style.display !== 'none');
}

const lightbox = createLightbox({
  getItems: () => getVisibleCards().map(c => ({
    src: c.querySelector('img').src,
    alt: c.querySelector('img').alt,
    label: c.dataset.label
  })),
  showName: true
});

cards.forEach(c => c.addEventListener('click', () => {
  const idx = getVisibleCards().indexOf(c);
  if (idx !== -1) lightbox.open(idx);
}));
