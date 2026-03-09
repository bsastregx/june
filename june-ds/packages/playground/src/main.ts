// Import tokens (CSS custom properties)
import '@anthropic/june-ds/tokens.css';

// Import and register all components
import '@anthropic/june-ds';

// ── Dark mode toggle ──
const dmToggle = document.getElementById('dm-toggle');
dmToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dm');
  dmToggle.textContent = document.body.classList.contains('dm')
    ? 'Light Mode'
    : 'Dark Mode';
});

// ── Brand switcher ──
document.querySelectorAll<HTMLButtonElement>('.brand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const brand = btn.dataset.brand;
    if (!brand) return;
    document.body.setAttribute('data-brand', brand);
    document.querySelectorAll('.brand-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
