import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { KasstorElement } from '@genexus/kasstor-core';
import { Component } from '@genexus/kasstor-core/decorators/component.js';
import styles from './june-look-at-me.shadow.scss?inline';

export type ImagePosition = 'none' | 'full' | 'right' | 'bottom';
export type Align = 'center' | 'left';

@Component({ tag: 'june-look-at-me', styles })
export class JuneLookAtMe extends KasstorElement {
  @property({ type: String, reflect: true })
  align: Align = 'center';

  @property({ type: String, reflect: true, attribute: 'image-position' })
  imagePosition: ImagePosition = 'none';

  @property({ type: Boolean, attribute: 'show-eyebrow' })
  showEyebrow = true;

  @property({ type: Boolean, attribute: 'show-secondary' })
  showSecondary = true;

  @property({ type: Boolean, attribute: 'show-plain' })
  showPlain = true;

  /** Shared content slots: eyebrow, title, subtitle, cta. */
  private _renderContent() {
    return html`
      ${this.showEyebrow ? html`<slot name="eyebrow"></slot>` : nothing}
      <div class="lam-info">
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
      </div>
      <div class="lam-cta">
        <slot name="cta"></slot>
      </div>
    `;
  }

  /** Default center layout — no image. */
  private _renderNone() {
    return html`
      <div class="lam-container">
        ${this._renderContent()}
      </div>
    `;
  }

  /** Full background image layout. */
  private _renderFull() {
    return html`
      <div class="lam-container lam-container--img-full">
        ${this._renderContent()}
      </div>
    `;
  }

  /** Split layout — content left, image right. */
  private _renderRight() {
    return html`
      <div class="lam-split">
        <div class="lam-split__content">
          ${this._renderContent()}
        </div>
        <div class="lam-split__image">
          <slot name="image"></slot>
        </div>
      </div>
    `;
  }

  /** Content on top, image below. */
  private _renderBottom() {
    return html`
      <div>
        <div class="lam-container">
          ${this._renderContent()}
        </div>
        <div class="lam-bottom-image">
          <slot name="image"></slot>
        </div>
      </div>
    `;
  }

  override render() {
    switch (this.imagePosition) {
      case 'full':
        return this._renderFull();
      case 'right':
        return this._renderRight();
      case 'bottom':
        return this._renderBottom();
      case 'none':
      default:
        return this._renderNone();
    }
  }
}

// ######### Auto generated below #########

declare global {
  // prettier-ignore
  interface HTMLJuneLookAtMeElementCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJuneLookAtMeElement;
  }

  // prettier-ignore
  interface HTMLJuneLookAtMeElement extends JuneLookAtMe {
    // Extend the JuneLookAtMe class redefining the event listener methods to improve type safety when using them
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    
    removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  }

  interface IntrinsicElements {
    "june-look-at-me": HTMLJuneLookAtMeElement;
  }

  interface HTMLElementTagNameMap {
    "june-look-at-me": HTMLJuneLookAtMeElement;
  }
}

