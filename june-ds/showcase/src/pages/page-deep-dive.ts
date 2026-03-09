import type { PageDef } from './page-registry.js';
import { hlHTML } from '../utils/syntax-highlight.js';
import { setupRadioGroup } from '../utils/helpers.js';
import { copyToClipboard, showToast, snip, snipColor } from '../utils/clipboard.js';
import { desktopIcon20, tabletIcon20, phoneIcon20 } from '@june-ds/icons/icons.js';

// ─── Sample image ───

const DD_SAMPLE_IMG = '/lam-sample.png';

// ─── Icons ───

// Unified plus/minus icon (18px) — vertical line scales to 0 on expand
const ddIcon18 = '<svg class="dd__item-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line class="dd__icon-h" x1="3" y1="9" x2="15" y2="9"/><line class="dd__icon-v" x1="9" y1="3" x2="9" y2="15"/></svg>';

// Unified plus/minus icon (24px) — for Simple variant
const ddIcon24 = '<svg class="dd__item-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line class="dd__icon-h" x1="5" y1="12" x2="19" y2="12"/><line class="dd__icon-v" x1="12" y1="5" x2="12" y2="19"/></svg>';

// Arrow icon (for link)
const ddArrowIcon = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12.5l9-9M5.5 3.5h7v7"/></svg>';

// ─── Playground state ───

let ddVariant: 'rich' | 'simple' = 'rich';
let ddSplit: '' | '40-60' | '50-50' | '60-40' = '';
let ddDevice = 'desktop';
let ddWidth = 1440;
let ddActive = 0;

// ─── Sample data: Rich ───

const ddRichItems = [
  { name: 'Finance', desc: 'Leading financial institutions trust our platform to power intelligent automation, fraud detection, and real-time analytics across global markets.', link: 'Read the story' },
  { name: 'Healthcare', desc: 'Hospitals and research labs leverage AI-driven diagnostics and patient management systems built on our enterprise-grade infrastructure.', link: 'Read the story' },
  { name: 'Technology', desc: 'Top tech companies integrate our APIs to ship AI-powered features faster, from code generation to natural language search.', link: 'Read the story' },
  { name: 'Education', desc: 'Universities and edtech platforms use personalized learning models to improve student outcomes at scale.', link: 'Read the story' },
  { name: 'Retail', desc: 'Global retailers deploy recommendation engines and demand forecasting models that drive measurable revenue growth.', link: 'Read the story' },
];

// ─── Sample data: Simple ───

const ddSimpleItems = [
  { name: 'What is the free trial period?', desc: 'The free trial lasts 14 days and includes full access to all platform features. No credit card required to start.' },
  { name: 'How does pricing scale?', desc: 'Pricing is based on API usage with volume discounts. Enterprise plans include dedicated support and custom SLAs.' },
  { name: 'Can I migrate from another provider?', desc: 'Yes. We provide migration tooling and dedicated onboarding support to help you transition without downtime.' },
  { name: 'What security certifications do you have?', desc: 'We are SOC 2 Type II certified, GDPR compliant, and undergo annual third-party security audits.' },
  { name: 'Is there an on-premise deployment option?', desc: 'Enterprise customers can deploy on-premise or in a private cloud environment. Contact sales for details.' },
  { name: 'What support channels are available?', desc: 'All plans include email support. Pro and Enterprise plans add live chat and dedicated Slack channels with guaranteed response times.' },
  { name: 'How do I get started with the API?', desc: 'Sign up for a free account, grab your API key from the dashboard, and follow our quickstart guide. Most teams are up and running in under an hour.' },
];

// ─── Render: Rich variant ───

