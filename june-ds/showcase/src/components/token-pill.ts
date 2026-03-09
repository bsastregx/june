import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { copyToClipboard, showToast } from '../utils/clipboard.js';

@customElement('token-pill')
export class TokenPill extends LitElement {
  createRenderRoot() { return this; }

  @property() value = '';
  @property({ type: Boolean, attribute: 'static' }) isStatic = false;

  private _copy() {
    if (this.isStatic) return;
    copyToClipboard(this.value);
    showToast(`Copied ${this.value}`);
  }

  render() {
    return html`
      <span
        class="tok ${this.isStatic ? 'tok--static' : ''}"
        tabindex=${this.isStatic ? -1 : 0}
        role=${this.isStatic ? 'text' : 'button'}
        @click=${this._copy}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._copy(); }
        }}
      >${this.value}</span>
    `;
  }
}
