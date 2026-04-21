// ── AOS INIT ─────────────────────────────────────────────────
AOS.init({
  once: true,
  offset: 60,
  easing: 'ease-out-cubic',
});

// ── NAVBAR SCROLL EFFECT ──────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── MOBILE MENU TOGGLE ────────────────────────────────────────
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuBars = document.querySelectorAll('.menu-bar');

menuBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  
  // Toggle colors and cover
  navbar.classList.toggle('menu-open', isOpen);
  
  // Optional: Prevent body scroll when menu is open
  document.body.style.overflow = isOpen ? 'hidden' : '';

  // Animate hamburger → X
  if (isOpen) {
    menuBars[0].style.transform = 'translateY(8px) rotate(45deg)';
    menuBars[1].style.opacity = '0';
    menuBars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
  } else {
    menuBars[0].style.transform = '';
    menuBars[1].style.opacity = '';
    menuBars[2].style.transform = '';
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('#mobile-menu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navbar.classList.remove('menu-open');
    document.body.style.overflow = '';
    
    menuBars[0].style.transform = '';
    menuBars[1].style.opacity = '';
    menuBars[2].style.transform = '';
  });
});

// ── ACTIVE NAV LINK ON SCROLL ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle(
          'font-semibold',
          link.getAttribute('href') === `#${id}`
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));

// ── SMOOTH ANCHOR SCROLL ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── ANIMATED COUNTERS ─────────────────────────────────────────
const counters = document.querySelectorAll('.counter');
const statsSection = document.getElementById('stats-container');
let animated = false;

const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // ms
    const increment = target / (duration / 16); // 60fps

    let current = 0;
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animated) {
      animated = true;
      animateCounters();
    }
  });
}, { threshold: 0.5 });

if (statsSection) {
  statsObserver.observe(statsSection);
}

// ── CONTACT FORM (placeholder handler) ───────────────────────
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  btn.textContent = 'Enviando...';
  btn.disabled = true;

  // Simulate async — replace with your real backend/EmailJS/Formspree
  setTimeout(() => {
    btn.textContent = '¡Mensaje enviado! ✓';
    btn.style.background = '#16a34a';
    form.reset();

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1200);
});
