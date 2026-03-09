import type { PageDef } from './page-registry.js';
import { hlHTML } from '../utils/syntax-highlight.js';
import { copyToClipboard, showToast, snip, snipColor } from '../utils/clipboard.js';
import { desktopIcon20, tabletIcon20, phoneIcon20 } from '@june-ds/icons/icons.js';

const lmArrowIcon = '<span class="jb__i"><svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>';

// ── Module-level state ──

let lmDevice = 'desktop';
let lmWidth = 1440;
let lmShowBody = true;
let lmShowSecondCta = true;
let lmDarkSurface = false;

// ── Viewport management ──

function lmSetViewport(w: number, el?: HTMLElement): void {
  lmWidth = w;
  lmDevice = w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';

  if (el) {
    const bar = el.closest('.lam-device-bar');
    if (bar) bar.querySelectorAll('.lam-device').forEach(b => b.classList.remove('on'));
    el.classList.add('on');
  }

  const viewport = document.getElementById('lm-viewport');
  if (viewport) {
    viewport.setAttribute('data-bp', lmDevice);
    if (lmDevice === 'desktop') {
      viewport.style.width = '100%';
      viewport.style.maxWidth = 'none';
      viewport.style.margin = '0';
    } else {
      viewport.style.width = w + 'px';
      viewport.style.maxWidth = '100%';
      viewport.style.margin = '0 auto';
    }
    const breakout = document.getElementById('lm-breakout');
    if (breakout) breakout.style.padding = (lmDevice === 'desktop' && w >= 940) ? '0' : '24px';
  }

  const deviceLabel = lmDevice.charAt(0).toUpperCase() + lmDevice.slice(1);
  const label = document.getElementById('lm-width-label');
  if (label) label.textContent = deviceLabel + ' \u00b7 ' + w + 'px';

  lmRender();
}

// ── Render function ──

function lmRender(): void {
  const surface = lmDarkSurface ? 'dark' : 'light';

  let h = '<div class="lm" data-surface="' + surface + '">\n';
  h += '  <div class="lm__text">\n';
  h += '    <h2 class="lm__title">Unlock your potential with our platform</h2>\n';
  if (lmShowBody) {
    h += '    <div class="lm__body">\n';
    h += '      <p>Discover how our tools and resources can help you build better products, faster. Join thousands of teams already transforming their workflow.</p>\n';
    h += '    </div>\n';
  }
  h += '  </div>\n';
  h += '  <div class="lm__cta">\n';
  h += '    <button class="jb jb--ter" style="border-radius:var(--r-full);">Get started</button>\n';
  if (lmShowSecondCta) {
    h += '    <button class="jb jb--out" style="border-radius:var(--r-full);">Learn more ' + lmArrowIcon + '</button>\n';
  }
  h += '  </div>\n';
  h += '</div>';

  const previewEl = document.getElementById('lm-preview');
  if (previewEl) previewEl.innerHTML = h;

  // ── Generate clean code snippet ──

  let c = '';
  const i = '  ';

  c += '<div class="lm">\n';
  c += i + '<div class="lm__text">\n';
  c += i + i + '<h2 class="lm__title">Title</h2>\n';
  if (lmShowBody) {
    c += i + i + '<div class="lm__body">\n';
    c += i + i + i + '<p>Body text paragraph.</p>\n';
    c += i + i + '</div>\n';
  }
  c += i + '</div>\n';
  c += i + '<div class="lm__cta">\n';
  c += i + i + '<button class="jb jb--ter">Tertiary</button>\n';
  if (lmShowSecondCta) {
    c += i + i + '<button class="jb jb--out">Outline <span class="jb__i"><!-- icon --></span></button>\n';
  }
  c += i + '</div>\n';
  c += '</div>';

  const codeEl = document.getElementById('lm-code');
  if (codeEl) codeEl.innerHTML = hlHTML(c);
}

// ── Init ──

