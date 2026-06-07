class SiteFooter extends HTMLElement {
  connectedCallback() {
    const caption = this.getAttribute('caption') ?? 'PRM Prüfungsvorbereitung';
    this.innerHTML = `
      <footer class="footer">
        <div class="container">
          <small>${caption}</small>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
