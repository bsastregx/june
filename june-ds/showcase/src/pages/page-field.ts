import type { PageDef } from './page-registry.js';
import { hlHTML } from '../utils/syntax-highlight.js';
import { copyToClipboard, showToast, snip, snipColor } from '../utils/clipboard.js';

// ── Preview tab: playground → matrix → focus test ──

const fldPreview = `
<div id="fld-playground" style="background:var(--grey-50);border:1px solid var(--card-border);border-radius:var(--r-lg);padding:var(--sp-5);display:flex;flex-direction:column;gap:var(--sp-5);">
  <div style="display:flex;align-items:flex-start;justify-content:center;padding:var(--sp-6) var(--sp-4);">
    <june-field id="fld-pg-field" type="email" label="Email address" placeholder="you@example.com" hint="We'll never share your email" style="width:100%;max-width:360px;"></june-field>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:var(--sp-3) var(--sp-4);align-items:end;justify-content:center;">
    <div class="pg-controls__group" style="flex-direction:column;align-items:flex-start;gap:var(--sp-1);">
      <label for="fld-pg-type" style="font-size:11px;color:var(--grey-500);font-family:var(--font-body);">Type</label>
      <select id="fld-pg-type" class="eb-input" style="width:100px;">
        <option value="text">text</option>
        <option value="email" selected>email</option>
        <option value="password">password</option>
        <option value="number">number</option>
        <option value="tel">tel</option>
        <option value="url">url</option>
        <option value="search">search</option>
        <option value="textarea">textarea</option>
        <option value="dropdown">dropdown</option>
      </select>
    </div>
    <div class="pg-controls__group" style="flex-direction:column;align-items:flex-start;gap:var(--sp-1);">
      <label for="fld-pg-label" style="font-size:11px;color:var(--grey-500);font-family:var(--font-body);">Label</label>
      <input id="fld-pg-label" type="text" value="Email address" class="eb-input" style="width:120px;" />
    </div>
    <div class="pg-controls__group" style="flex-direction:column;align-items:flex-start;gap:var(--sp-1);">
      <label for="fld-pg-placeholder" style="font-size:11px;color:var(--grey-500);font-family:var(--font-body);">Placeholder</label>
      <input id="fld-pg-placeholder" type="text" value="you@example.com" class="eb-input" style="width:130px;" />
    </div>
    <div class="pg-controls__group" style="flex-direction:column;align-items:flex-start;gap:var(--sp-1);">
      <label for="fld-pg-hint" style="font-size:11px;color:var(--grey-500);font-family:var(--font-body);">Hint</label>
      <input id="fld-pg-hint" type="text" value="We'll never share your email" class="eb-input" style="width:200px;" />
    </div>
    <div class="pg-controls__group" style="flex-direction:column;align-items:flex-start;gap:var(--sp-1);">
      <label for="fld-pg-error" style="font-size:11px;color:var(--grey-500);font-family:var(--font-body);">Error</label>
      <input id="fld-pg-error" type="text" value="" placeholder="(empty)" class="eb-input" style="width:180px;" />
    </div>
    <label style="display:flex;align-items:center;gap:4px;font-size:12px;font-family:var(--font-body);color:var(--grey-500);cursor:pointer;height:30px;"><input type="checkbox" id="fld-pg-required" /> required</label>
    <label style="display:flex;align-items:center;gap:4px;font-size:12px;font-family:var(--font-body);color:var(--grey-500);cursor:pointer;height:30px;"><input type="checkbox" id="fld-pg-disabled" /> disabled</label>
  </div>
  <div class="code-snippet" style="margin-top:var(--sp-4);">
    <div class="code-snippet__head">
      <span class="code-snippet__label">HTML</span>
      <button class="code-snippet__copy" id="fld-copy-btn">Copy</button>
    </div>
    <pre class="code-snippet__pre"><code id="fld-code"></code></pre>
  </div>
</div>

<div class="matrix" style="margin-top:var(--sp-6);">
  <div class="matrix__head">
    <span class="matrix__title">State matrix</span>
    <span class="matrix__subtitle">Each column shows a type, each row a state</span>
  </div>
  <div class="matrix__scroll">
  <div class="matrix__grid" id="fld-matrix" style="grid-template-columns: 120px repeat(3, 1fr);">
    <div class="matrix__colhead"></div>
    <div class="matrix__colhead">Text</div>
    <div class="matrix__colhead">Dropdown</div>
    <div class="matrix__colhead">Textarea</div>

    <div class="matrix__rowlabel">Inactive</div>
    <div class="matrix__cell"><june-field type="text" label="Label" placeholder="Placeholder" hint="Helper text" style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="dropdown" label="Label" hint="Helper text" .options='${JSON.stringify([{value:'1',label:'Option 1'},{value:'2',label:'Option 2'}])}' style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="textarea" label="Label" placeholder="Placeholder" hint="Helper text" rows="2" style="width:100%;"></june-field></div>

    <div class="matrix__rowlabel">Active</div>
    <div class="matrix__cell"><june-field type="text" label="Label" value="User input" hint="Helper text" style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="dropdown" label="Label" value="1" hint="Helper text" .options='${JSON.stringify([{value:'1',label:'Option 1'},{value:'2',label:'Option 2'}])}' style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="textarea" label="Label" value="User input text" hint="Helper text" rows="2" style="width:100%;"></june-field></div>

    <div class="matrix__rowlabel">Hover</div>
    <div class="matrix__cell"><june-field type="text" label="Label" placeholder="Placeholder" force-state="hover" style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="dropdown" label="Label" force-state="hover" .options='${JSON.stringify([{value:'1',label:'Option 1'}])}' style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="textarea" label="Label" placeholder="Placeholder" force-state="hover" rows="2" style="width:100%;"></june-field></div>

    <div class="matrix__rowlabel">Focus</div>
    <div class="matrix__cell"><june-field type="text" label="Label" value="User input" force-state="focus" style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="dropdown" label="Label" value="1" force-state="focus" .options='${JSON.stringify([{value:'1',label:'Option 1'}])}' style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="textarea" label="Label" value="User input" force-state="focus" rows="2" style="width:100%;"></june-field></div>

    <div class="matrix__rowlabel">Error</div>
    <div class="matrix__cell"><june-field type="text" label="Label" value="Invalid" error="This field is required" style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="dropdown" label="Label" error="Please select an option" .options='${JSON.stringify([{value:'1',label:'Option 1'}])}' style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="textarea" label="Label" value="Too short" error="Minimum 20 characters" rows="2" style="width:100%;"></june-field></div>

    <div class="matrix__rowlabel">Disabled</div>
    <div class="matrix__cell"><june-field type="text" label="Label" value="Read only" disabled style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="dropdown" label="Label" disabled .options='${JSON.stringify([{value:'1',label:'Option 1'}])}' style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="textarea" label="Label" value="Read only" disabled rows="2" style="width:100%;"></june-field></div>

    <div class="matrix__rowlabel">Required</div>
    <div class="matrix__cell"><june-field type="text" label="Email" required show-required-text placeholder="you@example.com" hint="We'll never share your email" style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="dropdown" label="Country" required show-required-text hint="Select your country" .options='${JSON.stringify([{value:'us',label:'United States'},{value:'uy',label:'Uruguay'}])}' style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="textarea" label="Message" required show-required-text placeholder="Tell us more..." rows="2" style="width:100%;"></june-field></div>
  </div>
  </div>
</div>

<div style="margin-top:var(--sp-5);">
  <div class="vcard">
    <div class="vcard__head"><span class="vcard__name">Focus ring test</span></div>
    <div class="vcard__body" id="fld-focus-body" style="display:flex;flex-direction:column;gap:16px;padding:24px;">
      <span class="vcard__state">Tab \u2192</span>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
        <june-field type="text" label="First name" placeholder="Jane"></june-field>
        <june-field type="email" label="Email" placeholder="jane@example.com" required show-required-text></june-field>
        <june-field type="dropdown" label="Role" .options='${JSON.stringify([{value:'dev',label:'Developer'},{value:'des',label:'Designer'},{value:'pm',label:'PM'}])}'></june-field>
      </div>
      <june-field type="textarea" label="Comments" placeholder="Any additional comments..." hint="Optional. Max 500 characters." rows="3"></june-field>
    </div>
  </div>
</div>
`;

