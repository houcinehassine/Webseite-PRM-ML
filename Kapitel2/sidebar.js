// ─────────────────────────────────────────────────────────
//  Kapitel2/Sidebar.js  –  Nur Daten, Logik kommt aus Core
//  Pfad: V4/Kapitel2/Sidebar.js
// ─────────────────────────────────────────────────────────
import { registerSidebar } from '../assets/script.js';

const chapter = {
  title: 'Kapitel 2 · Einführung in Machine Learning',
  pages: [

    // ── Einführung ────────────────────────────────────────
    {
      id: 'page1',
      href: 'Page01.html',
      title: '1. Einführung: Was dich erwartet',
      sections: [
        { href: '#wochenplan',        title: 'Wo sind wir?'            },
        { href: '#agenda',            title: 'Die 6 Agenda-Punkte'     },
        { href: '#ausgangssituation', title: 'Ausgangssituation'       },
        { href: '#was-ist-ml',        title: 'Was ist Machine Learning?'},
        { href: '#alle-seiten',       title: 'Alle Seiten'             }
      ]
    },

    // ── Kategorien des ML ─────────────────────────────────
    {
      id: 'page2',
      href: 'Page02.html',
      title: '2. Kategorien des ML: Überblick',
      sections: [
        { href: '#drei-kategorien',        title: 'Drei Kategorien'              },
        { href: '#supervised-datensicht',   title: 'Supervised – Datensicht'      },
        { href: '#supervised-notation',     title: 'Supervised – Notation'        },
        { href: '#unsupervised-datensicht', title: 'Unsupervised – Datensicht'    },
        { href: '#unsupervised-notation',   title: 'Unsupervised – Notation'      },
        { href: '#trainingsprozess',        title: 'Trainingsprozess-Vergleich'   }
      ]
    },

    // ── Supervised Learning ───────────────────────────────
    {
      id: 'page3',
      href: 'Page03.html',
      title: '3. Supervised Learning',
      sections: [
        { href: '#klassifikation',         title: 'Klassifikation'           },
        { href: '#scoring-prediction',     title: 'Scoring & Prediction'     },
        { href: '#klassifikation-scoring', title: 'Klassifikation Scoring'   },
        { href: '#regression',             title: 'Regression'               },
        { href: '#regression-scoring',     title: 'Regression Scoring'       }
      ]
    },

    // ── Unsupervised Learning ─────────────────────────────
    {
      id: 'page4',
      href: 'Page04.html',
      title: '4. Unsupervised Learning',
      sections: [
        { href: '#clustering',          title: 'Clustering'          },
        { href: '#dimensionsreduktion', title: 'Dimensionsreduktion' }
      ]
    },

    // ── scikit-learn ──────────────────────────────────────
    {
      id: 'page5',
      href: 'Page05.html',
      title: '5. ML in Python: scikit-learn',
      sections: [
        { href: '#sklearn-ueberblick', title: 'sklearn Überblick'         },
        { href: '#generischer-aufbau', title: 'Generischer 4-Schritte-Prozess' },
        { href: '#datenformat',        title: 'Datenformat (X & y)'       },
        { href: '#linear-regression',  title: 'Linear Regression Beispiel'}
      ]
    },

    // ── Model Validation ──────────────────────────────────
    {
      id: 'page6',
      href: 'Page06.html',
      title: '6. Model Validation: Grundlagen',
      sections: [
        { href: '#warum-validieren', title: 'Warum validieren?'       },
        { href: '#not-so-right',     title: 'The Not-So-Right Way'    },
        { href: '#accuracy-score',   title: 'Accuracy & Model Score'  },
        { href: '#holdout-sets',     title: 'Holdout Sets'            }
      ]
    },

    // ── Cross-Validation ──────────────────────────────────
    {
      id: 'page7',
      href: 'Page07.html',
      title: '7. Cross-Validation & Splits',
      sections: [
        { href: '#two-fold',       title: 'Two-Fold Cross-Validation'     },
        { href: '#k-fold-loo',     title: 'K-Fold & Leave-One-Out'        },
        { href: '#train-val-test', title: 'Train / Test / Val Split'      },
        { href: '#workflow',       title: 'Model Training Workflow'       },
        { href: '#repeated-kfold', title: 'Repeated K-Fold'               }
      ]
    },

    // ── Bias-Variance Trade-off ───────────────────────────
    {
      id: 'page8',
      href: 'Page08.html',
      title: '8. Bias-Variance Trade-off',
      sections: [
        { href: '#hyperparameter-vs-parameter', title: 'Hyperparameter vs. Parameter' },
        { href: '#high-bias',                   title: 'High-Bias (Underfitting)'     },
        { href: '#high-variance',               title: 'High-Variance (Overfitting)'  },
        { href: '#dartscheibe',                 title: 'Dartscheiben-Metapher'         },
        { href: '#validierungskurven-schema',   title: 'Validierungskurven Schema'    }
      ]
    },

    // ── Polynomiale Regression & Learning Curves ──────────
    {
      id: 'page9',
      href: 'Page09.html',
      title: '9. Validierungskurven & Learning Curves',
      sections: [
        { href: '#polynomiale-regression',  title: 'Polynomiale Regression'       },
        { href: '#validation-curve',        title: 'Validierungskurven in sklearn' },
        { href: '#learning-curves-konzept', title: 'Learning Curves – Konzept'    },
        { href: '#learning-curves-schema',  title: 'Learning Curves – Schema'     },
        { href: '#learning-curves-sklearn', title: 'Learning Curves in sklearn'   }
      ]
    },

    // ── Grid Search ───────────────────────────────────────
    {
      id: 'page10',
      href: 'Page10.html',
      title: '10. Grid Search & Hyperparameter-Tuning',
      sections: [
        { href: '#grid-search-konzept',   title: 'Grundkonzept Grid Search'  },
        { href: '#gridsearchcv',          title: 'GridSearchCV'              },
        { href: '#grid-search-anwendung', title: 'Anwendung & Ergebnisse'    },
        { href: '#abschluss',             title: 'Abschluss & Ausblick'      }
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
      sections: [
        { href: '#cs-kategorien',   title: 'ML Kategorien'             },
        { href: '#cs-sklearn-api',  title: 'sklearn API'               },
        { href: '#cs-validation',   title: 'Validation & Cross-Val'    },
        { href: '#cs-bias-variance',title: 'Bias-Variance Trade-off'   },
        { href: '#cs-gridsearch',   title: 'Grid Search'               },
        { href: '#cs-fallen',       title: 'Typische Fallen'           },
        { href: '#cs-merksaetze',   title: 'Merksätze'                 },
        { href: '#cs-fragen',       title: 'Prüfungsfragen'            }
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