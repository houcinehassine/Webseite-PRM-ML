import { registerSidebar } from '../assets/script.js';

const chapter = {
  title: 'Kapitel 3 · Support Vector Machines',
  pages: [
    {
      id: 'page1',
      href: 'Page01.html',
      title: '1. Einführung: Was dich erwartet',
      sections: [
        { href: '#wo-befinden-wir-uns', title: 'SVM im ML-Kontext' },
        { href: '#agenda',              title: 'Die 4 Agenda-Punkte' },
        { href: '#svm-allgemein',       title: 'SVM: Allgemein' },
        { href: '#alle-seiten',         title: 'Alle Seiten – Navigation' }
      ]
    },
    {
      id: 'page2',
      href: 'Page02.html',
      title: '2. Margin Maximierung & Support Vectors',
      sections: [
        { href: '#mehrere-geraden',     title: 'Mehrere Trenngeraden' },
        { href: '#margin-band',         title: 'Margin & Maximum Margin' },
        { href: '#support-vectors',     title: 'Support Vectors' },
        { href: '#robustheit',          title: 'Robustheitstest N=60 vs N=120' }
      ]
    },
    {
      id: 'page3',
      href: 'Page03.html',
      title: '3. Mathematischer Hintergrund',
      sections: [
        { href: '#hyperebene',          title: 'Hyperebene & Normalenvektor w' },
        { href: '#vorzeichenregel',     title: 'Vorzeichenregel & Modell' },
        { href: '#optimierungsproblem', title: 'Optimierungsproblem' },
        { href: '#hard-margin',         title: 'Hard-Margin Herleitung' }
      ]
    },
    {
      id: 'page4',
      href: 'Page04.html',
      title: '4. Soft-Margin & Optimierung',
      sections: [
        { href: '#soft-margin',         title: 'Soft-Margin & C-Parameter' },
        { href: '#slack-variable',      title: 'Slack-Variable ξ' },
        { href: '#hinge-loss',          title: 'Hinge Loss' },
        { href: '#gradienten',          title: 'Gradienten ∇w & ∇b' },
        { href: '#gradientenabstieg',   title: 'Gradientenabstieg' }
      ]
    },
    {
      id: 'page5',
      href: 'Page05.html',
      title: '5. SVM from Scratch',
      sections: [
        { href: '#loss-function',       title: 'Loss Function in Python' },
        { href: '#svm-gradients',       title: 'svm_gradients()' },
        { href: '#svm-train',           title: 'svm_train()' },
        { href: '#visualisierung',      title: 'Visualisierung & Animation' }
      ]
    },
    {
      id: 'page6',
      href: 'Page06.html',
      title: '6. Nicht-lineare Probleme & Kernel-Trick',
      sections: [
        { href: '#make-circles',        title: 'make_circles: linear nicht trennbar' },
        { href: '#rbf',                 title: 'RBF & 3D-Projektion' },
        { href: '#kernel-trick',        title: 'Kernel-Trick: kernel=rbf' }
      ]
    },
    {
      id: 'page7',
      href: 'Page07.html',
      title: '7. Multi-Class SVMs & Praxis',
      sections: [
        { href: '#ovo',                 title: 'One-versus-One (OvO)' },
        { href: '#handschrift',         title: 'Handschrifterkennung (Digits)' },
        { href: '#face-recognition',    title: 'Face Recognition (LFW + PCA)' },
        { href: '#fault-classification',title: 'Fault Classification (Kugellager)' }
      ]
    },
    {
      id: 'page8',
      href: 'Page08.html',
      title: '8. SVR & Zusammenfassung',
      sections: [
        { href: '#svr-intuition',       title: 'SVR: Umgekehrte Optimierung' },
        { href: '#epsilon-tube',        title: 'ε-Tube & Hyperparameter' },
        { href: '#svr-vergleich',       title: 'ε=1.5 vs ε=0.5' },
        { href: '#pros-cons',           title: 'Pros & Cons · No-Free-Lunch' }
      ]
    },
    {
      id: 'divider-pruefung',
      divider: true,
      label: 'Prüfungsvorbereitung'
    },
    {
      id: 'cheatsheet',
      href: 'PageCheatsheet.html',
      title: '📋 Cheatsheet',
      sections: [
        { href: '#formeln',             title: 'Alle Formeln' },
        { href: '#kernel-uebersicht',   title: 'Kernel-Übersicht' },
        { href: '#sklearn-api',         title: 'sklearn API' },
        { href: '#hyperparameter',      title: 'Hyperparameter C & ε' },
        { href: '#fallen',              title: 'Typische Fallen & Merksätze' }
      ]
    },
    {
      id: 'quiz',
      href: 'PageQuiz.html',
      title: '🧠 Quiz',
      sections: [
        { href: '#konzept',             title: 'Konzeptfragen (8)' },
        { href: '#formel',              title: 'Formelfragen (6)' },
        { href: '#code',                title: 'Code-Fragen (6)' },
        { href: '#fallen',              title: '🪤 Fallen (6)' }
      ]
    }
  ]
};

registerSidebar(chapter);
