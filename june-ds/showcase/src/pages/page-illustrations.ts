import type { PageDef } from './page-registry.js';
import { copyToClipboard, showToast, snip } from '../utils/clipboard.js';
import { ILLUSTRATION_NAMES, illustrationMap } from '@anthropic/june-ds/icons/illustrations.js';

/* ── Styles (scoped via .il- prefix) ──────────────────────────────── */

const IL_STYLES = `
<style>
.il-toolbar {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  margin-bottom: var(--sp-4);
  flex-wrap: wrap;
}
.il-search {
  flex: 1;
  min-width: 180px;
  padding: 8px 12px;
  border: 1px solid var(--card-border);
  border-radius: var(--r-md);
  background: var(--card);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 300;
  color: var(--grey-600);
  outline: none;
  transition: border-color var(--duration-fast) var(--ease);
}
.il-search:focus { border-color: var(--black); }
.il-search::placeholder { color: var(--grey-400); }


.il-count {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 300;
  color: var(--grey-600);
  white-space: nowrap;
}

.il-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--sp-3);
  padding: var(--sp-4);
  border-radius: var(--r-lg);
  transition: background-color var(--duration) var(--ease);
}
.il-grid[data-surface="light"] { background: #FFFFFF; }
.il-grid[data-surface="dark"]  { background: var(--grey-900); }

.il-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-3);
  border-radius: var(--r-md);
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease), transform var(--duration-fast) var(--ease);
}
.il-card:hover { background: rgba(128,128,128,0.1); }
.il-card:active { transform: scale(0.97); }
.il-card__copy {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--r-xs);
  background: var(--black);
  color: #fff;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease), background var(--duration-fast) var(--ease);
  pointer-events: none;
}
.il-card:hover .il-card__copy { opacity: 1; }
.il-card__copy.copied { background: #16a34a; }

.il-card__svg {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
}
.il-card__svg svg {
  width: 100%;
  height: 100%;
  display: block;
}

.il-card__name {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 300;
  line-height: 1.6;
  color: var(--grey-600);
  text-align: center;
  word-break: break-word;
  max-width: 100%;
}
.il-grid[data-surface="dark"] .il-card__name { color: var(--grey-400); }
.il-grid[data-surface="dark"] .il-card__copy { background: var(--grey-200); color: var(--grey-900); }

.il-empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--sp-6);
  font: var(--body-xs);
  font-weight: 400;
  color: var(--grey-600);
}

/* ── Showcase dark mode ── */
body.dm .il-search { background: var(--dark-card); color: var(--grey-100); border-color: var(--card-border); }
body.dm .il-search:focus { border-color: var(--black); }
</style>
`;

/* ── Sample SVG for specs (fallback if no illustrations yet) ──────── */

const sampleSvg = illustrationMap[ILLUSTRATION_NAMES[0] ?? '']
  || '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="24" fill="var(--icon-fill)" stroke="var(--icon-line)" stroke-width="2"/><circle cx="32" cy="32" r="10" fill="var(--icon-accent)"/></svg>';

/* ── Tab 1: Catalog ───────────────────────────────────────────────── */

function buildCards(): string {
  if (ILLUSTRATION_NAMES.length === 0) {
    return '<div class="il-empty">No illustrations found. Run <code>npm run fetch-illustrations && npm run illustrations</code> first.</div>';
  }
  return ILLUSTRATION_NAMES.map(name => {
    const svg = illustrationMap[name] || '';
    return `<div class="il-card" data-name="${name}" title="Click to copy SVG">
      <div class="il-card__svg" aria-hidden="true">${svg}</div>
      <span class="il-card__copy" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></span>
      <div class="il-card__name">${name}</div>
    </div>`;
  }).join('');
}

const catalogTab = `${IL_STYLES}
<div class="il-toolbar">
  <input class="il-search" id="ilSearch" type="text" placeholder="Search illustrations..." aria-label="Search illustrations" />
  <div class="pills" role="radiogroup" aria-label="Surface">
    <button class="on" data-surface="light" role="radio" aria-checked="true">Light</button>
    <button data-surface="dark" role="radio" aria-checked="false">Dark</button>
  </div>
  <span class="il-count" id="ilCount">${ILLUSTRATION_NAMES.length} illustration${ILLUSTRATION_NAMES.length !== 1 ? 's' : ''}</span>
</div>

<div class="il-grid" id="ilGrid" data-surface="light">
  ${buildCards()}
</div>`;

