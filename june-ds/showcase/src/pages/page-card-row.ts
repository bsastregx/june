import type { PageDef } from './page-registry.js';
import { hlHTML } from '../utils/syntax-highlight.js';
import { setupRadioGroup } from '../utils/helpers.js';
import { copyToClipboard, showToast, snip, snipColor } from '../utils/clipboard.js';
import { desktopIcon20, tabletIcon20, phoneIcon20 } from '@june-ds/icons/icons.js';

// ─── Icons ───

const crArrowIcon = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12.5l9-9M5.5 3.5h7v7"/></svg>';

const crPrevIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';

const crNextIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

// ─── Sample image (same as other stencils) ───

const CR_SAMPLE_IMG = '/lam-sample.png';

// ─── Logo image (for quote cards) ───

const logoImage = '<img src="' + CR_SAMPLE_IMG + '" alt="Company logo" />';

// ─── Playground state ───

let crLayout: 'news' | 'quotes' | 'split' = 'news';
let crDevice = 'desktop';
let crWidth = 1440;
let crShowDesc = true;
let crShowImg = true;
let crShowTag = true;
let crCardCount = 4;
let crCarouselPos = 0;
let crShowSkeleton = false;
let crSkeletonTimer: number | null = null;  // Timeout for skeleton → error state

// ─── Card builders ───

function crInfoCard(idx: number, tag: string, title: string, body: string, link: string): string {
  const tagId = 'cr-tag-' + idx;
  const titleId = 'cr-title-' + idx;
  let h = '<li><article class="cr__card" aria-labelledby="' + titleId + '">';
  if (crShowImg) {
    const positions = ['center 30%', 'center 50%', 'center 70%', 'center 20%', 'center 60%', 'center 40%'];
    h += '<div class="cr__card-img"><img src="' + CR_SAMPLE_IMG + '" alt="" style="object-position:' + positions[idx % positions.length] + '" /></div>';
  }
  h += '<div class="cr__card-content">';
  if (crShowTag) {
    h += '<span class="cr__card-tag" id="' + tagId + '">' + tag + '</span>';
  }
  h += '<h4 class="cr__card-title" id="' + titleId + '">' + title + '</h4>';
  h += '<p class="cr__card-body">' + body + '</p>';
  h += '<a class="cr__card-link" href="#"' + (crShowTag ? ' aria-describedby="' + tagId + '"' : '') + '>' + link + ' ' + crArrowIcon + '</a>';
  h += '</div>';
  h += '</article></li>';
  return h;
}

function crQuoteCard(idx: number, name: string, role: string, quote: string, showLogo: boolean): string {
  const nameId = 'cr-qname-' + idx;
  let h = '<li><article class="cr__card cr__card--quote" aria-labelledby="' + nameId + '">';
  h += '<div class="cr__card-content">';
  h += '<div class="cr__card-meta">';
  h += '<div class="cr__card-name" id="' + nameId + '">' + name + '</div>';
  h += '<div class="cr__card-role">' + role + '</div>';
  h += '</div>';
  h += '<blockquote class="cr__card-body">' + quote + '</blockquote>';
  if (showLogo && crShowImg) {
    h += '<div class="cr__card-logo">' + logoImage + '</div>';
  }
  h += '</div>';  // Close card-content AFTER logo
  h += '</article></li>';
  return h;
}

// ─── Skeleton card builders ───

function crSkeletonInfo(): string {
  let h = '<li><article class="cr__card cr__card--skeleton" aria-hidden="true">';
  if (crShowImg) h += '<div class="cr__skel cr__skel--img"></div>';
  h += '<div class="cr__card-content">';
  if (crShowTag) h += '<div class="cr__skel cr__skel--tag"></div>';
  h += '<div class="cr__skel cr__skel--title"></div>';
  h += '<div class="cr__skel cr__skel--body"></div>';
  h += '<div class="cr__skel cr__skel--body"></div>';
  h += '<div class="cr__skel cr__skel--short"></div>';
  h += '<div class="cr__skel cr__skel--link"></div>';
  h += '</div>';
  h += '</article></li>';
  return h;
}

function crSkeletonQuote(): string {
  let h = '<li><article class="cr__card cr__card--quote cr__card--skeleton" aria-hidden="true">';
  h += '<div class="cr__card-content">';
  h += '<div class="cr__card-meta">';
  h += '<div class="cr__skel cr__skel--title" style="width:50%"></div>';
  h += '<div class="cr__skel cr__skel--tag"></div>';
  h += '</div>';
  h += '<div class="cr__skel cr__skel--body"></div>';
  h += '<div class="cr__skel cr__skel--body"></div>';
  h += '<div class="cr__skel cr__skel--short"></div>';
  h += '</div>';
  if (crShowImg) {
    h += '<div class="cr__card-logo"><div class="cr__skel" style="width:120px;height:36px;border-radius:var(--r-xs)"></div></div>';
  }
  h += '</article></li>';
  return h;
}

// ─── Carousel nav (prev + dots + next) ───

