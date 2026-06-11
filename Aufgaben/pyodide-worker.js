/* ================================================================
   pyodide-worker.js  –  Pyodide läuft im Web Worker
   Haupt-Thread bleibt dadurch vollständig reaktionsfähig.
   ================================================================ */

importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js');

let pyodide = null;

/* ── Pyodide initialisieren ──────────────────────────────────── */
async function initPyodide(packages) {
  postMessage({ type: 'progress', pct: 10, msg: 'Lade Pyodide-Runtime...' });
  pyodide = await loadPyodide();

  postMessage({ type: 'progress', pct: 35, msg: 'Lade numpy & matplotlib...' });
  await pyodide.loadPackage(['numpy', 'matplotlib']);

  if (packages.includes('scikit-learn')) {
    postMessage({ type: 'progress', pct: 60, msg: 'Lade scikit-learn (dauert ~20s)...' });
    await pyodide.loadPackage(['scikit-learn']);
  }

  postMessage({ type: 'progress', pct: 90, msg: 'Konfiguriere Python-Umgebung...' });
  pyodide.runPython(`import matplotlib\nmatplotlib.use('Agg')`);

  postMessage({ type: 'ready' });
}

/* ── Code ausführen ──────────────────────────────────────────── */
const RUN_HARNESS = `
import sys, io, base64
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

_figs_out    = []
_stdout_buf  = io.StringIO()
_orig_stdout = sys.stdout

def _cap_show(*a, **kw):
    for fn in sorted(plt.get_fignums()):
        fig = plt.figure(fn)
        buf = io.BytesIO()
        fig.savefig(buf, format='png', bbox_inches='tight', dpi=100)
        buf.seek(0)
        _figs_out.append(base64.b64encode(buf.read()).decode())
    plt.close('all')

_orig_show   = plt.show
plt.show     = _cap_show
sys.stdout   = _stdout_buf
_run_error   = None

try:
    exec(compile(_stu_code, '<aufgabe>', 'exec'))
    if plt.get_fignums():
        _cap_show()
except Exception as _e:
    import traceback
    _run_error = traceback.format_exc()
finally:
    sys.stdout = _orig_stdout
    plt.show   = _orig_show

_run_text = _stdout_buf.getvalue()
`;

async function runCode(id, code) {
  pyodide.globals.set('_stu_code', code);
  let text = '', figs = [], error = null;

  try {
    await pyodide.runPythonAsync(RUN_HARNESS);

    text       = String(pyodide.globals.get('_run_text') || '');
    const fp   = pyodide.globals.get('_figs_out');
    figs       = fp ? fp.toJs() : [];
    if (fp) fp.destroy();
    const err  = pyodide.globals.get('_run_error');
    error      = err ? String(err) : null;
  } catch(e) {
    error = e.toString();
  }

  postMessage({ type: 'result', id, text, figs: figs || [], error });
}

/* ── Message-Handler ─────────────────────────────────────────── */
onmessage = async function(e) {
  const { type } = e.data;

  if (type === 'init') {
    try {
      await initPyodide(e.data.packages || []);
    } catch(err) {
      postMessage({ type: 'init-error', message: String(err.message || err) });
    }
  } else if (type === 'run') {
    await runCode(e.data.id, e.data.code);
  }
};
