import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { SidebarNav } from './sidebar-nav.js';
import './sidebar-nav.js';
import './dark-mode-toggle.js';
import './copy-toast.js';

const LOGO_SRC = '/topbar-icon.png';

@customElement('app-shell')
export class AppShell extends LitElement {
  createRenderRoot() { return this; }

  @state() private _currentPage = 'getting-started';

  connectedCallback() {
    super.connectedCallback();
    // Auto-collapse sidebar on mobile
    if (window.innerWidth <= 700) document.body.classList.add('sidebar-collapsed');
    window.addEventListener('resize', this._handleResize);

    // Close sidebar on backdrop click (phone)
    document.addEventListener('click', this._handleBackdropClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._handleResize);
    document.removeEventListener('click', this._handleBackdropClick);
  }

  private _handleResize = () => {
    if (window.innerWidth <= 700) {
      document.body.classList.add('sidebar-collapsed');
    }
  };

  private _handleBackdropClick = (e: Event) => {
    if (window.matchMedia('(max-width: 500px)').matches && !document.body.classList.contains('sidebar-collapsed')) {
      const sidebar = this.querySelector('.sidebar');
      const openBtn = this.querySelector('#sidebarOpen');
      if (sidebar && !sidebar.contains(e.target as Node) && openBtn && !openBtn.contains(e.target as Node)) {
        document.body.classList.add('sidebar-collapsed');
      }
    }
  };

  private _onNavigate(e: CustomEvent) {
    this._currentPage = e.detail;
    this.dispatchEvent(new CustomEvent('page-change', { detail: e.detail, bubbles: true }));
  }

  private _openSidebar() {
    document.body.classList.remove('sidebar-collapsed');
  }

  render() {
    return html`
      <a href="#page" class="skip-link">Skip to content</a>

      <div class="layout">
        <header class="topbar" role="banner" aria-label="June DS">
          <div class="topbar__left">
            <button class="topbar__open" id="sidebarOpen" aria-label="Open sidebar" @click=${this._openSidebar}>
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="14" height="14" rx="2"/>
                <line x1="7" y1="2" x2="7" y2="16"/>
              </svg>
            </button>
            <img class="topbar__ico" src=${LOGO_SRC} alt="June DS" />
            <span class="topbar__logo">June DS</span>
          </div>
          <div class="topbar__right">
            <brand-switcher></brand-switcher>
            <dark-mode-toggle></dark-mode-toggle>
          </div>
        </header>

        <div class="body-area">
          <sidebar-nav @navigate=${this._onNavigate}></sidebar-nav>

          <main class="app-content" role="main">
            <div class="content">
              <div class="content__inner" id="page" data-page-id=${this._currentPage}>
                <slot></slot>
              </div>
            </div>
          </main>
        </div>
      </div>

      <button class="scroll-top" id="scrollTop" aria-label="Back to top" @click=${this._scrollTop}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>

      <copy-toast></copy-toast>
    `;
  }

  firstUpdated() {
    const content = this.querySelector('.content');
    const scrollBtn = this.querySelector('#scrollTop');
    if (content && scrollBtn) {
      content.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('visible', (content as HTMLElement).scrollTop > 300);
      });
    }
  }

  private _scrollTop() {
    const content = this.querySelector('.content');
    if (content) content.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get currentPage() { return this._currentPage; }
  set currentPage(page: string) {
    this._currentPage = page;
    const sidebar = this.querySelector('sidebar-nav') as SidebarNav | null;
    if (sidebar) sidebar.setActive(page);
    const inner = this.querySelector('.content__inner');
    if (inner) inner.setAttribute('data-page-id', page);
  }
}
