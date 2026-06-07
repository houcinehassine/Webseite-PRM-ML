/* ============================================================
   PRM – mathjax.js  |  Stand 30.05.2026
   Lädt MathJax und rendert alle Formeln auf der Seite
   ============================================================ */

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
      // Nach vollständigem Laden alle Formeln rendern
      MathJax.startup.promise.then(() => {
        MathJax.typesetPromise();
      });
    }
  }
};

// MathJax Script laden
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
script.async = true;
document.head.appendChild(script);