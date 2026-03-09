import type { PageDef } from './page-registry.js';
import { copyToClipboard, showToast, clipSvg } from '../utils/clipboard.js';
import tokens from '../../../packages/june-ds/src/tokens/tokens.json';

/* ── Flat token map for swatch hex lookup ────────── */

const tokenMap: Record<string, string> = {};
// Foundation
for (const [k, v] of Object.entries(tokens.color.foundation)) {
  if (k.startsWith('$')) continue;
  tokenMap[k] = (v as any).$value;
}
// Neutral
for (const [k, v] of Object.entries(tokens.color.neutral)) {
  if (k.startsWith('$')) continue;
  tokenMap[k] = (v as any).$value;
}
// Surface
for (const [k, v] of Object.entries(tokens.color.surface)) {
  if (k.startsWith('$')) continue;
  tokenMap[k] = (v as any).$value;
}
// Accent
for (const [k, v] of Object.entries(tokens.color.accent)) {
  if (k.startsWith('$')) continue;
  tokenMap[k] = (v as any).$value;
}
// State
for (const [k, v] of Object.entries(tokens.color.state)) {
  if (k.startsWith('$')) continue;
  tokenMap[k] = (v as any).$value;
}
// Text-icon-border
for (const [k, v] of Object.entries(tokens.color['text-icon-border'])) {
  if (k.startsWith('$')) continue;
  tokenMap[k] = (v as any).$value;
}

/* ── Color utilities ──────────────────────────────── */