function crNav(): string {
  let h = '<div class="cr__nav">';
  h += '<button type="button" class="cr__prev" aria-label="Previous">' + crPrevIcon + '</button>';
  h += '<div class="cr__dots" role="group" aria-label="Carousel navigation">';
  for (let i = 0; i < crCardCount; i++) {
    const isFirst = i === 0;
    h += '<button type="button" class="cr__dot' + (isFirst ? ' cr__dot--on' : '') + '" data-idx="' + i + '" aria-label="Go to card ' + (i + 1) + '"' + (isFirst ? ' aria-current="true"' : '') + '></button>';
  }
  h += '</div>';
  h += '<button type="button" class="cr__next" aria-label="Next">' + crNextIcon + '</button>';
  h += '</div>';
  return h;
}

function crLiveRegion(): string {
  return '<p class="cr__live" aria-live="polite" aria-atomic="true"></p>';
}

// ─── Sample data ───

const sampleInfoCards = [
  { tag: 'Product', title: 'AI-Powered Insights', body: 'Transform raw data into actionable intelligence with our advanced AI models and real-time analytics. Build intelligent applications that understand context.', link: 'Read more' },
  { tag: 'Engineering', title: 'Scalable Infrastructure', body: 'Build on a foundation designed for enterprise-grade performance, from prototype to production. Our architecture scales seamlessly with your needs.', link: 'Learn more' },
  { tag: 'Research', title: 'Next-Gen Models', body: 'Pushing the boundaries of what\u2019s possible with foundation models trained on diverse, curated datasets. State-of-the-art performance across benchmarks.', link: 'Explore' },
  { tag: 'Design', title: 'Adaptive Interfaces', body: 'Craft experiences that adapt to user behavior with intelligent layout systems and context-aware components. Ship beautiful products faster.', link: 'See details' },
  { tag: 'Security', title: 'Enterprise-Grade Safety', body: 'Built-in guardrails and advanced monitoring ensure your AI deployments meet the highest standards of safety and compliance.', link: 'Read more' },
  { tag: 'Platform', title: 'Developer Experience', body: 'From APIs to SDKs, everything is designed to reduce friction and help your team move from idea to production in record time.', link: 'Discover' },
];

const sampleQuoteCards = [
  { name: 'Sarah Chen', role: 'CTO, Acme Corp', quote: '\u201CThe platform transformed how our engineering team ships features. We\u2019ve cut our development cycle in half and our code quality has never been higher.\u201D', logo: true },
  { name: 'Marcus Johnson', role: 'VP Engineering, Scale AI', quote: '\u201CIntegration was seamless. The AI-powered tools understand our codebase and suggest meaningful improvements that our team actually wants to adopt.\u201D', logo: true },
  { name: 'Elena Rodriguez', role: 'Head of Product, Stripe', quote: '\u201CThe developer experience is unmatched. Our team adopted it within a week and hasn\u2019t looked back. It fundamentally changed our workflow.\u201D', logo: true },
  { name: 'David Park', role: 'Lead Architect, Notion', quote: '\u201CWe replaced three internal tools with a single integration. The ROI was clear within the first month of deployment.\u201D', logo: true },
  { name: 'Aisha Patel', role: 'Director of Engineering, Figma', quote: '\u201CThe quality of code suggestions is remarkable. It understands our patterns and proposes changes that align with our architecture.\u201D', logo: true },
  { name: 'James Wright', role: 'CTO, Linear', quote: '\u201COur team\u2019s velocity increased by 40% after adoption. The tooling just gets out of your way and lets you focus on building.\u201D', logo: true },
];

// ─── Viewport management ───

function crSetViewport(w: number, el?: HTMLElement | null): void {
  crWidth = w;
  crDevice = w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';

  if (el) {
    const bar = el.closest('.lam-device-bar');
    if (bar) bar.querySelectorAll('.lam-device').forEach(b => b.classList.remove('on'));
    el.classList.add('on');
  }

  const viewport = document.getElementById('cr-viewport');
  if (viewport) {
    viewport.setAttribute('data-bp', crDevice);
    if (crDevice === 'desktop') {
      viewport.style.width = '100%';
      viewport.style.maxWidth = 'none';
      viewport.style.margin = '0';
    } else {
      viewport.style.width = w + 'px';
      viewport.style.maxWidth = '100%';
      viewport.style.margin = '0 auto';
    }
    const breakout = document.getElementById('cr-breakout');
    if (breakout) breakout.style.padding = '0';
  }

  const deviceLabel = crDevice.charAt(0).toUpperCase() + crDevice.slice(1);
  const label = document.getElementById('cr-width-label');
  if (label) label.textContent = deviceLabel + ' \u00b7 ' + w + 'px';

  crRender();
}

// ─── Carousel logic ───