function ddRenderRich(): string {
  let h = '<div class="dd"' + (ddSplit ? ' data-split="' + ddSplit + '"' : '') + ' data-surface="light">';
  h += '<div class="dd__header">';
  h += '<h2 class="dd__title">Trusted by a lot of cool companies across all industries</h2>';
  h += '<p class="dd__strapline">Discover how businesses worldwide leverage our platform to transform their operations and drive innovation.</p>';
  h += '</div>';
  h += '<div class="dd__body">';
  h += '<div class="dd__list">';

  for (let i = 0; i < ddRichItems.length; i++) {
    const item = ddRichItems[i];
    const isOn = i === ddActive;
    h += '<div class="dd__item' + (isOn ? ' dd__item--on' : '') + '" data-idx="' + i + '">';
    h += '<div class="dd__item-head" role="button" tabindex="0" aria-expanded="' + isOn + '">';
    h += '<span class="dd__item-name">' + item.name + '</span>';
    h += ddIcon18;
    h += '</div>';
    h += '<div class="dd__item-body">';
    h += '<div class="dd__item-content">';
    h += '<p class="dd__item-desc">' + item.desc + '</p>';
    h += '<a class="dd__item-link" href="#">' + item.link + ' ' + ddArrowIcon + '</a>';
    h += '<div class="dd__item-media"><img src="' + DD_SAMPLE_IMG + '" alt="' + item.name + ' case study" /></div>';
    h += '</div>';
    h += '</div>'; // dd__item-body
    h += '</div>';
  }

  h += '<a class="dd__footer" href="#">Check all industries</a>';
  h += '</div>'; // dd__list
  h += '<div class="dd__media"><img src="' + DD_SAMPLE_IMG + '" alt="' + ddRichItems[ddActive].name + ' case study" /></div>';
  h += '</div>'; // dd__body
  h += '</div>'; // dd
  return h;
}

// ─── Render: Simple variant ───

function ddRenderSimple(): string {
  let h = '<div class="dd dd--simple"' + (ddSplit ? ' data-split="' + ddSplit + '"' : '') + ' data-surface="light">';
  h += '<div class="dd__body">';

  // Left column: header
  h += '<div class="dd__header">';
  h += '<h2 class="dd__title">Frequently asked questions</h2>';
  h += '<p class="dd__subtitle">Everything you need to know about the platform. Can\u2019t find what you\u2019re looking for? Contact our support team.</p>';
  h += '</div>';

  // Right column: accordion
  h += '<div class="dd__list">';
  for (let i = 0; i < ddSimpleItems.length; i++) {
    const item = ddSimpleItems[i];
    const isOn = i === ddActive;
    h += '<div class="dd__item' + (isOn ? ' dd__item--on' : '') + '" data-idx="' + i + '">';
    h += '<div class="dd__item-head" role="button" tabindex="0" aria-expanded="' + isOn + '">';
    h += '<span class="dd__item-name">' + item.name + '</span>';
    h += ddIcon24;
    h += '</div>';
    h += '<div class="dd__item-body">';
    h += '<div class="dd__item-content">';
    h += '<p class="dd__item-desc">' + item.desc + '</p>';
    h += '</div>';
    h += '</div>'; // dd__item-body
    h += '</div>';
  }
  h += '</div>'; // dd__list

  h += '</div>'; // dd__body
  h += '</div>'; // dd
  return h;
}

// ─── Toggle accordion item (class-only, no re-render) ───

function ddToggle(idx: number): void {
  if (idx === ddActive) return;

  const container = document.getElementById('dd-preview');
  if (!container) return;

  const items = container.querySelectorAll<HTMLElement>('.dd__item');

  // Remove active from previous
  const prev = items[ddActive];
  if (prev) {
    prev.classList.remove('dd__item--on');
    const prevHead = prev.querySelector('.dd__item-head');
    if (prevHead) prevHead.setAttribute('aria-expanded', 'false');
  }

  // Add active to new
  const next = items[idx];
  if (next) {
    next.classList.add('dd__item--on');
    const nextHead = next.querySelector('.dd__item-head');
    if (nextHead) nextHead.setAttribute('aria-expanded', 'true');
  }

  // Image crossfade (Rich side image)
  if (ddVariant === 'rich') {
    const mediaImg = container.querySelector<HTMLImageElement>('.dd__media img');
    if (mediaImg) {
      mediaImg.style.opacity = '0';
      const onEnd = () => {
        mediaImg.removeEventListener('transitionend', onEnd);
        mediaImg.src = DD_SAMPLE_IMG; // swap src (different per-item in real usage)
        mediaImg.alt = ddRichItems[idx].name + ' case study';
        mediaImg.onload = () => { mediaImg.style.opacity = '1'; };
        // If already cached, fire immediately
        if (mediaImg.complete) mediaImg.style.opacity = '1';
      };
      mediaImg.addEventListener('transitionend', onEnd);
    }
  }

  ddActive = idx;
  ddUpdateCode();
}

// ─── Render (initial only — subsequent interactions are class toggles) ───

