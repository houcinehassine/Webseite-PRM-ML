/* ============================================================
   PRM – header.js  
   ============================================================ */

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const page  = this.getAttribute('active');
    const title = this.getAttribute('title') ?? 'PRM · V4';

    this.style.alignSelf = 'stretch';

    document.title = title;

    /* ── Favicon ── */
    if (!document.querySelector('link[rel~="icon"]')) {
      const fav = document.createElement('link');
      fav.rel  = 'icon';
      fav.type = 'image/svg+xml';
      fav.href = new URL('./assets/favicon.svg', import.meta.url).href;
      document.head.appendChild(fav);
    }

    /* ── FONTS (lokal: Satoshi + Zodiak) ── */
    const fontsCss = document.createElement('link');
    fontsCss.rel = 'stylesheet';
    fontsCss.href = new URL('./assets/vendor/fonts.css', import.meta.url).href;
    document.head.appendChild(fontsCss);

    // --- CSS ---
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = new URL('./assets/style.css', import.meta.url).href;
    document.head.appendChild(css);

    /* ── Highlight.js (lazy: nur wenn <pre> vorhanden) ── */
    const loadHljs = () => {
      if (window._hljsLoaded) return;
      window._hljsLoaded = true;
      const hljsCss = document.createElement('link');
      hljsCss.rel   = 'stylesheet';
      hljsCss.href  = new URL('./assets/vendor/highlight-github.min.css', import.meta.url).href;
      document.head.appendChild(hljsCss);
      const hljsScript = document.createElement('script');
      hljsScript.src   = new URL('./assets/vendor/highlight.min.js', import.meta.url).href;
      hljsScript.onload = () => {
        document.querySelectorAll('pre code').forEach(block => {
          block.classList.add('language-python');
          window.hljs.highlightElement(block);
        });
      };
      document.head.appendChild(hljsScript);
    };
    // Sofort prüfen (falls <pre> bereits im DOM), sonst nach DOMContentLoaded
    if (document.querySelector('pre')) {
      loadHljs();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('pre')) loadHljs();
      }, { once: true });
    }

    /* ── Header HTML ── */
    this.innerHTML = `
      <a href="#main-content" class="skip-link">Zum Inhalt springen</a>

      <header class="header">
        <div class="header-inner container">

        <!-- SUCHE -->
          <a href="../search.html" class="search-btn"
            id="header-search-btn"
            title="Suche (⌘K / Strg+K)"
            aria-label="Suche öffnen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                width="18" height="18">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </a>  
        
        <!-- LINKS: Home-Button + Brand -->
          <a href="../index.html" class="brand" title="Alle Kapitel">
            <div class="brand-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                   width="22" height="22">
                <circle cx="7"  cy="12" r="2.5"/>
                <circle cx="17" cy="7"  r="2.5"/>
                <circle cx="17" cy="17" r="2.5"/>
                <path d="M9.4 10.8l5.2-2.6M9.4 13.2l5.2 2.6"/>
              </svg>
            </div>
            <div class="brand-text">
              <small>Prüfungsvorbereitung</small>
              <strong>PRM · V4</strong>
            </div>
          </a>

          <!-- MITTE: Kapitel-Navigation -->
          <nav class="chapter-nav-top" aria-label="Kapitelnavigation">
            <a href="../Kapitel1/Kapitel1.html" ${page === 'page1' ? 'class="active"' : ''}>1 - Data preparation</a>
            <a href="../Kapitel2/Kapitel2.html" ${page === 'page2' ? 'class="active"' : ''}>2 - Intro to ML</a>
            <a href="../Kapitel3/Kapitel3.html" ${page === 'page3' ? 'class="active"' : ''}>3 – Klassifikation</a>
            <a href="../Kapitel4/Kapitel4.html" ${page === 'page4' ? 'class="active"' : ''}>4 – Clustering</a>
            <a href="../Kapitel5/Kapitel5.html" ${page === 'page5' ? 'class="active"' : ''}>5 - Random Forest</a>
            <a href="../Kapitel6/Kapitel6.html" ${page === 'page6' ? 'class="active"' : ''}>6 - Deep Learning</a>
            <a href="../Kapitel7/Kapitel7.html" ${page === 'page7' ? 'class="active"' : ''}>7 - Reinforcement Learning</a>
            <a href="../Aufgaben/Aufgaben.html" ${page === 'pageA' ? 'class="active"' : ''}>✏️ Aufgaben</a>
            <a href="../Python/Python.html" ${page === 'pageP' ? 'class="active"' : ''}>🐍 Python</a>
          </nav>

          <!-- RECHTS: Theme Toggle -->
          <button class="theme-toggle" data-theme-toggle aria-label="Farbschema wechseln">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                 width="18" height="18">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41
                       M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
          </button>

        </div>
      </header>
    `;

    /* ── Theme Toggle Logik ── */
    this._initTheme();
  }

  _initTheme() {
    const html   = document.documentElement;
    const btn    = this.querySelector('[data-theme-toggle]');
    if (!btn) return;

    /* Gespeichertes Theme laden – sonst OS-Präferenz erkennen */
    const saved = localStorage.getItem('prm-theme');
    if (saved) {
      html.dataset.theme = saved;
    } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      html.dataset.theme = 'dark';
    }

    /* Icon je nach Theme setzen */
    const updateIcon = () => {
      const dark = html.dataset.theme === 'dark';
      btn.innerHTML = dark
        ? `<!-- Mond -->
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                width="18" height="18">
             <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
           </svg>`
        : `<!-- Sonne -->
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                width="18" height="18">
             <circle cx="12" cy="12" r="4"/>
             <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41
                      M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
           </svg>`;
      btn.setAttribute('aria-label', dark ? 'Light Mode' : 'Dark Mode');
    };

    updateIcon();

    btn.addEventListener('click', () => {
      const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
      html.dataset.theme = next;
      localStorage.setItem('prm-theme', next);
      updateIcon();
    });
  }
}

customElements.define('site-header', SiteHeader);