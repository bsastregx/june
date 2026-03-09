import { LitElement, html, svg, type SVGTemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

interface SidebarSection {
  id: string;
  label: string;
  icon: SVGTemplateResult;
  items: { page: string; label: string; badge?: string }[];
}

const SECTIONS: SidebarSection[] = [
  {
    id: 'start',
    label: 'Get started',
    icon: svg`<svg class="sidebar__section-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8h12M8 2l6 6-6 6"/></svg>`,
    items: [
      { page: 'getting-started', label: 'Introduction' },
      { page: 'tokens-export', label: 'Tokens export' },
    ],
  },
  {
    id: 'foundations',
    label: 'Foundations',
    icon: svg`<svg class="sidebar__section-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 8s2.8-4.5 6.5-4.5S14.5 8 14.5 8s-2.8 4.5-6.5 4.5S1.5 8 1.5 8z"/><circle cx="8" cy="8" r="2"/></svg>`,
    items: [
      { page: 'typography', label: 'Typography' },
      { page: 'spacing', label: 'Spacing' },
      { page: 'colors', label: 'Colors' },
      { page: 'shadows', label: 'Shadows' },
      { page: 'breakpoints', label: 'Breakpoints' },
      { page: 'illustrations', label: 'Illustrations' },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    icon: svg`<svg class="sidebar__section-ico" viewBox="-0.5 -0.5 17 17" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>`,
    items: [
      { page: 'button', label: 'Button' },
      { page: 'eyebrow', label: 'Eyebrow' },
      { page: 'field', label: 'Field' },
    ],
  },
  {
    id: 'stencils',
    label: 'Stencils',
    icon: svg`<svg class="sidebar__section-ico" viewBox="-0.5 -0.5 17 17" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="1" width="14" height="6" rx="1"/><rect x="1" y="9" width="14" height="6" rx="1"/></svg>`,
    items: [
      { page: 'look-at-me', label: 'Look at Me' },
      { page: 'show-and-tell', label: 'Show and Tell' },
      { page: 'island', label: 'Island' },
      { page: 'blocks', label: 'Blocks' },
      { page: 'smiley-contact-box', label: 'Smiley Contact Box' },
      { page: 'learn-more', label: 'Learn More' },
      { page: 'card-row', label: 'Card Row' },
      { page: 'deep-dive', label: 'Deep Dive', badge: 'new' },
    ],
  },
];

// Reverse lookup: page id → section label (used by renderPage for breadcrumb)
export const pageToSection: Record<string, string> = {};
SECTIONS.forEach(s => s.items.forEach(item => { pageToSection[item.page] = s.label; }));

@customElement('sidebar-nav')
export class SidebarNav extends LitElement {
  createRenderRoot() { return this; }

  @state() private _activePage = 'getting-started';
  @state() private _collapsed = new Set<string>();

  setActive(page: string) {
    this._activePage = page;
    this.requestUpdate();
  }

  private _toggleSection(id: string) {
    if (document.body.classList.contains('sidebar-collapsed')) {
      document.body.classList.remove('sidebar-collapsed');
      return;
    }
    if (this._collapsed.has(id)) {
      this._collapsed.delete(id);
    } else {
      this._collapsed.add(id);
    }
    this.requestUpdate();
  }

  private _navigate(page: string) {
    this._activePage = page;
    this.dispatchEvent(new CustomEvent('navigate', { detail: page, bubbles: true, composed: true }));
    if (window.matchMedia('(max-width: 700px)').matches) {
      document.body.classList.add('sidebar-collapsed');
    }
  }

  render() {
    return html`
      <aside class="sidebar" role="navigation" aria-label="Design system navigation">
        <div class="sidebar__top">
          <button class="sidebar__collapse" id="sidebarCollapse"
            aria-label="Collapse sidebar" aria-expanded="true"
            @click=${this._onCollapse}>
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="14" height="14" rx="2"/>
              <line x1="7" y1="2" x2="7" y2="16"/>
            </svg>
            <span class="sidebar__tooltip">Expand</span>
          </button>
        </div>

        <nav class="sidebar__nav" id="sidebarNav" @keydown=${this._onNavKeydown}>
          ${SECTIONS.map(s => this._renderSection(s))}
        </nav>

        <div class="sidebar__footer">
          June DS v0.1
        </div>
      </aside>
    `;
  }

  private _renderSection(s: SidebarSection) {
    const collapsed = this._collapsed.has(s.id);
    return html`
      <div class="sidebar__section ${collapsed ? 'collapsed' : ''}" data-section=${s.id}>
        <button class="sidebar__section-label"
          aria-expanded=${!collapsed}
          @click=${() => this._toggleSection(s.id)}>
          <span>${s.icon}</span>
          <span class="sidebar__section-name">${s.label}</span>
          <span class="sidebar__tooltip">${s.label}</span>
        </button>
        <div class="sidebar__items">
          ${s.items.map(item => html`
            <button class="sidebar__item ${item.page === this._activePage ? 'active' : ''}"
              data-page=${item.page}
              aria-current=${item.page === this._activePage ? 'page' : 'false'}
              @click=${() => this._navigate(item.page)}>
              ${item.label}
              ${item.badge ? html`<span class="sidebar__badge sidebar__badge--${item.badge}">${item.badge}</span>` : ''}
            </button>
          `)}
        </div>
      </div>
    `;
  }

  private _onCollapse() {
    const collapsed = document.body.classList.toggle('sidebar-collapsed');
    const btn = this.querySelector('#sidebarCollapse');
    if (btn) {
      btn.setAttribute('aria-expanded', String(!collapsed));
      btn.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
    }
  }

  private _onNavKeydown(e: KeyboardEvent) {
    const items = [...this.querySelectorAll<HTMLButtonElement>('.sidebar__item')];
    const idx = items.indexOf(document.activeElement as HTMLButtonElement);
    if (idx === -1) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length].focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length].focus(); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); items[idx].click(); }
  }
}
