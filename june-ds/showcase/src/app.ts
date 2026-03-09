// June DS Showcase — Entry point
import './styles/global.scss';

// Library components
import '@anthropic/june-ds';

// Showcase components
import './components/app-shell.js';
import './components/sidebar-nav.js';
import './components/dark-mode-toggle.js';
import './components/brand-switcher.js';
import './components/copy-toast.js';
import './components/tab-panel.js';
import './components/code-snippet.js';
import './components/token-pill.js';
import './components/playground-controls.js';

// Type imports for proper casting
import { LitElement } from 'lit';
import type { AppShell } from './components/app-shell.js';
import { type SidebarNav, pageToSection } from './components/sidebar-nav.js';

// Pages
import { pages } from './pages/page-registry.js';

// Utilities
import { copyToClipboard, showToast, setupCopySnippets } from './utils/clipboard.js';
import { hlHTML } from './utils/syntax-highlight.js';
import { setupRadioGroup, initTokAccessibility, initSwatchCopy } from './utils/helpers.js';

// ── Global type declarations for remaining handlers ──
declare global {
  interface Window {
    copyToClipboard: (text: string) => void;
    showToast: (msg: string) => void;
    hlHTML: (code: string) => string;
    setupRadioGroup: (el: HTMLElement, cb?: (btn: HTMLButtonElement) => void) => void;
    _juneCopyRootTokens: () => void;
    renderPage: (id: string) => void;
  }
}

// ── Expose globals for inline onclick handlers in page content ──
window.copyToClipboard = copyToClipboard;
window.showToast = showToast;
window.hlHTML = hlHTML;
window.setupRadioGroup = setupRadioGroup;

window._juneCopyRootTokens = () => {
  const tokens = Array.from(document.styleSheets)
    .flatMap(s => {
      try { return Array.from(s.cssRules); } catch { return []; }
    })
    .filter(r => r instanceof CSSStyleRule && (r as CSSStyleRule).selectorText === ':root')
    .map(r => (r as CSSStyleRule).cssText)
    .join('\n');
  copyToClipboard(tokens || ':root { /* tokens */ }');
  showToast('Copied :root tokens!');
};

// ── URL routing state ──
let _isPopstate = false;

// ── One-time event delegation setup ──
// These are attached to #page once and persist across renderPage calls.
// Since pageEl.innerHTML is replaced on each render, child elements are destroyed
// but the listeners on pageEl itself remain — exactly one per event type.

function setupPageDelegation(pageEl: HTMLElement): void {
  // Tab click delegation (no per-element listeners)
  pageEl.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.tabs button') as HTMLButtonElement;
    if (!btn) return;
    const idx = parseInt(btn.dataset.tabIdx || '0');
    const tabName = btn.dataset.tabName;
    pageEl.querySelectorAll('.tabs button').forEach(b => {
      b.classList.remove('on');
      b.setAttribute('aria-selected', 'false');
      b.setAttribute('tabindex', '-1');
    });
    btn.classList.add('on');
    btn.setAttribute('aria-selected', 'true');
    btn.setAttribute('tabindex', '0');
    pageEl.querySelectorAll('.pane').forEach(pn => pn.classList.remove('on'));
    const target = pageEl.querySelector('.pane[data-pane="' + idx + '"]');
    if (target) target.classList.add('on');

    // Update URL hash to persist tab state
    if (tabName) {
      const pageId = pageEl.getAttribute('data-page-id');
      const tabSlug = tabName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
      window.history.replaceState(null, '', '#' + pageId + '-' + tabSlug);
    }
  });

  // Tab keyboard nav delegation
  pageEl.addEventListener('keydown', (e) => {
    const btn = (e.target as HTMLElement).closest('.tabs button') as HTMLButtonElement;
    if (!btn) return;
    const tabBtns = [...pageEl.querySelectorAll<HTMLButtonElement>('.tabs button')];
    const cur = tabBtns.indexOf(btn);
    let next = -1;
    if (e.key === 'ArrowRight') next = (cur + 1) % tabBtns.length;
    else if (e.key === 'ArrowLeft') next = (cur - 1 + tabBtns.length) % tabBtns.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabBtns.length - 1;
    if (next >= 0) { e.preventDefault(); tabBtns[next].focus(); tabBtns[next].click(); }
  });
}

