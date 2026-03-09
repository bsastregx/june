#!/usr/bin/env node
/**
 * fetch-illustrations.mjs
 *
 * Extracts illustration SVGs from the Figma file "Icons and Assets".
 * Modes:
 *   --pilot  (default)  Only the 10 pilot icons
 *   --all               All ~170 icons from page 0:1
 *
 * Requires FIGMA_PAT env var (Personal Access Token).
 *
 * Usage:
 *   FIGMA_PAT=xxx node scripts/fetch-illustrations.mjs
 *   FIGMA_PAT=xxx node scripts/fetch-illustrations.mjs --all
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'raw-svg');

const FILE_KEY = 'ngXWTpFxEZciKK9pYlw6Z0';
const PAT = process.env.FIGMA_PAT;
if (!PAT) {
  console.error('✗ FIGMA_PAT environment variable is required');
  process.exit(1);
}

const isAll = process.argv.includes('--all');

/* ── Pilot set (10 icons) ─────────────────────────────────────────── */

const PILOT = [
  { id: '108:771', name: 'Security' },
  { id: '108:762', name: 'Data' },
  { id: '108:767', name: 'API' },
  { id: '233:922', name: 'Cloud' },
  { id: '120:3044', name: 'Chatbot' },
  { id: '109:1946', name: 'Scalability' },
  { id: '2184:2', name: 'AI' },
  { id: '108:745', name: 'Patterns' },
  { id: '141:800', name: 'Design System' },
  { id: '111:2304', name: 'Webinar' },
];

/* ── Spanish → English translation map ────────────────────────────── */

const TRANSLATIONS = {
  reloj: 'clock',
  prohibido: 'forbidden',
  escalabilidad: 'scalability',
  configuracion: 'settings',
  seguridad: 'security',
  datos: 'data',
  nube: 'cloud',
  diseno: 'design',
  pantalla: 'screen',
  correo: 'mail',
  usuario: 'user',
  busqueda: 'search',
  herramientas: 'tools',
};

/* ── Helpers ───────────────────────────────────────────────────────── */

function toKebab(name) {
  // Translate Spanish names first
  let n = name.trim();
  const lower = n.toLowerCase();
  if (TRANSLATIONS[lower]) n = TRANSLATIONS[lower];

  return n
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .toLowerCase();
}

function dedupNames(items) {
  const counts = {};
  const result = [];
  for (const item of items) {
    const kebab = toKebab(item.name);
    counts[kebab] = (counts[kebab] || 0) + 1;
    if (counts[kebab] === 1) {
      result.push({ ...item, kebab });
    } else {
      result.push({ ...item, kebab: `${kebab}-${counts[kebab]}` });
    }
  }
  return result;
}

async function figmaGet(path) {
  const res = await fetch(`https://api.figma.com/v1${path}`, {
    headers: { 'X-Figma-Token': PAT },
  });
  if (!res.ok) {
    throw new Error(`Figma API ${res.status}: ${res.statusText} — ${path}`);
  }
  return res.json();
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/* ── Main ─────────────────────────────────────────────────────────── */

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  let items;

  if (isAll) {
    console.log('Fetching all icons from Figma...');
    const data = await figmaGet(`/files/${FILE_KEY}/nodes?ids=0:1&depth=1`);
    const page = data.nodes['0:1'];
    if (!page?.document?.children) {
      console.error('✗ Could not read page children');
      process.exit(1);
    }
    items = page.document.children.map(c => ({ id: c.id, name: c.name }));
    console.log(`  Found ${items.length} nodes`);
  } else {
    console.log('Fetching pilot set (10 icons)...');
    items = PILOT;
  }

  const named = dedupNames(items);

  // Check which already exist (resumable)
  const toFetch = named.filter(n => !existsSync(resolve(OUT_DIR, `${n.kebab}.svg`)));
  const skipped = named.length - toFetch.length;
  if (skipped > 0) console.log(`  Skipping ${skipped} already downloaded`);

  if (toFetch.length === 0) {
    console.log('✓ All SVGs already downloaded');
  } else {
    // Batch fetch SVG URLs (max 50 per request)
    const BATCH_SIZE = 50;
    for (let i = 0; i < toFetch.length; i += BATCH_SIZE) {
      const batch = toFetch.slice(i, i + BATCH_SIZE);
      const ids = batch.map(b => b.id).join(',');
      console.log(`  Requesting SVG URLs for batch ${Math.floor(i / BATCH_SIZE) + 1}...`);

      const imgData = await figmaGet(`/images/${FILE_KEY}/?ids=${ids}&format=svg`);

      for (const item of batch) {
        const url = imgData.images?.[item.id];
        if (!url) {
          console.warn(`  ⚠ No SVG URL for "${item.name}" (${item.id})`);
          continue;
        }

        const svgRes = await fetch(url);
        if (!svgRes.ok) {
          console.warn(`  ⚠ Failed to download "${item.name}": ${svgRes.status}`);
          continue;
        }

        const svgText = await svgRes.text();
        writeFileSync(resolve(OUT_DIR, `${item.kebab}.svg`), svgText, 'utf-8');
        console.log(`  ✓ ${item.kebab}.svg`);
      }

      // Rate limit: wait between batches
      if (i + BATCH_SIZE < toFetch.length) {
        console.log('  Waiting 3s (rate limit)...');
        await sleep(3000);
      }
    }
  }

  // Write manifest
  const manifest = {};
  for (const item of named) {
    manifest[item.kebab] = item.id;
  }
  writeFileSync(resolve(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`✓ Wrote manifest.json (${named.length} entries)`);
}

main().catch(err => {
  console.error('✗', err.message);
  process.exit(1);
});
