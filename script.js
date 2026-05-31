/* ── Navbar + Progress Bar ── */
const nav = document.getElementById('nav');
const prog = document.getElementById('prog');

const onScroll = () => {
  nav.classList.toggle('solid', scrollY > 20);
  if (prog) prog.style.width = (scrollY / (document.body.scrollHeight - innerHeight) * 100) + '%';
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Hamburger ── */
document.getElementById('hbg').addEventListener('click', () =>
  document.getElementById('nl').classList.toggle('open'));
document.querySelectorAll('#nl a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('nl').classList.remove('open')));

/* ── Custom cursor ── */
const cd = document.getElementById('cd');
const cr = document.getElementById('cr');
let mx = -100, my = -100, rx = -100, ry = -100;

addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function loop() {
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  cd.style.left = mx + 'px'; cd.style.top = my + 'px';
  cr.style.left = rx + 'px'; cr.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a, button, .materia-item, .plano, .depo, .faq-q, .sobre-item').forEach(el => {
  el.addEventListener('mouseenter', () => cr.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cr.classList.remove('hovered'));
});
addEventListener('mousedown', () => cr.classList.add('clicking'));
addEventListener('mouseup',   () => cr.classList.remove('clicking'));

/* ── Reveal on scroll ── */
const ro = new IntersectionObserver(es =>
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); ro.unobserve(e.target); } }),
  { threshold: 0.1 });
document.querySelectorAll('[data-r]').forEach(el => ro.observe(el));

/* ── Animated counters ── */
function animCount(el, target, duration) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statsObserver = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  statsObserver.unobserve(e.target);
  const items = e.target.querySelectorAll('.stat-item strong');
  const data = [{ v: 3, d: 1200 }, { v: 2024, d: 1800 }];
  items.forEach((el, i) => { if (data[i]) animCount(el, data[i].v, data[i].d); });
}), { threshold: 0.5 });
const statRow = document.querySelector('.stat-row');
if (statRow) statsObserver.observe(statRow);

/* ── Tilt 3D (hero card) ── */
const card = document.getElementById('heroCard');
if (card) {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
  });
}

/* ── Magnetic buttons ── */
document.querySelectorAll('.mag').forEach(wrap => {
  const btn = wrap.querySelector('.btn');
  if (!btn) return;
  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * .35;
    const y = (e.clientY - r.top  - r.height / 2) * .35;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  wrap.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
});

/* ── FAQ ── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const it = btn.parentElement, open = it.classList.contains('open');
    document.querySelectorAll('.faq-it').forEach(i => i.classList.remove('open'));
    if (!open) it.classList.add('open');
  });
});

/* ── Form ── */
document.getElementById('f').addEventListener('submit', e => {
  e.preventDefault();
  e.target.style.display = 'none';
  document.getElementById('ok').style.display = 'block';
});
