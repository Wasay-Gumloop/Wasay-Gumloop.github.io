// ========================================
// wasay.dev
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Live clock ---
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
  setInterval(updateClock, 30000);

  // --- Scroll reveal ---
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
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.work, .writing, .content-section, .people, .places, .site-footer').forEach(el => {
    el.classList.add('reveal-section');
    sectionObserver.observe(el);
  });

  document.querySelectorAll('.h-timeline-entry').forEach(el => el.classList.add('reveal-item'));
  document.querySelectorAll('.person-entry').forEach(el => el.classList.add('reveal-item'));
  document.querySelectorAll('.place-tag').forEach(el => el.classList.add('reveal-item'));

  // --- Dot pulse ---
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

  // --- Smooth scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const pos = target.getBoundingClientRect().top + window.pageYOffset - 40;
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

  // --- Nav shrink ---
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
});