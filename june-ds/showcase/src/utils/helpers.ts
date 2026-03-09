// UI helper utilities
import { copyToClipboard, showToast } from './clipboard.js';

// ── Shared sticky-bar bg dots (5 options) ──

export const STICKY_BG: { label: string; value: string; color: string }[] = [
  { label: 'White', value: '', color: '' },
  { label: 'Alt', value: '#F0F0F0', color: '#F0F0F0' },
  { label: 'Sky', value: '#BEE8FF', color: '#BEE8FF' },
  { label: 'Violet', value: '#DDD1FF', color: '#DDD1FF' },
  { label: 'Orange', value: '#E89330', color: '#E89330' },
  { label: 'Blue-600', value: '#67A1FF', color: '#67A1FF' },
  { label: 'Green-900', value: '#004C46', color: '#004C46' },
  { label: 'Navy', value: '#151F2B', color: '#151F2B' },
  { label: 'Black', value: '#111111', color: '#111111' },
  { label: 'Dark', value: '#171717', color: '#171717' },
];

// Card treatment: 'dark' → dark cards (#212121), 'accent' → white cards
const DARK_BGS = new Set(['#171717', '#111111']);
// Text contrast: any bg where header text needs to be white
const DARK_SURFACES = new Set(['#171717', '#111111', '#004C46', '#151F2B']);

export function pgBgType(bg: string): '' | 'accent' | 'dark' {
  if (!bg) return '';
  return DARK_BGS.has(bg) ? 'dark' : 'accent';
}

export function pgIsDarkSurface(bg: string): boolean {
  return DARK_SURFACES.has(bg);
}

export function stickyBgDotsHTML(): string {
  return STICKY_BG.map((opt, i) => {
    const cls = 'pg-bg-dot' + (i === 0 ? ' pg-bg-dot--default on' : '');
    const bg = opt.color ? ' style="background:' + opt.color + '"' : '';
    return '<button class="' + cls + '"' + bg + ' data-bg="' + opt.value + '" title="' + opt.label + '" aria-label="Background: ' + opt.label + '"></button>';
  }).join('');
}

// ── Brand-specific BG filtering ──

const BRAND_BG_FILTER: Record<string, Set<string>> = {
  gx: new Set(['', '#F0F0F0', '#BEE8FF', '#DDD1FF', '#171717']),
  nx: new Set(['', '#67A1FF', '#151F2B']),
  ge: new Set(['', '#004C46', '#111111']),
};

export function filterStickyBgDots(container: HTMLElement | null, brand: string, onReset?: () => void): void {
  if (!container) return;
  const allowed = BRAND_BG_FILTER[brand];
  let needReset = false;
  container.querySelectorAll<HTMLElement>('.pg-bg-dot').forEach(dot => {
    const bg = dot.dataset.bg || '';
    const show = !allowed || allowed.has(bg);
    dot.style.display = show ? '' : 'none';
    if (!show && dot.classList.contains('on')) {
      dot.classList.remove('on');
      needReset = true;
    }
  });
  if (needReset) {
    const def = container.querySelector<HTMLElement>('.pg-bg-dot--default');
    if (def) def.classList.add('on');
    if (onReset) onReset();
  }
}

export function setupRadioGroup(el: HTMLElement, cb?: (btn: HTMLButtonElement) => void): void {
  const btns = Array.from(el.querySelectorAll<HTMLButtonElement>('button'));

  function select(btn: HTMLButtonElement): void {
    btns.forEach(b => {
      b.classList.remove('on');
      b.setAttribute('aria-checked', 'false');
      b.setAttribute('tabindex', '-1');
    });
    btn.classList.add('on');
    btn.setAttribute('aria-checked', 'true');
    btn.setAttribute('tabindex', '0');
    if (cb) cb(btn);
  }

  btns.forEach((btn, idx) => {
    btn.addEventListener('click', () => select(btn));

    btn.addEventListener('keydown', (e: KeyboardEvent) => {
      let next = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        next = (idx + 1) % btns.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        next = (idx - 1 + btns.length) % btns.length;
      }
      if (next >= 0) {
        btns[next].focus();
        select(btns[next]);
      }
    });
  });

  // Initial roving tabindex
  btns.forEach(b => {
    b.setAttribute('tabindex', b.classList.contains('on') ? '0' : '-1');
  });
}

export function initTokAccessibility(): void {
  document.querySelectorAll('.tok:not([tabindex])').forEach(el => {
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.addEventListener('keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
        e.preventDefault();
        (el as HTMLElement).click();
      }
    });
  });
}

/** Wire click-to-copy on .sw swatches inside specs tables. */
export function initSwatchCopy(): void {
  document.querySelectorAll<HTMLElement>('.sw:not([data-sw-ready])').forEach(el => {
    el.setAttribute('data-sw-ready', '');
    const raw = el.getAttribute('style') || '';
    const bg = raw.match(/background:\s*([^;\"]+)/)?.[1]?.trim();
    if (!bg) return;
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.style.cursor = 'pointer';
    el.title = `Copy ${bg}`;
    el.addEventListener('click', () => {
      copySwatchColor(bg);
    });
    el.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copySwatchColor(bg);
      }
    });
  });
}

function copySwatchColor(color: string): void {
  copyToClipboard(color);
  showToast('Copied!');
}
