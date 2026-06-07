import { registerSidebar } from '../assets/script.js';

const chapter = {
  title: 'Kapitel 4 · Clustering',
  pages: [
    {
      id: 'page1',
      href: 'Page01.html',
      title: '1. Clustering Übersicht',
      sections: [
        { href: '#clustering-definition', title: 'Definition' },
        { href: '#clustering-arten', title: 'Arten des Clusterings' },
        { href: '#kmeans-zusammenfassung', title: 'K-means Zusammenfassung' },
        { href: '#kmeans-pros-cons', title: 'Vor- & Nachteile K-means' },
        { href: '#validierung-intro', title: 'Validierung' },
        { href: '#scaling-intro', title: 'Scaling' },
        { href: '#density-based-intro', title: 'Density-based Clustering' },
        { href: '#density-pros-cons', title: 'Vor- & Nachteile DBSCAN' }
      ]
    },
    {
      id: 'page2',
      href: 'Page02.html',
      title: '2. K-means',
      sections: [
        { href: '#funktionsweise', title: 'Funktionsweise' },
        { href: '#heuristik', title: 'Heuristik' },
        { href: '#kmeans-sklearn', title: 'K-means in Sklearn' },
        { href: '#problem-beispiel', title: 'Problem Beispiel' },
        { href: '#kmeans-loesung', title: 'K-means Lösung' }
      ]
    },
    {
      id: 'page3',
      href: 'Page03.html',
      title: '3. EM-Algorithmus in K-means',
      sections: [
        { href: '#em-was', title: 'Was ist EM-Algorithmus?' },
        { href: '#em-schritte', title: 'Analoge Schritte bei K-means' },
        { href: '#em-so-what', title: 'Expectation & Maximization' },
        { href: '#em-input-output', title: 'Input & Output' },
        { href: '#em-mathematik', title: 'Mathematische Ausführung' },
        { href: '#em-from-scratch', title: 'From Scratch Implementierung' },
        { href: '#em-nachteile', title: 'Nachteile des EM-Algorithmus' }
      ]
    },
    {
      id: 'page4',
      href: 'Page04.html',
      title: '4. Validierung von Clustering',
      sections: [
        { href: '#validierung-definition', title: 'Definition' },
        { href: '#validierung-arten', title: 'Arten der Validierung' },
        { href: '#dunn-index', title: 'Dunn-Index' },
        { href: '#davies-bouldin', title: 'Davies-Bouldin Index' },
        { href: '#silhouette-score', title: 'Silhouette Score' },
        { href: '#silhouette-plot', title: 'Silhouette-Plot lesen' },
        { href: '#sse-elbow', title: 'SSE & Elbow Plot' }
      ]
    },
    {
      id: 'page5',
      href: 'Page05.html',
      title: '5. K-means Variationen',
      sections: [
        { href: '#nichtlineare-probleme', title: 'Nichtlineare Probleme' },
        { href: '#spectral-clustering', title: 'Spectral Clustering' },
        { href: '#kmeans-plus', title: 'K-means++' },
        { href: '#k-median', title: 'K-Median' }
      ]
    },
    {
      id: 'page6',
      href: 'Page06.html',
      title: '6. Skalierung & DBSCAN',
      sections: [
        { href: '#skalierung', title: 'Skalierung' },
        { href: '#dbscan-definition', title: 'DBSCAN Definition' },
        { href: '#dbscan-algorithmus', title: 'DBSCAN Algorithmus' },
        { href: '#dbscan-sklearn', title: 'DBSCAN in Sklearn' },
        { href: '#dbscan-hyperparameter', title: 'Hyperparameter Tuning' }
      ]
    },
    {
      id: 'page7',
      href: 'Page07.html',
      title: '7. Vergleich Clustering-Verfahren',
      sections: [
        { href: '#datensaetze', title: 'Datensätze & Charakteristiken' },
        { href: '#algorithmen-vergleich', title: 'Algorithmen Vergleich' },
        { href: '#vergleich-code', title: 'Code Implementierung' }
      ]
    },
    {
      id: 'page8',
      href: 'Page08.html',
      title: '8. Anwendungsbeispiele',
      sections: [
        { href: '#beispiele-overview', title: 'Übersicht Fallstudien' },
        { href: '#konzepte', title: 'Konzept-Querverweise' },
        { href: '#vergleich', title: 'Gegenüberstellung' }
      ]
    },
    {
      id: 'page8_1',
      href: 'Page08_1.html',
      title: '8.1 Maschinenzustände',
      sections: [
        { href: '#weihenstephaner', title: 'Weihenstephaner Standard' },
        { href: '#data-generate', title: 'Daten generieren' },
        { href: '#data-load', title: 'Daten laden & visualisieren' },
        { href: '#scaling-decision', title: 'Scaling Entscheidung' },
        { href: '#sweep-k', title: 'Sweep k' },
        { href: '#elbow-plot', title: 'Elbow Plot' },
        { href: '#silhouette-analyse', title: 'Silhouette Analyse' }
      ]
    },
    {
      id: 'page8_2',
      href: 'Page08_2.html',
      title: '8.2 DBSCAN + kNN',
      sections: [
        { href: '#problem', title: 'Das Problem' },
        { href: '#knn-erklaert', title: 'kNN On-the-fly' },
        { href: '#pipeline', title: 'Vollständige Pipeline' },
        { href: '#uebung', title: 'Übungsaufgabe' }
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
        { href: '#formeln', title: 'Alle Formeln' },
        { href: '#sklearn-api', title: 'sklearn API' },
        { href: '#entscheidungen', title: 'Entscheidungsregeln' },
        { href: '#fallen', title: 'Typische Fallen' },
        { href: '#merksaetze', title: 'Merksätze' }
      ]
    },
    {
      id: 'quiz',
      href: 'PageQuiz.html',
      title: '🧠 Quiz',
      sections: [
        { href: '#konzept-fragen', title: 'Konzeptfragen (1–6)' },
        { href: '#formel-fragen', title: 'Formelfragen (7–9)' },
        { href: '#code-fragen', title: 'Code-Fragen (10–13)' },
        { href: '#fallen-fragen', title: '🪤 Fallen (14–18)' }
      ]
    }
  ]
};

registerSidebar(chapter);