# June DS

Showcase en `showcase/` (Vite, localhost:5173).

## Build
- Dev: `cd showcase && npm run dev`
- Rebuild dist: `cd packages/june-ds && npm run build`
- Limpiar cache Vite: `rm -rf node_modules/.vite`

## Reglas

### 1. Tokens siempre
- Todo valor visual usa `var(--*)` definido en `:root`
- Nunca hardcodear valores

### 2. Dark mode (dos conceptos distintos)
- **Showcase dark mode** (`body.dm`):
  - Afecta solo el chrome: sidebar, topbar, controles, fondo de página
  - Tokens redefinidos en `_dark.scss`
- **June DS dark mode** (`[data-ds-theme="dark"]`):
  - NO EXISTE todavía
  - Cuando exista, afectará componentes del DS (botones, fields, stencils)
  - Reglas dormidas ya usan este selector en blocks e island
- **Aislamiento de previews**:
  - Preview frames usan `[data-surface="light"]` que restaura TODOS los tokens a valores light
  - Impide que `body.dm` afecte componentes dentro del preview
- **Regla para componentes nuevos**:
  - NUNCA usar `body.dm` en SCSS/TS de componentes nuevos
  - Si necesita dark mode futuro, usar `[data-ds-theme="dark"]`
  - Reglas `body.dm` en button y field son TEMPORARY y se migrarán

### 3. Brand switching
- **Global**: chip en topbar aplica un solo `data-brand="gx|nx|ge"` en `#page` que cascadea a todo
- **Mecanismo**:
  - `_brands.scss` define `--brand`, `--brand-h`, `--brand-on`, etc. en `[data-brand="xx"]`
  - Custom properties cascadean a través de Shadow DOM
- **Light DOM** (`.jb` en blocks/island):
  - Branded vía selectores SCSS `[data-brand="xx"] .jb`
- **Shadow DOM** (`<june-button>`, `<june-field>`):
  - Branded vía herencia de `--brand` CSS custom property
  - Usa `:host-context([data-brand])` donde aplique
- **`brandAware` por página**: solo páginas de componentes llevan `brandAware: true` en su `PageDef`. El brand-switcher del topbar se oculta en páginas de foundations (colors, typography, spacing, etc.) que no muestran componentes brandeados

### 4. Propagación obligatoria de componentes
- **Cuando se cambia un componente** (clase CSS, animación, custom property, estructura HTML):
  - DEBE propagarse a todas las capas:
    1. SCSS del componente
    2. Página propia
    3. Stencils que lo embeben
    4. Recipes/composiciones
  - No está completo hasta que llega a la última capa
  - Consultar mapa de embebidos en `june-sync`
- **Anti-pattern**: cambiar solo la página del componente y olvidar los stencils

### 5. Jerarquía de decisiones
1. Principios de diseño (`june-brief`)
2. Convenciones UX establecidas
3. Figma specs
4. Criterio propio
- **Nota**: Figma es fuente importante pero no la única — si no hay frame, decidir por principios y buenas prácticas

### 6. Skills y subagents antes de actuar
- Consultar `.claude/skills/` antes de cualquier cambio
- **Usar Task tool con subagents para research intensivo** (preserva context principal)
- Los subagents corren en contextos separados y reportan resúmenes

### 7. Un solo `badge: 'new'`
- Solo el componente más reciente lleva `badge: 'new'` en el sidebar
- Al agregar uno nuevo, quitar el anterior

### 8. Hex en specs siempre 6 dígitos
- En tablas de specs, docs y texto visible al usuario: 6 dígitos (`#111111`, `#FFFFFF`)
- En CSS/SCSS: shorthand `#111` es válido

### 9. Swatch en toda celda de color
- Toda celda de tabla de specs con color incluye: `<span class="sw" style="background:COLOR"></span>`
- Colores claros o con transparencia: agregar `border:1px solid #e0e0e0` al swatch

### 10. Border-radius concéntrico (regla Apple)
- **Radio del hijo**: `max(R_padre - padding_padre, 0)`
- Crea esquinas ópticamente concéntricas
- **Excepción**: containers con `overflow: hidden` ya recortan visualmente — no necesitan radius interno
- **Pills** (`--r-full`) con padding 3px: `calc(var(--r-full) - 3px)`

### 11. Self-review antes de presentar
- **Antes de presentar plan o propuesta**:
  - Hacer revisión crítica silenciosa
  - Identificar al menos 3 debilidades
  - Corregirlas
  - Solo entonces presentar
- **No presentar primer borrador**
- **No usar feedback del usuario como proceso de revisión**
- Si el usuario pregunta "es tu mejor plan?", la revisión no se hizo

### 12. Planificación verificada
- **Antes de ejecutar cualquier tarea**, presentar plan con:
  - Qué se va a hacer
  - Qué resultado se espera
  - Qué archivos se van a tocar
  - Qué otras partes del proyecto podrían verse afectadas
- **Si hay múltiples caminos razonables**:
  - Explicar alternativas
  - Justificar la elección
- **Si hay un solo camino claro**:
  - Decirlo
  - Justificar por qué
- **Exponer trade-offs antes de ejecutar**
- **Si durante la ejecución el plan no es el mejor**:
  - Detenerse
  - Replantear antes de seguir
- **No esperar a que se pida revisión**: la verificación crítica es parte del plan

### 13. Tokens copiables en specs
- **Todo `--token` que un dev copiaría**: `snip('--token', '--token')`
- **`tok--static` solo para**:
  - Labels descriptivos
  - CSS properties
  - Atributos HTML
  - Nombres internos
- **Tablas responsive/comportamiento**: valores de spacing que corresponden a tokens (ej: 128px = `--sp-10`) referencian el token con `snip()`, no el px suelto

### 14. Consistencia sistémica en Showcase
- **Cuando se modifica cualquier página, pestaña o sección**: auditar automáticamente todas las demás para detectar inconsistencias
- **Criterio**: si un cambio podría hacer que otra página se vea o comporte distinto, verificarlo
- **Evaluar impacto bidireccional**: qué rompe hacia abajo y si debería propagarse hacia arriba
- **Inconsistencias que requieran decisión del usuario**: listarlas explícitamente, no asumir
- **Al terminar**: reportar resumen de qué se revisó y qué se encontró (incluso si no hubo hallazgos)
- **Checklist completo**: consultar `june-audit` skill para 20 áreas específicas (tipografía, spacing, tokens, responsive, dark/light, accesibilidad, etc.)

### 15. Planning quality
- **Antes de presentar cualquier plan**, preguntarse: "¿hay algo que agregaría si el usuario me pushea?" Si sí, incluirlo ahora
- **Un plan completo siempre incluye**:
  - Archivos y componentes afectados
  - Supuestos hechos
  - Edge cases identificados
  - Alternativas descartadas y por qué
  - Riesgos
- **Si hay ambigüedad genuina** que no se resuelve con supuestos razonables, marcarla explícitamente — pero no usar la ambigüedad como excusa para diferir profundidad

## Git
- **Commits directo a main** — No crear branches. Todos los commits van a `main` directamente.

## Workflows
- Componente nuevo: `june-specs → june-craft → june-audit → done`
- Automatizado: `/june-orchestrate` (3 teammates coordinados)
- Iterativo: `/june-ralph audit-fix <component>`

## Context Management
**Cuando se compacte esta conversación, preservar**:
- Git status y lista completa de archivos modificados
- Todos los mensajes de error y stack traces
- Mapa de propagación de componentes (SCSS → page → stencils → recipes)
- Decisiones de arquitectura y trade-offs discutidos
- Comandos de build y test ejecutados
