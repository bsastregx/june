import type { PageDef } from './page-registry.js';
import { hlHTML } from '../utils/syntax-highlight.js';
import { setupRadioGroup } from '../utils/helpers.js';
import { copyToClipboard, showToast, snip } from '../utils/clipboard.js';
import { bellIcon, chevronSmall, hamburgerIcon, desktopIcon20, tabletIcon20, phoneIcon20 } from '@june-ds/icons/icons.js';

// ── Default sample image ──

const LAM_SAMPLE_IMG = '/lam-sample.png';
const abstractArt =
  `<img src="${LAM_SAMPLE_IMG}" alt="Sample" style="width:100%;height:100%;min-height:300px;object-fit:cover;display:block" />`;

// ── Module-level state ──

let lamDevice = 'desktop';
let lamAlign = 'center';
let lamImgPos = 'none';
let lamShowLogo = true;
let lamShowEyebrow = true;
const lamShowKicker = true;
let lamShowOutline = true;
const lamShowMenu = false;
let lamWidth = 1440;
let lamCustomImg: string | null = null;
let lamAbort: AbortController | null = null;
// ── Render function ──

function lamRender(): void {
  const isMobile = lamDevice === 'mobile';
  const isLeft = lamAlign === 'left';
  const isImgRight = lamImgPos === 'right';
  const isImgBottom = lamImgPos === 'bottom';
  const isImgFull = lamImgPos === 'full';
  const comboEl = document.getElementById('lam-combo-label');

  const imgLabel = isImgFull ? 'Img Full' : isImgRight ? 'Img Right' : isImgBottom ? 'Img Bottom' : 'No Image';
  const hidden: string[] = [];
  if (!lamShowLogo) hidden.push('media');
  if (!lamShowEyebrow) hidden.push('eyebrow');
  if (!lamShowOutline) hidden.push('tertiary');
  let comboText = lamWidth + 'px \u00b7 ' + (isLeft ? 'Left' : 'Center') + ' \u00b7 ' + imgLabel;
  if (hidden.length) comboText += ' \u00b7 -' + hidden.join(' -');
  if (comboEl) comboEl.textContent = comboText;

  // Img Right forces left alignment only on desktop (horizontal split layout)
  const isDesktopSplit = isImgRight && lamWidth > 768;
  const effectiveLeft = isLeft || isDesktopSplit;
  const alignItems = effectiveLeft ? 'flex-start' : 'center';
  const textAlign = effectiveLeft ? 'left' : 'center';
  const ctaJustify = effectiveLeft ? 'flex-start' : 'center';

  // Determine image source (custom upload or placeholder)
  const imgSource = lamCustomImg
    ? '<img src="' + lamCustomImg + '" alt="" style="width:100%;height:100%;object-fit:cover;" />'
    : abstractArt;

  const logo = '<div class="lam-logo"></div>';
  const eyebrowText = isMobile ? 'GEAI is here' : 'GeneXus Enterprise AI is here';
  const eyebrow =
    '<div class="lam-eyebrow" role="status" aria-label="News: ' + eyebrowText + '">' +
    '<span class="lam-eyebrow__icon" aria-hidden="true">' + bellIcon + '</span>' +
    '<span class="lam-eyebrow__tag">New</span>' +
    '<div class="lam-eyebrow__body">' +
    '<span class="lam-eyebrow__text">' + eyebrowText + '</span>' +
    '<span class="lam-eyebrow__dash" aria-hidden="true">\u2014</span>' +
    '<a class="lam-eyebrow__cta" href="#">Read more <span aria-hidden="true">' + chevronSmall + '</span></a>' +
    '</div></div>';
  const kicker = '<div class="lam-kicker">AI-Powered Enterprise Platform</div>';
  const info =
    '<div class="lam-info" style="align-items:' + alignItems + '; text-align:' + textAlign + ';">' +
    (lamShowKicker ? kicker : '') +
    '<h1 class="lam-title">Create enterprise software 10x faster</h1>' +
    '<div class="lam-paragraph">Build, integrate, and evolve mission-critical applications with the power of AI and low-code development.</div>' +
    '</div>';
  const cta =
    '<div class="lam-cta" style="justify-content:' + ctaJustify + ';">' +
    '<button class="jb jb--sec">Get started</button>' +
    (lamShowOutline ? '<button class="jb jb--ter">Watch demo</button>' : '') +
    '</div>';
  const siteNav =
    '<nav class="lam-site-nav" aria-label="Main navigation">' +
    '<div class="lam-site-nav__logo" role="img" aria-label="Brand logo"></div>' +
    '<button class="lam-site-nav__hamburger" aria-label="Open menu">' + hamburgerIcon + '</button>' +
    '</nav>';

  const nav = lamShowMenu ? siteNav : '';
  const contentBlocks = (lamShowEyebrow ? eyebrow : '') + info + cta;

  const imgBlock = '<div class="lam-bottom-image">' + imgSource + '</div>';

  let html: string;
  if (isMobile) {
    const mobileContent =
      '<div class="lam-mobile-content" style="align-items:' + alignItems + '; text-align:' + textAlign + ';">' +
      contentBlocks + '</div>';
    if (isImgFull) {
      const fullImgSrc = lamCustomImg || LAM_SAMPLE_IMG;
      html =
        '<div class="lam-mobile-wrapper lam-mobile-wrapper--img-full">' +
        '<img class="lam-container__bg" src="' + fullImgSrc + '" alt="" loading="lazy" />' +
        nav + mobileContent + '</div>';
    } else {
      html =
        '<div class="lam-mobile-wrapper">' + nav + mobileContent +
        ((isImgRight || isImgBottom) ? '<div class="lam-mobile-image">' + imgSource + '</div>' : '') +
        '</div>';
    }
  } else if (isImgRight) {
    html =
      '<div class="lam-split">' +
      '<div class="lam-split__content" style="align-items:' + alignItems + '; text-align:' + textAlign + ';">' +
      contentBlocks + '</div>' +
      '<div class="lam-split__image">' + imgSource + '</div>' +
      '</div>';
  } else if (isImgBottom) {
    html =
      nav +
      '<div class="lam-container" style="align-items:' + alignItems + ';">' + contentBlocks + '</div>' +
      imgBlock;
  } else if (isImgFull) {
    const fullImgSrc = lamCustomImg || LAM_SAMPLE_IMG;
    html =
      nav +
      '<div class="lam-container lam-container--img-full" style="align-items:' + alignItems + ';">' +
      '<img class="lam-container__bg" src="' + fullImgSrc + '" alt="" loading="lazy" />' +
      contentBlocks + '</div>';
  } else {
    html =
      nav +
      '<div class="lam-container" style="align-items:' + alignItems + ';">' + contentBlocks + '</div>';
  }

  const previewEl = document.getElementById('lam-preview');
  if (previewEl) previewEl.innerHTML = html;

  // ── Generate clean code snippet ──
  let c = '';
  const indent = '  ';
  if (isImgFull && !isMobile) {
    c += '<div class="lam-container lam-container--img-full">\n';
  } else if (isMobile && isImgFull) {
    c += '<div class="lam-mobile-wrapper lam-mobile-wrapper--img-full">\n';
    if (lamShowMenu) c += indent + '<nav class="lam-site-nav">...</nav>\n';
    c += indent + '<div class="lam-mobile-content">\n';
  } else if (isMobile) {
    c += '<div class="lam-mobile-wrapper">\n';
    if (lamShowMenu) c += indent + '<nav class="lam-site-nav">...</nav>\n';
    c += indent + '<div class="lam-mobile-content">\n';
  } else if (isImgRight) {
    c += '<div class="lam-split">\n';
    c += indent + '<div class="lam-split__content">\n';
  } else {
    c += '<div class="lam-container">\n';
  }

  const inner = isImgRight || isMobile ? '    ' : indent;
  if (!isMobile && !isImgRight && lamShowMenu) c += inner + '<nav class="lam-site-nav">...</nav>\n';
  if (lamShowEyebrow) c += inner + '<div class="lam-eyebrow">...</div>\n';
  c += inner + '<div class="lam-info">\n';
  if (lamShowKicker) c += inner + '  <div class="lam-kicker">Kicker text</div>\n';
  c += inner + '  <h1 class="lam-title">Title</h1>\n';
  c += inner + '  <div class="lam-paragraph">Paragraph</div>\n';
  c += inner + '</div>\n';
  c += inner + '<div class="lam-cta">\n';
  c += inner + '  <button class="jb jb--sec">Secondary</button>\n';
  if (lamShowOutline) c += inner + '  <button class="jb jb--ter">Tertiary</button>\n';
  c += inner + '</div>\n';

  if (isMobile) {
    c += indent + '</div>\n';
    if (isImgRight || isImgBottom) c += indent + '<div class="lam-mobile-image"><img src="..." alt="..." /></div>\n';
    c += '</div>';
  } else if (isImgRight) {
    c += indent + '</div>\n';
    c += indent + '<div class="lam-split__image"><img src="..." alt="..." /></div>\n';
    c += '</div>';
  } else {
    if (isImgBottom) c += '</div>\n<div class="lam-bottom-image"><img src="..." alt="..." /></div>';
    else c += '</div>';
  }

  const lamCodeEl = document.getElementById('lam-code');
  if (lamCodeEl) lamCodeEl.innerHTML = hlHTML(c);
}

