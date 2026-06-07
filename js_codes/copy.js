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