import type { PageDef } from './page-registry.js';
import { hlHTML } from '../utils/syntax-highlight.js';
import { setupRadioGroup } from '../utils/helpers.js';
import { copyToClipboard, showToast, snip, snipColor } from '../utils/clipboard.js';
import { desktopIcon20, tabletIcon20, phoneIcon20 } from '@june-ds/icons/icons.js';

// ── Module-level state ──

let satDevice = 'desktop';
let satWidth = 1440;
let satTextPos = 'left';
let satShowIcon = true;
let satShowKicker = true;
let satShowCaption = true;
let satShowFooter = false;
let satAbort: AbortController | null = null;

// ── Icon placeholder (64×64 checkerboard) ──

const iconPlaceholder =
  '<div style="width:64px;height:64px;border-radius:var(--r-xs);' +
  'background-image:linear-gradient(45deg,var(--grey-200) 25%,transparent 25%),' +
  'linear-gradient(-45deg,var(--grey-200) 25%,transparent 25%),' +
  'linear-gradient(45deg,transparent 75%,var(--grey-200) 75%),' +
  'linear-gradient(-45deg,transparent 75%,var(--grey-200) 75%);' +
  'background-size:10px 10px;background-position:0 0,0 5px,5px -5px,-5px 0;' +
  'background-color:var(--grey-50);"></div>';

// ── Sample image ──

const SAT_SAMPLE_IMG = '/lam-sample.png';

// ── Viewport management ──

function satSetViewport(w: number, el?: HTMLElement): void {
  satWidth = w;
  satDevice = w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';

  // Deselect all device buttons
  if (el) {
    const bar = el.closest('.lam-device-bar');
    if (bar) bar.querySelectorAll('.lam-device').forEach(b => b.classList.remove('on'));
    el.classList.add('on');
  }

  const viewport = document.getElementById('sat-viewport');
  if (viewport) {
    viewport.setAttribute('data-bp', satDevice);
    if (satDevice === 'desktop') {
      viewport.style.width = '100%';
      viewport.style.maxWidth = 'none';
      viewport.style.margin = '0';
    } else {
      viewport.style.width = w + 'px';
      viewport.style.maxWidth = '100%';
      viewport.style.margin = '0 auto';
    }
    const breakout = document.getElementById('sat-breakout');
    if (breakout) breakout.style.padding = satDevice === 'desktop' ? '0' : '24px';
  }

  // Hide text position control on tablet/mobile (always stacked)
  const posGroup = document.getElementById('sat-pos-group');
  if (posGroup) posGroup.style.display = satDevice === 'desktop' ? 'contents' : 'none';

  // Update width label
  const deviceLabel = satDevice.charAt(0).toUpperCase() + satDevice.slice(1);
  const label = document.getElementById('sat-width-label');
  if (label) label.textContent = deviceLabel + ' \u00b7 ' + w + 'px';

  satRender();
}

// ── Render function ──