function crSlideTo(targetPos: number): void {
  const container = document.getElementById('cr-preview');
  if (!container) return;

  const track = container.querySelector('.cr__track') as HTMLElement | null;
  const row = container.querySelector('.cr__row') as HTMLElement | null;
  if (!track || !row) return;

  const cards = track.querySelectorAll<HTMLElement>('.cr__card');
  if (cards.length < 2) return;

  // Step = card width + gap
  const step = cards[1].offsetLeft - cards[0].offsetLeft;
  const cardW = cards[0].offsetWidth;
  const gap = step - cardW;

  // Total track content width
  const total = cards.length * cardW + (cards.length - 1) * gap;

  // Visible row width (content box)
  const cs = getComputedStyle(row);
  const visible = row.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);

  const maxScroll = Math.max(0, total - visible);
  const maxPos = maxScroll > 0 ? Math.ceil(maxScroll / step) : 0;

  crCarouselPos = Math.max(0, Math.min(targetPos, maxPos));
  const offset = Math.min(crCarouselPos * step, maxScroll);
  track.style.transform = 'translateX(-' + offset + 'px)';

  // Update prev/next button visibility
  const prev = container.querySelector('.cr__prev') as HTMLElement | null;
  const next = container.querySelector('.cr__next') as HTMLElement | null;
  if (prev) {
    prev.style.opacity = crCarouselPos > 0 ? '1' : '0';
    prev.style.pointerEvents = crCarouselPos > 0 ? 'auto' : 'none';
  }
  if (next) {
    next.style.opacity = crCarouselPos < maxPos ? '1' : '0';
    next.style.pointerEvents = crCarouselPos < maxPos ? 'auto' : 'none';
  }

  // Update dots — aria-current for active position
  container.querySelectorAll<HTMLElement>('.cr__dot').forEach((dot, i) => {
    const isActive = i === crCarouselPos;
    dot.classList.toggle('cr__dot--on', isActive);
    if (isActive) {
      dot.setAttribute('aria-current', 'true');
    } else {
      dot.removeAttribute('aria-current');
    }
  });

  // Update scroll hint gradient
  if (row) {
    if (crCarouselPos >= maxPos) {
      row.setAttribute('data-at-end', '');
    } else {
      row.removeAttribute('data-at-end');
    }
  }

  // Update live region for screen readers
  const live = container.closest('.cr')?.querySelector('.cr__live') as HTMLElement | null;
  if (live) {
    live.textContent = 'Card ' + (crCarouselPos + 1) + ' of ' + crCardCount;
  }
}

function crAttachCarousel(): void {
  crCarouselPos = 0;
  const container = document.getElementById('cr-preview');
  if (!container) return;

  // Prev/next buttons
  const prev = container.querySelector('.cr__prev') as HTMLElement | null;
  const next = container.querySelector('.cr__next') as HTMLElement | null;

  if (prev) {
    prev.addEventListener('click', () => crSlideTo(crCarouselPos - 1));
  }
  if (next) {
    next.addEventListener('click', () => crSlideTo(crCarouselPos + 1));
  }

  // Dots — click to jump
  container.querySelectorAll<HTMLElement>('.cr__dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.idx || '0', 10);
      crSlideTo(idx);
    });
  });

  // Keyboard navigation — Arrow Left/Right on carousel region
  const row = container.querySelector('.cr__row') as HTMLElement | null;
  if (row) {
    row.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        crSlideTo(crCarouselPos - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        crSlideTo(crCarouselPos + 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        crSlideTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        crSlideTo(crCardCount - 1);
      }
    });

    // Touch/swipe support — swipe left/right to navigate
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    row.addEventListener('touchstart', (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isSwiping = false;
    }, { passive: true });

    row.addEventListener('touchmove', (e: TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      // Lock to horizontal once swipe direction is determined
      if (!isSwiping && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        isSwiping = true;
      }
      // Prevent vertical scroll while swiping horizontally
      if (isSwiping) e.preventDefault();
    }, { passive: false });

    row.addEventListener('touchend', (e: TouchEvent) => {
      if (!isSwiping) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const threshold = 50; // minimum swipe distance in px
      if (dx < -threshold) {
        crSlideTo(crCarouselPos + 1); // swipe left → next
      } else if (dx > threshold) {
        crSlideTo(crCarouselPos - 1); // swipe right → prev
      }
    }, { passive: true });
  }

  // Initialize carousel state (prev/next visibility, dots, scroll hint gradient)
  crSlideTo(0);
}

// ─── Error state (skeleton timeout) ───

function crRenderErrorState(): void {
  const el = document.getElementById('cr-preview');
  if (!el) return;

  const errorIcon = `<svg class="cr__empty-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="24" cy="24" r="20"/>
    <path d="M24 16v12M24 32h.01"/>
  </svg>`;

  const errorHTML = `
    <div class="cr" data-surface="light">
      <div class="cr__empty">
        ${errorIcon}
        <p class="cr__empty-text">Failed to load cards</p>
        <button type="button" class="jb jb--ter" onclick="window.crRetry()">Retry</button>
      </div>
    </div>
  `;

  el.innerHTML = errorHTML;
}

// ─── Retry (after error state) ───

function crRetry(): void {
  crShowSkeleton = true;
  crRender();
}

// Expose retry to window for onclick
(window as any).crRetry = crRetry;

// ─── Render ───

