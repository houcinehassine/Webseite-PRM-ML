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
        { href: '#quiz',      title: 'WarmUp Quiz' },
        { href: '#aufgabe1',  title: 'Aufgabe 1' },
        { href: '#aufgabe2',  title: 'Aufgabe 2' },
        { href: '#aufgabe3',  title: 'Aufgabe 3' },
        { href: '#aufgabe4',  title: 'Aufgabe 4' },
        { href: '#bonus',     title: 'Bonus' }
      ]
    },

    {
      id: 'blatt04',
      href: 'Aufgabenblatt04.html',
      title: '04 · Clustering',
      sections: [
        { href: '#quiz',        title: 'Quiz' },
        { href: '#warmup',      title: 'WarmUp' },
        { href: '#hauptaufgaben', title: 'Hauptaufgaben' },
        { href: '#bonus',       title: 'Bonus' }
      ]
    },

    {
      id: 'blatt05',
      href: 'Aufgabenblatt05.html',
      title: '05 · Klassifikation',
      sections: [
        { href: '#verstaendnis', title: 'Verständnisfragen' },
        { href: '#programmierung', title: 'Programmieraufgaben' },
        { href: '#anwendung',   title: 'Anwendungsaufgabe' }
      ]
    },

    {
      id: 'blatt06',
      href: 'Aufgabenblatt06.html',
      title: '06 · GMM & Unsupervised',
      sections: [
        { href: '#warmup',    title: '§ 0 WarmUp' },
        { href: '#aufgabe1',  title: '§ 1 Betriebszustand' },
        { href: '#aufgabe2',  title: '§ 2 Face Generator' },
        { href: '#aufgabe3',  title: '§ 3 Gehirntumor' },
        { href: '#bonus',     title: '§ 4 Bonus' }
      ]
    }

  ]
};

registerSidebar(chapter);
