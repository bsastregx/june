import type { PageDef } from './page-registry.js';
import { hlHTML } from '../utils/syntax-highlight.js';
import { setupRadioGroup } from '../utils/helpers.js';
import { copyToClipboard, showToast, snip, snipColor } from '../utils/clipboard.js';
import { chevronSmall, desktopIcon20, tabletIcon20, phoneIcon20 } from '@june-ds/icons/icons.js';

// ── Eyebrow icon (sparkle, sized to match bellIcon at 18×18) ──

const newIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2 6.5L21 12l-7 2.5L12 21l-2-6.5L3 12l7-2.5z"/></svg>';

// ── Module-level state ──

let islDevice = 'desktop';
let islWidth = 1440;
let islTextPos = 'left';
let islTabletMedia = 'bottom';
let islShowEyebrow = true;
let islShowKicker = true;
let islAbort: AbortController | null = null;

// ── Sample image ──

const ISL_SAMPLE_IMG = '/lam-sample.png';

// ── Logo placeholder (checkerboard) ──

const logoPlaceholder =
  '<div style="width:120px;height:36px;border-radius:var(--r-xs);' +
  'background-image:linear-gradient(45deg,var(--grey-200) 25%,transparent 25%),' +
  'linear-gradient(-45deg,var(--grey-200) 25%,transparent 25%),' +
  'linear-gradient(45deg,transparent 75%,var(--grey-200) 75%),' +
  'linear-gradient(-45deg,transparent 75%,var(--grey-200) 75%);' +
  'background-size:10px 10px;background-position:0 0,0 5px,5px -5px,-5px 0;' +
  'background-color:var(--grey-50);"></div>';

// ── Eyebrow text ──

const eyebrowText = 'AI-powered features available';

// ── Viewport management ──

function islSetViewport(w: number, el?: HTMLElement): void {
  islWidth = w;
  islDevice = w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';

  if (el) {
    const bar = el.closest('.lam-device-bar');
    if (bar) bar.querySelectorAll('.lam-device').forEach(b => b.classList.remove('on'));
    el.classList.add('on');
  }

  const viewport = document.getElementById('isl-viewport');
  if (viewport) {
    viewport.setAttribute('data-bp', islDevice);
    if (islDevice === 'desktop') {
      viewport.style.width = '100%';
      viewport.style.maxWidth = 'none';
      viewport.style.margin = '0';
    } else {
      viewport.style.width = w + 'px';
      viewport.style.maxWidth = '100%';
      viewport.style.margin = '0 auto';
    }
    const breakout = document.getElementById('isl-breakout');
    if (breakout) breakout.style.padding = islDevice === 'desktop' ? '0' : '24px';
  }

  // Hide text position control on tablet/mobile (always stacked)
  const posGroup = document.getElementById('isl-pos-group');
  if (posGroup) posGroup.style.display = islDevice === 'desktop' ? 'contents' : 'none';

  // Show media position control on tablet and mobile
  const mediaGroup = document.getElementById('isl-media-group');
  if (mediaGroup) mediaGroup.style.display = (islDevice === 'tablet' || islDevice === 'mobile') ? 'contents' : 'none';

  // Update width label
  const deviceLabel = islDevice.charAt(0).toUpperCase() + islDevice.slice(1);
  const label = document.getElementById('isl-width-label');
  if (label) label.textContent = deviceLabel + ' \u00b7 ' + w + 'px';

  islRender();
}

// ── Render function ──

