import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, shadowQuery } from '../../test-utils';
import type { JuneSmileyContactBox } from './june-smiley-contact-box.lit';
import './june-smiley-contact-box.lit';

describe('june-smiley-contact-box', () => {
  afterEach(cleanup);

  it('renders the component structure', async () => {
    const el = await fixture<JuneSmileyContactBox>('june-smiley-contact-box');
    const root = shadowQuery(el, '.scb')!;
    expect(root).toBeTruthy();
    expect(shadowQuery(el, '.scb__inner')).toBeTruthy();
  });

  it('has all expected slots', async () => {
    const el = await fixture<JuneSmileyContactBox>('june-smiley-contact-box');
    expect(shadowQuery(el, 'slot[name="title"]')).toBeTruthy();
    expect(shadowQuery(el, 'slot[name="body"]')).toBeTruthy();
    expect(shadowQuery(el, 'slot[name="avatar"]')).toBeTruthy();
    expect(shadowQuery(el, 'slot[name="form"]')).toBeTruthy();
  });
});