function satRender(): void {
  const isRight = satTextPos === 'right';

  // Update combo label
  const comboEl = document.getElementById('sat-combo-label');
  if (comboEl) {
    const parts = ['Text ' + (isRight ? 'Right' : 'Left')];
    const hidden: string[] = [];
    if (!satShowIcon) hidden.push('icon');
    if (!satShowKicker) hidden.push('kicker');
    if (!satShowCaption) hidden.push('caption');
    if (!satShowFooter) hidden.push('footer');
    if (hidden.length) parts.push('-' + hidden.join(' -'));
    comboEl.textContent = parts.join(' \u00b7 ');
  }

  // Build HTML
  let h = '<div class="sat">\n';

  // Header
  h += '  <div class="sat__header">\n';
  const titleHTML = satDevice === 'mobile'
    ? 'Future-proof enterprise systems. Built fast.<br>Built to last.'
    : 'Future-proof enterprise systems.<br>Built fast. Built to last.';
  h += '    <h1 class="sat__title">' + titleHTML + '</h1>\n';
  h += '    <p class="sat__subtitle">GeneXus is the Agentic Low-Code platform that generates native code, orchestrates AI agents and evolves with your business.</p>\n';
  h += '  </div>\n';

  // Feature
  h += '  <div class="sat__feature' + (isRight ? ' sat__feature--right' : '') + '">\n';

  // Text column
  h += '    <div class="sat__text">\n';
  if (satShowIcon) {
    h += '      <div class="sat__icon"><img src="' + SAT_SAMPLE_IMG + '" alt="" style="width:64px;height:64px;object-fit:cover;border-radius:var(--r-xs);" /></div>\n';
  }
  h += '      <div class="sat__info">\n';
  if (satShowKicker) {
    h += '        <div class="sat__kicker">Productivity</div>\n';
  }
  h += '        <h2 class="sat__feature-title">Develop intelligent enterprise applications</h2>\n';
  h += '        <p class="sat__body">Build smart applications and agents with a platform that combines generative and symbolic AI throughout development. Design assistants that automate tasks and work hand in hand with your people and systems.</p>\n';
  h += '      </div>\n';
  h += '      <div class="sat__cta">\n';
  h += '        <button class="jb jb--sec">Learn more</button>\n';
  h += '        <button class="jb jb--ter">Explore</button>\n';
  h += '      </div>\n';
  h += '    </div>\n';

  // Media column
  h += '    <div class="sat__media">\n';
  h += '      <div class="sat__media-wrap"><img src="' + SAT_SAMPLE_IMG + '" alt="Platform screenshot" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;" /></div>\n';
  if (satShowCaption) {
    h += '      <p class="sat__caption">Powered by deterministic and generative AI.</p>\n';
  }
  h += '    </div>\n';

  h += '  </div>\n';

  // Footer
  if (satShowFooter) {
    h += '  <div class="sat__footer">\n';
    h += '    <button class="jb jb--ter">Explore</button>\n';
    h += '  </div>\n';
  }

  h += '</div>';

  const previewEl = document.getElementById('sat-preview');
  if (previewEl) previewEl.innerHTML = h;

  // ── Generate clean code snippet ──

  let c = '';
  const i = '  ';

  c += '<div class="sat">\n';
  c += i + '<div class="sat__header">\n';
  c += i + i + '<h1 class="sat__title">Main title</h1>\n';
  c += i + i + '<p class="sat__subtitle">Strapline text</p>\n';
  c += i + '</div>\n';
  c += i + '<div class="sat__feature' + (isRight ? ' sat__feature--right' : '') + '">\n';
  c += i + i + '<div class="sat__text">\n';
  if (satShowIcon) {
    c += i + i + i + '<div class="sat__icon"><img src="..." alt="..." /></div>\n';
  }
  c += i + i + i + '<div class="sat__info">\n';
  if (satShowKicker) {
    c += i + i + i + i + '<div class="sat__kicker">Kicker</div>\n';
  }
  c += i + i + i + i + '<h2 class="sat__feature-title">Title</h2>\n';
  c += i + i + i + i + '<p class="sat__body">Body text</p>\n';
  c += i + i + i + '</div>\n';
  c += i + i + i + '<div class="sat__cta">\n';
  c += i + i + i + i + '<button class="jb jb--sec">Label</button>\n';
  c += i + i + i + i + '<button class="jb jb--ter">Label</button>\n';
  c += i + i + i + '</div>\n';
  c += i + i + '</div>\n';
  c += i + i + '<div class="sat__media">\n';
  c += i + i + i + '<div class="sat__media-wrap"><img src="..." alt="..." /></div>\n';
  if (satShowCaption) {
    c += i + i + i + '<p class="sat__caption">Caption text</p>\n';
  }
  c += i + i + '</div>\n';
  c += i + '</div>\n';
  if (satShowFooter) {
    c += i + '<div class="sat__footer">\n';
    c += i + i + '<button class="jb jb--ter">Label +</button>\n';
    c += i + '</div>\n';
  }
  c += '</div>';

  const codeEl = document.getElementById('sat-code');
  if (codeEl) codeEl.innerHTML = hlHTML(c);
}

