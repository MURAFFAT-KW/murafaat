/* أقنعني — نسخة المطوّر
   تشتغل بس إذا الرابط فيه ?dev=1. كل شي محلي على الجهاز:
   قاعدة بيانات بالذاكرة، بوتات داخل إطارات مخفية، تسريع الوقت، ولوحة مطوّر.
   ما تلمس Firebase ولا التخزين الحقيقي للمتصفح. */
(function () {
  'use strict';
  var qs = new URLSearchParams(location.search);
  if (!qs.has('dev')) return;
  var isBot = qs.has('bot');
  var TOPW = isBot ? window.parent : window;
  var file = (location.pathname.split('/').pop() || '').replace('.html', '');
  var EN = /-en$/.test(file) || file === 'en';
  var GAMEKEY = file.replace(/-en$/, '');
  var PREFIX = { murafaat: 'rooms', mazad: 'mazad', nadik: 'nadik', azyaa: 'azyaa', aqar: 'aqar' }[GAMEKEY];

  /* ---------- الحالة المشتركة (في نافذة المضيف) ---------- */
  var realNow = Date.now.bind(Date);
  if (!isBot) {
    window.__DEV = {
      store: {}, subs: [], speed: +(qs.get('speed') || 1), rA: realNow(), vA: realNow(),
      auto: qs.get('auto') === '1', botsWanted: Math.max(1, Math.min(12, +(qs.get('bots') || 3))),
      bots: [], log: [], errors: [], code: null, en: EN, game: GAMEKEY, prefix: PREFIX, stats: { actions: 0 }
    };
  }
  var D = TOPW.__DEV;
  if (!D) return;

  /* ---------- تخزين وهمي (ما يلمس تخزين المتصفح الحقيقي) ---------- */
  function memStore() {
    var m = {};
    return {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(m, k) ? m[k] : null; },
      setItem: function (k, v) { m[k] = String(v); },
      removeItem: function (k) { delete m[k]; },
      clear: function () { m = {}; },
      key: function (i) { return Object.keys(m)[i] || null; },
      get length() { return Object.keys(m).length; }
    };
  }
  try { Object.defineProperty(window, 'localStorage', { configurable: true, value: memStore() }); } catch (e) { }
  try { Object.defineProperty(window, 'sessionStorage', { configurable: true, value: memStore() }); } catch (e) { }
  if (EN) window.localStorage.setItem('aqnieni.lang', 'en');

  /* ---------- الوقت (مع التسريع) ---------- */
  Date.now = function () { return Math.round(D.vA + (realNow() - D.rA) * D.speed); };
  function setSpeed(s) { D.vA = Date.now(); D.rA = realNow(); D.speed = s; }

  /* ---------- منع Firebase وقاعدة بيانات محلية ---------- */
  try { Object.defineProperty(window, 'firebase', { configurable: false, writable: false, value: undefined }); } catch (e) { }
  function snapOf(id, raw) {
    var v = null;
    if (typeof raw === 'string') { try { v = JSON.parse(raw); } catch (e) { v = null; } }
    return { id: id, exists: v !== null, data: function () { return v === null ? undefined : JSON.parse(JSON.stringify(v)); }, metadata: { fromCache: false, hasPendingWrites: false } };
  }
  var pending = false;
  function notify() {
    if (pending) return; pending = true;
    TOPW.setTimeout(function () {
      pending = false;
      D.subs = D.subs.filter(function (s) { try { if (s.dead()) return false; s.fn(); return true; } catch (e) { return false; } });
    }, 0);
  }
  var myWin = window;
  function addSub(fn) {
    var o = { fn: fn, dead: function () { try { return myWin.closed || !myWin.document || !myWin.document.defaultView; } catch (e) { return true; } } };
    D.subs.push(o);
    return function () { var i = D.subs.indexOf(o); if (i >= 0) D.subs.splice(i, 1); };
  }
  function docRef(path) {
    var id = path.split('/').pop();
    return {
      id: id,
      get: function () { return Promise.resolve(snapOf(id, D.store[path])); },
      set: function (v) { D.store[path] = JSON.stringify(v); notify(); return Promise.resolve(); },
      delete: function () { Object.keys(D.store).forEach(function (k) { if (k === path || k.indexOf(path + '/') === 0) delete D.store[k]; }); notify(); return Promise.resolve(); },
      onSnapshot: function (cb) {
        var last;
        var f = function () { var r = D.store[path]; if (r !== last) { last = r; cb(snapOf(id, r)); } };
        var un = addSub(f); setTimeout(f, 0); return un;
      }
    };
  }
  function colRef(col) {
    function list() {
      var docs = [];
      Object.keys(D.store).forEach(function (k) { if (k.indexOf(col + '/') === 0) { var rest = k.slice(col.length + 1); if (rest.indexOf('/') < 0) docs.push(snapOf(rest, D.store[k])); } });
      return { docs: docs };
    }
    return {
      doc: function (id) { return docRef(col + '/' + id); },
      get: function () { return Promise.resolve(list()); },
      onSnapshot: function (cb) {
        var last;
        var f = function () { var l = list(); var s = l.docs.map(function (d) { return d.id + '=' + D.store[col + '/' + d.id]; }).join('|'); if (s !== last) { last = s; cb(l); } };
        var un = addSub(f); setTimeout(f, 0); return un;
      }
    };
  }
  try { Object.defineProperty(window, '__MZ_DB', { configurable: false, writable: false, value: { doc: docRef, collection: colRef } }); } catch (e) { }
  window.__DEV_HUB = 'dev.html' + (EN ? '?lang=en' : '');
  window.confirm = function () { return true; };
  window.alert = function (m) { log('alert: ' + m); };

  /* ---------- السجل والأخطاء ---------- */
  var WHO = isBot ? ('🤖' + qs.get('bot')) : '👤';
  function log(m) { D.log.push({ t: realNow(), who: WHO, m: String(m) }); if (D.log.length > 400) D.log.shift(); }
  // تنبيهات اللعبة (toast) تنحفظ بالسجل عشان تعرف وين اللاعبين يتعثرون
  var lastToast = '', lastToastT = 0;
  function watchToasts() {
    try {
      new MutationObserver(function (ms) {
        ms.forEach(function (mu) {
          var nodes = mu.type === 'attributes' ? [mu.target] : Array.prototype.slice.call(mu.addedNodes || []);
          nodes.forEach(function (n) {
            if (!n || n.nodeType !== 1 || !/(^|\s)toast(\s|$)/.test(n.className || '')) return;
            if (mu.type === 'attributes' && !n.classList.contains('show')) return;
            var t = (n.textContent || '').trim(); if (!t) return;
            if (t === lastToast && realNow() - lastToastT < 1500) return;
            lastToast = t; lastToastT = realNow();
            D.toasts = D.toasts || []; D.toasts.push({ t: realNow(), who: WHO, m: t }); if (D.toasts.length > 200) D.toasts.shift();
          });
        });
      }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    } catch (e) { }
  }
  if (document.body) watchToasts(); else document.addEventListener('DOMContentLoaded', watchToasts);
  window.addEventListener('error', function (e) { D.errors.push({ t: realNow(), who: WHO, m: (e.message || 'خطأ') + (e.lineno ? ' @' + e.lineno : '') }); });
  window.addEventListener('unhandledrejection', function (e) { D.errors.push({ t: realNow(), who: WHO, m: 'promise: ' + (e.reason && e.reason.message || e.reason) }); });

  /* ---------- أدوات البوت ---------- */
  function vis(el) { if (!el) return false; if (el.disabled || el.getAttribute('aria-disabled') === 'true') return false; var r = el.getBoundingClientRect(); if (r.width === 0 && r.height === 0) return false; var s = getComputedStyle(el); return s.visibility !== 'hidden' && s.display !== 'none'; }
  function txt(el) { return (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim(); }
  var ctx = {
    en: EN, game: GAMEKEY, mem: {}, D: D,
    $: function (s) { return document.querySelector(s); },
    $$: function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); },
    vis: vis, txt: txt,
    acts: function (act) { return ctx.$$('[data-act' + (act ? '="' + act + '"' : '') + ']').filter(vis); },
    has: function (act, re) { return ctx.acts(act).some(function (e) { return !re || re.test(txt(e)); }); },
    click: function (act, re, pick) {
      var l = ctx.acts(act).filter(function (e) { return !re || re.test(txt(e)); });
      if (!l.length) return false;
      var el = typeof pick === 'function' ? pick(l) : (pick === 'rand' ? l[Math.floor(Math.random() * l.length)] : l[0]);
      if (!el) return false;
      el.click(); D.stats.actions++; return true;
    },
    clickEl: function (el) { if (!el || !vis(el)) return false; el.click(); D.stats.actions++; return true; },
    fill: function (sel, val) {
      var el = typeof sel === 'string' ? document.querySelector(sel) : sel;
      if (!el || !vis(el)) return false;
      if (el.tagName === 'SELECT') { el.value = val; } else { var proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, val); }
      el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    },
    code: function () { var m = (location.hash || '').match(/room-([A-Z0-9]+)/i) || (TOPW.location.hash || '').match(/room-([A-Z0-9]+)/i); return m ? m[1].toUpperCase() : D.code; },
    G: function () { var c = ctx.code(); if (!c) return null; var r = D.store[PREFIX + '/' + c]; try { return r ? JSON.parse(r) : null; } catch (e) { return null; } },
    inp: function (id) { var c = ctx.code(); var r = c && D.store[PREFIX + '/' + c + '/inputs/' + id]; try { return r ? JSON.parse(r) : null; } catch (e) { return null; } },
    priv: function (p) { var c = ctx.code(); var r = c && D.store[PREFIX + '/' + c + '/' + p]; try { return r ? JSON.parse(r) : null; } catch (e) { return null; } },
    myName: null,
    me: function () {
      var g = ctx.G(); if (!g) return null; var ps = g.players || [];
      if (isBot) return ps.find(function (p) { return p.name === ctx.myName; }) || null;
      return ps.find(function (p) { return BOT_NAMES.indexOf(p.name) < 0 && !/^bot/.test(p.id); }) || null;
    },
    isHost: function () { var g = ctx.G(), m = ctx.me(); return !!(g && m && g.host === m.id); },
    rnd: function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); },
    pick: function (a) { return a[Math.floor(Math.random() * a.length)]; },
    shuffle: function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; },
    log: log, text: function () { return txt(document.body); }
  };
  window.__DEV_CTX = ctx;

  var BOT_NAMES = EN ? ['Bot Sara', 'Bot Fahad', 'Bot Noura', 'Bot Khalid', 'Bot Dana', 'Bot Yousef', 'Bot Mariam', 'Bot Ali', 'Bot Hessa', 'Bot Omar', 'Bot Lulwa', 'Bot Bader']
    : ['بوت سارة', 'بوت فهد', 'بوت نورة', 'بوت خالد', 'بوت دانة', 'بوت يوسف', 'بوت مريم', 'بوت علي', 'بوت حصة', 'بوت عمر', 'بوت لولوة', 'بوت بدر'];

  /* ---------- الخطوات العامة (دخول الغرفة) ---------- */
  function common() {
    if (ctx.click('noticeOk')) return 'notice';
    var g = ctx.G(), me = ctx.me();
    if (me) return null;
    if (ctx.click('enter')) return 'intro';
    if (ctx.click('closeModal')) return 'modal';
    var nm = ctx.$('#nm');
    if (nm && vis(nm)) {
      if (nm.value !== ctx.myName) { ctx.fill(nm, ctx.myName); return 'name'; }
      if (isBot) { if (ctx.click('join')) return 'join'; }
      else if (ctx.click('create')) return 'create';
    }
    return null;
  }

  /* ---------- حلقة البوت ---------- */
  var lastAct = 0;
  function tick() {
    var auto = isBot || D.auto;
    if (!auto) return;
    var think = isBot ? 650 : 750;
    if (realNow() - lastAct < think / Math.max(1, Math.min(4, D.speed))) return;
    var r = null;
    try {
      r = common();
      if (!r) {
        var brain = (TOPW.__DEV_BRAINS || {})[GAMEKEY];
        if (brain) r = brain(ctx, isBot);
      }
    } catch (e) { D.errors.push({ t: realNow(), who: WHO, m: 'bot: ' + (e && e.message) }); }
    if (r) { lastAct = realNow(); if (typeof r === 'string' && r.charAt(0) !== '.') log(r); }
  }

  if (isBot) {
    ctx.myName = BOT_NAMES[(+qs.get('bot') - 1) % BOT_NAMES.length];
    window.addEventListener('load', function () { setInterval(tick, 200); });
    return;
  }

  /* ---------- المضيف: لوحة المطوّر ---------- */
  ctx.myName = EN ? 'Me' : 'أنا';
  var T = EN ? { dev: 'Developer', bots: 'Bots', add: 'Add bots', speed: 'Speed', auto: 'Bots play for me too', see: 'View', close: 'Close', log: 'Log', err: 'Errors', none: 'Nothing yet', back: 'Back to developer hub', nobots: 'Create a room first, then the bots join.', screen: 'Screen of', restart: 'New game', toasts: 'Game messages (where players got stuck)' }
    : { dev: 'المطوّر', bots: 'البوتات', add: 'أضف البوتات', speed: 'السرعة', auto: 'البوتات تلعب عني بعد', see: 'شوف', close: 'إغلاق', log: 'السجل', err: 'الأخطاء', none: 'ما في شي للحين', back: 'رجوع لصفحة المطوّر', nobots: 'سوّ غرفة أول، وبعدها البوتات تدخل.', screen: 'شاشة', restart: 'لعبة جديدة', toasts: 'رسايل اللعبة (وين اللاعبين تعثروا)' };

  function spawnBots(n) {
    var c = ctx.code(); if (!c) return false;
    D.code = c;
    for (var i = 0; i < n; i++) {
      var k = D.bots.length + 1;
      var f = document.createElement('iframe');
      f.className = 'devbot'; f.title = BOT_NAMES[(k - 1) % BOT_NAMES.length];
      f.src = location.pathname.split('/').pop() + '?dev=1&bot=' + k + '#room-' + c;
      document.getElementById('devbots').appendChild(f);
      D.bots.push({ k: k, name: f.title, frame: f });
    }
    renderPanel(); return true;
  }

  /* يضبط عدد اللاعبين بالردهة على عدد الموجودين (عشان زر البدء يشتغل) */
  function lobbyAssist() {
    var g = ctx.G(); if (!g || g.phase !== 'lobby' || !ctx.isHost()) return;
    var st = g.settings || {}, hp = !(st.hostPlays === false || st.hostPlays === 0 || st.hostPlays === '0');
    var real = (g.players || []).length - (hp ? 0 : 1), tgt = st.players || 3;
    if (real < 3 || tgt === real) return;
    var pv = ctx.acts('step').filter(function (b) { return b.dataset.k === 'players'; });
    var want = tgt < real ? 1 : -1;
    ctx.clickEl(pv.find(function (b) { return +b.dataset.v === want; }));
  }

  var css = '#devfab{position:fixed;right:12px;bottom:calc(14px + env(safe-area-inset-bottom));z-index:9998;background:#12203A;color:#fff;border:0;border-radius:99px;padding:10px 14px;font:800 14px system-ui;box-shadow:0 6px 18px rgba(0,0,0,.25)}' +
    '#devfab .b{background:#FBC611;color:#12203A;border-radius:99px;padding:1px 7px;margin-inline-start:6px}' +
    '#devpanel{position:fixed;inset:auto 0 0 0;max-height:78vh;overflow:auto;z-index:9999;background:#fff;border-radius:22px 22px 0 0;box-shadow:0 -8px 30px rgba(0,0,0,.25);padding:16px 16px calc(18px + env(safe-area-inset-bottom));font:500 15px system-ui;color:#12203A;direction:' + (EN ? 'ltr' : 'rtl') + '}' +
    '#devpanel[hidden],#devscreen[hidden]{display:none}#devpanel h4{margin:12px 0 6px;font-size:15px}#devpanel .row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}' +
    '#devpanel button{border:1.5px solid #D5DBE5;background:#fff;border-radius:12px;padding:8px 12px;font:700 14px system-ui;color:#12203A}#devpanel button.on{background:#12203A;color:#fff;border-color:#12203A}' +
    '#devpanel .bot{display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #EEF1F5}#devpanel .lg{font:12px ui-monospace,monospace;background:#F4F6F9;border-radius:10px;padding:8px;max-height:160px;overflow:auto;direction:ltr;text-align:left;white-space:pre-wrap}' +
    '#devpanel .er{color:#C81E1E}#devbots{position:fixed;left:-5000px;top:0;width:390px;height:844px;overflow:hidden}#devbots iframe{position:absolute;inset:0;width:390px;height:844px;border:0;background:#fff;z-index:1}' +
    '#devbots.show{left:50%;top:calc(52px + env(safe-area-inset-top));transform:translateX(-50%) scale(var(--sc,1));transform-origin:top center;z-index:10001;border-radius:22px;box-shadow:0 12px 40px rgba(0,0,0,.35)}#devbots iframe.top{z-index:3}' +
    '#devscreen{position:fixed;inset:0;z-index:10000;background:rgba(18,32,58,.55);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10px}' +
    '#devscreen .bar{color:#fff;font:800 15px system-ui;display:flex;gap:10px;align-items:center;margin-bottom:8px}#devscreen .bar button{border:0;border-radius:99px;padding:6px 14px;font:800 14px system-ui}' +
    '#devscreen .holder{width:min(390px,94vw);height:min(80vh,844px);border-radius:22px;overflow:hidden;background:#fff}#devscreen .holder iframe{width:100%;height:100%;border:0}';

  function renderPanel() {
    var p = document.getElementById('devpanel'); if (!p) return;
    var g = ctx.G();
    var sp = [1, 2, 5, 10].map(function (s) { return '<button data-dev="speed" data-v="' + s + '" class="' + (D.speed === s ? 'on' : '') + '">×' + s + '</button>'; }).join('');
    var bots = D.bots.map(function (b) {
      var pl = g && (g.players || []).find(function (x) { return x.name === b.name; });
      return '<div class="bot"><span>🤖 ' + b.name + (pl ? '' : ' <small>(' + (EN ? 'joining…' : 'يدخل…') + ')</small>') + '</span><button data-dev="see" data-v="' + b.k + '">' + T.see + '</button></div>';
    }).join('');
    var lg = D.log.slice(-40).reverse().map(function (l) { return l.who + ' ' + l.m; }).join('\n') || T.none;
    var er = D.errors.slice(-20).reverse().map(function (l) { return l.who + ' ' + l.m; }).join('\n') || T.none;
    var keep = p.scrollTop, inner = Array.prototype.map.call(p.querySelectorAll('.lg'), function (e) { return e.scrollTop; });
    var html = '<div class="row" style="justify-content:space-between"><b style="font-size:17px">🛠️ ' + T.dev + '</b><button data-dev="close">' + T.close + '</button></div>' +
      '<h4>⏩ ' + T.speed + '</h4><div class="row">' + sp + '</div>' +
      '<h4>🤖 ' + T.bots + ' (' + D.bots.length + ')</h4>' +
      (ctx.code() ? '<div class="row"><button data-dev="add" data-v="1">+1</button><button data-dev="add" data-v="3">+3</button></div>' : '<div style="color:#5B6578">' + T.nobots + '</div>') + bots +
      '<h4><label><input type="checkbox" data-dev="auto" ' + (D.auto ? 'checked' : '') + '> ' + T.auto + '</label></h4>' +
      '<h4 class="er">⚠️ ' + T.err + ' (' + D.errors.length + ')</h4><div class="lg er">' + er.replace(/</g, '&lt;') + '</div>' +
      '<h4>💬 ' + T.toasts + ' (' + (D.toasts || []).length + ')</h4><div class="lg">' + ((D.toasts || []).slice(-25).reverse().map(function (l) { return l.who + ' ' + l.m; }).join('\n') || T.none).replace(/</g, '&lt;') + '</div>' +
      '<h4>📜 ' + T.log + '</h4><div class="lg">' + lg.replace(/</g, '&lt;') + '</div>' +
      '<div class="row" style="margin-top:12px"><button data-dev="hub">' + T.back + '</button><button data-dev="restart">' + T.restart + '</button></div>';
    if (html === p._last) return; p._last = html; p.innerHTML = html; p.scrollTop = keep;
    Array.prototype.forEach.call(p.querySelectorAll('.lg'), function (e, i) { e.scrollTop = inner[i] || 0; });
  }
  function openScreen(k) {
    var b = D.bots.find(function (x) { return x.k === k; }); if (!b) return;
    var s = document.getElementById('devscreen'), box = document.getElementById('devbots');
    s.innerHTML = '<div class="bar">🤖 ' + T.screen + ' ' + b.name + ' <button data-dev="noscreen">' + T.close + '</button></div>';
    s.style.justifyContent = 'flex-start'; s.hidden = false;
    D.bots.forEach(function (x) { x.frame.classList.toggle('top', x.k === k); });
    var sc = Math.min(1, (window.innerWidth - 16) / 390, (window.innerHeight - 70) / 844);
    box.style.setProperty('--sc', sc); box.classList.add('show');
  }
  function closeScreen() { document.getElementById('devscreen').hidden = true; var box = document.getElementById('devbots'); box.classList.remove('show'); D.bots.forEach(function (x) { x.frame.classList.remove('top'); }); }

  function boot() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var wrap = document.createElement('div');
    wrap.innerHTML = '<button id="devfab">🛠️ ' + T.dev + '<span class="b" id="devbadge">×' + D.speed + '</span></button><div id="devpanel" hidden></div><div id="devscreen" hidden></div><div id="devbots"></div>';
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);
    document.getElementById('devfab').onclick = function () { var p = document.getElementById('devpanel'); p.hidden = !p.hidden; renderPanel(); };
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-dev]'); if (!t) {
        var a = e.target.closest && e.target.closest('a[href]');
        if (a && /(^|\/)(index|en)\.html/.test(a.getAttribute('href') || '')) { e.preventDefault(); location.href = window.__DEV_HUB; }
        return;
      }
      var k = t.dataset.dev, v = t.dataset.v;
      if (k === 'close') document.getElementById('devpanel').hidden = true;
      else if (k === 'speed') { setSpeed(+v); document.getElementById('devbadge').textContent = '×' + v; renderPanel(); }
      else if (k === 'add') spawnBots(+v);
      else if (k === 'see') { document.getElementById('devpanel').hidden = true; openScreen(+v); }
      else if (k === 'noscreen') closeScreen();
      else if (k === 'hub') location.href = window.__DEV_HUB;
      else if (k === 'restart') location.href = location.pathname.split('/').pop() + '?dev=1&bots=' + D.botsWanted + '&speed=' + D.speed + (D.auto ? '&auto=1' : '');
      else if (k === 'auto') { D.auto = t.checked; }
    }, true);
    setInterval(function () {
      if (!D.bots.length && ctx.code() && ctx.me()) spawnBots(D.botsWanted);
      lobbyAssist();
      var p = document.getElementById('devpanel'); if (p && !p.hidden && !p.contains(document.activeElement)) renderPanel();
    }, 1000);
    setInterval(tick, 200);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
