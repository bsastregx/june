import type { PageDef } from './page-registry.js';
import { hlHTML } from '../utils/syntax-highlight.js';
import { setupRadioGroup } from '../utils/helpers.js';
import { copyToClipboard, showToast, snip, snipColor } from '../utils/clipboard.js';
import { starIcon, zapIcon, shieldIcon, codeIcon, layersIcon, globeIcon, blkArrowIcon, desktopIcon20, tabletIcon20, phoneIcon20 } from '@june-ds/icons/icons.js';

// ─── Card builder ───

function blkCard(icon: string, title: string, body: string, border: string = 'none', index: number = 0): string {
  let cls = 'blk__card';
  let style = '';
  let showIcon = true;

  if (border === 'accent') {
    cls += ' blk__card--accent';
    style = ' style="--_accent:' + accentPalette[index % accentPalette.length] + '"';
  } else if (border === 'outlined') {
    cls += ' blk__card--outlined';
  }

  return '<div class="' + cls + '"' + style + '>' +
    '<div class="blk__card-top">' +
      (showIcon ? '<div class="blk__card-icon">' + icon + '</div>' : '') +
      '<div class="blk__card-title">' + title + '</div>' +
    '</div>' +
    '<div class="blk__card-body">' + body + '</div>' +
    '<a class="blk__card-link" href="#">Link ' + blkArrowIcon + '</a>' +
  '</div>';
}

const blkCards: string[] = [
  blkCard(zapIcon, 'AI-Powered Development', 'Build intelligent applications with integrated AI agents that understand your business logic and automate complex workflows.'),
  blkCard(codeIcon, 'Low-Code Platform', 'Create enterprise applications visually with a powerful low-code environment that generates native, optimized code.'),
  blkCard(shieldIcon, 'Enterprise Security', 'Built-in security features including role-based access control, data encryption, and compliance certifications.'),
  blkCard(globeIcon, 'Multi-Platform Deploy', 'Deploy once, run anywhere. Generate native apps for web, mobile, and desktop from a single knowledge base.'),
  blkCard(layersIcon, 'Scalable Architecture', 'Start small and grow. Our architecture scales seamlessly from prototype to millions of users.'),
  blkCard(starIcon, 'Developer Experience', 'Intuitive tools, comprehensive documentation, and a vibrant community to accelerate your development.'),
];

const blkCardData: { icon: string; title: string; body: string }[] = [
  { icon: zapIcon, title: 'AI-Powered Development', body: 'Build intelligent applications with integrated AI agents that understand your business logic and automate complex workflows.' },
  { icon: codeIcon, title: 'Low-Code Platform', body: 'Create enterprise applications visually with a powerful low-code environment that generates native, optimized code.' },
  { icon: shieldIcon, title: 'Enterprise Security', body: 'Built-in security features including role-based access control, data encryption, and compliance certifications.' },
  { icon: globeIcon, title: 'Multi-Platform Deploy', body: 'Deploy once, run anywhere. Generate native apps for web, mobile, and desktop from a single knowledge base.' },
  { icon: layersIcon, title: 'Scalable Architecture', body: 'Start small and grow. Our architecture scales seamlessly from prototype to millions of users.' },
  { icon: starIcon, title: 'Developer Experience', body: 'Intuitive tools, comprehensive documentation, and a vibrant community to accelerate your development.' },
];

function buildCard(i: number): string {
  const d = blkCardData[i];
  return blkCard(d.icon, d.title, d.body, blkBorder, i);
}

// ─── Playground state ───

let blkAlign = 'top';
let blkIntroAlign = 'left'; // 'left' | 'center'
let blkCols = 2;
let blkWidth = 1440;
let blkBorder = 'none'; // 'none' | 'accent' | 'outlined'
const accentPalette = ['#34C759', '#00BCD4', '#5BA7FF', '#FF9500', '#AF52DE', '#30D5C8'];
let blkAbort: AbortController | null = null;


// ─── Playground functions ───

