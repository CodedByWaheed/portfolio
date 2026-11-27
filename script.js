'use strict';

/* Hero entrance: stagger delays, then trigger */
function initHero() {
  document.querySelectorAll('.hl').forEach((el, i) => el.style.setProperty('--i', i));
  requestAnimationFrame(() => document.body.classList.add('is-loaded'));
}

/* Fade-up reveal on scroll */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el, i) => {
    el.style.transitionDelay = (el.classList.contains('card') ? (i % 3) * 90 : 0) + 'ms';
    io.observe(el);
  });
}

/* Active nav link per section */
function initActiveNav() {
  const links = [...document.querySelectorAll('.nav__links a')];
  const sections = [...document.querySelectorAll('[data-section]')];
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => io.observe(s));
}

/* Scroll progress bar + navbar background */
function initScroll() {
  const bar = document.getElementById('progress');
  const nav = document.getElementById('nav');
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
    nav.classList.toggle('is-scrolled', scrollY > 30);
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

/* Mobile menu */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navLinks');
  const set = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => set(!menu.classList.contains('is-open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => set(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
}

/* Footer year */
function initYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initReveal();
  initActiveNav();
  initScroll();
  initMobileMenu();
  initYear();
});

