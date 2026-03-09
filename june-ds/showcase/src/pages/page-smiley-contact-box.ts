import type { PageDef } from './page-registry.js';
import { hlHTML } from '../utils/syntax-highlight.js';
import { setupRadioGroup } from '../utils/helpers.js';
import { copyToClipboard, showToast, snip, snipColor } from '../utils/clipboard.js';
import { desktopIcon20, tabletIcon20, phoneIcon20 } from '@june-ds/icons/icons.js';

// ── Module-level state ──

let scbDevice = 'desktop';
let scbWidth = 1440;
let scbShowAvatar = true;
let scbShowBody = true;
let scbSurface = 'light';
let scbAbort: AbortController | null = null;
let scbBrandObserver: MutationObserver | null = null;

// ── Avatar ──

const avatarImg = '<img src="/hero-logo.png" alt="June" />';

// ── Viewport management ──

function scbSetViewport(w: number, el?: HTMLElement): void {
  scbWidth = w;
  scbDevice = w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';

  if (el) {
    const bar = el.closest('.lam-device-bar');
    if (bar) bar.querySelectorAll('.lam-device').forEach(b => b.classList.remove('on'));
    el.classList.add('on');
  }

  const viewport = document.getElementById('scb-viewport');
  if (viewport) {
    viewport.setAttribute('data-bp', scbDevice);
    if (scbDevice === 'desktop') {
      viewport.style.width = '100%';
      viewport.style.maxWidth = 'none';
      viewport.style.margin = '0';
    } else {
      viewport.style.width = w + 'px';
      viewport.style.maxWidth = '100%';
      viewport.style.margin = '0 auto';
    }
    const breakout = document.getElementById('scb-breakout');
    if (breakout) breakout.style.padding = (scbDevice === 'desktop' && w >= 940) ? '0' : '24px';
  }

  // Update width label
  const deviceLabel = scbDevice.charAt(0).toUpperCase() + scbDevice.slice(1);
  const label = document.getElementById('scb-width-label');
  if (label) label.textContent = deviceLabel + ' \u00b7 ' + w + 'px';

  scbRender();
}

// ── Surface class helper ──

function scbSurfaceClass(): string {
  if (scbSurface === 'dark') return ' scb--dark';
  if (scbSurface === 'accent') return ' scb--accent';
  return '';
}

// ── Render function ──

