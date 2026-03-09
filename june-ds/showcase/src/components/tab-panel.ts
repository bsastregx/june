import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('tab-panel')
export class TabPanel extends LitElement {
  createRenderRoot() { return this; }

  @property({ type: Array }) tabs: string[] = [];
  @property({ type: String }) label = 'Sections';
  @state() private _active = 0;

  connectedCallback() {
    super.connectedCallback();
    this._restoreActiveTab();
  }

  private _restoreActiveTab() {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const pageId = document.querySelector('#page')?.getAttribute('data-page-id');
    if (!pageId) return;

    // Hash format: pageId-tabName (e.g., "button-specs")
    if (hash.startsWith(pageId + '-')) {
      const tabName = hash.slice(pageId.length + 1);
      const tabIndex = this.tabs.findIndex(t =>
        t.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') === tabName
      );
      if (tabIndex >= 0) {
        this._active = tabIndex;
      }
    }
  }

  private _select(idx: number) {
    this._active = idx;
    this.dispatchEvent(new CustomEvent('tab-change', { detail: idx, bubbles: true }));

    // Update URL hash to persist tab state
    const pageId = document.querySelector('#page')?.getAttribute('data-page-id');
    if (pageId && this.tabs[idx]) {
      const tabSlug = this.tabs[idx].toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
      window.history.replaceState(null, '', `#${pageId}-${tabSlug}`);
    }
  }

  private _onKeydown(e: KeyboardEvent, idx: number) {
    let next = -1;
    if (e.key === 'ArrowRight') next = (idx + 1) % this.tabs.length;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + this.tabs.length) % this.tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = this.tabs.length - 1;
    if (next >= 0) {
      e.preventDefault();
      this._select(next);
      const btns = this.querySelectorAll<HTMLButtonElement>('.tabs button');
      btns[next]?.focus();
    }
  }

  render() {
    return html`
      <div class="tabs" role="tablist" aria-label=${this.label}>
        ${this.tabs.map((t, i) => html`
          <button
            class=${i === this._active ? 'on' : ''}
            role="tab"
            aria-selected=${i === this._active}
            tabindex=${i === this._active ? 0 : -1}
            id="tab-${i}"
            aria-controls="panel-${i}"
            @click=${() => this._select(i)}
            @keydown=${(e: KeyboardEvent) => this._onKeydown(e, i)}
          >${t}</button>
        `)}
      </div>
      ${this.tabs.map((_, i) => html`
        <div
          class="pane ${i === this._active ? 'on' : ''}"
          role="tabpanel"
          id="panel-${i}"
          aria-labelledby="tab-${i}"
        >
          <slot name="panel-${i}"></slot>
        </div>
      `)}
    `;
  }
}
