import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, shadowQuery, setProperty } from '../../test-utils';
import type { JuneEyebrow } from './june-eyebrow.lit';
import './june-eyebrow.lit';

describe('june-eyebrow', () => {
  afterEach(cleanup);

  it('renders with default structure', async () => {
    const el = await fixture<JuneEyebrow>('june-eyebrow');
    const root = shadowQuery(el, '.lam-eyebrow')!;
    expect(root).toBeTruthy();
  });

  it('shows icon by default', async () => {
    const el = await fixture<JuneEyebrow>('june-eyebrow');
    const icon = shadowQuery(el, '.lam-eyebrow__icon');
    expect(icon).toBeTruthy();
  });

  it('hides icon when showIcon=false', async () => {
    const el = await fixture<JuneEyebrow>('june-eyebrow', e => { e.showIcon = false; });
    const icon = shadowQuery(el, '.lam-eyebrow__icon');
    expect(icon).toBeNull();
    const root = shadowQuery(el, '.lam-eyebrow')!;
    expect(root.className).toContain('lam-eyebrow--no-icon');
  });

  it('renders tagText', async () => {
    const el = await fixture<JuneEyebrow>('june-eyebrow', e => { e.tagText = 'New'; });
    const tag = shadowQuery(el, '.lam-eyebrow__tag')!;
    expect(tag.textContent).toBe('New');
  });

  it('renders bodyText', async () => {
    const el = await fixture<JuneEyebrow>('june-eyebrow', e => { e.bodyText = 'Hello world'; });
    const text = shadowQuery(el, '.lam-eyebrow__text')!;
    expect(text.textContent).toBe('Hello world');
  });

  it('renders CTA with href', async () => {
    const el = await fixture<JuneEyebrow>('june-eyebrow', e => {
      e.ctaText = 'Learn more';
      e.ctaHref = '/about';
    });
    const cta = shadowQuery<HTMLAnchorElement>(el, '.lam-eyebrow__cta')!;
    expect(cta.href).toContain('/about');
    expect(cta.textContent).toContain('Learn more');
  });

  it('hides CTA when showCta=false', async () => {
    const el = await fixture<JuneEyebrow>('june-eyebrow', e => { e.showCta = false; });
    const cta = shadowQuery(el, '.lam-eyebrow__cta');
    expect(cta).toBeNull();
  });

  it('does not render tag when tagText is empty', async () => {
    const el = await fixture<JuneEyebrow>('june-eyebrow');
    const tag = shadowQuery(el, '.lam-eyebrow__tag');
    expect(tag).toBeNull();
  });
});
