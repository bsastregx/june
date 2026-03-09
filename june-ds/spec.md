Fijate que en el archivo .html tenes la implementacion de todo un showcase con un Design System. Ahora eso quiero separarlo y convertirlo en una librería de web components con Lit. El showcase quiero seguirlo manteniendo pero que consuma toda esta librería.

## Instrucciones de como abordar esto

1.  Primero analiza todo el HTML y entende los componentes que existen.
2.  Una vez que entiendas los componentes que existen, determina sus nombres, propiedades, eventos y métodos.
3.  También determina el CSS que llevan los mismos.
4.  Una vez que hagas todo este analisis, empeza a implementar los componentes con Lit con las mejores prácticas de programación.
5.  Una vez que hayas re-implementado todos los componentes, actualiza el showcase para que los consuma. Asegurate de que se siga viendo igual que ahora.
6.  Los archivos de estilos generales del showcase dejalo en CSSs apartes.
7.  Asegurate de que todo este bien tipado y que pueda arrancar con Vite el dev server.

## Stack tecnologico

- Todos los componentes deben ser hechos con Lit y TypeScript.
- Tenes que usar Vite para el servidor de desarrollo.
- Para darle estilos a los componentes tenes que usar SCSS.
- Usa Vite para el dev server y build de producción.

## Requrimientos funcionales/no funcionales

- Todo tiene que ser programado con las mejores practicas de programación
- Todo tiene que cumplir con WCAG 2.2 AA
- Usa TypeScript estricto
- Usa JS moderno ESNext
- Tiene que ser lo más performante posible
- Tiene que ser lo más mantenible posible
- Siempre usa las versiones más modernas de las librerias
- Por ahora vamos a usar npm para el manejador de dependencias.