// ── Init ──

function satInit(): void {
  // Reset state
  satWidth = 1440;
  satDevice = 'desktop';
  satTextPos = 'left';
  satShowIcon = true;
  satShowKicker = true;
  satShowCaption = true;
  satShowFooter = false;
  satRender();

  // Reset width label
  const wl = document.getElementById('sat-width-label');
  if (wl) wl.textContent = 'Desktop \u00b7 1440px';

  // Wire up device bar buttons
  const deviceBar = document.getElementById('sat-device-bar');
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
        satSetViewport(w, btn);
      });
    });
  }

  // Wire up text position pills
  const posPills = document.getElementById('sat-pos-pills');
  if (posPills) {
    setupRadioGroup(posPills, (btn) => {
      satTextPos = btn.dataset.val || 'left';
      satRender();
    });
  }

  // Wire up toggle checkboxes
  const toggleMap: Record<string, (val: boolean) => void> = {
    'sat-show-icon': (val) => { satShowIcon = val; },
    'sat-show-kicker': (val) => { satShowKicker = val; },
    'sat-show-caption': (val) => { satShowCaption = val; },
    'sat-show-footer': (val) => { satShowFooter = val; },
  };
  Object.entries(toggleMap).forEach(([id, setter]) => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (el) {
      el.addEventListener('change', () => {
        setter(el.checked);
        satRender();
      });
    }
  });

  // Wire up copy button
  const copyBtn = document.getElementById('sat-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const codeEl = document.getElementById('sat-code');
      if (codeEl) {
        copyToClipboard(codeEl.textContent || '');
        showToast('Copied!');
      }
    });
  }
}

// ── Template: Preview ──

const satPreview = `
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="sat-device-bar" role="radiogroup" aria-label="Device size">
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
    <span id="sat-pos-group" style="display:contents;">
      <span class="pg-controls__sep"></span>
      <span class="pg-controls__label">Text Position</span>
      <div class="btn-pills" id="sat-pos-pills" role="radiogroup" aria-label="Text position">
        <button class="on" data-val="left" role="radio" aria-checked="true">Left</button>
        <button data-val="right" role="radio" aria-checked="false">Right</button>
      </div>
    </span>
  </div>
</div>

<div class="pg-preview">
  <div class="lam-breakout" id="sat-breakout" style="padding:0;">
    <div class="lam-viewport" id="sat-viewport" data-bp="desktop">
      <div class="lam-preview-frame" id="sat-preview" data-surface="light"></div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="sat-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="sat-sticky">
  <span class="pg-controls__label pg-controls__stencil">Show and Tell</span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="sat-show-icon" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Icon</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="sat-show-kicker" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Kicker</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="sat-show-caption" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Caption</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" id="sat-show-footer" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>View more (CTA)</label>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button class="code-snippet__copy" id="sat-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="sat-code"></code></pre>
</div>
`;

// ── Template: Specs ──

