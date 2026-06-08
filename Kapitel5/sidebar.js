// ─────────────────────────────────────────────────────────
//  Kapitel5/Sidebar.js  –  Nur Daten, Logik kommt aus Core
// ─────────────────────────────────────────────────────────
import { registerSidebar } from '../assets/script.js';


const chapter = {
  title: 'Kapitel 5 · Ensemble-Methoden',
  pages: [

    // ── Grundlagen ────────────────────────────────────────
    {
      id: 'page1',
      href: 'Page01.html',
      title: '1. Überblick & Einführung',
      sections: [
        { href: '#wo-befinden-wir-uns', title: 'Wo befinden wir uns?' },
        { href: '#themen-uebersicht',   title: 'Themen-Überblick'    },
        { href: '#rf-pros',             title: 'Vorteile RF'         },
        { href: '#rf-cons',             title: 'Nachteile RF'        }
      ]
    },
    {
      id: 'page2',
      href: 'Page02.html',
      title: '2. Entscheidungsbäume',
      sections: [
        { href: '#entscheidungsbaeume-grundlagen', title: 'Grundlagen'          },
        { href: '#splits-feature-raum',            title: 'Splits im Feature-Raum' },
        { href: '#gini-impurity',                  title: 'Gini Impurity'       },
        { href: '#overfitting-decision-trees',     title: 'Overfitting'         }
      ]
    },
    {
      id: 'page3',
      href: 'Page03.html',
      title: '3. Vom Baum zum Random Forest',
      sections: [
        { href: '#ensemble-idee',   title: 'Ensemble-Idee'       },
        { href: '#bagging',         title: 'Bagging & Bootstrap' },
        { href: '#oob-error',       title: 'Out-of-Bag Error'    },
        { href: '#feature-bagging', title: 'Feature Bagging'     }
      ]
    },
    {
      id: 'page4',
      href: 'Page04.html',
      title: '4. Praxis in sklearn',
      sections: [
        { href: '#random-forest-sklearn', title: 'RandomForestClassifier' },
        { href: '#predict-proba',         title: '.predict_proba()'       },
        { href: '#hyperparameter-sweep',  title: 'Hyperparameter Sweep'   },
        { href: '#random-search',         title: 'Random Search'          },
        { href: '#bayesian-optimization', title: 'Bayesian Optimization'  }
      ]
    },
    {
      id: 'page5',
      href: 'Page05.html',
      title: '5. Interpretation & Vertrauen',
      sections: [
        { href: '#feature-importance',     title: 'Feature Importance'     },
        { href: '#permutation-importance', title: 'Permutation Importance' },
        { href: '#permutation-sklearn',    title: 'Permutation in sklearn' },
        { href: '#white-box-eignungstest', title: 'White-Box Beispiel'     }
      ]
    },

    // ── Anwendungen ───────────────────────────────────────
    {
      id: 'page6',
      href: 'Page06.html',
      title: '6. RUL Prediction (NASA)',
      sections: [
        { href: '#wiederholung',     title: 'Wiederholung'        },
        { href: '#nasa-turbofan',    title: '6.1 NASA Turbofan'   },
        { href: '#daten-laden',      title: '6.2 Daten laden'     },
        { href: '#modell-trainieren', title: '6.3 Modell trainieren' },
        { href: '#baseline-models',  title: '6.4 Baseline Models' }
      ]
    },
    {
      id: 'page6_1',
      href: 'Page06_1.html',
      title: '6.1 Servo Fault Classification',
      sections: [
        { href: '#servo-problem',      title: 'Problemstellung'          },
        { href: '#servo-daten',        title: 'Datengenerierung'         },
        { href: '#servo-training',     title: 'Modell trainieren'        },
        { href: '#servo-unsicherheit', title: 'Unsicherheitsvisualisierung' }
      ]
    },
    {
      id: 'page6_2',
      href: 'Page06_2.html',
      title: '6.2 Random Forest Regression',
      sections: [
        { href: '#regression-konzept',    title: '6.2.1 Regression vs. Klassif.' },
        { href: '#datensatz',             title: '6.2.2 Datensatz'               },
        { href: '#decision-tree-regressor', title: '6.2.3 DecisionTreeRegressor' },
        { href: '#vorhersagekurve',       title: '6.2.4 Vorhersagekurve'         },
        { href: '#max-depth-einfluss',    title: '6.2.5 max_depth Einfluss'      },
        { href: '#rf-regressor',          title: '6.2.6 RandomForestRegressor'   }
      ]
    },

    // ── Boosting ──────────────────────────────────────────
    {
      id: 'page7',
      href: 'Page07.html',
      title: '7. Boosting als Gegenkonzept',
      sections: [
        { href: '#bagging-vs-boosting',     title: '7.1 Bagging vs. Boosting'    },
        { href: '#adaboost-algorithmus',    title: '7.2 AdaBoost Algorithmus'    },
        { href: '#adaboost-sklearn',        title: '7.3 AdaBoost in sklearn'     },
        { href: '#adaboost-visualisierung', title: '7.4 Schritt-für-Schritt'     },
        { href: '#rf-vs-adaboost',          title: '7.5 RF vs. AdaBoost'         }
      ]
    },

    // ── Prüfungsvorbereitung ──────────────────────────────
    {
      id: 'divider-pruefung',
      divider: true,
      label: 'Prüfungsvorbereitung'
    },
    {
      id: 'cheatsheet_rf',
      href: 'PageCheatsheet.html',
      title: '📋 Cheatsheet RF & Boosting',
      sections: [
        { href: '#formeln',          title: 'Alle Formeln'        },
        { href: '#api',              title: 'sklearn API'         },
        { href: '#wann-was',         title: 'Wann welches Modell?' },
        { href: '#hyperparameter',   title: 'Hyperparameter'      },
        { href: '#vergleich',        title: 'Bagging vs. Boosting' },
        { href: '#fallen',           title: 'Typische Fallen'     },
        { href: '#merksaetze',       title: 'Merksätze'           },
        { href: '#fragen',           title: 'Prüfungsfragen'      }
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