function syncControls(): void {
  const isMob = blkWidth <= 639;
  const isSmall = blkWidth <= 1023;
  const is3col = blkCols === 3;

  // Align: hidden on tablet/mobile (always stacked) OR 3-col
  const alignOff = isSmall || is3col;
  [document.getElementById('blk-align-sep'),
   document.getElementById('blk-align-label'),
   document.getElementById('blk-align-pills')].forEach(el => {
    if (el) el.style.display = alignOff ? 'none' : '';
  });
  if (alignOff && blkAlign === 'left') {
    blkAlign = 'top';
    document.querySelectorAll('#blk-align-pills button').forEach(b =>
      b.classList.toggle('on', (b as HTMLElement).dataset.val === 'top')
    );
  }

  // Columns: hidden on tablet/mobile
  [document.getElementById('blk-cols-sep'),
   document.getElementById('blk-cols-label'),
   document.getElementById('blk-cols-pills')].forEach(el => {
    if (el) el.style.display = isSmall ? 'none' : '';
  });
  if (isSmall) {
    blkCols = 2;
    document.querySelectorAll('#blk-cols-pills button').forEach(b =>
      b.classList.toggle('on', (b as HTMLElement).dataset.val === '2')
    );
  }
}

function blkSetViewport(w: number, el?: HTMLElement | null): void {
  blkWidth = w;
  let bp: string;
  if (w <= 639)       bp = 'mobile';
  else if (w <= 1023) bp = 'tablet';
  else                bp = 'desktop';

  if (el) {
    const bar = el.closest('.lam-device-bar');
    if (bar) bar.querySelectorAll('.lam-device').forEach(b => b.classList.remove('on'));
    el.classList.add('on');
  }

  const viewport = document.getElementById('blk-viewport');
  if (viewport) {
    viewport.setAttribute('data-bp', bp);
    if (bp === 'desktop' && w >= 940) {
      viewport.style.width = '100%';
      viewport.style.maxWidth = 'none';
      viewport.style.margin = '0';
    } else {
      viewport.style.width = w + 'px';
      viewport.style.maxWidth = '100%';
      viewport.style.margin = '0 auto';
    }
    const breakout = document.getElementById('blk-breakout');
    if (breakout) breakout.style.padding = (bp === 'desktop' && w >= 940) ? '0' : '24px';
  }

  const deviceLabel = bp.charAt(0).toUpperCase() + bp.slice(1);
  const label = document.getElementById('blk-width-label');
  if (label) label.textContent = deviceLabel + ' \u00b7 ' + w + 'px';
  blkRender();
}

/* blkReset removed — simplified UI no longer needs a reset button */

function blkUpdateCode(showIntro: boolean, showMore: boolean): void {
  const codeEl = document.getElementById('blk-code');
  if (!codeEl) return;

  const is3 = blkCols === 3;
  const isLeft = blkAlign === 'left' && !is3;
  const isCenter = blkIntroAlign === 'center';

  let c = '<div class="blk' + (isLeft ? ' blk--left' : '') + '">\n';
  if (showIntro) {
    c += '  <div class="blk__header' + (isCenter ? ' blk__header--center' : '') + '">\n';
    c += '    <h3 class="blk__title">Title</h3>\n    <p class="blk__desc">Description</p>\n';
    c += '    <button class="jb jb--sec">Get started</button>\n';
    c += '  </div>\n';
  }
  c += '  <div class="blk__content">\n';
  const cols = is3 ? 3 : 2;
  c += '    <div class="blk__grid' + (is3 ? ' blk__grid--3col' : '') + '">\n';
  const cardCls = 'blk__card' + (blkBorder === 'accent' ? ' blk__card--accent' : '') + (blkBorder === 'outlined' ? ' blk__card--outlined' : '');
  for (let ci = 0; ci < cols; ci++) {
    if (blkBorder === 'accent') {
      c += '      <div class="' + cardCls + '" style="--_accent:' + accentPalette[ci % accentPalette.length] + '">...</div>\n';
    } else {
      c += '      <div class="' + cardCls + '">...</div>\n';
    }
  }
  c += '    </div>\n';
  c += '  </div>\n';
  if (showMore) c += '  <a class="blk__footer-link" href="#">View more</a>\n';
  c += '</div>';

  codeEl.innerHTML = hlHTML(c);
}

