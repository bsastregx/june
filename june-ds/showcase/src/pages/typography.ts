import type { PageDef } from './page-registry.js';
import { snip } from '../utils/clipboard.js';

const typoScale = `
    <div class="spec-group"><div class="spec-group-title">Title</div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Title 1</span><span class="spec-detail">Graphik Semibold · 46 / 60</span></div><div class="spec-sample" style="font:var(--title-1)">Future-proof enterprise systems</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Title 2</span><span class="spec-detail">Graphik Semibold · 36 / 48</span></div><div class="spec-sample" style="font:var(--title-2)">Build fast. Built to last.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Title 3</span><span class="spec-detail">Graphik Semibold · 26 / 36</span></div><div class="spec-sample" style="font:var(--title-3)">Orchestrate AI agents</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Title 4</span><span class="spec-detail">Graphik Semibold · 20 / 30</span></div><div class="spec-sample" style="font:var(--title-4)">Low-code for professional developers</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Title 5</span><span class="spec-detail">Graphik Semibold · 17 / 26</span></div><div class="spec-sample" style="font:var(--title-5)">Reduce technical debt at scale</div></div>
    </div>
    <div class="spec-group"><div class="spec-group-title">Highlight</div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Highlight L</span><span class="spec-detail">Graphik Light · 26 / 36</span></div><div class="spec-sample" style="font:var(--highlight-l)">The platform that generates native code and evolves with your business.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Highlight M</span><span class="spec-detail">Graphik Light · 20 / 30</span></div><div class="spec-sample" style="font:var(--highlight-m)">Accelerate your go-to-market without losing control.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Highlight S</span><span class="spec-detail">Graphik Light · 17 / 26</span></div><div class="spec-sample" style="font:var(--highlight-s)">AI-powered enterprise platform for the next decade.</div></div>
    </div>
    <div class="spec-group"><div class="spec-group-title">Body</div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Body M</span><span class="spec-detail">Rubik Light · 17 / 26</span></div><div class="spec-sample" style="font:var(--body-m);max-width:560px">Design sophisticated solutions without the complexity. The right approach makes all the difference.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Body M Strong</span><span class="spec-detail">Rubik Medium · 17 / 26</span></div><div class="spec-sample" style="font:var(--body-m-strong);max-width:560px">Design sophisticated solutions without the complexity. The right approach makes all the difference.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Body S</span><span class="spec-detail">Rubik Light · 14 / 22</span></div><div class="spec-sample" style="font:var(--body-s);max-width:560px">Implementing sophisticated designs in software solutions can be complex. However, with the right tools it is possible to improve quality and reduce cost.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Body S Strong</span><span class="spec-detail">Rubik Medium · 14 / 22</span></div><div class="spec-sample" style="font:var(--body-s-strong);max-width:560px">Implementing sophisticated designs in software solutions can be complex. However, with the right tools it is possible to improve quality and reduce cost.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Body XS</span><span class="spec-detail">Rubik Light · 12 / 20</span></div><div class="spec-sample" style="font:var(--body-xs);max-width:560px">By submitting this form, you agree to receive communications with updates, resources and useful tips.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Body XS Strong</span><span class="spec-detail">Rubik Medium · 12 / 20</span></div><div class="spec-sample" style="font:var(--body-xs-strong);max-width:560px">By submitting this form, you agree to receive communications with updates, resources and useful tips.</div></div>
    </div>
    <div class="spec-group"><div class="spec-group-title">Label &amp; Link</div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Label</span><span class="spec-detail">Rubik Medium · 17 / 26</span></div><div class="spec-sample" style="font:var(--label)">Explore all features</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Link</span><span class="spec-detail">Rubik Light · 17 / 17</span></div><div class="spec-sample" style="font:var(--link)"><span style="text-decoration:underline">Check all industries</span></div></div>
    </div>`;

