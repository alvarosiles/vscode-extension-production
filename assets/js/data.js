/**
 * Catálogo de extensiones.
 * Para agregar una extensión nueva, sumá un objeto a EXTENSIONS.
 * Las capturas se cargan desde la rama `main` de cada repositorio (SCREENSHOTS).
 */
export const GITHUB_ORG = 'Core-Technology-Corporation';
export const PUBLISHER = 'alvarosiles';

export const SCREENSHOTS = [
  '01-vista-principal.png',
  '02-funcionalidad-principal.png',
  '03-funcionalidad-complementaria.png',
];

export const CATEGORIES = {
  pack: '📦 Packs',
  ux: '🎨 Look & feel',
  prod: '⚡ Productividad',
  ai: '🤖 IA',
};

export const EXTENSIONS = [
  {
    repo: 'pro-vscode-extension-pack',
    id: 'alvarosiles.pro-vscode-extension-pack',
    name: "Alvaro's Pro Dev Pack",
    emoji: '📦',
    version: '1.0.0',
    category: 'pack',
    badge: '⭐ Recomendado',
    featured: true,
    description: 'Las 5 extensiones Pro en una sola instalación: temas, atajos, snippets, herramientas e IA. Un clic y tu editor queda configurado.',
    tags: ['Extension Pack', '5 en 1', 'Un clic'],
    features: [
      'Instala Themes, Keybindings, Snippets, Tools y AI de una vez',
      'Cada extensión se puede desactivar por separado',
      'Sin dependencias entre ellas',
      'Ideal para configurar una máquina nueva en segundos',
    ],
  },
  {
    repo: 'pro-vscode-ai',
    id: 'alvarosiles.pro-vscode-ai',
    name: 'Pro AI Assistant',
    emoji: '🤖',
    version: '0.0.1',
    category: 'ai',
    badge: '🔥 IA',
    description: 'Asistente de IA dentro del editor: chat, explicar, corregir y optimizar código, y generar mensajes de commit.',
    tags: ['Anthropic', 'OpenAI', 'Google', 'Ollama', 'LM Studio'],
    features: [
      'Chat en la barra lateral con respuestas en streaming',
      'Explain / Fix / Optimize sobre el código seleccionado',
      'Genera código a partir de lenguaje natural',
      'Mensajes de commit automáticos a partir del diff',
      'Funciona con modelos locales (Ollama, LM Studio)',
      'Historial de chats y completado inline',
    ],
  },
  {
    repo: 'pro-vscode-keybindings',
    id: 'alvarosiles.pro-vscode-keybindings',
    name: 'Pro VSCode Keybindings',
    emoji: '⌨️',
    version: '1.0.11',
    category: 'prod',
    badge: '⚡ Productividad',
    description: 'Los atajos que VS Code debería traer de fábrica, más comandos inteligentes para Git y para correr proyectos.',
    tags: ['25 atajos', 'Git', 'Cero telemetría'],
    features: [
      '25 atajos listos sin configurar nada',
      'Comandos inteligentes de Git',
      'Ejecutar proyectos con una tecla',
      'Mismas teclas en Windows, Linux y macOS',
      'Cero telemetría',
    ],
  },
  {
    repo: 'pro-vscode-themes',
    id: 'alvarosiles.pro-vscode-themes',
    name: 'Pro VSCode Themes',
    emoji: '🎨',
    version: '1.0.0',
    category: 'ux',
    badge: '🎨 Tema',
    description: 'Pro Dark: un tema oscuro de bajo brillo con acento azul, pensado para sesiones largas de código.',
    tags: ['Pro Dark', 'Bajo contraste', 'Sesiones largas'],
    features: [
      'Colores consistentes en editor, sidebar, tabs y terminal',
      'Resaltado de sintaxis afinado para JS, TS, Python y Rust',
      'Decoraciones de Git con colores claros',
      'Próximamente: Pro Light, Midnight y High Contrast',
    ],
  },
  {
    repo: 'pro-vscode-snippets',
    id: 'alvarosiles.pro-vscode-snippets',
    name: 'Pro VSCode Snippets',
    emoji: '🧩',
    version: '0.0.1',
    category: 'prod',
    badge: '🧩 Snippets',
    description: 'Snippets reutilizables para crear componentes en segundos con JavaScript, HTML y React.',
    tags: ['JavaScript', 'HTML', 'React', 'Global'],
    features: [
      'Snippets rápidos y reutilizables',
      'JavaScript, HTML, React y globales',
      'Pensados para crear componentes',
      'Se actualizan seguido',
    ],
  },
  {
    repo: 'pro-vscode-tools',
    id: 'alvarosiles.pro-vscode-tools',
    name: 'Pro VSCode Tools',
    emoji: '🛠️',
    version: '0.0.1',
    category: 'prod',
    badge: '🛠️ Herramientas',
    description: 'Utilidades del día a día: scaffolding, conversión de formatos, ayudas del workspace y atajos de terminal.',
    tags: ['JSON → TS', 'Scaffolding', 'Terminal'],
    features: [
      'Convierte JSON en interfaces de TypeScript',
      'Genera componentes y estructuras de proyecto',
      'Comandos rápidos de terminal',
      'Panel de acciones rápidas',
      'Snippets para JS, TS y Python',
    ],
  },
  {
    repo: 'full-workspace',
    id: 'alvarosiles.full-workspace',
    name: 'Full Workspace',
    emoji: '🚀',
    version: '0.0.3',
    category: 'pack',
    badge: '📦 Pack',
    description: 'Un pack con las mejores extensiones de la comunidad para tener un workspace completo desde el primer minuto.',
    tags: ['Postman', 'Remote SSH', 'Live Server', 'DB Client'],
    features: [
      'Bookmarks y Path Intellisense',
      'Postman para probar APIs',
      'Remote SSH para servidores remotos',
      'Database Client y Live Server',
      'PowerShell y VS Code en español',
    ],
  },
];