function ddRender(): void {
  const el = document.getElementById('dd-preview');
  if (!el) return;

  el.innerHTML = ddVariant === 'simple' ? ddRenderSimple() : ddRenderRich();
  ddAttach();
  ddUpdateCode();
}

// ─── Attach accordion interaction (event delegation, once per container) ───

let ddAttached = false;

function ddAttach(): void {
  if (ddAttached) return;
  const container = document.getElementById('dd-preview');
  if (!container) return;
  ddAttached = true;

  container.addEventListener('click', (e: Event) => {
    const head = (e.target as HTMLElement).closest('.dd__item-head') as HTMLElement | null;
    if (!head) return;
    const item = head.closest('.dd__item') as HTMLElement | null;
    if (!item) return;
    const idx = parseInt(item.dataset.idx || '0', 10);
    ddToggle(idx);
  });

  container.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const head = (e.target as HTMLElement).closest('.dd__item-head') as HTMLElement | null;
    if (!head) return;
    e.preventDefault();
    const item = head.closest('.dd__item') as HTMLElement | null;
    if (!item) return;
    const idx = parseInt(item.dataset.idx || '0', 10);
    ddToggle(idx);
  });
}

// ─── Viewport management ───

function ddSetViewport(w: number, el?: HTMLElement | null): void {
  ddWidth = w;
  ddDevice = w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';

  if (el) {
    const bar = el.closest('.lam-device-bar');
    if (bar) bar.querySelectorAll('.lam-device').forEach(b => b.classList.remove('on'));
    el.classList.add('on');
  }

  const viewport = document.getElementById('dd-viewport');
  if (viewport) {
    viewport.setAttribute('data-bp', ddDevice);
    if (ddDevice === 'desktop') {
      viewport.style.width = '100%';
      viewport.style.maxWidth = 'none';
      viewport.style.margin = '0';
    } else {
      viewport.style.width = w + 'px';
      viewport.style.maxWidth = '100%';
      viewport.style.margin = '0 auto';
    }
    const breakout = document.getElementById('dd-breakout');
    if (breakout) breakout.style.padding = '0';
  }

  const deviceLabel = ddDevice.charAt(0).toUpperCase() + ddDevice.slice(1);
  const label = document.getElementById('dd-width-label');
  if (label) label.textContent = deviceLabel + ' \u00b7 ' + w + 'px';

  ddRender();
}

// ─── Code snippet ───

