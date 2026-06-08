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
        { href: '#ueberblick',   title: 'Überblick'          },
        { href: '#lernziele',    title: 'Lernziele'          }
      ]
    },

    // ── Confusion Matrix ──────────────────────────────────
    {
      id: 'page1',
      href: 'Page01.html',
      title: '1. Confusion Matrix Grundlagen',
      sections: [
        { href: '#confusion-matrix',  title: 'Was ist die CM?'        },
        { href: '#tp-tn-fp-fn',       title: 'TP / TN / FP / FN'      },
        { href: '#accuracy',          title: 'Accuracy'                }
      ]
    },

    // ── ROC Curves ───────────────────────────────────────
    {
      id: 'page2',
      href: 'Page02.html',
      title: '2. ROC Curves Theorie',
      sections: [
        { href: '#roc-idee',       title: 'Idee der ROC-Kurve'   },
        { href: '#tpr-fpr',        title: 'TPR & FPR'            },
        { href: '#auc',            title: 'AUC-Wert'             }
      ]
    },

    {
      id: 'page3',
      href: 'Page03.html',
      title: '3. ROC Curves in sklearn',
      sections: [
        { href: '#roc-sklearn',    title: 'roc_curve()'         },
        { href: '#auc-sklearn',    title: 'roc_auc_score()'     },
        { href: '#beispiel',       title: 'Praxisbeispiel'      }
      ]
    },

    // ── Decision Threshold ────────────────────────────────
    {
      id: 'page4',
      href: 'Page04.html',
      title: '4. Decision Threshold',
      sections: [
        { href: '#threshold',      title: 'Schwellenwert'       },
        { href: '#auswirkung',     title: 'Auswirkung auf CM'   },
        { href: '#optimierung',    title: 'Threshold optimieren' }
      ]
    },

    // ── CM sklearn & AUC ─────────────────────────────────
    {
      id: 'page5',
      href: 'Page05.html',
      title: '5. Confusion Matrix sklearn & AUC',
      sections: [
        { href: '#cm-sklearn',     title: 'confusion_matrix()'  },
        { href: '#auc-vergleich',  title: 'AUC-Vergleich'       }
      ]
    },

    // ── Precision-Recall & F1 ─────────────────────────────
    {
      id: 'page6',
      href: 'Page06.html',
      title: '6. Precision-Recall & F1',
      sections: [
        { href: '#precision',      title: 'Precision'           },
        { href: '#recall',         title: 'Recall'              },
        { href: '#f1',             title: 'F1-Score'            },
        { href: '#pr-kurve',       title: 'PR-Kurve'            }
      ]
    },

    // ── Multi-Class ROC ───────────────────────────────────
    {
      id: 'page7',
      href: 'Page07.html',
      title: '7. Multi-Class ROC',
      sections: [
        { href: '#ovr',            title: 'One-vs-Rest'         },
        { href: '#ovo',            title: 'One-vs-One'          },
        { href: '#macro-micro',    title: 'Macro / Micro AUC'   }
      ]
    },

    // ── Praxisbeispiel ────────────────────────────────────
    {
      id: 'beispiel',
      href: 'Pagebeispiel.html',
      title: '🔧 Praxisbeispiel: Kugellager',
      sections: [
        { href: '#aufgabe',        title: 'Aufgabenstellung'    },
        { href: '#loesung',        title: 'Lösung'              }
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
        { href: '#confusion-matrix', title: 'Confusion Matrix'   },
        { href: '#formeln',          title: 'Alle Formeln'        },
        { href: '#api',              title: 'sklearn API'         },
        { href: '#wann-was',         title: 'Wann was?'           },
        { href: '#fallen',           title: 'Typische Fallen'     },
        { href: '#merksaetze',       title: 'Merksätze'           }
      ]
    },

    {
      id: 'quiz',
      href: 'PageQuiz.html',
      title: '🧠 Quiz',
      pruefung: true,
      sections: [
        { href: '#konzept-fragen',  title: 'Konzeptfragen'       },
        { href: '#formel-fragen',   title: 'Formelfragen'        },
        { href: '#code-fragen',     title: 'Code-Fragen'         }
      ]
    }

  ]
};

registerSidebar(chapter);
