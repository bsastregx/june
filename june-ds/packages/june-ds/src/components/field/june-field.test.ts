import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, shadowQuery, shadowQueryAll, setProperty } from '../../test-utils';
import type { JuneField } from './june-field.lit';
import './june-field.lit';

describe('june-field', () => {
  afterEach(cleanup);

  it('renders a text input by default', async () => {
    const el = await fixture<JuneField>('june-field');
    const input = shadowQuery<HTMLInputElement>(el, '.jf__input')!;
    expect(input).toBeTruthy();
    expect(input.type).toBe('text');
  });

  it('links label to input via for/id', async () => {
    const el = await fixture<JuneField>('june-field', e => { e.label = 'Name'; });
    const label = shadowQuery<HTMLLabelElement>(el, '.jf__label')!;
    const input = shadowQuery<HTMLInputElement>(el, '.jf__input')!;
    expect(label.getAttribute('for')).toBe(input.id);
  });

  it('renders textarea when type=textarea', async () => {
    const el = await fixture<JuneField>('june-field', e => { e.type = 'textarea'; });
    const ta = shadowQuery<HTMLTextAreaElement>(el, '.jf__textarea')!;
    expect(ta).toBeTruthy();
    expect(ta.tagName.toLowerCase()).toBe('textarea');
  });

  it('renders select when type=dropdown', async () => {
    const el = await fixture<JuneField>('june-field', e => {
      e.type = 'dropdown';
      e.options = [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ];
    });
    const select = shadowQuery<HTMLSelectElement>(el, '.jf__select')!;
    expect(select).toBeTruthy();
    const options = select.querySelectorAll('option');
    // placeholder option + 2 real options
    expect(options.length).toBe(3);
  });

  it('renders options as <option> elements', async () => {
    const el = await fixture<JuneField>('june-field', e => {
      e.type = 'dropdown';
      e.options = [{ value: 'x', label: 'X Label' }];
    });
    const select = shadowQuery<HTMLSelectElement>(el, '.jf__select')!;
    const opts = select.querySelectorAll('option');
    const real = opts[opts.length - 1];
    expect(real.value).toBe('x');
    expect(real.textContent).toBe('X Label');
  });

  it('displays placeholder', async () => {
    const el = await fixture<JuneField>('june-field', e => { e.placeholder = 'Enter text'; });
    const input = shadowQuery<HTMLInputElement>(el, '.jf__input')!;
    expect(input.placeholder).toBe('Enter text');
  });

  it('displays hint text', async () => {
    const el = await fixture<JuneField>('june-field', e => { e.hint = 'A hint'; });
    const hint = shadowQuery(el, '.jf__hint')!;
    expect(hint.textContent).toBe('A hint');
  });

  it('displays error text', async () => {
    const el = await fixture<JuneField>('june-field', e => { e.error = 'Required'; });
    const errorEl = shadowQuery(el, '.jf__error')!;
    expect(errorEl.textContent).toContain('Required');
  });

  it('shows requiredText when showRequiredText and required', async () => {
    const el = await fixture<JuneField>('june-field', e => {
      e.required = true;
      e.showRequiredText = true;
      e.requiredText = '(obligatorio)';
    });
    const req = shadowQuery(el, '.jf__required')!;
    expect(req.textContent).toBe('(obligatorio)');
  });

  it('uses custom placeholderSelect for dropdowns', async () => {
    const el = await fixture<JuneField>('june-field', e => {
      e.type = 'dropdown';
      e.placeholderSelect = 'Pick one';
      e.options = [{ value: 'a', label: 'A' }];
    });
    const select = shadowQuery<HTMLSelectElement>(el, '.jf__select')!;
    const first = select.querySelector('option')!;
    expect(first.textContent).toBe('Pick one');
  });

  it('shows errorText when forceState=error and no error prop', async () => {
    const el = await fixture<JuneField>('june-field', e => {
      e.forceState = 'error';
      e.errorText = 'Fallback error';
    });
    const errorEl = shadowQuery(el, '.jf__error')!;
    expect(errorEl.textContent).toContain('Fallback error');
  });

  it('disables input when disabled', async () => {
    const el = await fixture<JuneField>('june-field', e => { e.disabled = true; });
    const input = shadowQuery<HTMLInputElement>(el, '.jf__input')!;
    expect(input.disabled).toBe(true);
  });

  it('sets readonly on input', async () => {
    const el = await fixture<JuneField>('june-field', e => { e.readonly = true; });
    const input = shadowQuery<HTMLInputElement>(el, '.jf__input')!;
    expect(input.readOnly).toBe(true);
  });

  it('applies forceState class to root', async () => {
    const el = await fixture<JuneField>('june-field', e => { e.forceState = 'hover'; });
    const root = shadowQuery(el, '.jf')!;
    expect(root.className).toContain('jf--hover');
  });

  it('fires jf-input event with bubbles and composed', async () => {
    const el = await fixture<JuneField>('june-field');
    const input = shadowQuery<HTMLInputElement>(el, '.jf__input')!;

    const handler = vi.fn();
    el.addEventListener('jf-input', handler);

    input.value = 'hello';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    expect(handler).toHaveBeenCalledTimes(1);
    const evt = handler.mock.calls[0][0] as CustomEvent;
    expect(evt.detail.value).toBe('hello');
    expect(evt.bubbles).toBe(true);
    expect(evt.composed).toBe(true);
  });

  it('fires jf-change event on dropdown change', async () => {
    const el = await fixture<JuneField>('june-field', e => {
      e.type = 'dropdown';
      e.options = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
      ];
    });
    const select = shadowQuery<HTMLSelectElement>(el, '.jf__select')!;

    const handler = vi.fn();
    el.addEventListener('jf-change', handler);

    select.value = 'b';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await el.updateComplete;

    expect(handler).toHaveBeenCalledTimes(1);
    const evt = handler.mock.calls[0][0] as CustomEvent;
    expect(evt.detail.value).toBe('b');
    expect(evt.composed).toBe(true);
  });

  it('sets aria-describedby with hint and error ids', async () => {
    const el = await fixture<JuneField>('june-field', e => {
      e.hint = 'hint';
      e.error = 'err';
    });
    const input = shadowQuery<HTMLInputElement>(el, '.jf__input')!;
    const hintEl = shadowQuery(el, '.jf__hint')!;
    const errorEl = shadowQuery(el, '.jf__error')!;
    const described = input.getAttribute('aria-describedby')!;
    expect(described).toContain(hintEl.id);
    expect(described).toContain(errorEl.id);
  });

  it('sets aria-invalid when error present', async () => {
    const el = await fixture<JuneField>('june-field', e => { e.error = 'bad'; });
    const input = shadowQuery<HTMLInputElement>(el, '.jf__input')!;
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('sets aria-required when required', async () => {
    const el = await fixture<JuneField>('june-field', e => { e.required = true; });
    const input = shadowQuery<HTMLInputElement>(el, '.jf__input')!;
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  it('focusInput() focuses the internal input', async () => {
    const el = await fixture<JuneField>('june-field');
    const input = shadowQuery<HTMLInputElement>(el, '.jf__input')!;
    el.focusInput();
    expect(el.shadowRoot!.activeElement).toBe(input);
  });

  it('generates unique IDs across instances', async () => {
    const el1 = await fixture<JuneField>('june-field');
    const el2 = await fixture<JuneField>('june-field');
    const id1 = shadowQuery<HTMLInputElement>(el1, '.jf__input')!.id;
    const id2 = shadowQuery<HTMLInputElement>(el2, '.jf__input')!.id;
    expect(id1).not.toBe(id2);
  });
});