function ddUpdateCode(): void {
  const codeEl = document.getElementById('dd-code');
  if (!codeEl) return;

  const i = '  ';
  let c = '';

  if (ddVariant === 'simple') {
    c += '<div class="dd dd--simple"' + (ddSplit ? ' data-split="' + ddSplit + '"' : '') + '>\n';
    c += i + '<div class="dd__body">\n';
    c += i + i + '<div class="dd__header">\n';
    c += i + i + i + '<h2 class="dd__title">Title</h2>\n';
    c += i + i + i + '<p class="dd__subtitle">Subtitle text</p>\n';
    c += i + i + '</div>\n';
    c += i + i + '<div class="dd__list">\n';
    c += '\n';
    c += i + i + i + '<!-- Collapsed item -->\n';
    c += i + i + i + '<div class="dd__item">\n';
    c += i + i + i + i + '<div class="dd__item-head" role="button" tabindex="0" aria-expanded="false">\n';
    c += i + i + i + i + i + '<span class="dd__item-name">Question</span>\n';
    c += i + i + i + i + i + '<svg class="dd__item-icon" ...><!-- plus/minus --></svg>\n';
    c += i + i + i + i + '</div>\n';
    c += i + i + i + i + '<div class="dd__item-body">\n';
    c += i + i + i + i + i + '<div class="dd__item-content">\n';
    c += i + i + i + i + i + i + '<p class="dd__item-desc">Answer text...</p>\n';
    c += i + i + i + i + i + '</div>\n';
    c += i + i + i + i + '</div>\n';
    c += i + i + i + '</div>\n';
    c += '\n';
    c += i + i + i + '<!-- Expanded item -->\n';
    c += i + i + i + '<div class="dd__item dd__item--on">\n';
    c += i + i + i + i + '<div class="dd__item-head" role="button" tabindex="0" aria-expanded="true">\n';
    c += i + i + i + i + i + '<span class="dd__item-name">Question</span>\n';
    c += i + i + i + i + i + '<svg class="dd__item-icon" ...><!-- plus/minus --></svg>\n';
    c += i + i + i + i + '</div>\n';
    c += i + i + i + i + '<div class="dd__item-body">\n';
    c += i + i + i + i + i + '<div class="dd__item-content">\n';
    c += i + i + i + i + i + i + '<p class="dd__item-desc">Answer text...</p>\n';
    c += i + i + i + i + i + '</div>\n';
    c += i + i + i + i + '</div>\n';
    c += i + i + i + '</div>\n';
    c += '\n';
    c += i + i + '</div>\n';
    c += i + '</div>\n';
    c += '</div>';
  } else {
    c += '<div class="dd"' + (ddSplit ? ' data-split="' + ddSplit + '"' : '') + '>\n';
    c += i + '<div class="dd__header">\n';
    c += i + i + '<h2 class="dd__title">Title</h2>\n';
    c += i + i + '<p class="dd__strapline">Strapline text</p>\n';
    c += i + '</div>\n';
    c += i + '<div class="dd__body">\n';
    c += i + i + '<div class="dd__list">\n';
    c += '\n';
    c += i + i + i + '<!-- Expanded item -->\n';
    c += i + i + i + '<div class="dd__item dd__item--on">\n';
    c += i + i + i + i + '<div class="dd__item-head" role="button" tabindex="0" aria-expanded="true">\n';
    c += i + i + i + i + i + '<span class="dd__item-name">Finance</span>\n';
    c += i + i + i + i + i + '<svg class="dd__item-icon" ...><!-- plus/minus --></svg>\n';
    c += i + i + i + i + '</div>\n';
    c += i + i + i + i + '<div class="dd__item-body">\n';
    c += i + i + i + i + i + '<div class="dd__item-content">\n';
    c += i + i + i + i + i + i + '<p class="dd__item-desc">Description...</p>\n';
    c += i + i + i + i + i + i + '<a class="dd__item-link" href="#">Read the story</a>\n';
    c += i + i + i + i + i + i + '<div class="dd__item-media"><img src="..." alt="" /></div>\n';
    c += i + i + i + i + i + '</div>\n';
    c += i + i + i + i + '</div>\n';
    c += i + i + i + '</div>\n';
    c += '\n';
    c += i + i + i + '<!-- Collapsed item -->\n';
    c += i + i + i + '<div class="dd__item">\n';
    c += i + i + i + i + '<div class="dd__item-head" role="button" tabindex="0" aria-expanded="false">\n';
    c += i + i + i + i + i + '<span class="dd__item-name">Healthcare</span>\n';
    c += i + i + i + i + i + '<svg class="dd__item-icon" ...><!-- plus/minus --></svg>\n';
    c += i + i + i + i + '</div>\n';
    c += i + i + i + i + '<div class="dd__item-body">\n';
    c += i + i + i + i + i + '<div class="dd__item-content">...</div>\n';
    c += i + i + i + i + '</div>\n';
    c += i + i + i + '</div>\n';
    c += '\n';
    c += i + i + i + '<a class="dd__footer" href="#">Check all industries</a>\n';
    c += i + i + '</div>\n';
    c += i + i + '<div class="dd__media"><img src="..." alt="" /></div>\n';
    c += i + '</div>\n';
    c += '</div>';
  }

  codeEl.innerHTML = hlHTML(c);
}

// ─── Init ───

function ddInit(): void {
  ddVariant = 'rich';
  ddSplit = '';
  ddDevice = 'desktop';
  ddWidth = 1440;
  ddActive = 0;
  ddAttached = false;

  ddSetViewport(1440, document.querySelector('#dd-breakout .lam-device') as HTMLElement | null);
  ddRender();

  // Device bar
  const deviceBar = document.getElementById('dd-device-bar');
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
        ddSetViewport(w, btn);
      });
    });
  }

  // Variant pills
  const variantPills = document.getElementById('dd-variant-pills');
  if (variantPills) {
    setupRadioGroup(variantPills, (btn: HTMLButtonElement) => {
      ddVariant = (btn.dataset.val as 'rich' | 'simple') || 'rich';
      ddActive = 0;
      ddRender();
    });
  }

  // Split pills
  const splitPills = document.getElementById('dd-split-pills');
  if (splitPills) {
    setupRadioGroup(splitPills, (btn: HTMLButtonElement) => {
      ddSplit = (btn.dataset.val as '' | '40-60' | '50-50' | '60-40') || '';
      ddRender();
    });
  }

  // Copy button
  const copyBtn = document.getElementById('dd-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const codeEl = document.getElementById('dd-code');
      if (codeEl) {
        copyToClipboard(codeEl.textContent || '');
        showToast('Copied!');
      }
    });
  }
}