function blkRender(): void {
  const el = document.getElementById('blk-live');
  if (!el) return;

  syncControls();

  // 3-col always stacks vertically (Figma spec: cards below header)
  const effectiveLeft = blkAlign === 'left' && blkCols !== 3;
  const effectiveCenter = blkIntroAlign === 'center';

  el.className = 'blk' + (effectiveLeft ? ' blk--left' : '');

  const content = el.querySelector('.blk__content');
  if (!content) return;

  // Toggle visibility of header elements (Intro = title + desc + button)
  const header = el.querySelector('.blk__header') as HTMLElement | null;
  const rootFooter = document.getElementById('blk-footer');
  const sIntro = document.getElementById('blk-show-intro') as HTMLInputElement | null;
  const sMore = document.getElementById('blk-show-more') as HTMLInputElement | null;
  const showIntro = sIntro ? sIntro.checked : true;
  const showMore = sMore ? sMore.checked : true;

  if (header) {
    header.style.display = showIntro ? '' : 'none';
    header.className = 'blk__header' + (effectiveCenter ? ' blk__header--center' : '');
  }

  // Hide "Align intro" controls when intro is off
  const introAlignEls = [
    document.getElementById('blk-intro-align-sep'),
    document.getElementById('blk-intro-align-label'),
    document.getElementById('blk-intro-align-pills'),
  ];
  introAlignEls.forEach(el => { if (el) el.style.display = showIntro ? '' : 'none'; });

  // Build cards
  let html = '';
  if (blkCols === 3) {
    html += '<div class="blk__grid blk__grid--3col">';
    for (let i = 0; i < 3 && i < blkCardData.length; i++) html += buildCard(i);
    html += '</div>';
  } else {
    for (let r = 0; r < blkCardData.length; r += 2) {
      html += '<div class="blk__grid">';
      html += buildCard(r);
      if (r + 1 < blkCardData.length) html += buildCard(r + 1);
      html += '</div>';
    }
  }

  // Footer: in Left Title mode (side-by-side only) goes inside content, otherwise root-level
  if (effectiveLeft && showMore) {
    html += '<a class="blk__footer-link" href="#">View more</a>';
  }
  content.innerHTML = html;

  // Root footer: visible in top mode or when 3-col forces stacked layout
  if (rootFooter) {
    rootFooter.style.display = (!effectiveLeft && showMore) ? '' : 'none';
  }

  // Update code snippet
  blkUpdateCode(showIntro, showMore);
}

// ─── Init ───

function blkInit(): void {
  blkAlign = 'top';
  blkIntroAlign = 'left';
  blkCols = 2;
  blkBorder = 'none';
  blkWidth = 1440;

  // Set initial viewport
  blkSetViewport(1440, document.querySelector('#blk-breakout .lam-device') as HTMLElement | null);

  // Render initial state
  blkRender();

  // Wire up device bar buttons
  const deviceBar = document.getElementById('blk-device-bar');
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
        blkSetViewport(w, btn);
      });
    });
  }

  // Wire up toggle checkboxes
  ['blk-show-intro', 'blk-show-more'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', () => blkRender());
  });

  // Wire up copy button
  const copyBtn = document.getElementById('blk-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const codeEl = document.getElementById('blk-code');
      if (codeEl) {
        copyToClipboard(codeEl.textContent || '');
        showToast('Copied!');
      }
    });
  }

  // Setup align pills radio group
  const ap = document.getElementById('blk-align-pills');
  if (ap) {
    setupRadioGroup(ap, (btn: HTMLButtonElement) => {
      blkAlign = btn.dataset.val || 'top';
      blkRender();
    });
  }

  // Setup intro align pills radio group
  const iap = document.getElementById('blk-intro-align-pills');
  if (iap) {
    setupRadioGroup(iap, (btn: HTMLButtonElement) => {
      blkIntroAlign = btn.dataset.val || 'left';
      blkRender();
    });
  }

  // Setup columns pills radio group
  const cp = document.getElementById('blk-cols-pills');
  if (cp) {
    setupRadioGroup(cp, (btn: HTMLButtonElement) => {
      blkCols = parseInt(btn.dataset.val || '2', 10);
      blkRender();
    });
  }

  // Setup border pills radio group (in sticky bar)
  const bpp = document.getElementById('blk-border-pills');
  if (bpp) {
    setupRadioGroup(bpp, (btn: HTMLButtonElement) => {
      blkBorder = btn.dataset.val || 'none';
      blkRender();
    });
  }

}

