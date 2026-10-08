'use strict';
/* ===== Configuración ===== */
// Fuente del video: ruta local MP4 o URL de YouTube (https://www.youtube.com/watch?v=ID). Vacío = estado vacío.
const VIDEO_SRC = 'assets/videos/explicacion.mp4';
const MD_PATH = 'assets/docs/Skill.md';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ===== Copiar comandos ===== */
async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  const ok = document.execCommand('copy');
  ta.remove();
  if (!ok) throw new Error('copy failed');
}
function initCopy() {
  const el = $('#copy-toast');
  const toast = el && window.bootstrap ? bootstrap.Toast.getOrCreateInstance(el, { delay: 2200 }) : null;
  $$('.copy').forEach(b => b.addEventListener('click', async () => {
    const src = $(b.dataset.copy);
    if (!src) return;
    try { await copyText(src.textContent); toast?.show(); } catch { /* sin confirmación si falla */ }
  }));
}

/* ===== Video ===== */
function initVideo() {
  const box = $('#video-box');
  if (!box) return;
  const yt = VIDEO_SRC.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  if (!VIDEO_SRC) {
    box.innerHTML = '<div class="empty">Tu video explicativo aparecerá aquí cuando esté disponible</div>';
  } else if (yt) {
    const f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + yt[1];
    f.title = 'Video explicativo de dev-project-bootstrapper';
    f.allowFullscreen = true; f.loading = 'lazy';
    f.style.cssText = 'width:100%;aspect-ratio:16/9;border:0;border-radius:12px';
    box.appendChild(f);
  } else {
    const v = document.createElement('video');
    v.controls = true; v.preload = 'metadata'; v.src = VIDEO_SRC;
    v.setAttribute('aria-label', 'Video explicativo de dev-project-bootstrapper');
    v.addEventListener('error', () => {
      box.innerHTML = '<div class="err">No se pudo cargar el video. Comprueba que existe ' + VIDEO_SRC.replace(/[<>&"]/g, '') + '.</div>';
    });
    box.appendChild(v);
  }
  $('[data-scroll-video]')?.addEventListener('click', () => {
    $('#video').scrollIntoView();
    $('video', box)?.focus();
  });
}

/* ===== Visor Markdown (Marked + DOMPurify) ===== */
function initMarkdown() {
  const btn = $('#read-md'), view = $('#md-view');
  if (!btn || !view) return;
  let loaded = false;
  const fail = txt => { $('.spinner-border', btn)?.classList.add('d-none'); view.className = 'md err'; view.textContent = txt; view.hidden = false; };
  btn.addEventListener('click', async () => {
    if (loaded) { view.hidden = !view.hidden; return; }
    if (!window.marked || !window.DOMPurify) return fail('No se cargaron Marked.js / DOMPurify (se necesita conexión). Puedes leer el archivo con «Descargar Skill.md».');
    const sp = $('.spinner-border', btn);
    sp?.classList.remove('d-none');
    try {
      const res = await fetch(MD_PATH);
      if (!res.ok) throw new Error(res.status);
      view.innerHTML = DOMPurify.sanitize(marked.parse(await res.text()));
      view.className = 'md'; view.hidden = false; loaded = true; sp?.classList.add('d-none');
    } catch {
      fail(location.protocol === 'file:'
        ? 'El navegador bloquea fetch() con file://. Ejecuta un servidor estático local (por ejemplo: python -m http.server) y abre http://localhost:8000.'
        : 'No se pudo cargar ' + MD_PATH + '.');
    }
  });
}

/* ===== Línea de tiempo y volver arriba ===== */
function initReveal() {
  const items = $$('.timeline li');
  if (!('IntersectionObserver' in window)) return items.forEach(i => i.classList.add('in'));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .3 });
  items.forEach((i, n) => { i.style.transitionDelay = n * 90 + 'ms'; io.observe(i); });
}
function initTop() {
  const b = $('#top');
  if (!b) return;
  addEventListener('scroll', () => (b.hidden = scrollY < 600), { passive: true });
  b.addEventListener('click', () => scrollTo({ top: 0 }));
}

[initCopy, initVideo, initMarkdown, initReveal, initTop].forEach(f => f());
