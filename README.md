<h1 align="center">🚀 Extensiones Pro para VS Code</h1>

<p align="center">
  Landing page del catálogo de extensiones para Visual Studio Code de <a href="https://github.com/alvarosiles">Alvaro Siles</a>.
</p>

<p align="center">
  <a href="https://alvarosiles.github.io/vscode-extension-production/"><img alt="Sitio" src="https://img.shields.io/badge/sitio-en%20vivo-7c5cff"></a>
  <a href="https://github.com/alvarosiles/vscode-extension-production/actions/workflows/deploy.yml"><img alt="Deploy" src="https://github.com/alvarosiles/vscode-extension-production/actions/workflows/deploy.yml/badge.svg"></a>
  <img alt="Licencia MIT" src="https://img.shields.io/badge/licencia-MIT-4fd1c5">
</p>

<p align="center"><strong><a href="https://alvarosiles.github.io/vscode-extension-production/">→ Ver el sitio</a></strong></p>

---

## Extensiones

| | Extensión | Descripción |
|---|---|---|
| 📦 | [Alvaro's Pro Dev Pack](https://marketplace.visualstudio.com/items?itemName=alvarosiles.pro-vscode-extension-pack) | Las 5 extensiones Pro en una sola instalación |
| 🤖 | [Pro AI Assistant](https://marketplace.visualstudio.com/items?itemName=alvarosiles.pro-vscode-ai) | Chat, explain/fix/optimize y commits con IA |
| ⌨️ | [Pro VSCode Keybindings](https://marketplace.visualstudio.com/items?itemName=alvarosiles.pro-vscode-keybindings) | 25 atajos de productividad |
| 🎨 | [Pro VSCode Themes](https://marketplace.visualstudio.com/items?itemName=alvarosiles.pro-vscode-themes) | Tema Pro Dark |
| 🧩 | [Pro VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=alvarosiles.pro-vscode-snippets) | Snippets para JS, HTML y React |
| 🛠️ | [Pro VSCode Tools](https://marketplace.visualstudio.com/items?itemName=alvarosiles.pro-vscode-tools) | Utilidades y scaffolding |
| 🚀 | [Full Workspace](https://marketplace.visualstudio.com/items?itemName=alvarosiles.full-workspace) | Pack de extensiones de la comunidad |

## Stack

Sitio estático sin build ni dependencias: HTML semántico, CSS y JavaScript con módulos ES nativos.

- Accesible: navegación por teclado, modal con trampa de foco y respeto de `prefers-reduced-motion`.
- SEO: metadatos Open Graph y Twitter, datos estructurados JSON-LD, `sitemap.xml` y `robots.txt`.
- Rendimiento: imágenes con lazy loading y animaciones que se pausan cuando la pestaña no está visible.

## Estructura

```
.
├── index.html              # Página principal
├── 404.html                # Página de error
├── assets/
│   ├── css/styles.css      # Estilos
│   ├── js/data.js          # Catálogo de extensiones (editar acá)
│   ├── js/main.js          # Lógica e interacciones
│   └── img/favicon.svg
├── site.webmanifest
├── robots.txt
├── sitemap.xml
└── .github/workflows/deploy.yml   # Deploy automático a GitHub Pages
```

## Desarrollo local

Como el sitio usa módulos ES, hay que servirlo por HTTP (abrir el archivo con doble clic no funciona):

```bash
npx serve .
# o
python -m http.server 5501
```

También funciona con la extensión **Live Server** de VS Code (puerto `5501`, configurado en `.vscode/settings.json`).

## Agregar una extensión

1. Sumá un objeto al array `EXTENSIONS` en [`assets/js/data.js`](assets/js/data.js).
2. Subí al menos estas capturas a la rama `main` del repo de la extensión: `01-vista-principal.png`, `02-funcionalidad-principal.png` y `03-funcionalidad-complementaria.png`.
3. Hacé push a `main`. El workflow publica el sitio automáticamente.

## Deploy

Cada push a `main` dispara [`deploy.yml`](.github/workflows/deploy.yml), que publica el sitio en GitHub Pages.

Configuración inicial (una sola vez): **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Licencia

[MIT](LICENSE) © Alvaro Siles
