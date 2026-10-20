import {
  CATEGORIES, EXTENSIONS, HERO_CODE, HERO_WORDS, KEYBINDINGS, SCREENSHOTS,
  marketplaceUrl, repoUrl, screenshotUrl,
} from './data.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = matchMedia('(hover: hover)').matches;

/** Pequeño helper para crear elementos sin innerHTML. */
function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'dataset') Object.assign(el.dataset, v);
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  el.append(...children.flat().filter((c) => c != null && c !== false));
  return el;
}

/* ---------------------------------------------------------------- Cards */
function renderFilters() {
  const bar = $('#filters');
  const entries = [['all', 'Todas'], ...Object.entries(CATEGORIES)];
  bar.append(...entries.map(([key, label]) =>
    h('button', { type: 'button', 'aria-pressed': String(key === 'all'), dataset: { filter: key } }, label)));

  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const f = btn.dataset.filter;
    $$('button', bar).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    $$('.card').forEach((c) => { c.hidden = f !== 'all' && c.dataset.category !== f; });
  });
}

function renderCards() {
  const grid = $('#grid');
  EXTENSIONS.forEach((ext, i) => {
    const img = h('img', {
      src: screenshotUrl(ext.repo, SCREENSHOTS[0]),
      alt: `Captura de ${ext.name}`, loading: 'lazy', decoding: 'async', width: 1280, height: 720,
    });
    img.addEventListener('error', () => img.remove(), { once: true });

    const card = h('button', {
      type: 'button',
      class: `card reveal${ext.featured ? ' card--featured' : ''}`,
      dataset: { index: i, category: ext.category },
      'aria-haspopup': 'dialog',
      'aria-label': `${ext.name}: ver detalles`,
    },
      h('div', { class: 'shot' }, h('span', { class: 'emoji', 'aria-hidden': 'true' }, ext.emoji), img),
      h('span', { class: 'badge' }, ext.badge),
      h('span', { class: 'version' }, `v${ext.version}`),
      h('div', { class: 'card-body' },
        h('h3', {}, `${ext.emoji} ${ext.name}`),
        h('p', {}, ext.description),
        h('ul', { class: 'tags' }, ext.tags.map((t) => h('li', {}, t))),
        h('span', { class: 'more' }, 'Ver detalles ', h('span', { 'aria-hidden': 'true' }, '→')),
      ),
    );

    card.addEventListener('click', () => openModal(i, card));
    if (canHover && !reducedMotion) {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        if (!ext.featured) {
          card.style.transform =
            `perspective(900px) rotateX(${(y / r.height - 0.5) * -7}deg) rotateY(${(x / r.width - 0.5) * 7}deg) translateY(-4px)`;
        }
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    }
    grid.append(card);
  });
}

/* ---------------------------------------------------------------- Modal */
const modal = $('#modal');
let lastFocus = null;
let slide = 0;
let current = null;

function showSlide(n) {
  slide = (n + SCREENSHOTS.length) % SCREENSHOTS.length;
  const img = $('#modal-img');
  img.hidden = false;
  img.src = screenshotUrl(current.repo, SCREENSHOTS[slide]);
  img.alt = `${current.name} — captura ${slide + 1} de ${SCREENSHOTS.length}`;
  $$('#modal-thumbs button').forEach((b, j) => b.setAttribute('aria-current', String(j === slide)));
}

function openModal(i, trigger) {
  current = EXTENSIONS[i];
  lastFocus = trigger;
  const cmd = `code --install-extension ${current.id}`;

  $('#modal-thumbs').replaceChildren(...SCREENSHOTS.map((file, j) =>
    h('button', { type: 'button', 'aria-label': `Ver captura ${j + 1}`, onclick: () => showSlide(j) },
      h('img', { src: screenshotUrl(current.repo, file), alt: '', loading: 'lazy' }))));

  $('#modal-body').replaceChildren(
    h('span', { class: 'eyebrow' }, `${current.badge} · v${current.version}`),
    h('h3', { id: 'modal-title' }, `${current.emoji} ${current.name}`),
    h('p', {}, current.description),
    h('ul', {}, current.features.map((f) => h('li', {}, f))),
    h('div', { class: 'cmd' }, h('code', {}, cmd), h('button', { type: 'button', class: 'copy', dataset: { copy: cmd } }, 'Copiar')),
    h('div', { class: 'cta' },
      h('a', { class: 'btn btn--primary', href: marketplaceUrl(current.id), target: '_blank', rel: 'noopener' }, 'Instalar desde el Marketplace ↗'),
      h('a', { class: 'btn', href: repoUrl(current.repo), target: '_blank', rel: 'noopener' }, 'Ver en GitHub')),
  );

  showSlide(0);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  $('#modal-close').focus();
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lastFocus?.focus();
}

function initModal() {
  $('#modal-img').addEventListener('error', (e) => { e.target.hidden = true; });
  $('#modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    else if (e.key === 'ArrowRight') showSlide(slide + 1);
    else if (e.key === 'ArrowLeft') showSlide(slide - 1);
    else if (e.key === 'Tab') {
      const focusables = $$('button, a[href]', modal).filter((el) => !el.hidden);
      const first = focusables[0];
      const last = focusables.at(-1);
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

/* ---------------------------------------------------------------- Copy */
function initCopy() {
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = '¡Copiado! ✓';
      confetti(e.clientX, e.clientY);
    } catch {
      btn.textContent = 'Copialo a mano';
    }
    setTimeout(() => { btn.textContent = 'Copiar'; }, 1800);
  });
}

