import type { PageDef } from './page-registry.js';
import { hlHTML } from '../utils/syntax-highlight.js';
import { copyToClipboard, showToast, snip, snipColor } from '../utils/clipboard.js';
import { bellIcon, chevronSmall } from '@june-ds/icons/icons.js';

// ── Preview playground HTML ──

const ebPreview = `
<div class="pg-controls">
  <div class="pg-controls__row">
    <div class="pg-controls__group"><label style="font-size:11px;color:var(--grey-500);font-family:var(--font-mono);">Tag</label><input type="text" value="New" id="eb-tag-text" class="eb-input" style="width:80px;" /></div>
    <div class="pg-controls__group"><label style="font-size:11px;color:var(--grey-500);font-family:var(--font-mono);">Body</label><input type="text" value="Globant Enterprise AI is here" id="eb-text" class="eb-input" style="width:240px;" /></div>
    <div class="pg-controls__group"><label style="font-size:11px;color:var(--grey-500);font-family:var(--font-mono);">CTA</label><input type="text" value="Read more" id="eb-cta-text" class="eb-input" style="width:100px;" /></div>
  </div>
</div>

<div class="pg-preview" id="eb-pg-preview" style="display:flex; align-items:center; justify-content:center; min-height:240px; padding:40px 24px; background:var(--blue-900, #151F2B); --eyebrow-fill:rgba(180,210,255,0.2);" data-surface="dark">
  <div id="eb-preview"></div>
</div>

<div class="pg-sticky" id="eb-sticky">
  <span class="pg-controls__label pg-controls__stencil">Eyebrow</span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="eb-icon" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Icon</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="eb-tag" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Tag</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="eb-cta" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>CTA</label>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button class="code-snippet__copy" id="eb-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="eb-code"></code></pre>
</div>
`;

// ── Specs tab: anatomy + properties + specs + tokens ──

