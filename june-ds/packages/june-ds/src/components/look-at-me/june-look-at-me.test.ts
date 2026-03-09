import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, shadowQuery, setProperty } from '../../test-utils';
import type { JuneLookAtMe } from './june-look-at-me.lit';
import './june-look-at-me.lit';

describe('june-look-at-me', () => {
  afterEach(cleanup);

  it('renders none layout by default', async () => {
    const el = await fixture<JuneLookAtMe>('june-look-at-me');
    const container = shadowQuery(el, '.lam-container')!;
    expect(container).toBeTruthy();
    expect(shadowQuery(el, '.lam-split')).toBeNull();
  });

  it('renders full layout', async () => {
    const el = await fixture<JuneLookAtMe>('june-look-at-me', e => { e.imagePosition = 'full'; });
    const container = shadowQuery(el, '.lam-container--img-full')!;
    expect(container).toBeTruthy();
  });

  it('renders right (split) layout', async () => {
    const el = await fixture<JuneLookAtMe>('june-look-at-me', e => { e.imagePosition = 'right'; });
    const split = shadowQuery(el, '.lam-split')!;
    expect(split).toBeTruthy();
    expect(shadowQuery(el, '.lam-split__image')).toBeTruthy();
  });

  it('renders bottom layout', async () => {
    const el = await fixture<JuneLookAtMe>('june-look-at-me', e => { e.imagePosition = 'bottom'; });
    const bottomImg = shadowQuery(el, '.lam-bottom-image')!;
    expect(bottomImg).toBeTruthy();
  });

  it('reflects align attribute', async () => {
    const el = await fixture<JuneLookAtMe>('june-look-at-me', e => { e.align = 'left'; });
    expect(el.getAttribute('align')).toBe('left');
  });

  it('has eyebrow slot present', async () => {
    const el = await fixture<JuneLookAtMe>('june-look-at-me');
    const slot = shadowQuery(el, 'slot[name="eyebrow"]');
    expect(slot).toBeTruthy();
  });

  it('has title and subtitle slots', async () => {
    const el = await fixture<JuneLookAtMe>('june-look-at-me');
    expect(shadowQuery(el, 'slot[name="title"]')).toBeTruthy();
    expect(shadowQuery(el, 'slot[name="subtitle"]')).toBeTruthy();
  });

  it('has cta slot', async () => {
    const el = await fixture<JuneLookAtMe>('june-look-at-me');
    expect(shadowQuery(el, 'slot[name="cta"]')).toBeTruthy();
  });
});
