import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('dark-mode-toggle')
export class DarkModeToggle extends LitElement {
  createRenderRoot() { return this; }

  @state() private _dark = false;
  private _prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  private _onSchemeChange = (e: MediaQueryListEvent) => {
    if (localStorage.getItem('june-dm') === null) {
      this._dark = e.matches;
      this._apply();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    const saved = localStorage.getItem('june-dm');

    if (saved !== null) {
      this._dark = saved === '1';
    } else {
      this._dark = this._prefersDark.matches;
    }
    this._apply();

    this._prefersDark.addEventListener('change', this._onSchemeChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._prefersDark.removeEventListener('change', this._onSchemeChange);
  }

  private _apply() {
    document.body.classList.toggle('dm', this._dark);
  }

  private _toggle() {
    this._dark = !this._dark;
    this._apply();
    localStorage.setItem('june-dm', this._dark ? '1' : '0');
  }

  render() {
    return html`
      <label class="dm-toggle" for="dm-check">
        <input
          type="checkbox"
          id="dm-check"
          role="switch"
          .checked=${this._dark}
          aria-checked=${this._dark ? 'true' : 'false'}
          aria-label="Modo oscuro"
          @change=${this._toggle}
        >
        <span class="dm-toggle__track" aria-hidden="true"></span>
        <span class="dm-toggle__label">Dark</span>
      </label>
    `;
  }
}
