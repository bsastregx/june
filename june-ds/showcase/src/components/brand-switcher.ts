import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

type Brand = 'gx' | 'nx' | 'ge';

const BRANDS: { id: Brand; label: string; color: string }[] = [
  { id: 'gx', label: 'GeneXus', color: 'var(--gx)' },
  { id: 'nx', label: 'Next', color: 'var(--nx)' },
  { id: 'ge', label: 'GEAI', color: 'var(--ge)' },
];

@customElement('brand-switcher')
export class BrandSwitcher extends LitElement {
  createRenderRoot() { return this; }

  @state() private _brand: Brand = 'gx';
  @state() private _open = false;
  @state() private _visible = true;

  private _select(b: Brand) {
    this._brand = b;
    this._open = false;
    this.dispatchEvent(new CustomEvent('brand-change', { detail: b, bubbles: true, composed: true }));
    this.querySelector<HTMLButtonElement>('.brand-chip__trigger')?.focus();
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocClick);
    document.addEventListener('brand-aware-change', this._onBrandAwareChange as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocClick);
    document.removeEventListener('brand-aware-change', this._onBrandAwareChange as EventListener);
  }

  private _onBrandAwareChange = (e: CustomEvent<boolean>) => {
    this._visible = e.detail;
    if (!this._visible) this._open = false;
  };

  private _onDocClick = (e: Event) => {
    if (!this.contains(e.target as Node)) {
      this._open = false;
    }
  };

  private _focusSelected() {
    if (!this._open) return;
    this.updateComplete.then(() => {
      const sel = this.querySelector<HTMLButtonElement>('.brand-chip__opt.on');
      sel?.focus();
    });
  }

  private _onTriggerKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      this._open = true;
      this.updateComplete.then(() => {
        const opts = [...this.querySelectorAll<HTMLButtonElement>('.brand-chip__opt')];
        const cur = opts.findIndex(o => o.classList.contains('on'));
        const idx = e.key === 'ArrowDown'
          ? Math.min(cur + 1, opts.length - 1)
          : Math.max(cur - 1, 0);
        opts[idx]?.focus();
      });
    }
  }

  private _onMenuKeydown(e: KeyboardEvent) {
    const opts = [...this.querySelectorAll<HTMLButtonElement>('.brand-chip__opt')];
    const idx = opts.indexOf(document.activeElement as HTMLButtonElement);
    if (idx === -1) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); opts[Math.min(idx + 1, opts.length - 1)]?.focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); opts[Math.max(idx - 1, 0)]?.focus(); }
    else if (e.key === 'Home') { e.preventDefault(); opts[0]?.focus(); }
    else if (e.key === 'End') { e.preventDefault(); opts[opts.length - 1]?.focus(); }
    else if (e.key === 'Escape') { e.preventDefault(); this._open = false; this.querySelector<HTMLButtonElement>('.brand-chip__trigger')?.focus(); }
  }

  render() {
    if (!this._visible) return html``;
    const current = BRANDS.find(b => b.id === this._brand)!;
    return html`
      <div class="brand-chip" data-open="${this._open}">
        <button class="brand-chip__trigger"
          @click=${() => { this._open = !this._open; this._focusSelected(); }}
          @keydown=${this._onTriggerKeydown}
          aria-haspopup="listbox" aria-expanded=${this._open}>
          <span class="dot" style="background:${current.color}"></span>
          ${current.label}
          <svg class="brand-chip__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="brand-chip__menu" role="listbox" @keydown=${this._onMenuKeydown}>
          ${BRANDS.map(b => html`
            <button class="brand-chip__opt ${b.id === this._brand ? 'on' : ''}"
              role="option" aria-selected=${b.id === this._brand}
              tabindex=${b.id === this._brand ? 0 : -1}
              @click=${() => this._select(b.id)}>
              <span class="dot" style="background:${b.color}"></span>
              ${b.label}
            </button>
          `)}
        </div>
      </div>
    `;
  }
}
