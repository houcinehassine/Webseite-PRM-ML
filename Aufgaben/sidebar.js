// ─────────────────────────────────────────────────────────
//  Aufgaben/sidebar.js  –  Nur Daten, Logik kommt aus Core
// ─────────────────────────────────────────────────────────
import { registerSidebar } from '../assets/script.js';

const chapter = {
  title: 'Aufgaben',
  pages: [

    // ── Übersicht ─────────────────────────────────────────
    {
      id: 'aufgaben',
      href: 'Aufgaben.html',
      title: '📋 Übersicht',
      sections: []
    },

    // ── Aufgabenblätter ───────────────────────────────────
    {
      id: 'blatt02',
      href: 'Aufgabenblatt02.html',
      title: '02 · ML Grundlagen',
      sections: [
        { href: '#quiz',         title: '🧠 Quiz' },
        { href: '#warmup',       title: '🌡️ WarmUp' },
        { href: '#haupt',        title: '⚡ Hauptaufgaben' },
        { href: '#schmankerl',   title: '🥨 Schmankerl' }
      ]
    },

    {
      id: 'blatt03',
      href: 'Aufgabenblatt03.html',
      title: '03 · SVM',
      sections: [
        { href: '#quiz',       title: '🧠 Quiz' },
        { href: '#haupt',      title: '⚡ Hauptaufgaben' },
        { href: '#schmankerl', title: '🥨 Schmankerl' }
      ]
    },

    {
      id: 'blatt04',
      href: 'Aufgabenblatt04.html',
      title: '04 · Clustering',
      sections: [
        { href: '#quiz',       title: '🧠 Quiz' },
        { href: '#warmup',     title: '🌡️ WarmUp' },
        { href: '#haupt',      title: '⚡ Hauptaufgaben' },
        { href: '#schmankerl', title: '🥨 Schmankerl' }
      ]
    },

    {
      id: 'blatt05',
      href: 'Aufgabenblatt05.html',
      title: '05 · Klassifikation',
      sections: [
        { href: '#quiz',       title: '🧠 Quiz' },
        { href: '#haupt',      title: '⚡ Programmieren' },
        { href: '#schmankerl', title: '🥨 Anwendung' }
      ]
    },

    {
      id: 'blatt06',
      href: 'Aufgabenblatt06.html',
      title: '06 · GMM & Unsupervised',
      sections: [
        { href: '#warmup',     title: '🌡️ WarmUp & Theorie' },
        { href: '#haupt',      title: '⚡ Hauptaufgaben' },
        { href: '#schmankerl', title: '🥨 Bonus' }
      ]
    }

  ]
};

registerSidebar(chapter);
