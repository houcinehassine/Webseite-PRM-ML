/* ============================================================
   PRM – Kapitel7 / Sidebar.js
   ============================================================ */
class SiteSidebar extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active') ?? '';

    this.innerHTML = `
      <nav class="sidebar" aria-label="Seitennavigation">
        <div class="toc">
          <p class="toc-title">Kapitel 7 · Evaluation</p>

          <!-- Hauptseiten -->
          <div class="toc-chapter open" id="ch-main">
            <button class="toc-chapter-toggle" aria-expanded="true">
              Theorie &amp; Code
              <span class="toc-arrow">›</span>
            </button>
            <ul class="toc-section">
              <li><a href="Einführung.html" class="${active === 'Einführung' ? 'active' : ''}">Einführung – Evaluation von Klassifikatoren</a></li>
              <li><a href="Page01.html" class="${active === 'page1' ? 'active' : ''}">1 · Confusion Matrix Grundlagen</a></li>
              <li><a href="Page02.html" class="${active === 'page2' ? 'active' : ''}">2 · ROC Curves Theorie</a></li>
              <li><a href="Page03.html" class="${active === 'page3' ? 'active' : ''}">3 · ROC Curves in sklearn</a></li>
              <li><a href="Page04.html" class="${active === 'page4' ? 'active' : ''}">4 · Decision Threshold</a></li>
              <li><a href="Page05.html" class="${active === 'page5' ? 'active' : ''}">5 · Confusion Matrix sklearn &amp; AUC</a></li>
              <li><a href="Page06.html" class="${active === 'page6' ? 'active' : ''}">6 · Precision-Recall &amp; F1</a></li>
              <li><a href="Page07.html" class="${active === 'page7' ? 'active' : ''}">7 · Multi-Class ROC</a></li>
            </ul>
          </div>

          <!-- Praxisbeispiel -->
          <div class="toc-chapter open" id="ch-beispiel">
            <button class="toc-chapter-toggle" aria-expanded="true">
              Praxisbeispiel
              <span class="toc-arrow">›</span>
            </button>
            <ul class="toc-section">
              <li><a href="PageBeispiel.html" class="${active === 'page-beispiel' ? 'active' : ''}">Kugellager-Klassifikation</a></li>
            </ul>
          </div>

          <!-- Prüfungsvorbereitung -->
          <div class="toc-divider">
            <span class="toc-divider-label">Prüfung</span>
          </div>
          <div class="toc-chapter open" id="ch-pruefung">
            <button class="toc-chapter-toggle" aria-expanded="true">
              Prüfungsvorbereitung
              <span class="toc-arrow">›</span>
            </button>
            <ul class="toc-section">
              <li><a href="PageCheatsheet.html" class="toc-page-pruefung ${active === 'page-cheatsheet' ? 'active' : ''}">📋 Cheatsheet</a></li>
              <li><a href="PageQuiz.html" class="toc-page-pruefung ${active === 'page-quiz' ? 'active' : ''}">🧠 Quiz</a></li>
            </ul>
          </div>

          <!-- Zurück -->
          <div style="margin-top: var(--space-4); padding-top: var(--space-4); border-top: 1px solid var(--color-border);">
            <a href="Kapitel7.html" style="display:block; padding:0.35rem 0.55rem; border-radius:0.5rem; color:var(--color-text-muted); font-size:0.8rem; text-decoration:none;">
              ← Kapitelübersicht
            </a>
            <a href="../index.html" style="display:block; padding:0.35rem 0.55rem; border-radius:0.5rem; color:var(--color-text-muted); font-size:0.8rem; text-decoration:none;">
              ⌂ Alle Kapitel
            </a>
          </div>
        </div>
      </nav>
    `;

    /* Toggle-Logik für alle Kapitel-Buttons */
    this.querySelectorAll('.toc-chapter-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const chapter = btn.closest('.toc-chapter');
        const isOpen = chapter.classList.contains('open');
        chapter.classList.toggle('open', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  }
}
customElements.define('site-sidebar', SiteSidebar);