function islRender(): void {
  const isRight = islTextPos === 'right';

  // On tablet/mobile, --right is driven by media position, not text position
  const useRight = islDevice === 'tablet' || islDevice === 'mobile'
    ? islTabletMedia === 'top'
    : isRight;

  // Update combo label
  const comboEl = document.getElementById('isl-combo-label');
  if (comboEl) {
    const parts = ['Text ' + (isRight ? 'Right' : 'Left')];
    const hidden: string[] = [];
    if (!islShowEyebrow) hidden.push('eyebrow');
    if (!islShowKicker) hidden.push('kicker');
    if (hidden.length) parts.push('-' + hidden.join(' -'));
    comboEl.textContent = parts.join(' \u00b7 ');
  }

  // Build preview HTML
  let h = '<div class="isl">\n';
  h += '  <div class="isl__card' + (useRight ? ' isl__card--right' : '') + '">\n';

  // Text column
  h += '    <div class="isl__text">\n';

  if (islShowEyebrow) {
    h += '      <div class="lam-eyebrow" role="status" aria-label="News: ' + eyebrowText + '">';
    h += '<span class="lam-eyebrow__icon" aria-hidden="true">' + newIcon + '</span>';
    h += '<span class="lam-eyebrow__tag">New</span>';
    h += '<div class="lam-eyebrow__body">';
    h += '<span class="lam-eyebrow__text">' + eyebrowText + '</span>';
    h += '<span class="lam-eyebrow__dash" aria-hidden="true">\u2014</span>';
    h += '<a class="lam-eyebrow__cta" href="#">Read more <span aria-hidden="true">' + chevronSmall + '</span></a>';
    h += '</div></div>\n';
  }

  h += '      <div class="isl__info">\n';
  if (islShowKicker) {
    h += '        <div class="isl__kicker">Productivity</div>\n';
  }
  h += '        <h2 class="isl__title">Develop intelligent enterprise applications</h2>\n';
  h += '        <p class="isl__body">Build smart applications and agents with a platform that combines generative and symbolic AI throughout development.</p>\n';
  h += '      </div>\n';
  h += '      <div class="isl__cta">\n';
  h += '        <button class="jb jb--sec">Get started</button>\n';
  h += '        <button class="jb jb--ter">Learn more</button>\n';
  h += '      </div>\n';
  h += '    </div>\n';

  // Media column
  h += '    <div class="isl__media">\n';
  h += '      <img src="' + ISL_SAMPLE_IMG + '" alt="Platform screenshot" />\n';
  h += '    </div>\n';

  h += '  </div>\n';
  h += '</div>';

  const previewEl = document.getElementById('isl-preview');
  if (previewEl) previewEl.innerHTML = h;

  // ── Generate clean code snippet ──

  let c = '';
  const i = '  ';

  c += '<div class="isl">\n';
  c += i + '<div class="isl__card' + (useRight ? ' isl__card--right' : '') + '">\n';
  c += i + i + '<div class="isl__text">\n';

  if (islShowEyebrow) {
    c += i + i + i + '<div class="lam-eyebrow">\n';
    c += i + i + i + i + '<span class="lam-eyebrow__icon"><!-- icon --></span>\n';
    c += i + i + i + i + '<span class="lam-eyebrow__tag">New</span>\n';
    c += i + i + i + i + '<div class="lam-eyebrow__body">\n';
    c += i + i + i + i + i + '<span class="lam-eyebrow__text">Text</span>\n';
    c += i + i + i + i + i + '<span class="lam-eyebrow__dash">\u2014</span>\n';
    c += i + i + i + i + i + '<a class="lam-eyebrow__cta" href="#">CTA</a>\n';
    c += i + i + i + i + '</div>\n';
    c += i + i + i + '</div>\n';
  }

  c += i + i + i + '<div class="isl__info">\n';
  if (islShowKicker) {
    c += i + i + i + i + '<div class="isl__kicker">Kicker</div>\n';
  }
  c += i + i + i + i + '<h2 class="isl__title">Title</h2>\n';
  c += i + i + i + i + '<p class="isl__body">Body text</p>\n';
  c += i + i + i + '</div>\n';
  c += i + i + i + '<div class="isl__cta">\n';
  c += i + i + i + i + '<button class="jb jb--sec">Secondary</button>\n';
  c += i + i + i + i + '<button class="jb jb--ter">Tertiary</button>\n';
  c += i + i + i + '</div>\n';
  c += i + i + '</div>\n';
  c += i + i + '<div class="isl__media">\n';
  c += i + i + i + '<img src="..." alt="..." />\n';
  c += i + i + '</div>\n';
  c += i + '</div>\n';
  c += '</div>';

  const codeEl = document.getElementById('isl-code');
  if (codeEl) codeEl.innerHTML = hlHTML(c);
}

// ── Init ──