// ── One-time code-inline copy listener ──
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.classList?.contains('code-inline__copy')) {
    const text = target.dataset.copy || target.parentElement?.textContent?.replace(/\s*$/, '') || '';
    copyToClipboard(text);
    showToast('Copied!');
  }
});

// ── Page rendering ──
function renderPage(id: string): void {
  const p = pages[id];
  if (!p) return;

  const pageEl = document.getElementById('page');
  if (!pageEl) return;

  // Update sidebar active state
  document.querySelectorAll('.sidebar__item').forEach(el =>
    el.classList.toggle('active', (el as HTMLElement).dataset.page === id)
  );

  // Scroll content to top
  const content = document.querySelector('.content');
  if (content) content.scrollTop = 0;

  // Build page HTML
  let html = '';
  if (!p.hideHeader) {
    const section = pageToSection[id];
    if (section) {
      html += '<span class="page-section">' + section + '</span>';
    }
    html += '<div class="page-header">';
    html += '<h2 class="page-title">' + p.title + '</h2>';
    html += '</div>';
    if (p.desc) {
      html += '<p class="page-desc">' + p.desc + '</p>';
    }
  }

  // Check URL hash to restore tab state
  let activeTabIdx = 0;
  const hash = window.location.hash.slice(1);
  if (hash.startsWith(id + '-')) {
    const tabSlug = hash.substring(id.length + 1);
    const foundIdx = p.tabs.findIndex(t => t.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') === tabSlug);
    if (foundIdx >= 0) activeTabIdx = foundIdx;
  }

  // Tabs (hide bar when only 1 tab)
  if (p.tabs.length > 1) {
    html += '<div class="tabs" role="tablist" aria-label="' + (p.title || 'Sections') + '">';
    p.tabs.forEach((t, i) => {
      const tabId = 'tab-' + id + '-' + i;
      const panelId = 'panel-' + id + '-' + i;
      html += '<button class="' + (i === activeTabIdx ? 'on' : '') + '" data-tab-idx="' + i + '" data-tab-name="' + t + '" role="tab" aria-selected="' + (i === activeTabIdx) + '" id="' + tabId + '" aria-controls="' + panelId + '">' + t + '</button>';
    });
    html += '</div>';
  }

  // Panes
  if (p.content && p.content.length) {
    p.content.forEach((c, i) => {
      const tabId = 'tab-' + id + '-' + i;
      const panelId = 'panel-' + id + '-' + i;
      html += '<div class="pane' + (i === activeTabIdx ? ' on' : '') + '" data-pane="' + i + '" role="tabpanel" id="' + panelId + '" aria-labelledby="' + tabId + '">' + c + '</div>';
    });
  }

  pageEl.setAttribute('data-page-id', id);
  if (p.wide) pageEl.setAttribute('data-wide', '');
  else pageEl.removeAttribute('data-wide');
  pageEl.innerHTML = html;

  // Show/hide brand switcher based on page type
  document.dispatchEvent(new CustomEvent('brand-aware-change', { detail: !!p.brandAware }));

  // Update URL hash (skip if triggered by popstate or if already on this page)
  if (!_isPopstate) {
    const currentHash = window.location.hash.slice(1);
    const currentPageId = getPageFromHash(currentHash);

    // Only update hash if navigating to a different page
    // (preserve existing tab state if staying on same page)
    if (currentPageId !== id) {
      const url = new URL(window.location.href);
      url.hash = id;
      window.history.pushState({ page: id }, '', url);
    }
  }

  pageEl.classList.remove('animate');
  requestAnimationFrame(() => {
    pageEl.classList.add('animate');
    initTokAccessibility();
    initSwatchCopy();
    setupCopySnippets();
  });

  // Set initial tabindex for tabs (only active tab in tab order)
  pageEl.querySelectorAll<HTMLButtonElement>('.tabs button')
    .forEach(btn => btn.setAttribute('tabindex', btn.classList.contains('on') ? '0' : '-1'));

  // Init code-inline blocks with syntax highlighting
  initCodeInline();

  // Component-specific inits
  if (p.init) {
    p.init();
  }
}

function initCodeInline(): void {
  document.querySelectorAll('.code-inline:not([data-init])').forEach(el => {
    el.setAttribute('data-init', '1');
    const display = el.innerHTML.trim();
    const full = (el as HTMLElement).dataset.code || display;
    const escaped = (display || full).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    el.innerHTML = '<span class="code-inline__text">' + hlHTML(escaped) + '</span><span class="code-inline__copy" title="Copy" data-copy="' + full.replace(/"/g, '&quot;') + '"></span>';
  });
}

// ── Expose renderPage globally ──
window.renderPage = renderPage;

// ── Handle navigation from landing page cards & sidebar ──
document.addEventListener('click', (e) => {
  const target = (e.target as HTMLElement).closest('[data-navigate]') as HTMLElement;
  if (target) {
    e.preventDefault();
    const page = target.dataset.navigate;
    if (page) {
      renderPage(page);
      const shell = document.querySelector('app-shell') as AppShell | null;
      if (shell) shell.currentPage = page;
    }
  }
});

// ── Listen for sidebar navigation ──
document.addEventListener('navigate', ((e: CustomEvent) => {
  renderPage(e.detail);
}) as EventListener);

// page-change is NOT handled here — the 'navigate' listener above
// already calls renderPage. Handling both causes double init().

// ── Token / snippet click-to-copy ──
// .snip elements are now handled by setupCopySnippets() (called after each render)
// with full keyboard support and inline success feedback

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  // Legacy .tok pills (Colors page, to migrate)
  const tok = target.closest('.tok:not(.tok--static)') as HTMLElement;
  if (tok) {
    copyToClipboard(tok.textContent || '');
    showToast('Copied ' + (tok.textContent || ''));
  }
});

