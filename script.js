/* =====================
   PHONIAS — SCRIPT.JS
   ===================== */

// ── Smooth scroll for hero CTA ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Scroll reveal ────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function initReveal() {
  // Category cards
  document.querySelectorAll('.category-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.12}s`;
    revealObserver.observe(el);
  });

  // Section headings
  document.querySelectorAll('.categories-header, .collection-text').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Collection products
  document.querySelectorAll('.col-product').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.1}s`;
    revealObserver.observe(el);
  });

  // Collection phone
  const collectionLeft = document.querySelector('.collection-left');
  if (collectionLeft) {
    collectionLeft.classList.add('reveal');
    revealObserver.observe(collectionLeft);
  }
}

// ── Nav scroll effect ────────────────────────────────────────
const nav = document.querySelector('.nav');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  // Darken nav on scroll
  if (y > 80) {
    nav.style.background = 'rgba(30, 5, 12, 0.92)';
  } else {
    nav.style.background = 'rgba(74, 15, 26, 0.6)';
  }

  // Hide/show on scroll direction
  if (y > lastScrollY && y > 200) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }

  lastScrollY = y;
}, { passive: true });

// ── Parallax hero bg ─────────────────────────────────────────
const heroBg = document.querySelector('.hero-bg-image');

if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroH = document.querySelector('.hero').offsetHeight;
    if (scrollY < heroH) {
      heroBg.style.transform = `scale(1) translateY(${scrollY * 0.3}px)`;
    }
  }, { passive: true });
}

// ── Hero card hover tilt ─────────────────────────────────────
document.querySelectorAll('.hero-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateX(-4px) scale(1.03) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Mobile hamburger (basic toggle) ─────────────────────────
const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    if (isOpen) {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.cssText = `
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 64px;
        left: 0;
        right: 0;
        background: rgba(30, 5, 12, 0.97);
        padding: 24px 40px;
        gap: 20px;
        backdrop-filter: blur(20px);
      `;
    }
  });
}

// ── Category card ripple ─────────────────────────────────────
document.querySelectorAll('.shop-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      width: 5px;
      height: 5px;
      background: rgba(255,255,255,0.5);
      transform: scale(0);
      animation: ripple 0.5s ease-out forwards;
      left: ${e.clientX - rect.left}px;
      top: ${e.clientY - rect.top}px;
      pointer-events: none;
    `;

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

// Add ripple keyframe dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to { transform: scale(30); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initReveal();

  // Stagger hero elements on load
  const heroLeft = document.querySelector('.hero-left');
  if (heroLeft) {
    heroLeft.style.opacity = '1';
  }
});


