import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('copy-toast')
export class CopyToast extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`<div class="copy-toast" id="copy-toast" role="status" aria-live="polite"></div>`;
  }
}
