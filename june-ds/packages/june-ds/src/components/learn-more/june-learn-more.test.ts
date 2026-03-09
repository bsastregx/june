import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, shadowQuery } from '../../test-utils';
import type { JuneLearnMore } from './june-learn-more.lit';
import './june-learn-more.lit';

describe('june-learn-more', () => {
  afterEach(cleanup);

  it('renders the component structure', async () => {
    const el = await fixture<JuneLearnMore>('june-learn-more');
    const root = shadowQuery(el, '.lm')!;
    expect(root).toBeTruthy();
    expect(shadowQuery(el, '.lm__text')).toBeTruthy();
    expect(shadowQuery(el, '.lm__cta')).toBeTruthy();
  });

  it('has title slot', async () => {
    const el = await fixture<JuneLearnMore>('june-learn-more');
    expect(shadowQuery(el, 'slot[name="title"]')).toBeTruthy();
  });

  it('has body slot', async () => {
    const el = await fixture<JuneLearnMore>('june-learn-more');
    expect(shadowQuery(el, 'slot[name="body"]')).toBeTruthy();
  });

  it('has cta slot', async () => {
    const el = await fixture<JuneLearnMore>('june-learn-more');
    expect(shadowQuery(el, 'slot[name="cta"]')).toBeTruthy();
  });

  it('title and body slots are inside text column', async () => {
    const el = await fixture<JuneLearnMore>('june-learn-more');
    const textCol = shadowQuery(el, '.lm__text')!;
    expect(textCol.querySelector('slot[name="title"]')).toBeTruthy();
    expect(textCol.querySelector('slot[name="body"]')).toBeTruthy();
  });

  it('cta slot is inside cta column', async () => {
    const el = await fixture<JuneLearnMore>('june-learn-more');
    const ctaCol = shadowQuery(el, '.lm__cta')!;
    expect(ctaCol.querySelector('slot[name="cta"]')).toBeTruthy();
  });
});
