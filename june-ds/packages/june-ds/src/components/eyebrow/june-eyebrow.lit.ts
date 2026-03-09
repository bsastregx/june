import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { KasstorElement } from '@genexus/kasstor-core';
import { Component } from '@genexus/kasstor-core/decorators/component.js';
import styles from './june-eyebrow.shadow.scss?inline';

const bellSVG = html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;

const chevronSVG = html`<svg width="6" height="9" viewBox="0 0 6 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 1 5 4.5 1 8"/></svg>`;

@Component({ tag: 'june-eyebrow', styles })
export class JuneEyebrow extends KasstorElement {
  @property({ type: Boolean, attribute: 'show-icon' })
  showIcon = true;

  @property({ type: String, attribute: 'tag-text' })
  tagText = '';

  @property({ type: String, attribute: 'body-text' })
  bodyText = '';

  @property({ type: String, attribute: 'cta-text' })
  ctaText = '';

  @property({ type: String, attribute: 'cta-href' })
  ctaHref = '#';

  @property({ type: Boolean, attribute: 'show-cta' })
  showCta = true;

  override render() {
    const classes = `lam-eyebrow${!this.showIcon ? ' lam-eyebrow--no-icon' : ''}`;

    return html`
      <div class=${classes}>
        ${this.showIcon
          ? html`<div class="lam-eyebrow__icon"><slot name="icon">${bellSVG}</slot></div>`
          : nothing}
        ${this.tagText
          ? html`<span class="lam-eyebrow__tag">${this.tagText}</span>`
          : nothing}
        <div class="lam-eyebrow__body">
          <span class="lam-eyebrow__text">${this.bodyText}</span>
          ${this.showCta
            ? html`
              <span class="lam-eyebrow__dash">\u2014</span>
              <a class="lam-eyebrow__cta" href=${this.ctaHref}>${this.ctaText} <span class="lam-eyebrow__chevron">${chevronSVG}</span></a>
            `
            : nothing}
        </div>
      </div>
    `;
  }
}

// ######### Auto generated below #########

declare global {
  // prettier-ignore
  interface HTMLJuneEyebrowElementCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJuneEyebrowElement;
  }

  // prettier-ignore
  interface HTMLJuneEyebrowElement extends JuneEyebrow {
    // Extend the JuneEyebrow class redefining the event listener methods to improve type safety when using them
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    
    removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  }

  interface IntrinsicElements {
    "june-eyebrow": HTMLJuneEyebrowElement;
  }

  interface HTMLElementTagNameMap {
    "june-eyebrow": HTMLJuneEyebrowElement;
  }
}

