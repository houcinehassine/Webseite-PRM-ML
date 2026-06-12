/* ============================================================
   translator-worker.js  –  Offline-Übersetzungs-Worker
   Läuft als ES-Module-WebWorker.
   Nutzt @xenova/transformers (Transformers.js) mit dem
   NLLB-200-distilled-600M Modell (300 MB, einmalig gecacht).
   ============================================================ */

import { pipeline, env }
  from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

/* Nur CDN-Modelle – kein lokales Dateisystem nötig */
env.allowLocalModels = false;
env.useBrowserCache  = true;

const LANG_TOKENS = {
  en: 'eng_Latn',
  ar: 'arb_Arab',
  de: 'deu_Latn',
};

let translator  = null;
let loadPromise = null;

/* ── Nachrichten vom Hauptthread ─────────────────────────── */
self.onmessage = async ({ data }) => {
  const { id, type } = data;

  /* ── Modell laden ── */
  if (type === 'load') {
    if (loadPromise) {
      try { await loadPromise; self.postMessage({ id, type: 'loaded' }); }
      catch (e) { self.postMessage({ id, type: 'error', error: e.message }); }
      return;
    }

    loadPromise = (async () => {
      translator = await pipeline(
        'translation',
        'Xenova/nllb-200-distilled-600M',
        {
          quantized: true,
          progress_callback(p) {
            if (p.status === 'downloading') {
              self.postMessage({
                id, type: 'progress',
                loaded: p.loaded ?? 0,
                total:  p.total  ?? 0,
                file:   p.file   ?? '',
              });
            }
            if (p.status === 'done') {
              self.postMessage({ id, type: 'progress', done: true });
            }
          },
        }
      );
    })();

    try {
      await loadPromise;
      self.postMessage({ id, type: 'loaded' });
    } catch (e) {
      loadPromise = null;
      self.postMessage({ id, type: 'error', error: e.message });
    }
    return;
  }

  /* ── Übersetzen ── */
  if (type === 'translate') {
    if (!translator) {
      self.postMessage({ id, type: 'error', error: 'Modell nicht geladen' });
      return;
    }
    try {
      const tgtToken = LANG_TOKENS[data.tgt] ?? 'eng_Latn';
      const out = await translator(data.text, {
        src_lang:       'deu_Latn',
        tgt_lang:       tgtToken,
        max_new_tokens: 512,
      });
      self.postMessage({ id, type: 'result', text: out[0].translation_text });
    } catch (e) {
      self.postMessage({ id, type: 'error', error: e.message });
    }
  }
};
