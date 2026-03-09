#!/usr/bin/env node
/**
 * generate-tokens.mjs
 *
 * Reads tokens.json (single source of truth) and generates:
 *   1. _generated-tokens.scss  — :root {} with all DS CSS custom properties
 *   2. showcase/public/tokens.json — copy for serving via Vite
 *
 * Usage:  node scripts/generate-tokens.mjs
 * CI:     npm run tokens && git diff --exit-code
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const MONO = resolve(ROOT, '../..');

const tokens = JSON.parse(readFileSync(resolve(ROOT, 'src/tokens/tokens.json'), 'utf-8'));

// ── Helpers ──────────────────────────────────────────────────────────────

/** Resolve fontFamily references like "{fontFamily.display}" */
function resolveFamily(ref) {
  const m = ref.match(/^\{fontFamily\.(\w+)\}$/);
  if (!m) return ref;
  const fam = tokens.fontFamily[m[1]];
  return fam ? fam.$value : ref;
}

/** Build a typography shorthand: weight size/lineHeight family */
function typoShorthand(v) {
  const family = resolveFamily(v.fontFamily);
  return `${v.fontWeight} ${v.fontSize}/${v.lineHeight} ${family}`;
}

// ── Build lines ──────────────────────────────────────────────────────────

const lines = [];

function section(title) {
  lines.push('');
  lines.push(`  /* -- ${title} -- */`);
}

function prop(name, value) {
  lines.push(`  --${name}: ${value};`);
}

// Font families
section('Font families');
for (const [key, tok] of Object.entries(tokens.fontFamily)) {
  prop(`font-${key}`, tok.$value);
}

// Typography
section('Typography');
for (const [key, tok] of Object.entries(tokens.typography)) {
  if (key.startsWith('$')) continue;
  const v = tok.$value;
  prop(key, typoShorthand(v));
}

// Color: Neutral
section('Color: Neutral');
for (const [key, tok] of Object.entries(tokens.color.neutral)) {
  if (key.startsWith('$')) continue;
  prop(key, tok.$value);
}

// Color: Surface
section('Color: Surface');
for (const [key, tok] of Object.entries(tokens.color.surface)) {
  if (key.startsWith('$')) continue;
  prop(key, tok.$value);
}

// Color: Accent primitives
section('Color: Accent primitives');
for (const [key, tok] of Object.entries(tokens.color.accent)) {
  if (key.startsWith('$')) continue;
  prop(key, tok.$value);
}

// Color: State
section('Color: State');
for (const [key, tok] of Object.entries(tokens.color.state)) {
  if (key.startsWith('$')) continue;
  prop(key, tok.$value);
}

// Color: Text / Icon / Border
section('Color: Text / Icon / Border');
for (const [key, tok] of Object.entries(tokens.color['text-icon-border'])) {
  if (key.startsWith('$')) continue;
  prop(key, tok.$value);
}

// Color: Brand — GX
section('Color: Brand GX');
const gx = tokens.color.brand.gx;
prop('gx', gx.base.$value);
prop('gx-h', gx.hover.$value);
prop('gx-on', gx.on.$value);
prop('gx-a', gx.accent.$value);
prop('gx-text', gx.text.$value);

// Color: Brand — NX
section('Color: Brand NX');
const nx = tokens.color.brand.nx;
prop('nx', nx.base.$value);
prop('nx-h', nx.hover.$value);
prop('nx-on', nx.on.$value);
prop('nx-f', nx.focus.$value);
prop('nx-a', nx.accent.$value);
prop('nx-text', nx.text.$value);

// Color: Brand — GE
section('Color: Brand GE');
const ge = tokens.color.brand.ge;
prop('ge', ge.base.$value);
prop('ge-h', ge.hover.$value);
prop('ge-on', ge.on.$value);
prop('ge-a', ge.accent.$value);
prop('ge-text', ge.text.$value);

// Spacing
section('Spacing');
for (const [key, tok] of Object.entries(tokens.spacing)) {
  if (key.startsWith('$')) continue;
  prop(`sp-${key}`, tok.$value);
}

// Border radius
section('Border radius');
for (const [key, tok] of Object.entries(tokens.borderRadius)) {
  if (key.startsWith('$')) continue;
  prop(`r-${key}`, tok.$value);
}

// Shadows
section('Shadows');
for (const [key, tok] of Object.entries(tokens.shadow)) {
  if (key.startsWith('$') || key === 'dark') continue;
  prop(`shadow-${key}`, tok.$value);
}

// Breakpoints
section('Breakpoints');
for (const [key, tok] of Object.entries(tokens.breakpoint)) {
  if (key.startsWith('$')) continue;
  prop(`bp-${key}`, tok.$value);
}

// Z-index
section('Z-index');
for (const [key, tok] of Object.entries(tokens.zIndex)) {
  if (key.startsWith('$')) continue;
  prop(`z-${key}`, tok.$value);
}

// Motion
section('Motion');
for (const [key, tok] of Object.entries(tokens.motion)) {
  if (key.startsWith('$')) continue;
  prop(key, tok.$value);
}

// Overlay
section('Overlay');
for (const [key, tok] of Object.entries(tokens.overlay)) {
  if (key.startsWith('$')) continue;
  prop(`overlay-${key}`, tok.$value);
}

// Gradient
section('Gradient');
for (const [key, tok] of Object.entries(tokens.gradient)) {
  if (key.startsWith('$')) continue;
  prop(`gradient-${key}`, tok.$value);
}

// ── Write _generated-tokens.scss ─────────────────────────────────────────

const scss = [
  '/* AUTO-GENERATED from tokens.json — DO NOT EDIT */',
  ':root {',
  ...lines,
  '}',
  '',
].join('\n');

const outPath = resolve(ROOT, 'src/tokens/_generated-tokens.scss');
writeFileSync(outPath, scss, 'utf-8');
console.log(`✓ Generated ${outPath}`);

// ── Copy tokens.json to showcase/public ──────────────────────────────────

const showcasePublic = resolve(MONO, 'showcase/public');
mkdirSync(showcasePublic, { recursive: true });
const src = readFileSync(resolve(ROOT, 'src/tokens/tokens.json'), 'utf-8');
writeFileSync(resolve(showcasePublic, 'tokens.json'), src, 'utf-8');
console.log(`✓ Copied tokens.json → showcase/public/tokens.json`);
