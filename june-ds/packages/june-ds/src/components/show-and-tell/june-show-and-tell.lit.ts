import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { KasstorElement } from '@genexus/kasstor-core';
import { Component } from '@genexus/kasstor-core/decorators/component.js';
import styles from './june-show-and-tell.shadow.scss?inline';

export type TextPosition = 'left' | 'right';
export type HeaderAlign = 'left' | 'center';

@Component({ tag: 'june-show-and-tell', styles })
export class JuneShowAndTell extends KasstorElement {
  @property({ type: String, reflect: true, attribute: 'text-position' })
  textPosition: TextPosition = 'left';

  @property({ type: String, reflect: true, attribute: 'header-align' })
  headerAlign: HeaderAlign = 'center';

  override render() {
    const isRight = this.textPosition === 'right';
    const isHeaderLeft = this.headerAlign === 'left';

    return html`
      <div class="sat">
        <div class="sat__header ${isHeaderLeft ? 'sat__header--left' : ''}"
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
        </div>

        <div class="sat__feature ${isRight ? 'sat__feature--right' : ''}">
          <div class="sat__text">
            <div class="sat__icon">
              <slot name="icon"></slot>
            </div>
            <div class="sat__info">
              <slot name="kicker"></slot>
              <slot name="feature-title"></slot>
              <slot name="feature-body"></slot>
            </div>
            <div class="sat__cta">
              <slot name="cta"></slot>
            </div>
          </div>

          <div class="sat__media">
            <div class="sat__media-wrap">
              <slot name="media"></slot>
            </div>
            <slot name="caption"></slot>
          </div>
        </div>

        <div class="sat__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

// ######### Auto generated below #########

declare global {
  // prettier-ignore
  interface HTMLJuneShowAndTellElementCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJuneShowAndTellElement;
  }

  // prettier-ignore
  interface HTMLJuneShowAndTellElement extends JuneShowAndTell {
    // Extend the JuneShowAndTell class redefining the event listener methods to improve type safety when using them
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    
    removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  }

  interface IntrinsicElements {
    "june-show-and-tell": HTMLJuneShowAndTellElement;
  }

  interface HTMLElementTagNameMap {
    "june-show-and-tell": HTMLJuneShowAndTellElement;
  }
}

