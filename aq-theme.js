/* أقنعني — الوضع الصباحي والمسائي لكل الصفحات.
   يمشي مع إعداد التلفون تلقائيًا، والزر ☀️/🌙 بصفحة الألعاب يثبّت اختيارك.
   الفكرة: بدل ما نكتب ألوان مسائية لكل لعبة، الملف يقرا ألوان الصفحة ويقلب الفاتح لغامق والغامق لفاتح،
   ويخلي ألوان الألعاب الأساسية (الأحمر والأزرق والأصفر...) مثل ما هي. فأي لعبة جديدة تشتغل معاه بدون تعديل. */
(function () {
  'use strict';
  if (window.AQTHEME) return;
  var KEY = 'aqnieni.theme', root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function pref() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function isDark() { var p = pref(); if (p === 'dark') return true; if (p === 'light') return false; return !!(mq && mq.matches); }

  /* ---------- تحويل الألوان ---------- */
  function parse(c) {
    c = String(c).trim();
    var m = c.match(/^#([0-9a-f]{3,8})$/i);
    if (m) {
      var h = m[1]; if (h.length <= 4) h = h.split('').map(function (x) { return x + x; }).join('');
      return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1 };
    }
    m = c.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+%?))?\s*\)$/i);
    if (m) { var a = m[4] == null ? 1 : (/%$/.test(m[4]) ? parseFloat(m[4]) / 100 : +m[4]); return { r: +m[1], g: +m[2], b: +m[3], a: a }; }
    if (/^white$/i.test(c)) return { r: 255, g: 255, b: 255, a: 1 };
    if (/^black$/i.test(c)) return { r: 0, g: 0, b: 0, a: 1 };
    return null;
  }
  function toHsl(o) {
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, h = 0, s = 0;
    if (mx !== mn) { var d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h /= 6; }
    return { h: h, s: s, l: l };
  }
  function css(h, s, l, a) {
    function f(n) { var k = (n + h * 12) % 12, x = s * Math.min(l, 1 - l); return Math.round(255 * (l - x * Math.max(-1, Math.min(k - 3, 9 - k, 1)))); }
    return a < 1 ? 'rgba(' + f(0) + ',' + f(8) + ',' + f(4) + ',' + (+a.toFixed(3)) + ')' : 'rgb(' + f(0) + ',' + f(8) + ',' + f(4) + ')';
  }
  // role: bg (خلفيات)، fg (نصوص)، line (حدود)
  function map(c, role) {
    var o = parse(c); if (!o) return null;
    var x = toHsl(o), h = x.h, s = x.s, l = x.l;
    if (role === 'bg') {
      if (l < 0.82 || o.a < 0.6) return null;                      // اللمعات الشفافة فوق ألوان اللعبة تظل                                    // ألوان اللعبة الأساسية تظل مثل ما هي
      var nl = 0.105 + (1 - l) * 0.75;                              // الأبيض يصير كحلي غامق، والفاتح الملوّن يصير غامق بنفس لونه
      return css(s < 0.08 ? 0.61 : h, s < 0.08 ? 0.32 : Math.min(0.45, s * 0.5), nl, o.a);
    }
    if (role === 'line') {
      if (l < 0.7) return null;
      return css(s < 0.08 ? 0.61 : h, s < 0.08 ? 0.25 : Math.min(0.4, s * 0.5), 0.24 + (1 - l) * 0.3, o.a);
    }
    // fg
    if (l > 0.55) return null;                                      // النص الفاتح (مثل الأبيض على الأزرار) يظل
    if (s < 0.35) return css(h, Math.min(s, 0.2), l < 0.3 ? 0.9 : 0.72, o.a); // الكحلي/الرمادي يصير فاتح
    return css(h, Math.min(1, s), Math.max(0.66, 1 - l * 0.55), o.a);        // النص الملوّن الغامق يفتح شوي عشان يبين
  }
  function mapValue(v, role) {
    if (!v || /var\(|url\(/.test(v) && !/#|rgb/i.test(v)) return null;
    var changed = false;
    var out = v.replace(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|\bwhite\b|\bblack\b/gi, function (m) { var r = map(m, role); if (r) { changed = true; return r; } return m; });
    return changed ? out : null;
  }
  var PROPS = { 'background-color': 'bg', 'background-image': 'bg', 'color': 'fg', 'border-top-color': 'line', 'border-right-color': 'line', 'border-bottom-color': 'line', 'border-left-color': 'line', 'outline-color': 'line', 'caret-color': 'fg' };
  function roleOfVar(name, val) {
    if (/text|ink|mut|fg|txt/i.test(name)) return 'fg';
    if (/line|border|stroke/i.test(name)) return 'line';
    return 'bg';
  }

  /* ---------- ورقة الألوان المسائية ---------- */
  function splitSel(sel) {
    var out = [], depth = 0, cur = '';
    for (var i = 0; i < sel.length; i++) { var ch = sel[i]; if (ch === '(') depth++; else if (ch === ')') depth--; if (ch === ',' && !depth) { out.push(cur); cur = ''; } else cur += ch; }
    out.push(cur); return out.map(function (x) { return x.trim(); }).filter(Boolean);
  }
  function prefix(sel) {
    return splitSel(sel).map(function (p) {
      if (/^(:root|html)\b/.test(p)) return 'html.aq-dark' + p.replace(/^(:root|html)/, '');
      return 'html.aq-dark ' + p;
    }).join(',');
  }
  function ruleText(rule) {
    var st = rule.style, decl = [];
    for (var i = 0; i < st.length; i++) {
      var p = st[i], v = st.getPropertyValue(p), r;
      if (p.indexOf('--') === 0) { r = mapValue(v, roleOfVar(p, v)); if (r) decl.push(p + ':' + r); continue; }
      var role = PROPS[p]; if (!role) continue;
      // خلفية بلون النص الغامق (مثل التنبيهات وزر الإنهاء): تصير كحلي فاتح شوي، مو أبيض
      if (role !== 'fg' && /var\(--(ink|text)\)/.test(v)) { decl.push(p + ':#33405F !important'); continue; }
      r = mapValue(v, role); if (r) decl.push(p + ':' + r + ' !important');
    }
    return decl.length ? prefix(rule.selectorText) + '{' + decl.join(';') + '}' : '';
  }
  function walk(rules, out) {
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      if (r.type === 1 && r.selectorText) { var t = ruleText(r); if (t) out.push(t); }
      else if (r.type === 4 && r.cssRules) { var inner = []; walk(r.cssRules, inner); if (inner.length) out.push('@media ' + r.media.mediaText + '{' + inner.join('') + '}'); }
      else if (r.cssRules && r.type !== 7) { walk(r.cssRules, out); }
    }
  }
  var BASE = 'html.aq-dark{color-scheme:dark;background:#0F1626}html.aq-dark body{background-color:#0F1626;color:#E6EBF4}' +
    'html.aq-dark input,html.aq-dark textarea,html.aq-dark select{color:#E6EBF4}html.aq-dark ::placeholder{color:#7F8BA3}' +
    // الشعار: نخلي له خلفية فاتحة خفيفة عشان الكلمة الكحلية تبين
    'html.aq-dark .fulllogo,html.aq-dark .aqlogo,html.aq-dark img[src*="logo"],html.aq-dark .brand svg{filter:drop-shadow(0 0 1px rgba(255,255,255,.55)) drop-shadow(0 0 10px rgba(255,255,255,.12))}';
  var built = '', styleEl = null, seen = 0;
  function build() {
    if (!root.classList.contains('aq-dark')) return;
    var out = [BASE], n = 0;
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sh = document.styleSheets[i];
      if (sh.ownerNode === styleEl) continue;
      var rules; try { rules = sh.cssRules; } catch (e) { continue; }
      if (!rules) continue; n += rules.length; walk(rules, out);
    }
    var txt = out.join('\n');
    if (!styleEl) { styleEl = document.createElement('style'); styleEl.id = 'aq-theme-dark'; }
    if (txt !== built) { built = txt; styleEl.textContent = txt; }
    if (!styleEl.parentNode || styleEl !== document.head.lastElementChild) document.head.appendChild(styleEl);
    seen = document.styleSheets.length;
  }
  /* الألوان المكتوبة داخل العناصر نفسها (style="...") */
  function fixInline(el) {
    if (!el || el.nodeType !== 1 || !el.getAttribute) return;
    if (el.closest && el.closest('svg')) return;
    var s = el.getAttribute('style'); if (!s || !/#|rgb|white/i.test(s)) return;
    if (el.__aqOrig == null || el.__aqLast !== s) { el.__aqOrig = s; }
    var out = s.replace(/(^|;)\s*(background(?:-color)?|color|border(?:-[a-z]+)?-color|border(?:-(?:top|right|bottom|left))?)\s*:\s*([^;]+)/gi, function (m, pre, prop, val) {
      var p = prop.toLowerCase(), role = p === 'color' ? 'fg' : (p.indexOf('border') === 0 ? 'line' : 'bg');
      var r = mapValue(val, role); return r ? pre + prop + ':' + r : m;
    });
    if (out !== s) { el.__aqLast = out; el.setAttribute('style', out); }
  }
  function fixTree(n) { if (!root.classList.contains('aq-dark') || !n || n.nodeType !== 1) return; fixInline(n); if (n.querySelectorAll) { var l = n.querySelectorAll('[style]'); for (var i = 0; i < l.length; i++) fixInline(l[i]); } }
  var mo = null;
  function watch() {
    if (mo || !window.MutationObserver) return;
    mo = new MutationObserver(function (ms) {
      if (!root.classList.contains('aq-dark')) return;
      var restyle = false;
      ms.forEach(function (m) {
        if (m.type === 'childList') m.addedNodes.forEach(function (n) { if (n.nodeName === 'STYLE' || n.nodeName === 'LINK') restyle = true; else fixTree(n); });
        else if (m.type === 'attributes' && m.target.__aqLast !== m.target.getAttribute('style')) fixInline(m.target);
      });
      if (restyle || document.styleSheets.length !== seen) build();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
  }
  function themeMeta(d) {
    var m = document.querySelector('meta[name="theme-color"]');
    if (!m) { m = document.createElement('meta'); m.name = 'theme-color'; (document.head || root).appendChild(m); }
    m.content = d ? '#0F1626' : '#FFFFFF';
  }
  function apply() {
    var d = isDark();
    root.classList.toggle('aq-dark', d);
    themeMeta(d);
    if (d) { build(); watch(); if (document.body) fixTree(document.body); }
    else if (styleEl && styleEl.parentNode) { /* نخلي الورقة؛ ما تشتغل إلا مع .aq-dark */ }
    try { window.dispatchEvent(new CustomEvent('aqtheme', { detail: { dark: d } })); } catch (e) { }
  }
  window.AQTHEME = {
    dark: isDark,
    set: function (v) { try { if (v) localStorage.setItem(KEY, v); else localStorage.removeItem(KEY); } catch (e) { } apply(); },
    toggle: function () { this.set(isDark() ? 'light' : 'dark'); },
    rebuild: function () { built = ''; build(); }
  };
  if (mq) { var on = function () { if (!pref() || pref() === 'auto') apply(); }; if (mq.addEventListener) mq.addEventListener('change', on); else if (mq.addListener) mq.addListener(on); }
  // نطبق على طول (قبل ما تنرسم الصفحة) عشان ما يطلع وميض أبيض
  root.classList.toggle('aq-dark', isDark());
  if (isDark()) { var s0 = document.createElement('style'); s0.textContent = BASE; (document.head || root).appendChild(s0); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
  window.addEventListener('load', function () { if (isDark()) build(); });
  window.addEventListener('storage', function (e) { if (e.key === KEY) apply(); });
})();
