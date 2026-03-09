import { html } from 'lit';
import { KasstorElement } from '@genexus/kasstor-core';
import { Component } from '@genexus/kasstor-core/decorators/component.js';
import styles from './june-learn-more.shadow.scss?inline';

@Component({ tag: 'june-learn-more', styles })
export class JuneLearnMore extends KasstorElement {
  override render() {
    return html`
      <div class="lm">
        <div class="lm__text">
          <slot name="title"></slot>
          <slot name="body"></slot>
        </div>
        <div class="lm__cta">
          <slot name="cta"></slot>
        </div>
      </div>
    `;
  }
}

// ######### Auto generated below #########

declare global {
  // prettier-ignore
  interface HTMLJuneLearnMoreElementCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJuneLearnMoreElement;
  }

  // prettier-ignore
  interface HTMLJuneLearnMoreElement extends JuneLearnMore {
    // Extend the JuneLearnMore class redefining the event listener methods to improve type safety when using them
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    
    removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  }

  interface IntrinsicElements {
    "june-learn-more": HTMLJuneLearnMoreElement;
  }

  interface HTMLElementTagNameMap {
    "june-learn-more": HTMLJuneLearnMoreElement;
  }
}

