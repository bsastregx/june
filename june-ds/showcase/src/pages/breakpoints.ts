import type { PageDef } from './page-registry.js';
import { copyToClipboard, showToast, snip } from '../utils/clipboard.js';

/* ── Tab 1: Viewport ── */

const viewportTab = `
<style>
.bp-layout-band { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: var(--sp-4); }
.bp-layout-cell { background: var(--card-head); padding: var(--sp-5); display: flex; flex-direction: column; gap: var(--sp-2); border-radius: var(--r-md); }
.bp-layout-cell__range { font-family: var(--font-mono); font-size: 12px; font-weight: 600; color: var(--black); letter-spacing: -.01em; }
.bp-layout-cell__label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .07em; color: var(--grey-500); }
.bp-layout-cell__desc { font: var(--body-xs); font-weight: 400; color: var(--grey-600); margin-top: var(--sp-1); }
.bp-layout-cell__tok { margin-top: auto; padding-top: var(--sp-3); }
.bp-layout-cell .tok { background: var(--card); border: 1px solid var(--card-border); }
.bp-layout-cell--active { background: var(--grey-50); }
.bp-pill { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 10px; border-radius: var(--r-full); background: #e5eeff; color: #2a3460; border: 1px solid #5b7ccc; width: fit-content; }
</style>

<div class="vcard" style="margin-bottom: var(--sp-5);">
  <div class="vcard__head">
    <span class="vcard__name">Layout breakpoints</span>
    <span style="font-size:12px; color:var(--grey-600); margin-left:auto;">2 points where layout changes</span>
  </div>
  <div class="vcard__body" style="padding: var(--sp-5);">
    <div class="bp-layout-band">
      <div class="bp-layout-cell">
        <div class="bp-pill">Mobile</div>
        <div class="bp-layout-cell__range">&lt; 640px</div>
        <div class="bp-layout-cell__desc">Single column. Reduced typography and padding.</div>
        <div class="bp-layout-cell__tok">${snip('max-width: 639px', 'max-width: 639px')}</div>
      </div>
      <div class="bp-layout-cell">
        <div class="bp-pill">Tablet</div>
        <div class="bp-layout-cell__range">640px – 759px</div>
        <div class="bp-layout-cell__desc">Single column. Image below content.</div>
        <div class="bp-layout-cell__tok">${snip('--bp-tablet', '--bp-tablet')}</div>
      </div>
      <div class="bp-layout-cell">
        <div class="bp-pill">Desktop</div>
        <div class="bp-layout-cell__range">≥ 760px</div>
        <div class="bp-layout-cell__desc">Two columns. Image on left or right.</div>
        <div class="bp-layout-cell__tok">${snip('--bp-desktop', '--bp-desktop')}</div>
      </div>
    </div>
    <div class="code-snippet" style="margin-top: var(--sp-4);">
      <div class="code-snippet__head">
        <span class="code-snippet__label">CSS</span>
        <button class="code-snippet__copy" data-copy-snippet="bp-css-example">Copy</button>
      </div>
      <pre class="code-snippet__pre"><code id="bp-css-example"><span class="ck">.lam-container</span> { <span class="ck">flex-direction</span>: <span class="cv">row</span>; } <span class="cc">/* desktop: 2 columns */</span>

<span class="ck">@media (max-width: 759px)</span> { <span class="cc">/* tablet */</span>
  <span class="ck">.lam-container</span> { <span class="ck">flex-direction</span>: <span class="cv">column</span>; }
}
<span class="ck">@media (max-width: 639px)</span> { <span class="cc">/* mobile */</span>
  <span class="ck">.lam-title</span> { <span class="ck">font-size</span>: <span class="cn">26px</span>; }
}</code></pre>
    </div>
  </div>
</div>
`;

/* ── Tab 2: Content widths ── */

const widths: [string, string, number][] = [
  ['xxs', '--bp-desktop-xs',  380],
  ['xs',  '--bp-desktop-s',   440],
  ['s',   '--bp-desktop-m',   512],
  ['m',   '--bp-desktop-l',   640],
  ['l',   '--bp-desktop-xl',  760],
  ['xl',  '--bp-desktop-2xl', 940],
  ['xxl', '--bp-desktop-3xl', 1440],
];

const contentWidthsTab = `
<div class="vcard" style="margin-bottom:var(--sp-5)">
  <div class="vcard__head"><span class="vcard__name">Named content widths</span><span style="font-size:12px;color:var(--grey-600);font-weight:400;margin-left:8px">Desktop only · 7 sizes</span></div>
  <div class="vcard__body" style="padding:0">
    <table class="tok-table">
      <thead><tr><th>Name</th><th>Token</th><th>Desktop</th></tr></thead>
      <tbody>
${widths.map(([name, token, px]) => `        <tr><td><code class="tok tok--static">${name}</code></td><td>${snip(token, token)}</td><td>${px}px</td></tr>`).join('\n')}
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Collapse behavior</span></div>
  <div class="vcard__body" style="padding:var(--sp-5);">
    <div style="font:var(--body-xs);font-weight:400;color:var(--grey-600)">
      <p style="margin-bottom:12px"><strong>Tablet.</strong> All sizes collapse to 640px, except xxl which becomes 768px.</p>
      <p style="margin-bottom:12px"><strong>Mobile.</strong> All sizes collapse to 380px, except xxl which becomes 428px.</p>
      <p><strong>Not yet adopted.</strong> These tokens are available but not adopted yet by components. The content widths only differentiate in desktop.</p>
    </div>
  </div>
</div>
`;

function breakpointsInit(): void {
  document.getElementById('page')?.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest('[data-copy-snippet]') as HTMLElement;
    if (el) {
      const id = el.dataset.copySnippet;
      const src = id ? document.getElementById(id) : null;
      if (src) { copyToClipboard(src.textContent || ''); showToast('Copied!'); }
    }
  });
}

export const breakpointsPage: PageDef = {
  title: 'Breakpoints',
  desc: 'Where layouts adapt. From phone to widescreen, nothing breaks.',
  tabs: ['Viewport', 'Content widths'],
  content: [viewportTab, contentWidthsTab],
  init: breakpointsInit,
};