function lmInit(): void {
  lmWidth = 1440;
  lmDevice = 'desktop';
  lmShowBody = true;
  lmShowSecondCta = true;
  lmDarkSurface = false;
  lmRender();

  const wl = document.getElementById('lm-width-label');
  if (wl) wl.textContent = 'Desktop \u00b7 1440px';

  // Wire up device bar
  const deviceBar = document.getElementById('lm-device-bar');
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
        lmSetViewport(w, btn);
      });
    });
  }

  // Body toggle
  const bodyEl = document.getElementById('lm-show-body') as HTMLInputElement | null;
  if (bodyEl) {
    bodyEl.addEventListener('change', () => {
      lmShowBody = bodyEl.checked;
      lmRender();
    });
  }

  // Second CTA toggle
  const ctaEl = document.getElementById('lm-show-second-cta') as HTMLInputElement | null;
  if (ctaEl) {
    ctaEl.addEventListener('change', () => {
      lmShowSecondCta = ctaEl.checked;
      lmRender();
    });
  }

  // Dark surface toggle
  const darkEl = document.getElementById('lm-dark-surface') as HTMLInputElement | null;
  if (darkEl) {
    darkEl.addEventListener('change', () => {
      lmDarkSurface = darkEl.checked;
      lmRender();
    });
  }

  // Wire up copy button
  const copyBtn = document.getElementById('lm-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const codeEl = document.getElementById('lm-code');
      if (codeEl) {
        copyToClipboard(codeEl.textContent || '');
        showToast('Copied!');
      }
    });
  }
}

// ── Template: Preview ──

const lmPreview = `
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="lm-device-bar" role="radiogroup" aria-label="Device size">
      <button class="lam-device on" data-width="1440" role="radio" aria-checked="true" aria-label="Desktop 1440px" title="Desktop 1440px">
        ${desktopIcon20}
      </button>
      <button class="lam-device" data-width="768" role="radio" aria-checked="false" aria-label="Tablet 768px" title="Tablet 768px">
        ${tabletIcon20}
      </button>
      <button class="lam-device" data-width="375" role="radio" aria-checked="false" aria-label="Mobile 375px" title="Mobile 375px">
        ${phoneIcon20}
      </button>
    </div>
  </div>
</div>

<div class="pg-preview">
  <div class="lam-breakout" id="lm-breakout">
    <div class="lam-viewport" id="lm-viewport" data-bp="desktop">
      <div class="lam-preview-frame" id="lm-preview" data-surface="light"></div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="lm-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="lm-sticky">
  <span class="pg-controls__label pg-controls__stencil">Learn More</span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="lm-show-body" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Body</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="lm-show-second-cta" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Second CTA</label>

</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button class="code-snippet__copy" id="lm-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="lm-code"></code></pre>
</div>
`;

// ── Template: Specs ──