function crRender(): void {
  const el = document.getElementById('cr-preview');
  if (!el) return;

  let h = '';

  if (crLayout === 'news') {
    h += '<div class="cr" data-surface="light">';
    if (crShowDesc) {
      h += '<div class="cr__header">';
      h += '<div class="cr__kicker">News</div>';
      h += '<h3 class="cr__title">Latest updates</h3>';
      h += '<p class="cr__desc">Stay informed with the latest developments across our platform and research.</p>';
      h += '</div>';
    }
    h += '<div class="cr__row" role="region" aria-roledescription="carousel" aria-label="Latest updates" tabindex="0">';
    h += '<ul class="cr__track">';
    for (let i = 0; i < crCardCount; i++) {
      if (crShowSkeleton) { h += crSkeletonInfo(); }
      else { const c = sampleInfoCards[i % sampleInfoCards.length]; h += crInfoCard(i, c.tag, c.title, c.body, c.link); }
    }
    h += '</ul>';
    h += '</div>';
    h += crNav();
    h += crLiveRegion();
    h += '</div>';
  } else if (crLayout === 'quotes') {
    h += '<div class="cr cr--quotes" data-surface="light">';
    if (crShowDesc) {
      h += '<div class="cr__header">';
      h += '<div class="cr__kicker">Testimonials</div>';
      h += '<h3 class="cr__title">What people are saying</h3>';
      h += '<p class="cr__desc">Hear from the teams building with our platform every day.</p>';
      h += '</div>';
    }
    h += '<div class="cr__carousel">';
    h += '<div class="cr__row" role="region" aria-roledescription="carousel" aria-label="Testimonials" tabindex="0">';
    h += '<ul class="cr__track">';
    for (let i = 0; i < crCardCount; i++) {
      if (crShowSkeleton) { h += crSkeletonQuote(); }
      else { const c = sampleQuoteCards[i % sampleQuoteCards.length]; h += crQuoteCard(i, c.name, c.role, c.quote, c.logo); }
    }
    h += '</ul>';
    h += '</div>';
    h += crNav();
    h += '</div>';
    h += crLiveRegion();
    h += '</div>';
  } else if (crLayout === 'split') {
    h += '<div class="cr cr--split" data-surface="light">';
    h += '<div class="cr__resume">';
    h += '<div class="cr__resume-kicker">Featured</div>';
    h += '<h3 class="cr__resume-title">Build the future of AI</h3>';
    h += '<p class="cr__resume-body">Our platform provides everything you need to create, deploy, and scale intelligent applications that transform your business.</p>';
    h += '<div class="cr__resume-actions">';
    h += '<button type="button" class="jb jb--sec">Get started</button>';
    h += '<button type="button" class="jb jb--ter">Learn more</button>';
    h += '</div>';
    h += '</div>';
    h += '<div class="cr__carousel">';
    h += '<div class="cr__row" role="region" aria-roledescription="carousel" aria-label="Featured articles" tabindex="0">';
    h += '<ul class="cr__track">';
    for (let i = 0; i < crCardCount; i++) {
      if (crShowSkeleton) { h += crSkeletonInfo(); }
      else { const c = sampleInfoCards[i % sampleInfoCards.length]; h += crInfoCard(i, c.tag, c.title, c.body, c.link); }
    }
    h += '</ul>';
    h += '</div>';
    h += crNav();
    h += '</div>';
    h += crLiveRegion();
    h += '</div>';
  }

  el.innerHTML = h;
  crAttachCarousel();
  crUpdateCode();

  // Skeleton timeout: if showing skeleton, set 10s timer to show error state
  if (crShowSkeleton) {
    // Clear any existing timer
    if (crSkeletonTimer !== null) {
      clearTimeout(crSkeletonTimer);
    }

    // Set 10s timeout
    crSkeletonTimer = window.setTimeout(() => {
      crShowSkeleton = false;
      crRenderErrorState();
      crSkeletonTimer = null;
    }, 10000);
  } else {
    // Clear timer if not showing skeleton
    if (crSkeletonTimer !== null) {
      clearTimeout(crSkeletonTimer);
      crSkeletonTimer = null;
    }
  }
}

// ─── Code snippet ───

