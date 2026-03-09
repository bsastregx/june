import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, shadowQuery } from '../../test-utils';
import type { JuneIsland } from './june-island.lit';
import './june-island.lit';

describe('june-island', () => {
  afterEach(cleanup);

  it('renders with default left text position', async () => {
    const el = await fixture<JuneIsland>('june-island');
    const card = shadowQuery(el, '.isl__card')!;
    expect(card).toBeTruthy();
    expect(card.className).not.toContain('isl__card--right');
  });

  it('applies right class when textPosition=right', async () => {
    const el = await fixture<JuneIsland>('june-island', e => { e.textPosition = 'right'; });
    const card = shadowQuery(el, '.isl__card')!;
    expect(card.className).toContain('isl__card--right');
  });

  it('has all expected slots', async () => {
    const el = await fixture<JuneIsland>('june-island');
    expect(shadowQuery(el, 'slot[name="logo"]')).toBeTruthy();
    expect(shadowQuery(el, 'slot[name="title"]')).toBeTruthy();
    expect(shadowQuery(el, 'slot[name="body"]')).toBeTruthy();
    expect(shadowQuery(el, 'slot[name="cta"]')).toBeTruthy();
    expect(shadowQuery(el, 'slot[name="media"]')).toBeTruthy();
  });
});
