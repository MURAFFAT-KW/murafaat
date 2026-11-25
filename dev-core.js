/* أقنعني — نسخة المطوّر
   تشتغل بس إذا الرابط فيه ?dev=1. كل شي محلي على الجهاز:
   قاعدة بيانات بالذاكرة، بوتات داخل إطارات مخفية، تسريع الوقت، ولوحة مطوّر.
   ما تلمس Firebase ولا التخزين الحقيقي للمتصفح. */
(function () {
  'use strict';
  var qs = new URLSearchParams(location.search);
  if (!qs.has('dev')) return;
  var isBot = qs.has('bot');
  /* بالمعاين: الحالة تعيش في صفحة المعاين (الأب) عشان نقدر نعيد تحميل اللعبة على أي شاشة محفوظة */
  var SHELL = null; try { if (!isBot && qs.get('inspect') && window.parent !== window && window.parent.__AQ_SHELL) SHELL = window.parent; } catch (e) { }
  var TOPW = isBot ? window.parent : (SHELL || window);
  var file = (location.pathname.split('/').pop() || '').replace('.html', '');
  var EN = /-en$/.test(file) || file === 'en';
  var GAMEKEY = file.replace(/-en$/, '');
  var PREFIX = { murafaat: 'rooms', mazad: 'mazad', nadik: 'nadik', azyaa: 'azyaa', aqar: 'aqar' }[GAMEKEY];

  /* ---------- الحالة المشتركة (في نافذة المضيف) ---------- */
  var realNow = Date.now.bind(Date);
  if (!isBot && !(SHELL && SHELL.__DEV)) {
    TOPW.__DEV = {
      store: {}, subs: [], speed: +(qs.get('speed') || 1), rA: realNow(), vA: realNow(),
      auto: qs.get('auto') === '1' || qs.get('inspect') === '1', inspect: qs.get('inspect'), freeze: false, botsWanted: Math.max(1, Math.min(24, +(qs.get('bots') || 3))),
      bots: [], log: [], errors: [], code: null, theme: qs.get('theme') || null, hostOnly: qs.get('hostonly') === '1', en: EN, game: GAMEKEY, prefix: PREFIX, stats: { actions: 0 }
    };
  }
  var D = TOPW.__DEV;
  if (!D) return;
  if (!isBot) { window.__DEV = D; D.bots = []; }

  /* ---------- تخزين وهمي (ما يلمس تخزين المتصفح الحقيقي) ---------- */
  function memStore() {
    var m = {};
    return {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(m, k) ? m[k] : null; },
      setItem: function (k, v) { m[k] = String(v); },
      removeItem: function (k) { delete m[k]; },
      clear: function () { m = {}; },
      key: function (i) { return Object.keys(m)[i] || null; },
      _dump: function () { return JSON.parse(JSON.stringify(m)); },
      _load: function (o) { m = JSON.parse(JSON.stringify(o || {})); },
      get length() { return Object.keys(m).length; }
    };
  }
  var LS_ = memStore(), SS_ = memStore();
  try { Object.defineProperty(window, 'localStorage', { configurable: true, value: LS_ }); } catch (e) { }
  try { Object.defineProperty(window, 'sessionStorage', { configurable: true, value: SS_ }); } catch (e) { }
  /* المعاين: كل نافذة تسجّل تخزينها عشان نرجّعه لما ننتقل لشاشة محفوظة */
  D.lsReg = D.lsReg || {};
  var ROLE = isBot ? 'bot' + qs.get('bot') : 'host';
  if (D.lsInit && D.lsInit[ROLE]) { LS_._load(D.lsInit[ROLE].l); SS_._load(D.lsInit[ROLE].s); }
  if (D.theme) LS_.setItem('aqnieni.theme', D.theme);
  D.lsReg[ROLE] = { l: LS_, s: SS_, w: window };
  if (EN) window.localStorage.setItem('aqnieni.lang', 'en');

  /* ---------- الوقت (مع التسريع) ---------- */
  Date.now = function () { return Math.round(D.vA + (realNow() - D.rA) * D.speed); };
  function setSpeed(s) { D.vA = Date.now(); D.rA = realNow(); D.speed = s; }

  /* ---------- منع Firebase وقاعدة بيانات محلية ---------- */
  try { Object.defineProperty(window, 'firebase', { configurable: false, writable: false, value: undefined }); } catch (e) { }
  /* نوقف ملفات Firebase الخارجية قبل لا تشتغل: كانت تنكسر (لأن firebase مقفول) وتطلع «Script error.» مع كل شاشة */
  try {
    var killFb = function (n) { if (n && n.tagName === 'SCRIPT' && /gstatic\.com\/firebasejs/.test(n.src || '')) { n.type = 'javascript/blocked'; n.removeAttribute('src'); } };
    var fbObs = new MutationObserver(function (ms) { ms.forEach(function (m) { Array.prototype.forEach.call(m.addedNodes || [], killFb); }); });
    fbObs.observe(document.documentElement, { childList: true, subtree: true });
    document.addEventListener('DOMContentLoaded', function () { fbObs.disconnect(); });
  } catch (e) { }
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
  function snapNow() { return D.snaps ? (D.done ? (D.cur == null ? -1 : D.cur) : D.snaps.length - 1) : -1; }
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
            D.toasts = D.toasts || []; D.toasts.push({ t: realNow(), who: WHO, m: t, s: snapNow() }); if (D.toasts.length > 200) D.toasts.shift();
          });
        });
      }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    } catch (e) { }
  }
  if (document.body) watchToasts(); else document.addEventListener('DOMContentLoaded', watchToasts);
  window.addEventListener('error', function (e) {
    /* «Script error.» بدون ملف ولا سطر = سكربت من موقع ثاني (Firebase) واحنا قاصدين نوقفه بنسخة المطوّر، مو خطأ باللعبة */
    if ((/^Script error\.?$/i.test(e.message || '') && !e.lineno) || /gstatic\.com\/firebasejs/.test(e.filename || '')) return;
    D.errors.push({ t: realNow(), who: WHO, s: snapNow(), m: (e.message || 'خطأ') + (e.lineno ? ' @' + e.lineno : '') + (e.filename ? ' ' + e.filename.split('/').pop().split('?')[0] : '') }); });
  window.addEventListener('unhandledrejection', function (e) { D.errors.push({ t: realNow(), who: WHO, s: snapNow(), m: 'promise: ' + (e.reason && e.reason.message || e.reason) }); });

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
      var mine = ps.find(function (p) { return BOT_NAMES.indexOf(p.name) < 0 && !/^bot/.test(p.id); });
      if (mine) return mine;
      /* مضيف بس (ما يلعب): مو موجود بقائمة اللاعبين، بس هو اللي يتحكم */
      var st = g.settings || {};
      if (g.host && (st.hostPlays === 0 || st.hostPlays === false || st.hostPlays === '0') && ctx.code()) return { id: g.host, name: ctx.myName, hostOnly: true };
      return null;
    },
    isHost: function () { var g = ctx.G(), m = ctx.me(); return !!(g && m && g.host === m.id); },
    rnd: function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); },
    pick: function (a) { return a[Math.floor(Math.random() * a.length)]; },
    shuffle: function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; },
    log: log, text: function () { return txt(document.body); }
  };
  window.__DEV_CTX = ctx;

  var BOT_NAMES = EN ? ['Bot Sara', 'Bot Fahad', 'Bot Noura', 'Bot Khalid', 'Bot Dana', 'Bot Yousef', 'Bot Mariam', 'Bot Ali', 'Bot Hessa', 'Bot Omar', 'Bot Lulwa', 'Bot Bader', 'Bot Shahad', 'Bot Faisal', 'Bot Reem', 'Bot Nasser', 'Bot Ghala', 'Bot Saud', 'Bot Jana', 'Bot Turki', 'Bot Hind', 'Bot Majed', 'Bot Ruba', 'Bot Hamad']
    : ['بوت سارة', 'بوت فهد', 'بوت نورة', 'بوت خالد', 'بوت دانة', 'بوت يوسف', 'بوت مريم', 'بوت علي', 'بوت حصة', 'بوت عمر', 'بوت لولوة', 'بوت بدر', 'بوت شهد', 'بوت فيصل', 'بوت ريم', 'بوت ناصر', 'بوت غلا', 'بوت سعود', 'بوت جنى', 'بوت تركي', 'بوت هند', 'بوت ماجد', 'بوت ربى', 'بوت حمد'];

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
    if (D.freeze) return;
    var auto = isBot || D.auto;
    if (!auto) return;
    var think = isBot ? 650 : 750;
    if (realNow() - lastAct < think / Math.max(1, Math.min(4, D.speed))) return;
    var r = null;
    try {
      r = common();
      if (!r) {
        var brain = (window.__DEV_BRAINS || (isBot ? TOPW.__DEV_BRAINS : null) || {})[GAMEKEY];
        if (brain) r = brain(ctx, isBot);
      }
    } catch (e) { D.errors.push({ t: realNow(), who: WHO, s: snapNow(), m: 'bot: ' + (e && e.message) }); }
    if (r) { lastAct = realNow(); if (typeof r === 'string' && r.charAt(0) !== '.') log(r); }
  }

  /* المعاين: حالة الشاشة المحلية (مثل «المزايا / عقاراتك») عشان ترجع نفس الشاشة بالضبط */
  var UI_SKIP = { splash: 1, ready: 1, notice: 1, lastKey: 1, lastHtml: 1, offline: 1, err: 1, modal: 1, view: 1, code: 1, fromLink: 1 };
  function uiOf(w) {
    try { var u = w.eval('typeof U !== "undefined" ? U : null'); if (!u) return null; var o = {}; Object.keys(u).forEach(function (k) { if (UI_SKIP[k]) return; var v = u[k]; if (typeof v === 'function') return; try { o[k] = JSON.parse(JSON.stringify(v)); } catch (e) { } }); return o; } catch (e) { return null; }
  }
  if (D.inspect && D.done && D.lsInit && D.lsInit[ROLE] && D.lsInit[ROLE].u) {
    var uiSaved = D.lsInit[ROLE].u, uiN = 0, uiT = setInterval(function () {
      if (++uiN > 60) return clearInterval(uiT);
      try {
        var ok = window.eval('typeof U !== "undefined" && U.ready && typeof G !== "undefined" && !!G && !U.splash');
        if (!ok) return; clearInterval(uiT);
        var u = window.eval('U'); Object.keys(uiSaved).forEach(function (k) { u[k] = uiSaved[k]; });
        window.eval('typeof render === "function" && render()');
      } catch (e) { clearInterval(uiT); }
    }, 100);
  }
  /* المعاين: بعد الانتقال لشاشة محفوظة، نتخطى صفحة التعريف لو طلعت (بعض الألعاب تعرضها بعد إعادة التحميل) */
  if (D.inspect && D.done) {
    var skipN = 0, skipT = setInterval(function () { if (++skipN > 40) return clearInterval(skipT); var e = document.querySelector('[data-act="enter"]'); if (e && vis(e)) { e.click(); clearInterval(skipT); } }, 100);
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
    if (D.freeze) return;
    var g = ctx.G(); if (!g || g.phase !== 'lobby' || !ctx.isHost()) return;
    var st = g.settings || {}, hp = !(st.hostPlays === false || st.hostPlays === 0 || st.hostPlays === '0');
    if (hp && D.hostOnly) { var ho = ctx.$('[data-k="hostPlays"][data-v="0"]'); if (ho && vis(ho)) { ho.click(); return; } }
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
      if (!D.bots.length && D.inspect !== 'start' && ctx.code() && ctx.me()) spawnBots(D.botsWanted);
      lobbyAssist();
      var p = document.getElementById('devpanel'); if (p && !p.hidden && !p.contains(document.activeElement)) renderPanel();
    }, 1000);
    setInterval(tick, 200);
    if (D.inspect) inspectBoot();
  }

  /* ---------- المعاين: يسجّل كل شاشة وقت ما البوتات يلعبون، وبعدين تتنقل بينها ---------- */
  function headOf(doc) {
    try {
      var l = doc.querySelectorAll('h1:not(.sr),h2,h3,.ptitle,.hname');
      for (var i = 0; i < l.length; i++) { var e = l[i]; if (!e.offsetParent && e.getClientRects().length === 0) continue; var t = (e.innerText || '').replace(/\s+/g, ' ').trim(); if (t) return t.slice(0, 80); }
    } catch (e) { }
    return '';
  }
  /* ---------- الألبوم: صورة ثابتة من كل شاشة + فحص تلقائي للمشاكل ---------- */
  function poolId(str) {
    D.pool = D.pool || []; D.poolMap = D.poolMap || {};
    if (D.poolMap[str] == null) { D.poolMap[str] = D.pool.length; D.pool.push(str); }
    return D.poolMap[str];
  }
  function describe(e) {
    var t = (e.innerText || e.textContent || e.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 40);
    var tag = e.tagName.toLowerCase();
    var nm = { button: EN ? 'button' : 'زر', input: EN ? 'input' : 'خانة', img: EN ? 'image' : 'صورة', svg: EN ? 'drawing' : 'رسمة', table: EN ? 'table' : 'جدول' }[tag] || (EN ? 'box' : 'مربع');
    return nm + (t ? ' «' + t + '»' : '');
  }
  function checks(w) {
    var out = [], d = w.document, b = d.body; if (!b) return out;
    var W = w.innerWidth, txtAll = b.innerText || '';
    var m = txtAll.match(/(^|[^A-Za-z_])(undefined|NaN|\[object Object\]|null|Infinity)(?![A-Za-z_])/);
    if (m) { var at = m.index, sn = txtAll.slice(Math.max(0, at - 25), at + m[0].length + 25).replace(/\s+/g, ' ').trim(); out.push({ lv: 'r', m: (EN ? 'Broken text shown: “' : 'نص مكسور يبين للاعب: «') + m[2] + (EN ? '”' : '»'), d: sn }); }
    if (EN) {
      var ar = txtAll.replace(/(^|\s)عربي(?=\s|$)/g, ' ').match(/[\u0600-\u06FF][\u0600-\u06FF\s،]{2,}/);
      if (ar && !/^(بوت|أنا)/.test(ar[0].trim())) { var tx2 = txtAll.replace(/(^|\s)عربي(?=\s|$)/g, ' '), ai = ar.index; out.push({ lv: 'o', m: 'Arabic text on the English page', d: tx2.slice(Math.max(0, ai - 20), ai + ar[0].length + 20).replace(/\s+/g, ' ').trim() }); }
    }
    var cache = new Map();
    function cs(e) { var c = cache.get(e); if (!c) { c = w.getComputedStyle(e); cache.set(e, c); } return c; }
    function hiddenOrClipped(e) {
      for (var p = e; p && p !== b && p !== d.documentElement; p = p.parentElement) {
        var c = cs(p);
        if (c.visibility === 'hidden' || c.display === 'none' || +c.opacity === 0) return true;
        if (p !== e && c.overflowX !== 'visible') return true;
        if (c.position === 'fixed') return false;
      }
      return false;
    }
    var els = b.getElementsByTagName('*'), found = [];
    for (var i = 0; i < els.length && i < 5000 && found.length < 3; i++) {
      var e = els[i];
      if (e.id === 'devbots' || e.id === 'devpanel' || e.id === 'devscreen' || e.id === 'devfab') { i += e.getElementsByTagName('*').length; continue; }
      var r = e.getBoundingClientRect(); if (r.width < 2 || r.height < 2) continue;
      if (r.right <= W + 3 && r.left >= -3) continue;
      if (found.some(function (f) { return f.contains(e); })) continue;
      if (hiddenOrClipped(e)) continue;
      if (r.left >= W || r.right <= 0) continue; /* مخفي بالكامل برا الشاشة (قائمة منزلقة مثلًا) */
      found.push(e);
    }
    found.forEach(function (e) { out.push({ lv: 'o', m: (EN ? 'Sticks out of the screen: ' : 'طالع برا حدود الشاشة: ') + describe(e) }); });
    if (!found.length && d.documentElement.scrollWidth > W + 3 && cs(d.documentElement).overflowX !== 'hidden' && cs(b).overflowX !== 'hidden') out.push({ lv: 'o', m: EN ? 'Page is wider than the screen (scrolls sideways)' : 'الصفحة أعرض من الشاشة (تتحرك يمين ويسار)' });
    Array.prototype.forEach.call(d.images, function (im) { if (im.getAttribute('src') && im.complete && !im.naturalWidth && !im.closest('#devbots')) out.push({ lv: 'o', m: (EN ? 'Image failed to load: ' : 'صورة ما تحملت: ') + (im.getAttribute('src') || '').slice(0, 50) }); });
    if (txtAll.replace(/\s/g, '').length < 2 && !b.querySelector('img,svg,canvas')) out.push({ lv: 'o', m: EN ? 'Empty screen' : 'الشاشة فاضية' });
    return out;
  }
  function capture(w) {
    try {
      var d = w.document; if (!d || !d.documentElement || !d.body) return null;
      var issues = checks(w);
      var cl = d.documentElement.cloneNode(true);
      var a = d.querySelectorAll('input,textarea,select'), c2 = cl.querySelectorAll('input,textarea,select');
      for (var i = 0; i < a.length && i < c2.length; i++) {
        var x = a[i], y = c2[i]; if (x.tagName !== y.tagName) continue;
        if (x.tagName === 'TEXTAREA') y.textContent = x.value;
        else if (x.tagName === 'SELECT') Array.prototype.forEach.call(y.options, function (o, k) { if (k === x.selectedIndex) o.setAttribute('selected', ''); else o.removeAttribute('selected'); });
        else if (x.type === 'checkbox' || x.type === 'radio') { if (x.checked) y.setAttribute('checked', ''); else y.removeAttribute('checked'); }
        else y.setAttribute('value', x.value);
      }
      var ca = d.querySelectorAll('canvas'), cb = cl.querySelectorAll('canvas');
      for (var j = 0; j < ca.length && j < cb.length; j++) {
        try { var im = d.createElement('img'), rr = ca[j].getBoundingClientRect(); im.src = ca[j].toDataURL(); im.className = ca[j].className; im.setAttribute('style', (ca[j].getAttribute('style') || '') + ';width:' + rr.width + 'px;height:' + rr.height + 'px'); cb[j].parentNode.replaceChild(im, cb[j]); } catch (e) { }
      }
      Array.prototype.forEach.call(cl.querySelectorAll('script,noscript,iframe,#devfab,#devpanel,#devscreen,#devbots,link[rel=manifest]'), function (n) { n.parentNode && n.parentNode.removeChild(n); });
      Array.prototype.forEach.call(cl.querySelectorAll('[autofocus]'), function (n) { n.removeAttribute('autofocus'); });
      var head = cl.querySelector('head');
      if (head) { var base = d.createElement('base'); base.href = w.location.href.split('#')[0]; head.insertBefore(base, head.firstChild); }
      Array.prototype.forEach.call(cl.querySelectorAll('style'), function (st) { var id = poolId(st.textContent); st.textContent = ''; st.setAttribute('data-p', id); });
      var html = '<!DOCTYPE html>' + cl.outerHTML;
      html = html.replace(/(src|href)="(data:[^"]{1500,})"/g, function (_, at, v) { return at + '="aq-pool:' + poolId(v) + '"'; });
      return { html: html, sy: w.scrollY || 0, issues: issues, W: w.innerWidth, H: w.innerHeight };
    } catch (e) { return null; }
  }
  function captureAll() {
    var v = [{ k: 'host', name: EN ? 'Me (host)' : 'أنا (المضيف)', c: capture(window) }];
    D.bots.forEach(function (b) { var w = null; try { w = b.frame.contentWindow; } catch (e) { } v.push({ k: b.k, name: b.name, c: w ? capture(w) : null }); });
    return v;
  }
  function mergeViews(old, nu) {
    if (!old) return nu;
    nu.forEach(function (v) {
      var o = old.find(function (x) { return x.k === v.k; }); if (!o || !o.c || !v.c) return;
      o.c.issues.forEach(function (is) { if (is.lv === 'r' && !v.c.issues.some(function (z) { return z.m === is.m; })) v.c.issues.push(is); });
    });
    return nu;
  }

  function inspectBoot() {
    document.documentElement.classList.add('dev-inspect');
    var st = document.createElement('style');
    st.textContent = '.dev-inspect #devfab{display:none!important}.dev-inspect #devbots.show{left:0!important;top:0!important;transform:none!important;width:100%!important;height:100%!important;border-radius:0!important;box-shadow:none!important}.dev-inspect #devbots.show iframe{width:100%!important;height:100%!important}';
    document.head.appendChild(st);
    if (!D.snaps) { D.snaps = []; D.recording = D.inspect === '1'; D.done = !D.recording; D.started = realNow(); D.seen = {}; D.lastKey = ''; D.finalAt = 0; D.view = 'host'; }
    var I = window.__INSPECT = { get snaps() { return D.snaps; }, get recording() { return D.recording; }, get done() { return D.done; }, get cur() { return D.cur; }, get view() { return D.view; }, get timeRuns() { return !!D.timeRuns; } };
    function dumpLS() { var o = {}; Object.keys(D.lsReg).forEach(function (k) { o[k] = { l: D.lsReg[k].l._dump(), s: D.lsReg[k].s._dump(), u: uiOf(D.lsReg[k].w) }; }); return o; }
    function rec() {
      if (!D.recording) return;
      var g = ctx.G() || { phase: 'start' };
      var title = headOf(document);
      if (!title) for (var i = 0; i < D.bots.length && !title; i++) { try { title = headOf(D.bots[i].frame.contentDocument); } catch (e) { } }
      var raw = JSON.stringify(D.store);
      if (raw + '#' + title !== I._raw) { I._raw = raw + '#' + title; I._rawT = realNow(); return; }
      if (realNow() - I._rawT < 130) return;
      var key = (g.phase || '') + '|' + title.replace(/[0-9\u0660-\u0669]+/g, '#');
      var cur = D.snaps[D.snaps.length - 1];
      if (key === D.lastKey) { if (cur && cur.key === key && !cur.locked) { cur.store = raw; cur.ls = dumpLS(); cur.vnow = Date.now(); cur.title = title; cur.views = mergeViews(cur.views, captureAll()); } }
      else {
        if (cur) cur.locked = true;
        if (!D.seen[key]) { D.seen[key] = 1; D.snaps.push({ key: key, phase: g.phase || '', round: g.round || g.season || null, title: title, store: raw, ls: dumpLS(), vnow: Date.now(), views: captureAll() }); }
      }
      D.lastKey = key;
      if (g.phase === 'final') { if (!D.finalAt) D.finalAt = realNow(); else if (realNow() - D.finalAt > 2500) { D.endReason = 'final'; stop(); } }
      if (realNow() - D.started > 240000) { D.endReason = 'timeout'; stop(); }
    }
    function stop() { if (!D.recording) return; if (!D.endReason) D.endReason = 'stopped'; D.recMs = realNow() - D.started; D.recording = false; D.done = true; D.freeze = true; D.auto = false; if (D.snaps.length) I.jump(D.snaps.length - 1); }
    I.stop = stop;
    /* الانتقال: نرجّع قاعدة البيانات وتخزين كل لاعب مثل ما كانت، ونعيد تحميل اللعبة */
    I.jump = function (i) {
      var sn = D.snaps[i]; if (!sn) return;
      D.freeze = true; D.cur = i;
      var o = JSON.parse(sn.store); Object.keys(D.store).forEach(function (k) { delete D.store[k]; }); Object.keys(o).forEach(function (k) { D.store[k] = o[k]; });
      D.lsInit = sn.ls; D.vA = sn.vnow; D.rA = realNow(); D.speed = D.timeRuns ? 1 : 0;
      D.subs = [];
      /* المضيف يرجع من تخزينه (بدون رابط دعوة) عشان ما ينحسب ضيف */
      location.replace(location.pathname + location.search);
    };
    I.setTime = function (on) { D.timeRuns = !!on; D.vA = Date.now(); D.rA = realNow(); D.speed = on ? 1 : 0; };
    I.setTheme = function (v) { D.theme = v; Object.keys(D.lsReg).forEach(function (k) { try { var w = D.lsReg[k].w; w.AQTHEME && w.AQTHEME.set(v); } catch (e) { } }); };
    I.players = function () { return D.bots.map(function (b) { return { k: b.k, name: b.name }; }); };
    I.show = function (v) {
      D.view = v; var box = document.getElementById('devbots');
      if (v === 'host') { box.classList.remove('show'); D.bots.forEach(function (x) { x.frame.classList.remove('top'); }); return; }
      D.bots.forEach(function (x) { x.frame.classList.toggle('top', x.k === v); }); box.style.removeProperty('--sc'); box.classList.add('show');
    };
    I.errors = function () { return D.errors.slice(); };
    I.toasts = function () { return (D.toasts || []).slice(); };
    I.pool = function () { return D.pool || []; };
    I.endReason = function () { return D.endReason || null; };
    I.recMs = function () { return D.recMs || 0; };
    I.code = function () { return ctx.code(); };
    I.G = function () { return ctx.G(); };
    setInterval(rec, 45);
    /* بعد إعادة التحميل: نرجع لنفس وجهة النظر أول ما تدخل البوتات */
    setInterval(function () { if (D.view !== 'host' && D.bots.some(function (b) { return b.k === D.view; })) { var box = document.getElementById('devbots'); if (!box.classList.contains('show')) I.show(D.view); } }, 300);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
