// ─────────────────────────────────────────────────────────
//  Kapitel3/sidebar.js  –  Nur Daten, Logik kommt aus Core
// ─────────────────────────────────────────────────────────
import { registerSidebar } from '../assets/script.js';

const chapter = {
  title: 'Kapitel 3 · Support Vector Machines',
  pages: [

    // ── Einführung ────────────────────────────────────────
    {
      id: 'page1',
      href: 'Page01.html',
      title: '1. Einführung: Was dich erwartet',
      sections: [
        { href: '#wo-befinden-wir-uns', title: 'Wo befinden wir uns?'    },
        { href: '#agenda',              title: 'Die 4 Agenda-Punkte'      },
        { href: '#svm-allgemein',       title: 'SVM: Allgemein'           },
        { href: '#alle-seiten',         title: 'Alle Seiten'              }
      ]
    },

    // ── Margin Maximierung & Support Vectors ──────────────
    {
      id: 'page2',
      href: 'Page02.html',
      title: '2. Margin Maximierung & Support Vectors',
      sections: [
        { href: '#klassifikatoren',    title: 'Wir als Klassifikatoren'   },
        { href: '#mehrere-geraden',    title: 'Mehrere Geraden'           },
        { href: '#margin-max',         title: 'Margin Maximierung'        },
        { href: '#fitting-training',   title: 'Fitting / Training'        },
        { href: '#support-vectors',    title: 'Support Vectors – Konzept' },
        { href: '#robustheit',         title: 'Support Vectors – Robustheit' }
      ]
    },

    // ── Mathematischer Hintergrund ────────────────────────
    {
      id: 'page3',
      href: 'Page03.html',
      title: '3. Mathematischer Hintergrund',
      sections: [
        { href: '#grundlagen',          title: 'Grundlagen & Notation'     },
        { href: '#hyperebene-vorzeichen', title: 'Hyperebene & Vorzeichen' },
        { href: '#optimierungsproblem', title: 'Optimierungsproblem'       },
        { href: '#hard-margin',         title: 'Hard-Margin Herleitung'    }
      ]
    },

    // ── Soft-Margin & Optimierung ─────────────────────────
    {
      id: 'page4',
      href: 'Page04.html',
      title: '4. Soft-Margin & Optimierung',
      sections: [
        { href: '#soft-margin-intro',   title: 'Hard- vs. Soft-Margin'     },
        { href: '#soft-margin-mathe',   title: 'Slack-Variable & Mathe'    },
        { href: '#vergleich-c',         title: 'Vergleich C-Parameter'     },
        { href: '#hinge-loss',          title: 'Hinge Loss Function'       },
        { href: '#gradienten',          title: 'Gradienten'                }
      ]
    },

    // ── SVM from Scratch ──────────────────────────────────
    {
      id: 'page5',
      href: 'Page05.html',
      title: '5. SVM from Scratch',
      sections: [
        { href: '#loss-function',       title: 'Loss Function in Python'   },
        { href: '#svm-gradients',       title: 'svm_gradients()'           },
        { href: '#gradientenabstieg',   title: 'Gradientenabstieg'         },
        { href: '#svm-train',           title: 'svm_train()'               },
        { href: '#visualisierung',      title: 'Visualize Training'        }
      ]
    },

    // ── Kernel-Trick & Nicht-lineare Probleme ─────────────
    {
      id: 'page6',
      href: 'Page06.html',
      title: '6. Nicht-lineare Probleme & Kernel-Trick',
      sections: [
        { href: '#nicht-linear-intro',  title: 'Nicht-lineare Probleme'   },
        { href: '#rbf-3d-projektion',   title: 'RBF & 3D-Projektion'      },
        { href: '#kernel-trick',        title: 'Kernel-Trick'             }
      ]
    },

    // ── Multi-Class & Praxis-Anwendungen ──────────────────
    {
      id: 'page7',
      href: 'Page07.html',
      title: '7. Multi-Class & Praxis-Anwendungen',
      sections: [
        { href: '#multi-class',         title: 'Multi-Class SVMs'          },
        { href: '#handschrift',         title: 'Handschrifterkennung'      },
        { href: '#face-recognition',    title: 'Face Recognition'          },
        { href: '#fault-classification', title: 'Fault Classification'     }
      ]
    },

    // ── SVR & Zusammenfassung ─────────────────────────────
    {
      id: 'page8',
      href: 'Page08.html',
      title: '8. SVR & Zusammenfassung',
      sections: [
        { href: '#svr-konzept',         title: 'SVR – Konzept'             },
        { href: '#svr-sklearn',         title: 'SVR in sklearn'            },
        { href: '#pros-cons',           title: 'Vor- & Nachteile'          },
        { href: '#no-free-lunch',       title: 'No-Free-Lunch'             }
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
        { href: '#cs-konzepte',    title: 'Kernkonzepte'           },
        { href: '#cs-formeln',     title: 'Alle Formeln'           },
        { href: '#cs-hyperparams', title: 'Hyperparameter C & ε'   },
        { href: '#cs-kernel',      title: 'Kernel-Übersicht'       },
        { href: '#cs-code',        title: 'sklearn Code'           },
        { href: '#cs-fallen',      title: 'Typische Fallen'        },
        { href: '#cs-merksaetze',  title: 'Merksätze'              },
        { href: '#cs-fragen',      title: 'Prüfungsfragen'         }
      ]
    },

    {
      id: 'quiz',
      href: 'PageQuiz.html',
      title: '🧠 Quiz',
      pruefung: true,
      sections: [
        { href: '#konzept-fragen', title: 'Konzeptfragen'          },
        { href: '#formel-fragen',  title: 'Formelfragen'           },
        { href: '#code-fragen',    title: 'Code-Fragen'            },
        { href: '#fallen-fragen',  title: '🪤 Fallen'              }
      ]
    }

  ]
};

registerSidebar(chapter);