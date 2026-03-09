import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, shadowQuery } from '../../test-utils';
import type { JuneBlocks } from './june-blocks.lit';
import './june-blocks.lit';

describe('june-blocks', () => {
  afterEach(cleanup);

  it('renders with default 2-column grid', async () => {
    const el = await fixture<JuneBlocks>('june-blocks');
    const grid = shadowQuery(el, '.blk__grid')!;
    expect(grid).toBeTruthy();
    expect(grid.className).not.toContain('blk__grid--3col');
  });

  it('renders 3-column grid', async () => {
    const el = await fixture<JuneBlocks>('june-blocks', e => { e.columns = 3; });
    const grid = shadowQuery(el, '.blk__grid')!;
    expect(grid.className).toContain('blk__grid--3col');
  });

  it('applies left alignment class', async () => {
    const el = await fixture<JuneBlocks>('june-blocks', e => { e.align = 'left'; });
    const root = shadowQuery(el, '.blk')!;
    expect(root.className).toContain('blk--left');
  });

  it('shows header by default', async () => {
    const el = await fixture<JuneBlocks>('june-blocks');
    const header = shadowQuery(el, '.blk__header');
    expect(header).toBeTruthy();
  });

  it('hides header when showHeader=false', async () => {
    const el = await fixture<JuneBlocks>('june-blocks', e => { e.showHeader = false; });
    const header = shadowQuery(el, '.blk__header');
    expect(header).toBeNull();
  });

  it('shows footer slot when showFooter=true', async () => {
    const el = await fixture<JuneBlocks>('june-blocks', e => { e.showFooter = true; });
    const footer = shadowQuery(el, 'slot[name="footer"]');
    expect(footer).toBeTruthy();
  });
});
