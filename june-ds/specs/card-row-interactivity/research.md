---
spec: card-row-interactivity
phase: research
created: 2026-03-03
---

# Research: Card Row Interactivity Improvements

## Executive Summary

The Card Row stencil already has a solid foundation: card hover lift (`translateY(-2px)` + shadow escalation), link brand-color hover, carousel track slide (`transform` transition), nav button hover states, dot hover scale, and full reduced-motion coverage. However, compared to the Deep Dive stencil's polish level, there are 8 concrete improvement areas: nav button active/disabled states, link arrow nudge, image loading crossfade, skeleton-to-content reveal, dot active transition width, card entrance stagger, nav button press feedback, and carousel edge fade hints.

## Current State Audit

### Existing Transitions (what works)

| Element | Property | Timing | Token |
|---------|----------|--------|-------|
| `.cr__card` hover | `transform`, `box-shadow` | `--duration-fast` / `--ease` | `translateY(-2px)` + `--shadow-md` |
| `.cr__card-link` hover | `color` | `--duration-fast` / `--ease` | Brand color (gx/nx/ge) |
| `.cr__track` slide | `transform` | `calc(var(--duration) * 2)` / `--ease` | `translateX(-Npx)` |
| `.cr__prev`, `.cr__next` hover | `border-color`, `color`, `opacity` | `--duration-fast` / `--ease` | `--black` border+color |
| `.cr__dot` hover | `background`, `transform` | `--duration-fast` / `--ease` | `--grey-400` bg + `scale(1.1)` |
| `.cr__skel` pulse | `opacity` keyframe | `calc(--duration * 8)` | 0.4 to 1.0 pulse |
| Reduced motion | All above disabled | `prefers-reduced-motion: reduce` | Branded ring fallback for card |

### What Feels Static (gaps)

| Element | Issue | Impact |
|---------|-------|--------|
| Nav buttons | No `:active` press state, no disabled visual | Users click with no press feedback |
| Nav buttons | Opacity hide/show is instant (JS inline style) | Abrupt appear/disappear |
| Link arrow SVG | Static — doesn't move on hover | Missed micro-interaction opportunity |
| Card images | No loading/crossfade transition | Images pop in abruptly |
| Skeleton to content | Full innerHTML replace — no transition | Jarring swap |
| Dots | Active dot has no width/shape transition | Just color snap |
| Cards | No entrance animation on initial render | Appear instantly |
| Card link | No `text-decoration` transition | Underline is always there |
| Quote card | No `:active` press feedback on card itself | Static feel |

## External Research

### Best Practices

