/* ============================================================
   translator.js  –  Offline-Übersetzer UI
   Wird von footer.js als ES-Modul geladen → erscheint auf
   jeder Seite als schwebendes Widget (unten rechts).

   Drei Modi:
   1) Auswahl  – markierter Text → Tooltip-Übersetzung
   2) Sektion  – 🌐-Knopf je Abschnitt (toggle Original/Übersetzung)
   3) Seite    – alle sichtbaren Textblöcke übersetzen (batch)

   Sprachen: DE (original) · EN (Englisch) · AR (Arabisch, RTL)
   Modell:   Xenova/nllb-200-distilled-600M  ~300 MB (einmalig)
   ============================================================ */

/* ── Konfiguration ───────────────────────────────────────── */
const WORKER_URL = new URL('./translator-worker.js', import.meta.url).href;
const LS_LANG    = 'prm-translator-lang';

const LANGS = {
  de: { label: 'DE 🇩🇪', name: 'Deutsch',  dir: 'ltr' },
  en: { label: 'EN 🇬🇧', name: 'English',  dir: 'ltr' },
  ar: { label: 'عربي',   name: 'العربية', dir: 'rtl' },
};

/* Elemente die übersetzt werden (Seiten- und Sektion-Modus) */
const TRANSLATE_SEL =
  'main p, main h1, main h2, main h3, main h4, ' +
  'main li:not(nav li):not(.sidebar-item), ' +
  'main td, main th, main .note, main .merksatz, ' +
  'main .frage-answer, main .q-answer, main .quiz-q-text, ' +
  'main .desc, main .hint, main .sb-text';

/* Elemente die NIE übersetzt werden (Vorfahren-Check) */
const SKIP_ANCESTOR =
  'code, pre, [class*="katex"], [class*="math"], ' +
  'nav, .nav-arrows, .breadcrumb, site-header, site-footer, ' +
  '#prm-translator, #prm-tr-tooltip, .sidebar-wrap';

/* ── Zustand ─────────────────────────────────────────────── */
let worker       = null;
let workerReady  = false;
let msgId        = 0;
const pending    = new Map();   // id → { resolve, reject }

let curLang  = localStorage.getItem(LS_LANG) || 'de';
let curMode  = 'selection';     // 'selection' | 'sections' | 'page'
const secBtns = [];             // aktive Sektion-Buttons
let pageSnap  = null;           // [{el, origHTML}] für "Seite wiederherstellen"
let cancelPage = false;         // Abbruch-Flag für batch-Übersetzung

/* ── Worker ──────────────────────────────────────────────── */
function ensureWorker() {
  if (worker) return;
  worker = new Worker(WORKER_URL, { type: 'module' });
  worker.onmessage = ({ data }) => {
    const cb = pending.get(data.id);
    if (!cb) return;

    if (data.type === 'result') {
      pending.delete(data.id);
      cb.resolve(data.text);
      return;
    }
    if (data.type === 'error') {
      pending.delete(data.id);
      cb.reject(new Error(data.error));
      return;
    }
    if (data.type === 'progress') {
      if (data.done) {
        setProgress(null);
        return;
      }
      const total  = data.total  || 0;
      const loaded = data.loaded || 0;
      const pct    = total > 0 ? Math.round(loaded / total * 100) : 0;
      const mb     = n => (n / 1024 / 1024).toFixed(0);
      setStatus(`⬇ ${mb(loaded)} / ${mb(total)} MB…`, 'loading');
      setProgress(pct);
      return;
    }
    if (data.type === 'loaded') {
      workerReady = true;
      setProgress(null);
      setStatus('Modell geladen ✓', 'ok');
      pending.delete(data.id);
      cb.resolve();
    }
  };
}

function workerSend(type, payload = {}) {
  return new Promise((resolve, reject) => {
    const id = ++msgId;
    pending.set(id, { resolve, reject });
    worker.postMessage({ id, type, ...payload });
  });
}

async function ensureModel() {
  ensureWorker();
  if (workerReady) return;
  setStatus('Lädt Sprachmodell (~300 MB, einmalig)…', 'loading');
  setProgress(0);
  await workerSend('load');
}