/** Atajos de la sección interactiva (subset de pro-vscode-keybindings). */
export const KEYBINDINGS = [
  { keys: 'Ctrl+1', label: 'Comentar línea', match: (e) => e.ctrlKey && e.key === '1' },
  { keys: 'Ctrl+A', label: 'Seleccionar todo', match: (e) => e.ctrlKey && e.key.toLowerCase() === 'a' },
  { keys: 'Shift+Alt+↓', label: 'Duplicar línea', match: (e) => e.shiftKey && e.altKey && e.key === 'ArrowDown' },
  { keys: 'Alt+↑ / ↓', label: 'Mover línea', match: (e) => e.altKey && !e.shiftKey && /^Arrow(Up|Down)$/.test(e.key) },
  { keys: 'Ctrl+F1', label: 'Abrir settings.json', match: (e) => e.ctrlKey && e.key === 'F1' },
  { keys: 'Ctrl+F2', label: 'Abrir keybindings.json', match: (e) => e.ctrlKey && e.key === 'F2' },
  { keys: 'Ctrl+F3', label: 'Plegar bloque', match: (e) => e.ctrlKey && e.key === 'F3' },
  { keys: 'Ctrl+F4', label: 'Unir líneas', match: (e) => e.ctrlKey && e.key === 'F4' },
];

/** Código que se "escribe" en la ventana del hero: [clase, texto, clase, texto, ...]. */
export const HERO_CODE = [
  ['t-c', '// ✦ Pro AI: optimizá esta función'],
  ['t-k', 'export async function ', 't-f', 'getUsers', 't-p', '() {'],
  ['', '  ', 't-k', 'const ', '', 'res = ', 't-k', 'await ', 't-f', 'fetch', 't-p', '(', 't-s', "'/api/users'", 't-p', ');'],
  ['', '  ', 't-k', 'if ', 't-p', '(!', '', 'res.ok', 't-p', ') ', 't-k', 'throw new ', 't-f', 'Error', 't-p', '(', 't-s', "'Ups'", 't-p', ');'],
  ['', '  ', 't-k', 'return ', '', 'res.', 't-f', 'json', 't-p', '();'],
  ['t-p', '}'],
  [''],
  ['t-c', '// ⌨  Ctrl+1 → comentar · Alt+↑ → mover'],
  ['t-k', 'const ', '', 'speed = ', 't-n', '10', '', 'x;'],
];

export const HERO_WORDS = ['a otro nivel.', 'más rápido.', 'con IA.', 'más bonito.', 'en 1 clic.'];

export const screenshotUrl = (repo, file) =>
  `https://raw.githubusercontent.com/${GITHUB_ORG}/${repo}/main/${file}`;
export const marketplaceUrl = (id) =>
  `https://marketplace.visualstudio.com/items?itemName=${id}`;
export const repoUrl = (repo) => `https://github.com/${GITHUB_ORG}/${repo}`;
