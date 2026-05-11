// ========================================
// wasay.dev — quiet interactions & motion
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll-reveal with staggered items ---
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Stagger child items
        const items = entry.target.querySelectorAll('.reveal-item');
        items.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add('revealed');
          }, 80 + i * 100);
        });
        
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Tag sections and items
  document.querySelectorAll('.writing, .about, .site-footer').forEach(el => {
    el.classList.add('reveal-section');
    sectionObserver.observe(el);
  });

  document.querySelectorAll('.post-item').forEach(el => el.classList.add('reveal-item'));
  document.querySelectorAll('.interest-item').forEach(el => el.classList.add('reveal-item'));

  // --- Divider dot pulse on scroll-through ---
  const dotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const dot = entry.target.querySelector('.dot');
        if (dot) {
          dot.classList.remove('pulse');
          void dot.offsetWidth; // reflow
          dot.classList.add('pulse');
        }
      }
    });
  }, { threshold: 0.8 });

  document.querySelectorAll('.divider').forEach(el => dotObserver.observe(el));

  // --- Ripple effect on clickable items ---
  document.querySelectorAll('.post-item').forEach(item => {
    item.addEventListener('click', function(e) {
      // Create ripple
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 500);
    });
  });

  // --- Smooth scroll for nav links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerOffset = 40;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Scroll hint (visible at top, fades on scroll) ---
  const scrollHint = document.createElement('div');
  scrollHint.className = 'scroll-hint visible';
  scrollHint.innerHTML = '<span></span>';
  document.body.appendChild(scrollHint);

  let lastScrollY = 0;
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

  // --- Interest items: number color transition on hover ---
  document.querySelectorAll('.interest-item').forEach(item => {
    item.style.transition = 'background 0.3s ease, transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  });

  // --- Footer email link: subtle bounce on hover ---
  const emailLink = document.querySelector('.email-link');
  if (emailLink) {
    emailLink.addEventListener('mouseenter', () => {
      emailLink.style.animation = 'none';
      void emailLink.offsetWidth;
    });
  }
});