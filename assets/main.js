// Reveal-on-scroll for cards/sections
document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.kd-card, .flow-step').forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity .5s ease ${(i % 6) * 0.05}s, transform .5s ease ${(i % 6) * 0.05}s`;
    observer.observe(el);
  });
});
