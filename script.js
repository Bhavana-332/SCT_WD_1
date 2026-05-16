/* ============================================
   NebulaX — Interactive Behaviour
   ============================================ */

// ---------- NAVBAR scroll effect ----------
const navbar = document.getElementById('navbar');
const onScroll = () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  updateActiveLink();
};
window.addEventListener('scroll', onScroll, { passive: true });

// ---------- ACTIVE LINK on scroll ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const pos = window.scrollY + 140;
  let current = 'home';
  sections.forEach(sec => {
    if (sec.offsetTop <= pos && sec.offsetTop + sec.offsetHeight > pos) {
      current = sec.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

// ---------- MOBILE menu ----------
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});
navLinks.forEach(link => link.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navLinksEl.classList.remove('open');
}));

// ---------- THEME toggle ----------
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('nebulax-theme');
if (saved) document.documentElement.setAttribute('data-theme', saved);
themeToggle.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('nebulax-theme', next);
});

// ---------- SCROLL REVEAL (IntersectionObserver) ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- PARALLAX orbs ----------
const orbs = document.querySelectorAll('.orb');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  orbs.forEach((orb, i) => {
    const depth = (i + 1) * 14;
    orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
});

// initial paint
onScroll();