const ebSpecs = `
<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Component tree</span></div>
  <div class="vcard__body" style="padding:24px;">
    <pre class="anatomy__tree">Eyebrow
\u251c\u2500\u2500 Icon (optional)
\u2502   \u2514\u2500\u2500 SVG 18\u00d718 in circle 32\u00d732
\u251c\u2500\u2500 Tag (optional)
\u2502   \u2514\u2500\u2500 Text label ("New", "Beta", etc.)
\u251c\u2500\u2500 Body
\u2502   \u251c\u2500\u2500 Text (news/announcement)
\u2502   \u251c\u2500\u2500 Dash "\u2014" (if CTA present)
\u2502   \u2514\u2500\u2500 CTA (optional)
\u2502       \u251c\u2500\u2500 Label
\u2502       \u2514\u2500\u2500 Chevron icon</pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Properties</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Values</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td>Icon</td><td>true / false</td><td>Circular icon on the left</td></tr>
        <tr><td>Tag</td><td>true / false</td><td>Highlighted label (e.g. "New", "Beta")</td></tr>
        <tr><td>Tag Text</td><td>string</td><td>Tag text. Default: "New"</td></tr>
        <tr><td>Text</td><td>string</td><td>Announcement text. Truncates with ellipsis</td></tr>
        <tr><td>CTA</td><td>true / false</td><td>Call to action with chevron</td></tr>
        <tr><td>CTA Text</td><td>string</td><td>CTA label. Default: "Read more"</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Specifications</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Padding</td><td>8px 16px 8px 8px ${snip('--sp-2', '--sp-2')} ${snip('--sp-4', '--sp-4')}</td></tr>
        <tr><td>Gap</td><td>8px ${snip('--sp-2', '--sp-2')}</td></tr>
        <tr><td>Border</td><td>0.5px solid ${snip('--black', '--black')}</td></tr>
        <tr><td>Border radius</td><td>100px ${snip('--r-full', '--r-full')}</td></tr>
        <tr><td>Icon size</td><td>32\u00d732px, border-radius: 50%</td></tr>
        <tr><td>Icon background</td><td><span class="sw" style="background:#e0e0e0"></span>${snip('--eyebrow-fill', '--eyebrow-fill')} fallback ${snip('--card-border', '--card-border')}</td></tr>
        <tr><td>Tag font</td><td>Light (300) · 14px/22px · Rubik ${snip('--body-s', '--body-s')}</td></tr>
        <tr><td>Tag padding</td><td>2px 8px</td></tr>
        <tr><td>Tag background</td><td><span class="sw" style="background:#e0e0e0"></span>${snip('--eyebrow-fill', '--eyebrow-fill')} fallback ${snip('--card-border', '--card-border')}</td></tr>
        <tr><td>Tag border-radius</td><td>4px ${snip('--r-xs', '--r-xs')}</td></tr>
        <tr><td>Text font</td><td>Light (300) · 12px/20px · Rubik ${snip('--body-xs', '--body-xs')}</td></tr>
        <tr><td>CTA font</td><td>Medium (500) · 12px/20px · Rubik ${snip('--body-xs-strong', '--body-xs-strong')}</td></tr>
        <tr><td>Chevron</td><td>6\u00d79px</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Surface adaptation</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Surface</th><th>Custom property</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td style="font-weight:600"><span class="sw" style="background:#fff;border:1px solid #e0e0e0;"></span>Light</td><td>${snip('--eyebrow-fill', '--eyebrow-fill')}</td><td>Not defined \u2014 falls back to ${snip('--card-border', '--card-border')}</td></tr>
        <tr style="border-bottom:none"><td rowspan="2" style="font-weight:600;border-bottom:1px solid var(--card-border)"><span class="sw" style="background:#151F2B;border:1px solid var(--grey-300);"></span>Dark</td><td style="border-bottom:none">${snip('--eyebrow-fill', '--eyebrow-fill')}</td><td style="border-bottom:none"><span class="sw" style="background:rgba(180,210,255,0.2);border:1px solid #e0e0e0;"></span><code class="tok tok--static">rgba(180,210,255,0.2)</code> \u2014 background tint</td></tr>
        <tr><td>Border (CSS rule)</td><td><span class="sw" style="background:rgba(255,255,255,0.25);border:1px solid #e0e0e0"></span><code class="tok tok--static">rgba(255,255,255,0.25)</code> \u2014 automatic via <code>[data-surface="dark"]</code></td></tr>
        <tr><td style="font-weight:600"><span class="sw" style="background:#E5EEFF;border:1px solid #e0e0e0;"></span>Accent</td><td>${snip('--eyebrow-fill', '--eyebrow-fill')}</td><td><span class="sw" style="background:rgba(0,60,180,0.18);border:1px solid #e0e0e0;"></span><code class="tok tok--static">rgba(0,60,180,0.18)</code> \u2014 background tint</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Design Tokens</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
      <tbody>
        <tr><td>${snip('--sp-2', '--sp-2')}</td><td>8px</td><td>Vertical padding, gap between elements</td></tr>
        <tr><td>${snip('--sp-4', '--sp-4')}</td><td>16px</td><td>Right horizontal padding</td></tr>
        <tr><td>${snip('--r-full', '--r-full')}</td><td>100px</td><td>Container border radius</td></tr>
        <tr><td>${snip('--r-xs', '--r-xs')}</td><td>4px</td><td>Tag border radius</td></tr>
        <tr><td>${snip('--black', '--black')}</td><td>var(--black)</td><td>Border color, text, icons</td></tr>
        <tr><td>${snip('--eyebrow-fill', '--eyebrow-fill')}</td><td>var(--card-border)</td><td>Icon and tag background (overrideable by stencil)</td></tr>
        <tr><td>${snip('--card-border', '--card-border')}</td><td><span class="sw" style="background:#e0e0e0"></span>#e0e0e0</td><td>Fallback when --eyebrow-fill is not defined</td></tr>
        <tr><td>${snip('--body-s', '--body-s')}</td><td>Light (300) · 14px/22px · Rubik</td><td>Tag font</td></tr>
        <tr><td>${snip('--body-xs', '--body-xs')}</td><td>Light (300) · 12px/20px · Rubik</td><td>Text font</td></tr>
        <tr><td>${snip('--body-xs-strong', '--body-xs-strong')}</td><td>Medium (500) · 12px/20px · Rubik</td><td>CTA font</td></tr>
      </tbody>
    </table>
  </div>
</div>
`;