// ── Viewport / device management ──

function lamSetViewport(w: number, el?: HTMLElement): void {
  lamWidth = w;

  let bp: string;
  if (w <= 639) bp = 'mobile';
  else if (w <= 1023) bp = 'tablet';
  else bp = 'desktop';

  lamDevice = bp;

  // Deselect all device buttons (scoped)
  if (el) {
    const bar = el.closest('.lam-device-bar');
    if (bar) bar.querySelectorAll('.lam-device').forEach(b => b.classList.remove('on'));
    el.classList.add('on');
  }

  const viewport = document.getElementById('lam-viewport');
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
    const breakout = document.getElementById('lam-breakout');
    if (breakout) breakout.style.padding = (bp === 'desktop' && w >= 940) ? '0' : '24px';
  }

  // Update width label
  const deviceLabel = bp.charAt(0).toUpperCase() + bp.slice(1);
  const label = document.getElementById('lam-width-label');
  if (label) label.textContent = deviceLabel + ' \u00b7 ' + w + 'px';

  // Img Right only available on desktop — hide on tablet/mobile
  const isSmall = bp === 'mobile' || bp === 'tablet';
  const imgBtns = document.querySelectorAll('#lam-img-pills button');
  imgBtns.forEach(b => {
    if (b.textContent!.trim() === 'Right') {
      (b as HTMLElement).style.display = isSmall ? 'none' : '';
    }
  });
  if (isSmall && lamImgPos === 'right') {
    lamImgPos = 'none';
    imgBtns.forEach(b => {
      b.classList.toggle('on', b.textContent!.trim() === 'None');
    });
  }

  lamRender();
}

