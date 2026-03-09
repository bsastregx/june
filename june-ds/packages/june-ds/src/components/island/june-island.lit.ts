import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { KasstorElement } from '@genexus/kasstor-core';
import { Component } from '@genexus/kasstor-core/decorators/component.js';
import styles from './june-island.shadow.scss?inline';

export type TextPosition = 'left' | 'right';

@Component({ tag: 'june-island', styles })
export class JuneIsland extends KasstorElement {
  @property({ type: String, reflect: true, attribute: 'text-position' })
  textPosition: TextPosition = 'left';

  override render() {
    const isRight = this.textPosition === 'right';

    return html`
      <div class="isl">
        <div class="isl__card ${isRight ? 'isl__card--right' : ''}">
          <div class="isl__text">
            <div class="isl__logo">
              <slot name="logo"></slot>
            </div>
            <div class="isl__banner">
              <slot name="banner"></slot>
            </div>
            <div class="isl__info">
              <slot name="kicker"></slot>
              <slot name="title"></slot>
              <slot name="body"></slot>
            </div>
            <div class="isl__cta">
              <slot name="cta"></slot>
            </div>
          </div>

          <div class="isl__media">
            <div class="isl__media-wrap">
              <slot name="media"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// ######### Auto generated below #########

declare global {
  // prettier-ignore
  interface HTMLJuneIslandElementCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJuneIslandElement;
  }

  // prettier-ignore
  interface HTMLJuneIslandElement extends JuneIsland {
    // Extend the JuneIsland class redefining the event listener methods to improve type safety when using them
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    
    removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  }

  interface IntrinsicElements {
    "june-island": HTMLJuneIslandElement;
  }

  interface HTMLElementTagNameMap {
    "june-island": HTMLJuneIslandElement;
  }
}

