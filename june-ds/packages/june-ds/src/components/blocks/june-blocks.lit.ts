import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { KasstorElement } from '@genexus/kasstor-core';
import { Component } from '@genexus/kasstor-core/decorators/component.js';
import styles from './june-blocks.shadow.scss?inline';

@Component({ tag: 'june-blocks', styles })
export class JuneBlocks extends KasstorElement {
  @property({ type: String })
  align: 'top' | 'left' = 'top';

  @property({ type: Number })
  columns: 2 | 3 = 2;

  @property({ type: Boolean })
  showHeader = true;

  @property({ type: Boolean })
  showFooter = false;

  @property({ type: Boolean })
  showButtons = false;

  override render() {
    return html`
      <div class="blk ${this.align === 'left' ? 'blk--left' : ''}">
        ${this.showHeader
          ? html`<div class="blk__header"><slot name="header"></slot></div>`
          : nothing}
        <div class="blk__content">
          <div
            class="blk__grid ${this.columns === 3 ? 'blk__grid--3col' : ''}"
          >
            <slot></slot>
          </div>
        </div>
        ${this.showFooter ? html`<slot name="footer"></slot>` : nothing}
      </div>
    `;
  }
}

// ######### Auto generated below #########

declare global {
  // prettier-ignore
  interface HTMLJuneBlocksElementCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJuneBlocksElement;
  }

  // prettier-ignore
  interface HTMLJuneBlocksElement extends JuneBlocks {
    // Extend the JuneBlocks class redefining the event listener methods to improve type safety when using them
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    
    removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  }

  interface IntrinsicElements {
    "june-blocks": HTMLJuneBlocksElement;
  }

  interface HTMLElementTagNameMap {
    "june-blocks": HTMLJuneBlocksElement;
  }
}

