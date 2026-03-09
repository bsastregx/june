import type { PageDef } from './page-registry.js';
import { showToast } from '../utils/clipboard.js';

const tokensExportContent = `
<style>
.export-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--sp-4); margin-bottom: var(--sp-5); }
.export-card { border: 1px solid var(--card-border); border-radius: var(--r-lg); padding: var(--sp-5); background: var(--card); display: flex; flex-direction: column; }
.export-card__icon { width: 40px; height: 40px; border-radius: var(--r-md); background: var(--grey-100); display: flex; align-items: center; justify-content: center; margin-bottom: var(--sp-3); }
.export-card__icon svg { width: 20px; height: 20px; color: var(--grey-600); }
.export-card__title { font: var(--title-5); color: var(--black); margin-bottom: var(--sp-1); }
.export-card__desc { font: var(--body-s); font-weight: 400; color: var(--grey-600); margin-bottom: var(--sp-4); flex: 1; }
.export-card__btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: var(--r-sm); font-size: 14px; font-weight: 500; cursor: pointer; border: 1.5px solid var(--card-border); background: var(--card); color: var(--black); transition: all .15s; text-decoration: none; }
.export-card__btn:hover { border-color: var(--black); color: var(--black); background: var(--grey-100); }
.export-card__btn svg { width: 14px; height: 14px; }
</style>

<div class="export-grid">
  <div class="export-card">
    <div class="export-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg></div>
    <div class="export-card__title">tokens.json</div>
    <div class="export-card__desc">All tokens in W3C DTCG format. Ready for Style Dictionary or Theo.</div>
    <a class="export-card__btn" href="tokens.json" download>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Download tokens.json
    </a>
  </div>
  <div class="export-card">
    <div class="export-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
    <div class="export-card__title">CSS custom properties</div>
    <div class="export-card__desc">Copy the <code class="tok tok--static">:root</code> block directly into your project.</div>
    <button class="export-card__btn" data-action="copy-root-tokens">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      Copy :root CSS
    </button>
  </div>
</div>
`;

function tokensExportInit(): void {
  document.getElementById('page')?.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest('[data-action]') as HTMLElement;
    if (!el) return;
    if (el.dataset.action === 'copy-root-tokens') {
      window._juneCopyRootTokens();
    }
  });
}

export const tokensExportPage: PageDef = {
  title: 'Tokens export',
  desc: 'Take the system with you. CSS custom properties, JSON \u2014 pick your format.',
  tabs: ['Export'],
  content: [tokensExportContent],
  init: tokensExportInit,
};
