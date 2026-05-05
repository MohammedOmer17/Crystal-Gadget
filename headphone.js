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

// ── LAZY LOAD (IntersectionObserver) ──
const cards = document.querySelectorAll('.card');
const images = document.querySelectorAll('img[data-src]');

// Image observer — load images when near viewport
const imgObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const img = e.target;
      img.src = img.dataset.src;
      img.onload = () => img.classList.add('loaded');
      imgObserver.unobserve(img);
    }
  });
}, { rootMargin: '100px' });

images.forEach(img => imgObserver.observe(img));

// Card reveal observer — staggered entrance
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const card = e.target;
      const idx = Array.from(cards).indexOf(card);
      setTimeout(() => card.classList.add('revealed'), (idx % 3) * 80);
      cardObserver.unobserve(card);
    }
  });
}, { threshold: 0.08 });

cards.forEach(card => cardObserver.observe(card));

// ── LIGHTBOX ──
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbName    = document.getElementById('lbName');
const lbCount   = document.getElementById('lbCount');

let current       = 0;
let visibleCards  = [...cards];

function getImgSrc(card) {
  const img = card.querySelector('img');
  return img.dataset.src || img.src;
}

function openLightbox(idx) {
  current = idx;
  const card = visibleCards[idx];
  lbImg.src = getImgSrc(card);
  lbImg.alt = card.querySelector('img').alt;
  lbName.textContent = card.dataset.label;
  lbCount.textContent = `${idx + 1} / ${visibleCards.length}`;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function navigate(dir) {
  current = (current + dir + visibleCards.length) % visibleCards.length;
  const card = visibleCards[current];

  lbImg.style.opacity = '0';
  lbImg.style.transform = `translateX(${dir > 0 ? '30px' : '-30px'})`;

  setTimeout(() => {
    lbImg.src = getImgSrc(card);
    lbImg.alt = card.querySelector('img').alt;
    lbName.textContent = card.dataset.label;
    lbCount.textContent = `${current + 1} / ${visibleCards.length}`;
    lbImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    lbImg.style.opacity = '1';
    lbImg.style.transform = 'translateX(0)';
  }, 150);
}

// Open lightbox on card click
cards.forEach(card => {
  card.addEventListener('click', () => {
    const idx = visibleCards.indexOf(card);
    if (idx !== -1) openLightbox(idx);
  });
});

document.getElementById('lbClose').addEventListener('click', (e) => {
  e.stopPropagation();
  closeLightbox();
});
document.getElementById('lbBackdrop').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
document.getElementById('lbNext').addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowRight')  navigate(1);
  if (e.key === 'ArrowLeft')   navigate(-1);
});

// Touch / swipe support
let touchStart = 0;
lightbox.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; });
lightbox.addEventListener('touchend',   e => {
  const diff = touchStart - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
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
    itemCountEl.textContent = `Showing ${visibleCards.length} design${visibleCards.length !== 1 ? 's' : ''}`;
  });
});

const video = document.getElementById("promo-video");
const placeholder = document.getElementById("video-placeholder");

video.addEventListener("play", () => {
  placeholder.style.display = "none";
});