// ── Image upload / clear ──

function lamUploadImg(input: HTMLInputElement): void {
  if (!input.files || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    lamCustomImg = (e.target as FileReader).result as string;
    const clearBtn = document.getElementById('lam-clear-img');
    if (clearBtn) clearBtn.style.display = 'flex';
    const uploadLabel = document.getElementById('lam-upload-label');
    if (uploadLabel) {
      const svg = uploadLabel.querySelector('svg');
      if (svg) svg.style.display = 'none';
      if (uploadLabel.childNodes[2]) {
        uploadLabel.childNodes[2].textContent = ' ' + input.files![0].name.slice(0, 18);
      }
    }
    lamRender();
  };
  reader.readAsDataURL(input.files[0]);
}

function lamClearImg(): void {
  lamCustomImg = null;
  const clearBtn = document.getElementById('lam-clear-img');
  if (clearBtn) clearBtn.style.display = 'none';
  const uploadLabel = document.getElementById('lam-upload-label');
  if (uploadLabel) {
    const svg = uploadLabel.querySelector('svg');
    if (svg) svg.style.display = '';
    if (uploadLabel.childNodes[2]) {
      uploadLabel.childNodes[2].textContent = '\n        Upload image\n      ';
    }
  }
  lamRender();
}

// ── Reset ──

/* lamReset removed — simplified UI no longer needs a reset button */

// ── Init (called after content is rendered) ──

