// ─────────────────────────────────────────────────────────
//  sidebar-core.js  –  Gemeinsame Sidebar-Logik für alle Kapitel
//  Pfad: V4/js_codes/sidebar-core.js
// ─────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────
//  CSS LADEN
// ─────────────────────────────────────────────────────────
export function loadStyles() {
  if (document.getElementById('sidebar-styles-link')) return;
  const link = document.createElement('link');
  link.id   = 'sidebar-styles-link';
  link.rel  = 'stylesheet';
  link.href = new URL('../css_codes/sidebar-styles.css', import.meta.url).href;
  document.head.appendChild(link);
}


// ─────────────────────────────────────────────────────────
//  SCROLL PROGRESS
// ─────────────────────────────────────────────────────────
export function initScrollProgress(fillEl, pctEl) {
  function update() {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct  = docH > 0 ? Math.round((scrollTop / docH) * 100) : 0;
    fillEl.style.width = pct + '%';
    pctEl.textContent  = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}


// ─────────────────────────────────────────────────────────
//  INTERSECTION OBSERVER – aktiven Abschnitt tracken
// ─────────────────────────────────────────────────────────
export function initSectionObserver(linkEls) {
  const currentFile = location.pathname.split('/').pop();

  const localLinks = linkEls.filter(a => {
    const href = a.getAttribute('href') || '';
    const [file] = href.split('#');
    return href.includes('#') && (!file || file === currentFile || file === '');
  });

  if (!localLinks.length) return;

  const idToLink = {};
  localLinks.forEach(a => {
    const hash = (a.getAttribute('href') || '').split('#')[1];
    if (hash) idToLink[hash] = a;
  });

  const targets = Object.keys(idToLink)
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!targets.length) return;

  let activeId = null;
  const sidebar = document.querySelector('.sidebar');

  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting);
    if (!visible.length) return;

    const topEntry = visible.reduce((a, b) =>
      a.boundingClientRect.top < b.boundingClientRect.top ? a : b
    );
    const id = topEntry.target.id;
    if (id === activeId) return;
    activeId = id;

    localLinks.forEach(a => a.classList.remove('toc-link--active'));

    const activeLink = idToLink[id];
    if (activeLink) {
      activeLink.classList.add('toc-link--active');
      if (sidebar) {
        const linkTop   = activeLink.offsetTop;
        const sidebarH  = sidebar.clientHeight;
        const scrollTop = sidebar.scrollTop;
        if (linkTop < scrollTop + 40 || linkTop > scrollTop + sidebarH - 80) {
          sidebar.scrollTo({ top: linkTop - sidebarH / 3, behavior: 'smooth' });
        }
      }
    }
  }, {
    rootMargin: '-5% 0px -65% 0px',
    threshold: 0
  });

  targets.forEach(el => observer.observe(el));
}


// ─────────────────────────────────────────────────────────
//  RENDER  (bekommt chapter-Objekt von der jeweiligen Sidebar.js)
// ─────────────────────────────────────────────────────────
export function renderSidebar(chapter, activePage = 'page1') {
  loadStyles();

  const aside = document.createElement('aside');
  aside.className = 'sidebar';

  // ── Fortschrittsleiste ────────────────────────
  const progressWrap = document.createElement('div');
  progressWrap.className = 'toc-progress-wrap';
  progressWrap.innerHTML = `
    <div class="toc-progress-label">
      <span>Lesefortschritt</span>
      <span id="toc-pct-label">0%</span>
    </div>
    <div class="toc-progress-bar">
      <div class="toc-progress-fill" id="toc-progress-fill"></div>
    </div>
  `;
  aside.appendChild(progressWrap);

  // ── "INHALTSVERZEICHNIS" Titel ────────────────
  const titleEl = document.createElement('p');
  titleEl.className = 'toc-title';
  titleEl.textContent = 'Inhaltsverzeichnis';
  aside.appendChild(titleEl);

  // ── Kapitel-Toggle ────────────────────────────
  const isActivePage = (page) => !page.divider && page.id === activePage;
  const anyActive    = chapter.pages.some(isActivePage);

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'toc-toggle';
  toggleBtn.type      = 'button';
  toggleBtn.setAttribute('aria-expanded', String(anyActive));
  toggleBtn.innerHTML = `<span>${chapter.title}</span><span class="toc-chevron">▸</span>`;

  const body = document.createElement('div');
  body.className = 'toc-body';
  if (!anyActive) body.hidden = true;

  toggleBtn.addEventListener('click', () => {
    const open = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!open));
    body.hidden = open;
  });

  aside.appendChild(toggleBtn);
  aside.appendChild(body);

  const allLinkEls = [];

  // ── Seiten iterieren ──────────────────────────
  chapter.pages.forEach(page => {

    if (page.divider) {
      const div = document.createElement('div');
      div.className = 'toc-divider';
      div.innerHTML = `<span class="toc-divider-label">${page.label}</span>`;
      body.appendChild(div);
      return;
    }

    const pageOpen   = isActivePage(page);
    const isPruefung = page.id === 'cheatsheet' || page.id === 'quiz';

    const pageBlock = document.createElement('div');
    pageBlock.className = 'toc-page-group';

    const toggleClass = [
      'toc-page-toggle',
      pageOpen   ? 'active'            : '',
      isPruefung ? 'toc-page-pruefung' : ''
    ].filter(Boolean).join(' ');

    const sublistClass = [
      'toc-sublist',
      isPruefung ? 'toc-page-pruefung-sub' : ''
    ].filter(Boolean).join(' ');

    const sublistHTML = page.sections.map(s =>
      `<a href="${page.href}${s.href}" class="toc-link">${s.title}</a>`
    ).join('');

    pageBlock.innerHTML = `
      <button class="${toggleClass}" type="button" aria-expanded="${pageOpen}">
        <span>${page.title}</span>
        <span class="toc-chevron">▸</span>
      </button>
      <div class="${sublistClass}" ${pageOpen ? '' : 'hidden'}>
        ${sublistHTML}
      </div>
    `;

    const toggle  = pageBlock.querySelector('.toc-page-toggle');
    const sublist = pageBlock.querySelector('.toc-sublist');

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      sublist.hidden = open;
    });

    pageBlock.querySelectorAll('.toc-link').forEach(a => allLinkEls.push(a));
    body.appendChild(pageBlock);
  });

  // ── "Nach oben" Button ────────────────────────
  const topBtn = document.createElement('button');
  topBtn.className = 'toc-top-btn';
  topBtn.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2.5">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
    Nach oben
  `;
  topBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
  aside.appendChild(topBtn);

  // ── Observer + Progress nach DOM-Insert ───────
  setTimeout(() => {
    const fillEl = document.getElementById('toc-progress-fill');
    const pctEl  = document.getElementById('toc-pct-label');
    if (fillEl && pctEl) initScrollProgress(fillEl, pctEl);
    initSectionObserver(allLinkEls);
  }, 0);

  return aside;
}


// ─────────────────────────────────────────────────────────
//  WEB COMPONENT FACTORY
//  Jede Sidebar.js ruft dies mit ihrem chapter-Objekt auf
// ─────────────────────────────────────────────────────────
export function registerSidebar(chapter) {
  class SiteSidebar extends HTMLElement {
    connectedCallback() {
      const activePage = this.getAttribute('active') || 'page1';
      this.replaceWith(renderSidebar(chapter, activePage));
    }
  }
  // Guard: nur einmal registrieren
  if (!customElements.get('site-sidebar')) {
    customElements.define('site-sidebar', SiteSidebar);
  }
}