// ── LAZY LOAD (IntersectionObserver) ──
const cards = document.querySelectorAll('.card');
const images = document.querySelectorAll('img[data-src]');

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

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
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
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCount = document.getElementById('lbCount');
const allImgs = [...document.querySelectorAll('.card img')];
let current = 0;

function openLightbox(idx) {
  current = idx;
  const src = allImgs[idx].dataset.src || allImgs[idx].src;
  lbImg.src = src;
  lbImg.alt = allImgs[idx].alt;
  lbCount.textContent = `${idx + 1} / ${allImgs.length}`;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function navigate(dir) {
  current = (current + dir + allImgs.length) % allImgs.length;
  const src = allImgs[current].dataset.src || allImgs[current].src;

  lbImg.style.opacity = '0';
  lbImg.style.transform = `translateX(${dir > 0 ? '30px' : '-30px'})`;

  setTimeout(() => {
    lbImg.src = src;
    lbImg.alt = allImgs[current].alt;
    lbCount.textContent = `${current + 1} / ${allImgs.length}`;
    lbImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    lbImg.style.opacity = '1';
    lbImg.style.transform = 'translateX(0)';
  }, 150);
}

cards.forEach((card, i) => {
  card.addEventListener('click', () => openLightbox(i));
});

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbBackdrop').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
document.getElementById('lbNext').addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') navigate(1);
  if (e.key === 'ArrowLeft') navigate(-1);
});

let touchStart = 0;
lightbox.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; });
lightbox.addEventListener('touchend', e => {
  const diff = touchStart - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
});

document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
  });
});