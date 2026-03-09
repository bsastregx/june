# Button — Design Specs & Guidelines

> `june-button` · Class prefix `.jb`

---

## Variants

| Variant       | Class      | Description                                                   |
|---------------|------------|---------------------------------------------------------------|
| **Primary**   | `.jb--pri` | Solid brand-color fill. Main call-to-action.                  |
| **Secondary** | `.jb--sec` | Solid dark fill (#111), white text. Supporting CTA.           |
| **Tertiary**  | `.jb--ter` | Solid white fill (#fff), dark text. CTA on dark surfaces.     |
| **Outline**   | `.jb--out` | Transparent, outlined border. Low emphasis.                   |
| **Plain**     | `.jb--pln` | Text-only, no border/background. Inline actions.              |
| **Icon**      | `.jb--ico` | Icon-only, compact padding, no label.                         |

---

## Anatomy

```
┌─────────────────────────────────┐
│  [icon]  Label Text             │  48px height
│          ← gap: 8px →          │  padding: 8px 24px
│          min-width: 128px       │  border-radius: 1000px
└─────────────────────────────────┘
```

- **Font**: `--label` → 500 17px/26px `--font-body` (Rubik)
- **Border**: 1px solid transparent (varies per variant)
- **Transition**: 120ms ease on background, color, border-color, box-shadow

---

## Token Map

All button colors are driven by private CSS custom properties set on `.jb`:

| Token        | Role                              | Light default                          |
|--------------|-----------------------------------|----------------------------------------|
| `--_p`       | Primary background                | Brand color                            |
| `--_ph`      | Primary hover background          | Brand hover                            |
| `--_on`      | Primary text (on-brand)           | Brand on-color                         |
| `--_a`       | Accent                            | Brand accent                           |
| `--_f`       | Focus ring color                  | Brand                                  |
| `--_txt`     | Default text color                | `#111`                                 |
| `--_sec-bg`  | Secondary background              | `#111`                                 |
| `--_sec-on`  | Secondary text                    | `#fff`                                 |
| `--_sec-h-bg`| Secondary hover background        | `color-mix(in srgb, brand 15%, #111)`  |
| `--_sec-h-on`| Secondary hover text              | `#fff`                                 |
| `--_ter-bg`  | Tertiary background               | `#fff`                                 |
| `--_ter-on`  | Tertiary text                     | `#111`                                 |
| `--_ter-h-bg`| Tertiary hover background         | `color-mix(in srgb, brand 15%, #fff)`  |
| `--_ter-h-on`| Tertiary hover text               | Brand primary                          |
| `--_out-bd`  | Outline border                    | `var(--black)`                         |
| `--_out-t`   | Outline text                      | `var(--black)`                         |
| `--_dis-bg`  | Disabled background               | `var(--grey-200)`                      |
| `--_dis-t`   | Disabled text                     | `var(--grey-500)`                      |

---

## Light Mode

Default state. Tokens resolve from global CSS custom properties (`--card`, `--grey-*`, etc.).

### Per-variant specs

| Variant   | Background  | Text    | Border             | Shadow | Hover                                                      |
|-----------|-------------|---------|--------------------|---------|------------------------------------------------------------|
| Primary   | `--_p`      | `--_on` | transparent        | none    | `--_ph`, lift -1px, shadow-md                              |
| Secondary | `#111`      | `#fff`  | transparent        | none    | bg → `color-mix(brand 15%, #111)`, text `#fff`, lift, shadow-md |
| Tertiary  | `#fff`      | `#111`  | transparent        | none    | bg → `color-mix(brand 15%, #fff)`, text → brand, lift, shadow-md |
| Outline   | transparent | `#111`  | `var(--black)`     | none    | border → grey-300, lift -1px, shadow-md                    |
| Plain     | transparent | `#111`  | none               | none    | underline, offset 3px                                      |
| Icon      | transparent | `#111`  | none               | none    | opacity: 0.7                                               |

### Disabled (all variants)

| Property    | Value              |
|-------------|--------------------|
| Background  | `var(--grey-200)`  |
| Text        | `var(--grey-500)`  |
| Border      | transparent        |
| Box-shadow  | none               |
| Cursor      | `not-allowed`      |

---

## Dark Surface

Activated by `[data-surface="dark"]` (component surfaces) or `body.dm` (showcase toggle).

### Key design decisions

1. **Secondary stays dark (#111 bg)** — No inversion. If a dev needs a white CTA on dark, use Tertiary.
2. **Tertiary is white (#fff bg)** — Designed for dark surfaces. Hover uses brand-tinted white (`color-mix(brand 15%, #fff)`), text flips to brand primary.
3. **Tertiary on light surfaces is invisible** — White on white. Intentional: devs choose Tertiary only for dark contexts.
4. **Only transparent variants adapt** — Outline, Plain, and Icon flip their text/border to `#fff` via `--_txt` / `--_out-bd` / `--_out-t`.
5. **Outline hover on dark** — Border goes transparent, bg becomes `rgba(255,255,255, 0.08)`.
6. **Disabled text is `#707880`** — Brighter than light-mode disabled to remain legible against dark backgrounds.

### Dark surface token overrides

```css
[data-surface="dark"] .jb {
  --_txt: #fff;
  --_out-bd: #fff;
  --_out-t: #fff;
  --_dis-bg: #2a2f35;
  --_dis-t: #707880;
}
```

### Per-variant dark specs

| Variant   | Background  | Text    | Border                      | Shadow | Hover                                              |
|-----------|-------------|---------|-----------------------------|---------|----------------------------------------------------|
| Primary   | `--_p`      | `--_on` | transparent                 | none    | `--_ph`, lift, shadow-md                           |
| Secondary | `#111`      | `#fff`  | transparent                 | none    | bg → `color-mix(brand 15%, #111)`, text `#fff`     |
| Tertiary  | `#fff`      | `#111`  | transparent                 | none    | bg → `color-mix(brand 15%, #fff)`, text → brand    |
| Outline   | transparent | `#fff`  | `#fff`                      | none    | border → transparent, bg → `rgba(255,255,255,0.08)` |
| Plain     | transparent | `#fff`  | none                        | none    | underline, offset 3px                              |
| Icon      | transparent | `#fff`  | none                        | none    | opacity: 0.7                                       |

### Disabled (dark)

| Property    | Value      |
|-------------|------------|
| Background  | `#2a2f35`  |
| Text        | `#707880`  |
| Border      | transparent |

---

## Brand Overrides

Brands swap the primary/accent/focus palette. Applied via `[data-brand="xx"]`.

### Light mode

| Brand | `--_p`    | `--_ph`   | `--_on` | `--_a`    | `--_f`    |
|-------|-----------|-----------|---------|-----------|-----------|
| GX    | `#e02b58` | `#D2285D` | `#fff`  | `#e02b58` | `#e02b58` |
| NX    | `#5BA7FF` | `#437DC0` | `#111`  | `#2878CD` | `#437DC0` |
| GE    | `#BFD732` | `#8CC63F` | `#111`  | `#BFD732` | `#BFD732` |

### Dark mode / dark surface

All brands inherit their light tokens on dark surfaces. The only overrides are structural (text color for transparent variants, disabled colors) — no per-brand changes. Tertiary hover tints with brand color via `color-mix`.

---

## Focus State

All variants share:

```css
outline: 2px solid var(--_f);
outline-offset: 2px;
```

`--_f` resolves to the brand color.

---

## Preview Frame Override

When `body.dm` is active but the button sits inside a `[data-surface="light"]` preview, light-mode tokens are restored:

```css
body.dm [data-surface="light"] .jb {
  --_txt: var(--grey-900);
  --_out-bd: var(--black);
  --_out-t: var(--grey-900);
  --_dis-bg: var(--grey-200);
  --_dis-t: var(--grey-500);
}
```

This ensures component previews remain visually accurate in light context even while the showcase chrome is dark. Secondary and Tertiary don't need restoration — their tokens are fixed (not surface-dependent).

---

## Accessibility

- **WCAG 2.2 AA** contrast ratios enforced on all text/background combinations.
- **Focus visible** ring on keyboard navigation (`:focus-visible`).
- `prefers-reduced-motion: reduce` → all transitions disabled.
- Disabled buttons use `cursor: not-allowed` and `aria-disabled` when applicable.

---

## CSS Selectors Cascade (priority order)

```
.jb                                  → base tokens (light)
[data-brand="xx"] .jb                → brand overrides (light)
[data-surface="dark"] .jb            → dark surface tokens (transparent variants only)
[data-surface="dark"] .jb--out       → outline dark hover
body.dm .jb                          → dark mode toggle tokens
body.dm .jb--out                     → outline dark mode hover
body.dm [data-brand="xx"] .jb        → brand + dark mode toggle
body.dm [data-surface="light"] .jb   → light preview restoration
```