const satSpecs = `
<div class="anatomy-wrap" style="margin-bottom:var(--sp-5);">
  <div class="anatomy__head"><span class="anatomy__head-title">Anatomy</span></div>
  <div class="anatomy__content" style="padding:var(--sp-5);overflow-x:auto;">
    <pre class="anatomy__tree"><span style="color:var(--black);font-weight:500;">ShowAndTell</span>
\u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Header</span> (centered, 940px max)
\u2502   \u251c\u2500\u2500 Title \u2192 h2 (responsive alias)
\u2502   \u2514\u2500\u2500 Subtitle \u2192 highlight-l
\u2502
\u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Feature</span>
\u2502   \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Text</span>
\u2502   \u2502   \u251c\u2500\u2500 Icon (64\u00d764) <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u2502   \u2502   \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Information</span>
\u2502   \u2502   \u2502   \u251c\u2500\u2500 Kicker \u2192 highlight-m / highlight-s (mobile) <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u2502   \u2502   \u2502   \u251c\u2500\u2500 Title \u2192 h2 (responsive alias)
\u2502   \u2502   \u2502   \u2514\u2500\u2500 Body \u2192 body-l
\u2502   \u2502   \u2514\u2500\u2500 CTA (button slot)
\u2502   \u2514\u2500\u2500 <span style="color:var(--black);font-weight:500;">Media</span>
\u2502       \u251c\u2500\u2500 Image (object-fit cover)
\u2502       \u2514\u2500\u2500 Caption \u2192 body-s <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u2502
\u2514\u2500\u2500 <span style="color:var(--black);font-weight:500;">View more (CTA)</span> <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
    \u2514\u2500\u2500 Action button (slot)</pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Properties</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Values</th><th>Effect</th></tr></thead>
      <tbody>
        <tr><td>Text Position</td><td>Left, Right</td><td>Reverses the order of the text/media columns.</td></tr>
        <tr><td>Icon</td><td>Visible / Hidden</td><td>64\u00d764 icon above the text area.</td></tr>
        <tr><td>Kicker</td><td>Visible / Hidden</td><td>Pre-title text in the feature area.</td></tr>
        <tr><td>Caption</td><td>Visible / Hidden</td><td>Descriptive text below the image.</td></tr>
        <tr><td>View more (CTA)</td><td>Visible / Hidden</td><td>Centered action button at the bottom.</td></tr>
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
        <tr><td>Container padding</td><td>128px ${snip('--sp-10', '--sp-10')}</td></tr>
        <tr><td>Container gap</td><td>128px ${snip('--sp-10', '--sp-10')}</td></tr>
        <tr><td>Header gap</td><td>16px ${snip('--sp-4', '--sp-4')}</td></tr>
        <tr><td>Header width</td><td>940px</td></tr>
        <tr><td>Feature gap</td><td>80px ${snip('--sp-9', '--sp-9')}</td></tr>
        <tr><td>Text column gap</td><td>32px ${snip('--sp-6', '--sp-6')}</td></tr>
        <tr><td>Info gap</td><td>16px ${snip('--sp-4', '--sp-4')}</td></tr>
        <tr><td>Media gap</td><td>8px ${snip('--sp-2', '--sp-2')}</td></tr>
        <tr><td>Title (header)</td><td>Semibold (600) \u00b7 Graphik ${snip('--h2', '--h2')} (responsive alias: title-2 \u2192 title-3 \u2192 title-4)</td></tr>
        <tr><td>Subtitle</td><td>Light (300) · 26px/36px · Graphik ${snip('--highlight-l', '--highlight-l')}</td></tr>
        <tr><td>Kicker (desktop/tablet)</td><td>Light (300) · 20px/30px · Graphik ${snip('--highlight-m', '--highlight-m')}</td></tr>
        <tr><td>Kicker (mobile)</td><td>Light (300) · 17px/26px · Graphik ${snip('--highlight-s', '--highlight-s')}</td></tr>
        <tr><td>Feature title</td><td>Semibold (600) · 36px/48px · Graphik ${snip('--h2', '--h2')} (responsive alias)</td></tr>
        <tr><td>Body</td><td>Light (300) · 17px/26px · Rubik ${snip('--body-m', '--body-m')}</td></tr>
        <tr><td>Caption</td><td>Light (300) · 12px/20px · Rubik ${snip('--body-xs', '--body-xs')} \u00b7 ${snip('--grey-500', '--grey-500')}</td></tr>
        <tr><td>Icon size</td><td>64\u00d764</td></tr>
        <tr><td>Background</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')} (light) / <span class="sw" style="background:#212121"></span>${snipColor('#212121')} (dark) ${snip('--card', '--card')}</td></tr>
      </tbody>
    </table>
  </div>
</div>
`;

// ── Page export ──

export const showAndTellPage: PageDef = {
  title: 'Show and Tell',
  desc: 'Tell the story on one side, show it on the other. Split layout with a centered headline.',
  tabs: ['Preview', 'Specs'],
  content: [satPreview, satSpecs],
  wide: true,
  brandAware: true,
  init: () => {
    satInit();
  },
};