// ─── Preview tab ───

const ddPreview = `
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="dd-device-bar" role="radiogroup" aria-label="Device size">
      <button type="button" class="lam-device on" data-width="1440" role="radio" aria-checked="true" aria-label="Desktop 1440px" title="Desktop 1440px">
        ${desktopIcon20}
      </button>
      <button type="button" class="lam-device" data-width="768" role="radio" aria-checked="false" aria-label="Tablet 768px" title="Tablet 768px">
        ${tabletIcon20}
      </button>
      <button type="button" class="lam-device" data-width="428" role="radio" aria-checked="false" aria-label="Mobile 428px" title="Mobile 428px">
        ${phoneIcon20}
      </button>
    </div>
  </div>
</div>

<div class="pg-preview">
  <div class="lam-breakout" id="dd-breakout" style="padding:0;">
    <div class="lam-viewport" id="dd-viewport" data-bp="desktop">
      <div class="lam-preview-frame" id="dd-preview" data-surface="light" style="overflow:visible"></div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="dd-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="dd-sticky">
  <span class="pg-controls__label pg-controls__stencil">Deep Dive</span>
  <span class="pg-controls__sep"></span>
  <span class="pg-controls__label">Variant</span>
  <div class="btn-pills" id="dd-variant-pills" role="radiogroup" aria-label="Layout variant">
    <button type="button" class="on" data-val="rich" role="radio" aria-checked="true">Rich</button>
    <button type="button" data-val="simple" role="radio" aria-checked="false">Simple</button>
  </div>
  <span class="pg-controls__sep"></span>
  <span class="pg-controls__label">Split</span>
  <div class="btn-pills" id="dd-split-pills" role="radiogroup" aria-label="Column split">
    <button type="button" class="on" data-val="" role="radio" aria-checked="true">Default</button>
    <button type="button" data-val="40-60" role="radio" aria-checked="false">40 / 60</button>
    <button type="button" data-val="50-50" role="radio" aria-checked="false">50 / 50</button>
    <button type="button" data-val="60-40" role="radio" aria-checked="false">60 / 40</button>
  </div>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button type="button" class="code-snippet__copy" id="dd-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="dd-code"></code></pre>
</div>
`;

// ─── Specs tab ───

