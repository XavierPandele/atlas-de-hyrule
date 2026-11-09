/* Atlas de Hyrule — lógica.
   Hyrule es un único lienzo grande (WORLD) con las zonas colocadas como láminas; las mazmorras se abren aparte, por pisos.
   Al pulsar un marcador se abre una ficha con la captura del sitio exacto. */
(() => {
  'use strict';

  const KEY = 'atlas-hyrule-oot-remake-v1', UIKEY = 'atlas-hyrule-ui-v1';
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

  const ZI = {}; ZONES.forEach(z => { ZI[z.id] = z; });
  const II = {}; ITEMS.forEach(i => { II[i.id] = i; });

  /* ── lo que se guarda en el navegador ── */
  const ls = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento: seguimos sin guardar */ } }
  };

  const CW = 1.04;   // ancho medio de letra de Sofia Sans frente a la estimación de las etiquetas

  /* Los seis dominios de los sabios ordenan la guía: cada zona y su mazmorra comparten color */
  const REGIONS = [
    { id: 'luz', name: 'El centro de Hyrule', z: ['field', 'lonlon', 'market', 'castle', 'ganon'] },
    { id: 'bosque', name: 'El bosque', z: ['kokiri', 'deku', 'lostwoods', 'sfm', 'forest'] },
    { id: 'sombra', name: 'Kakariko', z: ['kakariko', 'well', 'graveyard', 'shadow'] },
    { id: 'fuego', name: 'La Montaña de la Muerte', z: ['dmt', 'dodongo', 'goron', 'dmc', 'fire'] },
    { id: 'agua', name: 'Los zora y el lago', z: ['zriver', 'zdomain', 'zfountain', 'jabu', 'ice', 'lake', 'water'] },
    { id: 'espiritu', name: 'El desierto gerudo', z: ['gvalley', 'gfortress', 'gtg', 'wasteland', 'colossus', 'spirit'] }
  ];
  const ZREG = {};
  REGIONS.forEach(r => r.z.forEach(id => { ZREG[id] = r.id; }));

  const uiSaved = ls.get(UIKEY, null);
  const S = {
    view: 'world', floor: null, focus: null, sel: null, age: 'x', night: false,
    show: { gs: true, hp: true, bn: true }, hideDone: false, q: '',
    done: new Set(ls.get(KEY, [])), panel: uiSaved ? !!uiSaved.panel : window.innerWidth >= 1100
  };

  /* ── intérprete del mini-lenguaje de mapas ── */
  function label(x, y, text, cls, extra) {
    const parts = text.split('|');
    const y0 = y - (parts.length - 1) * 8;
    return `<text class="${cls}" x="${x}" y="${y0}"${extra || ''}>` +
      parts.map((p, i) => `<tspan x="${x}" dy="${i ? 18 : 0}">${esc(p)}</tspan>`).join('') + '</text>';
  }

  /* Relieve: las formas que sobresalen (tierra, roca, edificios, salas) llevan una sombra debajo;
     el agua y la lava quedan hundidas y no la llevan. Los edificios, más altos, la llevan mayor. */
  const RAISED = { gr: 1, g2: 1, pa: 1, rk: 1, r2: 1, sd: 1, s2: 1, ic: 1, fl: 1, f2: 1, bd: 2, rb: 2, st: 2, wd: 2 };
  const relief = (cls, tag, geo) => (RAISED[cls] ? `<${tag} class="shd${RAISED[cls] > 1 ? ' alto' : ''}" ${geo}/>` : '') + `<${tag} class="${cls} sh" ${geo}/>`;

  function parse(dsl, W, H) {
    const shapes = [], labels = [], marks = [], exits = [];
    dsl.split('\n').forEach(raw => {
      const line = raw.trim();
      if (!line) return;
      const a = line.split(/\s+/), c = a[0];
      const rest = n => a.slice(n).join(' ');
      if (c === 'B') shapes.push(`<rect class="${a[1]} bg" width="${W}" height="${H}"/>`);
      else if (c === 'P') shapes.push(relief(a[1], 'path', `d="${rest(2)}"`));
      else if (c === 'W') {
        const w = +a[2], d = rest(3);
        shapes.push(`<path class="ln-edge" stroke-width="${w + 3}" d="${d}"/><path class="ln ${a[1]}" stroke-width="${w}" d="${d}"/>`);
      }
      else if (c === 'R') {
        const [x, y, w, h] = a.slice(2, 6).map(Number);
        shapes.push(relief(a[1], 'rect', `x="${x}" y="${y}" width="${w}" height="${h}" rx="6"`));
        if (a.length > 6) labels.push(label(x + w / 2, y + h / 2 + 5, rest(6), 'rl'));
      }
      else if (c === 'E') {
        const [x, y, rx, ry] = a.slice(2, 6).map(Number);
        shapes.push(relief(a[1], 'ellipse', `cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"`));
        if (a.length > 6) labels.push(label(x, y + 5, rest(6), 'rl'));
      }
      else if (c === 'I') shapes.push(`<use href="#i-${a[1]}" transform="translate(${a[2]} ${a[3]}) scale(${a[4] || 1.25})"/>`);
      else if (c === 'L') labels.push(label(+a[1], +a[2], rest(3), 'lb'));
      else if (c === 'l') labels.push(label(+a[1], +a[2], rest(3), 'ls'));
      else if (c === 'n') labels.push(label(+a[1], +a[2], rest(3), 'ld'));
      else if (c === 'T') labels.push(label(+a[2], +a[3], rest(4), 'ttl', ` font-size="${a[1]}"`));
      else if (c === 'X') exits.push({ x: +a[1], y: +a[2], to: a[3], text: rest(4) });
      else if (c === 'M') marks.push({ id: a[1], x: +a[2], y: +a[3] });
      else console.warn('Orden de mapa desconocida:', line);
    });
    return { W, H, html: shapes.join('') + labels.join(''), marks, exits };
  }

  const PARSED = {};
  const mkey = (z, f) => (f ? z + '|' + f : z);
  Object.keys(MAPS).forEach(zid => {
    const m = MAPS[zid], [W, H] = m.vb;
    const reg = (floor, dsl) => {
      const p = parse(dsl, W, H);
      PARSED[mkey(zid, floor)] = p;
      p.marks.forEach(mk => {
        const it = II[mk.id];
        if (!it) return console.warn('Marcador sin datos:', mk.id);
        if (it.zone) console.warn('Marcador repetido:', mk.id);
        it.zone = zid; it.floor = floor; it.x = mk.x; it.y = mk.y;
      });
    };
    if (m.floors) Object.keys(m.floors).forEach(f => reg(f, m.floors[f])); else reg(null, m.d);
  });
  ITEMS.forEach(i => { if (!i.zone) console.warn('Sin posición en el mapa:', i.id); });

  /* ── el gran mapa: posición de cada lámina ── */
  const PL = {};
  Object.keys(WORLD.plates).forEach(id => {
    const p = WORLD.plates[id], s = p[2] || 1;
    PL[id] = { id, s, x: WORLD.margin + p[0] * WORLD.pitch[0] + (p[3] || 0), y: WORLD.margin + p[1] * WORLD.pitch[1] + (p[4] || 0), w: 1000 * s, h: 700 * s };
  });
  Object.keys(WORLD.inset).forEach(id => {
    const n = WORLD.inset[id], h = PL[n.host];
    PL[id] = { id, s: n.s, inset: true, x: h.x + n.at[0] * h.s - n.center[0] * n.s, y: h.y + n.at[1] * h.s - n.center[1] * n.s, w: 1000 * n.s, h: 700 * n.s };
  });
  const isOver = zid => !!PL[zid];
  const toWorld = (zid, x, y) => [PL[zid].x + x * PL[zid].s, PL[zid].y + y * PL[zid].s];
  ITEMS.forEach(it => { if (isOver(it.zone)) [it.wx, it.wy] = toWorld(it.zone, it.x, it.y); });
  /* por dónde se entra a cada mazmorra */
  const DOOR = {};
  Object.keys(PL).forEach(zid => PARSED[zid].exits.forEach(e => {
    if (ZI[e.to] && ZI[e.to].kind === 'dun') { const [x, y] = toWorld(zid, e.x, e.y); DOOR[e.to] = { zone: zid, x, y }; }
  }));

  /* ── capturas: copia local (capturas/<id>.jpg) si la hay; si no, enlazada desde su origen ── */
  let localShots = false;
  const shot = (id, w) => (localShots || !SHOTS[id]) ? `capturas/${id}.jpg` : `${SHOT_BASE}${SHOTS[id]}?q=70&fit=crop&w=${w || 760}&dpr=1`;

  /* ── filtros y recuentos ── */
  const ageOk = it => S.age === 'x' || it.age === 'x' || it.age === S.age;
  const matches = it => {
    if (!S.q) return true;
    const hay = norm([it.title, it.desc, it.remake, ZI[it.zone].name, it.req.map(r => REQ[r]).join(' '), it.night ? 'noche' : '',
      { gs: 'skulltula', hp: 'corazon pieza', bn: 'judia magica plantar' }[it.t]].join(' '));
    return norm(S.q).split(/\s+/).every(w => hay.includes(w));
  };
  const visible = it => S.show[it.t] && ageOk(it) && !(S.hideDone && S.done.has(it.id)) && matches(it);
  /* los recuentos de zona cuentan coleccionables; las judías son una tarea aparte */
  const zoneItems = (zid, floor) => ITEMS.filter(i => i.t !== 'bn' && i.zone === zid && (floor == null || i.floor === floor) && S.show[i.t]);
  const tally = list => ({ n: list.length, d: list.filter(i => S.done.has(i.id)).length });

  /* ── vista: encuadre, zoom y vuelo ── */
  const svg = $('#map'), stage = $('#stage'), pop = $('#pop');
  let base = { w: WORLD.w, h: WORLD.h }, V = { x: 0, y: 0, w: WORLD.w, h: WORLD.h }, RW = 1, RH = 1, RL = 0, RT = 0;
  const measure = () => { const r = svg.getBoundingClientRect(); RW = r.width || 1; RH = r.height || 1; RL = r.left; RT = r.top; };
  const zoomPx = () => RW / V.w;
  function frame(x, y, w, h, pad) {
    const a = RW / RH; let vw = w * (1 + pad), vh = h * (1 + pad);
    if (vw / vh < a) vw = vh * a; else vh = vw / a;
    return { x: x + w / 2 - vw / 2, y: y + h / 2 - vh / 2, w: vw, h: vh };
  }
  const home = () => frame(0, 0, base.w, base.h, S.view === 'world' ? 0.02 : 0.16);
  const minW = () => (S.view === 'world' ? 460 : 320);
  function fix(v) {
    const hm = home();
    if (v.w >= hm.w) return hm;
    const w = Math.max(v.w, minW()), h = w * RH / RW;
    const cx = clamp(v.x + v.w / 2, 0, base.w), cy = clamp(v.y + v.h / 2, 0, base.h);
    return { x: cx - w / 2, y: cy - h / 2, w, h };
  }
  let focusT = 0;
  function setV(v, quiet) {
    V = v;
    svg.setAttribute('viewBox', `${V.x} ${V.y} ${V.w} ${V.h}`);
    rescale(); placePop();
    if (!quiet) { clearTimeout(focusT); focusT = setTimeout(detectFocus, 140); }
  }
  const toSvg = (cx, cy) => ({ x: V.x + (cx - RL) / RW * V.w, y: V.y + (cy - RT) / RH * V.h });
  function zoomAt(f, px, py) {
    const nw = clamp(V.w * f, minW(), home().w), k = nw / V.w;
    if (k === 1) return;
    setV(fix({ x: px - (px - V.x) * k, y: py - (py - V.y) * k, w: nw, h: V.h * k }));
  }
  let flyId = 0;
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  function fly(to, ms) {
    to = fix(to);
    const id = ++flyId, from = V; let t0 = null;
    if (calm.matches || !ms || document.hidden) return setV(to);
    const c0 = [from.x + from.w / 2, from.y + from.h / 2], c1 = [to.x + to.w / 2, to.y + to.h / 2];
    const step = now => {
      if (id !== flyId) return;
      if (t0 === null) t0 = now;
      const t = Math.min((now - t0) / ms, 1), e = t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const w = from.w * Math.pow(to.w / from.w, e), h = w * RH / RW;
      const cx = c0[0] + (c1[0] - c0[0]) * e, cy = c0[1] + (c1[1] - c0[1]) * e;
      setV({ x: cx - w / 2, y: cy - h / 2, w, h }, t < 1);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  /* encuadre de una lámina, algo baja para que el rótulo de arriba no la tape */
  const plateFrame = zid => { const p = PL[zid], f = frame(p.x, p.y, p.w, p.h, 0.2); f.y -= f.h * .045; return f; };

  /* marcadores y etiquetas mantienen un tamaño cómodo en pantalla a cualquier zoom */
  function rescale() {
    const z = zoomPx();
    /* las etiquetas de zona nunca son más anchas que su lámina en pantalla */
    const m = clamp(.66 + (z - .3) * 1.1, .66, 1.3) / z, p = clamp(z * 1120 / (200 * CW), .6, 1.05) / z;
    const marks = $('#marks'); if (!marks) return;
    for (const g of marks.children) {
      if (g.dataset.x) g.setAttribute('transform', `translate(${g.dataset.x} ${g.dataset.y}) scale(${g.classList.contains('mk') ? m : p})`);
    }
    svg.classList.toggle('far', z < .3);
    svg.classList.toggle('tiny', z < .1);
  }

  /* ── dibujo ── */
  function exitHTML(e, W, s) {
    s = s || 1;
    const w = e.text.length * 7.3 * CW + 34;
    const x = clamp(e.x - w / s / 2, 6, W - w / s - 6);
    return `<g class="exit" data-go="${e.to}" tabindex="0" role="link" aria-label="Ir a ${esc(e.text)}" transform="translate(${x} ${e.y - 13 / s}) scale(${1 / s})">` +
      `<rect width="${w}" height="26" rx="13"/><path d="M11 7l7 6-7 6z"/><text x="${w / 2 + 7}" y="17.5">${esc(e.text)}</text></g>`;
  }

  function badge(z, x, y) {
    const t = tally(zoneItems(z.id)), dun = z.kind === 'dun';
    const cnt = t.n ? `${t.d}/${t.n}` : '';
    const cw = (dun ? 6.5 : 7.3) * CW, hh = dun ? 24 : 28;
    const w = (z.short.length + (cnt ? cnt.length + 1 : 0)) * cw + (dun ? 34 : 40);
    const cls = ['zb', dun ? 'dun' : 'over', 'reg-' + ZREG[z.id], t.n && t.d === t.n ? 'full' : ''].join(' ');
    return `<g class="${cls}" data-go="${z.id}" data-x="${x}" data-y="${y}" tabindex="0" role="link" aria-label="${esc(z.name)}${t.n ? `: ${t.d} de ${t.n}` : ''}">` +
      `<g transform="translate(${-w / 2} ${-hh / 2})"><rect width="${w}" height="${hh}" rx="${dun ? 5 : 14}"/>` + (dun ? '<path d="M13 5l6 7-6 7-6-7z"/>' : '<circle class="dot" cx="16" cy="14" r="5.5"/>') +
      `<text x="${dun ? 24 : 28}" y="${dun ? 17 : 19.5}">${esc(z.short)}${cnt ? ` <tspan class="zc">${cnt}</tspan>` : ''}</text></g></g>`;
  }

  function markHTML(it, x, y) {
    if (!visible(it) && S.sel !== it.id) return '';
    const done = S.done.has(it.id);
    const cls = ['mk', it.t, done ? 'done' : '', it.night ? 'nt' : '', S.sel === it.id ? 'sel' : ''].join(' ');
    const what = KIND[it.t], needs = it.req.map(r => REQ[r]).join(', ');
    return `<g class="${cls}" data-id="${it.id}" data-x="${x}" data-y="${y}" tabindex="0" role="button" aria-label="${what} ${it.n}: ${esc(it.title)}">` +
      `<title>${what} ${it.n}: ${esc(it.title)}. Necesitas: ${needs || 'ningún objeto'}</title>` +
      `<circle class="ring" r="19"/><use class="body" href="#m-${it.t}"/>` +
      (it.night ? '<use href="#m-moon" x="11" y="-11"/>' : '') + (done ? '<use href="#m-ok" x="-11" y="-11"/>' : '') +
      `<text class="mkn" y="27">${it.n}</text></g>`;
  }

  let worldCache = '';
  function worldHTML() {
    if (worldCache) return worldCache;
    const W = WORLD.w, H = WORLD.h, c = id => [PL[id].x + PL[id].w / 2, PL[id].y + PL[id].h / 2];
    const link = (pairs, cls, w) => pairs.map(([a, b]) => {
      const A = c(a), B = c(b), d = `M${A[0]},${A[1]} L${B[0]},${B[1]}`;
      return `<path class="ln-edge" stroke-width="${w + 12}" d="${d}"/><path class="ln ${cls}" stroke-width="${w}" d="${d}"/>`;
    }).join('');
    const plate = id => {
      const p = PL[id], m = PARSED[id];
      const exits = m.exits.filter(e => ZI[e.to].kind !== 'dun').map(e => exitHTML(e, m.W, p.s)).join('');
      const shape = p.inset ? '<ellipse class="frame" cx="500" cy="390" rx="448" ry="308"/>'
        : '<rect class="frame" width="1000" height="700" rx="46"/><rect class="frame-in" x="9" y="9" width="982" height="682" rx="38"/>';
      return `<g class="plate reg-${ZREG[id]}" data-zone="${id}" transform="translate(${p.x} ${p.y}) scale(${p.s})">` +
        (p.inset ? '' : '<rect class="plate-sh" x="12" y="16" width="1000" height="700" rx="46"/>') +
        `<g clip-path="url(#cp-${p.inset ? 'ranch' : 'plate'})">${m.html}${exits}</g>${shape}</g>`;
    };
    const ids = Object.keys(PL).filter(id => !PL[id].inset).concat(Object.keys(PL).filter(id => PL[id].inset));
    worldCache = '<defs><clipPath id="cp-plate"><rect width="1000" height="700" rx="46"/></clipPath>' +
      '<clipPath id="cp-ranch"><ellipse cx="500" cy="390" rx="448" ry="308"/></clipPath></defs>' +
      `<g class="base"><rect class="gr bg" x="${-2 * W}" y="${-2 * H}" width="${5 * W}" height="${5 * H}"/>` +
      parse(WORLD.base, W, H).html + link(WORLD.rivers, 'wt', 84) + link(WORLD.roads, 'pa', 44) + '</g>' +
      `<g class="plates">${ids.map(plate).join('')}</g><g id="marks"></g>`;
    return worldCache;
  }

  function renderMarks() {
    let h = '';
    if (S.view === 'world') {
      Object.keys(DOOR).forEach(d => { h += badge(ZI[d], DOOR[d].x, DOOR[d].y); });
      Object.keys(PL).forEach(zid => { const p = PL[zid]; h += badge(ZI[zid], p.x + p.w / 2, p.inset ? p.y + 82 * p.s : p.y); });
      ITEMS.forEach(it => { if (it.wx != null) h += markHTML(it, it.wx, it.wy); });
    } else {
      PARSED[mkey(S.view, S.floor)].marks.forEach(m => { h += markHTML(II[m.id], m.x, m.y); });
    }
    $('#marks').innerHTML = h;
    rescale();
  }

  function renderMap() {
    const world = S.view === 'world';
    stage.className = world ? '' : 'dun reg-' + ZREG[S.view];
    if (world) {
      base = { w: WORLD.w, h: WORLD.h };
      svg.innerHTML = worldHTML();
    } else {
      const p = PARSED[mkey(S.view, S.floor)];
      base = { w: p.W, h: p.H };
      svg.innerHTML = `<g>${p.html}</g><g>${p.exits.map(e => exitHTML(e, p.W)).join('')}</g><g id="marks"></g>`;
    }
    renderMarks(); markFocus();
  }
  function markFocus() {
    svg.querySelectorAll('.plate').forEach(g => g.classList.toggle('focus', g.dataset.zone === S.focus));
  }

  /* ── rótulo flotante sobre el mapa: dónde estás y, en las mazmorras, los pisos ── */
  function renderHead() {
    const world = S.view === 'world';
    const z = ZI[world ? (S.focus || 'world') : S.view];
    const where = $('.where');
    where.hidden = world && (!S.focus || S.panel);   // con la guía abierta, el nombre de la zona ya está en ella
    where.className = 'where reg-' + (ZREG[z.id] || 'luz');
    $('#z-name').textContent = z.name;
    $('#back').hidden = false;
    document.title = (z.id === 'world' ? '' : z.name + ' · ') + 'Atlas de Hyrule';
    $('#back-txt').textContent = world ? 'Todo Hyrule' : ZI[DOOR[S.view].zone].name;
    $('#floors').innerHTML = (!world && z.floors.length > 1) ? z.floors.map(f => {
      const t = tally(zoneItems(z.id, f));
      return `<button role="tab" data-floor="${f}" aria-selected="${f === S.floor}" title="${t.n ? `${t.d} de ${t.n} en este piso` : 'Sin coleccionables en este piso'}">${f}` +
        (t.n ? `<span class="dot">${t.n - t.d || '✓'}</span>` : '') + '</button>';
    }).join('') : '';
  }

  function renderTally() {
    ['gs', 'hp', 'bn'].forEach(t => {
      const all = ITEMS.filter(i => i.t === t), d = all.filter(i => S.done.has(i.id)).length;
      $('#t-' + t).textContent = d;
      $('#b-' + t).style.width = (100 * d / all.length) + '%';
    });
  }

  /* ── ficha emergente ── */
  const KIND = { gs: 'Skulltula dorada', hp: 'Pieza de corazón', bn: 'Judía mágica' };
  const AGE = { c: ['child', 'Niño'], a: ['adult', 'Adulto'], x: ['', 'Niño o adulto'] };
  /* qué judía hay que haber plantado para cada coleccionable */
  const BEAN_OF = {};
  Object.keys(BEAN_GIVES).forEach(b => BEAN_GIVES[b].forEach(id => { BEAN_OF[id] = b; }));
  const refHTML = id => `<button class="ref ${II[id].t}" data-sel="${id}"><svg viewBox="-17 -16 34 32" aria-hidden="true"><use href="#m-${II[id].t}"/></svg>${KIND[II[id].t].toLowerCase()} n.º ${II[id].n}</button>`;
  /* Cuándo se puede y qué hace falta. Cada objeto es un botón: al pulsarlo se ve todo lo que lo pide. */
  function tagsHTML(it) {
    const needs = it.req.map(r => {
      const b = r === 'bean' && BEAN_OF[it.id];
      if (b) {
        const ok = S.done.has(b);
        return `<button class="tag req bean ${ok ? 'ok' : 'falta'}" data-sel="${b}" title="Ver dónde se planta">Judía n.º ${II[b].n} plantada de niño: ${ok ? 'ya la tienes' : 'te falta plantarla'}</button>`;
      }
      return `<button class="tag req" data-req="${r}" title="Ver todo lo que pide: ${REQ[r]}">${REQ[r]}</button>`;
    }).join('');
    return `<span class="tag ${AGE[it.age][0]}">${AGE[it.age][1]}</span>` + (it.night ? '<span class="tag night">Solo de noche</span>' : '') +
      `<span class="needs"><b>Necesitas</b>${needs || '<span class="nada">ningún objeto</span>'}</span>`;
  }
  /* lo que da una judía al volver de adulto */
  function givesHTML(it) {
    if (it.t !== 'bn') return '';
    const g = BEAN_GIVES[it.id];
    return `<p class="gives">${g ? 'De adulto te lleva a la ' + g.map(refHTML).join(' y a la ')
      : 'Ninguna de las guías consultadas la relaciona con una skulltula o una pieza de corazón: de adulto es solo un paseo.'}</p>`;
  }
  function searchFor(text) {
    $('#q').value = text; S.q = text;
    if (!S.panel) togglePanel(true);
    renderMarks(); renderList(); $('#scroll').scrollTop = 0;
  }
  const whereTxt = it => ZI[it.zone].name + (it.floor && ZI[it.zone].floors.length > 1 ? `, piso ${it.floor}` : '');

  /* Un solo sitio para la ficha: con la guía abierta en pantalla ancha se despliega dentro de ella;
     si la guía está cerrada o la pantalla es estrecha, sale la ficha emergente junto al marcador. */
  const overlayPanel = window.matchMedia('(max-width: 980px)');
  const popWanted = () => !S.panel || overlayPanel.matches;
  function renderPop() {
    const it = II[S.sel];
    if (!it || !popWanted()) { pop.hidden = true; pop.innerHTML = ''; return; }
    const done = S.done.has(it.id), bean = it.t === 'bn';
    pop.className = 'pop ' + it.t;
    pop.innerHTML = `
      <button class="pop-x" aria-label="Cerrar la ficha">×</button>
      ${bean ? '' : `<button class="pop-img" title="Ampliar la captura"><img src="${shot(it.id)}" alt="Captura del juego: ${esc(it.title)}" referrerpolicy="no-referrer" onerror="this.parentNode.remove()"></button>`}
      <div class="pop-body">
        <p class="pop-kind"><svg viewBox="-17 -16 34 32" aria-hidden="true"><use href="#m-${it.t}"/></svg>${KIND[it.t]} n.º ${it.n}, ${esc(whereTxt(it))}</p>
        <h2>${esc(it.title)}</h2>
        <div class="tags">${tagsHTML(it)}</div>
        <p>${esc(it.desc)}</p>
        ${givesHTML(it)}
        ${it.remake ? `<p class="rmk">${esc(it.remake)}</p>` : ''}
        <div class="pop-foot">
          <label class="pop-chk"><input type="checkbox" ${done ? 'checked' : ''}> ${bean ? 'Ya la he plantado' : 'Ya la tengo'}</label>
          ${bean ? '' : `<span class="pop-src">Captura de <a href="${SHOT[it.t][1]}" target="_blank" rel="noopener">${SHOT[it.t][0]}</a></span>`}
        </div>
      </div>`;
    pop.hidden = false; pop.scrollTop = 0;
    placePop();
  }
  const narrow = window.matchMedia('(max-width: 640px)');
  function placePop() {
    if (pop.hidden || !S.sel) return;
    if (narrow.matches) { pop.style.left = pop.style.top = ''; return; }
    const it = II[S.sel], world = S.view === 'world';
    const sx = ((world ? it.wx : it.x) - V.x) / V.w * RW, sy = ((world ? it.wy : it.y) - V.y) / V.h * RH;
    const pw = pop.offsetWidth, ph = pop.offsetHeight, gap = 34;
    let left = sx + gap;
    if (!world) left = RW - pw - 14;               // en las mazmorras la ficha se acopla a la derecha y el piso se aparta
    else if (left + pw > RW - 10) left = sx - gap - pw;
    left = clamp(left, 10, Math.max(10, RW - pw - 10));
    pop.style.left = left + 'px';
    pop.style.top = clamp(sy - ph * .38, 10, Math.max(10, RH - ph - 10)) + 'px';
  }

  /* ── la guía (panel): índice por dominios o fichas con foto de la zona ── */
  function cardHTML(it) {
    const done = S.done.has(it.id), sel = S.sel === it.id, bean = it.t === 'bn';
    return `<article class="card ${it.t}${done ? ' done' : ''}${sel ? ' sel' : ''}" data-id="${it.id}">
      ${bean ? '' : `<button class="card-shot" aria-label="Ampliar la captura: ${esc(it.title)}"><img loading="lazy" width="760" height="428" src="${shot(it.id)}" alt="" referrerpolicy="no-referrer" onerror="this.parentNode.remove()"></button>`}
      <button class="card-head" title="Enseñármela en el mapa">
        <svg viewBox="-17 -16 34 32" aria-hidden="true"><use href="#m-${it.t}"/></svg>
        <span class="card-ttl"><i>${it.n}</i>${esc(it.title)}</span>
      </button>
      <label class="chk" title="${bean ? (done ? 'Plantada' : 'Marcar como plantada') : (done ? 'Conseguida' : 'Marcar como conseguida')}"><input type="checkbox" ${done ? 'checked' : ''} aria-label="${bean ? 'Plantada' : 'Conseguida'}: ${esc(it.title)}"></label>
      <div class="tags">${tagsHTML(it)}</div>
      <p class="card-desc">${esc(it.desc)}</p>
      ${givesHTML(it)}
      ${it.remake ? `<p class="rmk">${esc(it.remake)}</p>` : ''}
    </article>`;
  }

  function indexHTML() {
    return REGIONS.map(r => {
      const all = tally(ITEMS.filter(i => i.t !== 'bn' && ZREG[i.zone] === r.id && S.show[i.t]));
      const rows = r.z.map(id => {
        const z = ZI[id], t = tally(zoneItems(id));
        return `<button class="zrow${z.kind === 'dun' ? ' dun' : ''}${t.n && t.d === t.n ? ' full' : ''}" data-go="${id}">` +
          `<span class="zrow-n">${esc(z.name)}${z.kind === 'dun' ? '<small>mazmorra</small>' : ''}</span><span class="cnt">${t.n ? `${t.d}/${t.n}` : 'nada que buscar'}</span>` +
          `<i class="bar"><i style="width:${t.n ? 100 * t.d / t.n : 0}%"></i></i></button>`;
      }).join('');
      return `<section class="reg reg-${r.id}"><h3>${esc(r.name)}<span>${all.d}/${all.n}</span></h3>${rows}</section>`;
    }).join('');
  }

  function renderList() {
    if (!S.panel) return;
    const scope = S.view === 'world' ? S.focus : S.view;
    const z = scope && ZI[scope];
    const head = $('#guide-head');
    head.className = z ? 'reg-' + ZREG[z.id] : '';
    if (z) {
      const t = tally(zoneItems(z.id));
      head.innerHTML = `<button class="crumb" data-go="world"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M8 2L4 6l4 4"/></svg>Todas las zonas</button>` +
        `<h2>${esc(z.name)}</h2><p>${esc(z.sub || '')}</p>` +
        (t.n ? `<p class="prog"><b>${t.d}</b> de ${t.n} conseguidas<i class="bar"><i style="width:${100 * t.d / t.n}%"></i></i></p>` : '');
    } else {
      head.innerHTML = '<h2>Hyrule, zona a zona</h2><p>Elige una zona aquí o en el mapa. Dentro verás cada skulltula y cada pieza de corazón con su foto y cómo conseguirla.</p>';
    }
    const items = ITEMS.filter(i => visible(i) && (S.q || !scope || i.zone === scope));
    let html = '';
    if (!z && !S.q) html = indexHTML();
    else if (!items.length) {
      const has = !scope || ITEMS.some(i => i.zone === scope);
      html = `<p class="empty">${has ? 'Nada coincide con los filtros. Cambia la edad o la búsqueda, o vuelve a mostrar las conseguidas.'
        : 'Aquí no hay skulltulas doradas ni piezas de corazón: puedes pasar de largo.'}</p>`;
    } else if (!S.q && z && z.floors && z.floors.length > 1) {
      z.floors.forEach(f => {
        const li = items.filter(i => i.floor === f);
        if (li.length) html += `<h3 class="floor"><button data-floor="${f}">Piso ${f}</button><span>${li.length}</span></h3>` + li.map(cardHTML).join('');
      });
    } else if (!S.q && z) {
      const beans = items.filter(i => i.t === 'bn');
      html = items.filter(i => i.t !== 'bn').map(cardHTML).join('') +
        (beans.length ? '<h3 class="floor">Para plantar de niño<span>judías mágicas</span></h3>' + beans.map(cardHTML).join('') : '');
    }
    else {
      ZONES.forEach(zz => {
        const li = items.filter(i => i.zone === zz.id);
        if (li.length) html += `<h3 class="floor"><button data-go="${zz.id}">${esc(zz.name)}</button><span>${li.length}</span></h3>` + li.map(cardHTML).join('');
      });
    }
    $('#list').innerHTML = html;
  }

  function openShot(it) {
    const lb = $('#lightbox');
    $('img', lb).src = shot(it.id, 1280);
    $('p', lb).textContent = `${KIND[it.t]} n.º ${it.n}: ${it.title}`;
    lb.hidden = false;
  }

  /* ── navegación ── */
  function syncHash() {
    const z = S.view === 'world' ? (S.focus || 'world') : S.view;
    const h = '#z=' + z + (S.floor ? '&f=' + S.floor : '') + (S.sel ? '&i=' + S.sel : '') + (S.night ? '&n=1' : '');
    try { history.replaceState(null, '', h); } catch (e) { /* file:// en algunos navegadores */ }
  }
  function refresh() { renderHead(); renderList(); renderTally(); syncHash(); }

  function detectFocus() {
    if (S.view !== 'world' || S.sel) return;   // con una ficha abierta, la zona no cambia sola
    const cx = V.x + V.w / 2, cy = V.y + V.h / 2;
    const hit = id => { const p = PL[id]; return cx >= p.x && cx <= p.x + p.w && cy >= p.y && cy <= p.y + p.h; };
    let f = null;
    if (V.w < 3400) f = (V.w < 1500 && hit('lonlon')) ? 'lonlon' : (Object.keys(PL).find(id => !PL[id].inset && hit(id)) || null);
    if (f === S.focus) return;
    S.focus = f; markFocus(); refresh();
    $('#scroll').scrollTop = 0;
  }

  function setView(view, floor) {
    if (S.view === view && S.floor === floor) return false;
    S.view = view; S.floor = floor; S.focus = null;
    renderMap(); setV(home(), true);
    return true;
  }

  function go(id, floor) {
    const z = ZI[id]; if (!z) return;
    if (id !== 'world' && S.panel && overlayPanel.matches) togglePanel(false);   // en pantalla estrecha, elegir zona aparta la guía para ver el mapa
    clearTimeout(focusT);
    if (S.sel) { S.sel = null; renderPop(); }
    if (id === 'world') {
      const changed = setView('world', null);
      S.focus = null; renderMarks(); markFocus(); refresh();
      return changed ? null : fly(home(), 600);
    }
    if (isOver(id)) {
      const changed = setView('world', null);
      S.focus = id; renderMarks(); markFocus(); refresh();
      return changed ? setV(fix(plateFrame(id)), true) : fly(plateFrame(id), 650);
    }
    const f = floor && z.floors.includes(floor) ? floor : (S.view === id ? S.floor : z.start);
    setView(id, f);
    renderMarks(); refresh();
    $('#scroll').scrollTop = 0;
  }

  /* encuadre de un piso con la ficha abierta: el plano se aparta a la izquierda (o hacia arriba en pantallas estrechas) */
  function dunFrame() {
    const hm = home(), small = narrow.matches;
    return { x: hm.x + (small ? 0 : hm.w * .13), y: hm.y + (small ? hm.h * .26 : 0), w: hm.w * .98, h: hm.h * .98 };
  }

  function select(id, o) {
    const it = II[id]; if (!it) return;
    o = o || {};
    S.sel = id;
    clearTimeout(focusT);
    const changed = isOver(it.zone) ? setView('world', null) : setView(it.zone, it.floor);
    if (isOver(it.zone)) { S.focus = it.zone; markFocus(); }
    renderMarks(); refresh(); renderPop();
    /* el marcador queda a la izquierda de la ficha (o por encima, en pantallas estrechas) */
    const small = narrow.matches, fx = small || !popWanted() ? .5 : .36, fy = small ? .2 : .5;
    if (S.view === 'world') {
      const p = PL[it.zone], w = clamp(1500 * p.s, 640, 2600) * (small ? .6 : 1), hh = w * RH / RW, far = V.w > w * 2.4;
      if (o.fly || far || changed || small) {
        const t = popWanted() ? fix({ x: it.wx - w * fx, y: it.wy - hh * fy, w, h: hh }) : fix(plateFrame(it.zone));
        if (changed || o.instant) setV(t, true); else fly(t, 650);
      }
    } else {
      if (popWanted()) { if (changed || o.instant) setV(dunFrame(), true); else fly(dunFrame(), 400); }
    }
    const card = $(`.card[data-id="${id}"]`);
    if (card) card.scrollIntoView({ block: 'start', behavior: o.instant || calm.matches ? 'auto' : 'smooth' });
    if (o.fly && S.panel && overlayPanel.matches) togglePanel(false);
  }
  function deselect() {
    if (!S.sel) return;
    S.sel = null; renderPop(); renderMarks(); renderList(); syncHash();
  }

  function toggleDone(id) {
    if (S.done.has(id)) S.done.delete(id); else S.done.add(id);
    ls.set(KEY, [...S.done]);
    renderMarks(); refresh();
    const c = $('.pop-chk input'); if (c && S.sel === id) c.checked = S.done.has(id); else renderPop();
  }

  function togglePanel(on) {
    S.panel = on == null ? !S.panel : on;
    $('#panel').hidden = !S.panel;
    $('#panel-btn').setAttribute('aria-expanded', S.panel);
    $('#panel-txt').textContent = S.panel ? 'Ocultar la guía' : 'Abrir la guía';
    if (!overlayPanel.matches) ls.set(UIKEY, { panel: S.panel });   // en pantalla estrecha la guía es una hoja: no cambia la preferencia de escritorio
    renderHead(); renderList(); renderPop();
  }
  /* ── ratón, dedos y teclado sobre el mapa ── */
  const pts = new Map();
  let drag = null, pinch = null, moved = false;
  svg.addEventListener('pointerdown', e => {
    if (e.button) return;
    flyId++;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) { drag = { x: e.clientX, y: e.clientY, vx: V.x, vy: V.y }; moved = false; }
    else if (pts.size === 2) {
      const [a, b] = [...pts.values()];
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, w: V.w }; drag = null; moved = true;
    }
  });
  svg.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch && pts.size === 2) {
      const [a, b] = [...pts.values()], d = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      const p = toSvg((a.x + b.x) / 2, (a.y + b.y) / 2);
      zoomAt(pinch.w * pinch.d / d / V.w, p.x, p.y);
    } else if (drag) {
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!moved && Math.hypot(dx, dy) < 5) return;
      if (!moved) { moved = true; svg.classList.add('drag'); try { svg.setPointerCapture(e.pointerId); } catch (err) { /* nada */ } }
      const s = V.w / RW;
      setV(fix({ x: drag.vx - dx * s, y: drag.vy - dy * s, w: V.w, h: V.h }));
    }
  });
  const endPtr = e => {
    pts.delete(e.pointerId);
    if (pts.size < 2) pinch = null;
    if (pts.size === 1) { const p = [...pts.values()][0]; drag = { x: p.x, y: p.y, vx: V.x, vy: V.y }; }
    if (!pts.size) { drag = null; svg.classList.remove('drag'); }
  };
  svg.addEventListener('pointerup', endPtr);
  svg.addEventListener('pointercancel', endPtr);
  svg.addEventListener('wheel', e => {
    e.preventDefault(); flyId++;
    const p = toSvg(e.clientX, e.clientY);
    zoomAt(Math.pow(1.0018, e.deltaMode ? e.deltaY * 30 : e.deltaY), p.x, p.y);
  }, { passive: false });

  const mapActivate = t => {
    const mk = t.closest('.mk'); if (mk) return select(mk.dataset.id);
    const g = t.closest('[data-go]'); if (g) return go(g.dataset.go);
    const pl = t.closest('.plate'); if (pl && svg.classList.contains('far')) return go(pl.dataset.zone);   // de lejos, tocar una lámina te lleva a ella
    deselect();
  };
  svg.addEventListener('click', e => { if (moved) { moved = false; return; } mapActivate(e.target); });
  svg.addEventListener('dblclick', e => {
    const mk = e.target.closest('.mk'); if (mk) return toggleDone(mk.dataset.id);
    if (e.target.closest('[data-go]')) return;
    const p = toSvg(e.clientX, e.clientY), w = Math.max(V.w / 2.2, minW());
    fly({ x: p.x - w / 2, y: p.y - w * RH / RW / 2, w, h: w * RH / RW }, 380);
  });
  svg.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); mapActivate(e.target); } });

  const zoomBtn = f => { const hw = V.w * f; fly({ x: V.x + V.w / 2 - hw / 2, y: V.y + V.h / 2 - hw * RH / RW / 2, w: hw, h: hw * RH / RW }, 260); };
  $('#z-in').addEventListener('click', () => zoomBtn(1 / 1.7));
  $('#z-out').addEventListener('click', () => zoomBtn(1.7));
  $('#z-fit').addEventListener('click', () => fly(home(), 500));

  /* ── resto de la interfaz ── */
  $('#home').addEventListener('click', () => go('world'));
  $('#back').addEventListener('click', () => (S.view === 'world' ? go('world') : go(DOOR[S.view].zone)));
  $('#floors').addEventListener('click', e => { const b = e.target.closest('[data-floor]'); if (b) go(S.view, b.dataset.floor); });
  $('#guide-head').addEventListener('click', e => { const b = e.target.closest('[data-go]'); if (b) go(b.dataset.go); });
  $('#panel-btn').addEventListener('click', () => togglePanel());

  pop.addEventListener('click', e => {
    if (e.target.closest('.pop-x')) return deselect();
    const rq = e.target.closest('[data-req]'); if (rq) return searchFor(REQ[rq.dataset.req]);
    const sl = e.target.closest('[data-sel]'); if (sl) return select(sl.dataset.sel, { fly: true });
    if (e.target.closest('.pop-img') && S.sel) openShot(II[S.sel]);
  });
  pop.addEventListener('change', e => { if (e.target.matches('.pop-chk input') && S.sel) toggleDone(S.sel); });
  $('#lightbox').addEventListener('click', e => { e.currentTarget.hidden = true; });

  $('#list').addEventListener('click', e => {
    const g = e.target.closest('[data-go]'); if (g) return go(g.dataset.go);
    const f = e.target.closest('[data-floor]'); if (f) return go(S.view, f.dataset.floor);
    const rq = e.target.closest('[data-req]'); if (rq) return searchFor(REQ[rq.dataset.req]);
    const sl = e.target.closest('[data-sel]'); if (sl) return select(sl.dataset.sel, { fly: true });
    const card = e.target.closest('.card'); if (!card) return;
    if (e.target.closest('.card-shot')) return openShot(II[card.dataset.id]);
    if (e.target.closest('.card-head')) select(card.dataset.id, { fly: true });
  });
  $('#list').addEventListener('change', e => { if (e.target.matches('.chk input')) toggleDone(e.target.closest('.card').dataset.id); });

  $('#q').addEventListener('input', e => { S.q = e.target.value.trim(); renderMarks(); renderList(); });
  document.querySelectorAll('.chip[data-type]').forEach(b => b.addEventListener('click', () => {
    const t = b.dataset.type; S.show[t] = !S.show[t]; b.setAttribute('aria-pressed', S.show[t]);
    renderMarks(); refresh();
  }));
  $('#hide-done').addEventListener('click', e => {
    S.hideDone = !S.hideDone; e.currentTarget.setAttribute('aria-pressed', S.hideDone); renderMarks(); renderList();
  });
  document.querySelectorAll('.seg [data-age]').forEach(b => b.addEventListener('click', () => {
    S.age = b.dataset.age;
    document.querySelectorAll('.seg [data-age]').forEach(o => o.setAttribute('aria-pressed', o === b));
    renderMarks(); renderList();
  }));
  function setNight(on) {
    S.night = on; document.body.classList.toggle('night', on);
    $('#sky').setAttribute('aria-pressed', on); $('#sky-txt').textContent = on ? 'Noche' : 'Día';
  }
  $('#sky').addEventListener('click', () => { setNight(!S.night); syncHash(); });

  let armed = null;
  $('#reset').addEventListener('click', e => {
    const b = e.currentTarget;
    if (!armed) {
      b.classList.add('armed'); b.textContent = 'Pulsa otra vez para borrarlo todo';
      armed = setTimeout(() => { armed = null; b.classList.remove('armed'); b.textContent = 'Borrar mi progreso'; }, 4000);
      return;
    }
    clearTimeout(armed); armed = null; b.classList.remove('armed'); b.textContent = 'Borrar mi progreso';
    S.done.clear(); ls.set(KEY, []); renderMarks(); refresh(); renderPop();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!$('#lightbox').hidden) $('#lightbox').hidden = true;
      else deselect();
      return;
    }
    if (e.target.matches('input, textarea')) return;
    if (e.key === '+' || e.key === '=') zoomBtn(1 / 1.7);
    else if (e.key === '-') zoomBtn(1.7);
    else if (e.key === '0') fly(home(), 500);
    else if (e.key.startsWith('Arrow')) {
      const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
      if (d && !e.target.closest('#scroll')) { e.preventDefault(); setV(fix({ x: V.x + d[0] * V.w * .14, y: V.y + d[1] * V.h * .14, w: V.w, h: V.h })); }
    }
  });

  /* el mapa se reencuadra si cambia el tamaño de la ventana o se abre la lista */
  new ResizeObserver(() => {
    const cx = V.x + V.w / 2, cy = V.y + V.h / 2, atHome = V.w >= home().w * .999;
    measure();
    if (S.view !== 'world' && S.sel && popWanted()) return setV(dunFrame(), true);
    const h = V.w * RH / RW;
    setV(atHome ? home() : fix({ x: cx - V.w / 2, y: cy - h / 2, w: V.w, h }), true);
  }).observe(stage);

  /* si hay copias locales de las capturas, se usan (y la guía funciona sin conexión) */
  const probe = new Image();
  probe.onload = () => { localShots = true; renderList(); renderPop(); };
  probe.src = 'capturas/gs1.jpg';

  /* ── arranque: lee la dirección (#z=zona&f=piso&i=marcador&n=1) ── */
  const h = new URLSearchParams(location.hash.slice(1));
  if (h.get('n') === '1') setNight(true);
  if (h.get('k') === '1') document.body.classList.add('kiosk');
  $('#panel').hidden = !S.panel; $('#panel-btn').setAttribute('aria-expanded', S.panel);
  $('#panel-txt').textContent = S.panel ? 'Ocultar la guía' : 'Abrir la guía';
  measure();
  renderMap(); setV(home(), true); refresh();
  const hi = II[h.get('i')], hz = ZI[h.get('z')];
  /* en pantalla estrecha el mapa general se ve pequeño: se empieza por el índice de la guía */
  if (overlayPanel.matches) togglePanel(!hi && (!hz || hz.id === 'world') && !document.body.classList.contains('kiosk'));
  if (hi && hi.zone) select(hi.id, { instant: true, fly: true });
  else if (hz && hz.id !== 'world') {
    if (isOver(hz.id)) { S.focus = hz.id; markFocus(); refresh(); setV(fix(plateFrame(hz.id)), true); }
    else go(hz.id, h.get('f'));
  }
})();