// ── Guidelines tab ──

const fldGuidelines = `
<div class="btn-sec-title">Accessibility</div>

<div class="usage-card"><div class="vcard__head"><span class="vcard__name">Label + for</span></div><div class="usage-card__body"><div class="usage-card__text" style="max-width:100%"><span class="badge badge--do">Do</span><p>Always include a visible <code style="font-size:13px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;">label</code> associated with the input via <code style="font-size:13px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;">for</code>. The component generates it automatically.</p><span class="badge badge--no">Avoid</span><p>Using placeholder as the only label. It disappears when typing and is not accessible.</p></div></div></div>

<div class="usage-card"><div class="vcard__head"><span class="vcard__name">Required text</span></div><div class="usage-card__body"><div class="usage-card__text" style="max-width:100%"><span class="badge badge--do">Do</span><p>Enable <code style="font-size:13px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;">show-required-text</code> to display "(required)" next to the label. Do not rely solely on the asterisk.</p><span class="badge badge--no">Avoid</span><p>Indicating required fields only with color or an asterisk. Users with low vision may not perceive it.</p></div></div></div>

<div class="usage-card"><div class="vcard__head"><span class="vcard__name">Error messages</span></div><div class="usage-card__body"><div class="usage-card__text" style="max-width:100%"><span class="badge badge--do">Do</span><p>Use specific error messages: "Email must include @" instead of "Invalid field". The component uses <code style="font-size:13px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;">role="alert"</code> + <code style="font-size:13px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;">aria-live="assertive"</code> for screen readers.</p><span class="badge badge--no">Avoid</span><p>Indicating errors only with color. The error icon and text are intentionally redundant (WCAG 1.4.1).</p></div></div></div>

<div class="usage-card"><div class="vcard__head"><span class="vcard__name">Hint text + aria-describedby</span></div><div class="usage-card__body"><div class="usage-card__text" style="max-width:100%"><span class="badge badge--do">Do</span><p>Use hint text for expected format or constraints. It is linked to the input via <code style="font-size:13px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;">aria-describedby</code>, and the SR reads it after the label.</p><span class="badge badge--no">Avoid</span><p>Overly long hints. If it needs more than one line, consider a tooltip or help link.</p></div></div></div>

<div class="usage-card"><div class="vcard__head"><span class="vcard__name">Border 2px</span></div><div class="usage-card__body"><div class="usage-card__text" style="max-width:100%"><span class="badge badge--do">Do</span><p>The 2px border (instead of 1px from Figma) ensures WCAG 1.4.11 — Non-text Contrast. The field is clearly distinguishable from the background.</p><span class="badge badge--no">Avoid</span><p>Reducing to 1px. It does not meet the minimum 3:1 contrast for UI component borders on light backgrounds.</p></div></div></div>

<div class="usage-card"><div class="vcard__head"><span class="vcard__name">Keyboard: Dropdown</span></div><div class="usage-card__body"><div class="usage-card__text" style="max-width:100%"><span class="badge badge--do">Do</span><p>Arrow Up/Down changes the option without expanding the dropdown. Enter/Space expands (native behavior). Focus always on the select.</p><span class="badge badge--no">Avoid</span><p>Custom dropdowns with divs that break the browser's native keyboard flow.</p></div></div></div>

<div class="btn-sec-title" style="margin-top:var(--sp-6);">General usage</div>

<div class="dd" style="display:grid; grid-template-columns:1fr 1fr; gap:var(--sp-4);">
  <div class="dd__card dd__card--do">
    <div class="dd__h dd__h--do">\u2714 Do</div>
    <div class="dd__b">
      <div class="dd__cap">Group related fields with consistent spacing (${snip('--sp-4', '--sp-4')} or ${snip('--sp-5', '--sp-5')}).</div>
    </div>
  </div>
  <div class="dd__card dd__card--dont">
    <div class="dd__h dd__h--dont">\u2718 Don't</div>
    <div class="dd__b">
      <div class="dd__cap">Mixing native input styles with june-field in the same form.</div>
    </div>
  </div>
  <div class="dd__card dd__card--do">
    <div class="dd__h dd__h--do">\u2714 Do</div>
    <div class="dd__b">
      <div class="dd__cap">Use <code style="font-size:12px;background:rgba(0,0,0,.06);padding:2px 4px;border-radius:3px;">focusInput()</code> to move focus to the first field with an error on submit.</div>
    </div>
  </div>
  <div class="dd__card dd__card--dont">
    <div class="dd__h dd__h--dont">\u2718 Don't</div>
    <div class="dd__b">
      <div class="dd__cap">Showing all errors at the same time without focus. The user does not know where to start.</div>
    </div>
  </div>
</div>
`;