function lamInit(): void {
  // Initialize state
  lamWidth = 1440;
  lamDevice = 'desktop';
  lamAlign = 'center';
  lamImgPos = 'none';
  lamShowLogo = true;
  lamShowEyebrow = true;
  lamShowOutline = true;
  lamRender();

  // Reset width label
  const wl = document.getElementById('lam-width-label');
  if (wl) wl.textContent = 'Desktop \u00b7 1440px';

  // Abort previous listeners
  if (lamAbort) lamAbort.abort();
  lamAbort = new AbortController();
  const sig = { signal: lamAbort.signal };

  // Wire up device bar buttons (using id selector + data-width)
  const deviceBar = document.getElementById('lam-device-bar');
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
        lamSetViewport(w, btn);
      }, sig);
    });
  }

  // Wire up align pill group (using data-val)
  const alignPills = document.getElementById('lam-align-pills');
  if (alignPills) {
    setupRadioGroup(alignPills, (btn) => {
      lamAlign = btn.dataset.val || 'center';
      lamRender();
    });
  }

  // Wire up image position pill group (using data-val)
  const imgPills = document.getElementById('lam-img-pills');
  if (imgPills) {
    setupRadioGroup(imgPills, (btn) => {
      lamImgPos = btn.dataset.val || 'none';
      lamRender();
    });
  }

  // Wire up toggle checkboxes
  const toggleMap: Record<string, (val: boolean) => void> = {
    'lam-show-logo': (val) => { lamShowLogo = val; },
    'lam-show-eyebrow': (val) => { lamShowEyebrow = val; },
    'lam-show-secondary': (val) => { lamShowOutline = val; },
  };
  Object.entries(toggleMap).forEach(([id, setter]) => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (el) {
      el.addEventListener('change', () => {
        setter(el.checked);
        lamRender();
      }, sig);
    }
  });

  // Wire up image upload
  const uploadInput = document.getElementById('lam-upload-input') as HTMLInputElement | null;
  if (uploadInput) {
    uploadInput.addEventListener('change', () => lamUploadImg(uploadInput), sig);
  }

  // Wire up image clear
  const clearBtn = document.getElementById('lam-clear-img');
  if (clearBtn) clearBtn.addEventListener('click', lamClearImg, sig);

  // Wire up copy button
  const copyBtn = document.getElementById('lam-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const codeEl = document.getElementById('lam-code');
      if (codeEl) {
        copyToClipboard(codeEl.textContent || '');
        showToast('Copied!');
      }
    });
  }
}

// ── Template: Preview playground ──

const lamPreview = `
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="lam-device-bar" role="radiogroup" aria-label="Device size">
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
    <span class="pg-controls__label">Align</span>
    <div class="btn-pills" id="lam-align-pills" role="radiogroup" aria-label="Text alignment">
      <button class="on" data-val="center" role="radio" aria-checked="true">Center</button>
      <button data-val="left" role="radio" aria-checked="false">Left</button>
    </div>
    <span class="pg-controls__sep"></span>
    <span class="pg-controls__label">Image</span>
    <div class="btn-pills" id="lam-img-pills" role="radiogroup" aria-label="Image position">
      <button class="on" data-val="none" role="radio" aria-checked="true">None</button>
      <button data-val="full" role="radio" aria-checked="false">Full</button>
      <button data-val="right" role="radio" aria-checked="false">Right</button>
      <button data-val="bottom" role="radio" aria-checked="false">Bottom</button>
    </div>
  </div>
</div>

<div class="pg-preview">
  <div class="lam-breakout" id="lam-breakout">
    <div class="lam-viewport" id="lam-viewport" data-bp="desktop">
      <div class="lam-preview-frame" id="lam-preview" data-surface="light"></div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="lam-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="lam-sticky">
  <span class="pg-controls__label pg-controls__stencil">Look at Me</span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="lam-show-eyebrow" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Eyebrow</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="lam-show-secondary" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Tertiary (CTA)</label>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button class="code-snippet__copy" id="lam-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="lam-code"></code></pre>
</div>
`;

// (Anatomy merged into Specs tab)

// ── Template: Specs / Tokens ──

