import type { PageDef } from './page-registry.js';
import { snip } from '../utils/clipboard.js';

const shadowsContent = `
<style>
.shadow-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--sp-5); margin-bottom: var(--sp-6); }
.shadow-card { background: var(--card); border-radius: var(--r-lg); padding: var(--sp-4); display: flex; flex-direction: column; gap: var(--sp-3); border: 1px solid var(--card-border); }
.shadow-demo { background: #ffffff; border-radius: var(--r-md); height: 80px; border: 1px solid var(--card-border); }
body.dm .shadow-demo { background: #2a2f38; border-color: #353a44; }
.shadow-name { font: var(--body-xs); font-weight: 600; color: var(--black); }
.shadow-val { font-family: var(--font-mono); font-size: 11px; color: var(--grey-600); line-height: 1.6; word-break: break-all; }
</style>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Elevation scale</span></div>
  <div class="vcard__body" style="padding: var(--sp-5);">
    <div class="shadow-grid">
      <div class="shadow-card" data-shadow="xs">
        <div class="shadow-demo" style="box-shadow: var(--shadow-xs);"></div>
        <div><div class="shadow-name">xs</div><div>${snip('--shadow-xs', '--shadow-xs')}</div><div class="shadow-val">0 1px 2px rgba(0,0,0,0.06)</div></div>
      </div>
      <div class="shadow-card" data-shadow="sm">
        <div class="shadow-demo" style="box-shadow: var(--shadow-sm);"></div>
        <div><div class="shadow-name">sm</div><div>${snip('--shadow-sm', '--shadow-sm')}</div><div class="shadow-val">0 1px 4px rgba(0,0,0,0.08),<br>0 1px 2px rgba(0,0,0,0.04)</div></div>
      </div>
      <div class="shadow-card" data-shadow="md">
        <div class="shadow-demo" style="box-shadow: var(--shadow-md);"></div>
        <div><div class="shadow-name">md</div><div>${snip('--shadow-md', '--shadow-md')}</div><div class="shadow-val">0 4px 12px rgba(0,0,0,0.10),<br>0 1px 3px rgba(0,0,0,0.06)</div></div>
      </div>
      <div class="shadow-card" data-shadow="lg">
        <div class="shadow-demo" style="box-shadow: var(--shadow-lg);"></div>
        <div><div class="shadow-name">lg</div><div>${snip('--shadow-lg', '--shadow-lg')}</div><div class="shadow-val">0 8px 24px rgba(0,0,0,0.12),<br>0 2px 6px rgba(0,0,0,0.06)</div></div>
      </div>
      <div class="shadow-card" data-shadow="xl">
        <div class="shadow-demo" style="box-shadow: var(--shadow-xl);"></div>
        <div><div class="shadow-name">xl</div><div>${snip('--shadow-xl', '--shadow-xl')}</div><div class="shadow-val">0 16px 48px rgba(0,0,0,0.14),<br>0 4px 12px rgba(0,0,0,0.08)</div></div>
      </div>
      <div class="shadow-card" data-shadow="2xl">
        <div class="shadow-demo" style="box-shadow: var(--shadow-2xl);"></div>
        <div><div class="shadow-name">2xl</div><div>${snip('--shadow-2xl', '--shadow-2xl')}</div><div class="shadow-val">0 32px 64px rgba(0,0,0,0.18),<br>0 8px 20px rgba(0,0,0,0.10)</div></div>
      </div>
    </div>
  </div>
</div>

`;

const shadowsTokens = `
<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Tokens</span></div>
  <div class="vcard__body" style="padding: 0;">
    <table class="tok-table">
      <thead><tr><th>Token</th><th>Valor</th><th>Uso</th></tr></thead>
      <tbody>
        <tr><td>${snip('--shadow-xs', '--shadow-xs')}</td><td><code class="tok tok--static">0 1px 2px rgba(0,0,0,0.06)</code></td><td>Inputs, badges</td></tr>
        <tr><td>${snip('--shadow-sm', '--shadow-sm')}</td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-600)">0 1px 4px … + 0 1px 2px …</td><td>Buttons, topbar</td></tr>
        <tr><td>${snip('--shadow-md', '--shadow-md')}</td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-600)">0 4px 12px … + 0 1px 3px …</td><td>Dropdowns</td></tr>
        <tr><td>${snip('--shadow-lg', '--shadow-lg')}</td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-600)">0 8px 24px … + 0 2px 6px …</td><td>Drawers</td></tr>
        <tr><td>${snip('--shadow-xl', '--shadow-xl')}</td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-600)">0 16px 48px … + 0 4px 12px …</td><td>Modals, large panels</td></tr>
        <tr><td>${snip('--shadow-2xl', '--shadow-2xl')}</td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-600)">0 32px 64px … + 0 8px 20px …</td><td>Full overlays, hero cards</td></tr>
      </tbody>
    </table>
  </div>
</div>
`;

export const shadowsPage: PageDef = {
  title: 'Shadows',
  desc: 'Six levels of depth that tell the eye where to look.',
  tabs: ['Elevation', 'Tokens'],
  content: [shadowsContent, shadowsTokens],
};