function scbRender(): void {
  // Update data-surface on preview frame so buttons adapt
  const frame = document.getElementById('scb-preview');
  if (frame) frame.setAttribute('data-surface', scbSurface === 'light' ? 'light' : 'dark');

  // Build preview HTML
  let h = '<div class="scb' + scbSurfaceClass() + '">\n';
  h += '  <div class="scb__inner">\n';

  // Info column
  h += '    <div class="scb__info">\n';
  h += '      <div class="scb__text">\n';
  h += '        <h2 class="scb__title">Form title example</h2>\n';
  if (scbShowBody) {
    h += '        <p class="scb__body">This is an example body text for the contact box.</p>\n';
  }
  h += '      </div>\n';

  if (scbShowAvatar) {
    h += '      <div class="scb__avatar">\n';
    h += '        ' + avatarImg + '\n';
    h += '        <div class="scb__avatar-ring"></div>\n';
    h += '      </div>\n';
  }

  h += '    </div>\n';

  // Form column
  h += '    <div class="scb__form">\n';
  h += '      <june-field label="Name" placeholder="Your name"></june-field>\n';
  h += '      <june-field label="Email" type="email" placeholder="you@example.com"></june-field>\n';
  h += '      <june-field label="Subject" placeholder="How can we help?"></june-field>\n';
  h += '      <june-field label="Message" type="textarea" placeholder="Tell us more..." rows="5"></june-field>\n';
  const btnVar = scbSurface === 'light' ? 'jb--sec' : 'jb--ter';
  h += '      <div style="padding-top:var(--sp-2);">\n';
  h += '        <button class="jb ' + btnVar + '" style="border-radius:var(--r-full);">Send</button>\n';
  h += '      </div>\n';
  h += '    </div>\n';

  h += '  </div>\n';
  h += '</div>';

  const previewEl = document.getElementById('scb-preview');
  if (previewEl) previewEl.innerHTML = h;

  // ── Generate clean code snippet ──

  let c = '';
  const i = '  ';
  const cls = scbSurface === 'light' ? 'scb' : 'scb' + scbSurfaceClass();

  c += '<div class="' + cls + '">\n';
  c += i + '<div class="scb__inner">\n';
  c += i + i + '<div class="scb__info">\n';
  c += i + i + i + '<div class="scb__text">\n';
  c += i + i + i + i + '<h2 class="scb__title">Title</h2>\n';
  if (scbShowBody) {
    c += i + i + i + i + '<p class="scb__body">Body text</p>\n';
  }
  c += i + i + i + '</div>\n';

  if (scbShowAvatar) {
    c += i + i + i + '<div class="scb__avatar">\n';
    c += i + i + i + i + '<img src="avatar.jpg" alt="Contact" />\n';
    c += i + i + i + i + '<div class="scb__avatar-ring"></div>\n';
    c += i + i + i + '</div>\n';
  }

  c += i + i + '</div>\n';
  c += i + i + '<div class="scb__form">\n';
  c += i + i + i + '<june-field label="Name" placeholder="..."></june-field>\n';
  c += i + i + i + '<june-field label="Email" type="email" placeholder="..."></june-field>\n';
  c += i + i + i + '<june-field label="Subject" placeholder="..."></june-field>\n';
  c += i + i + i + '<june-field label="Message" type="textarea" rows="5"></june-field>\n';
  c += i + i + i + '<button class="jb ' + btnVar + '">Send</button>\n';
  c += i + i + '</div>\n';
  c += i + '</div>\n';
  c += '</div>';

  const codeEl = document.getElementById('scb-code');
  if (codeEl) codeEl.innerHTML = hlHTML(c);
}

// ── Init ──

function scbInit(): void {
  // Reset state
  scbWidth = 1440;
  scbDevice = 'desktop';
  scbShowAvatar = true;
  scbShowBody = true;
  scbSurface = 'light';
  scbRender();

  // Reset width label
  const wl = document.getElementById('scb-width-label');
  if (wl) wl.textContent = 'Desktop \u00b7 1440px';

  // Wire up device bar buttons
  const deviceBar = document.getElementById('scb-device-bar');
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
        scbSetViewport(w, btn);
      });
    });
  }

  // Wire up surface pills
  const surfacePills = document.getElementById('scb-surface-pills');
  if (surfacePills) {
    setupRadioGroup(surfacePills, (btn) => {
      scbSurface = btn.dataset.val || 'light';
      scbRender();
    });
  }

  // Wire up toggle checkboxes
  const toggleMap: Record<string, (val: boolean) => void> = {
    'scb-show-avatar': (val) => { scbShowAvatar = val; },
    'scb-show-body': (val) => { scbShowBody = val; },
  };
  Object.entries(toggleMap).forEach(([id, setter]) => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (el) {
      el.addEventListener('change', () => {
        setter(el.checked);
        scbRender();
      });
    }
  });

  // Re-render when brand changes (accent surface adapts per brand)
  const pageEl = document.getElementById('page');
  if (pageEl) {
    const observer = new MutationObserver(() => scbRender());
    observer.observe(pageEl, { attributes: true, attributeFilter: ['data-brand'] });
  }

  // Wire up copy button
  const copyBtn = document.getElementById('scb-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const codeEl = document.getElementById('scb-code');
      if (codeEl) {
        copyToClipboard(codeEl.textContent || '');
        showToast('Copied!');
      }
    });
  }
}

// ── Template: Preview ──

