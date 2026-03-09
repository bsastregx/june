# June DS

Design system multi-brand para genexus.com. Tokens, componentes y guías.

## Stack

- **Lit** — Web components
- **TypeScript** — Modo estricto
- **SCSS** — Estilos con tokens
- **Vite** — Servidor de desarrollo y build

## Instalación

```bash
npm install
npm run dev
```

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo en localhost |
| `npm run build` | Build de producción (`dist/`) |
| `npm run preview` | Vista previa del build |

## Estructura

```
src/
  lib/
    components/   → Web components (Lit)
    icons/        → Íconos SVG compartidos
    styles/       → SCSS base
    tokens/       → Design tokens
  showcase/
    pages/        → Páginas del showcase
    styles/       → Estilos del showcase
    utils/        → Utilidades compartidas
```

## Marcas

Tres marcas soportadas via `data-brand`:

- **gx** — GeneXus
- **nx** — Next
- **ge** — GEAI