const typoUsage = `
    <div class="vcard"><div class="vcard__head"><span class="vcard__name">Key rules</span></div>
      <div class="vcard__body" style="padding:0;">
        <table class="tok-table">
          <thead><tr><th>Rule</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>Graphik attracts, Rubik sustains</td><td>Graphik (Title, Highlight) is for headlines and callouts. Rubik (Body, Label, Link) is for sustained reading and UI.</td></tr>
            <tr><td>Title vs Highlight</td><td>Same size, different weight. Title (semibold) anchors sections — short and direct. Highlight (light) accompanies as subheading — longer, more fluid.</td></tr>
            <tr><td>Strong = inline emphasis</td><td>Body M Strong is not an alternative heading — it's for highlighting words within a Body M paragraph.</td></tr>
            <tr><td>Name \u2260 HTML tag</td><td>"Title 3" can be an <code class="cls">&lt;h2&gt;</code>, a <code class="cls">&lt;span&gt;</code>, or a <code class="cls">&lt;p&gt;</code>. Semantics are defined by document structure, not visual style.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="vcard"><div class="vcard__head"><span class="vcard__name">When to use each level</span></div>
      <div class="vcard__body" style="padding:0">
        <table class="tok-table"><thead><tr><th>Style</th><th>Use for</th><th>Don't use for</th></tr></thead>
        <tbody>
          <tr><td style="font-weight:600">Title 1–2</td><td>Heroes, splash, closing CTAs, impact numbers</td><td>Cards, internal UI</td></tr>
          <tr><td style="font-weight:600">Title 3–5</td><td>Section titles, card headers, modal titles</td><td>Long paragraphs — semibold fatigues</td></tr>
          <tr><td style="font-weight:600">Highlight L–S</td><td>Hero subheadings, featured descriptions, pull quotes</td><td>Extended body text</td></tr>
          <tr><td style="font-weight:600">Body M / S / XS</td><td>Paragraphs, descriptions, reading content</td><td>Headlines — lacks weight to anchor</td></tr>
          <tr><td style="font-weight:600">Label</td><td>Buttons, form labels, tabs, navigation</td><td>Paragraphs — too dense for reading</td></tr>
          <tr><td style="font-weight:600">Link</td><td>Inline CTAs, breadcrumbs, "Read more"</td><td>Buttons — use Button component</td></tr>
        </tbody></table>
      </div>
    </div>`;

const typoScale2 = typoScale + typoUsage;

const typoTokens = `
<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Font families</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Token</th><th>Valor</th></tr></thead>
      <tbody>
        <tr><td>${snip('--font-display', '--font-display')}</td><td>'Graphik', 'Rubik', sans-serif</td></tr>
        <tr><td>${snip('--font-body', '--font-body')}</td><td>'Rubik', sans-serif</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Tokens shorthand</span><span class="vcard__sub">Usar con font: var(--token)</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Token</th><th>Peso</th><th>Size / LH</th><th>Familia</th></tr></thead>
      <tbody>
        <tr><td>${snip('--title-1', '--title-1')}</td><td>600</td><td>46 / 60</td><td>Graphik</td></tr>
        <tr><td>${snip('--title-2', '--title-2')}</td><td>600</td><td>36 / 48</td><td>Graphik</td></tr>
        <tr><td>${snip('--title-3', '--title-3')}</td><td>600</td><td>26 / 36</td><td>Graphik</td></tr>
        <tr><td>${snip('--title-4', '--title-4')}</td><td>600</td><td>20 / 30</td><td>Graphik</td></tr>
        <tr><td>${snip('--title-5', '--title-5')}</td><td>600</td><td>17 / 26</td><td>Graphik</td></tr>
        <tr><td>${snip('--highlight-l', '--highlight-l')}</td><td>300</td><td>26 / 36</td><td>Graphik</td></tr>
        <tr><td>${snip('--highlight-m', '--highlight-m')}</td><td>300</td><td>20 / 30</td><td>Graphik</td></tr>
        <tr><td>${snip('--highlight-s', '--highlight-s')}</td><td>300</td><td>17 / 26</td><td>Graphik</td></tr>
        <tr><td>${snip('--body-m', '--body-m')}</td><td>300</td><td>17 / 26</td><td>Rubik</td></tr>
        <tr><td>${snip('--body-m-strong', '--body-m-strong')}</td><td>500</td><td>17 / 26</td><td>Rubik</td></tr>
        <tr><td>${snip('--body-s', '--body-s')}</td><td>300</td><td>14 / 22</td><td>Rubik</td></tr>
        <tr><td>${snip('--body-s-strong', '--body-s-strong')}</td><td>500</td><td>14 / 22</td><td>Rubik</td></tr>
        <tr><td>${snip('--body-xs', '--body-xs')}</td><td>300</td><td>12 / 20</td><td>Rubik</td></tr>
        <tr><td>${snip('--body-xs-strong', '--body-xs-strong')}</td><td>500</td><td>12 / 20</td><td>Rubik</td></tr>
        <tr><td>${snip('--label', '--label')}</td><td>500</td><td>17 / 26</td><td>Rubik</td></tr>
        <tr><td>${snip('--link', '--link')}</td><td>300</td><td>17 / 17</td><td>Rubik</td></tr>
      </tbody>
    </table>
  </div>
</div>
`;

export const typographyPage: PageDef = {
  title: 'Typography',
  desc: 'Graphik grabs attention, Rubik keeps you reading. One scale, two families, role-based naming.',
  tabs: ['Type scale', 'Tokens'],
  content: [typoScale2, typoTokens],
};
