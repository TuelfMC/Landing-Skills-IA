# dev-project-bootstrapper · Landing page

Sitio estático que presenta la skill `dev-project-bootstrapper` (v1.0.0): un conjunto de instrucciones para un asistente de IA que genera estructuras de proyecto, configuración inicial, `README.md` y comandos de terminal.

## Objetivo
Explicar qué es la skill, cómo funciona y qué stacks cubre, integrando la infografía, el video y el `Skill.md` originales.

## Características
- Navegación por anclas, menú móvil y botón «volver arriba».
- Ejemplo interactivo (Estructura / Comandos / Configuración) con copiado al portapapeles.
- Infografía con modal ampliable, reproductor de video y visor Markdown.
- FAQ con `<details>`, línea de tiempo y soporte de `prefers-reduced-motion`.

## Tecnologías
HTML5, CSS3, JavaScript ES6+ (sin build). CDN: Bootstrap 5.3.3 (navbar, scrollspy, pestañas, modal, acordeón, toast), Bootstrap Icons 1.11.3, Google Fonts, Marked.js 12.0.2 y DOMPurify 3.1.6.

## Estructura
```text
dev-project-bootstrapper-landing/
├── index.html
├── README.md
├── .gitignore
└── assets/
    ├── css/styles.css
    ├── js/main.js
    ├── images/infografia.png
    ├── videos/explicacion.mp4
    └── docs/Skill.md
```

## Requisitos
Un navegador moderno. Para el visor Markdown, un servidor estático local (`fetch()` no funciona con `file://`).

## Ejecutar localmente
```bash
cd dev-project-bootstrapper-landing
python -m http.server 8000
# abre http://localhost:8000
```
Abrir `index.html` directamente funciona, salvo el visor Markdown.

## Reemplazar recursos
- **Infografía:** sustituye `assets/images/infografia.png` (mismo nombre) o cambia la ruta en `index.html`.
- **Video:** reemplaza `assets/videos/explicacion.mp4`, o edita `VIDEO_SRC` en `assets/js/main.js` (ruta MP4 o URL de YouTube; vacío muestra un estado vacío).
- **Skill.md:** sustituye `assets/docs/Skill.md`.

## Publicar
Sube la carpeta a cualquier hosting estático (GitHub Pages, Netlify, Cloudflare Pages…); no requiere compilación.

## Limitaciones conocidas
- Marked.js, DOMPurify y las fuentes se cargan por CDN: sin conexión el visor Markdown no funciona y se usan fuentes del sistema.
- Google Drive / Flow no están soportados directamente; usa MP4 local o YouTube.
- No se ha ejecutado una prueba en navegador de esta versión.

## Créditos
Contenido basado en el `Skill.md` original; infografía y video proporcionados por el autor del proyecto. Fuentes: Manrope y JetBrains Mono (Google Fonts).