const lamTokens = `
<div class="anatomy-wrap" style="margin-bottom:var(--sp-5);">
  <div class="anatomy__head"><span class="anatomy__head-title">Anatomy</span></div>
  <div class="anatomy__content" style="padding:var(--sp-5);overflow-x:auto;">
    <pre class="anatomy__tree"><span style="color:var(--black);font-weight:500;">LookAtMe</span>
\u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">SiteNav</span> <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u2502   \u2514\u2500\u2500 Logo + Hamburger
\u2502
\u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Container</span>
\u2502   \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Logo</span> <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u2502   \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Eyebrow</span> <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u2502   \u2502   \u251c\u2500\u2500 Notification icon
\u2502   \u2502   \u251c\u2500\u2500 Tag
\u2502   \u2502   \u251c\u2500\u2500 News text
\u2502   \u2502   \u251c\u2500\u2500 Dash separator
\u2502   \u2502   \u2514\u2500\u2500 CTA
\u2502   \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Information</span>
\u2502   \u2502   \u251c\u2500\u2500 Kicker <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u2502   \u2502   \u251c\u2500\u2500 Title
\u2502   \u2502   \u2514\u2500\u2500 Paragraph
\u2502   \u2514\u2500\u2500 <span style="color:var(--black);font-weight:500;">CTA</span>
\u2502       \u251c\u2500\u2500 Button Secondary
\u2502       \u2514\u2500\u2500 Button Tertiary <span style="color:var(--grey-500);font-style:italic;">(optional)</span></pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Properties</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Values</th><th>Effect</th></tr></thead>
      <tbody>
        <tr><td>Device</td><td>Desktop (1440), Tablet (768), Mobile (428)</td><td>Scales typography, padding and layout.</td></tr>
        <tr><td>Alignment</td><td>Center, Left</td><td>Center: everything centered. Left: align-items flex-start + text-align left.</td></tr>
        <tr><td>Image</td><td>None, Full, Right, Bottom</td><td>Full: background with overlay. Right: horizontal split. Bottom: image below the content.</td></tr>
        <tr><td>Slots</td><td>Media, Eyebrow, Tertiary</td><td>Individual toggles to show/hide each hero slot.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Responsive specs</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Desktop</th><th>Tablet</th><th>Mobile</th></tr></thead>
      <tbody>
        <tr><td>Container padding</td><td>${snip('--sp-10', '--sp-10')}</td><td>${snip('--sp-9', '--sp-9')} ${snip('--sp-8', '--sp-8')}</td><td>${snip('--sp-8', '--sp-8')} ${snip('--sp-5', '--sp-5')}</td></tr>
        <tr><td>Split content padding</td><td>${snip('--sp-10', '--sp-10')} ${snip('--sp-8', '--sp-8')}</td><td>${snip('--sp-9', '--sp-9')} ${snip('--sp-8', '--sp-8')}</td><td>${snip('--sp-8', '--sp-8')} ${snip('--sp-5', '--sp-5')}</td></tr>
        <tr><td>Container gap</td><td>${snip('--sp-6', '--sp-6')}</td><td>${snip('--sp-5', '--sp-5')}</td><td>${snip('--sp-4', '--sp-4')}</td></tr>
        <tr><td>Info max-width</td><td colspan="3">940px</td></tr>
        <tr><td>Title font</td><td>${snip('--h2', '--h2')}</td><td>${snip('--h2', '--h2')}</td><td>${snip('--h2', '--h2')}</td></tr>
        <tr><td>Side image (Right)</td><td>576px fixed</td><td colspan="2">100% stacked \u00b7 400px / 300px</td></tr>
        <tr><td>Bottom image</td><td>400px</td><td>320px</td><td>240px</td></tr>
        <tr><td>CTA gap</td><td colspan="2">${snip('--sp-5', '--sp-5')}</td><td>${snip('--sp-4', '--sp-4')}, wrap</td></tr>
      </tbody>
    </table>
  </div>
</div>
`;

// (inline onclick helpers removed — all wiring in lamInit via addEventListener)

// ── Page export ──

export const lookAtMePage: PageDef = {
  title: 'Look at Me',
  desc: 'First impression, fully yours. The hero section that adapts to any story.',
  tabs: ['Preview', 'Specs'],
  content: [lamPreview, lamTokens],
  wide: true,
  brandAware: true,
  init: () => {
    lamInit();
  },
};
