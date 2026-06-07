/* ============================================================
   PRM – header.js  
   ============================================================ */

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const page  = this.getAttribute('active');
    const title = this.getAttribute('title') ?? 'PRM';

    this.style.alignSelf = 'stretch';
    
    document.title = title;

    /* ── FONTS (Fontshare: Satoshi + Zodiak) ── */
    const fonts = [
      { rel: 'preconnect', href: 'https://api.fontshare.com' },
      {
        rel: 'stylesheet',
        href: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=zodiak@400,600,700&display=swap'
      }
    ];
    fonts.forEach(attrs => {
      const link = document.createElement('link');
      Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v));
      document.head.appendChild(link);
    });

    // --- CSS ---
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = new URL('./assets/style.css', import.meta.url).href;
    document.head.appendChild(css);

    /* ── Highlight.js ── */
    const hljsCss  = document.createElement('link');
    hljsCss.rel    = 'stylesheet';
    hljsCss.href   = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
    document.head.appendChild(hljsCss);

    const hljsScript    = document.createElement('script');
    hljsScript.src      = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
    hljsScript.onload   = () => {
      document.querySelectorAll('pre code').forEach(block => {
        block.classList.add('language-python');
        window.hljs.highlightElement(block);
      });
    };
    document.head.appendChild(hljsScript);

    // ── Pyodide laden ─────────────────────────────────────────
    const pyodideScript = document.createElement('script');
    pyodideScript.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
    pyodideScript.onload = async () => {
      window._pyodide = await loadPyodide();
      await window._pyodide.loadPackage(['matplotlib', 'scikit-learn', 'numpy']);
      window._pyodideReady = true;
      document.dispatchEvent(new Event('pyodide-ready'));
      console.log('✅ Pyodide bereit');
    };
    document.head.appendChild(pyodideScript);


    /* ── Header HTML ── */
    this.innerHTML = `
      <a href="#main-content" class="skip-link">Zum Inhalt springen</a>

      <header class="header">
        <div class="header-inner container">

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
              <strong>PRM</strong>
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

    /* Gespeichertes Theme laden */
    const saved = localStorage.getItem('prm-theme');
    if (saved) html.dataset.theme = saved;

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