async function translateText(text, tgt = curLang) {
  if (!text.trim() || tgt === 'de') return text;
  await ensureModel();
  return workerSend('translate', { text, tgt });
}

/* ── Hilfsfunktionen ─────────────────────────────────────── */
function shouldSkip(el) {
  return !!el.closest(SKIP_ANCESTOR);
}

function isRtl(lang = curLang) {
  return LANGS[lang]?.dir === 'rtl';
}

/* ── Widget HTML ─────────────────────────────────────────── */
function buildWidget() {
  const w = document.createElement('div');
  w.id = 'prm-translator';
  w.innerHTML = `
    <button id="prm-tr-fab" title="Offline-Übersetzer" aria-label="Übersetzer">🌐</button>
    <div id="prm-tr-panel" hidden>
      <div class="prm-tr-head">
        <span>🌐 Übersetzer</span>
        <button id="prm-tr-close" aria-label="Schließen" title="Schließen">✕</button>
      </div>

      <div class="prm-tr-section">
        <div class="prm-tr-label">Sprache</div>
        <div class="prm-tr-langs" role="group" aria-label="Sprache wählen">
          ${Object.entries(LANGS).map(([k, v]) =>
            `<button class="prm-tr-lang${k === curLang ? ' active' : ''}"
                     data-lang="${k}" aria-pressed="${k === curLang}">${v.label}</button>`
          ).join('')}
        </div>
      </div>

      <div class="prm-tr-section">
        <div class="prm-tr-label">Modus</div>
        <div class="prm-tr-modes" role="group" aria-label="Übersetzungsmodus">
          <button class="prm-tr-mode active" data-mode="selection" aria-pressed="true">🎯 Auswahl</button>
          <button class="prm-tr-mode"        data-mode="sections"  aria-pressed="false">📑 Sektionen</button>
          <button class="prm-tr-mode"        data-mode="page"      aria-pressed="false">🌍 Seite</button>
        </div>
        <p class="prm-tr-hint" id="prm-tr-mode-hint">Text markieren → Übersetzung erscheint</p>
      </div>

      <div class="prm-tr-status-wrap">
        <span id="prm-tr-status-text" class="prm-tr-status-text">
          ${curLang === 'de' ? 'Sprache wählen um zu starten' : 'Bereit'}
        </span>
        <div id="prm-tr-progress" class="prm-tr-progress" hidden>
          <div id="prm-tr-bar" class="prm-tr-bar" style="width:0%"></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(w);

  /* ── Öffnen / Schließen ── */
  w.querySelector('#prm-tr-fab').addEventListener('click', () => {
    const p = w.querySelector('#prm-tr-panel');
    p.hidden = !p.hidden;
  });
  w.querySelector('#prm-tr-close').addEventListener('click', () => {
    w.querySelector('#prm-tr-panel').hidden = true;
  });

  /* ── Sprache wählen ── */
  w.querySelectorAll('.prm-tr-lang').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === curLang) return;
      curLang = lang;
      localStorage.setItem(LS_LANG, lang);
      w.querySelectorAll('.prm-tr-lang').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === lang);
        b.setAttribute('aria-pressed', b.dataset.lang === lang);
      });
      onLangChange();
    });
  });

  /* ── Modus wählen ── */
  w.querySelectorAll('.prm-tr-mode').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      if (mode === curMode) return;
      curMode = mode;
      w.querySelectorAll('.prm-tr-mode').forEach(b => {
        b.classList.toggle('active', b.dataset.mode === mode);
        b.setAttribute('aria-pressed', b.dataset.mode === mode);
      });
      onModeChange();
    });
  });
}

/* ── Status-Helfer ───────────────────────────────────────── */
function setStatus(text, type = '') {
  const el = document.getElementById('prm-tr-status-text');
  if (!el) return;
  el.textContent = text;
  el.className   = 'prm-tr-status-text' + (type ? ' prm-tr-st-' + type : '');
}

function setProgress(pct) {
  const bar  = document.getElementById('prm-tr-bar');
  const wrap = document.getElementById('prm-tr-progress');
  if (!bar || !wrap) return;
  if (pct == null) { wrap.hidden = true; return; }
  wrap.hidden    = false;
  bar.style.width = pct + '%';
}

function setModeHint(text) {
  const el = document.getElementById('prm-tr-mode-hint');
  if (el) el.textContent = text;
}

/* ── Modus 1: Auswahl-Tooltip ────────────────────────────── */
let tooltip = null;

function getTooltip() {
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'prm-tr-tooltip';
    tooltip.setAttribute('aria-live', 'polite');
    document.body.appendChild(tooltip);
    /* Schließen bei Klick außerhalb */
    document.addEventListener('mousedown', e => {
      if (!e.target.closest('#prm-tr-tooltip')) hideTooltip();
    });
  }
  return tooltip;
}

function hideTooltip() {
  if (tooltip) tooltip.style.display = 'none';
}

function initSelectionMode() {
  document.addEventListener('mouseup', async e => {
    if (curMode !== 'selection' || curLang === 'de') return;
    if (e.target.closest('#prm-translator, #prm-tr-tooltip')) return;

    const sel  = window.getSelection();
    const text = sel?.toString().trim();
    if (!text || text.length < 3) { hideTooltip(); return; }

    const range = sel.getRangeAt(0);
    const rect  = range.getBoundingClientRect();
    const tt    = getTooltip();

    /* Tooltip positionieren */
    const left = Math.min(rect.left + window.scrollX,
                          window.innerWidth - 295 + window.scrollX);
    const top  = rect.bottom + window.scrollY + 8;
    tt.style.cssText = `position:absolute;left:${left}px;top:${top}px;display:block`;
    tt.textContent   = '⏳ Übersetze…';
    tt.removeAttribute('dir');

    try {
      const result = await translateText(text);
      tt.textContent = result;
      if (isRtl()) tt.setAttribute('dir', 'rtl');
    } catch {
      tt.textContent = '⚠ Übersetzungsfehler';
    }
  });
}

/* ── Modus 2: Sektion-Buttons ────────────────────────────── */
function clearSectionButtons() {
  secBtns.forEach(btn => btn.remove());
  secBtns.length = 0;
  /* Originale wiederherstellen */
  document.querySelectorAll('[data-prm-orig]').forEach(el => {
    el.innerHTML = el.dataset.prmOrig;
    delete el.dataset.prmOrig;
    el.removeAttribute('dir');
    el.removeAttribute('lang');
  });
}

function addSectionButtons() {
  clearSectionButtons();
  if (curLang === 'de') return;

  document.querySelectorAll('section.section').forEach(sec => {
    const heading = sec.querySelector('h2, h3');
    if (!heading) return;

    const btn = document.createElement('button');
    btn.className   = 'prm-tr-sec-btn';
    btn.textContent = '🌐 ' + (LANGS[curLang]?.name ?? curLang.toUpperCase());
    btn.title       = 'Abschnitt übersetzen';

    /* Einfügen direkt nach dem Heading */
    heading.insertAdjacentElement('afterend', btn);
    secBtns.push(btn);

    btn.addEventListener('click', async () => {
      const translated = btn.dataset.translated === '1';
      btn.disabled = true;

      if (translated) {
        /* Zurücksetzen */
        sec.querySelectorAll('[data-prm-orig]').forEach(el => {
          el.innerHTML = el.dataset.prmOrig;
          delete el.dataset.prmOrig;
          el.removeAttribute('dir');
          el.removeAttribute('lang');
        });
        btn.dataset.translated = '0';
        btn.textContent = '🌐 ' + (LANGS[curLang]?.name ?? curLang.toUpperCase());
      } else {
        btn.textContent = '⏳…';
        const elements = [...sec.querySelectorAll(TRANSLATE_SEL)];
        const rtl = isRtl();
        let done = 0;

        for (const el of elements) {
          if (shouldSkip(el)) continue;
          const text = el.textContent.trim();
          if (text.length < 5) continue;

          el.dataset.prmOrig = el.innerHTML;
          try {
            const out = await translateText(text);
            el.textContent = out;
            if (rtl) { el.setAttribute('dir', 'rtl'); el.setAttribute('lang', curLang); }
          } catch { /* behalte Original bei Fehler */ }
          done++;
        }

        btn.dataset.translated = '1';
        btn.textContent = '↩ Original (' + done + ')';
      }

      btn.disabled = false;
    });
  });
}

/* ── Modus 3: Seite übersetzen ───────────────────────────── */
async function translatePage() {
  if (curLang === 'de') { restorePage(); return; }

  cancelPage = false;
  const elements = [...document.querySelectorAll(TRANSLATE_SEL)]
    .filter(el => !shouldSkip(el) && el.textContent.trim().length >= 5);

  if (elements.length === 0) {
    setStatus('Keine übersetzbaren Texte gefunden', '');
    return;
  }

  pageSnap = [];
  const rtl   = isRtl();
  let   done  = 0;
  const total = elements.length;

  setStatus(`0 / ${total} Elemente…`, 'loading');
  setProgress(0);

  /* Seite-Button während Übersetzung aktualisieren */
  const pageBtn = document.querySelector('.prm-tr-mode[data-mode="page"]');
  if (pageBtn) pageBtn.textContent = '⏹ Abbrechen';

  for (const el of elements) {
    if (cancelPage) break;

    pageSnap.push({ el, orig: el.innerHTML });
    const text = el.textContent.trim();

    try {
      const out = await translateText(text);
      el.textContent = out;
      if (rtl) { el.setAttribute('dir', 'rtl'); el.setAttribute('lang', curLang); }
    } catch { /* behalte Original */ }

    done++;
    setStatus(`${done} / ${total}`, 'loading');
    setProgress(Math.round(done / total * 100));
  }

  if (pageBtn) pageBtn.textContent = cancelPage ? '🌍 Seite' : '↩ Original';
  setProgress(null);
  setStatus(cancelPage
    ? `Abgebrochen (${done}/${total})`
    : `Seite übersetzt ✓ (${done} Elemente)`, 'ok');
}

function restorePage() {
  if (!pageSnap) return;
  pageSnap.forEach(({ el, orig }) => {
    el.innerHTML = orig;
    el.removeAttribute('dir');
    el.removeAttribute('lang');
  });
  pageSnap = null;
  cancelPage = false;
  const pageBtn = document.querySelector('.prm-tr-mode[data-mode="page"]');
  if (pageBtn) pageBtn.textContent = '🌍 Seite';
  setStatus('Original wiederhergestellt', '');
  setProgress(null);
}

/* ── Ereignis-Handler ────────────────────────────────────── */
function onLangChange() {
  hideTooltip();

  if (curLang === 'de') {
    /* Alles zurücksetzen */
    restorePage();
    clearSectionButtons();
    setStatus('Deutsch (Original)', '');
    return;
  }

  /* Sektion-Buttons neu erzeugen (für neue Sprache) */
  if (curMode === 'sections') addSectionButtons();

  /* Modell vorladen */
  if (!workerReady) {
    ensureModel().catch(e => setStatus('⚠ ' + e.message, 'error'));
  } else {
    setStatus('Bereit – ' + LANGS[curLang]?.name, 'ok');
  }
}

function onModeChange() {
  hideTooltip();
  cancelPage = true;   /* laufende Seitenübersetzung abbrechen */

  const hints = {
    selection: 'Text markieren → Übersetzung erscheint',
    sections:  '🌐-Knopf neben jedem Abschnitt anklicken',
    page:      'Alle Texte der Seite werden übersetzt',
  };
  setModeHint(hints[curMode] ?? '');

  if (curMode === 'sections') {
    addSectionButtons();
  } else {
    clearSectionButtons();
  }

  if (curMode === 'page') {
    if (curLang !== 'de') translatePage();
  } else if (pageSnap) {
    restorePage();
  }

  /* Seite-Button: Abbruch-Toggle */
  const pageBtn = document.querySelector('.prm-tr-mode[data-mode="page"]');
  if (pageBtn) {
    if (curMode === 'page' && pageSnap) {
      pageBtn.addEventListener('click', handlePageBtnClick, { once: true });
    }
  }
}

function handlePageBtnClick() {
  if (pageSnap) { cancelPage = true; restorePage(); }
  else if (curLang !== 'de') translatePage();
}

/* ── Export / Init ───────────────────────────────────────── */
export function initTranslator() {
  buildWidget();
  initSelectionMode();

  /* Gespeicherte Sprache anwenden */
  if (curLang !== 'de') onLangChange();
}