function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map(i => {
    const s = parseInt(h.substring(i, i + 2), 16) / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isLight(hex: string): boolean {
  if (!hex.startsWith('#')) return true;  // rgba / non-hex → treat as light (add border)
  return luminance(hex) > 0.179;
}

/* ── Brand config (single source of truth) ────────── */

const BRANDS = {
  gx: { primary: tokens.color.brand.gx.base.$value, hover: tokens.color.brand.gx.hover.$value, onPrimary: tokens.color.brand.gx.on.$value,
         alias: 'fuchsia-500', hoverAlias: 'fuchsia-700', onPrimaryAlias: 'white' },
  nx: { primary: tokens.color.brand.nx.base.$value, hover: tokens.color.brand.nx.hover.$value, onPrimary: tokens.color.brand.nx.on.$value,
         alias: 'royal-blue-500', hoverAlias: 'royal-blue-700', onPrimaryAlias: 'black' },
  ge: { primary: tokens.color.brand.ge.base.$value, hover: tokens.color.brand.ge.hover.$value, onPrimary: tokens.color.brand.ge.on.$value,
         alias: 'lime-500', hoverAlias: 'lime-700', onPrimaryAlias: 'black' },
};
const B = BRANDS;
type Brand = typeof B.gx;
const pri = (b: Brand): [string, string] => [b.primary, b.alias];
const hov = (b: Brand): [string, string] => [b.hover, b.hoverAlias];
const onP = (b: Brand): [string, string] => [b.onPrimary, b.onPrimaryAlias];

/* ── Accent palette (drives on-accent contrast tables) ──
   Source of truth: tokens.json → color.accent  */

const ACCENTS: [string, string][] = Object.entries(tokens.color.accent)
  .filter(([k]) => !k.startsWith('$'))
  .map(([k, v]) => [k, (v as any).$value]);

/* ── Helper: swatch HTML ───────────────────────── */

function sw(name: string, opts?: { light?: boolean }) {
  const hex = tokenMap[name] || '#000';
  const border = opts?.light ? ';border-bottom:1px solid var(--card-border)' : '';
  // Use CSS token with hex fallback — token is source of truth when available
  const bg = `var(--${name}, ${hex})`;
  return `<div class="swatch"><div class="swatch__color" style="background:${bg}${border}"><button class="swatch__copy" data-copy-color="${hex}">Copy</button></div><div class="swatch__info"><div class="swatch__name">${name}</div><div class="swatch__val">${hex}</div></div></div>`;
}

/* ── Tab 1: Primitivos ─────────────────────────── */
const colorsPrimitives = `
<style>
.swatch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: var(--sp-3); }
.swatch { border-radius: var(--r-md); overflow: hidden; border: 1px solid var(--card-border); }
.swatch__color { height: 72px; position: relative; }
.swatch__info { padding: 10px 12px; background: var(--card); }
.swatch__name { font: var(--body-xs-strong); color: var(--black); margin-bottom: 2px; }
.swatch__val { font-family: var(--font-mono); font-size: 11px; color: var(--grey-600); }
.swatch__copy { position: absolute; top: 6px; right: 6px; background: rgba(0,0,0,0.4); color: #fff; border: none; border-radius: var(--r-xs); padding: 2px 6px; font-size: 11px; font-weight: 600; cursor: pointer; opacity: 0; transition: opacity var(--duration-fast) var(--ease); }
.swatch:hover .swatch__copy { opacity: 1; }
.color-section { margin-bottom: var(--sp-6); }
.color-section__title { font: var(--body-s-strong); color: var(--black); margin-bottom: var(--sp-4); }
.color-section__subtitle { font: var(--body-xs); font-weight: 400; color: var(--grey-600); margin-bottom: var(--sp-3); }
.vcard__sub { font-size: 12px; color: var(--grey-600); font-weight: 400; margin-left: 8px; }
.vcard__body .color-section:last-child { margin-bottom: 0; }
</style>

<!-- ═══ 1. Foundation ═══ -->
<div class="vcard">
  <div class="vcard__head">
    <span class="vcard__name">Foundation</span>
    <span class="vcard__sub">Brand base colors</span>
  </div>
  <div class="vcard__body">
    <div class="color-section">
      <div class="swatch-grid">
        ${sw(B.gx.alias)}
        ${sw(B.gx.hoverAlias)}
        ${sw(B.nx.alias)}
        ${sw(B.nx.hoverAlias)}
        ${sw(B.ge.alias, { light: true })}
        ${sw(B.ge.hoverAlias)}
      </div>
    </div>
    <div class="color-section">
      <div class="color-section__title">Gradient</div>
      <div class="swatch-grid">
        <div class="swatch"><div class="swatch__color" style="background:var(--gradient-blue)"><button class="swatch__copy" data-copy-color="var(--gradient-blue)">Copy</button></div><div class="swatch__info"><div class="swatch__name">gradient-blue</div><div class="swatch__val">148deg · #11151C → #5BA7FF</div></div></div>
      </div>
    </div>
  </div>
</div>

<!-- ═══ 2. Neutral ═══ -->
<div class="vcard">
  <div class="vcard__head">
    <span class="vcard__name">Neutral</span>
    <span class="vcard__sub">Greyscale for text, borders, and backgrounds</span>
  </div>
  <div class="vcard__body">
    <div class="color-section">
      <div class="swatch-grid">
        ${sw('black')}
        ${sw('grey-900')}
        ${sw('grey-800')}
        ${sw('grey-700')}
        ${sw('grey-600')}
        ${sw('grey-500')}
        ${sw('grey-400')}
        ${sw('grey-300', { light: true })}
        ${sw('grey-200', { light: true })}
        ${sw('grey-100', { light: true })}
        ${sw('white', { light: true })}
      </div>
    </div>
  </div>
</div>

<!-- ═══ 3. Surfaces ═══ -->
<div class="vcard">
  <div class="vcard__head">
    <span class="vcard__name">Surfaces</span>
    <span class="vcard__sub">Page backgrounds and surfaces</span>
  </div>
  <div class="vcard__body">
    <div class="color-section">
      <div class="swatch-grid">
        ${sw('june-surface', { light: true })}
        ${sw('surface-alternative', { light: true })}
      </div>
    </div>
  </div>
</div>

<!-- ═══ 4. Accent Colors ═══ -->
<div class="vcard">
  <div class="vcard__head">
    <span class="vcard__name">Accent Colors</span>
    <span class="vcard__sub">Palette for backgrounds, cards, and badges</span>
  </div>
  <div class="vcard__body">
    <div class="color-section">
      <div class="color-section__title">Purple</div>
      <div class="swatch-grid">
        ${sw('purple-900')}
        ${sw('purple-600')}
      </div>
    </div>

    <div class="color-section">
      <div class="color-section__title">Orange</div>
      <div class="swatch-grid">
        ${sw('orange-900')}
        ${sw('orange-500')}
      </div>
    </div>

    <div class="color-section">
      <div class="color-section__title">Green</div>
      <div class="swatch-grid">
        ${sw('green-900')}
        ${sw('green-500')}
        ${sw('green-200', { light: true })}
        ${sw('green-50', { light: true })}
      </div>
    </div>

    <div class="color-section">
      <div class="color-section__title">Blue</div>
      <div class="swatch-grid">
        ${sw('blue-900')}
        ${sw('blue-50', { light: true })}
      </div>
    </div>

  </div>
</div>

<!-- ═══ 5. State ═══ -->
<div class="vcard">
  <div class="vcard__head">
    <span class="vcard__name">State</span>
    <span class="vcard__sub">Visual feedback: errors, success, and alerts</span>
  </div>
  <div class="vcard__body">
    <div class="color-section">
      <div class="swatch-grid">
        ${sw('error')}
        ${sw('success')}
        ${sw('warning')}
      </div>
    </div>
  </div>
</div>

<!-- ═══ 6. Text / Icon / Border ═══ -->
<div class="vcard">
  <div class="vcard__head">
    <span class="vcard__name">Text / Icon / Border</span>
    <span class="vcard__sub">Shared primitives</span>
  </div>
  <div class="vcard__body">
    <div class="color-section">
      <div class="swatch-grid">
        ${sw('positive')}
        ${sw('negative', { light: true })}
        ${sw('disabled')}
      </div>
    </div>
  </div>
</div>
`;

/* ── Semantic table helpers ───────────────────────── */

/** Table cell: swatch dot + hex snippet with copy button */
function semCell(hex: string, alias: string): string {
  const border = isLight(hex) ? 'border:1px solid #e0e0e0;' : '';
  return `<span class="sw" style="background:${hex};${border}"></span><span class="snip" data-copy-color="${hex}"><span class="snip__val">${hex}</span><button class="snip__btn" aria-label="Copy ${hex}">${clipSvg}</button></span>`;
}

/** Row: brand-varying token (3 columns) */
function semRowB(token: string, gx: [string, string], nx: [string, string], ge: [string, string], info?: string): string {
  return `<tr><td><span class="snip" data-copy-token="${token}"><span class="snip__val">${token}</span><button class="snip__btn" aria-label="Copy var(--${token})">${clipSvg}</button></span></td><td class="sem-info">${info || ''}</td><td>${semCell(gx[0], gx[1])}</td><td>${semCell(nx[0], nx[1])}</td><td>${semCell(ge[0], ge[1])}</td></tr>`;
}

/** Row: identical value for all 3 brands */
function semRowAll(token: string, hex: string, alias: string, info?: string): string {
  return semRowB(token, [hex, alias], [hex, alias], [hex, alias], info);
}

/** Section: vcard wrapping a 5-column table */
function semTable(name: string, rows: string): string {
  return `<div class="vcard"><div class="vcard__head"><span class="vcard__name">${name}</span></div><div class="vcard__body" style="padding:0"><table class="tok-table sem-table"><thead><tr><th>Token</th><th>Info</th><th><span class="sem-dot" style="background:var(--gx)"></span>GeneXus</th><th><span class="sem-dot" style="background:var(--nx)"></span>Next</th><th><span class="sem-dot" style="background:var(--ge)"></span>GEAI</th></tr></thead><tbody>
${rows}
</tbody></table></div></div>`;
}


/* ── Tab 2: Semantic ────────────────────────────── */

const colorsSemantic = `
<style>
.sem-table { table-layout: fixed; }
.sem-table th:nth-child(1) { width: 30%; }
.sem-table th:nth-child(2) { width: 20%; }
.sem-table td { font-family: var(--font-mono); font-size: 11px; vertical-align: middle; }
.sem-table td:first-child { font-family: inherit; font-size: inherit; }
.sem-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: var(--sp-2); vertical-align: middle; }
.sem-info { font-family: var(--font-body); font-size: 12px; color: var(--grey-600); font-style: italic; }
</style>

${semTable('Surface', `
${semRowAll('june-surface', '#FFFFFF', 'white', 'Elevaciones via --shadow-* (xs→2xl)')}
${semRowAll('june-surface__alternative', '#F5F5F5', 'grey-100')}
`)}
${semTable('Action', `
${semRowB('june-action__primary', pri(B.gx), pri(B.nx), pri(B.ge))}
${semRowB('june-action__primary--hover', hov(B.gx), hov(B.nx), hov(B.ge))}
${semRowAll('june-action__secondary', '#111111', 'black')}
${semRowAll('june-action__secondary--hover', '#111111', 'black')}
${semRowAll('june-action__secondary--on-dark', '#FFFFFF', 'white', 'Inverts on dark/accent surface')}
${semRowB('june-action__secondary--on-dark--hover', ['#FADFE6', 'color-mix(gx 15%, white)'], ['#E6F2FF', 'color-mix(nx 15%, white)'], ['#F5F9E0', 'color-mix(ge 15%, white)'], 'color-mix(in srgb, brand 15%, #fff)')}
${semRowAll('june-action__disabled', '#EEEEEE', 'grey-200')}
`)}
${semTable('Text', `
${semRowAll('june-text__on-surface', '#111111', 'black')}
${semRowAll('june-text__on-surface--disabled', '#6E7277', 'grey-600')}
${semRowB('june-text__on-action--primary', onP(B.gx), onP(B.nx), onP(B.ge))}
${semRowB('june-text__on-action--primary-hover', onP(B.gx), onP(B.nx), onP(B.ge))}
${semRowAll('june-text__on-action--secondary', '#FFFFFF', 'white')}
${semRowB('june-text__on-action--secondary-hover', pri(B.gx), pri(B.nx), pri(B.ge))}
${semRowAll('june-text__on-action--secondary--on-dark', '#111111', 'black', 'Inverts on dark/accent surface')}
${semRowB('june-text__on-action--secondary--on-dark-hover', pri(B.gx), pri(B.nx), pri(B.ge), 'Brand color on white background')}
${semRowAll('june-text__on-action--disabled', '#969BA0', 'grey-500')}
${semRowAll('june-text-placeholder__on-surface', '#969BA0', 'grey-500', 'Fixed color — light surfaces are always similar')}
${semRowAll('june-text-placeholder__on-primary', 'rgba(255,255,255,0.6)', 'white 60%', 'Opacity instead of fixed color: adapts to any dark/brand background')}
${semRowAll('june-link__content', '#111111', 'black', 'Link — always with underline')}
${semRowB('june-link__content--hover', pri(B.gx), pri(B.nx), pri(B.ge), 'Link hover')}
${semRowAll('june-text__on-background--dark', '#FFFFFF', 'white', 'On dark background')}
${semRowAll('june-text__on-background--light', '#111111', 'black', 'On light background')}
`)}
${semTable('Icon', `
${semRowAll('june-icon__on-surface', '#111111', 'black', 'Action icons')}
${semRowAll('june-icon__on-surface--disabled', '#969BA0', 'grey-500')}
${semRowB('june-icon__on-surface--hover', pri(B.gx), pri(B.nx), pri(B.ge))}
${semRowB('june-icon__primary', pri(B.gx), pri(B.nx), pri(B.ge))}
${semRowB('june-icon__primary--hover', hov(B.gx), hov(B.nx), hov(B.ge))}
${semRowB('june-icon__on-action-primary', onP(B.gx), onP(B.nx), onP(B.ge))}
${semRowAll('june-icon__on-action--secondary', '#FFFFFF', 'white')}
${semRowAll('june-icon__on-action--disabled', '#969BA0', 'grey-500')}
${semRowAll('june-icon__on-background--dark', '#FFFFFF', 'white', 'On dark background')}
${semRowAll('june-icon__on-background--light', '#111111', 'black', 'On light background')}
`)}
${semTable('Border', `
${semRowAll('june-border__on-surface', '#111111', 'black')}
${semRowB('june-border__primary', pri(B.gx), pri(B.nx), pri(B.ge))}
${semRowAll('june-border__neutral-level-1', '#D9D9D9', 'grey-300')}
${semRowAll('june-border__neutral-level-2', '#969BA0', 'grey-500')}
${semRowAll('june-border__disabled', '#B5B5B5', 'grey-400')}
${semRowAll('june-border__on-background--dark', '#FFFFFF', 'white', 'On dark background')}
${semRowAll('june-border__on-background--light', '#111111', 'black', 'On light background')}
`)}
${semTable('State', `
${semRowAll('june-state__error', '#E74131', 'error')}
${semRowAll('june-state__success', '#02A08B', 'success')}
${semRowAll('june-state__warning', '#FF8000', 'warning')}
`)}
`;

/* ── Init ────────────────────────────────────────── */

function colorsInit(): void {
  // Primitive swatch cards — .snip copy handled by global handler in app.ts
  document.getElementById('page')?.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest('.swatch__copy[data-copy-color]') as HTMLElement;
    if (el) {
      copyToClipboard(el.dataset.copyColor!);
      showToast('Copied ' + el.dataset.copyColor);
    }
  });
}

/* ── Export ───────────────────────────────────────── */

export const colorsPage: PageDef = {
  title: 'Colors',
  desc: 'Three brands, one palette. Semantic tokens that shift identity without losing harmony.',
  tabs: ['Primitives', 'Semantic'],
  content: [colorsPrimitives, colorsSemantic],
  init: colorsInit,
};
