// Typewriter effect on h1
const h1 = document.querySelector('#hero h1');
const fullText = h1.textContent;
h1.textContent = '';
h1.classList.add('typing');

let i = 0;
const typeInterval = setInterval(() => {
  h1.textContent += fullText[i++];
  if (i === fullText.length) {
    clearInterval(typeInterval);
    setTimeout(() => h1.classList.remove('typing'), 800);
  }
}, 45);

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`nav ul a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// Experience accordion
document.querySelectorAll('.exp-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.exp-item');
    const body = item.querySelector('.exp-body');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.exp-item').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.exp-body').style.maxHeight = null;
      el.querySelector('.exp-header').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