// ── Specs tab ──

const fldSpecs = `
<style>
.vcard[id^="fld-"] { scroll-margin-top: 80px; }
</style>

<div class="vcard" id="fld-api" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">API</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Property</th><th style="width:15%">Type</th><th style="width:15%">Default</th><th>Description</th></tr></thead><tbody>
    <tr><td><code class="tok tok--static">type</code></td><td>string</td><td><code class="tok tok--static">text</code></td><td>text | email | password | number | tel | url | search | textarea | dropdown</td></tr>
    <tr><td><code class="tok tok--static">label</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Label text. Required for a11y</td></tr>
    <tr><td><code class="tok tok--static">value</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Current field value</td></tr>
    <tr><td><code class="tok tok--static">placeholder</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Placeholder text. In dropdown uses <code class="tok tok--static">placeholder-select</code> if empty</td></tr>
    <tr><td><code class="tok tok--static">hint</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Helper text, linked via <code class="tok tok--static">aria-describedby</code></td></tr>
    <tr><td><code class="tok tok--static">error</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Error message. Non-empty activates error state + <code class="tok tok--static">role="alert"</code></td></tr>
    <tr><td><code class="tok tok--static">name</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Field name for forms</td></tr>
    <tr><td><code class="tok tok--static">required</code></td><td>boolean</td><td><code class="tok tok--static">false</code></td><td>Required field (<code class="tok tok--static">aria-required</code>)</td></tr>
    <tr><td><code class="tok tok--static">disabled</code></td><td>boolean</td><td><code class="tok tok--static">false</code></td><td>Disabled field</td></tr>
    <tr><td><code class="tok tok--static">readonly</code></td><td>boolean</td><td><code class="tok tok--static">false</code></td><td>Read only</td></tr>
    <tr><td><code class="tok tok--static">options</code></td><td>{value, label}[]</td><td><code class="tok tok--static">[]</code></td><td>Options for dropdown</td></tr>
    <tr><td><code class="tok tok--static">rows</code></td><td>number</td><td><code class="tok tok--static">4</code></td><td>Visible rows for textarea</td></tr>
    <tr><td><code class="tok tok--static">show-required-text</code></td><td>boolean</td><td><code class="tok tok--static">false</code></td><td>Shows "(required)" text next to the label</td></tr>
    <tr><td><code class="tok tok--static">placeholder-select</code></td><td>string</td><td><code class="tok tok--static">Select one</code></td><td>Placeholder for dropdown when <code class="tok tok--static">placeholder</code> is empty</td></tr>
    <tr><td><code class="tok tok--static">required-text</code></td><td>string</td><td><code class="tok tok--static">(required)</code></td><td>Text shown by <code class="tok tok--static">show-required-text</code>. Customizable for i18n</td></tr>
    <tr><td><code class="tok tok--static">error-text</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Fallback error text when <code class="tok tok--static">force-state="error"</code> and <code class="tok tok--static">error</code> is empty</td></tr>
    <tr><td><code class="tok tok--static">force-state</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>hover | focus | error | disabled. Showcase only</td></tr>
  </tbody></table>
  <table class="tok-table" style="border-top:2px solid var(--card-border);"><thead><tr><th>Event</th><th style="width:15%">Trigger</th><th style="width:15%">Bubbles</th><th>Detail</th></tr></thead><tbody>
    <tr><td><code class="tok tok--static">jf-input</code></td><td>Each keystroke</td><td>Yes (composed)</td><td><code class="tok tok--static">{ value: string }</code></td></tr>
    <tr><td><code class="tok tok--static">jf-change</code></td><td>Selection changes</td><td>Yes (composed)</td><td><code class="tok tok--static">{ value: string }</code></td></tr>
  </tbody></table>
  <table class="tok-table" style="border-top:2px solid var(--card-border);"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody>
    <tr><td><code class="tok tok--static">focusInput()</code></td><td>Moves focus to the internal input/textarea/select. Use for programmatic focus in form validation</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="fld-estructura" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">Structure & Motion</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Property</th><th>Value</th></tr></thead><tbody>
    <tr><td>Input height</td><td>44px</td></tr>
    <tr><td>Padding</td><td>8px 12px ${snip('--sp-2', '--sp-2')} ${snip('--sp-3', '--sp-3')}</td></tr>
    <tr><td>Border</td><td><strong>2px</strong> solid ${snip('--input-border', '--input-border')} (a11y override, WCAG 1.4.11)</td></tr>
    <tr><td>Border radius</td><td>6px ${snip('--r-sm', '--r-sm')}</td></tr>
    <tr><td>Label font</td><td>Medium (500) · 14px/22px · Rubik ${snip('--body-s-strong', '--body-s-strong')}</td></tr>
    <tr><td>Input font</td><td>Light (300) · 14px/22px · Rubik ${snip('--body-s', '--body-s')}</td></tr>
    <tr><td>Secondary text</td><td>Light (300) · 12px/20px · Rubik ${snip('--body-xs', '--body-xs')} — hint, error, required</td></tr>
    <tr><td>Gap (label \u2192 input)</td><td>4px ${snip('--sp-1', '--sp-1')}</td></tr>
    <tr><td>Transition</td><td>120ms ${snip('--duration-fast', '--duration-fast')} \u00b7 ${snip('--ease', '--ease')}</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="fld-colores-estado" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">Colors by state</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>State</th><th>Border</th><th>Background</th><th>Text</th><th>Placeholder</th></tr></thead><tbody>
    <tr><td>Inactive</td><td><span class="sw" style="background:#e0e0e0;border:1px solid #ccc"></span>${snip('--input-border', '--input-border')}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snip('--input-bg', '--input-bg')}</td><td><span class="sw" style="background:#1a1a1a"></span>${snip('--black', '--black')}</td><td><span class="sw" style="background:#757575"></span>${snip('--grey-400', '--grey-400')}</td></tr>
    <tr><td>Hover</td><td><span class="sw" style="background:#757575"></span>${snip('--grey-400', '--grey-400')}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snip('--input-bg', '--input-bg')}</td><td><span class="sw" style="background:#1a1a1a"></span>${snip('--black', '--black')}</td><td>\u2014</td></tr>
    <tr><td>Focus</td><td><span class="sw" style="background:var(--brand,#e02b58)"></span>${snip('--brand', '--brand')}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${snip('--input-bg', '--input-bg')}</td><td><span class="sw" style="background:#1a1a1a"></span>${snip('--black', '--black')}</td><td>\u2014</td></tr>
    <tr><td>Error</td><td><span class="sw" style="background:#D93025"></span>${snip('--error', '--error')}</td><td><span class="sw" style="background:#FFF0F0;border:1px solid #e0e0e0"></span>${snip('--error-bg', '--error-bg')}</td><td><span class="sw" style="background:#1a1a1a"></span>${snip('--black', '--black')}</td><td>\u2014</td></tr>
    <tr><td>Disabled</td><td>transparent</td><td><span class="sw" style="background:#e5e5e5;border:1px solid #ccc"></span>${snip('--input-disabled-bg', '--input-disabled-bg')}</td><td><span class="sw" style="background:#757575"></span>${snip('--input-disabled-text', '--input-disabled-text')}</td><td>\u2014</td></tr>
  </tbody></table>
  <div class="table-note">
    <strong>Focus ring:</strong> border 2px ${snip('--brand', '--brand')} + <code class="tok tok--static">box-shadow: 0 0 0 1px</code> of the same color. On error, ring uses ${snip('--error', '--error')}.
  </div>
</div></div>

<div class="vcard" id="fld-colores-marca"><div class="vcard__head"><span class="vcard__name">Colors by brand</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Brand</th><th>Focus border + ring</th><th>Token</th></tr></thead><tbody>
    <tr><td>GeneXus</td><td><span class="sw" style="background:#E02B58"></span>${snipColor('#E02B58')}</td><td>${snip('--gx', '--gx')}</td></tr>
    <tr><td>Next</td><td><span class="sw" style="background:#5BA7FF"></span>${snipColor('#5BA7FF')}</td><td>${snip('--nx', '--nx')}</td></tr>
    <tr><td>GEAI</td><td><span class="sw" style="background:#BFD732;border:1px solid #e0e0e0"></span>${snipColor('#BFD732')}</td><td>${snip('--ge', '--ge')}</td></tr>
  </tbody></table>
</div></div>

`;