function crUpdateCode(): void {
  const codeEl = document.getElementById('cr-code');
  if (!codeEl) return;

  const i = '  ';
  let c = '';

  const modifier = crLayout === 'quotes' ? ' cr--quotes' : crLayout === 'split' ? ' cr--split' : '';
  c += '<div class="cr' + modifier + '">\n';

  // Helper: nav snippet at a given base indent
  function navAt(base: string): string {
    let n = '';
    n += base + '<div class="cr__nav">\n';
    n += base + i + '<button type="button" class="cr__prev" aria-label="Previous"><!-- chevron --></button>\n';
    n += base + i + '<div class="cr__dots" role="group" aria-label="Carousel navigation">\n';
    n += base + i + i + '<button type="button" class="cr__dot cr__dot--on" aria-label="Go to card 1" aria-current="true"></button>\n';
    n += base + i + '</div>\n';
    n += base + i + '<button type="button" class="cr__next" aria-label="Next"><!-- chevron --></button>\n';
    n += base + '</div>\n';
    return n;
  }

  // Helper: row snippet at a given base indent
  function rowAt(base: string): string {
    let r = '';
    r += base + '<div class="cr__row" role="region" aria-roledescription="carousel" aria-label="..." tabindex="0">\n';
    r += base + i + '<ul class="cr__track">\n';
    if (crLayout === 'quotes') {
      r += base + i + i + '<li>\n';
      r += base + i + i + i + '<article class="cr__card cr__card--quote" aria-labelledby="name-id">\n';
      r += base + i + i + i + i + '<div class="cr__card-content">\n';
      r += base + i + i + i + i + i + '<div class="cr__card-meta">\n';
      r += base + i + i + i + i + i + i + '<div class="cr__card-name" id="name-id">Name</div>\n';
      r += base + i + i + i + i + i + i + '<div class="cr__card-role">Role</div>\n';
      r += base + i + i + i + i + i + '</div>\n';
      r += base + i + i + i + i + i + '<blockquote class="cr__card-body">\u201CQuote text\u201D</blockquote>\n';
      r += base + i + i + i + i + '</div>\n';
      if (crShowImg) {
        r += base + i + i + i + i + '<div class="cr__card-logo"><img src="..." alt="..." /></div>\n';
      }
      r += base + i + i + i + '</article>\n';
      r += base + i + i + '</li>\n';
      r += base + i + i + '<!-- repeat for each quote -->\n';
    } else {
      r += base + i + i + '<li>\n';
      r += base + i + i + i + '<article class="cr__card" aria-labelledby="title-id">\n';
      if (crShowImg) {
        r += base + i + i + i + i + '<div class="cr__card-img"><img src="..." alt="" /></div>\n';
      }
      r += base + i + i + i + i + '<div class="cr__card-content">\n';
      if (crShowTag) {
        r += base + i + i + i + i + i + '<span class="cr__card-tag" id="tag-id">Tag</span>\n';
      }
      r += base + i + i + i + i + i + '<h4 class="cr__card-title" id="title-id">Card title</h4>\n';
      r += base + i + i + i + i + i + '<p class="cr__card-body">Card body text</p>\n';
      r += base + i + i + i + i + i + '<a class="cr__card-link" href="#"' + (crShowTag ? ' aria-describedby="tag-id"' : '') + '>Link</a>\n';
      r += base + i + i + i + i + '</div>\n';
      r += base + i + i + i + '</article>\n';
      r += base + i + i + '</li>\n';
      r += base + i + i + '<!-- repeat for each card -->\n';
    }
    r += base + i + '</ul>\n';
    r += base + '</div>\n';
    return r;
  }

  if (crLayout === 'news') {
    // News: header + row + nav below
    if (crShowDesc) {
      c += i + '<div class="cr__header">\n';
      c += i + i + '<div class="cr__kicker">News</div>\n';
      c += i + i + '<h3 class="cr__title">Title</h3>\n';
      c += i + i + '<p class="cr__desc">Description</p>\n';
      c += i + '</div>\n';
    }
    c += rowAt(i);
    c += navAt(i);
  } else if (crLayout === 'split') {
    // Split: resume + carousel wrapper (row + nav below)
    c += i + '<div class="cr__resume">\n';
    c += i + i + '<div class="cr__resume-kicker">Kicker</div>\n';
    c += i + i + '<h3 class="cr__resume-title">Title</h3>\n';
    c += i + i + '<p class="cr__resume-body">Body text</p>\n';
    c += i + i + '<div class="cr__resume-actions">\n';
    c += i + i + i + '<button type="button" class="jb jb--sec">Secondary</button>\n';
    c += i + i + i + '<button type="button" class="jb jb--ter">Tertiary</button>\n';
    c += i + i + '</div>\n';
    c += i + '</div>\n';
    c += i + '<div class="cr__carousel">\n';
    c += rowAt(i + i);
    c += navAt(i + i);
    c += i + '</div>\n';
  } else {
    // Quotes: header + carousel wrapper (row + nav below)
    if (crShowDesc) {
      c += i + '<div class="cr__header">\n';
      c += i + i + '<div class="cr__kicker">Testimonials</div>\n';
      c += i + i + '<h3 class="cr__title">Title</h3>\n';
      c += i + i + '<p class="cr__desc">Description</p>\n';
      c += i + '</div>\n';
    }
    c += i + '<div class="cr__carousel">\n';
    c += rowAt(i + i);
    c += navAt(i + i);
    c += i + '</div>\n';
  }
  c += i + '<p class="cr__live" aria-live="polite" aria-atomic="true"></p>\n';
  c += '</div>';

  codeEl.innerHTML = hlHTML(c);
}

// ─── Init ───

