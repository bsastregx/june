import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, shadowQuery } from '../../test-utils';
import type { JuneBlockCard } from './june-block-card.lit';
import './june-block-card.lit';

describe('june-block-card', () => {
  afterEach(cleanup);

  it('renders card title', async () => {
    const el = await fixture<JuneBlockCard>('june-block-card', e => { e.cardTitle = 'My Title'; });
    const title = shadowQuery(el, '.blk__card-title')!;
    expect(title.textContent).toBe('My Title');
  });

  it('renders body text', async () => {
    const el = await fixture<JuneBlockCard>('june-block-card', e => { e.body = 'Body content'; });
    const body = shadowQuery(el, '.blk__card-body')!;
    expect(body.textContent).toBe('Body content');
  });

  it('renders link with arrow when linkText provided', async () => {
    const el = await fixture<JuneBlockCard>('june-block-card', e => {
      e.linkText = 'Read more';
      e.linkHref = '/details';
    });
    const link = shadowQuery<HTMLAnchorElement>(el, '.blk__card-link')!;
    expect(link).toBeTruthy();
    expect(link.textContent).toContain('Read more');
    expect(link.href).toContain('/details');
    expect(link.querySelector('svg')).toBeTruthy();
  });
});
