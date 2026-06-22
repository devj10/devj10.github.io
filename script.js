// Light/dark mode toggle
const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;

const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
const moonIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  toggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
  localStorage.setItem('theme', theme);
}

applyTheme(localStorage.getItem('theme') || 'dark');

toggle.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// Typewriter effect on h1
const h1 = document.querySelector('#hero h1');
const fullText = h1.textContent.trim();
h1.textContent = '';

const textSpan = document.createElement('span');
textSpan.classList.add('typing');
h1.appendChild(textSpan);

let i = 0;
const typeInterval = setInterval(() => {
  textSpan.textContent += fullText[i++];
  if (i === fullText.length) {
    clearInterval(typeInterval);
    setTimeout(() => textSpan.classList.remove('typing'), 800);
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
