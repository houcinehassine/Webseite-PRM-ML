class SiteFooter extends HTMLElement {
  connectedCallback() {
    const caption = this.getAttribute('caption') ?? 'PRM Prüfungsvorbereitung';
    this.innerHTML = `
      <footer class="footer">
        <div class="container footer-inner">
          <small class="footer-caption">${caption}</small>
          <small class="footer-attribution">
            Inhalt basiert auf der Vorlesungsgrundlage von
            <strong>Prof. Dr. rer. nat. Markus Goldhacker</strong> –
            Fach <em>Predictive Maintenance</em>,
            Studiengang Produktions- und Automatisierungstechnik · OTH
          </small>
        </div>
      </footer>
    `;

    /* ── Offline-Übersetzer initialisieren ─────────────────
       Wird einmalig pro Seite geladen (Guard verhindert
       Doppel-Initialisierung falls footer mehrfach vorkommt).
    ─────────────────────────────────────────────────────── */
    if (!document.getElementById('prm-translator')) {
      const translatorUrl = new URL('./assets/translator.js', import.meta.url).href;
      const s = document.createElement('script');
      s.type = 'module';
      s.textContent =
        `import { initTranslator } from '${translatorUrl}'; initTranslator();`;
      document.head.appendChild(s);
    }
  }
}

customElements.define('site-footer', SiteFooter);