// ─── Preview tab content ───

const blkPreview = `
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="blk-device-bar" role="radiogroup" aria-label="Device size">
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
    <span class="pg-controls__sep" id="blk-align-sep"></span>
    <span class="pg-controls__label" id="blk-align-label">Align</span>
    <div class="btn-pills" id="blk-align-pills" role="radiogroup" aria-label="Title alignment">
      <button class="on" data-val="top" role="radio" aria-checked="true">Top</button>
      <button data-val="left" role="radio" aria-checked="false">Left</button>
    </div>
    <span class="pg-controls__sep" id="blk-intro-align-sep"></span>
    <span class="pg-controls__label" id="blk-intro-align-label">Align intro</span>
    <div class="btn-pills" id="blk-intro-align-pills" role="radiogroup" aria-label="Intro alignment">
      <button class="on" data-val="left" role="radio" aria-checked="true">Left</button>
      <button data-val="center" role="radio" aria-checked="false">Center</button>
    </div>
    <span class="pg-controls__sep" id="blk-cols-sep"></span>
    <span class="pg-controls__label" id="blk-cols-label">Columns</span>
    <div class="btn-pills" id="blk-cols-pills" role="radiogroup" aria-label="Column count">
      <button class="on" data-val="2" role="radio" aria-checked="true">2</button>
      <button data-val="3" role="radio" aria-checked="false">3</button>
    </div>
  </div>
</div>

<div class="pg-preview">
  <div class="lam-breakout" id="blk-breakout">
    <div class="lam-viewport" id="blk-viewport" data-bp="desktop">
      <div class="blk" id="blk-live" data-surface="light">
        <div class="blk__header">
          <h3 class="blk__title">Build the future</h3>
          <p class="blk__desc">Everything you need to create enterprise-grade applications that scale with your business.</p>
          <div class="blk__btn-wrap" style="margin-top:var(--sp-2)">
            <button class="jb jb--sec">Get started</button>
          </div>
        </div>
        <div class="blk__content">
          <div class="blk__grid">${blkCards[0] + blkCards[1]}</div>
          <div class="blk__grid">${blkCards[2] + blkCards[3]}</div>
          <div class="blk__grid">${blkCards[4] + blkCards[5]}</div>
        </div>
        <a class="blk__footer-link" href="#" id="blk-footer">View more</a>
      </div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="blk-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="blk-sticky">
  <span class="pg-controls__label pg-controls__stencil">Blocks</span>
  <span class="pg-controls__sep"></span>
  <span class="pg-controls__label">Border</span>
  <div class="btn-pills" id="blk-border-pills" role="radiogroup" aria-label="Border style">
    <button class="on" data-val="none" role="radio" aria-checked="true">None</button>
    <button data-val="accent" role="radio" aria-checked="false">Left accent</button>
    <button data-val="outlined" role="radio" aria-checked="false">Outlined</button>
  </div>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="blk-show-intro" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Intro</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="blk-show-more" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>View More (CTA)</label>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button class="code-snippet__copy" id="blk-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="blk-code"></code></pre>
</div>
`;

// ─── Specs tab content ───

