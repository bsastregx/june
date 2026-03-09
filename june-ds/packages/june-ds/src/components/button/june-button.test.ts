import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, shadowQuery, setProperty } from '../../test-utils';
import type { JuneButton } from './june-button.lit';
import './june-button.lit';

describe('june-button', () => {
  afterEach(cleanup);

  it('renders with default primary variant', async () => {
    const el = await fixture<JuneButton>('june-button');
    const btn = shadowQuery<HTMLButtonElement>(el, 'button')!;
    expect(btn).toBeTruthy();
    expect(btn.className).toContain('jb');
    expect(btn.className).toContain('jb--pri');
  });

  it('applies primary variant class', async () => {
    const el = await fixture<JuneButton>('june-button', e => { e.variant = 'primary'; });
    const btn = shadowQuery<HTMLButtonElement>(el, 'button')!;
    expect(btn.className).toContain('jb--pri');
  });

  it('applies secondary variant class', async () => {
    const el = await fixture<JuneButton>('june-button', e => { e.variant = 'secondary'; });
    const btn = shadowQuery<HTMLButtonElement>(el, 'button')!;
    expect(btn.className).toContain('jb--sec');
  });

  it('applies tertiary variant class', async () => {
    const el = await fixture<JuneButton>('june-button', e => { e.variant = 'tertiary'; });
    const btn = shadowQuery<HTMLButtonElement>(el, 'button')!;
    expect(btn.className).toContain('jb--ter');
  });

  it('applies plain variant class', async () => {
    const el = await fixture<JuneButton>('june-button', e => { e.variant = 'plain'; });
    const btn = shadowQuery<HTMLButtonElement>(el, 'button')!;
    expect(btn.className).toContain('jb--pln');
  });

  it('applies icon variant class', async () => {
    const el = await fixture<JuneButton>('june-button', e => { e.variant = 'icon'; });
    const btn = shadowQuery<HTMLButtonElement>(el, 'button')!;
    expect(btn.className).toContain('jb--ico');
  });

  it('always has type="button"', async () => {
    const el = await fixture<JuneButton>('june-button');
    const btn = shadowQuery<HTMLButtonElement>(el, 'button')!;
    expect(btn.getAttribute('type')).toBe('button');
  });

  it('reflects disabled to internal button', async () => {
    const el = await fixture<JuneButton>('june-button', e => { e.disabled = true; });
    const btn = shadowQuery<HTMLButtonElement>(el, 'button')!;
    expect(btn.disabled).toBe(true);
  });

  it('uses label as slot fallback content', async () => {
    const el = await fixture<JuneButton>('june-button', e => { e.label = 'Click me'; });
    const btn = shadowQuery<HTMLButtonElement>(el, 'button')!;
    expect(btn.getAttribute('aria-label')).toBe('Click me');
  });

  it('sets aria-label="button" for iconOnly without label', async () => {
    const el = await fixture<JuneButton>('june-button', e => { e.iconOnly = true; });
    const btn = shadowQuery<HTMLButtonElement>(el, 'button')!;
    expect(btn.getAttribute('aria-label')).toBe('button');
  });

  it('hides default slot when iconOnly', async () => {
    const el = await fixture<JuneButton>('june-button', e => { e.iconOnly = true; });
    const btn = shadowQuery<HTMLButtonElement>(el, 'button')!;
    const defaultSlot = btn.querySelector('slot:not([name])');
    expect(defaultSlot).toBeNull();
  });

  it('applies forceState class', async () => {
    const el = await fixture<JuneButton>('june-button', e => { e.forceState = 'hover'; });
    const btn = shadowQuery<HTMLButtonElement>(el, 'button')!;
    expect(btn.className).toContain('jb--hover');
  });
});
