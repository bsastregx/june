import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { hlHTML } from '../utils/syntax-highlight.js';
import { copyToClipboard, showToast } from '../utils/clipboard.js';

@customElement('code-snippet')
export class CodeSnippet extends LitElement {
  createRenderRoot() { return this; }

  @property() code = '';
  @property() label = 'HTML';

  private _copy() {
    copyToClipboard(this.code);
    showToast('Copied!');
  }

  render() {
    return html`
      <div class="code-snippet">
        <div class="code-snippet__head">
          <span class="code-snippet__label">${this.label}</span>
          <button class="code-snippet__copy" @click=${this._copy} aria-label="Copy code">Copy</button>
        </div>
        <pre class="code-snippet__pre">${unsafeHTML(hlHTML(this.code))}</pre>
      </div>
    `;
  }
}