// ── Global brand switching (from topbar brand-switcher) ──
document.addEventListener('brand-change', ((e: CustomEvent) => {
  const page = document.getElementById('page');
  if (page) page.setAttribute('data-brand', e.detail);
}) as EventListener);

// ── Helper to extract page ID from hash (handles both #button and #button-specs) ──
// Page IDs can contain dashes (card-row, show-and-tell, etc.), so we match
// against registered pages by longest prefix first.
function getPageFromHash(hash: string): string {
  if (!hash) return 'getting-started';
  if (pages[hash]) return hash;
  // Sort by length descending so 'card-row' matches before 'card'
  const ids = Object.keys(pages).sort((a, b) => b.length - a.length);
  for (const id of ids) {
    if (hash.startsWith(id + '-')) return id;
  }
  return 'getting-started';
}

// ── Popstate listener for Back/Forward navigation ──
window.addEventListener('popstate', (e: PopStateEvent) => {
  _isPopstate = true;
  const hash = window.location.hash.slice(1);
  const page = e.state?.page || getPageFromHash(hash);
  if (pages[page]) {
    renderPage(page);
    const nav = document.querySelector('sidebar-nav') as SidebarNav | null;
    if (nav) nav.setActive(page);
  }
  _isPopstate = false;
});

// ── Initial render (wait for app-shell to finish its first Lit render) ──
const initialHash = window.location.hash.slice(1);
const startPage = getPageFromHash(initialHash);

const shell = document.querySelector('app-shell');
if (shell) {
  customElements.whenDefined('app-shell').then(async () => {
    await (shell as LitElement).updateComplete;

    // Setup tab delegation once on #page
    const pageEl = document.getElementById('page');
    if (pageEl) setupPageDelegation(pageEl);

    renderPage(startPage);
  });
} else {
  // Fallback: if app-shell isn't in the DOM yet, wait for DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    const pageEl = document.getElementById('page');
    if (pageEl) setupPageDelegation(pageEl);

    renderPage(startPage);
  });
}