// ── Helpers ──

function buildCodeSnippet(state: {
  type: string; label: string; placeholder: string;
  hint: string; error: string; required: boolean; disabled: boolean;
}): string {
  const tag = state.type === 'textarea' ? 'june-field' : 'june-field';
  const attrs: string[] = [];
  if (state.type !== 'text') attrs.push(`type="${state.type}"`);
  attrs.push(`label="${state.label}"`);
  if (state.placeholder) attrs.push(`placeholder="${state.placeholder}"`);
  if (state.hint) attrs.push(`hint="${state.hint}"`);
  if (state.error) attrs.push(`error="${state.error}"`);
  if (state.required) attrs.push('required show-required-text');
  if (state.disabled) attrs.push('disabled');
  if (state.type === 'dropdown') attrs.push('.options="${[...]}"');

  return `<${tag}\n  ${attrs.join('\n  ')}\n></${tag}>`;
}

function initPlayground(): void {
  const container = document.querySelector('#fld-playground > div:first-child') as HTMLElement | null;
  if (!container) return;

  const defaultOptions = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
    { value: 'opt3', label: 'Option 3' },
  ];

  const typeEl = document.getElementById('fld-pg-type') as HTMLSelectElement | null;
  const labelEl = document.getElementById('fld-pg-label') as HTMLInputElement | null;
  const placeholderEl = document.getElementById('fld-pg-placeholder') as HTMLInputElement | null;
  const hintEl = document.getElementById('fld-pg-hint') as HTMLInputElement | null;
  const errorEl = document.getElementById('fld-pg-error') as HTMLInputElement | null;
  const reqEl = document.getElementById('fld-pg-required') as HTMLInputElement | null;
  const disEl = document.getElementById('fld-pg-disabled') as HTMLInputElement | null;
  const codeEl = document.getElementById('fld-code');
  const copyBtn = document.getElementById('fld-copy-btn');

  const typeDefaults: Record<string, { label: string; placeholder: string; hint: string }> = {
    text:     { label: 'Full name',        placeholder: 'John Doe',              hint: 'As it appears on your ID' },
    email:    { label: 'Email address',    placeholder: 'you@example.com',       hint: "We'll never share your email" },
    password: { label: 'Password',         placeholder: 'Enter your password',   hint: 'At least 8 characters' },
    number:   { label: 'Amount',           placeholder: '0',                     hint: '' },
    tel:      { label: 'Phone number',     placeholder: '+1 (555) 000-0000',     hint: 'Include country code' },
    url:      { label: 'Website',          placeholder: 'https://example.com',   hint: '' },
    search:   { label: 'Search',           placeholder: 'Search...',             hint: '' },
    textarea: { label: 'Message',          placeholder: 'Write your message...', hint: 'Max 500 characters' },
    dropdown: { label: 'Choose an option', placeholder: 'Select one',            hint: '' },
  };

  // Apply smart defaults when type changes
  if (typeEl) {
    typeEl.addEventListener('change', () => {
      const d = typeDefaults[typeEl.value];
      if (!d) return;
      if (labelEl) labelEl.value = d.label;
      if (placeholderEl) placeholderEl.value = d.placeholder;
      if (hintEl) hintEl.value = d.hint;
      if (errorEl) errorEl.value = '';
      if (reqEl) reqEl.checked = false;
      if (disEl) disEl.checked = false;
    });
  }

  customElements.whenDefined('june-field').then(() => {
    const f = document.getElementById('fld-pg-field') as any;
    if (f) f.options = defaultOptions;
  });

  function snap(): string {
    return [
      typeEl?.value, labelEl?.value, placeholderEl?.value,
      hintEl?.value, errorEl?.value, reqEl?.checked, disEl?.checked,
    ].join('|');
  }

  let prev = snap();

  function sync(): void {
    const t = typeEl?.value || 'text';
    const label = labelEl?.value || 'Label';
    const placeholder = placeholderEl?.value || '';
    const hint = hintEl?.value || '';
    const error = errorEl?.value || '';
    const req = reqEl?.checked || false;
    const dis = disEl?.checked || false;

    const el = document.createElement('june-field') as any;
    el.id = 'fld-pg-field';
    el.style.width = '100%';
    el.style.maxWidth = '360px';
    el.type = t;
    el.label = label;
    el.placeholder = placeholder;
    el.hint = hint;
    el.error = error;
    el.required = req;
    el.disabled = dis;
    el.showRequiredText = req;
    if (t === 'dropdown') el.options = defaultOptions;

    container.replaceChildren(el);

    if (codeEl) {
      codeEl.innerHTML = hlHTML(
        buildCodeSnippet({ type: t, label, placeholder, hint, error, required: req, disabled: dis }),
      );
    }

    prev = snap();
  }

  // Polling loop — guaranteed to catch every change
  let alive = true;
  function poll() {
    if (!alive || !document.getElementById('fld-playground')) return;
    if (snap() !== prev) sync();
    requestAnimationFrame(poll);
  }
  requestAnimationFrame(poll);

  // Cleanup when page navigates away
  const obs = new MutationObserver(() => {
    if (!document.getElementById('fld-playground')) { alive = false; obs.disconnect(); }
  });
  obs.observe(document.getElementById('page')!, { childList: true });

  // Copy button
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (codeEl) { copyToClipboard(codeEl.textContent || ''); showToast('Copied!'); }
    });
  }

  // Initial code snippet
  if (codeEl) {
    codeEl.innerHTML = hlHTML(
      buildCodeSnippet({ type: 'email', label: 'Email address', placeholder: 'you@example.com', hint: "We'll never share your email", error: '', required: false, disabled: false }),
    );
  }
}

function hydrateMatrixOptions(): void {
  // Hydrate all june-field[type="dropdown"] that have a .options attribute
  document.querySelectorAll('june-field[type="dropdown"]').forEach((el: any) => {
    const raw = el.getAttribute('.options');
    if (raw) {
      try { el.options = JSON.parse(raw); } catch { /* ignore */ }
    }
  });
}

// ── Page definition ──

export const fieldPage: PageDef = {
  title: 'Field',
  desc: 'Every form input, one component. Accessible by default, validation built in.',
  tabs: ['Preview', 'Specs'],
  content: [fldPreview, fldSpecs],
  brandAware: true,
  init() {
    hydrateMatrixOptions();
    initPlayground();
  },
};