const blkSpecs = `
<div class="vcard" style="margin-bottom: var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Blocks — Props API</span></div>
  <div class="vcard__body" style="padding: 0;">
    <table class="tok-table">
      <thead><tr><th>Prop / Class</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code class="tok tok--static">.blk</code></td><td><code class="tok tok--static">class</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">\u2014</td><td>Base component class. Always required.</td></tr>
        <tr><td><code class="tok tok--static">.blk__header--center</code></td><td><code class="tok tok--static">modifier</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">—</td><td>Centers the header content (title, description, CTA).</td></tr>
        <tr><td><code class="tok tok--static">.blk--left</code></td><td><code class="tok tok--static">modifier</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">top</td><td>Horizontal layout: title on the left, cards on the right.</td></tr>
        <tr><td><code class="tok tok--static">.blk__grid--3col</code></td><td><code class="tok tok--static">modifier</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">2col</td><td>3-column grid instead of 2.</td></tr>
        <tr><td><code class="tok tok--static">.blk__header</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">\u2014</td><td>Container for title, description and CTA button.</td></tr>
        <tr><td><code class="tok tok--static">.blk__card</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">\u2014</td><td>Individual card with icon, title, body and link.</td></tr>
        <tr><td><code class="tok tok--static">.blk__card-icon</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">\u2014</td><td>32x32 icon container. Accepts SVG or image.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Tokens used</span></div>
  <div class="vcard__body" style="padding: 0;">
    <table class="tok-table">
      <thead><tr><th>Token</th><th>Value (light)</th><th>Usage</th></tr></thead>
      <tbody>
        <tr><td>${snip('--grey-50', '--grey-50')}</td><td><span class="sw" style="background:#F7F7F7;border:1px solid #e0e0e0"></span>${snipColor('#F7F7F7')}</td><td>Card background</td></tr>
        <tr><td>${snip('--r-md', '--r-md')}</td><td>8px</td><td>Card border-radius</td></tr>
        <tr><td>${snip('--sp-6', '--sp-6')}</td><td>32px</td><td>Card padding</td></tr>
        <tr><td>${snip('--sp-8', '--sp-8')}</td><td>64px</td><td>Grid gap, section gap</td></tr>
        <tr><td>${snip('--sp-5', '--sp-5')}</td><td>24px</td><td>Gap between elements inside card</td></tr>
        <tr><td>${snip('--h2', '--h2')}</td><td>Semibold (600) · 36px/48px · Graphik (alias, resolves to ${snip('--title-2', '--title-2')})</td><td>Section title</td></tr>
        <tr><td>${snip('--highlight-m', '--highlight-m')}</td><td>Light (300) · 20px/30px · Graphik</td><td>Section description</td></tr>
        <tr><td>${snip('--title-4', '--title-4')}</td><td>Semibold (600) · 20px/30px · Graphik</td><td>Card title</td></tr>
        <tr><td>${snip('--body-m', '--body-m')}</td><td>Light (300) · 17px/26px · Rubik</td><td>Card body text</td></tr>
        <tr><td>${snip('--link', '--link')}</td><td>Light (300) · 17px/17px · Rubik</td><td>Card link, footer link</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-top: var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Breakpoints</span></div>
  <div class="vcard__body" style="padding: 0;">
    <table class="tok-table">
      <thead><tr><th>Breakpoint</th><th>Behavior</th></tr></thead>
      <tbody>
        <tr><td><code class="tok tok--static">&gt; 768px</code></td><td>Full layout. 2 or 3 columns depending on variant.</td></tr>
        <tr><td><code class="tok tok--static">&le; 768px</code></td><td>Left title switches to top. 3col switches to 2col.</td></tr>
        <tr><td><code class="tok tok--static">&le; 640px</code></td><td>Everything stacks to 1 column. Title reduces to ${snip('--title-5', '--title-5')}.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-top: var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Motion</span></div>
  <div class="vcard__body" style="padding: 0;">
    <table class="tok-table">
      <thead><tr><th>Interaction</th><th>Property</th><th>Value</th><th>Token</th></tr></thead>
      <tbody>
        <tr><td>Card hover</td><td><code class="tok tok--static">transform</code></td><td>translateY(-2px)</td><td>${snip('--duration-fast', '--duration-fast')} \u00b7 ${snip('--ease', '--ease')}</td></tr>
        <tr><td>Card hover</td><td><code class="tok tok--static">box-shadow</code></td><td><code class="tok tok--static">0 4px 12px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)</code></td><td>${snip('--shadow-md', '--shadow-md')}</td></tr>
        <tr><td>Link hover</td><td><code class="tok tok--static">color</code></td><td>${snip('--brand', '--brand')}</td><td>${snip('--duration-fast', '--duration-fast')} \u00b7 ${snip('--ease', '--ease')}</td></tr>
        <tr><td>reduced-motion</td><td colspan="3">transform and transition disabled. Only shadow change persists.</td></tr>
      </tbody>
    </table>
  </div>
</div>
`;