/* ---------------------------------------------------------------- Keybindings demo */
function initKeys() {
  const list = $('#keys');
  const items = KEYBINDINGS.map((k) =>
    h('li', { class: 'key' }, h('span', {}, k.label), h('kbd', {}, k.keys)));
  list.append(...items);

  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('is-open')) return;
    if (e.target.closest('input, textarea, [contenteditable]')) return;
    KEYBINDINGS.forEach((k, i) => {
      if (!k.match(e)) return;
      e.preventDefault();
      items[i].classList.add('is-hit');
      setTimeout(() => items[i].classList.remove('is-hit'), 600);
    });
  });
}

/* ---------------------------------------------------------------- Hero */
async function typeCode() {
  const box = $('#code');
  const cursor = h('span', { class: 'cursor' });
  const toast = $('#toast');

  for (;;) {
    box.replaceChildren();
    for (const [n, parts] of HERO_CODE.entries()) {
      const line = h('div', {}, h('span', { class: 'ln' }, String(n + 1)));
      box.append(line);
      for (let p = 0; p < parts.length; p += 2) {
        const span = h('span', { class: parts[p] || null });
        line.append(span, cursor);
        for (const ch of parts[p + 1] ?? '') {
          span.textContent += ch;
          if (!reducedMotion) await sleep(22 + Math.random() * 30);
        }
      }
    }
    if (reducedMotion) return;
    toast.classList.add('is-on');
    await sleep(3200);
    toast.classList.remove('is-on');
    await sleep(900);
  }
}

function rotateWords() {
  if (reducedMotion) return;
  const el = $('#rotator');
  let i = 0;
  setInterval(() => {
    if (document.hidden) return;
    el.style.opacity = 0;
    setTimeout(() => { i = (i + 1) % HERO_WORDS.length; el.textContent = HERO_WORDS[i]; el.style.opacity = 1; }, 300);
  }, 2600);
}

/* ---------------------------------------------------------------- Reveal + counters */
function animateCounter(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix ?? '';
  if (reducedMotion) { el.textContent = target + suffix; return; }
  let start;
  const step = (t) => {
    start ??= t;
    const p = Math.min((t - start) / 1400, 1);
    el.textContent = Math.round(target * (1 - (1 - p) ** 3)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initReveal() {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      $$('[data-count]', entry.target).forEach(animateCounter);
      io.unobserve(entry.target);
    }
  }, { threshold: 0.12 });
  $$('.reveal').forEach((el) => io.observe(el));
}

/* ---------------------------------------------------------------- Background */
function initGlow() {
  if (!canHover || reducedMotion) return;
  const glow = $('#glow');
  addEventListener('pointermove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

function initStars() {
  if (reducedMotion) return;
  const canvas = $('#stars');
  const ctx = canvas.getContext('2d');
  let w; let hgt; let stars;
  const resize = () => {
    w = canvas.width = innerWidth;
    hgt = canvas.height = innerHeight;
    stars = Array.from({ length: Math.min(160, Math.floor(w / 8)) }, () => ({
      x: Math.random() * w, y: Math.random() * hgt,
      r: Math.random() * 1.3 + 0.2, v: Math.random() * 0.25 + 0.05, o: Math.random(),
    }));
  };
  resize();
  addEventListener('resize', resize, { passive: true });
  (function frame() {
    if (!document.hidden) {
      ctx.clearRect(0, 0, w, hgt);
      ctx.fillStyle = '#fff';
      for (const s of stars) {
        s.y -= s.v;
        if (s.y < 0) { s.y = hgt; s.x = Math.random() * w; }
        s.o = Math.max(0.1, Math.min(0.9, s.o + (Math.random() - 0.5) * 0.05));
        ctx.globalAlpha = s.o;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    requestAnimationFrame(frame);
  })();
}

function confetti(cx, cy) {
  if (reducedMotion) return;
  const canvas = $('#confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const colors = ['#7c5cff', '#22d3ee', '#f472b6', '#4ade80', '#facc15'];
  const parts = Array.from({ length: 70 }, () => ({
    x: cx, y: cy, vx: (Math.random() - 0.5) * 12, vy: Math.random() * -11 - 3,
    s: Math.random() * 6 + 3, c: colors[Math.floor(Math.random() * colors.length)], r: Math.random() * 6, life: 1,
  }));
  (function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of parts) {
      p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.r += 0.1; p.life -= 0.012;
      if (p.life <= 0) continue;
      alive = true;
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
      ctx.restore();
    }
    if (alive) requestAnimationFrame(frame);
  })();
}

/* Easter egg: código Konami */
function initKonami() {
  const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let pos = 0;
  addEventListener('keydown', (e) => {
    pos = e.key === seq[pos] ? pos + 1 : (e.key === seq[0] ? 1 : 0);
    if (pos < seq.length) return;
    pos = 0;
    for (let i = 0; i < 5; i++) setTimeout(() => confetti(Math.random() * innerWidth, innerHeight * 0.4), i * 200);
  });
}

/* ---------------------------------------------------------------- Boot */
document.documentElement.classList.remove('no-js');
renderFilters();
renderCards();
initModal();
initCopy();
initKeys();
initReveal();
initGlow();
initStars();
initKonami();
rotateWords();
typeCode();
$('#year').textContent = new Date().getFullYear();