/* ── Tab 2: Specs ─────────────────────────────────────────────────── */

const specsTab = `${IL_STYLES}
<style>
.vcard[id^="il-"] { scroll-margin-top: 80px; }
</style>

<div class="vcard" id="il-tokens" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">Design Tokens</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Token</th><th style="width:20%">Role</th><th>Light surface</th><th>Dark surface</th></tr></thead><tbody>
    <tr>
      <td>${snip('--icon-accent', '--icon-accent')}</td>
      <td>Accent (~22%)</td>
      <td><span class="sw" style="background:var(--icon-accent)"></span>${snip('--brand', '--brand')}</td>
      <td><span class="sw" style="background:var(--icon-accent)"></span>${snip('--brand', '--brand')}</td>
    </tr>
    <tr>
      <td>${snip('--icon-line', '--icon-line')}</td>
      <td>Line (~32%)</td>
      <td><span class="sw" style="background:var(--icon-line)"></span>color-mix(in srgb, ${snip('--brand', '--brand')} 15%, ${snip('--grey-800', '--grey-800')})</td>
      <td>color-mix(in srgb, ${snip('--brand', '--brand')} 15%, ${snip('--grey-100', '--grey-100')})</td>
    </tr>
    <tr>
      <td>${snip('--icon-fill', '--icon-fill')}</td>
      <td>Fill (~46%)</td>
      <td><span class="sw" style="background:var(--icon-fill);border:1px solid #e0e0e0"></span>color-mix(in srgb, ${snip('--brand', '--brand')} 8%, ${snip('--grey-200', '--grey-200')})</td>
      <td>color-mix(in srgb, ${snip('--brand', '--brand')} 8%, ${snip('--grey-800', '--grey-800')})</td>
    </tr>
  </tbody></table>
</div></div>

<div class="vcard" id="il-brand-surface" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">Brand × Surface</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th></th><th>GX</th><th>NX</th><th>GE</th></tr></thead><tbody>
    <tr>
      <td>Light</td>
      ${['gx','nx','ge'].map(b => `<td data-brand="${b}" data-surface="light" style="background:#FFFFFF;padding-left:var(--sp-3);padding-right:var(--sp-3)"><div style="width:64px;height:64px">${sampleSvg}</div></td>`).join('')}
    </tr>
    <tr>
      <td style="font-weight:600;background:var(--grey-900);color:#fff;">Dark</td>
      ${['gx','nx','ge'].map(b => `<td data-brand="${b}" data-surface="dark" style="background:var(--grey-900);padding-left:var(--sp-3);padding-right:var(--sp-3)"><div style="width:64px;height:64px">${sampleSvg}</div></td>`).join('')}
    </tr>
  </tbody></table>
</div></div>

<div class="vcard" id="il-sizes" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">Sizes</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Size</th><th>Dimensions</th><th>Use</th></tr></thead><tbody>
    <tr><td>Minimum</td><td>48 × 48px</td><td>Smallest legible size — stroke details break below this</td></tr>
    <tr><td>Default</td><td>64 × 64px</td><td>Standard product usage</td></tr>
    <tr><td>Hero</td><td>80 × 80px</td><td>Hero sections, empty states</td></tr>
    <tr><td>Maximum</td><td>96 × 96px</td><td>No visual gain beyond this</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="il-usage" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">Usage</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Rule</th><th>Detail</th></tr></thead><tbody>
    <tr><td>Inline SVG only</td><td>Always render as inline SVG, not <code class="tok tok--static">&lt;img&gt;</code>. Using <code class="tok tok--static">&lt;img&gt;</code> breaks CSS custom property inheritance and prevents brand-aware coloring</td></tr>
    <tr><td>Decorative by default</td><td>Add <code class="tok tok--static">aria-hidden="true"</code> to the SVG container</td></tr>
    <tr><td>Meaningful context</td><td>If the illustration conveys meaning, wrap in a container with <code class="tok tok--static">role="img"</code> and <code class="tok tok--static">aria-label="..."</code></td></tr>
    <tr><td>Color composition</td><td>Accent ~22%, Line ~32%, Fill ~46%</td></tr>
    <tr><td>No gradients</td><td>Flat colors only (design system brief)</td></tr>
    <tr><td>Two systems</td><td><code class="tok tok--static">illustrations.ts</code> (tricolor) is separate from <code class="tok tok--static">icons.ts</code> (monocolor <code class="tok tok--static">currentColor</code>)</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="il-import" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">Import</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Method</th><th>Code</th></tr></thead><tbody>
    <tr><td>Named import</td><td><code class="tok tok--static">import { illuSecurity } from '@anthropic/june-ds/icons/illustrations.js'</code></td></tr>
    <tr><td>Dynamic lookup</td><td><code class="tok tok--static">import { illustrationMap } from '@anthropic/june-ds/icons/illustrations.js'</code></td></tr>
  </tbody></table>
  <div class="table-note">
    Named exports follow the pattern <code class="tok tok--static">illu</code> + PascalCase name. Use <code class="tok tok--static">illustrationMap[name]</code> for dynamic rendering.
  </div>
</div></div>

<div class="vcard" id="il-pipeline"><div class="vcard__head"><span class="vcard__name">Pipeline</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Step</th><th>Command</th><th>Description</th></tr></thead><tbody>
    <tr><td>1. Fetch (pilot)</td><td><code class="tok tok--static">FIGMA_PAT=xxx npm run fetch-illustrations</code></td><td>Downloads pilot set (10 SVGs) from Figma API. Resumable</td></tr>
    <tr><td>1b. Fetch (all)</td><td><code class="tok tok--static">FIGMA_PAT=xxx npm run fetch-illustrations:all</code></td><td>Downloads all ~170 SVGs</td></tr>
    <tr><td>2. Process</td><td><code class="tok tok--static">npm run illustrations</code></td><td>SVGO optimize, classify colors (HSL), replace hex with <code class="tok tok--static">var(--icon-*)</code>, generate TS</td></tr>
    <tr><td>3. Review</td><td><code class="tok tok--static">raw-svg/quality-report.json</code></td><td>Flags: unknown colors, gradients, prohibited elements, mixed strokes, tight padding</td></tr>
    <tr><td>4. Verify</td><td><code class="tok tok--static">cd showcase && npm run dev</code></td><td>Check 3 brands × 2 surfaces = 6 combinations</td></tr>
  </tbody></table>
  <table class="tok-table" style="border-top:2px solid var(--card-border);"><thead><tr><th>Original color (HSL)</th><th>Mapped to</th></tr></thead><tbody>
    <tr><td>Blue (H: 190-250, S &gt; 40%)</td><td>${snip('--icon-accent', '--icon-accent')}</td></tr>
    <tr><td>Dark, low saturation (L &lt; 35%, S &lt; 15%)</td><td>${snip('--icon-fill', '--icon-fill')}</td></tr>
    <tr><td>Very light (L &gt; 85%)</td><td>${snip('--icon-fill', '--icon-fill')}</td></tr>
    <tr><td>Medium lightness (35-85%)</td><td>${snip('--icon-line', '--icon-line')}</td></tr>
    <tr><td>Near-black (L &lt; 5%)</td><td style="font-size:12px;color:var(--grey-600);font-style:italic">Removed (background)</td></tr>
    <tr><td>Other</td><td style="font-size:12px;color:var(--grey-600);font-style:italic">Flagged for manual review</td></tr>
  </tbody></table>
  <table class="tok-table" style="border-top:2px solid var(--card-border);"><thead><tr><th>File</th><th>Role</th></tr></thead><tbody>
    <tr><td><code class="tok tok--static">scripts/fetch-illustrations.mjs</code></td><td>Figma API → raw SVGs</td></tr>
    <tr><td><code class="tok tok--static">scripts/process-illustrations.mjs</code></td><td>Raw SVGs → tokenized <code class="tok tok--static">illustrations.ts</code></td></tr>
    <tr><td><code class="tok tok--static">raw-svg/</code></td><td>Downloaded SVGs + manifest + quality report (gitignored)</td></tr>
    <tr><td><code class="tok tok--static">src/icons/illustrations.ts</code></td><td>Auto-generated named exports (committed)</td></tr>
    <tr><td><code class="tok tok--static">src/tokens/_icon-tokens.scss</code></td><td>CSS custom properties for accent/line/fill</td></tr>
  </tbody></table>
  <div class="table-note">
    Override misclassifications in <code class="tok tok--static">COLOR_OVERRIDES</code> map inside <code class="tok tok--static">process-illustrations.mjs</code>. Figma PAT expires after 90 days.
  </div>
</div></div>`;

