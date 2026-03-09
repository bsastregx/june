import type { PageDef } from './page-registry.js';

const LOGO_SRC = '/hero-logo.png';

const gettingStartedLanding = `
<style>
.landing { padding: var(--sp-8) 0 var(--sp-7); }
.landing__hero {
  width: 96px;
  height: 96px;
  border-radius: 16px;
  margin-bottom: var(--sp-5);
  user-select: none;
  -webkit-user-drag: none;
}
.landing__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 48px;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--black);
  margin-bottom: var(--sp-4);
}
.landing__desc {
  font: var(--body-m);
  color: var(--grey-600);
  max-width: 720px;
  margin-bottom: var(--sp-7);
}
.landing__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--sp-4);
  margin-bottom: var(--sp-7);
}
.landing__card {
  background: var(--card);
  border: 1px solid var(--card-border);
  border-radius: var(--r-lg);
  padding: var(--sp-5);
  display: flex; flex-direction: column;
}
.landing__card-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
  color: var(--black);
  margin-bottom: var(--sp-2);
}
.landing__card-desc {
  font: var(--body-s);
  font-weight: 400;
  color: var(--grey-600);
  line-height: 1.5;
}
.landing__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-5);
  padding-top: var(--sp-5);
  border-top: 1px solid var(--card-border);
}
.landing__meta-item {
  font: var(--body-xs);
  font-weight: 400;
  color: var(--grey-600);
}
.landing__meta-val {
  font-weight: 500;
  color: var(--black);
}
@media (max-width: 640px) {
  .landing__title { font-size: 32px; }
  .landing__grid { grid-template-columns: 1fr; }
}
</style>

<div class="landing">
  <img class="landing__hero" src="${LOGO_SRC}" alt="June DS" />
  <h1 class="landing__title">June DS</h1>
  <p class="landing__desc">
    The living reference for genexus.com \u2014 switch brands, try every state, copy tokens. Everything runs in the browser.
  </p>
  <div class="landing__grid">
    <div class="landing__card">
      <span class="landing__card-title">Components</span>
      <span class="landing__card-desc">Ready-made building blocks. Multi-brand, accessible, responsive.</span>
    </div>
    <div class="landing__card">
      <span class="landing__card-title">Tokens</span>
      <span class="landing__card-desc">Exportable CSS custom properties. Zero dependencies.</span>
    </div>
    <div class="landing__card">
      <span class="landing__card-title">Theming</span>
      <span class="landing__card-desc">Three brands, one token base. Colors that adapt across identities.</span>
    </div>
  </div>

  <div class="landing__meta">
    <div class="landing__meta-item"><span class="landing__meta-val">3</span> brands</div>
    <div class="landing__meta-item"><span class="landing__meta-val">10</span> components</div>
    <div class="landing__meta-item"><span class="landing__meta-val">6</span> foundations</div>
    <div class="landing__meta-item"><span class="landing__meta-val">0</span> dependencies</div>
    <div class="landing__meta-item"><span class="landing__meta-val">WCAG 2.2</span> AA</div>
  </div>
</div>
`;

export const gettingStartedPage: PageDef = {
  title: 'Getting Started',
  desc: '',
  tabs: ['Overview'],
  content: [gettingStartedLanding],
  hideHeader: true,
};
