import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, shadowQuery } from '../../test-utils';
import type { JuneShowAndTell } from './june-show-and-tell.lit';
import './june-show-and-tell.lit';

describe('june-show-and-tell', () => {
  afterEach(cleanup);

  it('renders with default left text position', async () => {
    const el = await fixture<JuneShowAndTell>('june-show-and-tell');
    const feature = shadowQuery(el, '.sat__feature')!;
    expect(feature).toBeTruthy();
    expect(feature.className).not.toContain('sat__feature--right');
  });

  it('applies right class when textPosition=right', async () => {
    const el = await fixture<JuneShowAndTell>('june-show-and-tell', e => { e.textPosition = 'right'; });
    const feature = shadowQuery(el, '.sat__feature')!;
    expect(feature.className).toContain('sat__feature--right');
  });

  it('has all expected slots', async () => {
    const el = await fixture<JuneShowAndTell>('june-show-and-tell');
    expect(shadowQuery(el, 'slot[name="title"]')).toBeTruthy();
    expect(shadowQuery(el, 'slot[name="subtitle"]')).toBeTruthy();
    expect(shadowQuery(el, 'slot[name="media"]')).toBeTruthy();
    expect(shadowQuery(el, 'slot[name="cta"]')).toBeTruthy();
    expect(shadowQuery(el, 'slot[name="footer"]')).toBeTruthy();
  });
});