function crInit(): void {
  crLayout = 'news';
  crDevice = 'desktop';
  crWidth = 1440;
  crShowDesc = true;
  crShowImg = true;
  crShowTag = true;
  crCardCount = 4;
  crCarouselPos = 0;
  crShowSkeleton = false;

  crSetViewport(1440, document.querySelector('#cr-breakout .lam-device') as HTMLElement | null);
  crRender();

  // Device bar
  const deviceBar = document.getElementById('cr-device-bar');
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
        crSetViewport(w, btn);
      });
    });
  }

  // Layout pills
  const layoutPills = document.getElementById('cr-layout-pills');
  if (layoutPills) {
    setupRadioGroup(layoutPills, (btn: HTMLButtonElement) => {
      crLayout = (btn.dataset.val as 'news' | 'quotes' | 'split') || 'news';
      // Show/hide description toggle (hidden in split mode)
      const descGroup = document.getElementById('cr-desc-group');
      if (descGroup) descGroup.style.display = crLayout === 'split' ? 'none' : '';
      // Update image label
      const imgLabel = document.getElementById('cr-img-label');
      if (imgLabel) imgLabel.textContent = crLayout === 'quotes' ? 'Logo' : 'Image';
      // Show/hide tag toggle (only for info cards)
      const tagGroup = document.getElementById('cr-tag-group');
      if (tagGroup) tagGroup.style.display = crLayout === 'quotes' ? 'none' : '';
      crRender();
    });
  }

  // Description toggle
  const descEl = document.getElementById('cr-show-desc') as HTMLInputElement | null;
  if (descEl) {
    descEl.addEventListener('change', () => {
      crShowDesc = descEl.checked;
      crRender();
    });
  }

  // Image toggle
  const imgEl = document.getElementById('cr-show-img') as HTMLInputElement | null;
  if (imgEl) {
    imgEl.addEventListener('change', () => {
      crShowImg = imgEl.checked;
      crRender();
    });
  }

  // Tag toggle
  const tagEl = document.getElementById('cr-show-tag') as HTMLInputElement | null;
  if (tagEl) {
    tagEl.addEventListener('change', () => {
      crShowTag = tagEl.checked;
      crRender();
    });
  }

  // Skeleton toggle (for testing skeleton → error state timeout)
  const skeletonEl = document.getElementById('cr-show-skeleton') as HTMLInputElement | null;
  if (skeletonEl) {
    skeletonEl.addEventListener('change', () => {
      crShowSkeleton = skeletonEl.checked;
      crRender();
    });
  }

  // Copy button
  const copyBtn = document.getElementById('cr-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const codeEl = document.getElementById('cr-code');
      if (codeEl) {
        copyToClipboard(codeEl.textContent || '');
        showToast('Copied!');
      }
    });
  }
}

// ─── Preview tab ───

const crPreview = `
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="cr-device-bar" role="radiogroup" aria-label="Device size">
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
  <div class="lam-breakout" id="cr-breakout" style="padding:0;">
    <div class="lam-viewport" id="cr-viewport" data-bp="desktop">
      <div class="lam-preview-frame" id="cr-preview" data-surface="light" style="overflow:visible"></div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="cr-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="cr-sticky">
  <span class="pg-controls__label pg-controls__stencil">Card Row</span>
  <span class="pg-controls__sep"></span>
  <span class="pg-controls__label">Variant</span>
  <div class="btn-pills" id="cr-layout-pills" role="radiogroup" aria-label="Layout variant">
    <button type="button" class="on" data-val="news" role="radio" aria-checked="true">News</button>
    <button type="button" data-val="quotes" role="radio" aria-checked="false">Quotes</button>
    <button type="button" data-val="split" role="radio" aria-checked="false">Split News</button>
  </div>
  <span id="cr-desc-group" style="display:contents;">
    <span class="pg-controls__sep"></span>
    <label class="eb-toggle"><input type="checkbox" checked id="cr-show-desc" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Description</label>
  </span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="cr-show-img" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span><span id="cr-img-label">Image</span></label>
  <span id="cr-tag-group" style="display:contents;">
    <span class="pg-controls__sep"></span>
    <label class="eb-toggle"><input type="checkbox" checked id="cr-show-tag" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Tag</label>
  </span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" id="cr-show-skeleton" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Skeleton</label>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button type="button" class="code-snippet__copy" id="cr-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="cr-code"></code></pre>
</div>
`;

// ─── Specs tab ───