- **Card hover lift**: Industry standard is 2-4px `translateY` + shadow escalation. The current -2px lift is within range. Source: [Speckyboy card hover effects](https://speckyboy.com/css-javascript-card-ui-hover-effects/)
- **Nav button states**: Disabled carousel buttons should use `opacity: 0.35` + `cursor: not-allowed` rather than full hide. Explicit disabled state prevents confusion. Source: [NN/g button states](https://www.nngroup.com/articles/button-states-communicate-interaction/)
- **Pressed state timing**: Active/pressed feedback should register within 100-150ms. The DS already uses `scale(0.97)` for `.jb:active` buttons. Source: [UXPin button states](https://www.uxpin.com/studio/blog/button-states/)
- **Arrow nudge**: `translateX(3-4px)` on link hover with `--duration-fast` is standard micro-interaction. Apply to the SVG child only. Source: [CSS arrow micro-interactions](https://keenanpayne.com/css-arrow-interaction/)
- **Skeleton shimmer vs pulse**: Project uses pulse (opacity keyframe). A directional shimmer (`linear-gradient` sweep) is more polished but heavier. Pulse is fine — the bigger gap is the skeleton-to-content transition. Source: [Frontend Hero skeleton loaders](https://frontend-hero.com/how-to-create-skeleton-loader)
- **Scroll-driven entrance animations**: CSS `animation-timeline: view()` is powerful but browser support is still limited (no Firefox). Simpler `IntersectionObserver` + CSS class toggle is safer. Source: [MDN scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)

### Codebase Patterns (Deep Dive reference)

The Deep Dive stencil establishes these motion patterns that Card Row should mirror:

| Pattern | Deep Dive Implementation | Card Row Adaptation |
|---------|-------------------------|---------------------|
| Hover name shift | `translateX(4px)` + brand color | Link arrow `translateX(3px)` |
| Icon hover color | Brand color on `.dd__item-head:hover` | Brand color on nav buttons |
| Image crossfade | `opacity var(--duration) var(--ease)` on `img` | Same on `.cr__card-img img` |
| Content stagger | `opacity` + `translateY(8px)` with delay offsets | Card entrance stagger |
| Reduced motion | Blanket `transition: none` on all animated elements | Already done, extend to new additions |

### Existing DS Active State Pattern

The button component (`.jb`) uses `scale(0.97)` for `:active:not(:disabled)`. This is the established pattern for press feedback in the DS. Nav buttons should follow the same convention.

## Improvement Opportunities

### HIGH Impact

#### 1. Nav Button Active + Disabled States
**Current**: No `:active` state. Disabled buttons hidden via JS `opacity:0; pointer-events:none`.
**Proposed**:
- Add `:active` press: `transform: scale(0.92)` (smaller circle = more visible than 0.97)
- Disabled: `opacity: 0.35; cursor: not-allowed; pointer-events: auto` (visible but inert)
- Transition disabled state smoothly instead of instant JS toggle
**Effort**: S | **Risk**: Low — CSS only, no JS change needed for active. Disabled requires minor JS tweak to stop using inline opacity.

#### 2. Link Arrow Nudge on Hover
**Current**: Arrow SVG is static inside `.cr__card-link`.
**Proposed**:
- `.cr__card-link:hover svg { transform: translate(3px, -3px) }` (matches the 45-degree arrow direction)
- Transition: `--duration-fast` / `--ease`
- Add `transition: transform var(--duration-fast) var(--ease)` to `.cr__card-link svg`
**Effort**: S | **Risk**: None — SVG already exists, just adding transform

#### 3. Card Image Crossfade on Load
**Current**: Images pop in with no transition.
**Proposed**:
- `.cr__card-img img { opacity: 0; transition: opacity var(--duration) var(--ease); }`
- `.cr__card-img img[src] { opacity: 1; }` or JS `onload` adds `.loaded` class
- Matches Deep Dive's `dd__media img` transition pattern
**Effort**: S | **Risk**: Low — need to ensure images that are cached still show immediately

### MEDIUM Impact

#### 4. Nav Button Brand Color on Hover
**Current**: Hover changes to `--black` border and color.
**Proposed**:
- Add brand-aware hover: `border-color: var(--brand, var(--gx)); color: var(--brand, var(--gx))`
- With `[data-brand]` overrides matching existing pattern
- Aligns with Deep Dive's icon hover color pattern
**Effort**: S | **Risk**: Low — visual change, may need user preference check

#### 5. Dot Active State Width Transition
**Current**: Active dot changes color only (32x3 bar).
**Proposed**:
- Active dot: `width: 48px` (1.5x wider) to create a progress-bar feel
- Transition: `width var(--duration) var(--ease)`
- Note: `width` animates are not GPU-accelerated, but at 3px height the cost is negligible
**Effort**: S | **Risk**: Low — purely visual, dots container is flexbox so it adapts

#### 6. Card Entrance Stagger (on carousel slide)
**Current**: Cards appear instantly on slide.
**Proposed**:
- When carousel slides, incoming cards fade in with stagger delays
- Add class `.cr__card--entering` with `opacity: 0; transform: translateY(12px)`
- Remove class after transition completes
- Stagger: `transition-delay: calc(var(--i, 0) * 60ms)` via CSS custom property
**Effort**: M | **Risk**: Medium — requires JS coordination with slide timing. Could feel sluggish if delays stack.

### LOW Impact

#### 7. Skeleton Shimmer Direction
**Current**: Pulse (opacity oscillation).
**Proposed**: Replace with directional shimmer (`linear-gradient` sweep left-to-right).
**Effort**: S | **Risk**: Low — cosmetic only. But DS already has an established pulse pattern; changing it may create inconsistency if other components use pulse.
**Recommendation**: Skip this. Pulse is fine and consistent.

#### 8. Carousel Edge Fade Hint
**Current**: Cards clip at row edge with no visual hint.
**Proposed**: CSS mask on `.cr__row` — fade to transparent at edges to hint scrollability.
**Effort**: S | **Risk**: Medium — `mask-image` may clip card shadows. Needs careful testing with the padding compensation already in place.
**Recommendation**: Evaluate in implementation but deprioritize.

## Feasibility Assessment

| Aspect | Assessment | Notes |
|--------|------------|-------|
| Technical Viability | High | All proposals use CSS transforms/opacity — no layout-triggering properties |
| Effort Estimate | S-M | Top 5 are all S effort. Card entrance stagger is M. |
| Risk Level | Low | CSS-only changes dominate. No structural HTML changes needed. |
| Consistency | High | All patterns mirror established Deep Dive or Button conventions |

## Recommendations (Top 5, ordered by impact-to-effort ratio)

1. **Link arrow nudge on hover** — Highest polish-per-line-of-code. ~5 lines of CSS. Matches the 45-degree arrow icon direction with `translate(3px, -3px)`.

2. **Nav button active + disabled states** — Completes the 4-state requirement (hover already exists, focus-visible exists, `:active` and disabled are missing). Uses established DS `scale()` pattern.

3. **Card image crossfade** — Matches Deep Dive's `dd__media img` opacity transition. Prevents jarring pop-in. ~3 lines of CSS + optional JS `onload` handler.

4. **Nav button brand color on hover** — Aligns with Deep Dive's icon hover brand color pattern. Creates visual consistency across stencils. ~6 lines of CSS.

5. **Dot active width transition** — Subtle but effective progress indicator. Wider active dot is common in modern carousels. ~4 lines of CSS.

**Deferred**: Card entrance stagger (M effort, medium risk of feeling sluggish). Skeleton shimmer direction (inconsistency risk). Carousel edge fade (shadow clipping risk).

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Nav disabled state breaks carousel logic | Low | JS already tracks position; just change from `opacity:0` to CSS class toggle |
| Image crossfade on cached images | Low | Use `img.complete` check — if already loaded, skip transition |
| Arrow nudge on small screens | Low | Nudge is 3px — imperceptible layout impact |
| Dot width transition perf | Very Low | 3px-tall element, negligible reflow cost |
| Reduced motion gaps | Medium | Must add new transitions to existing `@media (prefers-reduced-motion)` block |

## Quality Commands

| Type | Command | Source |
|------|---------|--------|
| Dev server | `cd showcase && npm run dev` | showcase/package.json scripts.dev |
| Build DS | `cd packages/june-ds && npm run build` | packages/june-ds/package.json scripts.build |
| Unit Test | `cd packages/june-ds && npm test` | packages/june-ds/package.json scripts.test |
| Test Run | `cd packages/june-ds && npm run test:run` | packages/june-ds/package.json scripts.test:run |
| Tokens | `cd packages/june-ds && npm run tokens` | packages/june-ds/package.json scripts.tokens |
| Lint | Not found | -- |
| TypeCheck | Not found | -- |
| E2E | Not found | -- |

**Local verification**: `cd packages/june-ds && npm run build` then visually verify in showcase dev server.

## Related Specs

| Spec | Relevance | mayNeedUpdate |
|------|-----------|---------------|
| (no other specs found) | -- | -- |

Only one spec directory exists (`card-row-interactivity`). No conflicts or dependencies.

## Open Questions

1. **Nav button disabled state**: Should disabled buttons be fully hidden (current) or shown dimmed? Dimmed is better UX (provides context) but changes current behavior.
2. **Brand color on nav hover**: Should nav buttons follow brand like Deep Dive, or stay neutral (`--black`)? Neutral is current; brand is more consistent with DS direction.
3. **Image crossfade**: JS `onload` handler needed, or CSS-only approach sufficient? CSS-only (`img[src]`) may flash on cached images.
4. **Dot width change**: 48px active width — is this too far from current 32px? Alternative: keep 32px width, add bottom border brand-colored.

## Sources

- [Speckyboy - CSS/JS Card UI Hover Effects](https://speckyboy.com/css-javascript-card-ui-hover-effects/)
- [NN/g - Button States Communicate Interaction](https://www.nngroup.com/articles/button-states-communicate-interaction/)
- [UXPin - Button States](https://www.uxpin.com/studio/blog/button-states/)
- [Keenan Payne - CSS Arrow Micro-interaction](https://keenanpayne.com/css-arrow-interaction/)
- [Frontend Hero - CSS Skeleton Loaders](https://frontend-hero.com/how-to-create-skeleton-loader)
- [MDN - CSS Scroll-driven Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [MDN - Creating CSS Carousels](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow/Carousels)
- [CSS-Tricks - Scroll-Driven Animations Inside a CSS Carousel](https://css-tricks.com/scroll-driven-animations-inside-a-css-carousel/)
- `/packages/june-ds/src/components/card-row/june-card-row.scss` — Card Row SCSS (662 lines)
- `/packages/june-ds/src/components/deep-dive/june-deep-dive.scss` — Deep Dive SCSS reference (509 lines)
- `/packages/june-ds/src/components/button/june-button.scss` — Button active state pattern
- `/packages/june-ds/src/tokens/_generated-tokens.scss` — Motion tokens (lines 151-153)
- `/showcase/src/pages/page-card-row.ts` — Showcase page with carousel JS (894 lines)
