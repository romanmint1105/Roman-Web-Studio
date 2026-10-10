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

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const temporary = document.createElement('textarea');
    temporary.value = text;
    temporary.setAttribute('readonly', '');
    temporary.style.position = 'fixed';
    temporary.style.opacity = '0';
    document.body.appendChild(temporary);
    temporary.select();
    document.execCommand('copy');
    temporary.remove();
  };

  const diagnosisForm = document.querySelector('[data-diagnosis-form]');
  diagnosisForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(diagnosisForm);
    const shop = String(data.get('shop') || '').trim();
    const url = String(data.get('url') || '').trim() || 'なし';
    const issue = String(data.get('issue') || '').trim();
    const message = String(data.get('message') || '').trim() || '特になし';
    const consultation = [
      '【無料サイト診断の相談】',
      `店舗名：${shop}`,
      `サイト・SNS：${url}`,
      `相談内容：${issue}`,
      `補足：${message}`
    ].join('\n');

    const instagramUrl = 'https://www.instagram.com/roman.webstudio/';
    const instagram = window.open('', '_blank');
    if (instagram) instagram.opener = null;
    try {
      await copyText(consultation);
      const result = diagnosisForm.querySelector('[data-form-result]');
      if (result) result.hidden = false;
      if (instagram) instagram.location.href = instagramUrl;
      else window.location.href = instagramUrl;
    } catch (error) {
      if (instagram) instagram.location.href = instagramUrl;
      const result = diagnosisForm.querySelector('[data-form-result]');
      if (result) {
        result.hidden = false;
        result.querySelector('b').textContent = '相談文のコピーができませんでした。';
        result.querySelector('span').textContent = 'Instagramを開き、入力内容をDMでお送りください。';
      }
    }
  });
})();