const scbPreview = `
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="scb-device-bar" role="radiogroup" aria-label="Device size">
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
    <span class="pg-controls__sep"></span>
    <span class="pg-controls__label">Surface</span>
    <div class="btn-pills" id="scb-surface-pills" role="radiogroup" aria-label="Surface">
      <button class="on" data-val="light" role="radio" aria-checked="true">Light</button>
      <button data-val="dark" role="radio" aria-checked="false">Dark</button>
      <button data-val="accent" role="radio" aria-checked="false">Accent</button>
    </div>
  </div>
</div>

<div class="pg-preview">
  <div class="lam-breakout" id="scb-breakout">
    <div class="lam-viewport" id="scb-viewport" data-bp="desktop">
      <div class="lam-preview-frame" id="scb-preview" data-surface="light"></div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="scb-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="scb-sticky">
  <span class="pg-controls__label pg-controls__stencil">Smiley Contact Box</span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="scb-show-avatar" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Avatar</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="scb-show-body" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Body text</label>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button class="code-snippet__copy" id="scb-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="scb-code"></code></pre>
</div>
`;

// ── Template: Specs ──

const scbSpecs = `
<div class="anatomy-wrap" style="margin-bottom:var(--sp-5);">
  <div class="anatomy__head"><span class="anatomy__head-title">Anatomy</span></div>
  <div class="anatomy__content" style="padding:var(--sp-5);overflow-x:auto;">
    <pre class="anatomy__tree"><span style="color:var(--black);font-weight:500;">Smiley Contact Box</span>
\u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Info</span> (flex column)
\u2502   \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Text</span>
\u2502   \u2502   \u251c\u2500\u2500 Title \u2192 h2 (responsive alias: title-2 / title-3 / title-4)
\u2502   \u2502   \u2514\u2500\u2500 Body \u2192 body-l <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u2502   \u2514\u2500\u2500 <span style="color:var(--black);font-weight:500;">Avatar</span> <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u2502       \u251c\u2500\u2500 Image (130\u00d7130, border-radius 50%)
\u2502       \u2514\u2500\u2500 Ring (3px solid, brand color)
\u2514\u2500\u2500 <span style="color:var(--black);font-weight:500;">Form</span> (flex column, gap sp-4)
    \u251c\u2500\u2500 june-field \u00d73 (text)
    \u251c\u2500\u2500 june-field \u00d71 (textarea, height 160px)
    \u2514\u2500\u2500 june-button (primary, brand-aware)
    </pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Properties</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Values</th><th>Effect</th></tr></thead>
      <tbody>
        <tr><td>Surface</td><td>Light, Dark, Accent</td><td>Changes the background and redefines inherited tokens (input bg, borders, text) so fields adapt without internal changes.</td></tr>
        <tr><td>Avatar</td><td>Visible / Hidden</td><td>Shows/hides the avatar with brand ring.</td></tr>
        <tr><td>Body</td><td>Visible / Hidden</td><td>Shows/hides the descriptive text below the title.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Tokens & Spacing</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Element</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Section background</td><td><span class="sw" style="background:#f5f5f5;border:1px solid #e0e0e0"></span>${snipColor('#f5f5f5')} (light) / <span class="sw" style="background:#1a1a1a"></span>${snipColor('#1a1a1a')} (dark) / <span class="sw" style="background:#00473F"></span>${snipColor('#00473F')} (accent) ${snip('--grey-50', '--grey-50')}</td></tr>
        <tr><td>Section padding (desktop)</td><td>128px ${snip('--sp-10', '--sp-10')}</td></tr>
        <tr><td>Section padding (tablet)</td><td>80px 64px ${snip('--sp-9', '--sp-9')} ${snip('--sp-8', '--sp-8')}</td></tr>
        <tr><td>Section padding (mobile)</td><td>64px 24px ${snip('--sp-8', '--sp-8')} ${snip('--sp-5', '--sp-5')}</td></tr>
        <tr><td>Column gap (desktop)</td><td>64px ${snip('--sp-8', '--sp-8')}</td></tr>
        <tr><td>Column gap (tablet)</td><td>16px ${snip('--sp-4', '--sp-4')}</td></tr>
        <tr><td>Column gap (mobile)</td><td>32px ${snip('--sp-6', '--sp-6')}</td></tr>
        <tr><td>Title</td><td>Graphik ${snip('--h2', '--h2')} (responsive alias: title-2 → title-3 → title-4)</td></tr>
        <tr><td>Body</td><td>Light (300) · 17px/26px · Rubik ${snip('--body-m', '--body-m')}</td></tr>
        <tr><td>Text gap</td><td>16px ${snip('--sp-4', '--sp-4')}</td></tr>
        <tr><td>Text padding-bottom</td><td>32px ${snip('--sp-6', '--sp-6')}</td></tr>
        <tr><td>Avatar</td><td>130\u00d7130px, border-radius 50%</td></tr>
        <tr><td>Avatar ring</td><td>Brand color ring · 3px solid ${snip('--gx', '--gx')} / ${snip('--nx', '--nx')} / ${snip('--ge', '--ge')}</td></tr>
        <tr><td>Form gap</td><td>16px ${snip('--sp-4', '--sp-4')}</td></tr>
        <tr><td>Fields</td><td>Existing june-field component</td></tr>
        <tr><td>Button</td><td>june-button primary component, brand-aware</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Surface System</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th style="width:28%">Token</th><th>Light <code class="tok tok--static">.scb</code></th><th>Dark <code class="tok tok--static">.scb--dark</code></th><th>Accent <code class="tok tok--static">.scb--accent</code></th></tr></thead>
      <tbody>
        <tr><td><code class="tok tok--static">--_surf</code></td><td>\u2014</td><td><span class="sw" style="background:#1a1a1a"></span>${snipColor('#1a1a1a')}</td><td><span class="sw" style="background:#151F2B"></span>${snipColor('#151F2B')} (GX/NX)<br><span style="display:block;margin-top:6px;"><span class="sw" style="background:#005D56"></span>${snipColor('#005D56')} (GE)</span></td></tr>
        <tr><td>Background</td><td>${snip('--grey-50', '--grey-50')}</td><td colspan="2"><code class="tok tok--static">--_surf</code></td></tr>
        <tr><td>${snip('--black', '--black')}</td><td>\u2014</td><td colspan="2"><span class="sw" style="background:#eeeef0;border:1px solid #e0e0e0"></span>${snipColor('#eeeef0')}</td></tr>
        <tr><td>${snip('--card', '--card')} ${snip('--input-bg', '--input-bg')}</td><td>\u2014</td><td colspan="2"><code class="tok tok--static">color-mix(--_surf, white 10%)</code></td></tr>
        <tr><td>${snip('--card-border', '--card-border')} ${snip('--input-border', '--input-border')}</td><td>\u2014</td><td colspan="2"><code class="tok tok--static">color-mix(--_surf, white 18%)</code></td></tr>
        <tr><td>${snip('--grey-400', '--grey-400')}</td><td>\u2014</td><td colspan="2"><code class="tok tok--static">color-mix(--_surf, white 40%)</code></td></tr>
        <tr><td>${snip('--grey-500', '--grey-500')}</td><td>\u2014</td><td colspan="2"><code class="tok tok--static">color-mix(--_surf, white 50%)</code></td></tr>
        <tr><td>${snip('--brand', '--brand')}</td><td>\u2014</td><td>\u2014</td><td><code class="tok tok--static">--_surf-accent</code></td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Responsive</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th style="width:20%">Breakpoint</th><th style="width:20%">Width</th><th>Behavior</th></tr></thead>
      <tbody>
        <tr><td>Desktop</td><td>1440px</td><td>2-column flex (info + form), gap ${snip('--sp-8', '--sp-8')}, title ${snip('--h2', '--h2')}.</td></tr>
        <tr><td>Tablet</td><td>768px</td><td>2 columns (info fixed 200px + form flex-1), gap ${snip('--sp-4', '--sp-4')}, title ${snip('--title-3', '--title-3')}.</td></tr>
        <tr><td>Mobile</td><td>428px</td><td>1 column (column), avatar first (order -1), gap ${snip('--sp-6', '--sp-6')}, title ${snip('--title-3', '--title-3')}.</td></tr>
      </tbody>
    </table>
  </div>
</div>
`;

// ── Page export ──

export const smileyContactBoxPage: PageDef = {
  title: 'Smiley Contact Box',
  desc: 'Put a face on your contact form. Avatar and fields, side by side.',
  tabs: ['Preview', 'Specs'],
  content: [scbPreview, scbSpecs],
  wide: true,
  brandAware: true,
  init: () => {
    scbInit();
  },
};