const crSpecs = `
<div class="anatomy-wrap" style="margin-bottom:var(--sp-5);">
  <div class="anatomy__head"><span class="anatomy__head-title">Anatomy</span></div>
  <div class="anatomy__content" style="padding:var(--sp-5);overflow-x:auto;">
    <pre class="anatomy__tree"><span style="color:var(--black);font-weight:500;">Card Row</span>
\u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Header</span> <span style="color:var(--grey-500);font-style:italic;">(News / Quotes)</span>
\u2502   \u251c\u2500\u2500 Title \u2192 h2 (responsive alias)
\u2502   \u2514\u2500\u2500 Description \u2192 highlight-s <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Resume</span> <span style="color:var(--grey-500);font-style:italic;">(Split News only)</span>
\u2502   \u251c\u2500\u2500 Kicker \u2192 highlight-s
\u2502   \u251c\u2500\u2500 Title \u2192 h2 (responsive alias)
\u2502   \u251c\u2500\u2500 Body \u2192 body-l
\u2502   \u2514\u2500\u2500 Actions (secondary pill + tertiary)
\u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Carousel</span> <span style="color:var(--grey-500);font-style:italic;">(Quotes / Split: row + nav column)</span>
\u2502   \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Row</span> (overflow: clip \u2014 carousel)
\u2502   \u2514\u2500\u2500 <span style="color:var(--black);font-weight:500;">Nav</span> (prev + dots + next, centered)
\u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Row</span> (overflow: clip \u2014 carousel) <span style="color:var(--grey-500);font-style:italic;">(News: direct child)</span>
\u2502   \u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Info Card</span> (512\u00d7760 desktop, white bg, r-md)
\u2502   \u2502   \u251c\u2500\u2500 Image (272px, r-md top) <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u2502   \u2502   \u2514\u2500\u2500 Content (flex-col, gap sp-4)
\u2502   \u2502       \u251c\u2500\u2500 Tag (pill, grey-300 bg, r-xs) <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u2502   \u2502       \u251c\u2500\u2500 Title \u2192 title-4 / title-5 (tablet/mobile)
\u2502   \u2502       \u251c\u2500\u2500 Body \u2192 body-l (flex: 1, overflow hidden)
\u2502   \u2502       \u2514\u2500\u2500 Link (underlined, body-l)
\u2502   \u2514\u2500\u2500 <span style="color:var(--black);font-weight:500;">Quote Card</span> (512\u00d7760 desktop, grey-50 bg, r-md)
\u2502       \u251c\u2500\u2500 Content (flex-col, gap sp-6)
\u2502       \u2502   \u251c\u2500\u2500 Meta (name + role)
\u2502       \u2502   \u2514\u2500\u2500 Quote text (flex: 1, overflow hidden)
\u2502       \u2514\u2500\u2500 Logo (80px max-height) <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
\u251c\u2500\u2500 <span style="color:var(--black);font-weight:500;">Nav</span> (centered below cards) <span style="color:var(--grey-500);font-style:italic;">(News: direct child)</span>
    </pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Props / Classes</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Class</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code class="tok tok--static">.cr</code></td><td><code class="tok tok--static">class</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">\u2014</td><td>Base section class. Always required.</td></tr>
        <tr><td><code class="tok tok--static">.cr--quotes</code></td><td><code class="tok tok--static">modifier</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">\u2014</td><td>Quotes layout: header left (380px), quote cards right.</td></tr>
        <tr><td><code class="tok tok--static">.cr--split</code></td><td><code class="tok tok--static">modifier</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">\u2014</td><td>Split News: resume left (440px), info cards right.</td></tr>
        <tr><td><code class="tok tok--static">.cr__card</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">512\u00d7760</td><td>Info card. Fixed dimensions, white bg.</td></tr>
        <tr><td><code class="tok tok--static">.cr__card--quote</code></td><td><code class="tok tok--static">modifier</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">\u2014</td><td>Quote card variant. Grey-50 bg, name+role+quote.</td></tr>
        <tr><td><code class="tok tok--static">.cr__card-img</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">272px</td><td>Card image area (top, rounded corners). Optional.</td></tr>
        <tr><td><code class="tok tok--static">.cr__card-content</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">\u2014</td><td>Card content wrapper. Flex-col, fills remaining height.</td></tr>
        <tr><td><code class="tok tok--static">.cr__nav</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">\u2014</td><td>Navigation group: prev + dots + next, centered below cards.</td></tr>
        <tr><td><code class="tok tok--static">.cr__carousel</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">\u2014</td><td>Quotes/Split: wraps row + nav in a column. Takes flex:1.</td></tr>
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
        <tr><td>Section padding</td><td>128px ${snip('--sp-10', '--sp-10')}</td></tr>
        <tr><td>Section background</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')} ${snip('--card', '--card')}</td></tr>
        <tr><td>Info card bg</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')} ${snip('--card', '--card')}</td></tr>
        <tr><td>Info card size (desktop)</td><td>512 \u00d7 760 px</td></tr>
        <tr><td>Info card size (tablet/mobile)</td><td>327 \u00d7 464 px</td></tr>
        <tr><td>Card image height</td><td>272px (desktop)</td></tr>
        <tr><td>Quote card bg</td><td><span class="sw" style="background:#F5F5F5;border:1px solid #e0e0e0"></span>${snipColor('#F5F5F5')} ${snip('--grey-100', '--grey-100')}</td></tr>
        <tr><td>Card border-radius</td><td>8px ${snip('--r-md', '--r-md')}</td></tr>
        <tr><td>Tag bg</td><td><span class="sw" style="background:#D9D9D9"></span>${snipColor('#D9D9D9')} ${snip('--grey-300', '--grey-300')}</td></tr>
        <tr><td>Tag border-radius</td><td>4px ${snip('--r-xs', '--r-xs')}</td></tr>
        <tr><td>Content padding (desktop)</td><td>48px top, 32px sides/bottom ${snip('--sp-7', '--sp-7')} / ${snip('--sp-6', '--sp-6')}</td></tr>
        <tr><td>Content padding (tablet/mob)</td><td>32px vert, 24px horiz ${snip('--sp-6', '--sp-6')} / ${snip('--sp-5', '--sp-5')}</td></tr>
        <tr><td>Quote padding (desktop)</td><td>32px all sides ${snip('--sp-6', '--sp-6')}</td></tr>
        <tr><td>Section title</td><td>Graphik ${snip('--h2', '--h2')}</td></tr>
        <tr><td>Description</td><td>Light (300) · 17px/26px · Graphik ${snip('--highlight-s', '--highlight-s')}</td></tr>
        <tr><td>Card title (desktop)</td><td>Semibold (600) · 20px/30px · Graphik ${snip('--title-4', '--title-4')}</td></tr>
        <tr><td>Card title (tablet/mobile)</td><td>Semibold (600) · 17px/26px · Graphik ${snip('--title-5', '--title-5')}</td></tr>
        <tr><td>Card body</td><td>Light (300) · 17px/26px · Rubik ${snip('--body-m', '--body-m')}</td></tr>
        <tr><td>Card link</td><td>Light (300) · 17px/26px · Rubik, underlined ${snip('--body-m', '--body-m')}</td></tr>
        <tr><td>Quote name</td><td>Light (300) · 20px/30px · Graphik ${snip('--highlight-m', '--highlight-m')}</td></tr>
        <tr><td>Quote role</td><td>Light (300) · 12px/20px · Rubik ${snip('--body-xs', '--body-xs')}</td></tr>
        <tr><td>Row gap</td><td>24px / 16px ${snip('--sp-5', '--sp-5')} / ${snip('--sp-4', '--sp-4')}</td></tr>
        <tr><td>Section gap</td><td>64px \u2192 48px \u2192 32px ${snip('--sp-8', '--sp-8')} / ${snip('--sp-7', '--sp-7')} / ${snip('--sp-6', '--sp-6')}</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Breakpoints</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Breakpoint</th><th style="width:20%">Cards</th><th>Behavior</th></tr></thead>
      <tbody>
        <tr><td><code class="tok tok--static">&gt; 1024px</code></td><td>512 \u00d7 760 px</td><td>Full layout. Quotes/Split side-by-side. Row overflows (carousel).</td></tr>
        <tr><td><code class="tok tok--static">\u2264 1023px</code></td><td>327 \u00d7 464 px</td><td>Quotes/Split stack vertically. Title: ${snip('--title-2', '--title-2')}. Body: ${snip('--body-m', '--body-m')}.</td></tr>
        <tr><td><code class="tok tok--static">\u2264 639px</code></td><td>327 \u00d7 464 px</td><td>Row gap: ${snip('--sp-4', '--sp-4')}. Padding: ${snip('--sp-5', '--sp-5')}.</td></tr>
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
        <tr><td>Card hover</td><td><code class="tok tok--static">transform</code></td><td>translateY(-2px)</td><td>${snip('--duration-fast', '--duration-fast')} \u00b7 ${snip('--ease', '--ease')}</td></tr>
        <tr><td>Card hover</td><td><code class="tok tok--static">box-shadow</code></td><td><code class="tok tok--static">0 4px 12px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)</code></td><td>${snip('--shadow-md', '--shadow-md')}</td></tr>
        <tr><td>Link hover</td><td><code class="tok tok--static">color</code></td><td>${snip('--brand', '--brand')}</td><td>${snip('--duration-fast', '--duration-fast')} \u00b7 ${snip('--ease', '--ease')}</td></tr>
        <tr><td>reduced-motion</td><td colspan="3">transform and transition disabled.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Accessibility</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Feature</th><th>Implementation</th><th>Standard</th></tr></thead>
      <tbody>
        <tr><td>Carousel region</td><td><code class="tok tok--static">role="region"</code> + <code class="tok tok--static">aria-roledescription="carousel"</code> + <code class="tok tok--static">aria-label</code></td><td>WAI-ARIA APG</td></tr>
        <tr><td>Semantic cards</td><td><code class="tok tok--static">&lt;ul&gt;</code> &rarr; <code class="tok tok--static">&lt;li&gt;</code> &rarr; <code class="tok tok--static">&lt;article&gt;</code> with <code class="tok tok--static">aria-labelledby</code></td><td>Inclusive Components</td></tr>
        <tr><td>Full-card click</td><td>Pseudo-element <code class="tok tok--static">::after</code> on link (no nested interactives)</td><td>Adrian Roselli / Piccalilli</td></tr>
        <tr><td>Keyboard nav</td><td>Arrow Left/Right, Home/End on carousel region</td><td>WAI-ARIA APG</td></tr>
        <tr><td>Touch/swipe</td><td>Horizontal swipe with 50px threshold, direction lock</td><td>WCAG 2.5.1</td></tr>
        <tr><td>Live region</td><td><code class="tok tok--static">aria-live="polite"</code> announces "Card X of Y"</td><td>WCAG 4.1.3</td></tr>
        <tr><td>Dot navigation</td><td><code class="tok tok--static">aria-current="true"</code> on active dot, <code class="tok tok--static">aria-label</code> per dot</td><td>WAI-ARIA</td></tr>
        <tr><td>Focus indicators</td><td><code class="tok tok--static">focus-visible</code> on all interactive elements, <code class="tok tok--static">focus-within</code> on cards</td><td>WCAG 2.4.7 / 2.4.11</td></tr>
        <tr><td>High contrast</td><td><code class="tok tok--static">@media (forced-colors)</code> &mdash; borders on cards, dots, buttons</td><td>WHCM</td></tr>
        <tr><td>Reduced motion</td><td>All transforms and transitions disabled</td><td>WCAG 2.3.3</td></tr>
      </tbody>
    </table>
  </div>
</div>

`;

// ─── Page export ───

export const cardRowPage: PageDef = {
  title: 'Card Row',
  desc: 'Cards in a row, scrolling on demand. Three layouts for news, quotes, and stories.',
  tabs: ['Preview', 'Specs'],
  content: [crPreview, crSpecs],
  wide: true,
  brandAware: true,
  init: crInit,
};
