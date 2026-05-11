// ========================================
// wasay.dev — quiet interactions & motion
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Live clock for location widget ---
  // TIMEZONE — change this when you move
  const LOCATION_TZ = 'Asia/Kuala_Lumpur';

  function updateClock() {
    const el = document.getElementById('location-time');
    if (!el) return;
    const now = new Date();
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: LOCATION_TZ,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    el.textContent = fmt.format(now).toLowerCase();
  }

  updateClock();
  setInterval(updateClock, 30000); // update every 30s

  // --- Scroll-reveal with staggered items ---
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        const items = entry.target.querySelectorAll('.reveal-item');
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add('revealed'), 80 + i * 100);
        });
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.work, .writing, .into, .people, .site-footer').forEach(el => {
    el.classList.add('reveal-section');
    sectionObserver.observe(el);
  });

  document.querySelectorAll('.h-timeline-entry').forEach(el => el.classList.add('reveal-item'));
  document.querySelectorAll('.into-card').forEach(el => el.classList.add('reveal-item'));

  // --- Divider dot pulse ---
  const dotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const dot = entry.target.querySelector('.dot');
        if (dot) {
          dot.classList.remove('pulse');
          void dot.offsetWidth;
          dot.classList.add('pulse');
        }
      }
    });
  }, { threshold: 0.8 });

  document.querySelectorAll('.divider').forEach(el => dotObserver.observe(el));

  // --- Smooth scroll for nav links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerOffset = 40;
        const pos = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll hint ---
  const scrollHint = document.createElement('div');
  scrollHint.className = 'scroll-hint visible';
  scrollHint.innerHTML = '<span></span>';
  document.body.appendChild(scrollHint);

  let scrollHintHidden = false;
  window.addEventListener('scroll', () => {
    if (!scrollHintHidden && window.scrollY > 100) {
      scrollHint.classList.remove('visible');
      scrollHintHidden = true;
    }
  }, { passive: true });

  // --- Nav shrink on scroll ---
  const header = document.querySelector('.site-header');
  let headerShrunk = false;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80 && !headerShrunk) {
      header.style.transition = 'padding 0.3s ease';
      header.style.paddingTop = '20px';
      headerShrunk = true;
    } else if (window.scrollY <= 80 && headerShrunk) {
      header.style.paddingTop = '';
      headerShrunk = false;
    }
  }, { passive: true });

  // --- Footer email link ---
  const emailLink = document.querySelector('.email-link');
  if (emailLink) {
    emailLink.addEventListener('mouseenter', () => {
      emailLink.style.animation = 'none';
      void emailLink.offsetWidth;
    });
  }
});