import type { PageDef } from './page-registry.js';
import { copyToClipboard, showToast, snip, snipColor } from '../utils/clipboard.js';
import { hlHTML } from '../utils/syntax-highlight.js';
import { plusIcon, starIcon } from '@june-ds/icons/icons.js';

const si = (svg: string) => svg.replace('<svg', '<svg slot="icon"');

const btnPreview = `
<div class="pg-dm-notice">
  <span class="pg-dm-notice__tag">Coming soon</span>
  <span>Dark mode for June DS components. Previews show the light version.</span>
</div>

<div data-surface="light">

<div class="anatomy-wrap">
  <div class="vcard__head"><span class="vcard__name">Anatomy</span></div>
  <div class="anatomy" id="btn-anatomy">
    <div class="anatomy__btn">
      <june-button variant="primary" style="pointer-events:none;">
        ${si(plusIcon)}Label
      </june-button>
    </div>
    <div class="anatomy__label" style="top:12px; left:50%; transform:translateX(-50%);">height: 48px</div>
    <div class="anatomy__label" style="bottom:12px; left:20px;">padding: 8px 24px (20px with icon)</div>
    <div class="anatomy__label" style="top:50%; right:20px; transform:translateY(-50%);">border-radius: 1000px</div>
    <div class="anatomy__label" style="bottom:12px; right:20px;">gap: 8px</div>
    <div class="anatomy__label" style="top:12px; left:20px;">Medium (500) · 17px/26px · Rubik</div>
    <div class="anatomy__label" style="bottom:12px; left:50%; transform:translateX(-50%);">min-width: 128px</div>
  </div>
</div>

<div class="matrix">
  <div class="matrix__head">
    <span class="matrix__title">State matrix</span>
    <span class="matrix__subtitle">Hover each cell to inspect</span>
  </div>
  <div class="matrix__scroll">
  <div class="matrix__grid" id="btn-matrix">
    <div class="matrix__colhead"></div>
    <div class="matrix__colhead">Primary</div>
    <div class="matrix__colhead">Secondary</div>
    <div class="matrix__colhead">Tertiary</div>
    <div class="matrix__colhead">Outline</div>
    <div class="matrix__colhead">Plain</div>
    <div class="matrix__colhead">Icon</div>

    <div class="matrix__rowlabel">Enabled</div>
    <div class="matrix__cell"><june-button variant="primary">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="secondary">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="tertiary">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="outline">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="plain">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="icon" icon-only label="Add">${si(plusIcon)}</june-button></div>

    <div class="matrix__rowlabel">Hover</div>
    <div class="matrix__cell"><june-button variant="primary" force-state="hover">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="secondary" force-state="hover">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="tertiary" force-state="hover">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="outline" force-state="hover">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="plain" force-state="hover">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="icon" icon-only label="Add" force-state="hover">${si(plusIcon)}</june-button></div>

    <div class="matrix__rowlabel">Focus</div>
    <div class="matrix__cell"><june-button variant="primary" force-state="focus">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="secondary" force-state="focus">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="tertiary" force-state="focus">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="outline" force-state="focus">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="plain" force-state="focus">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="icon" icon-only label="Add" force-state="focus">${si(plusIcon)}</june-button></div>

    <div class="matrix__rowlabel">Active</div>
    <div class="matrix__cell"><june-button variant="primary" force-state="active">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="secondary" force-state="active">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="tertiary" force-state="active">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="outline" force-state="active">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="plain" force-state="active">${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="icon" icon-only label="Add" force-state="active">${si(plusIcon)}</june-button></div>

    <div class="matrix__rowlabel">Disabled</div>
    <div class="matrix__cell"><june-button variant="primary" disabled>${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="secondary" disabled>${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="tertiary" disabled>${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="outline" disabled>${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="plain" disabled>${si(plusIcon)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="icon" icon-only label="Add" disabled>${si(plusIcon)}</june-button></div>
  </div>
  </div>
</div>

<div style="margin-top:var(--sp-5);">
  <div class="matrix">
    <div class="matrix__head"><span class="matrix__title">Focus ring test</span></div>
    <div class="matrix__scroll">
    <div class="matrix__grid" id="btn-focus-body">
      <div class="matrix__colhead"></div>
      <div class="matrix__colhead">Primary</div>
      <div class="matrix__colhead">Secondary</div>
      <div class="matrix__colhead">Tertiary</div>
      <div class="matrix__colhead">Outline</div>
      <div class="matrix__colhead">Plain</div>
      <div class="matrix__colhead">Icon</div>

      <div class="matrix__rowlabel">Tab →</div>
      <div class="matrix__cell"><june-button variant="primary">Primary</june-button></div>
      <div class="matrix__cell"><june-button variant="secondary">Secondary</june-button></div>
      <div class="matrix__cell"><june-button variant="tertiary">Tertiary</june-button></div>
      <div class="matrix__cell"><june-button variant="outline">Outline</june-button></div>
      <div class="matrix__cell"><june-button variant="plain">Plain</june-button></div>
      <div class="matrix__cell"><june-button variant="icon" icon-only label="Star">${si(starIcon)}</june-button></div>
    </div>
    </div>
  </div>
</div>


</div>
`;