// ── Render logic ──

function ebRender(): void {
  const iconEl = document.getElementById('eb-icon') as HTMLInputElement | null;
  const tagEl = document.getElementById('eb-tag') as HTMLInputElement | null;
  const ctaEl = document.getElementById('eb-cta') as HTMLInputElement | null;
  const tagTextEl = document.getElementById('eb-tag-text') as HTMLInputElement | null;
  const textEl = document.getElementById('eb-text') as HTMLInputElement | null;
  const ctaTextEl = document.getElementById('eb-cta-text') as HTMLInputElement | null;

  if (!iconEl || !tagEl || !ctaEl || !tagTextEl || !textEl || !ctaTextEl) return;

  const hasIcon = iconEl.checked;
  const hasTag = tagEl.checked;
  const hasCta = ctaEl.checked;
  const tagText = tagTextEl.value || 'New';
  const text = textEl.value || 'Announcement text';
  const ctaText = ctaTextEl.value || 'Read more';

  const cls = ['lam-eyebrow'];
  if (!hasIcon) cls.push('lam-eyebrow--no-icon');

  // Build live preview HTML
  let h = '<div class="' + cls.join(' ') + '" role="status">';
  if (hasIcon) h += '<span class="lam-eyebrow__icon" aria-hidden="true">' + bellIcon + '</span>';
  if (hasTag) h += '<span class="lam-eyebrow__tag">' + tagText + '</span>';
  h += '<div class="lam-eyebrow__body">';
  h += '<span class="lam-eyebrow__text">' + text + '</span>';
  if (hasCta) {
    h += '<span class="lam-eyebrow__dash" aria-hidden="true">\u2014</span>';
    h += '<a class="lam-eyebrow__cta" href="#">' + ctaText + ' <span aria-hidden="true">' + chevronSmall + '</span></a>';
  }
  h += '</div></div>';

  const previewEl = document.getElementById('eb-preview');
  if (previewEl) previewEl.innerHTML = h;

  // Build clean code snippet
  let code = '<div class="' + cls.join(' ') + '">\n';
  if (hasIcon) code += '  <span class="lam-eyebrow__icon"><!-- bell icon --></span>\n';
  if (hasTag) code += '  <span class="lam-eyebrow__tag">' + tagText + '</span>\n';
  code += '  <div class="lam-eyebrow__body">\n';
  code += '    <span class="lam-eyebrow__text">' + text + '</span>\n';
  if (hasCta) {
    code += '    <span class="lam-eyebrow__dash">\u2014</span>\n';
    code += '    <a class="lam-eyebrow__cta" href="#">' + ctaText + ' \u203a</a>\n';
  }
  code += '  </div>\n</div>';

  const codeEl = document.getElementById('eb-code');
  if (codeEl) codeEl.innerHTML = hlHTML(code);
}

/* ebReset removed — simplified UI no longer needs a reset button */

// ── Page definition ──

export const eyebrowPage: PageDef = {
  title: 'Eyebrow',
  desc: 'The quiet attention-grabber. An inline banner with icon, tag, and call to action.',
  tabs: ['Preview', 'Specs'],
  content: [ebPreview, ebSpecs],
  init() {
    // Wire up toggle checkboxes
    const toggleIds = ['eb-icon', 'eb-tag', 'eb-cta'];
    toggleIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', ebRender);
    });

    // Wire up text inputs
    const inputIds = ['eb-tag-text', 'eb-text', 'eb-cta-text'];
    inputIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', ebRender);
    });

    // Wire up copy button
    const copyBtn = document.getElementById('eb-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const codeEl = document.getElementById('eb-code');
        if (codeEl) {
          copyToClipboard(codeEl.textContent || '');
          showToast('Copied!');
        }
      });
    }

    // Initial render
    ebRender();
  },
};