const ddSpecs = `
<div class="anatomy-wrap" style="margin-bottom:var(--sp-5);">
  <div class="anatomy__head"><span class="anatomy__head-title">Anatomy</span></div>
  <div class="anatomy__content" style="padding:var(--sp-5);overflow-x:auto;">
    <pre class="anatomy__tree"><span style="color:var(--black);font-weight:500;">Deep Dive</span>

<span style="color:var(--black);font-weight:500;">Rich variant</span> <span style="color:var(--grey-500);font-style:italic;">(.dd)</span>
\u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Header</span> (centered, 940px max)
\u2502   \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Title</span> \u2192 h2 (responsive alias)
\u2502   \u2514\u2500\u2500 <span style="color:var(--black);font-weight:500;">Strapline</span> \u2192 highlight-l \u2192 highlight-m \u2192 highlight-s
\u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Body</span> (flex row desktop, column tablet/mobile)
\u2502   \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">List</span> (500px desktop, full-width tablet/mobile)
\u2502   \u2502   \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Item</span> (border-bottom, clickable)
\u2502   \u2502   \u2502   \u251c\u2500\u2500 Head (name + plus icon 18px)
\u2502   \u2502   \u2502   \u2514\u2500\u2500 Content <span style="color:var(--grey-500);font-style:italic;">(expanded only)</span>
\u2502   \u2502   \u2502       \u251c\u2500\u2500 Description \u2192 body-l
\u2502   \u2502   \u2502       \u251c\u2500\u2500 Link \u2192 highlight-s (underlined)
\u2502   \u2502   \u2502       \u2514\u2500\u2500 Inline Image <span style="color:var(--grey-500);font-style:italic;">(tablet/mobile only)</span>
\u2502   \u2502   \u2514\u2500\u2500 <span style="color:var(--black);font-weight:500;">Footer</span> \u2192 highlight-s (underlined)
\u2502   \u2514\u2500\u2500 <span style="color:var(--black);font-weight:500;">Media</span> (side image, r-2xl) <span style="color:var(--grey-500);font-style:italic;">(desktop only)</span>

<span style="color:var(--black);font-weight:500;">Simple variant</span> <span style="color:var(--grey-500);font-style:italic;">(.dd.dd--simple)</span>
\u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Body</span> (flex row desktop, column tablet/mobile)
\u2502   \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Header</span> (left column, flex-1, sticky)
\u2502   \u2502   \u251c\u2500\u2500 Title \u2192 h2 (responsive alias)
\u2502   \u2502   \u2514\u2500\u2500 Subtitle \u2192 highlight-m
\u2502   \u2514\u2500\u2500 <span style="color:var(--black);font-weight:500;">List</span> (right column, flex-1, pr-128)
\u2502       \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Item</span> (border-bottom, gap 32px, clickable)
\u2502       \u2502   \u251c\u2500\u2500 Head (name + plus/minus icon 24px)
\u2502       \u2502   \u2514\u2500\u2500 Content <span style="color:var(--grey-500);font-style:italic;">(expanded only)</span>
\u2502       \u2502       \u2514\u2500\u2500 Description \u2192 body-l
    </pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-7);">
  <div class="vcard__head"><span class="vcard__name">Tokens &amp; Spacing — Rich</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Element</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Container bg</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')} ${snip('--card', '--card')}</td></tr>
        <tr><td>Container radius</td><td>24px ${snip('--r-2xl', '--r-2xl')}</td></tr>
        <tr><td>Container padding (desktop)</td><td>128px all sides ${snip('--sp-10', '--sp-10')}</td></tr>
        <tr><td>Container padding (tablet)</td><td>80px TB / 48px LR ${snip('--sp-9', '--sp-9')} / ${snip('--sp-7', '--sp-7')}</td></tr>
        <tr><td>Container padding (mobile)</td><td>64px TB / 24px LR ${snip('--sp-8', '--sp-8')} / ${snip('--sp-5', '--sp-5')}</td></tr>
        <tr><td>Title</td><td>Semibold (600) \u00b7 Graphik ${snip('--h2', '--h2')} (responsive alias: title-2 \u2192 title-3 \u2192 title-4)</td></tr>
        <tr><td>Strapline (desktop)</td><td>Light (300) \u00b7 26px/36px \u00b7 Graphik ${snip('--highlight-l', '--highlight-l')}</td></tr>
        <tr><td>Strapline (tablet)</td><td>Light (300) \u00b7 20px/30px \u00b7 Graphik ${snip('--highlight-m', '--highlight-m')}</td></tr>
        <tr><td>Strapline (mobile)</td><td>Light (300) \u00b7 17px/26px \u00b7 Graphik ${snip('--highlight-s', '--highlight-s')}</td></tr>
        <tr><td>Title\u2192content gap (desktop)</td><td>128px ${snip('--sp-10', '--sp-10')}</td></tr>
        <tr><td>Column gap (desktop)</td><td>80px ${snip('--sp-9', '--sp-9')}</td></tr>
        <tr><td>Item border</td><td><span class="sw" style="background:#D9D9D9;border:1px solid #e0e0e0"></span>${snipColor('#D9D9D9')} · 1px solid ${snip('--grey-300', '--grey-300')}</td></tr>
        <tr><td>Item name (collapsed)</td><td>Light (300) \u00b7 20px/30px \u00b7 Graphik ${snip('--highlight-m', '--highlight-m')}</td></tr>
        <tr><td>Item name (expanded)</td><td>Semibold (600) \u00b7 20px/30px \u00b7 Graphik ${snip('--title-4', '--title-4')}</td></tr>
        <tr><td>Item padding</td><td>24px TB + 24px right ${snip('--sp-5', '--sp-5')}</td></tr>
        <tr><td>Description</td><td>Light (300) \u00b7 17px/26px \u00b7 Rubik ${snip('--body-m', '--body-m')}</td></tr>
        <tr><td>Story link</td><td>Light (300) \u00b7 17px/26px \u00b7 Graphik ${snip('--highlight-s', '--highlight-s')}</td></tr>
        <tr><td>Content\u2192border gap</td><td>24px ${snip('--sp-5', '--sp-5')}</td></tr>
        <tr><td>Side image radius</td><td>24px ${snip('--r-2xl', '--r-2xl')}</td></tr>
        <tr><td>Footer</td><td>Light (300) \u00b7 17px/26px \u00b7 Graphik, underlined ${snip('--highlight-s', '--highlight-s')}</td></tr>
        <tr><td>Plus icon</td><td>18 \u00d7 18 px, ${snip('--grey-500', '--grey-500')}</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-7);">
  <div class="vcard__head"><span class="vcard__name">Tokens &amp; Spacing — Simple</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Element</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Container bg</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')} ${snip('--card', '--card')}</td></tr>
        <tr><td>Container radius</td><td>24px ${snip('--r-2xl', '--r-2xl')}</td></tr>
        <tr><td>Container padding (desktop)</td><td>128px (L, T, B) \u00b7 0 (R) ${snip('--sp-10', '--sp-10')}</td></tr>
        <tr><td>Title</td><td>Semibold (600) \u00b7 Graphik ${snip('--h2', '--h2')} (responsive alias: title-2 \u2192 title-3 \u2192 title-4)</td></tr>
        <tr><td>Title\u2192subtitle gap</td><td>16px ${snip('--sp-4', '--sp-4')}</td></tr>
        <tr><td>Subtitle</td><td>Light (300) \u00b7 20px/30px \u00b7 Graphik ${snip('--highlight-m', '--highlight-m')}</td></tr>
        <tr><td>Column gap</td><td>64px ${snip('--sp-8', '--sp-8')}</td></tr>
        <tr><td>List right padding</td><td>128px ${snip('--sp-10', '--sp-10')}</td></tr>
        <tr><td>Items gap</td><td>32px ${snip('--sp-6', '--sp-6')}</td></tr>
        <tr><td>Item border</td><td><span class="sw" style="background:#808080"></span>${snipColor('#808080')} · 1px solid ${snip('--grey-500', '--grey-500')}</td></tr>
        <tr><td>Item name</td><td>Semibold (600) \u00b7 17px/26px \u00b7 Graphik ${snip('--title-5', '--title-5')}</td></tr>
        <tr><td>Item head padding-bottom</td><td>16px ${snip('--sp-4', '--sp-4')}</td></tr>
        <tr><td>Expanded body gap</td><td>22px</td></tr>
        <tr><td>Description</td><td>Light (300) \u00b7 17px/26px \u00b7 Rubik ${snip('--body-m', '--body-m')}</td></tr>
        <tr><td>Description color</td><td><span class="sw" style="background:#3D3F40"></span>${snipColor('#3D3F40')} ${snip('--text', '--text')}</td></tr>
        <tr><td>Plus/minus icon</td><td>24 \u00d7 24 px, ${snip('--grey-500', '--grey-500')}</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-7);">
  <div class="vcard__head"><span class="vcard__name">Responsive</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Desktop (1440)</th><th>Tablet (768)</th><th>Mobile (428)</th></tr></thead>
      <tbody>
        <tr><td>Container padding</td><td>128px ${snip('--sp-10', '--sp-10')}</td><td>80/48px ${snip('--sp-9', '--sp-9')}/${snip('--sp-7', '--sp-7')}</td><td>64/24px ${snip('--sp-8', '--sp-8')}/${snip('--sp-5', '--sp-5')}</td></tr>
        <tr><td>Container radius</td><td>${snip('--r-2xl', '--r-2xl')}</td><td>${snip('--r-2xl', '--r-2xl')}</td><td>0 (full-bleed)</td></tr>
        <tr><td>Layout</td><td>Two columns</td><td>Single column</td><td>Single column</td></tr>
        <tr><td>Title font (Rich)</td><td colspan="3">${snip('--h2', '--h2')} (responsive alias: title-2 \u2192 title-3 \u2192 title-4)</td></tr>
        <tr><td>Strapline (Rich)</td><td>${snip('--highlight-l', '--highlight-l')}</td><td>${snip('--highlight-m', '--highlight-m')}</td><td>${snip('--highlight-s', '--highlight-s')}</td></tr>
        <tr><td>Title alignment (Rich)</td><td colspan="3">center (all breakpoints)</td></tr>
        <tr><td>Image (Rich)</td><td>Side column</td><td>Inside item (475px)</td><td>Inside item (239px)</td></tr>
        <tr><td>Simple title</td><td colspan="3">${snip('--h2', '--h2')} (responsive alias: title-2 \u2192 title-3 \u2192 title-4)</td></tr>
        <tr><td>Simple column gap</td><td>64px ${snip('--sp-8', '--sp-8')}</td><td>48px ${snip('--sp-7', '--sp-7')}</td><td>32px ${snip('--sp-6', '--sp-6')}</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-7);">
  <div class="vcard__head"><span class="vcard__name">States</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Element</th><th style="width:20%">State</th><th>Behavior</th></tr></thead>
      <tbody>
        <tr>
          <td>Item head</td>
          <td><code class="tok tok--static">hover</code></td>
          <td>Name color \u2192 ${snip('--brand', '--brand')}</td>
        </tr>
        <tr>
          <td>Item head</td>
          <td><code class="tok tok--static">focus-visible</code></td>
          <td>outline: ${snip('2px solid', '2px solid')} ${snip('--brand', '--brand')}<br><span style="display:block;margin-top:6px;">outline-offset: ${snip('2px', '2px')}</span></td>
        </tr>
        <tr>
          <td>Story link <span style="color:var(--grey-500);font-style:italic;">(Rich)</span></td>
          <td><code class="tok tok--static">hover</code></td>
          <td>color \u2192 ${snip('--brand', '--brand')}</td>
        </tr>
        <tr>
          <td>Footer link <span style="color:var(--grey-500);font-style:italic;">(Rich)</span></td>
          <td><code class="tok tok--static">hover</code></td>
          <td>color \u2192 ${snip('--brand', '--brand')}</td>
        </tr>
        <tr>
          <td>All interactive</td>
          <td><code class="tok tok--static">reduced-motion</code></td>
          <td>All transitions disabled via ${snip('prefers-reduced-motion: reduce', 'prefers-reduced-motion: reduce')}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-7);">
  <div class="vcard__head"><span class="vcard__name">Accessibility</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Feature</th><th>Implementation</th><th>Standard</th></tr></thead>
      <tbody>
        <tr><td>Accordion pattern</td><td><code class="tok tok--static">role="button"</code> + <code class="tok tok--static">aria-expanded</code> on item heads</td><td>WAI-ARIA APG</td></tr>
        <tr><td>Keyboard navigation</td><td>Enter / Space to expand/collapse items</td><td>WCAG 2.1.1</td></tr>
        <tr><td>Focus indicators</td><td><code class="tok tok--static">focus-visible</code> on all interactive elements</td><td>WCAG 2.4.7</td></tr>
        <tr><td>High contrast</td><td><code class="tok tok--static">@media (forced-colors)</code> \u2014 borders on items, outline on focus</td><td>WHCM</td></tr>
        <tr><td>Reduced motion</td><td>All transitions disabled</td><td>WCAG 2.3.3</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-7);">
  <div class="vcard__head"><span class="vcard__name">Column Split</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Attribute</th><th>Values</th><th>Behavior</th></tr></thead>
      <tbody>
        <tr><td><code class="tok tok--static">data-split</code></td><td>${snip('40-60', '40-60')}, ${snip('50-50', '50-50')}, ${snip('60-40', '60-40')}</td><td>Sets the column ratio between the two body children (first-col% / second-col%)</td></tr>
        <tr><td>Default (no attribute)</td><td>\u2014</td><td>Original layout preserved (Rich: 500px list + flex-1 media; Simple: flex-1 header + flex-1 list)</td></tr>
        <tr><td>Desktop only</td><td>\u2014</td><td>Tablet and mobile collapse to single column \u2014 split has no effect</td></tr>
        <tr><td>Simple + split</td><td>\u2014</td><td>Padding resets to symmetric (list internal padding removed) so ratios are accurate</td></tr>
      </tbody>
    </table>
  </div>
</div>
`;

// ─── Page export ───

export const deepDivePage: PageDef = {
  title: 'Deep Dive',
  desc: 'Expand, collapse, explore. Accordion stencil in rich and simple variants.',
  tabs: ['Preview', 'Specs'],
  content: [ddPreview, ddSpecs],
  wide: true,
  brandAware: true,
  init: ddInit,
};
