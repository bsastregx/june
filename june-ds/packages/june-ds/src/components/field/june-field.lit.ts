import { html, svg, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { KasstorElement } from '@genexus/kasstor-core';
import { Component } from '@genexus/kasstor-core/decorators/component.js';
import styles from './june-field.shadow.scss?inline';

export type FieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'textarea' | 'dropdown';
export type ForceState = '' | 'hover' | 'focus' | 'error' | 'disabled';

export interface FieldOption {
  value: string;
  label: string;
}

let fieldUid = 0;

const errorSVG = svg`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><line x1="8" y1="5" x2="8" y2="9"/><circle cx="8" cy="11.5" r="0.5" fill="currentColor" stroke="none"/></svg>`;

const chevronSVG = svg`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;

@Component({ tag: 'june-field', styles })
export class JuneField extends KasstorElement {
  @property({ type: String, reflect: true })
  type: FieldType = 'text';

  @property({ type: String })
  label = '';

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String })
  hint = '';

  @property({ type: String })
  error = '';

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: String })
  name = '';

  @property({ type: Array })
  options: FieldOption[] = [];

  @property({ type: Number })
  rows = 4;

  @property({ type: Boolean, attribute: 'show-required-text' })
  showRequiredText = false;

  @property({ type: String, attribute: 'force-state', reflect: true })
  forceState: ForceState = '';

  @property({ type: String, attribute: 'placeholder-select' })
  placeholderSelect = 'Select one';

  @property({ type: String, attribute: 'required-text' })
  requiredText = '(required)';

  @property({ type: String, attribute: 'error-text' })
  errorText = '';

  private _uid = ++fieldUid;
  private get _inputId() { return `jf-input-${this._uid}`; }
  private get _hintId() { return `jf-hint-${this._uid}`; }
  private get _errorId() { return `jf-error-${this._uid}`; }

  focusInput(): void {
    const el = this.shadowRoot?.querySelector<HTMLElement>('.jf__input, .jf__textarea, .jf__select');
    el?.focus();
  }

  private _onInput(e: Event) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('jf-input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _onChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('jf-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _onSelectKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const select = e.target as HTMLSelectElement;
      const dir = e.key === 'ArrowDown' ? 1 : -1;
      const next = select.selectedIndex + dir;
      if (next >= 0 && next < select.options.length) {
        select.selectedIndex = next;
        this.value = select.value;
        this.dispatchEvent(new CustomEvent('jf-change', {
          detail: { value: this.value },
          bubbles: true,
          composed: true,
        }));
      }
    }
  }

  private _describedBy(): string | typeof nothing {
    const ids: string[] = [];
    if (this.hint) ids.push(this._hintId);
    if (this.error) ids.push(this._errorId);
    return ids.length ? ids.join(' ') : nothing;
  }

  private _rootClasses(): string {
    const cls = ['jf'];
    if (this.error || this.forceState === 'error') cls.push('jf--error');
    if (this.forceState && this.forceState !== 'error') cls.push(`jf--${this.forceState}`);
    return cls.join(' ');
  }

  override render() {
    const ph = this.type === 'dropdown' && !this.placeholder ? this.placeholderSelect : this.placeholder;
    const isDisabled = this.disabled || this.forceState === 'disabled';

    return html`
      <div class=${this._rootClasses()}>
        <label class="jf__label" for=${this._inputId}>
          ${this.label}${this.showRequiredText && this.required
            ? html`<span class="jf__required">${this.requiredText}</span>`
            : nothing}
        </label>

        <div class="jf__wrap">
          ${this.type === 'textarea' ? this._renderTextarea(ph, isDisabled)
          : this.type === 'dropdown' ? this._renderSelect(ph, isDisabled)
          : this._renderInput(ph, isDisabled)}
        </div>

        ${this.hint ? html`<span class="jf__hint" id=${this._hintId}>${this.hint}</span>` : nothing}

        ${this.error || this.forceState === 'error'
          ? html`
            <div class="jf__error" id=${this._errorId} role="alert" aria-live="assertive">
              <span class="jf__error-icon">${errorSVG}</span>
              ${this.error || this.errorText}
            </div>`
          : nothing}
      </div>
    `;
  }

  private _renderInput(ph: string, isDisabled: boolean) {
    return html`
      <input
        class="jf__input"
        id=${this._inputId}
        type=${this.type}
        .value=${this.value}
        placeholder=${ph || nothing}
        ?disabled=${isDisabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        name=${this.name || nothing}
        aria-describedby=${this._describedBy()}
        aria-invalid=${this.error ? 'true' : nothing}
        aria-required=${this.required ? 'true' : nothing}
        @input=${this._onInput}
      />
    `;
  }

  private _renderTextarea(ph: string, isDisabled: boolean) {
    return html`
      <textarea
        class="jf__textarea"
        id=${this._inputId}
        rows=${this.rows}
        .value=${this.value}
        placeholder=${ph || nothing}
        ?disabled=${isDisabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        name=${this.name || nothing}
        aria-describedby=${this._describedBy()}
        aria-invalid=${this.error ? 'true' : nothing}
        aria-required=${this.required ? 'true' : nothing}
        @input=${this._onInput}
      ></textarea>
    `;
  }

  private _renderSelect(ph: string, isDisabled: boolean) {
    return html`
      <select
        class="jf__select"
        id=${this._inputId}
        ?disabled=${isDisabled}
        ?required=${this.required}
        name=${this.name || nothing}
        aria-describedby=${this._describedBy()}
        aria-invalid=${this.error ? 'true' : nothing}
        aria-required=${this.required ? 'true' : nothing}
        @change=${this._onChange}
        @keydown=${this._onSelectKeydown}
      >
        ${ph ? html`<option value="" disabled ?selected=${!this.value}>${ph}</option>` : nothing}
        ${this.options.map(opt => html`
          <option value=${opt.value} ?selected=${opt.value === this.value}>${opt.label}</option>
        `)}
      </select>
      <span class="jf__chevron">${chevronSVG}</span>
    `;
  }
}

// ######### Auto generated below #########

declare global {
  // prettier-ignore
  interface HTMLJuneFieldElementCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJuneFieldElement;
  }

  // prettier-ignore
  interface HTMLJuneFieldElement extends JuneField {
    // Extend the JuneField class redefining the event listener methods to improve type safety when using them
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    
    removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  }

  interface IntrinsicElements {
    "june-field": HTMLJuneFieldElement;
  }

  interface HTMLElementTagNameMap {
    "june-field": HTMLJuneFieldElement;
  }
}

