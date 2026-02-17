// Nav scroll effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const ctaBox = form.closest('.cta-box');

  // Disable form
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Sending...';
  form.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);

  // Fake network delay
  setTimeout(() => {
    // Replace form with success message
    form.style.opacity = '0';
    form.style.transform = 'translateY(10px)';
    setTimeout(() => {
      form.remove();
      const success = document.createElement('div');
      success.className = 'form-success';
      success.innerHTML = `
        <div class="success-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h3>We got your message!</h3>
        <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
      `;
      success.style.opacity = '0';
      success.style.transform = 'translateY(10px)';
      ctaBox.appendChild(success);
      requestAnimationFrame(() => {
        success.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        success.style.opacity = '1';
        success.style.transform = 'translateY(0)';
      });
    }, 300);
  }, 1500);
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .result-card, .about-content, .cta-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// Stagger service card animations
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});
