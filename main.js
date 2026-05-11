// ========================================
// wasay.dev — subtle interactions
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll-reveal
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections
  document.querySelectorAll('.writing, .about, .site-footer').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Observe individual items with stagger
  document.querySelectorAll('.post-item, .interest-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`;
    observer.observe(el);
  });

  // Add revealed class styles
  const style = document.createElement('style');
  style.textContent = '.revealed, .revealed .post-item, .revealed .interest-item { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // Smooth current-year in footer (if needed)
  const year = new Date().getFullYear();
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = year;
  });
});