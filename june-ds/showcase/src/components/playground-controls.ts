import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('playground-controls')
export class PlaygroundControls extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
      <div class="pg-controls">
        <slot></slot>
      </div>
    `;
  }
}
