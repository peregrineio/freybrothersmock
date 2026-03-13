/* ============================================
   FREY BROTHERS ELECTRICIANS — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initScrollAnimations();
  initServiceAccordions();
  initContactForm();
});

/* --- Sticky Header --- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  const closeBtn = document.querySelector('.nav-mobile .close-btn');
  const mobileLinks = document.querySelectorAll('.nav-mobile a');

  if (!hamburger || !mobileNav) return;

  function toggleNav() {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleNav);
  if (closeBtn) closeBtn.addEventListener('click', toggleNav);
  mobileLinks.forEach(link => link.addEventListener('click', toggleNav));
}

/* --- Scroll Animations (Intersection Observer) --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const parent = entry.target.parentElement;
        const siblings = parent ? Array.from(parent.querySelectorAll('.fade-up')) : [];
        const index = siblings.indexOf(entry.target);
        const delay = index >= 0 ? index * 50 : 0;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* --- Service Page Accordions --- */
function initServiceAccordions() {
  const groups = document.querySelectorAll('.service-group-header');
  if (!groups.length) return;

  groups.forEach(header => {
    header.addEventListener('click', () => {
      const group = header.parentElement;
      const wasOpen = group.classList.contains('open');

      // Close all
      document.querySelectorAll('.service-group').forEach(g => g.classList.remove('open'));

      // Toggle clicked
      if (!wasOpen) group.classList.add('open');
    });
  });

  // Open first by default
  const first = document.querySelector('.service-group');
  if (first) first.classList.add('open');
}

/* --- Contact Form (Visual Only) --- */
function initContactForm() {
  const form = document.querySelector('.quote-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple validation
    const required = form.querySelectorAll('[required]');
    let valid = true;

    required.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#dc2626';
        valid = false;
      } else {
        input.style.borderColor = '#e0e0e0';
      }
    });

    if (valid) {
      // Show success state (mockup only)
      const btn = form.querySelector('.submit-btn');
      const originalText = btn.textContent;
      btn.textContent = 'Quote Requested!';
      btn.style.background = '#16a34a';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }
  });
}
