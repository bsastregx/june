import { html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { KasstorElement } from '@genexus/kasstor-core';
import { Component } from '@genexus/kasstor-core/decorators/component.js';
import styles from './june-button.shadow.scss?inline';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'plain' | 'icon';
export type ForceState = '' | 'hover' | 'focus' | 'active';

@Component({ tag: 'june-button', styles })
export class JuneButton extends KasstorElement {
  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'primary';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  label = '';

  @property({ type: Boolean, attribute: 'icon-only' })
  iconOnly = false;

  @property({ type: String, attribute: 'force-state', reflect: true })
  forceState: ForceState = '';

  @state() private _hasIcon = false;

  private _variantClass(): string {
    const map: Record<ButtonVariant, string> = {
      primary: 'jb--pri',
      secondary: 'jb--sec',
      tertiary: 'jb--ter',
      outline: 'jb--out',
      plain: 'jb--pln',
      icon: 'jb--ico',
    };
    return map[this.variant] ?? 'jb--pri';
  }

  private _onIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasIcon = slot.assignedNodes({ flatten: true }).length > 0;
  }

  override render() {
    const fs = this.forceState;
    const classes = `jb ${this._variantClass()}${this._hasIcon ? ' jb--has-icon' : ''}${fs ? ' jb--' + fs : ''}`;

    return html`
      <button
        type="button"
        class=${classes}
        ?disabled=${this.disabled}
        aria-label=${this.label || (this.iconOnly ? 'button' : nothing)}
      >
        <span class="jb__i" ?hidden=${!this._hasIcon}>
          <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
        </span>
        ${this.iconOnly ? nothing : html`<slot>${this.label}</slot>`}
      </button>
    `;
  }
}

// ######### Auto generated below #########

declare global {
  // prettier-ignore
  interface HTMLJuneButtonElementCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJuneButtonElement;
  }

  // prettier-ignore
  interface HTMLJuneButtonElement extends JuneButton {
    // Extend the JuneButton class redefining the event listener methods to improve type safety when using them
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    
    removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  }

  interface IntrinsicElements {
    "june-button": HTMLJuneButtonElement;
  }

  interface HTMLElementTagNameMap {
    "june-button": HTMLJuneButtonElement;
  }
}

