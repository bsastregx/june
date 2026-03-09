#!/usr/bin/env node
/**
 * process-illustrations.mjs
 *
 * Reads raw SVGs from raw-svg/, processes them, and generates:
 *   1. src/icons/illustrations.ts — named exports of SVG template literals
 *   2. raw-svg/quality-report.json — quality report with flags
 *
 * Pipeline per SVG:
 *   1. SVGO optimize
 *   2. Remove black background rect
 *   3. Classify & replace colors → var(--icon-accent/line/fill)
 *   4. Quality validations
 *
 * Usage:  node scripts/process-illustrations.mjs
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { optimize } from 'svgo';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const RAW_DIR = resolve(ROOT, 'raw-svg');
const OUT_FILE = resolve(ROOT, 'src/icons/illustrations.ts');
const REPORT_FILE = resolve(RAW_DIR, 'quality-report.json');

/* ── SVGO config ──────────────────────────────────────────────────── */

const SVGO_CONFIG = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          mergePaths: false,
        },
      },
    },
    'removeDimensions',
    'removeXMLNS',
    'convertTransform',
    {
      name: 'inlineStyles',
      params: { onlyMatchedOnce: false },
    },
  ],
  floatPrecision: 2,
};

/* ── Color classification ─────────────────────────────────────────── */

