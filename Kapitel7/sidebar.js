// ─────────────────────────────────────────────────────────
//  Kapitel7/sidebar.js  –  Nur Daten, Logik kommt aus Core
// ─────────────────────────────────────────────────────────
import { registerSidebar } from '../assets/script.js';

const chapter = {
  title: 'Kapitel 7 · Evaluation',
  pages: [

    // ── Einführung ────────────────────────────────────────
    {
      id: 'einfuehrung',
      href: 'Einführung.html',
      title: 'Einführung – Evaluation',
      sections: [
        { href: '#kontext',  title: 'Kontext & Einordnung' },
        { href: '#warum',    title: 'Warum Evaluation?' },
        { href: '#fragen',   title: 'Leitfragen' },
        { href: '#roadmap',  title: 'Roadmap' }
      ]
    },

    // ── Confusion Matrix Grundlagen ───────────────────────
    {
      id: 'page1',
      href: 'Page01.html',
      title: '1. Confusion Matrix Grundlagen',
      sections: [
        { href: '#motivation',     title: 'Motivation' },
        { href: '#vier-felder',    title: 'Die vier Felder' },
        { href: '#tpr-fpr',        title: 'TPR & FPR' },
        { href: '#korrupter-arzt', title: 'Beispiel: Korrupter Arzt' }
      ]
    },

    // ── ROC Curves Theorie ────────────────────────────────
    {
      id: 'page2',
      href: 'Page02.html',
      title: '2. ROC Curves Theorie',
      sections: [
        { href: '#drei-szenarien',   title: 'Drei Szenarien' },
        { href: '#koordinatensystem', title: 'Koordinatensystem' },
        { href: '#ideal-vs-zufall',  title: 'Ideal vs. Zufall' },
        { href: '#tradeoff',         title: 'Trade-off' }
      ]
    },

    // ── ROC Curves in sklearn ─────────────────────────────
    {
      id: 'page3',
      href: 'Page03.html',
      title: '3. ROC Curves in sklearn',
      sections: [
        { href: '#api-uebersicht', title: 'API-Übersicht' },
        { href: '#erstes-beispiel', title: 'Erstes Beispiel' },
        { href: '#std-variieren',  title: 'std variieren' },
        { href: '#integrale',      title: 'AUC & Integrale' }
      ]
    },

    // ── Decision Threshold ────────────────────────────────
    {
      id: 'page4',
      href: 'Page04.html',
      title: '4. Decision Threshold',
      sections: [
        { href: '#was-ist-threshold', title: 'Was ist der Threshold?' },
        { href: '#use-cases',         title: 'Use Cases' },
        { href: '#adjusted-predict',  title: 'adjusted_predict()' },
        { href: '#hinweise',          title: 'Wichtige Hinweise' }
      ]
    },

    // ── Confusion Matrix sklearn & AUC ────────────────────
    {
      id: 'page5',
      href: 'Page05.html',
      title: '5. Confusion Matrix sklearn & AUC',
      sections: [
        { href: '#confusion-matrix',  title: 'Confusion Matrix' },
        { href: '#auc',               title: 'AUC-Score' },
        { href: '#youden',            title: 'Youden-Index' },
        { href: '#praxis-beispiele',  title: 'Praxisbeispiele' }
      ]
    },

    // ── Precision-Recall & F1 ─────────────────────────────
    {
      id: 'page6',
      href: 'Page06.html',
      title: '6. Precision-Recall & F1',
      sections: [
        { href: '#warum-nicht-roc', title: 'Warum nicht ROC?' },
        { href: '#precision-recall', title: 'Precision & Recall' },
        { href: '#pr-kurve',        title: 'PR-Kurve' },
        { href: '#f1-score',        title: 'F1-Score' }
      ]
    },

    // ── Multi-Class ROC ───────────────────────────────────
    {
      id: 'page7',
      href: 'Page07.html',
      title: '7. Multi-Class ROC',
      sections: [
        { href: '#warum-schwieriger', title: 'Warum schwieriger?' },
        { href: '#averaging',         title: 'Macro / Micro Averaging' },
        { href: '#code-beispiel',     title: 'Code-Beispiel' },
        { href: '#zusammenfassung',   title: 'Zusammenfassung' }
      ]
    },

    // ── Praxisbeispiel ────────────────────────────────────
    {
      id: 'beispiel',
      href: 'Pagebeispiel.html',
      title: '🔧 Praxisbeispiel: Kugellager',
      sections: [
        { href: '#aufgabe',      title: 'Aufgabenstellung' },
        { href: '#daten-modell', title: 'Daten & Modell' },
        { href: '#loesung',      title: 'Lösung' },
        { href: '#anwendung',    title: 'Anwendung' }
      ]
    },

    // ── Prüfungsvorbereitung ──────────────────────────────
    {
      id: 'divider-pruefung',
      divider: true,
      label: 'Prüfungsvorbereitung'
    },

    {
      id: 'cheatsheet',
      href: 'PageCheatsheet.html',
      title: '📋 Cheatsheet',
      pruefung: true,
      sections: [
        { href: '#confusion-matrix', title: 'Confusion Matrix' },
        { href: '#formeln',          title: 'Alle Formeln' },
        { href: '#api',              title: 'sklearn API' },
        { href: '#wann-was',         title: 'Wann was?' },
        { href: '#fallen',           title: 'Typische Fallen' },
        { href: '#merksaetze',       title: 'Merksätze' }
      ]
    },

    {
      id: 'quiz',
      href: 'PageQuiz.html',
      title: '🧠 Quiz',
      pruefung: true,
      sections: [
        { href: '#konzept-fragen', title: 'Konzeptfragen' },
        { href: '#formel-fragen',  title: 'Formelfragen' },
        { href: '#code-fragen',    title: 'Code-Fragen' },
        { href: '#fallen-fragen',  title: '🪤 Fallen' }
      ]
    }

  ]
};

registerSidebar(chapter);
