// Clipboard utilities

/** Clipboard SVG icon (12px) for .snip buttons */
export const clipSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;

/** Carbon-style inline snippet with copy button */
export function snip(text: string, token: string): string {
  return `<span class="snip" data-copy-token="${token}"><span class="snip__val">${text}</span><button class="snip__btn" aria-label="Copy ${token}">${clipSvg}</button></span>`;
}

/** Snippet for hex color values */
export function snipColor(hex: string): string {
  return `<span class="snip" data-copy-color="${hex}"><span class="snip__val">${hex}</span><button class="snip__btn" aria-label="Copy ${hex}">${clipSvg}</button></span>`;
}

export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text).catch(() => {
    // Silent fail — Clipboard API requires secure context
  });
}

let _toastTimer = 0;

export function showToast(msg: string): void {
  const t = document.getElementById('copy-toast');
  if (!t) return;
  t.innerHTML = msg;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = window.setTimeout(() => t.classList.remove('show'), 1500);
}

/**
 * Setup copy functionality for all .snip elements
 * Includes keyboard support and screen reader announcements
 */
export function setupCopySnippets(): void {
  // Create live region for screen reader announcements (singleton)
  let liveRegion = document.querySelector('.snip-live-region');
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only snip-live-region';
    document.body.appendChild(liveRegion);
  }

  document.querySelectorAll('.snip').forEach(el => {
    const snipEl = el as HTMLElement;

    // Extract value from data attributes (token or color)
    const value = snipEl.dataset.copyToken || snipEl.dataset.copyColor;
    if (!value) return;

    // Make keyboard-accessible
    snipEl.setAttribute('role', 'button');
    snipEl.setAttribute('tabindex', '0');
    snipEl.setAttribute('aria-label', `Copy ${value}`);

    // Copy handler (shared by click and keyboard)
    const copyHandler = async () => {
      try {
        await copyToClipboard(value);

        // Visual feedback (inline, no toast)
        snipEl.classList.add('copied');
        setTimeout(() => snipEl.classList.remove('copied'), 1500);

        // Screen reader announcement
        if (liveRegion) {
          liveRegion.textContent = `Copied ${value}`;
          setTimeout(() => liveRegion.textContent = '', 2000);
        }
      } catch (err) {
        console.error('Copy failed:', err);
        if (liveRegion) {
          liveRegion.textContent = 'Copy failed';
        }
      }
    };

    // Mouse/touch
    snipEl.addEventListener('click', copyHandler);

    // Keyboard (Enter/Space)
    snipEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyHandler();
      }
    });
  });
}
