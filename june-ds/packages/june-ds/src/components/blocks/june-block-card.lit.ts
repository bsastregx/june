import { html, svg, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { KasstorElement } from '@genexus/kasstor-core';
import { Component } from '@genexus/kasstor-core/decorators/component.js';
import styles from './june-block-card.shadow.scss?inline';

const arrowIcon = svg`<path d="M7 17L17 7"/><path d="M7 7h10v10"/>`;

@Component({ tag: 'june-block-card', styles })
export class JuneBlockCard extends KasstorElement {
  @property({ type: String })
  cardTitle = '';

  @property({ type: String })
  body = '';

  @property({ type: String })
  linkText = '';

  @property({ type: String })
  linkHref = '#';

  override render() {
    return html`
      <div class="blk__card">
        <div class="blk__card-top">
          <div class="blk__card-icon"><slot name="icon"></slot></div>
          <div class="blk__card-title">${this.cardTitle}</div>
        </div>
        <div class="blk__card-body">${this.body}</div>
        ${this.linkText
          ? html`<a class="blk__card-link" href="${this.linkHref}"
              >${this.linkText} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${arrowIcon}</svg></a>`
          : nothing}
      </div>
    `;
  }
}

// ######### Auto generated below #########

declare global {
  // prettier-ignore
  interface HTMLJuneBlockCardElementCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJuneBlockCardElement;
  }

  // prettier-ignore
  interface HTMLJuneBlockCardElement extends JuneBlockCard {
    // Extend the JuneBlockCard class redefining the event listener methods to improve type safety when using them
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    
    removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  }

  interface IntrinsicElements {
    "june-block-card": HTMLJuneBlockCardElement;
  }

  interface HTMLElementTagNameMap {
    "june-block-card": HTMLJuneBlockCardElement;
  }
}

