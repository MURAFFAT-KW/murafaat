/* أقنعني — مشاهد المسرح الفخمة للمنصة والمزاد (نفس مستوى العقار والأزياء والرئيس).
   AQ_STAGE.manassa()  → قاعة مناظرة: منصتين بمايكات، شاشة السؤال، ستاير، سبوت لايت، جمهور.
   AQ_STAGE.mazad(art) → قاعة مزاد: ستارة مخمل، منصة رخام لامعة عليها المنتج (أو صندوق هدية فخم)، مطرقة، جمهور بلوحات أرقام. */
(function () {
  'use strict';
  var N = 0;
  function K() {
    var id = 's' + (++N), D = [], k = 0;
    var st = function (a) { return a.map(function (s) { return '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"' + (s[2] != null ? ' stop-opacity="' + s[2] + '"' : '') + '/>'; }).join(''); };
    return {
      id: id,
      lg: function (a, x1, y1, x2, y2) { var n = id + 'g' + (++k); D.push('<linearGradient id="' + n + '" x1="' + (x1 || 0) + '" y1="' + (y1 || 0) + '" x2="' + (x2 == null ? 0 : x2) + '" y2="' + (y2 == null ? 1 : y2) + '">' + st(a) + '</linearGradient>'); return 'url(#' + n + ')'; },
      rg: function (a, cx, cy, r) { var n = id + 'g' + (++k); D.push('<radialGradient id="' + n + '" cx="' + (cx == null ? .5 : cx) + '" cy="' + (cy == null ? .5 : cy) + '" r="' + (r || .5) + '">' + st(a) + '</radialGradient>'); return 'url(#' + n + ')'; },
      B: function (d) { var n = id + 'f' + (++k); D.push('<filter id="' + n + '" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="' + d + '"/></filter>'); return 'filter="url(#' + n + ')"'; },
      out: function (body, vb) { return '<svg class="stage-art lux" viewBox="0 0 320 ' + (vb || 150) + '" aria-hidden="true"><defs><clipPath id="' + id + 'c"><rect width="320" height="' + (vb || 150) + '" rx="18"/></clipPath>' + D.join('') + '</defs><g clip-path="url(#' + id + 'c)">' + body + '</g></svg>'; }
    };
  }
  var GOLD = [[0, '#FFF1B8'], [.3, '#E2B33C'], [.55, '#8C6110'], [.75, '#E9C25A'], [1, '#7A5409']];
  /* ستارة مخمل بطيّات */
  function curtain(k, x, w, side, c1, c2) {
    var g = k.lg([[0, c1], [.5, c2], [1, c1]], 0, 0, 1, 0), s = '';
    var n = 4, fw = w / n;
    for (var i = 0; i < n; i++) s += '<path d="M' + (x + i * fw) + ' 0 H' + (x + (i + 1) * fw) + ' V150 Q' + (x + (i + .5) * fw) + ' ' + (side < 0 ? 146 : 146) + ' ' + (x + i * fw) + ' 150Z" fill="' + g + '"/>';
    var hx = side < 0 ? x + w - 6 : x + 6;
    s += '<path d="M' + x + ' 0 H' + (x + w) + ' V14 Q' + (x + w / 2) + ' 22 ' + x + ' 14Z" fill="' + c2 + '" opacity=".9"/>';
    s += '<rect x="' + (hx - 5) + '" y="70" width="10" height="5" rx="2.5" fill="' + k.lg(GOLD, 0, 0, 1, 0) + '"/>';
    return s;
  }
  function crowd(k, y, n, col, x0, x1) {
    var s = '', step = (x1 - x0) / n;
    for (var i = 0; i < n; i++) { var x = x0 + i * step + (i % 2 ? 3 : 0), yy = y + (i % 2 ? 2 : 0), r = 7 + (i % 3); s += '<circle cx="' + x + '" cy="' + (yy - r * 1.4) + '" r="' + (r * .6) + '" fill="' + col + '"/><path d="M' + (x - r) + ' ' + (yy + 8) + ' Q' + (x - r) + ' ' + (yy - r * .7) + ' ' + x + ' ' + (yy - r * .8) + ' Q' + (x + r) + ' ' + (yy - r * .7) + ' ' + (x + r) + ' ' + (yy + 8) + 'Z" fill="' + col + '"/>'; }
    return s;
  }
  function spot(k, x, tx, w, op) { return '<path d="M' + (x - 4) + ' -4 L' + (x + 4) + ' -4 L' + (tx + w) + ' 132 L' + (tx - w) + ' 132Z" fill="' + k.lg([[0, '#FFF6D8', op || .55], [1, '#FFF6D8', 0]]) + '"/>'; }
  function flash(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r * 2.4) + '" fill="#fff" opacity=".35"/><path d="M' + x + ' ' + (y - r * 2) + ' L' + (x + r * .35) + ' ' + (y - r * .35) + ' L' + (x + r * 2) + ' ' + y + ' L' + (x + r * .35) + ' ' + (y + r * .35) + ' L' + x + ' ' + (y + r * 2) + ' L' + (x - r * .35) + ' ' + (y + r * .35) + ' L' + (x - r * 2) + ' ' + y + ' L' + (x - r * .35) + ' ' + (y - r * .35) + 'Z" fill="#fff"/>'; }

  /* ---------- المنصة ---------- */
  function manassa() {
    var k = K(), s = '';
    s += '<rect width="320" height="150" fill="' + k.lg([[0, '#2A0A12'], [.55, '#4A0F1C'], [1, '#14060A']]) + '"/>';
    s += '<rect y="0" width="320" height="104" fill="' + k.rg([[0, '#8A1A2C', .55], [1, '#2A0A12', 0]], .5, .35, .7) + '"/>';
    /* ألواح خشب خلفية */
    for (var i = 0; i < 9; i++) s += '<rect x="' + (44 + i * 26) + '" y="0" width="1" height="104" fill="#000" opacity=".25"/>';
    s += curtain(k, 0, 46, -1, '#7A0614', '#C4122A') + curtain(k, 274, 46, 1, '#7A0614', '#C4122A');
    /* شاشة السؤال */
    s += '<rect x="104" y="10" width="112" height="60" rx="7" fill="#05070C"/><rect x="108" y="14" width="104" height="52" rx="4" fill="' + k.lg([[0, '#1D2E4F'], [1, '#0B1428']]) + '"/>';
    s += '<circle cx="160" cy="40" r="22" fill="#DE0921" opacity=".35" ' + k.B(6) + '/><text x="160" y="54" text-anchor="middle" font-size="40" font-weight="900" fill="' + k.lg([[0, '#FF6B7D'], [1, '#C4071C']]) + '" font-family="Readex Pro,Alexandria,system-ui,sans-serif">?</text>';
    s += '<path d="M108 14 L146 14 L118 66 L108 66Z" fill="#fff" opacity=".06"/><rect x="156" y="70" width="8" height="8" fill="#0B1428"/>';
    /* أرضية المسرح اللامعة */
    s += '<path d="M0 104 H320 V150 H0Z" fill="' + k.lg([[0, '#5A2A18'], [1, '#2A1008']]) + '"/>';
    for (var j = 0; j < 12; j++) s += '<path d="M' + (j * 28 - 10) + ' 104 L' + (j * 34 - 40) + ' 150" stroke="#000" stroke-width=".6" opacity=".3"/>';
    s += '<rect y="104" width="320" height="2" fill="' + k.lg(GOLD, 0, 0, 1, 0) + '" opacity=".7"/>';
    s += spot(k, 70, 68, 34, .5) + spot(k, 250, 252, 34, .5) + spot(k, 160, 160, 26, .35);
    /* منصة */
    var pod = function (x, c1, c2, txt) {
      var g = '';
      g += '<ellipse cx="' + x + '" cy="128" rx="40" ry="6" fill="#000" opacity=".45" ' + k.B(3) + '/>';
      g += '<ellipse cx="' + x + '" cy="130" rx="30" ry="4" fill="' + c1 + '" opacity=".25" ' + k.B(2) + '/>';
      g += '<path d="M' + (x - 30) + ' 66 L' + (x + 30) + ' 66 L' + (x + 24) + ' 126 L' + (x - 24) + ' 126Z" fill="' + k.lg([[0, c1], [1, c2]], 0, 0, 1, 0) + '"/>';
      g += '<path d="M' + (x - 30) + ' 66 L' + (x + 30) + ' 66 L' + (x + 24) + ' 126 L' + (x - 24) + ' 126Z" fill="' + k.lg([[0, '#fff', .25], [.4, '#fff', 0], [1, '#000', .25]], 0, 0, 1, 0) + '"/>';
      g += '<rect x="' + (x - 36) + '" y="60" width="72" height="9" rx="3" fill="' + k.lg([[0, '#E8C9A0'], [1, '#8A5A35']]) + '"/><rect x="' + (x - 36) + '" y="60" width="72" height="2" rx="1" fill="#fff" opacity=".4"/>';
      g += '<rect x="' + (x - 14) + '" y="82" width="28" height="20" rx="3" fill="#fff" opacity=".92"/><text x="' + x + '" y="96" text-anchor="middle" font-size="12" font-weight="900" fill="' + c2 + '" font-family="Readex Pro,Alexandria,system-ui,sans-serif">' + txt + '</text>';
      g += '<rect x="' + (x - 30) + '" y="112" width="60" height="2" fill="' + k.lg(GOLD, 0, 0, 1, 0) + '" opacity=".9"/>';
      /* مايك */
      g += '<path d="M' + (x + 12) + ' 60 Q' + (x + 14) + ' 48 ' + (x + 6) + ' 40" stroke="#1A1A1A" stroke-width="2.2" fill="none"/><rect x="' + (x + 1) + '" y="29" width="9" height="13" rx="4.5" fill="' + k.lg([[0, '#55606F'], [1, '#14181F']], 0, 0, 1, 0) + '" transform="rotate(-24 ' + (x + 5) + ' 35)"/><circle cx="' + (x + 4) + '" cy="32" r="1.4" fill="#fff" opacity=".6"/>';
      return g;
    };
    s += pod(68, '#E8243B', '#8A0617', '1') + pod(252, '#FFFFFF', '#C4122A', '2');
    /* مطرقة القاضي */
    s += '<rect x="138" y="114" width="44" height="6" rx="2" fill="' + k.lg([[0, '#A9744A'], [1, '#5A3A1C']]) + '"/><g transform="translate(160 104) rotate(-22)"><rect x="-15" y="-6" width="30" height="10" rx="3" fill="' + k.lg([[0, '#C08A5A'], [1, '#6B4626']]) + '"/><rect x="-15" y="-6" width="4" height="10" fill="' + k.lg(GOLD, 0, 0, 1, 0) + '"/><rect x="11" y="-6" width="4" height="10" fill="' + k.lg(GOLD, 0, 0, 1, 0) + '"/><rect x="-2" y="3" width="4" height="18" rx="1.6" fill="#8A5A35"/></g>';
    /* جمهور */
    s += crowd(k, 146, 14, '#0B0306', -4, 330);
    s += flash(30, 122, 2.4) + flash(292, 118, 2) + flash(212, 130, 1.6);
    s += '<rect width="320" height="150" fill="' + k.rg([[.6, '#000', 0], [1, '#000', .45]], .5, .45, .75) + '"/>';
    return k.out(s);
  }

  /* ---------- المزاد ---------- */
  function giftBox(k) {
    return '<g transform="translate(-26 -40)"><rect x="4" y="18" width="44" height="34" rx="3" fill="' + k.lg([[0, '#1F6FD0'], [1, '#03305E']], 0, 0, 1, 1) + '"/><rect x="26" y="18" width="22" height="34" fill="#000" opacity=".18"/><rect x="0" y="10" width="52" height="11" rx="2" fill="' + k.lg([[0, '#3A8FE8'], [1, '#0A4E9C']]) + '"/><rect x="22" y="10" width="8" height="42" fill="' + k.lg(GOLD, 0, 0, 1, 0) + '"/><rect x="0" y="13" width="52" height="4" fill="' + k.lg(GOLD, 0, 0, 1, 0) + '"/><path d="M26 10 C16 -4 2 0 8 8 C12 12 22 11 26 10 C30 11 40 12 44 8 C50 0 36 -4 26 10Z" fill="' + k.lg(GOLD) + '"/><circle cx="26" cy="9" r="3.4" fill="#C9A227"/><path d="M6 22 L20 22 L8 44Z" fill="#fff" opacity=".12"/></g>';
  }
  function mazad(art) {
    var k = K(), s = '';
    s += '<rect width="320" height="150" fill="' + k.lg([[0, '#06142E'], [.6, '#0B2A5C'], [1, '#040B1A']]) + '"/>';
    s += '<rect width="320" height="110" fill="' + k.rg([[0, '#1E5AB0', .6], [1, '#06142E', 0]], .5, .45, .6) + '"/>';
    s += curtain(k, 0, 54, -1, '#5A0A1E', '#A3122F') + curtain(k, 266, 54, 1, '#5A0A1E', '#A3122F');
    s += '<path d="M0 0 H320 V16 Q280 24 240 16 Q200 26 160 16 Q120 26 80 16 Q40 24 0 16Z" fill="' + k.lg([[0, '#C4122A'], [1, '#6E0A1C']]) + '"/><path d="M0 16 Q40 24 80 16 Q120 26 160 16 Q200 26 240 16 Q280 24 320 16" stroke="' + k.lg(GOLD, 0, 0, 1, 0) + '" stroke-width="1.6" fill="none"/>';
    for (var i = 0; i < 13; i++) s += '<circle cx="' + (12 + i * 25) + '" cy="' + (19 + (i % 2) * 3) + '" r="1.6" fill="' + k.lg(GOLD) + '"/>';
    s += spot(k, 160, 160, 46, .6);
    /* أرضية */
    s += '<path d="M0 112 H320 V150 H0Z" fill="' + k.lg([[0, '#0E2348'], [1, '#040B1A']]) + '"/><rect y="111" width="320" height="1.6" fill="' + k.lg(GOLD, 0, 0, 1, 0) + '" opacity=".6"/>';
    /* منصة رخام */
    var px = 160;
    s += '<ellipse cx="' + px + '" cy="132" rx="62" ry="8" fill="#000" opacity=".5" ' + k.B(3) + '/>';
    s += '<path d="M' + (px - 46) + ' 96 H' + (px + 46) + ' V128 Q' + px + ' 136 ' + (px - 46) + ' 128Z" fill="' + k.lg([[0, '#F4F1EA'], [.5, '#D6D0C4'], [1, '#9C958A']], 0, 0, 1, 0) + '"/>';
    s += '<path d="M' + (px - 30) + ' 100 Q' + (px - 20) + ' 112 ' + (px - 34) + ' 124 M' + (px + 8) + ' 98 Q' + (px + 18) + ' 110 ' + (px + 4) + ' 128" stroke="#B8B0A2" stroke-width=".8" fill="none" opacity=".8"/>';
    s += '<ellipse cx="' + px + '" cy="96" rx="46" ry="7" fill="' + k.lg([[0, '#FFFFFF'], [1, '#D8D2C6']]) + '"/><ellipse cx="' + px + '" cy="96" rx="46" ry="7" fill="none" stroke="' + k.lg(GOLD, 0, 0, 1, 0) + '" stroke-width="1.6"/><path d="M' + (px - 46) + ' 120 Q' + px + ' 128 ' + (px + 46) + ' 120" stroke="' + k.lg(GOLD, 0, 0, 1, 0) + '" stroke-width="1.4" fill="none"/>';
    s += '<ellipse cx="' + px + '" cy="95" rx="28" ry="3.6" fill="#000" opacity=".18" ' + k.B(1.6) + '/>';
    /* المنتج */
    s += '<ellipse cx="' + px + '" cy="60" rx="40" ry="36" fill="' + k.rg([[0, '#FFF6D8', .45], [1, '#FFF6D8', 0]]) + '"/>';
    if (art) s += '<g transform="translate(' + (px - 38) + ' 22) scale(.76)">' + art + '</g>';
    else s += '<g transform="translate(' + px + ' 92) scale(1.05)">' + giftBox(k) + '</g>';
    /* مطرقة المزاد */
    s += '<g transform="translate(250 104)"><ellipse cx="0" cy="8" rx="18" ry="4" fill="#000" opacity=".45" ' + k.B(2) + '/><ellipse cx="0" cy="2" rx="14" ry="5" fill="' + k.lg([[0, '#C08A5A'], [1, '#5A3A1C']]) + '"/><g transform="rotate(-28)"><rect x="-6" y="-20" width="26" height="10" rx="3" fill="' + k.lg([[0, '#C08A5A'], [1, '#6B4626']]) + '"/><rect x="-6" y="-20" width="3.4" height="10" fill="' + k.lg(GOLD, 0, 0, 1, 0) + '"/><rect x="16.6" y="-20" width="3.4" height="10" fill="' + k.lg(GOLD, 0, 0, 1, 0) + '"/><rect x="5" y="-10" width="4" height="22" rx="1.6" fill="#8A5A35"/></g></g>';
    /* جمهور بلوحات أرقام */
    s += crowd(k, 148, 13, '#02060F', -6, 330);
    [[36, 118, '12'], [92, 122, '7'], [226, 120, '25'], [290, 116, '3']].forEach(function (p) { s += '<rect x="' + (p[0] - .8) + '" y="' + (p[1] + 8) + '" width="1.6" height="14" fill="#8A6A45"/><rect x="' + (p[0] - 8) + '" y="' + p[1] + '" width="16" height="11" rx="2" fill="#fff"/><text x="' + p[0] + '" y="' + (p[1] + 8.6) + '" text-anchor="middle" font-size="7.6" font-weight="900" fill="#0554A4" font-family="system-ui">' + p[2] + '</text>'; });
    s += flash(18, 104, 2) + flash(304, 100, 2.4);
    s += '<rect width="320" height="150" fill="' + k.rg([[.6, '#000', 0], [1, '#000', .45]], .5, .45, .75) + '"/>';
    return k.out(s);
  }
  window.AQ_STAGE = { manassa: manassa, mazad: mazad };
  var css = document.createElement('style');
  css.textContent = '.stage-art.lux{border-radius:18px;box-shadow:0 14px 30px -14px rgba(6,20,46,.55);margin-bottom:10px!important;max-width:100%!important}';
  (document.head || document.documentElement).appendChild(css);
})();
