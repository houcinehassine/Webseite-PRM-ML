// ─────────────────────────────────────────────────────────
// Gemeinsame Sidebar-Logik für alle Kapitel
// ─────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────
//  CSS LADEN
// ─────────────────────────────────────────────────────────
export function loadStyles() {
  if (document.getElementById('sidebar-styles-link')) return;
  const link = document.createElement('link');
  link.id   = 'sidebar-styles-link';
  link.rel  = 'stylesheet';
  link.href = new URL('./style.css', import.meta.url).href;
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
// ─────────────────────────────────────────────────────────
//  LERNFORTSCHRITT (localStorage)
// ─────────────────────────────────────────────────────────
const VISITED_KEY = 'prm-visited';

function getVisited() {
  try { return new Set(JSON.parse(localStorage.getItem(VISITED_KEY) || '[]')); }
  catch { return new Set(); }
}

function markVisited(chapterTitle, pageHref) {
  try {
    const v = getVisited();
    v.add(chapterTitle + '/' + pageHref);
    localStorage.setItem(VISITED_KEY, JSON.stringify([...v]));
  } catch {}
}


export function renderSidebar(chapter, activePage = 'page1') {
  loadStyles();

  /* Aktuelle Seite als besucht speichern */
  const curPage = chapter.pages.find(p => !p.divider && p.id === activePage);
  if (curPage) markVisited(chapter.title, curPage.href);

  const visited = getVisited();

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

    const isDone = !pageOpen && visited.has(chapter.title + '/' + page.href);

    const toggleClass = [
      'toc-page-toggle',
      pageOpen   ? 'active'            : '',
      isPruefung ? 'toc-page-pruefung' : '',
      isDone     ? 'toc-page-done'     : ''
    ].filter(Boolean).join(' ');

    const sublistClass = [
      'toc-sublist',
      isPruefung ? 'toc-page-pruefung-sub' : ''
    ].filter(Boolean).join(' ');

    const sublistHTML = page.sections.map(s =>
      `<a href="${page.href}${s.href}" class="toc-link">${s.title}</a>`
    ).join('');

    const doneIndicator = isDone
      ? '<span class="toc-done-dot" aria-label="Besucht" title="Besucht">✓</span>'
      : '';

    pageBlock.innerHTML = `
      <button class="${toggleClass}" type="button" aria-expanded="${pageOpen}">
        <span>${page.title}</span>
        ${doneIndicator}
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

  // ── Schließen-Button (nur Mobile sichtbar) ────
  const closeBtn = document.createElement('button');
  closeBtn.className = 'sidebar-close';
  closeBtn.setAttribute('aria-label', 'Sidebar schließen');
  closeBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>`;
  aside.appendChild(closeBtn);

  // ── Observer + Progress nach DOM-Insert ───────
  setTimeout(() => {
    const fillEl = document.getElementById('toc-progress-fill');
    const pctEl  = document.getElementById('toc-pct-label');
    if (fillEl && pctEl) initScrollProgress(fillEl, pctEl);
    initSectionObserver(allLinkEls);

    // Mobile Drawer-Logik ──────────────────────────────────
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    const fab = document.createElement('button');
    fab.className = 'sidebar-fab';
    fab.setAttribute('aria-label', 'Inhaltsverzeichnis öffnen');
    fab.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <line x1="3" y1="6"  x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="15" y2="18"/>
    </svg>`;
    document.body.appendChild(fab);

    const openSidebar = () => {
      aside.classList.add('sidebar--open');
      overlay.classList.add('sidebar--open');
      document.body.classList.add('sidebar--open');
      fab.setAttribute('aria-label', 'Inhaltsverzeichnis schließen');
    };
    const closeSidebar = () => {
      aside.classList.remove('sidebar--open');
      overlay.classList.remove('sidebar--open');
      document.body.classList.remove('sidebar--open');
      fab.setAttribute('aria-label', 'Inhaltsverzeichnis öffnen');
    };

    fab.addEventListener('click', () =>
      aside.classList.contains('sidebar--open') ? closeSidebar() : openSidebar()
    );
    overlay.addEventListener('click', closeSidebar);
    closeBtn.addEventListener('click', closeSidebar);

    // Toc-Links schließen die Sidebar automatisch auf Mobile
    allLinkEls.forEach(a => a.addEventListener('click', () => {
      if (window.innerWidth <= 700) closeSidebar();
    }));
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


  // ============================================================
  // js_codes/Quiz.js
  // ============================================================
  
  // <!-- ══ QUIZ LOGIC ═══════════════════════════════════════ -->

  if (document.getElementById('quiz-score')) (function () {
    const TOTAL = 20;
    let score = 0;
    let answered = 0;

    // ── DOM refs
    const elScore    = document.getElementById('quiz-score');
    const elAnswered = document.getElementById('quiz-answered');
    const elBar      = document.getElementById('quiz-progress-bar');
    const elResult   = document.getElementById('quiz-result');

    function updateHUD() {
      elScore.textContent    = score;
      elAnswered.textContent = answered;
      elBar.style.width      = ((answered / TOTAL) * 100) + '%';
      if (answered === TOTAL) showResult();
    }

    function showResult() {
      const pct = Math.round((score / TOTAL) * 100);
      document.getElementById('result-score').textContent =
        score + ' / ' + TOTAL + ' (' + pct + '%)';

      let emoji, msg, color;
      if (pct >= 90) { emoji='🏆'; msg='Ausgezeichnet! Prüfungsreif!';  color='#16a34a'; }
      else if (pct >= 70) { emoji='👍'; msg='Gut gemacht!';             color='var(--color-primary)'; }
      else if (pct >= 50) { emoji='📚'; msg='Nochmal üben empfohlen!';  color='#d97706'; }
      else               { emoji='💪'; msg='Weitermachen – du schaffst das!'; color='#dc2626'; }

      document.getElementById('result-emoji').textContent = emoji;
      const msgEl = document.getElementById('result-msg');
      msgEl.textContent = msg;
      msgEl.style.color = color;

      const bar = document.getElementById('result-bar');
      bar.style.background = color;
      elResult.style.display = 'block';
      // animate bar after display
      requestAnimationFrame(() => requestAnimationFrame(() => {
        bar.style.width = pct + '%';
      }));
      elResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // ── Option click handler
    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', function () {
        const q = this.closest('.quiz-question');
        if (q.dataset.answered) return;
        q.dataset.answered = '1';
        answered++;

        const correct = this.dataset.correct === 'true';

        // Disable all, reveal correct
        q.querySelectorAll('.quiz-option').forEach(opt => {
          opt.disabled = true;
          if (opt.dataset.correct === 'true') opt.classList.add('quiz-reveal-correct');
        });

        if (correct) {
          this.classList.remove('quiz-reveal-correct');
          this.classList.add('quiz-sel-correct');
          score++;
          const fb = q.querySelector('.quiz-feedback.is-correct');
          if (fb) fb.style.display = 'block';
        } else {
          this.classList.add('quiz-sel-wrong');
          const fb = q.querySelector('.quiz-feedback.is-wrong');
          if (fb) fb.style.display = 'block';
        }
        updateHUD();
      });
    });

    // ── Reset (score bar button)
    function doReset() {
      score = 0; answered = 0;
      document.querySelectorAll('.quiz-question').forEach(q => {
        delete q.dataset.answered;
        q.querySelectorAll('.quiz-option').forEach(opt => {
          opt.disabled = false;
          opt.classList.remove(
            'quiz-sel-correct','quiz-sel-wrong','quiz-reveal-correct'
          );
        });
        q.querySelectorAll('.quiz-feedback').forEach(fb => {
          fb.style.display = 'none';
        });
      });
      elResult.style.display = 'none';
      updateHUD();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    document.getElementById('quiz-reset').addEventListener('click', doReset);
    document.getElementById('btn-retry').addEventListener('click', doReset);

    // ── Tastatur-Shortcuts: 1–4 / A–D wählen aktuelle Antwort ──
    // Findet die erste noch unbeantwortete Frage im Viewport
    document.addEventListener('keydown', function(e) {
      // Nicht auslösen wenn User in Eingabefeld tippt
      if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) return;
      const key = e.key.toUpperCase();
      const idx = ['1','A','2','B','3','C','4','D'].indexOf(key);
      if (idx === -1) return;
      const optIdx = Math.floor(idx / 2); // 1/A=0, 2/B=1, 3/C=2, 4/D=3

      // Erste unbeantwortete Frage suchen die im Viewport sichtbar ist
      let target = null;
      const questions = document.querySelectorAll('.quiz-question:not([data-answered])');
      for (const q of questions) {
        const rect = q.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) { target = q; break; }
      }
      if (!target) return;

      const opts = target.querySelectorAll('.quiz-option:not(:disabled)');
      if (opts[optIdx]) { e.preventDefault(); opts[optIdx].click(); }
    });

    updateHUD();
  })();


/* ============================================================
   PRM – mathjax.js  |  Stand 30.05.2026
   Lädt MathJax NUR wenn die Seite LaTeX-Formeln enthält.
   Spart ~1,1 MB auf Seiten ohne Formeln (Übersichten, Quizze …)
   ============================================================ */

(function initMathJaxIfNeeded() {
  // Seiten ohne \( … \) oder \[ … \] brauchen kein MathJax
  const html = document.body ? document.body.innerHTML : '';
  if (!html.includes('\\(') && !html.includes('\\[')) return;

  // Config MUSS vor dem Script-Tag gesetzt werden
  window.MathJax = {
    tex: {
      inlineMath:  [['\\(', '\\)']],
      displayMath: [['\\[', '\\]']],
      tags: 'ams'
    },
    options: {
      skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
    },
    startup: {
      ready() {
        MathJax.startup.defaultReady();
        MathJax.startup.promise.then(() => {
          MathJax.typesetPromise();
        });
      }
    }
  };

  // MathJax Script laden (lokal, 1,1 MB)
  const mjScript = document.createElement('script');
  mjScript.src   = new URL('./vendor/mathjax-tex-chtml.js', import.meta.url).href;
  mjScript.async = true;
  document.head.appendChild(mjScript);
})();

/* ============================================================
   PRM – copy.js (Kopieren & Ausführen)
   ============================================================ */

function initCopyButtons() {
  // 1. Einfache Code-Zellen (nur Kopieren)
  document.querySelectorAll('.code-cell').forEach(cell => {
    const header = cell.querySelector('.code-cell-header');
    const pre    = cell.querySelector('pre');
    const code   = cell.querySelector('code');
    if (!header || !pre) return;

    // Nur einfügen, wenn noch kein Button existiert
    if (!header.querySelector('.copy-btn')) {
      const copyBtn = erstelleCopyButton();
      header.appendChild(copyBtn);
      aktiviereCopyButton(copyBtn, pre, code);
    }
  });

  // 2. Split-Zellen (Kopieren links, Ausführen rechts)
  document.querySelectorAll('.code-cell-split').forEach(cell => {
    const codeHeader   = cell.querySelector('.code-side-header');
    const outputHeader = cell.querySelector('.output-side-header');
    const pre          = cell.querySelector('pre');
    const code         = cell.querySelector('code');
    if (!codeHeader || !outputHeader || !pre) return;

    // Copy-Button kommt in den linken Header
    if (!codeHeader.querySelector('.copy-btn')) {
      const copyBtn = erstelleCopyButton();
      codeHeader.appendChild(copyBtn);
      aktiviereCopyButton(copyBtn, pre, code);
    }

    // Run-Button kommt in den rechten Header
    if (!outputHeader.querySelector('.run-btn')) {
      const runBtn = erstelleRunButton();
      outputHeader.appendChild(runBtn);
      aktiviereRunButton(runBtn, cell);
    }

    // Fallback: Kaputte Bilder im Output verstecken
    cell.querySelectorAll('.output-side-body img').forEach(img => {
      img.addEventListener('error', () => {
        const outputSide = img.closest('.output-side');
        if (outputSide) {
          outputSide.style.display = 'none';
          cell.style.gridTemplateColumns = '1fr';
        }
      });
    });
  });

  // Fallback: Kaputte Bilder in normalen Zellen verstecken
  document.querySelectorAll('.code-cell-output-body img').forEach(img => {
    img.addEventListener('error', () => {
      const output = img.closest('.code-cell-output');
      if (output) output.style.display = 'none';
    });
  });

  // 3. Bare <pre><code> ohne Wrapper → Copy + Run als Overlay
  //    (.ref = Python-Referenz-Snippets: nur Highlighting, kein Run-Button)
  document.querySelectorAll('pre').forEach(pre => {
    if (pre.closest('.code-cell') || pre.closest('.code-cell-split') || pre.closest('.bare-code-wrap') || pre.closest('.ref')) return;
    const code = pre.querySelector('code');
    if (!code) return;

    const wrap = document.createElement('div');
    wrap.className = 'bare-code-wrap';
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);

    const toolbar = document.createElement('div');
    toolbar.className = 'bare-code-toolbar';
    wrap.appendChild(toolbar);

    const outputDiv = document.createElement('div');
    outputDiv.className = 'bare-code-output output-side-body';
    wrap.appendChild(outputDiv);

    const copyBtn = erstelleCopyButton();
    toolbar.appendChild(copyBtn);
    aktiviereCopyButton(copyBtn, pre, code);

    const runBtn = erstelleRunButton();
    toolbar.appendChild(runBtn);
    aktiviereRunButton(runBtn, wrap);
  });
}

/* ── COPY-LOGIK ──────────────────────────────────────────── */
function erstelleCopyButton() {
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.setAttribute('aria-label', 'Code kopieren');
  btn.innerHTML = ikonKopieren();
  return btn;
}

function aktiviereCopyButton(btn, pre, code) {
  btn.addEventListener('click', async () => {
    const text = code ? code.innerText : pre.innerText;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(code ?? pre);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
    }
    btn.classList.add('copied');
    btn.innerHTML = ikonKopiert();
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = ikonKopieren();
    }, 2000);
  });
}

/* ── RUN-LOGIK (Pyodide) ─────────────────────────────────── */
function erstelleRunButton() {
  const btn = document.createElement('button');
  btn.className = 'run-btn';
  btn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg> Ausführen
  `;
  return btn;
}

function aktiviereRunButton(btn, cell) {
  btn.addEventListener('click', async () => {
    const code       = cell.querySelector('code');
    const outputBody = cell.querySelector('.output-side-body');
    if (!code || !outputBody) return;

    btn.disabled = true;
    btn.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-dasharray="31.4 31.4" stroke-linecap="round"/>
      </svg> Lädt...
    `;

    // Warten bis Pyodide aus der header.js initialisiert ist
    if (!window._pyodideReady) {
      await new Promise(resolve => document.addEventListener('pyodide-ready', resolve, { once: true }));
    }

    try {
      window._pyodide.runPython(`import sys, io\nsys.stdout = io.StringIO()`);
      window._pyodide.runPython(`import matplotlib\nmatplotlib.use('Agg')`);
      window._pyodide.runPython(code.innerText);
      
      const stdout = window._pyodide.runPython(`sys.stdout.getvalue()`);
      
      const figures = window._pyodide.runPython(`
import matplotlib.pyplot as plt, io, base64
imgs = []
for i in plt.get_fignums():
  buf = io.BytesIO()
  plt.figure(i).savefig(buf, format='png', dpi=150, bbox_inches='tight')
  buf.seek(0)
  imgs.append(base64.b64encode(buf.read()).decode())
plt.close('all')
imgs
      `);

      outputBody.innerHTML = '';
      
      figures.toJs().forEach(b64 => {
        const img = document.createElement('img');
        img.src = `data:image/png;base64,${b64}`;
        img.style.width = '100%';
        img.style.borderRadius = 'var(--radius-md)';
        outputBody.appendChild(img);
      });

      if (stdout.trim()) {
        const pre = document.createElement('pre');
        pre.textContent = stdout;
        outputBody.appendChild(pre);
      }
    } catch (err) {
      outputBody.innerHTML = `<pre style="color:var(--color-danger)">${err}</pre>`;
    }

    btn.disabled = false;
    btn.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg> Ausführen
    `;
  });
}

/* ── ICONS ───────────────────────────────────────────────── */
function ikonKopieren() {
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Kopieren`;
}

function ikonKopiert() {
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Kopiert!`;
}

/* ── INIT START ──────────────────────────────────────────── */
// Führe es direkt aus
initCopyButtons();

// Und zur Sicherheit nochmal, falls Highlight.js oder HTML später laden
setTimeout(initCopyButtons, 500);
setTimeout(initCopyButtons, 1000);