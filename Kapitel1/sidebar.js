// ─────────────────────────────────────────────────────────
//  Kapitel1/Sidebar.js  –  Nur Daten, Logik kommt aus Core
// ─────────────────────────────────────────────────────────
import { registerSidebar } from '../assets/script.js';

const chapter = {
  title: 'Kapitel 1 · Data Preparation',
  pages: [

    // ── Fundament ─────────────────────────────────────────
    {
      id: 'page1',
      href: 'Page01.html',
      title: '1. Einführung',
      sections: [
        { href: '#wochenplan',  title: 'Wo sind wir?'           },
        { href: '#agenda',      title: 'Die 4 Agenda-Punkte'    },
        { href: '#warum',       title: 'Warum Feature Eng.?'    },
        { href: '#setup',       title: 'Standard-Setup'         },
        { href: '#alle-seiten', title: 'Alle Seiten'            }
      ]
    },

    {
      id: 'page2',
      href: 'Page02.html',
      title: '2. Von Daten zu Features',
      sections: [
        { href: '#definition',     title: 'Was ist ein Feature?'    },
        { href: '#eigenschaften',  title: 'Drei Eigenschaften'      },
        { href: '#feature-matrix', title: 'Feature-Matrix N×K'      },
        { href: '#pipeline',       title: 'Pipeline: Daten → Modell'},
        { href: '#feedback-loop',  title: 'Iterativer Feedback-Loop'},
        { href: '#balance',        title: 'Zu wenig vs. zu viele'   }
      ]
    },

    {
      id: 'page3',
      href: 'Page03.html',
      title: '3. Feature-Raum & Visualisierung',
      sections: [
        { href: '#geometrie',   title: 'Geometrische Interpretation' },
        { href: '#3d-beispiel', title: '3D-Beispiel (6, 3.5, 1)'     },
        { href: '#tsne',        title: 't-SNE Erklärung'             },
        { href: '#digits',      title: 'Beispiel: Embedding Digits'  },
        { href: '#links',       title: 'TF Projector & Distill'      }
      ]
    },

    // ── Feature Extraction ────────────────────────────────
    {
      id: 'page4',
      href: 'Page04.html',
      title: '4. Extraction: Zeitserien',
      sections: [
        { href: '#spektrum',        title: 'Domänen- vs. Datengetrieben' },
        { href: '#szenario',        title: 'Zeitserien-Szenario'         },
        { href: '#event-triggered', title: 'Event vs. Kontinuierlich'    },
        { href: '#mathematik',      title: 'Mathematische Formulierung'  },
        { href: '#exkurs',          title: 'Exkurs: Feature-Based TS'    },
        { href: '#compengine',      title: 'CompEngine & BirdNET'        }
      ]
    },

    {
      id: 'page5',
      href: 'Page05.html',
      title: '5. Encoding & Text',
      sections: [
        { href: '#problem-kategoriale', title: 'Kategoriale Variablen'       },
        { href: '#label-encoding',      title: 'Label-Encoding'              },
        { href: '#one-hot-encoding',    title: 'One-Hot-Encoding'            },
        { href: '#sklearn-syntax',      title: 'sklearn .fit() .transform()' },
        { href: '#bag-of-words',        title: 'Bag-of-Words'                }
      ]
    },

    {
      id: 'page6',
      href: 'Page06.html',
      title: '6. Autoencoder & Haar',
      sections: [
        { href: '#autoencoder',     title: 'Autoencoder-Architektur' },
        { href: '#haar-features',   title: 'Haar-Features'           },
        { href: '#rechenbeispiele', title: 'Rechenbeispiele'         },
        { href: '#buchverweis',     title: '"The Art of FE"'          }
      ]
    },

    // ── Selection & Scaling ───────────────────────────────
    {
      id: 'page7',
      href: 'Page07.html',
      title: '7. Feature Selection',
      sections: [
        { href: '#warum-selection',      title: 'Warum überhaupt?'        },
        { href: '#curse-dimensionality', title: 'Curse of Dimensionality' },
        { href: '#occam',                title: "Occam's Razor"            },
        { href: '#einfache-methoden',    title: 'VarianceThreshold'        },
        { href: '#korrelation',          title: 'Korrelations-basiert'     },
        { href: '#selectkbest',          title: 'SelectKBest'              }
      ]
    },

    {
      id: 'page8',
      href: 'Page08.html',
      title: '8. Feature Scaling',
      sections: [
        { href: '#warum-scaling',         title: 'Warum skalieren?'          },
        { href: '#minmax',                title: 'MinMax-Transformation'     },
        { href: '#standardisierung',      title: 'Standardisierung Z-Score'  },
        { href: '#power-transformations', title: 'Power Transformations'     },
        { href: '#vergleich',             title: 'Vergleich: Wann was?'      }
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
        { href: '#cs-konzepte',     title: 'Kernkonzepte & Pipeline' },
        { href: '#cs-formeln',      title: 'Alle Formeln'            },
        { href: '#cs-encoding',     title: 'Encoding Code'           },
        { href: '#cs-api',          title: 'sklearn API & Leakage'   },
        { href: '#cs-selection',    title: 'Feature Selection Code'  },
        { href: '#cs-scoring',      title: 'Scoring-Funktionen'      },
        { href: '#cs-scaling',      title: 'Feature Scaling Code'    },
        { href: '#cs-entscheidung', title: 'Wann was?'               },
        { href: '#cs-fallen',       title: 'Typische Fallen'         },
        { href: '#cs-merksaetze',   title: 'Merksätze'               },
        { href: '#cs-fragen',       title: 'Prüfungsfragen'          }
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