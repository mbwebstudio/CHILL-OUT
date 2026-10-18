// Chill Out Resto — opening hours, "open now" status, mobile menu and WhatsApp chooser.

// Opening hours per location, by day (0 = Sunday). Each range is [open, close] in "HH:MM".
// Taken from Google Maps; update here when they change.
const HORARIOS = {
  puerto: {
    0: [['10:00', '23:30']],
    1: [['11:00', '20:00']],
    2: [['11:00', '19:00']],
    3: [['11:00', '19:00']],
    4: [['11:00', '19:00']],
    5: [['10:00', '23:30']],
    6: [['10:00', '23:30']],
  },
  barra: Object.fromEntries([0, 1, 2, 3, 4, 5, 6].map((d) => [d, [['11:00', '17:00'], ['19:00', '24:00']]])),
};
const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const ORDEN = [1, 2, 3, 4, 5, 6, 0]; // show Monday first

// Current day and minutes in Uruguay, whatever the visitor's timezone.
function ahoraUruguay() {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Montevideo', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { dia, min: Number(get('hour')) * 60 + Number(get('minute')) };
}
const aMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
const fmt = (hhmm) => hhmm.replace(/^0/, '');

function estado(local) {
  const { dia, min } = ahoraUruguay();
  const hoy = HORARIOS[local][dia] || [];
  const abierto = hoy.find(([a, c]) => min >= aMin(a) && min < aMin(c));
  if (abierto) return { abierto: true, texto: `abierto ahora, hasta las ${fmt(abierto[1])}` };
  const proximo = hoy.find(([a]) => aMin(a) > min);
  if (proximo) return { abierto: false, texto: `cerrado, abre hoy a las ${fmt(proximo[0])}` };
  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7, rangos = HORARIOS[local][d];
    if (rangos && rangos.length) return { abierto: false, texto: `cerrado, abre ${i === 1 ? 'mañana' : 'el ' + DIAS[d].toLowerCase()} a las ${fmt(rangos[0][0])}` };
  }
  return { abierto: false, texto: 'cerrado' };
}

function pintarEstados() {
  document.querySelectorAll('[data-status]').forEach((li) => {
    const e = estado(li.dataset.status);
    li.classList.toggle('is-open', e.abierto);
    li.classList.toggle('is-closed', !e.abierto);
    li.querySelector('.status-text').textContent = e.texto;
  });
}

function pintarHorarios() {
  const { dia } = ahoraUruguay();
  document.querySelectorAll('[data-local]').forEach((card) => {
    const tabla = card.querySelector('.horario');
    tabla.innerHTML = ORDEN.map((d) => {
      const rangos = HORARIOS[card.dataset.local][d] || [];
      const txt = rangos.length ? rangos.map(([a, c]) => `${fmt(a)} a ${fmt(c)}`).join(' y ') : 'Cerrado';
      return `<tr${d === dia ? ' class="today"' : ''}><th scope="row">${DIAS[d]}${d === dia ? ' (hoy)' : ''}</th><td>${txt}</td></tr>`;
    }).join('');
  });
}

// Mobile menu
const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
nav.addEventListener('click', (e) => {
  if (e.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
});

// Floating WhatsApp: choose the location
const waBtn = document.getElementById('wa-btn');
const waMenu = document.getElementById('wa-menu');
waBtn.addEventListener('click', () => {
  waMenu.hidden = !waMenu.hidden;
  waBtn.setAttribute('aria-expanded', !waMenu.hidden);
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.wa-float')) { waMenu.hidden = true; waBtn.setAttribute('aria-expanded', 'false'); }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') waMenu.hidden = true; });

document.getElementById('year').textContent = new Date().getFullYear();
pintarHorarios();
pintarEstados();
setInterval(pintarEstados, 60000);
