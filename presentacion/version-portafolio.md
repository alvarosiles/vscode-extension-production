# Extensiones Pro para VS Code — Landing page

## Descripción breve (tarjeta)

Landing page estática que reúne en un solo sitio las **7 extensiones para VS Code** del autor, con catálogo filtrable, galería de capturas, demo interactiva de atajos y deploy automático a GitHub Pages.

## Descripción completa

El sitio funciona como vitrina de las extensiones publicadas en el Marketplace: Pro Dev Pack, Pro AI Assistant, Keybindings, Themes, Snippets, Tools y Full Workspace.

- **Hero** con una ventana de VS Code simulada que escribe código en vivo y muestra una sugerencia de la IA.
- **Catálogo** de tarjetas con filtros por categoría (Packs, Look & feel, Productividad, IA).
- **Modal de detalle** con galería de las 3 capturas reales de cada extensión, lista de funcionalidades, comando de instalación con botón de copiar y enlaces al Marketplace y a GitHub.
- **Demo de atajos**: el visitante presiona combinaciones de teclas reales y se iluminan en pantalla.
- **Instalación en un comando** del pack completo.

Las capturas no se duplican: se leen directamente de la rama `main` de cada repositorio de extensión, así que el sitio se mantiene actualizado sin tocarlo.

## Problema que resuelve

Las extensiones estaban dispersas en 7 repositorios y 7 páginas del Marketplace. No había un lugar único para mostrarlas, compararlas e instalarlas.

## Objetivo

Tener una página de presentación profesional, rápida y compartible que convierta visitas en instalaciones.

## Público objetivo

Desarrolladores que usan VS Code, reclutadores y cualquier persona que llegue desde el portafolio o desde redes sociales.

## Mi participación técnica

Diseño, desarrollo, contenido y configuración del deploy.

## Funcionalidades destacadas

- Catálogo dirigido por datos: agregar una extensión es editar un único archivo (`assets/js/data.js`).
- Modal accesible con trampa de foco, navegación con flechas y cierre con `Esc`.
- Demo de atajos que escucha el teclado real.
- Efectos visuales (tarjetas 3D, brillo que sigue al cursor, fondo de estrellas, confeti y un easter egg con el código Konami).
- Página 404 propia.

## Tecnologías

| Categoría | Tecnologías |
|---|---|
| Frontend | HTML5 semántico, CSS3 (custom properties, grid, `clamp`), JavaScript con módulos ES |
| Gráficos | Canvas 2D (estrellas y confeti) |
| SEO | Open Graph, Twitter Cards, JSON-LD (`ItemList` de `SoftwareApplication`), `sitemap.xml`, `robots.txt` |
| PWA | Web App Manifest |
| CI/CD | GitHub Actions → GitHub Pages |

## Arquitectura y aspectos técnicos

- **Sin build ni dependencias**: se sirve tal cual; el workflow solo copia los archivos públicos a `_site` y los publica.
- **Separación de datos y lógica**: `data.js` contiene el catálogo y `main.js` la interacción.
- **DOM sin `innerHTML`**: los elementos se crean con un helper `h()`, lo que evita inyección de HTML.
- **Rendimiento**: las imágenes cargan en diferido, el canvas no dibuja cuando la pestaña está oculta y los listeners de scroll son pasivos.
- **Accesibilidad**: enlace "saltar al contenido", foco visible, `aria-*` en filtros y modal, y soporte de `prefers-reduced-motion`.

## Seguridad

Sitio estático sin backend ni formularios. Los enlaces externos usan `rel="noopener"` y el contenido dinámico se inserta como texto, no como HTML.

## Retos técnicos

- Lograr un efecto "wow" sin frameworks ni librerías y sin penalizar el rendimiento.
- Mantener la accesibilidad con muchos elementos animados.
- Reutilizar las capturas de 7 repositorios distintos sin duplicarlas.

## Mejoras futuras recomendadas

- Versión en inglés con selector de idioma.
- Contador de instalaciones en vivo con la API del Marketplace.
- Imagen Open Graph propia generada para el sitio.

## Estado

Versión `1.0.0` publicada en GitHub Pages: <https://alvarosiles.github.io/vscode-extension-production/>.

## Capturas

| Archivo | Contenido |
|---|---|
| `presentacion/01-vista-principal.png` | Hero con la ventana de VS Code animada, el código escrito por la "IA" y los contadores. |
| `presentacion/02-funcionalidad-principal.png` | Catálogo de extensiones con filtros y la tarjeta destacada del Pro Dev Pack. |
| `presentacion/03-funcionalidad-complementaria.png` | Modal de detalle de Pro AI Assistant con galería y funcionalidades. |

Capturas del sitio real a 1920×1042, tomadas con Microsoft Edge en modo headless.