// ─── Guidelines tab: surface & background decisions ───

const blkGuidelines = `
<div class="btn-sec-title">Background behavior</div>

<div class="usage-card"><div class="vcard__head"><span class="vcard__name">Default background</span></div><div class="usage-card__body"><div class="usage-card__demo" style="padding:16px;"><div style="background:#fff;border-radius:8px;padding:12px;display:flex;gap:8px;"><div style="flex:1;background:#f7f7f7;border-radius:6px;padding:10px;display:flex;flex-direction:column;gap:4px;"><div style="width:14px;height:14px;border-radius:50%;background:var(--grey-200);"></div><div style="font-weight:600;font-size:9px;color:#1a1a1a;">Title</div><div style="font-size:7px;color:var(--grey-500);">Body text</div></div><div style="flex:1;background:#f7f7f7;border-radius:6px;padding:10px;display:flex;flex-direction:column;gap:4px;"><div style="width:14px;height:14px;border-radius:50%;background:var(--grey-200);"></div><div style="font-weight:600;font-size:9px;color:#1a1a1a;">Title</div><div style="font-size:7px;color:var(--grey-500);">Body text</div></div></div></div><div class="usage-card__text"><span class="badge badge--do">Use</span><p>Default state. Cards in <strong>grey-50</strong> (#f7f7f7) on white background. Subtle and neutral contrast.</p><span class="badge badge--no">Avoid</span><p>No restrictions. This is the base mode of the component.</p></div></div></div>

<div class="usage-card"><div class="vcard__head"><span class="vcard__name">Accent background: white cards</span></div><div class="usage-card__body"><div class="usage-card__demo" style="padding:16px;"><div style="background:#BEE8FF;border-radius:8px;padding:12px;display:flex;gap:8px;"><div style="flex:1;background:#fff;border-radius:6px;padding:10px;display:flex;flex-direction:column;gap:4px;"><div style="width:14px;height:14px;border-radius:50%;background:var(--grey-200);"></div><div style="font-weight:600;font-size:9px;color:#1a1a1a;">Title</div><div style="font-size:7px;color:var(--grey-500);">Body text</div></div><div style="flex:1;background:#fff;border-radius:6px;padding:10px;display:flex;flex-direction:column;gap:4px;"><div style="width:14px;height:14px;border-radius:50%;background:var(--grey-200);"></div><div style="font-weight:600;font-size:9px;color:#1a1a1a;">Title</div><div style="font-size:7px;color:var(--grey-500);">Body text</div></div></div></div><div class="usage-card__text"><span class="badge badge--do">Use</span><p>On colored backgrounds, cards switch to <strong>white surface</strong> (#fff). Maximum contrast and readability.</p><span class="badge badge--no">Avoid</span><p>If chromatic integration with the background is desired, use relative elevation instead.</p></div></div></div>

<div class="usage-card"><div class="vcard__head"><span class="vcard__name">Accent background: relative elevation</span></div><div class="usage-card__body"><div class="usage-card__demo" style="padding:16px;"><div style="background:#DDD1FF;border-radius:8px;padding:12px;display:flex;gap:8px;"><div style="flex:1;background:rgba(255,255,255,0.45);border-radius:6px;padding:10px;box-shadow:0 1px 3px rgba(0,0,0,0.08),0 0 0 1px rgba(0,0,0,0.04);display:flex;flex-direction:column;gap:4px;"><div style="width:14px;height:14px;border-radius:50%;background:rgba(0,0,0,0.08);"></div><div style="font-weight:600;font-size:9px;color:#1a1a1a;">Title</div><div style="font-size:7px;color:var(--grey-500);">Body text</div></div><div style="flex:1;background:rgba(255,255,255,0.45);border-radius:6px;padding:10px;box-shadow:0 1px 3px rgba(0,0,0,0.08),0 0 0 1px rgba(0,0,0,0.04);display:flex;flex-direction:column;gap:4px;"><div style="width:14px;height:14px;border-radius:50%;background:rgba(0,0,0,0.08);"></div><div style="font-weight:600;font-size:9px;color:#1a1a1a;">Title</div><div style="font-size:7px;color:var(--grey-500);">Body text</div></div></div></div><div class="usage-card__text"><span class="badge badge--do">Use</span><p>Semi-transparent cards that take on the background tint. A subtle shadow separates them without breaking chromatic integration. Ideal for compositions where the background color is the protagonist.</p><span class="badge badge--no">Avoid</span><p>On very light backgrounds (Alt, #F0F0F0) where the difference with white is imperceptible.</p></div></div></div>

<div class="usage-card"><div class="vcard__head"><span class="vcard__name">Dark background</span></div><div class="usage-card__body"><div class="usage-card__demo" style="padding:16px;"><div style="background:#171717;border-radius:8px;padding:12px;display:flex;gap:8px;"><div style="flex:1;background:#212121;border-radius:6px;padding:10px;display:flex;flex-direction:column;gap:4px;"><div style="width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,0.12);"></div><div style="font-weight:600;font-size:9px;color:#eee;">Title</div><div style="font-size:7px;color:#999;">Body text</div></div><div style="flex:1;background:#212121;border-radius:6px;padding:10px;display:flex;flex-direction:column;gap:4px;"><div style="width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,0.12);"></div><div style="font-weight:600;font-size:9px;color:#eee;">Title</div><div style="font-size:7px;color:#999;">Body text</div></div></div></div><div class="usage-card__text"><span class="badge badge--do">Use</span><p>Cards in <strong>elevation-01</strong> (#212121) on #171717 background. Text tokens are automatically inverted. Independent of the global dark mode toggle.</p><span class="badge badge--no">Avoid</span><p>Combining with active global dark mode \u2014 both invert tokens and can produce unexpected results.</p></div></div></div>

<div class="usage-card"><div class="vcard__head"><span class="vcard__name">Dark background: relative elevation</span></div><div class="usage-card__body"><div class="usage-card__demo" style="padding:16px;"><div style="background:#171717;border-radius:8px;padding:12px;display:flex;gap:8px;"><div style="flex:1;background:rgba(255,255,255,0.12);border-radius:6px;padding:10px;box-shadow:0 1px 3px rgba(0,0,0,0.3),0 0 0 1px rgba(255,255,255,0.06);display:flex;flex-direction:column;gap:4px;"><div style="width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,0.1);"></div><div style="font-weight:600;font-size:9px;color:#eee;">Title</div><div style="font-size:7px;color:#999;">Body text</div></div><div style="flex:1;background:rgba(255,255,255,0.12);border-radius:6px;padding:10px;box-shadow:0 1px 3px rgba(0,0,0,0.3),0 0 0 1px rgba(255,255,255,0.06);display:flex;flex-direction:column;gap:4px;"><div style="width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,0.1);"></div><div style="font-weight:600;font-size:9px;color:#eee;">Title</div><div style="font-size:7px;color:#999;">Body text</div></div></div></div><div class="usage-card__text"><span class="badge badge--do">Use</span><p>Same logic as accent but on dark. The shadow is more pronounced to compensate for the low contrast between card and background.</p><span class="badge badge--no">Avoid</span><p>Without enough content in the cards \u2014 the low relative contrast needs content to justify the visual separation.</p></div></div></div>
`;

// ─── Page export ───

export const blocksPage: PageDef = {
  title: 'Blocks',
  desc: 'A grid of feature cards that scales, reflows, and never loses its rhythm.',
  tabs: ['Preview', 'Specs'],
  content: [blkPreview, blkSpecs],
  wide: true,
  brandAware: true,
  init: blkInit,
};
