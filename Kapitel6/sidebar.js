// ─────────────────────────────────────────────────────────
//  Kapitel6/Sidebar.js  –  Nur Daten, Logik kommt aus Core
// ─────────────────────────────────────────────────────────
import { registerSidebar } from '../js_codes/sidebar-core.js';

const chapter = {
  title: 'Kapitel 6 · Gaussian Mixture Models',
  pages: [

    // ── Grundlagen & Einführung ───────────────────────────
    {
      id: 'page1',
      href: 'Page01.html',
      title: '1. Einführung / Reinkommen',
      sections: [
        { href: '#wo-befinden-wir-uns', title: 'Wo befinden wir uns?'    },
        { href: '#ausgangslage',        title: 'Beyond k-means & DBSCAN' },
        { href: '#improving-kmeans',    title: 'Improving k-means'       },
        { href: '#towards-gmm',         title: 'Towards GMMs'            }
      ]
    },

    // ── Mechanik / sklearn ────────────────────────────────
    {
      id: 'page2',
      href: 'Page02.html',
      title: '2. GMM – Mechanik & sklearn',
      sections: [
        { href: '#predict-proba',   title: 'GMM & predict_proba()' },
        { href: '#gmm-mechanik',    title: 'Mechanische Beschreibung' },
        { href: '#covariance-type', title: 'covariance_type'          }
      ]
    },

    // ── Mathematik / Deep Dive ────────────────────────────
    {
      id: 'page3',
      href: 'Page03.html',
      title: '3. GMM – Mathematisch / Deep Dive',
      sections: [
        { href: '#gmm-mathematik',     title: 'Allgemeine Formulierung' },
        { href: '#maximum-likelihood', title: 'Maximum Likelihood'      },
        { href: '#log-likelihood',     title: 'Log-Likelihood & MLE'    },
        { href: '#em-algorithmus',     title: 'EM-Algorithmus'          },
        { href: '#konvergenz',         title: 'Konvergenzverhalten'     }
      ]
    },

    // ── Dichteschätzung / BIC & AIC ───────────────────────
    {
      id: 'page4',
      href: 'Page04.html',
      title: '4. Dichteschätzung & BIC/AIC',
      sections: [
        { href: '#dichteschaetzung', title: 'GMM als gen. Modell'  },
        { href: '#zwei-monde',       title: 'Problem: Zwei Monde'  },
        { href: '#gmm-sampler',      title: 'GMM als Sampler'      },
        { href: '#bic-aic',          title: 'BIC & AIC'            },
        { href: '#interpretation',   title: 'Interpretation'       }
      ]
    },

    // ── Anwendungsbeispiel ────────────────────────────────
    {
      id: 'page5',
      href: 'Page05.html',
      title: '5. Anwendung: Generate Numbers',
      sections: [
        { href: '#generate-numbers', title: 'Beispiel: Generate Numbers' },
        { href: '#aic-modellwahl',   title: 'AIC Modellwahl'             },
        { href: '#neue-ziffern',     title: 'Neue Ziffern generieren'    }
      ]
    },

    // ── Prüfungsvorbereitung ──────────────────────────────
    {
      id: 'divider-pruefung',
      divider: true,
      label: 'Prüfungsvorbereitung'
    },
    {
      id: 'cheatsheet_gmm',
      href: 'PageCheatsheet.html',
      title: '📋 Cheatsheet GMM',
      sections: [
        { href: '#formeln',        title: 'Alle Formeln'        },
        { href: '#api',            title: 'sklearn API'         },
        { href: '#em-schritte',    title: 'EM-Schritte'         },
        { href: '#hyperparameter', title: 'Hyperparameter'      },
        { href: '#bic-aic-ref',    title: 'BIC & AIC'           },
        { href: '#fallen',         title: 'Typische Fallen'     },
        { href: '#merksaetze',     title: 'Merksätze'           },
        { href: '#fragen',         title: 'Prüfungsfragen'      }
      ]
    },
    {
      id: 'quiz',
      href: 'PageQuiz.html',
      title: '🧠 Quiz',
      sections: [
        { href: '#konzept-fragen', title: 'Konzeptfragen' },
        { href: '#formel-fragen',  title: 'Formelfragen'  },
        { href: '#code-fragen',    title: 'Code-Fragen'   },
        { href: '#fallen-fragen',  title: '🪤 Fallen'     }
      ]
    }

  ]
};

registerSidebar(chapter);