/* ── Init ──────────────────────────────────────────────────────────── */

function illustrationsInit(): void {
  const pageEl = document.getElementById('page');
  if (!pageEl) return;

  // Surface toggle — delegated on #page
  pageEl.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-surface]') as HTMLElement;
    if (!btn || !btn.closest('.pills[aria-label="Surface"]')) return;
    const surface = btn.dataset.surface;
    if (!surface) return;

    const grid = document.getElementById('ilGrid');
    if (grid) grid.setAttribute('data-surface', surface);

    const pillsGroup = btn.closest('.pills');
    if (pillsGroup) {
      pillsGroup.querySelectorAll('button').forEach(b => {
        const isOn = (b as HTMLElement).dataset.surface === surface;
        b.classList.toggle('on', isOn);
        b.setAttribute('aria-checked', String(isOn));
      });
    }
  });

  // Search
  const search = document.getElementById('ilSearch') as HTMLInputElement | null;
  const grid = document.getElementById('ilGrid');
  const count = document.getElementById('ilCount');
  if (search && grid) {
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase().trim();
      const cards = grid.querySelectorAll<HTMLElement>('.il-card');
      let visible = 0;
      cards.forEach(card => {
        const name = card.dataset.name || '';
        const match = !q || name.includes(q);
        card.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      if (count) count.textContent = `${visible} illustration${visible !== 1 ? 's' : ''}`;
    });
  }

  // Click to copy SVG with resolved hex colors — delegated on #page
  const COLOR_MAP: Record<string, Record<string, string>> = {
    light: {
      'var(--icon-accent)': '#5BA7FF',
      'var(--icon-line)':   '#111111',
      'var(--icon-fill)':   '#E2E8EF',
      'var(--icon-bg)':     '#FFFFFF',
    },
    dark: {
      'var(--icon-accent)': '#5BA7FF',
      'var(--icon-line)':   '#FFFFFF',
      'var(--icon-fill)':   '#3E4853',
      'var(--icon-bg)':     '#1B1F23',
    },
  };

  pageEl.addEventListener('click', (e) => {
    const card = (e.target as HTMLElement).closest('.il-card') as HTMLElement;
    if (!card) return;
    const name = card.dataset.name || '';
    const raw = illustrationMap[name] || '';

    const grid = document.getElementById('ilGrid');
    const surface = grid?.getAttribute('data-surface') === 'dark' ? 'dark' : 'light';
    const colors = COLOR_MAP[surface];

    const svg = raw
      .replace(/var\(--icon-[a-z]+\)/g, match => colors[match] || match)
      .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" ');

    copyToClipboard(svg);

    // Checkmark feedback on the card icon
    const copyEl = card.querySelector('.il-card__copy') as HTMLElement | null;
    if (copyEl) {
      copyEl.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      copyEl.classList.add('copied');
      setTimeout(() => {
        copyEl.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
        copyEl.classList.remove('copied');
      }, 1200);
    }

    const thumbBg = surface === 'dark' ? '#1B1F23' : '#FFFFFF';
    const thumbBorder = surface === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';
    const mini = svg.replace(/width="64" height="64" /, '');
    showToast(`<span class="copy-toast__thumb" style="background:${thumbBg};border:1px solid ${thumbBorder}">${mini}</span> Copied: ${name}`);
  });
}

/* ── Export ────────────────────────────────────────────────────────── */

export const illustrationsPage: PageDef = {
  title: 'Illustrations',
  desc: 'Spot art that breathes with your palette. Three layers: accent, line, fill.',
  tabs: ['Catalog', 'Specs'],
  content: [catalogTab, specsTab],
  init: illustrationsInit,
};
