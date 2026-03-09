import { html } from 'lit';
import { KasstorElement } from '@genexus/kasstor-core';
import { Component } from '@genexus/kasstor-core/decorators/component.js';
import styles from './june-smiley-contact-box.shadow.scss?inline';

@Component({ tag: 'june-smiley-contact-box', styles })
export class JuneSmileyContactBox extends KasstorElement {
  override render() {
    return html`
      <div class="scb">
        <div class="scb__inner">
          <div class="scb__info">
            <div class="scb__text">
              <slot name="title"></slot>
              <slot name="body"></slot>
            </div>
            <div class="scb__avatar">
              <slot name="avatar"></slot>
              <div class="scb__avatar-ring"></div>
            </div>
          </div>

          <div class="scb__form">
            <slot name="form"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

// ######### Auto generated below #########

declare global {
  // prettier-ignore
  interface HTMLJuneSmileyContactBoxElementCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJuneSmileyContactBoxElement;
  }

  // prettier-ignore
  interface HTMLJuneSmileyContactBoxElement extends JuneSmileyContactBox {
    // Extend the JuneSmileyContactBox class redefining the event listener methods to improve type safety when using them
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    
    removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  }

  interface IntrinsicElements {
    "june-smiley-contact-box": HTMLJuneSmileyContactBoxElement;
  }

  interface HTMLElementTagNameMap {
    "june-smiley-contact-box": HTMLJuneSmileyContactBoxElement;
  }
}

