import type { KasstorElement } from '@genexus/kasstor-core';

/**
 * Create a component fixture, append to DOM, and wait for first render.
 */
export async function fixture<T extends KasstorElement>(
  tag: string,
  configure?: (el: T) => void,
): Promise<T> {
  const el = document.createElement(tag) as T;
  if (configure) configure(el);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

/**
 * Remove all children from document.body. Call in afterEach.
 */
export function cleanup(): void {
  document.body.innerHTML = '';
}

/**
 * Query a single element inside a host's shadowRoot.
 */
export function shadowQuery<T extends Element = Element>(
  host: Element,
  selector: string,
): T | null {
  return host.shadowRoot?.querySelector<T>(selector) ?? null;
}

/**
 * Query all elements inside a host's shadowRoot.
 */
export function shadowQueryAll<T extends Element = Element>(
  host: Element,
  selector: string,
): T[] {
  return Array.from(host.shadowRoot?.querySelectorAll<T>(selector) ?? []);
}

/**
 * Set a property on a Lit element and wait for updateComplete.
 */
export async function setProperty<T extends KasstorElement>(
  el: T,
  prop: keyof T & string,
  value: T[keyof T & string],
): Promise<void> {
  (el as Record<string, unknown>)[prop] = value;
  await el.updateComplete;
}
