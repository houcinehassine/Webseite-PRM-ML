// Python/sidebar.js – Auto-generiert vom Build-Skript
import { registerSidebar } from '../assets/script.js';

const chapter = {
  title: 'Python · Referenz',
  pages: [
    { id: 'Python', href: 'Python.html', title: '🐍 Übersicht', sections: [] },
    { id: 'Page01', href: 'Page01.html', title: '1 · NumPy', sections: [{ href: '#erzeugen', title: 'Arrays erzeugen' }, { href: '#indexing', title: 'Slicing & Masken' }, { href: '#aggregation', title: 'Aggregationen' }, { href: '#kombinieren', title: 'Kombinieren & Grids' }] },
    { id: 'Page02', href: 'Page02.html', title: '2 · Matplotlib', sections: [{ href: '#figur', title: 'Figur & Achsen' }, { href: '#plottypen', title: 'Plot-Typen' }, { href: '#deko', title: 'Beschriftung' }, { href: '#muster', title: 'Plot-Rezepte' }] },
    { id: 'Page03', href: 'Page03.html', title: '3 · Datensätze & Visualisierung', sections: [{ href: '#synthetisch', title: 'Synthetische Daten' }, { href: '#echt', title: 'Echte Datensätze' }, { href: '#pandas', title: 'pandas' }, { href: '#seaborn', title: 'seaborn' }] },
    { id: 'Page04', href: 'Page04.html', title: '4 · Preprocessing & Pipelines', sections: [{ href: '#skalierung', title: 'Skalierung' }, { href: '#encoding', title: 'Encoding' }, { href: '#auswahl', title: 'Feature-Auswahl' }, { href: '#dimred', title: 'Dimensionsreduktion' }, { href: '#pipeline', title: 'Pipelines' }] },
    { id: 'Page05', href: 'Page05.html', title: '5 · Modelle: Supervised', sections: [{ href: '#svm', title: 'SVM' }, { href: '#tree', title: 'Entscheidungsbäume' }, { href: '#ensemble', title: 'Ensembles' }, { href: '#weitere', title: 'Weitere Modelle' }, { href: '#api', title: 'Die fit/predict-API' }] },
    { id: 'Page06', href: 'Page06.html', title: '6 · Modelle: Unsupervised', sections: [{ href: '#kmeans', title: 'KMeans & DBSCAN' }, { href: '#gmm', title: 'Gaussian Mixture' }, { href: '#distanzen', title: 'Distanzen & Statistik' }] },
    { id: 'Page07', href: 'Page07.html', title: '7 · Modellauswahl & Validierung', sections: [{ href: '#split', title: 'Splits & CV' }, { href: '#suche', title: 'Hyperparameter-Suche' }, { href: '#kurven', title: 'Validierungskurven' }] },
    { id: 'Page08', href: 'Page08.html', title: '8 · Metriken & Evaluation', sections: [{ href: '#klassifikation', title: 'Klassifikation' }, { href: '#roc', title: 'ROC & Regression' }, { href: '#clustering', title: 'Clustering-Metriken' }, { href: '#importance', title: 'Feature-Importance' }] },
  ]
};

registerSidebar(chapter);
