import type { PageDef } from './page-registry.js';
import { snip } from '../utils/clipboard.js';

/* ── Scale data ── */

const levels: [string, number, string][] = [
  ['none', 0,  'Explicit zero spacing, reset gaps'],
  ['0',  2,   'Sub-grid gap, hairline dividers'],
  ['1',  4,   'Icon-to-text spacing, minimum internal gap'],
  ['2',  8,   'Badge/chip inner padding, compact list gaps'],
  ['3',  12,  'Input padding, form element gaps'],
  ['4',  16,  'Card padding, list item gaps, small section margins'],
  ['5',  24,  'Container padding, content group gaps'],
  ['6',  32,  'Section margins, modal padding'],
  ['7',  48,  'Main page block separation'],
  ['8',  64,  'Hero padding, major section separation'],
  ['9',  80,  'Full-width section breathing room'],
  ['10', 128, 'Large hero vertical padding'],
  ['11', 172, 'Section horizontal padding (desktop)'],
  ['12', 240, 'Maximum horizontal breathing room'],
];

/* ── Responsive data ── */

// [tokenNum, desktopPx, tabletPx, tabletTarget|null, mobilePx, mobileTarget|null]
type RRow = [string, number, number, string | null, number, string | null];

const hRows: RRow[] = [
  ['0',  2,   2,  null,       2,  null],
  ['1',  4,   4,  null,       4,  null],
  ['2',  8,   8,  null,       8,  null],
  ['3',  12,  12, null,       12, null],
  ['4',  16,  16, null,       16, null],
  ['5',  24,  24, null,       16, '--sp-4'],
  ['6',  32,  24, '--sp-5',   16, '--sp-4'],
  ['7',  48,  32, '--sp-6',   24, '--sp-5'],
  ['8',  64,  32, '--sp-6',   24, '--sp-5'],
  ['9',  80,  48, '--sp-7',   24, '--sp-5'],
  ['10', 128, 64, '--sp-8',   24, '--sp-5'],
  ['11', 172, 64, '--sp-8',   24, '--sp-5'],
  ['12', 240, 80, '--sp-9',   32, '--sp-6'],
];

const vRows: RRow[] = [
  ['0',  2,   2,  null,       2,  null],
  ['1',  4,   4,  null,       4,  null],
  ['2',  8,   8,  null,       8,  null],
  ['3',  12,  12, null,       12, null],
  ['4',  16,  16, null,       8,  '--sp-2'],
  ['5',  24,  24, null,       16, '--sp-4'],
  ['6',  32,  32, null,       24, '--sp-5'],
  ['7',  48,  48, null,       32, '--sp-6'],
  ['8',  64,  48, '--sp-7',   32, '--sp-6'],
  ['9',  80,  64, '--sp-8',   48, '--sp-7'],
  ['10', 128, 80, '--sp-9',   64, '--sp-8'],
];

function rCell(px: number, target: string | null): string {
  return target ? `${px}px ${snip(target, target)}` : `${px}px`;
}

function rRow(r: RRow): string {
  const [tok, desk, tab, tabTok, mob, mobTok] = r;
  const stable = !tabTok && !mobTok;
  const style = stable ? ' style="color:var(--grey-400)"' : '';
  return `<tr${style}><td>${snip(`--sp-${tok}`, `--sp-${tok}`)}</td><td>${desk}px</td><td>${rCell(tab, tabTok)}</td><td>${rCell(mob, mobTok)}</td></tr>`;
}

function rTable(title: string, rows: RRow[]): string {
  return `<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">${title}</span></div>
  <div class="vcard__body" style="padding:0">
    <table class="tok-table">
      <thead><tr><th>Token</th><th>Desktop</th><th>Tablet</th><th>Mobile</th></tr></thead>
      <tbody>
${rows.map(r => `        ${rRow(r)}`).join('\n')}
      </tbody>
    </table>
  </div>
</div>`;
}

/* ── Tab 1: Scale ── */

const scaleTab = `
<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Spacing scale</span><span class="vcard__sub">Base 4 · 14 levels</span></div>
  <div class="vcard__body" style="padding:24px">
    <div style="display:flex;flex-direction:column;gap:20px">
${levels.map(([t, px]) => `      <div style="display:flex;align-items:center;gap:16px">
        <span style="width:100px;display:flex;justify-content:flex-start">${snip(`--sp-${t}`, `--sp-${t}`)}</span>
        <div style="width:${px}px;height:24px;background:var(--bar-accent);border-radius:2px;flex-shrink:0"></div>
        <span style="font-size:12px;color:var(--grey-600);font-family:var(--font-body)">${px}px</span>
      </div>`).join('\n')}
    </div>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">When to use each level</span></div>
  <div class="vcard__body" style="padding:0">
    <table class="tok-table">
      <thead><tr><th>Token</th><th>Value</th><th>Recommended use</th></tr></thead>
      <tbody>
${levels.map(([t, px, use]) => `        <tr><td>${snip(`--sp-${t}`, `--sp-${t}`)}</td><td>${px}px</td><td>${use}</td></tr>`).join('\n')}
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Principles</span></div>
  <div class="vcard__body" style="padding:var(--sp-5);">
    <div style="font:var(--body-xs);font-weight:400;color:var(--grey-600)">
      <p style="margin-bottom:12px"><strong>Base 4.</strong> All values are multiples of 4px, except <code class="tok tok--static">--sp-none</code> (0px) and <code class="tok tok--static">--sp-0</code> (2px) which serve as explicit zero and sub-grid unit respectively.</p>
      <p style="margin-bottom:12px"><strong>Non-linear progression.</strong> The scale grows faster at higher levels. sp-1 to sp-4 grow by 4px; sp-7 to sp-12 jump 16–112px.</p>
      <p><strong>Semantic tokens.</strong> Always use <code class="tok tok--static">var(--sp-*)</code>. Never hardcode <code class="tok tok--static">24px</code> — if the scale changes, everything breaks.</p>
    </div>
  </div>
</div>
`;

/* ── Tab 2: Responsive ── */

const responsiveTab = `
${rTable('Horizontal spacing', hRows)}

${rTable('Vertical spacing', vRows)}

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">How to read this</span></div>
  <div class="vcard__body" style="padding:var(--sp-5);">
    <div style="font:var(--body-xs);font-weight:400;color:var(--grey-600)">
      <p><strong style="font-weight:600">These are not auto-adaptive tokens.</strong> They are the replacement guide when you write media queries per breakpoint. Dimmed rows stay the same across all sizes. Highlighted rows show the target token to use at each breakpoint.</p>
    </div>
  </div>
</div>
`;

export const spacingPage: PageDef = {
  title: 'Spacing',
  desc: 'Fourteen levels of breathing room, all built on a 4px beat.',
  tabs: ['Scale', 'Responsive'],
  content: [scaleTab, responsiveTab],
};