const lmSpecs = `
<div class="anatomy-wrap" style="margin-bottom:var(--sp-5);">
  <div class="anatomy__head"><span class="anatomy__head-title">Anatomy</span></div>
  <div class="anatomy__content" style="padding:var(--sp-5);overflow-x:auto;">
    <pre class="anatomy__tree"><span style="color:var(--black);font-weight:500;">Learn More</span>
\u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Text</span> (flex column)
\u2502   \u251c\u2500\u2500 Title \u2192 h2 (responsive alias: title-2 / title-3 / title-4)
\u2502   \u2514\u2500\u2500 Body \u2192 body-m (paragraphs) <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u2514\u2500\u2500 <span style="color:var(--black);font-weight:500;">CTA</span> (flex row, desktop/tablet \u2192 column on mobile)
    \u251c\u2500\u2500 Secondary button (june-button, pill)
    \u2514\u2500\u2500 Tertiary button (june-button, pill) <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
    </pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Tokens & Spacing</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Element</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Background</td><td><span class="sw" style="background:#F5F5F5;border:1px solid #e0e0e0"></span>${snipColor('#F5F5F5')} ${snip('--grey-50', '--grey-50')}</td></tr>
        <tr><td>Dark surface bg</td><td><span class="sw" style="background:#1A1A1A"></span>${snipColor('#1A1A1A')} ${snip('--grey-900', '--grey-900')}</td></tr>
        <tr><td>Section padding (desktop)</td><td>128px ${snip('--sp-10', '--sp-10')}</td></tr>
        <tr><td>Section padding (tablet)</td><td>80px 64px ${snip('--sp-9', '--sp-9')} ${snip('--sp-8', '--sp-8')}</td></tr>
        <tr><td>Section padding (mobile)</td><td>64px 24px ${snip('--sp-8', '--sp-8')} ${snip('--sp-5', '--sp-5')}</td></tr>
        <tr><td>Gap text \u2194 CTA (desktop)</td><td>128px ${snip('--sp-10', '--sp-10')}</td></tr>
        <tr><td>Gap text \u2194 CTA (tablet/mobile)</td><td>32px ${snip('--sp-6', '--sp-6')}</td></tr>
        <tr><td>Title</td><td>Graphik ${snip('--h2', '--h2')} (responsive alias: title-2 → title-3 → title-4)</td></tr>
        <tr><td>Title color</td><td><span class="sw" style="background:#111111"></span>${snipColor('#111111')} ${snip('--black', '--black')}</td></tr>
        <tr><td>Body</td><td>Light (300) · 17px/26px · Rubik ${snip('--body-m', '--body-m')}</td></tr>
        <tr><td>Body color</td><td><span class="sw" style="background:#757575"></span>${snipColor('#757575')} ${snip('--text', '--text')}</td></tr>
        <tr><td>Title \u2194 body gap (desktop)</td><td>32px ${snip('--sp-6', '--sp-6')}</td></tr>
        <tr><td>Title \u2194 body gap (mobile)</td><td>16px ${snip('--sp-4', '--sp-4')}</td></tr>
        <tr><td>Button gap (desktop)</td><td>24px ${snip('--sp-5', '--sp-5')}</td></tr>
        <tr><td>Button gap (tablet/mobile)</td><td>24px ${snip('--sp-5', '--sp-5')}</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Responsive</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th style="width:20%">Breakpoint</th><th style="width:20%">Width</th><th>Behavior</th></tr></thead>
      <tbody>
        <tr><td>Desktop</td><td>1440px</td><td>Flex row: text left, CTAs right. Gap ${snip('--sp-10', '--sp-10')}. Title ${snip('--title-2', '--title-2')}.</td></tr>
        <tr><td>Tablet</td><td>768px</td><td>Flex column. Padding ${snip('--sp-9', '--sp-9')} ${snip('--sp-8', '--sp-8')}. Gap ${snip('--sp-6', '--sp-6')}. Buttons in row.</td></tr>
        <tr><td>Mobile</td><td>375px</td><td>Flex column. Padding ${snip('--sp-8', '--sp-8')} ${snip('--sp-5', '--sp-5')}. Title ${snip('--title-3', '--title-3')}. Buttons stacked.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Motion</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Interaction</th><th>Property</th><th>Value</th><th>Token</th></tr></thead>
      <tbody>
        <tr><td>Text entrance</td><td><code class="tok tok--static">opacity</code>, <code class="tok tok--static">transform</code></td><td>fade-in + translateY(8px)</td><td>${snip('--duration', '--duration')} \u00b7 ${snip('--ease', '--ease')}</td></tr>
        <tr><td>CTA entrance</td><td><code class="tok tok--static">opacity</code>, <code class="tok tok--static">transform</code></td><td>fade-in + translateY(8px), 80ms delay</td><td>${snip('--duration', '--duration')} \u00b7 ${snip('--ease', '--ease')}</td></tr>
        <tr><td>reduced-motion</td><td colspan="3">All animations disabled.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Accessibility</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Feature</th><th>Implementation</th><th>Standard</th></tr></thead>
      <tbody>
        <tr><td>Semantic heading</td><td><code class="tok tok--static">&lt;h2&gt;</code> for section title</td><td>WCAG 1.3.1</td></tr>
        <tr><td>Reduced motion</td><td>Entrance animations disabled via <code class="tok tok--static">prefers-reduced-motion</code></td><td>WCAG 2.3.3</td></tr>
        <tr><td>Color contrast</td><td>Title: black on grey-50 (18.1:1). Body: text on grey-50 (5.8:1 AA).</td><td>WCAG 1.4.3</td></tr>
      </tbody>
    </table>
  </div>
</div>
`;

// ── Page export ──

export const learnMorePage: PageDef = {
  title: 'Learn More',
  desc: 'Title, context, CTA \u2014 the section that nudges the next step.',
  tabs: ['Preview', 'Specs'],
  content: [lmPreview, lmSpecs],
  wide: true,
  brandAware: true,
  init: lmInit,
};