const btnTokens = `
<style>
.vcard[id^="btn-"] { scroll-margin-top: 80px; }
</style>

<div class="vcard" id="btn-estructura"><div class="vcard__head"><span class="vcard__name">Structure</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Property</th><th>Value</th></tr></thead><tbody>
    <tr><td>Height</td><td>48px ${snip('--sp-7', '--sp-7')}</td></tr>
    <tr><td>Padding</td><td>8px 24px ${snip('--sp-2', '--sp-2')} ${snip('--sp-5', '--sp-5')}</td></tr>
    <tr><td>Gap</td><td>8px ${snip('--sp-2', '--sp-2')}</td></tr>
    <tr><td>Min-width</td><td>128px</td></tr>
    <tr><td>Border</td><td>1px solid transparent</td></tr>
    <tr><td>Border radius</td><td>100px ${snip('--r-full', '--r-full')}</td></tr>
    <tr><td>Icon</td><td>20\u00D720px</td></tr>
    <tr><td>Font</td><td>Medium (500) · 17px/26px · Rubik ${snip('--label', '--label')}</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="btn-motion"><div class="vcard__head"><span class="vcard__name">States & Motion</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>State</th><th>Effect</th><th>Applies to</th></tr></thead><tbody>
    <tr><td>Hover</td><td>${snip('translateY(-1px)', 'translateY(-1px)')} + ${snip('--shadow-md', '--shadow-md')}</td><td>Primary, Secondary, Tertiary, Outline</td></tr>
    <tr><td>Focus</td><td>outline: ${snip('2px solid', '2px solid')} ${snip('--brand', '--brand')}<br><span style="display:block;margin-top:6px;">outline-offset: ${snip('2px', '2px')}</span></td><td>All variants</td></tr>
    <tr><td>Active</td><td>${snip('scale(0.97)', 'scale(0.97)')}</td><td>All variants</td></tr>
  </tbody></table>
  <table class="tok-table" style="border-top:2px solid var(--card-border);"><thead><tr><th>Transition</th><th>Value</th></tr></thead><tbody>
    <tr><td>Duration / Easing</td><td>120ms ${snip('--duration-fast', '--duration-fast')} \u00B7 ${snip('--ease', '--ease')}</td></tr>
    <tr><td>Properties</td><td>background, color, border-color, box-shadow, transform</td></tr>
    <tr><td>Reduced motion</td><td>${snip('prefers-reduced-motion: reduce', 'prefers-reduced-motion: reduce')} \u2192 ${snip('transition: none', 'transition: none')}</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="btn-colores-marca"><div class="vcard__head"><span class="vcard__name">Colors by brand</span><span style="font-size:12px;font-weight:400;color:var(--grey-600);margin-left:var(--sp-2);">For cross-brand consistency auditing</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Role</th><th>Info</th><th><span class="dot" style="background:#E02B58;width:7px;height:7px;border-radius:50%;display:inline-block"></span> GeneXus</th><th><span class="dot" style="background:#5BA7FF;width:7px;height:7px;border-radius:50%;display:inline-block"></span> Next</th><th><span class="dot" style="background:#BFD732;width:7px;height:7px;border-radius:50%;display:inline-block"></span> GEAI</th></tr></thead><tbody>
    <tr><td>Primary bg</td><td></td><td><span class="sw" style="background:#E02B58"></span>${snipColor('#E02B58')}</td><td><span class="sw" style="background:#5BA7FF"></span>${snipColor('#5BA7FF')}</td><td><span class="sw" style="background:#BFD732;border:1px solid #e0e0e0"></span>${snipColor('#BFD732')}</td></tr>
    <tr><td>Primary hover</td><td></td><td><span class="sw" style="background:#D2285D"></span>${snipColor('#D2285D')}</td><td><span class="sw" style="background:#437DC0"></span>${snipColor('#437DC0')}</td><td><span class="sw" style="background:#8CC63F"></span>${snipColor('#8CC63F')}</td></tr>
    <tr><td>Text on primary</td><td></td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')}</td><td><span class="sw" style="background:#111111"></span>${snipColor('#111111')}</td><td><span class="sw" style="background:#111111"></span>${snipColor('#111111')}</td></tr>
    <tr><td>Secondary bg</td><td></td><td><span class="sw" style="background:#111111"></span>${snipColor('#111111')}</td><td><span class="sw" style="background:#111111"></span>${snipColor('#111111')}</td><td><span class="sw" style="background:#111111"></span>${snipColor('#111111')}</td></tr>
    <tr><td>Secondary text</td><td></td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')}</td></tr>
    <tr><td>Secondary hover bg</td><td style="font-family:var(--font-body);font-size:12px;font-style:italic">color-mix: brand 15% + #111111</td><td><span class="sw" style="background:#30151C"></span>${snipColor('#30151C')}</td><td><span class="sw" style="background:#1C2835"></span>${snipColor('#1C2835')}</td><td><span class="sw" style="background:#2B2F16"></span>${snipColor('#2B2F16')}</td></tr>
    <tr><td>Secondary hover text</td><td></td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')}</td></tr>
    <tr><td>Tertiary bg</td><td></td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')}</td></tr>
    <tr><td>Tertiary text</td><td></td><td><span class="sw" style="background:#111111"></span>${snipColor('#111111')}</td><td><span class="sw" style="background:#111111"></span>${snipColor('#111111')}</td><td><span class="sw" style="background:#111111"></span>${snipColor('#111111')}</td></tr>
    <tr><td>Tertiary hover bg</td><td style="font-family:var(--font-body);font-size:12px;font-style:italic">color-mix: brand 15% + #FFFFFF</td><td><span class="sw" style="background:#FADFE6;border:1px solid #e0e0e0"></span>${snipColor('#FADFE6')}</td><td><span class="sw" style="background:#E6F2FF;border:1px solid #e0e0e0"></span>${snipColor('#E6F2FF')}</td><td><span class="sw" style="background:#F5F9E0;border:1px solid #e0e0e0"></span>${snipColor('#F5F9E0')}</td></tr>
    <tr><td>Tertiary hover text</td><td></td><td><span class="sw" style="background:#E02B58"></span>${snipColor('#E02B58')}</td><td><span class="sw" style="background:#5BA7FF"></span>${snipColor('#5BA7FF')}</td><td><span class="sw" style="background:#BFD732;border:1px solid #e0e0e0"></span>${snipColor('#BFD732')}</td></tr>
    <tr><td>Outline border</td><td></td><td><span class="sw" style="background:#1A1A1A"></span>${snipColor('#1A1A1A')}</td><td><span class="sw" style="background:#1A1A1A"></span>${snipColor('#1A1A1A')}</td><td><span class="sw" style="background:#1A1A1A"></span>${snipColor('#1A1A1A')}</td></tr>
    <tr><td>Outline text</td><td></td><td><span class="sw" style="background:#1A1A1A"></span>${snipColor('#1A1A1A')}</td><td><span class="sw" style="background:#1A1A1A"></span>${snipColor('#1A1A1A')}</td><td><span class="sw" style="background:#1A1A1A"></span>${snipColor('#1A1A1A')}</td></tr>
  </tbody></table>
  <table class="tok-table" style="border-top:2px solid var(--card-border);"><thead><tr><th>Special case (dark surface)</th><th>Values</th></tr></thead><tbody>
    <tr><td>Outline hover</td><td>border: ${snip('transparent', 'transparent')} + bg: ${snip('rgba(255,255,255,0.08)', 'rgba(255,255,255,0.08)')}</td></tr>
    <tr><td>Disabled (all variants)</td><td>bg: <span class="sw" style="background:#2A2F35"></span>${snipColor('#2A2F35')} + color: <span class="sw" style="background:#707880"></span>${snipColor('#707880')}</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="btn-colores-estado"><div class="vcard__head"><span class="vcard__name">Colors by state</span><span style="font-size:12px;font-weight:400;color:var(--grey-600);margin-left:var(--sp-2);">For token-based implementation</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Variant</th><th>Background</th><th>Color</th><th>Border</th></tr></thead><tbody>
    <tr><td>Primary</td><td>${snip('--brand', '--brand')}</td><td>${snip('--brand-on', '--brand-on')}</td><td>transparent</td></tr>
    <tr><td>Primary hover</td><td>${snip('--brand-h', '--brand-h')}</td><td>${snip('--brand-on', '--brand-on')}</td><td>transparent</td></tr>
    <tr><td>Secondary</td><td><span class="sw" style="background:#111111"></span>${snipColor('#111111')}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')}</td><td>transparent</td></tr>
    <tr><td>Secondary hover</td><td><code class="tok tok--static">color-mix(brand 15%, #111)</code></td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')}</td><td>transparent</td></tr>
    <tr><td>Tertiary</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snipColor('#FFFFFF')}</td><td><span class="sw" style="background:#111111"></span>${snipColor('#111111')}</td><td>transparent</td></tr>
    <tr><td>Tertiary hover</td><td><code class="tok tok--static">color-mix(brand 15%, #fff)</code></td><td>${snip('--brand', '--brand')}</td><td>transparent</td></tr>
    <tr><td>Outline</td><td>transparent</td><td><span class="sw" style="background:#1A1A1A"></span>${snipColor('#1A1A1A')}</td><td><span class="sw" style="background:#1A1A1A"></span>${snipColor('#1A1A1A')}</td></tr>
    <tr><td>Outline hover</td><td>transparent</td><td><span class="sw" style="background:#1A1A1A"></span>${snipColor('#1A1A1A')}</td><td><span class="sw" style="background:#D9D9D9;border:1px solid #e0e0e0"></span>${snip('--grey-300', '--grey-300')}</td></tr>
    <tr><td>Plain</td><td>transparent</td><td><span class="sw" style="background:#1A1A1A"></span>${snipColor('#1A1A1A')}</td><td>transparent</td></tr>
    <tr><td>Plain hover</td><td>transparent</td><td><span class="sw" style="background:#1A1A1A"></span>${snipColor('#1A1A1A')}</td><td>transparent<span style="margin-left:var(--sp-2);font-family:var(--font-body);font-size:12px;color:var(--grey-500);font-style:italic">+ underline</span></td></tr>
    <tr><td>Icon</td><td>transparent</td><td><span class="sw" style="background:#1A1A1A"></span>${snipColor('#1A1A1A')}</td><td>transparent</td></tr>
    <tr><td>Icon hover</td><td>transparent</td><td><span class="sw" style="background:#1A1A1A"></span>${snipColor('#1A1A1A')}</td><td>transparent<span style="margin-left:var(--sp-2);font-family:var(--font-body);font-size:12px;color:var(--grey-500);font-style:italic">+ opacity: 0.7</span></td></tr>
    <tr><td>Disabled (all)</td><td><span class="sw" style="background:#EEEEEE;border:1px solid #e0e0e0"></span>${snip('--grey-200', '--grey-200')}</td><td><span class="sw" style="background:#969BA0"></span>${snip('--grey-500', '--grey-500')}</td><td>transparent</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="btn-accessibility"><div class="vcard__head"><span class="vcard__name">Accessibility</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Criterion</th><th>Implementation</th></tr></thead><tbody>
    <tr><td>Semantics</td><td>Native <code class="tok tok--static">&lt;button&gt;</code> in Shadow DOM</td></tr>
    <tr><td>Focus visible</td><td><code class="tok tok--static">:focus-visible</code> with outline 2px + offset 2px</td></tr>
    <tr><td>Icon only</td><td><code class="tok tok--static">aria-label</code> required via prop <code class="tok tok--static">label</code></td></tr>
    <tr><td>Contrast</td><td>\u2265 4.5:1 text, \u2265 3:1 large text (all brands + dark)</td></tr>
    <tr><td>Keyboard</td><td>Tab \u2192 navigate, Enter/Space \u2192 activate</td></tr>
    <tr><td>Reduced motion</td><td>Transitions removed with <code class="tok tok--static">prefers-reduced-motion</code></td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="btn-api"><div class="vcard__head"><span class="vcard__name">API</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Property</th><th style="width:15%">Type</th><th style="width:15%">Default</th><th>Description</th></tr></thead><tbody>
    <tr><td><code class="tok tok--static">variant</code></td><td>string</td><td><code class="tok tok--static">primary</code></td><td>primary | secondary | tertiary | outline | plain | icon</td></tr>
    <tr><td><code class="tok tok--static">disabled</code></td><td>boolean</td><td><code class="tok tok--static">false</code></td><td>Disables the button</td></tr>
    <tr><td><code class="tok tok--static">label</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Accessible text. Required for icon</td></tr>
    <tr><td><code class="tok tok--static">icon-only</code></td><td>boolean</td><td><code class="tok tok--static">false</code></td><td>Hides the text slot</td></tr>
    <tr><td><code class="tok tok--static">force-state</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>hover | focus | active. Showcase/testing only</td></tr>
  </tbody></table>
  <table class="tok-table" style="border-top:2px solid var(--card-border);"><thead><tr><th>Slot</th><th>Description</th></tr></thead><tbody>
    <tr><td>(default)</td><td>Button label. Hidden with <code class="tok tok--static">icon-only</code></td></tr>
    <tr><td><code class="tok tok--static">icon</code></td><td><code class="tok tok--static">&lt;svg slot="icon"&gt;</code> \u2014 20\u00D720px, adjusts left padding</td></tr>
  </tbody></table>
  <div class="table-note">
    Does not emit custom events \u2014 uses the native <code class="tok tok--static">click</code> from the inner <code class="tok tok--static">&lt;button&gt;</code>.
  </div>
</div></div>



`;

export const buttonPage: PageDef = {
  title: 'Button',
  desc: 'The hardest-working element in the UI. Six variants, every brand, always accessible.',
  tabs: ['Preview', 'Specs'],
  content: [btnPreview, btnTokens],
  brandAware: true,
};
