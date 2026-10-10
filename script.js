(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');

  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const nextOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(nextOpen));
    nav?.classList.toggle('open', nextOpen);
    document.body.classList.toggle('menu-open', nextOpen);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  document.querySelectorAll('[data-year]').forEach((item) => {
    item.textContent = String(new Date().getFullYear());
  });

  const diagnosisForm = document.querySelector('[data-diagnosis-form]');
  const diagnosisFrame = document.querySelector('[data-diagnosis-frame]');
  let diagnosisSubmitted = false;

  diagnosisForm?.addEventListener('submit', () => {
    diagnosisSubmitted = true;
    const button = diagnosisForm.querySelector('[data-submit-button]');
    const result = diagnosisForm.querySelector('[data-form-result]');
    if (button) {
      button.disabled = true;
      button.firstChild.textContent = '送信中… ';
    }
    if (result) result.hidden = true;
  });

  diagnosisFrame?.addEventListener('load', () => {
    if (!diagnosisSubmitted || !diagnosisForm) return;
    diagnosisSubmitted = false;
    const button = diagnosisForm.querySelector('[data-submit-button]');
    const result = diagnosisForm.querySelector('[data-form-result]');
    diagnosisForm.reset();
    if (button) {
      button.disabled = false;
      button.firstChild.textContent = '無料診断を申し込む ';
    }
    if (result) {
      result.hidden = false;
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
})();