function islInit(): void {
  // Reset state
  islWidth = 1440;
  islDevice = 'desktop';
  islTextPos = 'left';
  islTabletMedia = 'bottom';
  islShowEyebrow = true;
  islShowKicker = true;
  islRender();

  // Reset width label
  const wl = document.getElementById('isl-width-label');
  if (wl) wl.textContent = 'Desktop \u00b7 1440px';

  // Wire up device bar buttons
  const deviceBar = document.getElementById('isl-device-bar');
  if (deviceBar) {
    deviceBar.querySelectorAll<HTMLButtonElement>('.lam-device').forEach(btn => {
      btn.addEventListener('click', () => {
        const w = parseInt(btn.dataset.width || '1440', 10);
        deviceBar.querySelectorAll('.lam-device').forEach(b => {
          b.classList.remove('on');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('on');
        btn.setAttribute('aria-checked', 'true');
        islSetViewport(w, btn);
      });
    });
  }

  // Wire up text position pills
  const posPills = document.getElementById('isl-pos-pills');
  if (posPills) {
    setupRadioGroup(posPills, (btn) => {
      islTextPos = btn.dataset.val || 'left';
      islRender();
    });
  }

  // Wire up media position pills (tablet only)
  const mediaPills = document.getElementById('isl-media-pills');
  if (mediaPills) {
    setupRadioGroup(mediaPills, (btn) => {
      islTabletMedia = btn.dataset.val || 'bottom';
      islRender();
    });
  }

  // Wire up toggle checkboxes
  const toggleMap: Record<string, (val: boolean) => void> = {
    'isl-show-eyebrow': (val) => { islShowEyebrow = val; },
    'isl-show-kicker': (val) => { islShowKicker = val; },
  };
  Object.entries(toggleMap).forEach(([id, setter]) => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (el) {
      el.addEventListener('change', () => {
        setter(el.checked);
        islRender();
      });
    }
  });

  // Wire up copy button
  const copyBtn = document.getElementById('isl-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const codeEl = document.getElementById('isl-code');
      if (codeEl) {
        copyToClipboard(codeEl.textContent || '');
        showToast('Copied!');
      }
    });
  }
}

// ── Template: Preview ──

const islPreview = `
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="isl-device-bar" role="radiogroup" aria-label="Device size">
      <button class="lam-device on" data-width="1440" role="radio" aria-checked="true" aria-label="Desktop 1440px" title="Desktop 1440px">
        ${desktopIcon20}
      </button>
      <button class="lam-device" data-width="768" role="radio" aria-checked="false" aria-label="Tablet 768px" title="Tablet 768px">
        ${tabletIcon20}
      </button>
      <button class="lam-device" data-width="428" role="radio" aria-checked="false" aria-label="Mobile 428px" title="Mobile 428px">
        ${phoneIcon20}
      </button>
    </div>
    <span id="isl-pos-group" style="display:contents;">
      <span class="pg-controls__sep"></span>
      <span class="pg-controls__label">Text Position</span>
      <div class="btn-pills" id="isl-pos-pills" role="radiogroup" aria-label="Text position">
        <button class="on" data-val="left" role="radio" aria-checked="true">Left</button>
        <button data-val="right" role="radio" aria-checked="false">Right</button>
      </div>
    </span>
    <span id="isl-media-group" style="display:none;">
      <span class="pg-controls__sep"></span>
      <span class="pg-controls__label">Media</span>
      <div class="btn-pills" id="isl-media-pills" role="radiogroup" aria-label="Media position">
        <button data-val="top" role="radio" aria-checked="false">Top</button>
        <button class="on" data-val="bottom" role="radio" aria-checked="true">Bottom</button>
      </div>
    </span>
  </div>
</div>

<div class="pg-preview">
  <div class="lam-breakout" id="isl-breakout" style="padding:0;">
    <div class="lam-viewport" id="isl-viewport" data-bp="desktop">
      <div class="lam-preview-frame" id="isl-preview" data-surface="light"></div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="isl-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="isl-sticky">
  <span class="pg-controls__label pg-controls__stencil">Island</span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="isl-show-eyebrow" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Eyebrow</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="isl-show-kicker" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Kicker</label>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button class="code-snippet__copy" id="isl-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="isl-code"></code></pre>
</div>
`;

// ── Template: Specs ──