function hexToHSL(hex) {
  const h6 = hex.replace('#', '');
  const full = h6.length === 3
    ? h6[0] + h6[0] + h6[1] + h6[1] + h6[2] + h6[2]
    : h6;
  const r = parseInt(full.substring(0, 2), 16) / 255;
  const g = parseInt(full.substring(2, 4), 16) / 255;
  const b = parseInt(full.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let s = 0;
  let hue = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) hue = ((b - r) / d + 2) * 60;
    else hue = ((r - g) / d + 4) * 60;
  }

  return { h: Math.round(hue), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function classifyColor(hex) {
  const { h, s, l } = hexToHSL(hex);

  // Pure black (background) — remove
  if (l < 5) return 'background';

  // Blue accent range (H: 190-250, S > 40%)
  if (h >= 190 && h <= 250 && s > 40) return 'accent';

  // White / near-white → line (these are strokes/outlines on the dark Figma canvas)
  if (l > 85) return 'line';

  // Dark tones → fill (secondary area fills like #2E3A4A)
  if (l < 40) return 'fill';

  // Medium lightness → fill
  return 'fill';
}

const TOKEN_MAP = {
  accent: 'var(--icon-accent)',
  line: 'var(--icon-line)',
  fill: 'var(--icon-fill)',
};

/* ── Override map for known misclassifications ────────────────────── */
// Add entries as { '#hex': 'accent' | 'line' | 'fill' } if heuristic fails
const COLOR_OVERRIDES = {
  '#2e3a4a': 'fill',  // Dark blueish grey — secondary area fill in Figma originals
};

/* ── SVG processing ───────────────────────────────────────────────── */

function removeBackground(svg) {
  // Figma exports the 64×64 background as either:
  //   <rect width="64" height="64" fill="..."/>
  //   <path fill="..." d="M0 0h64v64H0z"/>  (SVGO converts rect→path)
  // Remove the first element that matches either pattern.

  // Pattern 1: <path> with d="M0 0h64v64H0z" (full-canvas rect as path)
  let result = svg.replace(
    /<path[^>]*\bd=["']M0 0h64v64H0z?["'][^>]*\/?>/i,
    ''
  );

  // Pattern 2: <rect> with width/height 64
  result = result.replace(
    /<rect[^>]*(?:width=["']64["'][^>]*height=["']64["']|height=["']64["'][^>]*width=["']64["'])[^>]*\/?>/i,
    ''
  );

  return result;
}

function replaceColors(svg, name) {
  const issues = [];
  const foundColors = new Map();

  // Replace fill="..." and stroke="..." hex colors
  let result = svg.replace(
    /((?:fill|stroke)\s*[=:]\s*["']?)(#[0-9a-fA-F]{3,8})(["']?)/gi,
    (match, prefix, hex, suffix) => {
      const normalized = hex.length === 4
        ? '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
        : hex;

      const override = COLOR_OVERRIDES[normalized.toLowerCase()];
      const role = override || classifyColor(normalized);

      foundColors.set(normalized, role);

      if (role === 'background') {
        // Should have been removed already, but catch stragglers
        return prefix + 'var(--icon-fill)' + suffix;
      }

      const token = TOKEN_MAP[role];
      if (token) return prefix + token + suffix;

      issues.push(`unknown-color:${normalized}`);
      return match;
    }
  );

  // Also handle style="fill:#xxx" or style="stroke:#xxx" (inline styles)
  result = result.replace(
    /((?:fill|stroke)\s*:\s*)(#[0-9a-fA-F]{3,8})/gi,
    (match, prefix, hex) => {
      const normalized = hex.length === 4
        ? '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
        : hex;

      const override = COLOR_OVERRIDES[normalized.toLowerCase()];
      const role = override || classifyColor(normalized);

      const token = TOKEN_MAP[role];
      if (token) return prefix + token;

      if (!issues.includes(`unknown-color:${normalized}`)) {
        issues.push(`unknown-color:${normalized}`);
      }
      return match;
    }
  );

  return { svg: result, issues, foundColors };
}

function validateSvg(svg, name, fileSize) {
  const issues = [];

  // Check stroke-widths
  const strokeWidths = new Set();
  const swMatches = svg.matchAll(/stroke-width[=:]["']?([0-9.]+)/gi);
  for (const m of swMatches) strokeWidths.add(m[1]);
  if (strokeWidths.size > 1) {
    issues.push(`mixed-strokes:${[...strokeWidths].join(',')}`);
  }

  // Check for gradients
  if (/<(linearGradient|radialGradient)/i.test(svg)) {
    issues.push('gradient');
  }

  // Check for prohibited elements
  const prohibited = ['filter', 'clipPath', 'mask', 'use', 'image'];
  for (const el of prohibited) {
    if (new RegExp(`<${el}[\\s>]`, 'i').test(svg)) {
      issues.push(`prohibited-element:${el}`);
    }
  }

  // Check for <text> elements
  if (/<text[\s>]/i.test(svg)) {
    issues.push('text-element');
  }

  // Check file size
  if (fileSize > 5120) {
    issues.push(`large-file:${Math.round(fileSize / 1024)}KB`);
  }

  // Check padding — extract path d= coordinates that are near the viewBox edge
  const viewBoxMatch = svg.match(/viewBox=["']([^"']+)["']/);
  if (viewBoxMatch) {
    const vbParts = viewBoxMatch[1].split(/\s+/).map(Number);
    const vbW = vbParts[2];
    const vbH = vbParts[3];
    if (vbW === 64 && vbH === 64) {
      // Extract numeric coords from d= attributes only (not viewBox/width/height/other attrs)
      const dAttrs = [...svg.matchAll(/\bd=["']([^"']+)["']/g)].map(m => m[1]).join(' ');
      const coords = [...dAttrs.matchAll(/(-?[0-9]+\.?[0-9]*)/g)].map(m => parseFloat(m[1]));
      // Ignore exact 0 and 64 (those are the canvas edges, likely from background rect)
      const nearEdge = coords.some(c =>
        (c > 0 && c < 2) || (c > 62 && c < 64)
      );
      if (nearEdge) {
        issues.push('tight-padding');
      }
    }
  }

  return issues;
}

/* ── Naming ────────────────────────────────────────────────────────── */

function kebabToCamel(kebab) {
  return kebab.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

/* ── Main ─────────────────────────────────────────────────────────── */

function main() {
  const svgFiles = readdirSync(RAW_DIR)
    .filter(f => f.endsWith('.svg'))
    .sort();

  if (svgFiles.length === 0) {
    console.error('✗ No SVG files found in raw-svg/. Run fetch-illustrations first.');
    process.exit(1);
  }

  console.log(`Processing ${svgFiles.length} SVGs...`);

  const exports = [];
  const names = [];
  const clean = [];
  const flagged = [];
  let totalSize = 0;

  for (const file of svgFiles) {
    const name = file.replace('.svg', '');
    const filePath = resolve(RAW_DIR, file);
    const rawSvg = readFileSync(filePath, 'utf-8');
    const fileSize = statSync(filePath).size;
    totalSize += fileSize;

    // 1. SVGO optimize
    const optimized = optimize(rawSvg, { ...SVGO_CONFIG, path: filePath });
    let svg = optimized.data;

    // 2. Remove background
    svg = removeBackground(svg);

    // 3. Classify & replace colors
    const colorResult = replaceColors(svg, name);
    svg = colorResult.svg;

    // 4. Validate
    const validationIssues = validateSvg(svg, name, fileSize);
    const allIssues = [...colorResult.issues, ...validationIssues];

    if (allIssues.length === 0) {
      clean.push(name);
    } else {
      flagged.push({ name, issues: allIssues });
    }

    // Clean up SVG for TS export — single line, escape backticks
    const cleanSvg = svg
      .replace(/\n\s*/g, '')
      .replace(/`/g, '\\`');

    const exportName = 'illu' + kebabToCamel(name).charAt(0).toUpperCase() + kebabToCamel(name).slice(1);
    exports.push(`export const ${exportName} = \`${cleanSvg}\`;`);
    names.push({ kebab: name, exportName });

    const status = allIssues.length === 0 ? '✓' : '⚠';
    const detail = allIssues.length > 0 ? ` [${allIssues.join(', ')}]` : '';
    console.log(`  ${status} ${name}${detail}`);
  }

  // Generate illustrations.ts
  const tsContent = [
    '// AUTO-GENERATED by process-illustrations.mjs — do not edit',
    '',
    ...exports,
    '',
    `export const ILLUSTRATION_NAMES = [${names.map(n => `'${n.kebab}'`).join(', ')}] as const;`,
    '',
    'export const illustrationMap: Record<string, string> = {',
    ...names.map(n => `  '${n.kebab}': ${n.exportName},`),
    '};',
    '',
  ].join('\n');

  writeFileSync(OUT_FILE, tsContent, 'utf-8');
  console.log(`✓ Generated ${OUT_FILE} (${names.length} illustrations)`);

  // Generate quality report
  const report = {
    clean,
    flagged,
    stats: {
      total: svgFiles.length,
      clean: clean.length,
      flagged: flagged.length,
      totalSizeKB: Math.round(totalSize / 1024),
    },
  };

  writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`✓ Quality report: ${clean.length} clean, ${flagged.length} flagged`);
}

main();