const islSpecs = `
<div class="anatomy-wrap" style="margin-bottom:var(--sp-5);">
  <div class="anatomy__head"><span class="anatomy__head-title">Anatomy</span></div>
  <div class="anatomy__content" style="padding:var(--sp-5);overflow-x:auto;">
    <pre class="anatomy__tree"><span style="color:var(--black);font-weight:500;">Island</span>
\u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Card</span> (grey-50, border-radius r-xl)
\u2502   \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Text</span> (padding sp-10 / sp-8 responsive)
\u2502   \u2502   \u251c\u2500\u2500 Logo <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u2502   \u2502   \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Eyebrow</span> <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u2502   \u2502   \u2502   \u251c\u2500\u2500 Icon (32\u00d732)
\u2502   \u2502   \u2502   \u251c\u2500\u2500 Tag \u2192 body-m
\u2502   \u2502   \u2502   \u251c\u2500\u2500 Text \u2192 body-s
\u2502   \u2502   \u2502   \u2514\u2500\u2500 CTA \u2192 body-s-strong
\u2502   \u2502   \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Information</span>
\u2502   \u2502   \u2502   \u251c\u2500\u2500 Kicker \u2192 highlight-m <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u2502   \u2502   \u2502   \u251c\u2500\u2500 Title \u2192 h1 (responsive)
\u2502   \u2502   \u2502   \u2514\u2500\u2500 Body \u2192 body-l (desktop) / highlight-l (tablet)
\u2502   \u2502   \u2514\u2500\u2500 CTA (secondary + tertiary buttons)
\u2502   \u2514\u2500\u2500 <span style="color:var(--black);font-weight:500;">Media</span> (edge-to-edge, object-fit cover)
    </pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Properties</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Values</th><th>Effect</th></tr></thead>
      <tbody>
        <tr><td>Text Position</td><td>Left, Right</td><td>Reverses the order of the text/media columns (row-reverse).</td></tr>
        <tr><td>Logo</td><td>Visible / Hidden</td><td>Logo or image above the eyebrow.</td></tr>
        <tr><td>Eyebrow</td><td>Visible / Hidden</td><td>Eyebrow component with icon, tag, text and CTA.</td></tr>
        <tr><td>Kicker</td><td>Visible / Hidden</td><td>Pre-title text in the information area.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Tokens & Spacing</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Element</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Section padding (desktop)</td><td>128px ${snip('--sp-10', '--sp-10')}</td></tr>
        <tr><td>Section padding (tablet)</td><td>80px 64px ${snip('--sp-9', '--sp-9')} ${snip('--sp-8', '--sp-8')}</td></tr>
        <tr><td>Section padding (mobile)</td><td>64px 24px ${snip('--sp-8', '--sp-8')} ${snip('--sp-5', '--sp-5')}</td></tr>
        <tr><td>Section background</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')} (light) / <span class="sw" style="background:#212121"></span>${snipColor('#212121')} (dark) ${snip('--card', '--card')}</td></tr>
        <tr><td>Card background</td><td><span class="sw" style="background:#F7F7F7;border:1px solid #e0e0e0"></span>${snipColor('#F7F7F7')} ${snip('--grey-50', '--grey-50')}</td></tr>
        <tr><td>Card border-radius (desktop)</td><td>32px ${snip('--r-3xl', '--r-3xl')}</td></tr>
        <tr><td>Card border-radius (tablet)</td><td>24px ${snip('--r-2xl', '--r-2xl')}</td></tr>
        <tr><td>Card border-radius (mobile)</td><td>16px ${snip('--r-xl', '--r-xl')}</td></tr>
        <tr><td>Text padding (desktop)</td><td>128px block, 64px inline ${snip('--sp-10', '--sp-10')} / ${snip('--sp-8', '--sp-8')}</td></tr>
        <tr><td>Text padding (tablet)</td><td>64px block, 32px inline ${snip('--sp-8', '--sp-8')} / ${snip('--sp-6', '--sp-6')}</td></tr>
        <tr><td>Text padding (mobile)</td><td>48px block, 24px inline ${snip('--sp-7', '--sp-7')} / ${snip('--sp-5', '--sp-5')}</td></tr>
        <tr><td>Text gap</td><td>32px ${snip('--sp-6', '--sp-6')}</td></tr>
        <tr><td>Info gap</td><td>16px ${snip('--sp-4', '--sp-4')}</td></tr>
        <tr><td>CTA gap</td><td>24px ${snip('--sp-5', '--sp-5')}</td></tr>
        <tr><td>Eyebrow</td><td>lam-eyebrow component (see Eyebrow docs)</td></tr>
        <tr><td>Kicker (desktop/tablet)</td><td>Light (300) · 20px/30px · Graphik ${snip('--highlight-m', '--highlight-m')}</td></tr>
        <tr><td>Kicker (mobile)</td><td>Light (300) · 17px/26px · Graphik ${snip('--highlight-s', '--highlight-s')}</td></tr>
        <tr><td>Title</td><td>Semibold (600) · 36px/48px · Graphik ${snip('--h2', '--h2')}</td></tr>
        <tr><td>Body</td><td>Light (300) · 17px/26px · Rubik ${snip('--body-m', '--body-m')}</td></tr>
        <tr><td>Media</td><td>Edge-to-edge, object-fit cover</td></tr>
      </tbody>
    </table>
  </div>
</div>
`;

// ── Page export ──

export const islandPage: PageDef = {
  title: 'Island',
  desc: 'Content meets media in a rounded card \u2014 compact, versatile, always on brand.',
  tabs: ['Preview', 'Specs'],
  content: [islPreview, islSpecs],
  wide: true,
  brandAware: true,
  init: () => {
    islInit();
  },
};
