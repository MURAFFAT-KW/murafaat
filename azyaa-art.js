/* أقنعني — الأزياء: رسم العارضات v3 (نسب عارضات، ظل وإضاءة لكل خامة، منصة عرض فخمة)
   window.AZ3(d, model, bg) → <svg> بنفس مدخلات designSVG */
(function () {
  'use strict';
  var r = function (n) { return Math.round(n * 10) / 10; };
  function hx(h) { h = (h || '#888').replace('#', ''); if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join(''); return [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16); }); }
  function mix(a, b, k) { var A = hx(a), B = hx(b); return '#' + A.map(function (v, i) { return Math.round(v + (B[i] - v) * k).toString(16).padStart(2, '0'); }).join(''); }
  var dk = function (c, k) { return mix(c, '#000000', k); }, lt = function (c, k) { return mix(c, '#ffffff', k); };
  function light(h) { var a = hx(h); return (a[0] * 299 + a[1] * 587 + a[2] * 114) / 1000 > 150; }
  function cr(P, closed) {
    var n = P.length, d = 'M' + r(P[0][0]) + ' ' + r(P[0][1]);
    var g = function (i) { return closed ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))]; };
    for (var i = 0; i < (closed ? n : n - 1); i++) {
      var p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      d += 'C' + r(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + r(p1[1] + (p2[1] - p0[1]) / 6) + ' ' + r(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + r(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + r(p2[0]) + ' ' + r(p2[1]);
    }
    return d + (closed ? 'Z' : '');
  }
  var tail = function (s) { return s.replace(/^M[^C]*/, ''); };
  function limb(P) {
    var L = [], R = [];
    P.forEach(function (p, i) {
      var a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], m = Math.hypot(dx, dy) || 1; dx /= m; dy /= m;
      var h = p[2] / 2; L.push([p[0] - dy * h, p[1] + dx * h]); R.push([p[0] + dy * h, p[1] - dx * h]);
    });
    var e = P[P.length - 1], s = P[0];
    return cr(L, false) + 'A' + r(e[2] / 2) + ' ' + r(e[2] / 2) + ' 0 0 0 ' + r(R[R.length - 1][0]) + ' ' + r(R[R.length - 1][1]) + tail(cr(R.slice().reverse(), false)) + 'A' + r(s[2] / 2) + ' ' + r(s[2] / 2) + ' 0 0 0 ' + r(L[0][0]) + ' ' + r(L[0][1]) + 'Z';
  }
  var mxp = function (P) { return P.map(function (p) { return [200 - p[0], p[1]].concat(p.slice(2)); }); };
  /* شكل متناظر: نقاط الجهة اليسار من فوق لتحت، والحافة تحت (موجة) */
  function sym(Lp, wave) {
    var R = mxp(Lp).reverse(), a = Lp[Lp.length - 1], b = R[0], hem = '';
    if (wave) { var n = 6, y = a[1]; for (var i = 1; i <= n; i++) { var x0 = a[0] + (b[0] - a[0]) * (i - .5) / n, x1 = a[0] + (b[0] - a[0]) * i / n; hem += 'Q' + r(x0) + ' ' + r(y + (i % 2 ? wave : -wave * .4)) + ' ' + r(x1) + ' ' + r(y); } }
    else hem = 'L' + r(b[0]) + ' ' + r(b[1]);
    return cr(Lp, false) + hem + tail(cr(R, false)) + 'Z';
  }

  var SK = '#d6a27e', GOLD = '#d4a63a';
  /* ---------- الجسم ---------- */
  var BODY = {
    f: {
      head: [101, 35, 11, 14, -5], neck: [[101, 46, 9], [100, 62, 10.5]],
      torso: 'M94 58C87 63 78 62 75.5 68C73.6 75 76 82 78.2 86C79.4 92 82.4 98 86 104C88 108 89.6 111 89.6 113C86 122 82.6 130 82.6 138C82 146 85 151 88 153L112 153C115 151 118 146 117.4 138C117.4 130 114 122 110.4 113C110.4 111 112 108 114 104C117.6 98 120.6 92 121.8 86C124 82 126.4 75 124.5 68C122 62 113 63 106 58Z',
      side: [[64, 77.6], [70, 76.6], [84, 78], [92, 81], [104, 86.8], [113, 89.6], [125, 85.4], [138, 82.6], [150, 85]],
      legL: [[93, 148, 16], [91.6, 172, 13.8], [93, 205, 9], [93.2, 226, 10.6], [94.8, 258, 7], [95.6, 279, 5.4]],
      armL: [[78.4, 70, 11], [75.4, 90, 9.8], [74, 110, 7.8], [75, 131, 6.8], [77, 149, 5.4]],
      armR: [[121.6, 70, 11], [128, 87, 10], [134, 104, 8], [127, 118, 6.8], [119, 128, 5.8]],
      armRbag: [[121.6, 70, 11], [124.6, 90, 9.8], [126, 110, 7.8], [125, 131, 6.8], [123, 149, 5.4]],
      shY: 66, waistY: 113, hipY: 138, crotchY: 152, kneeY: 205, floorY: 290, nw: 6
    },
    m: {
      head: [100, 33, 10.8, 13.4, 2], neck: [[100, 44, 12], [100, 58, 14]],
      torso: 'M87 56C78 58 68 59 66 69C65.6 84 70 96 76 106C80 114 82 118 82 122C81 132 80 142 80 150C80 154 82 156 86 157L114 157C118 156 120 154 120 150C120 142 119 132 118 122C118 118 120 114 124 106C130 96 134.4 84 134 69C132 59 122 58 113 56Z',
      side: [[60, 72], [66, 67], [82, 69], [95, 74], [110, 79.4], [122, 82], [150, 80], [156, 81]],
      legL: [[91, 152, 20], [90.2, 178, 17], [91, 208, 11.6], [90.6, 234, 12.6], [91.4, 266, 8], [91.6, 281, 7.4]],
      armL: [[69.6, 68, 14], [64.6, 91, 12.6], [66, 112, 10.4], [75, 130, 9.6], [83, 142, 8.6]],
      armR: mxp([[69.6, 68, 14], [64.6, 91, 12.6], [66, 112, 10.4], [75, 130, 9.6], [83, 142, 8.6]]),
      armRbag: [[130.4, 68, 14], [135.4, 91, 12.6], [136, 114, 10.4], [135, 134, 9.6], [133.4, 152, 8]],
      shY: 64, waistY: 122, hipY: 146, crotchY: 156, kneeY: 208, floorY: 288, nw: 7.2
    }
  };
  function sideAt(B, y) { var s = B.side; if (y <= s[0][0]) return s[0][1]; for (var i = 1; i < s.length; i++) if (y <= s[i][0]) { var t = (y - s[i - 1][0]) / (s[i][0] - s[i - 1][0]); return s[i - 1][1] + (s[i][1] - s[i - 1][1]) * t; } return s[s.length - 1][1]; }

  /* ---------- أدوات الرسم ---------- */
  function Ctx(n) { this.n = n; this.k = 0; this.defs = []; }
  Ctx.prototype.id = function (p) { return 'z' + this.n + p + (++this.k); };
  Ctx.prototype.cyl = function (col, x1, x2, o) {
    o = o || {}; var i = this.id('c'), s = o.sheen || 0;
    this.defs.push('<linearGradient id="' + i + '" gradientUnits="userSpaceOnUse" x1="' + x1 + '" y1="0" x2="' + x2 + '" y2="0"><stop offset="0" stop-color="' + (o.rim ? lt(col, .3) : dk(col, .55)) + '"/><stop offset=".07" stop-color="' + dk(col, .4) + '"/><stop offset=".3" stop-color="' + lt(col, .06 + s) + '"/><stop offset=".42" stop-color="' + lt(col, .13 + s * 1.6) + '"/><stop offset=".56" stop-color="' + col + '"/><stop offset=".8" stop-color="' + dk(col, .28) + '"/><stop offset=".95" stop-color="' + dk(col, .48) + '"/><stop offset="1" stop-color="' + (o.rim ? lt(col, .2) : dk(col, .6)) + '"/></linearGradient>');
    return 'url(#' + i + ')';
  };
  Ctx.prototype.clip = function (d) { var i = this.id('k'); this.defs.push('<clipPath id="' + i + '"><path d="' + d + '"/></clipPath>'); return i; };
  Ctx.prototype.skin = function (x1, x2) { return this.cyl(SK, x1, x2); };
  var SHEEN = { silk: .14, leather: .2, velvet: .05, chiffon: .1, cotton: .03, linen: .02, wool: .02, denim: .03 };
  /* نقشة + نسيج */
  Ctx.prototype.pattern = function (hex, p) {
    if (!p || p === 'plain') return null;
    var i = this.id('p'), c = light(hex) ? 'rgba(0,0,0,.2)' : 'rgba(255,255,255,.32)', inner = '';
    if (p === 'stripe') inner = '<rect width="4" height="10" fill="' + c + '"/>';
    if (p === 'dots') inner = '<circle cx="5" cy="5" r="1.7" fill="' + c + '"/>';
    if (p === 'check') inner = '<rect width="10" height="3" fill="' + c + '"/><rect width="3" height="10" fill="' + c + '"/>';
    this.defs.push('<pattern id="' + i + '" width="10" height="10" patternUnits="userSpaceOnUse">' + inner + '</pattern>');
    return 'url(#' + i + ')';
  };
  Ctx.prototype.texture = function (f) {
    var i = this.id('t'), s;
    if (f === 'denim') s = '<pattern id="' + i + '" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><rect width=".9" height="2.6" fill="#fff" fill-opacity=".16"/></pattern>';
    else if (f === 'wool') s = '<pattern id="' + i + '" width="5" height="4" patternUnits="userSpaceOnUse"><path d="M0 0L2.5 2L0 4M2.5 0L5 2L2.5 4" fill="none" stroke="#fff" stroke-opacity=".13" stroke-width=".5"/><path d="M1.25 0L3.75 2L1.25 4" fill="none" stroke="#000" stroke-opacity=".12" stroke-width=".45"/></pattern>';
    else if (f === 'cotton') s = '<pattern id="' + i + '" width="2" height="2" patternUnits="userSpaceOnUse"><path d="M0 0h1v1H0zM1 1h1v1H1z" fill="#fff" opacity=".06"/></pattern>';
    else if (f === 'linen') s = '<pattern id="' + i + '" width="11" height="4" patternUnits="userSpaceOnUse"><rect width="7" height=".55" fill="#fff" fill-opacity=".18"/><rect x="3.6" y="2" width="6" height=".45" fill="#000" fill-opacity=".08"/></pattern>';
    else if (f === 'velvet') s = '<pattern id="' + i + '" width="1.6" height="1.6" patternUnits="userSpaceOnUse"><circle cx=".8" cy=".8" r=".35" fill="#000" opacity=".12"/></pattern>';
    else return null;
    this.defs.push(s); return 'url(#' + i + ')';
  };
  /* يلوّن قطعة: ظل، تدرج أسطواني، نقشة، نسيج، لمعة الخامة، طيات، حدود */
  Ctx.prototype.paint = function (d, hex, fab, pat, x1, x2, folds, o) {
    o = o || {}; fab = fab || 'cotton';
    var L = light(hex), base = this.cyl(hex, x1, x2, { sheen: SHEEN[fab] || 0, rim: fab === 'velvet' }), F = this.n;
    var s = '<path d="' + d + '" fill="#1a0f24" opacity=".28" transform="translate(.8 1.6)" filter="url(#z' + F + 'b1)"/><path d="' + d + '" fill="' + base + '"/>';
    var pt = this.pattern(hex, pat); if (pt) s += '<path d="' + d + '" fill="' + pt + '"/>';
    var tx = this.texture(fab); if (tx) s += '<path d="' + d + '" fill="' + tx + '"/>';
    var k = this.clip(d), g = '';
    if (folds) folds.forEach(function (f, i) {
      g += '<path d="' + f + '" stroke="' + dk(hex, L ? .3 : .6) + '" stroke-width="' + (o.fw || 2.6) + '" fill="none" opacity="' + (L ? .45 : .6) + '" filter="url(#z' + F + 'b1)"/><path d="' + f + '" transform="translate(2.2 2)" stroke="' + lt(hex, .4) + '" stroke-width="' + (fab === 'silk' || fab === 'leather' ? 1.6 : 1.1) + '" fill="none" opacity="' + (fab === 'silk' || fab === 'leather' ? .55 : .3) + '" filter="url(#z' + F + 'b1)"/>';
    });
    var cx = x1 + (x2 - x1) * .36;
    if (fab === 'silk' || fab === 'leather') g += '<path d="M' + r(cx) + ' ' + (o.y1 || 70) + 'C' + r(cx - 3) + ' ' + ((o.y1 || 70) + 60) + ' ' + r(cx + 4) + ' ' + ((o.y2 || 280) - 60) + ' ' + r(cx) + ' ' + (o.y2 || 280) + '" stroke="#fff" stroke-width="' + (fab === 'leather' ? 3.4 : 2.4) + '" fill="none" opacity="' + (fab === 'leather' ? .4 : .3) + '" filter="url(#z' + F + 'b1)"/>';
    if (fab === 'velvet') g += '<path d="' + d + '" fill="none" stroke="' + lt(hex, .55) + '" stroke-width="4" opacity=".35" filter="url(#z' + F + 'b2)"/>';
    if (fab === 'denim' && o.seam) g += '<path d="' + o.seam + '" stroke="#E0A24A" stroke-width=".8" stroke-dasharray="2 1.4" fill="none"/>';
    else if (o.seam) g += '<path d="' + o.seam + '" stroke="' + (L ? 'rgba(0,0,0,.22)' : 'rgba(255,255,255,.3)') + '" stroke-width=".6" stroke-dasharray="2 1.4" fill="none"/>';
    if (g) s += '<g clip-path="url(#' + k + ')">' + g + '</g>';
    s += '<path d="' + d + '" fill="none" stroke="' + dk(hex, L ? .35 : .55) + '" stroke-width=".7" stroke-linejoin="round" opacity=".8"/>';
    if (fab === 'chiffon') s = '<g opacity=".82">' + s + '<path d="' + d + '" fill="#fff" opacity=".1"/></g>';
    return s;
  };
  Ctx.prototype.gold = function (d, w) { var F = this.n; return '<path d="' + d + '" stroke="#8a6a1c" stroke-width="' + (w + 1) + '" fill="none" stroke-linecap="round"/><path d="' + d + '" stroke="url(#z' + F + 'au)" stroke-width="' + w + '" fill="none" stroke-linecap="round"/><path d="' + d + '" stroke="#fff6d0" stroke-width="' + (w * .45) + '" fill="none" stroke-dasharray="1.2 2.8" stroke-linecap="round"/>'; };

  /* ---------- القطع ---------- */
  function sleeveOf(arm, k, cuff, upto) { var a = arm.slice(0, upto || arm.length); return limb(a.map(function (p, i) { var t = i / (a.length - 1); return [p[0], p[1], p[2] + k + (cuff - k) * t * t]; })); }
  function torsoTo(B, ease, y2, flare, startY) {
    var L = [], y0 = startY || B.shY + 2;
    for (var y = y0; y <= y2 + .01; y += (y2 - y0) / 8) L.push([sideAt(B, y) - ease - (flare ? flare(y) : 0), y]);
    return L;
  }
  function shoulderTop(B, e) { var m = B === BODY.m, a = B.shY; return { L: [100 - B.nw - 1, a - 8], S: [m ? 66 - e : 75.5 - e, a + 1] }; }
  /* جسم قطعة علوية/طويلة: من الكتف لـ y2 */
  function upper(B, e, y2, flare, neck) {
    var t = shoulderTop(B, e), side = torsoTo(B, e, y2, flare), R = mxp(side).reverse(), nL = t.L, nR = [200 - nL[0], nL[1]];
    var nk = neck === 'v' ? 'L100 ' + (B.shY + 30) : neck === 'deep' ? 'Q100 ' + (B.shY + 22) + ' ' : 'Q100 ' + (B.shY + 4) + ' ';
    var qx = (nL[0] + t.S[0]) / 2 - 3, qy = B.shY - 7;
    var d = 'M' + r(nL[0]) + ' ' + r(nL[1]) + 'Q' + r(qx) + ' ' + r(qy) + ' ' + r(t.S[0]) + ' ' + r(t.S[1]) + 'L' + r(side[0][0]) + ' ' + r(side[0][1]) + tail(cr(side, false));
    d += 'L' + r(R[0][0]) + ' ' + r(R[0][1]) + tail(cr(R, false)) + 'L' + r(200 - t.S[0]) + ' ' + r(t.S[1]) + 'Q' + r(200 - qx) + ' ' + r(qy) + ' ' + r(nR[0]) + ' ' + r(nR[1]);
    d += neck === 'v' ? 'L100 ' + (B.shY + 30) + 'Z' : (neck === 'deep' ? 'Q100 ' + (B.shY + 22) : 'Q100 ' + (B.shY + 4)) + ' ' + r(nL[0]) + ' ' + r(nL[1]) + 'Z';
    return d;
  }
  function foldsDown(x, y1, y2, spread) { var o = []; for (var i = -2; i <= 2; i++) { if (!i) continue; var xa = x + i * 5, xb = x + i * spread; o.push('M' + r(xa) + ' ' + y1 + 'C' + r(xa + (xb - xa) * .15) + ' ' + r(y1 + (y2 - y1) * .4) + ' ' + r(xb - (xb - xa) * .1) + ' ' + r(y2 - (y2 - y1) * .3) + ' ' + r(xb) + ' ' + y2); } return o; }

  function piece(c, B, p, m, o) {
    var hex = p.hex, fab = p.fabric, pat = p.pattern, t = p.type, S = '', sl = '', acc = '', f = !m;
    var W = B.waistY, H = B.hipY;
    if (t === 'dress') {
      var hem = f ? 232 : 236, Ld = [[sideAt(B, B.shY + 20) - .5, B.shY + 20], [sideAt(B, W) - .6, W], [sideAt(B, H) - 1.4, H], [sideAt(B, H) - 7, (H + hem) / 2], [f ? 64 : 62, hem]];
      var Lp = Ld, R = mxp(Lp), a = Lp[Lp.length - 1], b2 = R[R.length - 1], d;
      d = f ? 'M93 84Q100 92 107 84L108 ' + (B.shY - 2) + 'L112 ' + (B.shY - 2) + 'L' + r(R[0][0]) + ' ' + R[0][1] : 'M91 ' + (B.shY - 4) + 'Q100 ' + (B.shY + 8) + ' 109 ' + (B.shY - 4) + 'L114 ' + (B.shY - 4) + 'L' + r(R[0][0]) + ' ' + R[0][1];
      d += tail(cr(R, false));
      for (var i = 1; i <= 6; i++) { var x0 = b2[0] + (a[0] - b2[0]) * (i - .5) / 6, x1 = b2[0] + (a[0] - b2[0]) * i / 6; d += 'Q' + r(x0) + ' ' + r(hem + (i % 2 ? 2.4 : -1)) + ' ' + r(x1) + ' ' + hem; }
      d += tail(cr(Lp.slice().reverse(), false)) + (f ? 'L88 ' + (B.shY - 2) + 'L92 ' + (B.shY - 2) + 'Z' : 'L86 ' + (B.shY - 4) + 'L91 ' + (B.shY - 4) + 'Z');
      S += c.paint(d, hex, fab, pat, 60, 140, foldsDown(100, H + 6, hem, 12), { y1: 90, y2: hem, seam: 'M' + r(sideAt(B, W)) + ' ' + W + 'Q100 ' + (W + 3) + ' ' + r(200 - sideAt(B, W)) + ' ' + W });
    } else if (t === 'skirt' || t === 'maxi') {
      var hm = t === 'maxi' ? B.floorY : (f ? 208 : 212), top2 = W - 1.5, Ls = [[sideAt(B, top2) - .8, top2], [sideAt(B, H) - 1.6, H], [sideAt(B, H) - (t === 'maxi' ? 6 : 4) - 1.6, (H + hm) / 2], [sideAt(B, H) - (hm - H) * (t === 'maxi' ? .14 : .2) - 1.6, hm]];
      S += c.paint(sym(Ls, 2), hex, fab, pat, Ls[3][0], 200 - Ls[3][0], foldsDown(100, H, hm, t === 'maxi' ? 10 : 7), { y1: top2, y2: hm, seam: 'M' + r(Ls[0][0] + 1) + ' ' + (top2 + 4) + 'Q100 ' + (top2 + 6) + ' ' + r(199 - Ls[0][0]) + ' ' + (top2 + 4) });
    } else if (t === 'pants') {
      var tp = W - 1.5, ft = B.floorY - (f ? 10 : 6), lg = B.legL, wid = m ? 3 : 2;
      var O = [[sideAt(B, tp) - .8, tp], [sideAt(B, H) - 1.2, H]].concat(lg.slice(1).map(function (q, i) { return [q[0] - q[2] / 2 - wid - (m ? (i) * .2 : 0), Math.min(q[1], ft)]; }));
      O[O.length - 1][1] = ft;
      var I = lg.slice(1).map(function (q) { return [q[0] + q[2] / 2 + (m ? 1.6 : 1), Math.min(q[1], ft)]; }); I[I.length - 1][1] = ft; I.unshift([99, B.crotchY + 2]);
      var leg = cr(O, false) + 'L' + r(I[I.length - 1][0]) + ' ' + ft + tail(cr(I.slice().reverse(), false)) + 'L100 ' + (B.crotchY - 2);
      var Om = mxp(O), Im = mxp(I);
      var dP = leg + 'L' + r(Im[0][0]) + ' ' + r(Im[0][1]) + tail(cr(Im, false)) + 'L' + r(Om[Om.length - 1][0]) + ' ' + ft + tail(cr(Om.slice().reverse(), false)) + 'Z';
      var kx = lg[2][0];
      S += c.paint(dP, hex, fab, pat, O[1][0], 200 - O[1][0], ['M' + r(kx - 4) + ' ' + (B.kneeY - 4) + 'Q' + kx + ' ' + (B.kneeY + 2) + ' ' + r(kx + 4) + ' ' + (B.kneeY - 4), 'M' + r(200 - kx - 4) + ' ' + (B.kneeY - 4) + 'Q' + (200 - kx) + ' ' + (B.kneeY + 2) + ' ' + r(204 - kx) + ' ' + (B.kneeY - 4), 'M' + r(kx - 5) + ' ' + (ft - 6) + 'Q' + kx + ' ' + (ft - 3) + ' ' + r(kx + 5) + ' ' + (ft - 6)], { fw: 1.8, y1: tp, y2: ft, seam: 'M' + r(O[0][0] + 1) + ' ' + (tp + 4) + 'Q100 ' + (tp + 6) + ' ' + r(199 - O[0][0]) + ' ' + (tp + 4) + (m ? 'M' + r(kx) + ' ' + (H + 6) + 'L' + r(kx + .5) + ' ' + ft + 'M' + r(200 - kx) + ' ' + (H + 6) + 'L' + r(199.5 - kx) + ' ' + ft : '') });
    } else if (t === 'shirt') {
      var hs = o.tuck ? W + 3 : (f ? H + 4 : H + 8), dS = upper(B, 1.2, hs, null, f ? 'deep' : 'v');
      S += c.paint(dS, hex, fab, pat, f ? 76 : 68, f ? 124 : 132, ['M' + (f ? 90 : 86) + ' ' + (W - 6) + 'Q100 ' + (W - 1) + ' ' + (f ? 110 : 114) + ' ' + (W - 6)], { y1: B.shY + 6, y2: hs, seam: 'M100 ' + (B.shY + (f ? 22 : 30)) + 'L100 ' + hs });
      /* ياقة + أزرار */
      var cy = B.shY - 6;
      acc += '<path d="M' + (100 - B.nw - 1.6) + ' ' + cy + 'L100 ' + (cy + 9) + 'L' + (100 + B.nw + 1.6) + ' ' + cy + 'L' + (100 + B.nw + 4.6) + ' ' + (cy + 9) + 'L101 ' + (cy + 12) + 'L99 ' + (cy + 12) + 'L' + (100 - B.nw - 4.6) + ' ' + (cy + 9) + 'Z" fill="' + lt(hex, .12) + '" stroke="' + dk(hex, .4) + '" stroke-width=".6"/>';
      for (var yb = B.shY + (f ? 26 : 34); yb < hs - 4; yb += 10) acc += '<circle cx="100.4" cy="' + yb + '" r="1.1" fill="' + (light(hex) ? '#cfc8bd' : lt(hex, .5)) + '" stroke="' + dk(hex, .5) + '" stroke-width=".3"/>';
      sl = c.paint(sleeveOf(o.armL, m ? 1.8 : 3, m ? 1.8 : 2.6), hex, fab, pat, 56, 90) + c.paint(sleeveOf(o.armR, m ? 1.8 : 3, m ? 1.8 : 2.6), hex, fab, pat, 110, 144);
    } else if (t === 'jacket') {
      var hj = f ? H + 10 : H + 14, dJ = upper(B, 2.6, hj, f ? function (y) { return y > W ? (y - W) * .16 : 0; } : null, 'v');
      S += c.paint(dJ, hex, fab, pat, f ? 74 : 66, f ? 126 : 134, ['M' + (f ? 84 : 80) + ' ' + (B.shY + 26) + 'C' + (f ? 88 : 84) + ' ' + (B.shY + 34) + ' 90 ' + (B.shY + 38) + ' 93 ' + (B.shY + 40), 'M' + (f ? 116 : 120) + ' ' + (B.shY + 26) + 'C' + (f ? 112 : 116) + ' ' + (B.shY + 34) + ' 110 ' + (B.shY + 38) + ' 107 ' + (B.shY + 40)], { y1: B.shY, y2: hj, seam: 'M100 ' + (B.shY + 30) + 'L100 ' + hj });
      /* الطية (lapel) + أزرار + جيوب */
      var ly = B.shY;
      acc += '<path d="M' + (100 - B.nw - 1) + ' ' + (ly - 8) + 'L' + (100 - B.nw - 7.6) + ' ' + (ly + 6.6) + 'L' + (100 - B.nw - 2) + ' ' + (ly + 11) + 'L' + (100 - B.nw - 6.6) + ' ' + (ly + 15) + 'L100 ' + (ly + 30) + 'Z" fill="' + lt(hex, .1) + '" stroke="' + dk(hex, .45) + '" stroke-width=".6"/><path d="M' + (100 + B.nw + 1) + ' ' + (ly - 8) + 'L' + (100 + B.nw + 7.6) + ' ' + (ly + 6.6) + 'L' + (100 + B.nw + 2) + ' ' + (ly + 11) + 'L' + (100 + B.nw + 6.6) + ' ' + (ly + 15) + 'L100 ' + (ly + 30) + 'Z" fill="' + dk(hex, .06) + '" stroke="' + dk(hex, .45) + '" stroke-width=".6"/>';
      acc += '<circle cx="100.8" cy="' + (W - 2) + '" r="1.4" fill="' + dk(hex, .6) + '"/>' + (m ? '<circle cx="100.8" cy="' + (W + 11) + '" r="1.4" fill="' + dk(hex, .6) + '"/>' : '');
      if (m) acc += '<path d="M106 ' + (H - 12) + 'L120 ' + (H - 13.2) + 'M80 ' + (H - 13.2) + 'L94 ' + (H - 12) + '" stroke="' + dk(hex, .6) + '" stroke-width="1.2"/><path d="M114.6 ' + (ly + 8) + 'l4.8 -.6l.2 2.4" stroke="#fff" stroke-width=".9" fill="#ececf2" opacity=".9"/>';
      sl = c.paint(sleeveOf(o.armL, m ? 2.4 : 4, m ? 2.2 : 3.2), hex, fab, pat, 56, 90) + c.paint(sleeveOf(o.armR, m ? 2.4 : 4, m ? 2.2 : 3.2), hex, fab, pat, 110, 144);
    } else if (t === 'abaya' || t === 'daraa') {
      var ab = t === 'abaya', ha = B.floorY + (ab ? 3 : 1), fl = function (y) { return Math.max(0, y - B.shY - 10) * (ab ? .13 : .1); };
      var dA = upper(B, ab ? 3.4 : 3.8, ha, fl, ab ? 'v' : 'round');
      S += c.paint(dA, hex, fab, pat, 48, 152, foldsDown(100, W, ha, 18).concat(['M84 ' + W + 'C80 ' + (W + 60) + ' 72 ' + (ha - 60) + ' 66 ' + ha, 'M116 ' + W + 'C120 ' + (W + 60) + ' 128 ' + (ha - 60) + ' 134 ' + ha]), { y1: B.shY, y2: ha });
      if (ab) acc += c.gold('M' + (100 - 1.2) + ' ' + (B.shY + 30) + 'L' + (100 - 1.2) + ' ' + (ha - 2), 2.2) + c.gold('M100 ' + (B.shY + 30) + 'M' + (100 - B.nw - 1) + ' ' + (B.shY - 7) + 'L100 ' + (B.shY + 30) + 'L' + (100 + B.nw + 1) + ' ' + (B.shY - 7), 1.8) + c.gold('M' + r(sideAt(B, ha) - fl(ha) - 3.4) + ' ' + (ha - 1) + 'Q100 ' + (ha + 3) + ' ' + r(203.4 - sideAt(B, ha) + fl(ha)) + ' ' + (ha - 1), 1.6);
      else { acc += c.gold('M' + (100 - B.nw - 3) + ' ' + (B.shY - 4) + 'Q100 ' + (B.shY + 10) + ' ' + (100 + B.nw + 3) + ' ' + (B.shY - 4), 2.4) + c.gold('M100 ' + (B.shY + 5) + 'L100 ' + (B.shY + 34), 2) + c.gold('M' + r(sideAt(B, ha) - fl(ha) - 2) + ' ' + (ha - 8) + 'Q100 ' + (ha - 3) + ' ' + r(202 - sideAt(B, ha) + fl(ha)) + ' ' + (ha - 8), 1.6); }
      var cuff = m ? (ab ? 10 : 8) : (ab ? 14 : 16), sk = m ? 2.4 : 5;
      var sL = sleeveOf(o.armL, sk, cuff, ab ? 5 : 4), sR = sleeveOf(o.armR, sk, cuff, ab ? 5 : 4);
      sl = c.paint(sL, hex, fab, pat, 54, 92) + c.paint(sR, hex, fab, pat, 108, 146);
      var eL = o.armL[ab ? 4 : 3], eR = o.armR[ab ? 4 : 3];
      sl += c.gold('M' + r(eL[0] - cuff * .5) + ' ' + r(eL[1] + 1) + 'Q' + r(eL[0]) + ' ' + r(eL[1] + 4) + ' ' + r(eL[0] + cuff * .5) + ' ' + r(eL[1] + 1), 1.4) + c.gold('M' + r(eR[0] - cuff * .5) + ' ' + r(eR[1] + 1) + 'Q' + r(eR[0]) + ' ' + r(eR[1] + 4) + ' ' + r(eR[0] + cuff * .5) + ' ' + r(eR[1] + 1), 1.4);
    } else if (t === 'belt') {
      var by = W + (m ? 1 : 0), bw = 100 - sideAt(B, by) + 1.6;
      acc += c.paint('M' + r(100 - bw) + ' ' + (by - 2.4) + 'Q100 ' + (by - .6) + ' ' + r(100 + bw) + ' ' + (by - 2.4) + 'L' + r(100 + bw + .4) + ' ' + (by + 2.4) + 'Q100 ' + (by + 4.2) + ' ' + r(100 - bw - .4) + ' ' + (by + 2.4) + 'Z', hex, fab || 'leather', pat, 100 - bw, 100 + bw);
      acc += '<rect x="96.4" y="' + (by - 3) + '" width="7.2" height="6.4" rx="1.2" fill="url(#z' + c.n + 'au)" stroke="#7a5a14" stroke-width=".5"/><rect x="98.2" y="' + (by - 1.4) + '" width="3.6" height="3.2" rx=".6" fill="' + dk(hex, .3) + '"/>';
    } else if (t === 'necklace') {
      var ny = B.shY - 4, nw = B.nw + (m ? 2 : 3);
      acc += '<path d="M' + (100 - nw) + ' ' + ny + 'Q100 ' + (ny + 15) + ' ' + (100 + nw) + ' ' + ny + '" stroke="url(#z' + c.n + 'au)" stroke-width="1.2" fill="none"/>';
      for (var q = 1; q < 8; q++) { var tt = q / 8, xq = 100 - nw + 2 * nw * tt, yq = ny + 15 * 2 * tt * (1 - tt); acc += '<circle cx="' + r(xq) + '" cy="' + r(yq) + '" r="1.1" fill="' + (p.color === 'gold' ? 'url(#z' + c.n + 'au)' : hex) + '" stroke="#7a5a14" stroke-width=".3"/>'; }
      acc += '<path d="M100 ' + (ny + 7.6) + 'l3 4.4l-3 4.4l-3 -4.4Z" fill="' + hex + '" stroke="url(#z' + c.n + 'au)" stroke-width=".9"/><circle cx="99" cy="' + (ny + 10.6) + '" r=".7" fill="#fff"/>';
    } else if (t === 'scarf') {
      if (o.shayla) return { S: '', sl: '', acc: '', shayla: true };
      var sy = B.shY - 6, n2 = B.nw + 3.4;
      var band = 'M' + (100 - n2) + ' ' + (sy - 2) + 'Q100 ' + (sy + 9) + ' ' + (100 + n2) + ' ' + (sy - 2) + 'L' + (100 + n2 + 2) + ' ' + (sy + 3) + 'Q100 ' + (sy + 15) + ' ' + (100 - n2 - 2) + ' ' + (sy + 3) + 'Z';
      var end1 = 'M' + (104) + ' ' + (sy + 8) + 'C' + 110 + ' ' + (sy + 30) + ' 112 ' + (sy + 52) + ' 114 ' + (sy + 76) + 'L106 ' + (sy + 78) + 'C105 ' + (sy + 56) + ' 101 ' + (sy + 30) + ' 98 ' + (sy + 10) + 'Z';
      var end2 = 'M' + (100 + n2) + ' ' + (sy) + 'C' + (100 + n2 + 6) + ' ' + (sy + 8) + ' ' + (100 + n2 + 10) + ' ' + (sy + 30) + ' ' + (100 + n2 + 12) + ' ' + (sy + 46) + 'L' + (100 + n2 + 6) + ' ' + (sy + 47) + 'C' + (100 + n2 + 4) + ' ' + (sy + 30) + ' ' + (100 + n2 + 1) + ' ' + (sy + 12) + ' ' + (100 + n2 - 3) + ' ' + (sy + 6) + 'Z';
      acc += c.paint(end2, hex, fab, pat, 100 + n2, 100 + n2 + 12) + c.paint(end1, hex, fab, pat, 98, 114, ['M101 ' + (sy + 20) + 'C104 ' + (sy + 40) + ' 107 ' + (sy + 58) + ' 109 ' + (sy + 76)]) + c.paint(band, hex, fab, pat, 100 - n2, 100 + n2);
      acc += '<path d="M106 ' + (sy + 78) + 'l1 3M108.4 ' + (sy + 77.6) + 'l.8 3M110.8 ' + (sy + 77.2) + 'l.8 3M113 ' + (sy + 76.8) + 'l.8 3" stroke="' + dk(hex, .2) + '" stroke-width=".7"/>';
    } else if (t === 'hat') {
      var h = B.head, hy = h[1] - h[3] + 5;
      if (f) {
        acc += c.paint('M' + (h[0] - 15) + ' ' + (hy - 13) + 'Q' + h[0] + ' ' + (hy - 24) + ' ' + (h[0] + 15) + ' ' + (hy - 13) + 'L' + (h[0] + 13) + ' ' + (hy + 1) + 'L' + (h[0] - 13) + ' ' + (hy + 1) + 'Z', hex, fab, pat, h[0] - 15, h[0] + 15);
        acc = c.paint('M' + (h[0] - 30) + ' ' + (hy + 2) + 'Q' + h[0] + ' ' + (hy - 12) + ' ' + (h[0] + 30) + ' ' + (hy - 2) + 'Q' + (h[0] + 2) + ' ' + (hy + 10) + ' ' + (h[0] - 30) + ' ' + (hy + 2) + 'Z', hex, fab, pat, h[0] - 30, h[0] + 30) + acc;
        acc += '<path d="M' + (h[0] - 13.4) + ' ' + (hy - 3) + 'Q' + h[0] + ' ' + (hy - 6) + ' ' + (h[0] + 13.4) + ' ' + (hy - 3) + 'L' + (h[0] + 13.2) + ' ' + hy + 'Q' + h[0] + ' ' + (hy - 3) + ' ' + (h[0] - 13.2) + ' ' + hy + 'Z" fill="' + (light(hex) ? '#1d1d1f' : GOLD) + '"/>';
      } else {
        acc += c.paint('M' + (h[0] - 11.6) + ' ' + (hy - 1) + 'C' + (h[0] - 12) + ' ' + (hy - 14) + ' ' + (h[0] - 4) + ' ' + (hy - 15) + ' ' + h[0] + ' ' + (hy - 12) + 'C' + (h[0] + 4) + ' ' + (hy - 15) + ' ' + (h[0] + 12) + ' ' + (hy - 14) + ' ' + (h[0] + 11.6) + ' ' + (hy - 1) + 'Z', hex, fab, pat, h[0] - 12, h[0] + 12);
        acc = c.paint('M' + (h[0] - 20) + ' ' + hy + 'Q' + h[0] + ' ' + (hy - 6) + ' ' + (h[0] + 20) + ' ' + hy + 'Q' + h[0] + ' ' + (hy + 5) + ' ' + (h[0] - 20) + ' ' + hy + 'Z', hex, fab, pat, h[0] - 20, h[0] + 20) + acc;
        acc += '<path d="M' + (h[0] - 11.6) + ' ' + (hy - 4.4) + 'Q' + h[0] + ' ' + (hy - 6.4) + ' ' + (h[0] + 11.6) + ' ' + (hy - 4.4) + 'L' + (h[0] + 11.6) + ' ' + (hy - 1.4) + 'Q' + h[0] + ' ' + (hy - 3.4) + ' ' + (h[0] - 11.6) + ' ' + (hy - 1.4) + 'Z" fill="' + dk(hex, .55) + '"/>';
      }
      return { S: '', sl: '', acc: '', hat: acc };
    } else if (t === 'bag') {
      var hp = o.bagHand, bx = hp[0], byy = hp[1] + 4;
      var bag = f ? 'M' + (bx - 9) + ' ' + (byy + 7) + 'L' + (bx + 9) + ' ' + (byy + 7) + 'Q' + (bx + 11) + ' ' + (byy + 22) + ' ' + (bx + 10) + ' ' + (byy + 24) + 'L' + (bx - 10) + ' ' + (byy + 24) + 'Q' + (bx - 11) + ' ' + (byy + 22) + ' ' + (bx - 9) + ' ' + (byy + 7) + 'Z'
        : 'M' + (bx - 12) + ' ' + (byy + 6) + 'L' + (bx + 12) + ' ' + (byy + 6) + 'L' + (bx + 12) + ' ' + (byy + 26) + 'Q' + bx + ' ' + (byy + 28) + ' ' + (bx - 12) + ' ' + (byy + 26) + 'Z';
      var handle = 'M' + (bx - 5) + ' ' + (byy + 7) + 'Q' + bx + ' ' + (byy - 8) + ' ' + (bx + 5) + ' ' + (byy + 7);
      return { S: '', sl: '', acc: '', bag: '<path d="' + handle + '" stroke="' + dk(hex, .3) + '" stroke-width="2.4" fill="none"/><path d="' + handle + '" stroke="' + lt(hex, .25) + '" stroke-width=".8" fill="none"/>' + c.paint(bag, hex, fab || 'leather', pat, bx - 11, bx + 11, null, { y1: byy + 7, y2: byy + 24 }) + '<path d="M' + (bx - 9) + ' ' + (byy + 11) + 'H' + (bx + 9) + '" stroke="' + dk(hex, .4) + '" stroke-width=".7"/><rect x="' + (bx - 2.4) + '" y="' + (byy + 9.6) + '" width="4.8" height="3.4" rx=".8" fill="url(#z' + c.n + 'au)"/>' };
    }
    return { S: S, sl: sl, acc: acc };
  }

  /* ---------- المنصة ---------- */
  function stage(c, bg) {
    /* منصة فخمة فاتحة: أقواس مضيئة، رخام لامع، ممشى بحافة ذهبية، سبوت لايت دافي */
    var F = c.n, base = bg || '#efe6f7', L = light(base);
    var w1 = mix('#fdfbff', base, L ? .35 : .18), w2 = mix('#e7def2', base, L ? .45 : .3), fl1 = mix('#ffffff', base, .12), fl2 = mix('#d9cfe6', base, .3);
    c.defs.push('<linearGradient id="z' + F + 'wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + w1 + '"/><stop offset="1" stop-color="' + w2 + '"/></linearGradient>' +
      '<linearGradient id="z' + F + 'arch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity=".25"/></linearGradient>' +
      '<linearGradient id="z' + F + 'fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + fl1 + '"/><stop offset="1" stop-color="' + fl2 + '"/></linearGradient>' +
      '<linearGradient id="z' + F + 'rw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + mix('#f4eefa', base, .25) + '"/><stop offset="1" stop-color="' + mix('#cbbfdc', base, .3) + '"/></linearGradient>' +
      '<radialGradient id="z' + F + 'sp" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#fff8e6" stop-opacity=".95"/><stop offset=".55" stop-color="#fff3d6" stop-opacity=".25"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="z' + F + 'pool" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>');
    var s = '<rect width="200" height="252" fill="url(#z' + F + 'wall)"/>';
    /* أقواس خلفية */
    [[22, 30], [64, 22], [136, 22], [178, 30]].forEach(function (a) {
      var x = a[0], w = 30, y = a[1];
      var d = 'M' + (x - w / 2) + ' 252V' + (y + w / 2) + 'A' + (w / 2) + ' ' + (w / 2) + ' 0 0 1 ' + (x + w / 2) + ' ' + (y + w / 2) + 'V252Z';
      s += '<path d="' + d + '" fill="url(#z' + F + 'arch)" opacity=".55"/><path d="' + d + '" fill="none" stroke="#d9b862" stroke-width=".6" opacity=".7"/>';
    });
    s += '<path d="M0 46H200" stroke="#d9b862" stroke-width=".5" opacity=".5"/>';
    [[12, 70, 7], [44, 40, 5], [160, 54, 8], [190, 110, 6], [30, 150, 9], [174, 170, 7]].forEach(function (b) { s += '<circle cx="' + b[0] + '" cy="' + b[1] + '" r="' + b[2] + '" fill="#fff" opacity=".7" filter="url(#z' + F + 'b2)"/>'; });
    s += '<path d="M72 0L128 0L176 252L24 252Z" fill="url(#z' + F + 'sp)"/><ellipse cx="100" cy="0" rx="26" ry="10" fill="#fff8e6" opacity=".9" filter="url(#z' + F + 'b2)"/>';
    /* الأرض رخام + الممشى */
    s += '<rect y="252" width="200" height="28" fill="url(#z' + F + 'fl)"/>';
    s += '<path d="M10 262C40 258 60 270 90 266M120 272C150 268 170 276 196 270M0 274C20 272 30 278 50 276" stroke="#b9aecb" stroke-width=".4" fill="none" opacity=".6"/>';
    s += '<path d="M70 252L130 252L170 280L30 280Z" fill="url(#z' + F + 'rw)"/><path d="M70 252L30 280M130 252L170 280" stroke="#d9b862" stroke-width=".8"/>';
    for (var k = 0; k < 4; k++) s += '<circle cx="' + r(70 - k * 13.3) + '" cy="' + r(253 + k * 9) + '" r="1" fill="#fff3c8"/><circle cx="' + r(130 + k * 13.3) + '" cy="' + r(253 + k * 9) + '" r="1" fill="#fff3c8"/>';
    s += '<ellipse cx="100" cy="256" rx="34" ry="5" fill="url(#z' + F + 'pool)" opacity=".8"/>';
    return s;
  }
  function crowd(c) {
    var s = '', F = c.n, col = 'rgba(70,50,96,.22)', col2 = 'rgba(70,50,96,.34)';
    var ppl = function (x, y, k, cc) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + k + ')"><circle cx="0" cy="-12" r="4.2" fill="' + cc + '"/><path d="M-8.4 4Q-8 -6 0 -7.2Q8 -6 8.4 4Z" fill="' + cc + '"/></g>'; };
    [[6, 262], [20, 264], [180, 264], [194, 262]].forEach(function (q) { s += ppl(q[0], q[1], .9, col); });
    [[0, 278], [14, 280], [28, 282], [172, 282], [186, 280], [200, 278]].forEach(function (q) { s += ppl(q[0], q[1], 1.15, col2); });
    [[16, 252], [184, 256]].forEach(function (q) { s += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="6" fill="#fff" opacity=".9" filter="url(#z' + F + 'b2)"/><path d="M' + q[0] + ' ' + (q[1] - 5) + 'L' + (q[0] + 1) + ' ' + (q[1] - 1) + 'L' + (q[0] + 5) + ' ' + q[1] + 'L' + (q[0] + 1) + ' ' + (q[1] + 1) + 'L' + q[0] + ' ' + (q[1] + 5) + 'L' + (q[0] - 1) + ' ' + (q[1] + 1) + 'L' + (q[0] - 5) + ' ' + q[1] + 'L' + (q[0] - 1) + ' ' + (q[1] - 1) + 'Z" fill="#fff"/>'; });
    return s;
  }

  /* ---------- الجسم والراس ---------- */
  function headSVG(c, B, m, o) {
    var h = B.head, g = c.id('h');
    c.defs.push('<radialGradient id="' + g + '" cx=".38" cy=".35" r=".75"><stop offset="0" stop-color="' + lt(SK, .18) + '"/><stop offset=".55" stop-color="' + SK + '"/><stop offset="1" stop-color="' + dk(SK, .35) + '"/></radialGradient>');
    var s = '<ellipse cx="' + h[0] + '" cy="' + h[1] + '" rx="' + h[2] + '" ry="' + h[3] + '" transform="rotate(' + h[4] + ' ' + h[0] + ' ' + h[1] + ')" fill="url(#' + g + ')"/>';
    if (o.shayla) {
      var sh = o.shayla, cyl = c.cyl(sh.hex, h[0] - 16, h[0] + 16, { sheen: .1 });
      var back = 'M' + (h[0] - 14.4) + ' ' + (h[1] + 3) + 'C' + (h[0] - 16) + ' ' + (h[1] - 17) + ' ' + (h[0] + 16) + ' ' + (h[1] - 17) + ' ' + (h[0] + 14.4) + ' ' + (h[1] + 3) + 'C' + (h[0] + 15.6) + ' ' + (h[1] + 15) + ' ' + (h[0] + 12) + ' ' + (h[1] + 23) + ' ' + (h[0] + 20) + ' ' + (h[1] + 31) + 'C' + (h[0] + 10) + ' ' + (h[1] + 35) + ' ' + (h[0] - 10) + ' ' + (h[1] + 35) + ' ' + (h[0] - 20) + ' ' + (h[1] + 31) + 'C' + (h[0] - 12) + ' ' + (h[1] + 23) + ' ' + (h[0] - 15.6) + ' ' + (h[1] + 15) + ' ' + (h[0] - 14.4) + ' ' + (h[1] + 3) + 'Z';
      s = '<path d="' + back + '" fill="' + cyl + '"/>' + (sh.pt ? '<path d="' + back + '" fill="' + sh.pt + '"/>' : '') + '<ellipse cx="' + h[0] + '" cy="' + (h[1] + 2) + '" rx="' + (h[2] * .78) + '" ry="' + (h[3] * .82) + '" fill="url(#' + g + ')"/>';
      s += '<path d="M' + (h[0] - 8.6) + ' ' + (h[1] + 2) + 'C' + (h[0] - 9) + ' ' + (h[1] - 10) + ' ' + (h[0] + 9) + ' ' + (h[1] - 10) + ' ' + (h[0] + 8.6) + ' ' + (h[1] + 2) + '" stroke="' + dk(sh.hex, .5) + '" stroke-width="1.4" fill="none"/>';
      s += '<path d="M' + (h[0] - 10) + ' ' + (h[1] - 11) + 'C' + (h[0] - 4) + ' ' + (h[1] - 15) + ' ' + (h[0] + 6) + ' ' + (h[1] - 15) + ' ' + (h[0] + 11) + ' ' + (h[1] - 10) + '" stroke="#fff" stroke-width="1.4" fill="none" opacity=".25" filter="url(#z' + c.n + 'b1)"/>';
      return s;
    }
    s += '<ellipse cx="' + (h[0] + 2) + '" cy="' + (h[1] + h[3] * .72) + '" rx="' + (h[2] * .55) + '" ry="' + (h[3] * .2) + '" fill="' + dk(SK, .4) + '" opacity=".25" filter="url(#z' + c.n + 'b1)"/><path d="M' + (h[0] + h[2] * .7) + ' ' + (h[1] - h[3] * .3) + 'Q' + (h[0] + h[2] * .95) + ' ' + (h[1] + h[3] * .3) + ' ' + (h[0] + h[2] * .2) + ' ' + (h[1] + h[3] * .92) + '" stroke="' + dk(SK, .45) + '" stroke-width="2.2" fill="none" opacity=".35" filter="url(#z' + c.n + 'b1)"/>';
    if (m) {
      var hr = '#1d1512';
      s += '<path d="M88.8 35.4C87.6 33 87.4 37.6 89.2 39.6Z M111.4 35.4C112.6 33 112.8 37.6 111 39.6Z" fill="' + dk(SK, .2) + '" stroke="' + dk(SK, .45) + '" stroke-width=".4"/>';
      s += '<path d="M89.4 34C88 20 96 16.4 103 17.4C111 18 113.8 25 111.6 34.6C110.6 28 108 25.6 104 25.4C99 25 93.6 26 91 29.4C90.2 31 89.6 32.4 89.4 34Z" fill="' + hr + '"/><path d="M92 26C96 22 102 21 108 23M94 23C98 20.4 104 20 109 22.6M91 30C94 26.6 99 25.6 103 25.6" stroke="' + lt(hr, .3) + '" stroke-width=".5" fill="none" opacity=".7"/><path d="M93 20.6C98 18 105 18.4 109 21.6" stroke="' + lt(hr, .4) + '" stroke-width="1.2" fill="none" opacity=".7" stroke-linecap="round"/><path d="M89.6 34.4C89.4 38 89.8 40 90.4 41.6M111.4 35C111.6 38 111.2 40 110.6 41.6" stroke="' + hr + '" stroke-width="1.6"/>';
    } else if (!o.hat) {
      var hf = '#2a1a14';
      s += '<path d="M89.6 38C88.4 22 99 18.6 104.4 20.6C113.6 23 115.6 33 112.6 41C110 31 101 26.6 95.2 31C92.4 33 90.6 35.8 89.6 38Z" fill="' + hf + '"/><path d="M91 34C92 27 97 23 103 22.4M93.4 30C96 25.6 101 23.6 106 23.6M104 22C109 23.6 112 28 112.4 34" stroke="' + lt(hf, .3) + '" stroke-width=".5" fill="none" opacity=".7"/><path d="M96 23C101 21 107 22.4 110 26" stroke="' + lt(hf, .45) + '" stroke-width="1.2" fill="none" opacity=".7" stroke-linecap="round"/>';
    }
    if (!m) s += '<path d="M112 44v5" stroke="#e8c46a" stroke-width=".8"/><circle cx="112" cy="50.6" r="1.6" fill="#f6dc8c"/>';
    return s;
  }
  function handSVG(c, x, y, ang) {
    var sd = dk(SK, .38);
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + ang + ')"><path d="M-3.2 -4.4C-3.8 -1 -3.8 2.4 -3.2 5.4C-3 7.6 -2.4 9.6 -1.6 10.6C-1 11.2 -.4 10.8 -.4 10C.2 10.8 1 10.8 1.2 9.8C1.8 10.2 2.6 9.8 2.6 8.8C3.2 8.8 3.6 8 3.4 7C3.6 4 3.6 .4 3.2 -2.2C3.6 -3.4 3.2 -4.6 2.8 -5Z" fill="' + c.skin(-4, 4) + '"/><path d="M-3.2 -.6C-4.6 1.4 -4.8 4 -3.8 5.8C-3.2 4.8 -2.6 3.4 -2.4 2" fill="' + c.skin(-5, 0) + '" stroke="' + sd + '" stroke-width=".3"/><path d="M-1 4.6V10M.6 4.4V9.8M2 4.2V8.6" stroke="' + sd + '" stroke-width=".35" opacity=".55" stroke-linecap="round"/><path d="M-2.4 3.6Q0 4.6 2.8 3.4" stroke="' + lt(SK, .35) + '" stroke-width=".5" fill="none" opacity=".6"/></g>';
  }
  /* تفاصيل الجسم: ترقوة، رقبة، كوع، ركبة، كاحل، عضلات خفيفة */
  function soft(c, d, col, w, op) { return '<path d="' + d + '" stroke="' + col + '" stroke-width="' + w + '" fill="none" stroke-linecap="round" opacity="' + op + '" filter="url(#z' + c.n + 'b1)"/>'; }
  function line(d, col, w, op) { return '<path d="' + d + '" stroke="' + col + '" stroke-width="' + w + '" fill="none" stroke-linecap="round" opacity="' + op + '"/>'; }
  function torsoDetail(c, B, m) {
    var S = dk(SK, .42), H = lt(SK, .35), s = '', y = B.shY - 6;
    /* الرقبة: ظل تحت الفك + أوتار */
    s += soft(c, 'M' + (100 - B.nw + 1) + ' ' + (y - 9) + 'Q100 ' + (y - 5) + ' ' + (100 + B.nw - 1) + ' ' + (y - 9), S, 3, .45);
    s += line('M' + (97 - (m ? 1 : 0)) + ' ' + (y - 8) + 'Q' + (96.4 - (m ? 1 : 0)) + ' ' + (y - 3) + ' 98.4 ' + (y + 1) + 'M' + (103 + (m ? 1 : 0)) + ' ' + (y - 8) + 'Q' + (103.6 + (m ? 1 : 0)) + ' ' + (y - 3) + ' 101.6 ' + (y + 1), S, .45, .45);
    /* عظم الترقوة */
    var cw = m ? 22 : 17;
    s += line('M98.6 ' + (y + 2) + 'C95 ' + (y + 1) + ' ' + (100 - cw * .6) + ' ' + (y + 3.4) + ' ' + (100 - cw) + ' ' + (y + 2) + 'M101.4 ' + (y + 2) + 'C105 ' + (y + 1) + ' ' + (100 + cw * .6) + ' ' + (y + 3.4) + ' ' + (100 + cw) + ' ' + (y + 2), S, .7, .55);
    s += line('M98 ' + (y + 3.6) + 'C95 ' + (y + 2.8) + ' ' + (100 - cw * .6) + ' ' + (y + 5) + ' ' + (100 - cw + 1) + ' ' + (y + 3.8) + 'M102 ' + (y + 3.6) + 'C105 ' + (y + 2.8) + ' ' + (100 + cw * .6) + ' ' + (y + 5) + ' ' + (100 + cw - 1) + ' ' + (y + 3.8), H, .7, .5);
    s += '<ellipse cx="100" cy="' + (y + 3) + '" rx="1.6" ry="1.1" fill="' + S + '" opacity=".35"/>';
    /* أكتاف لامعة */
    s += '<ellipse cx="' + (m ? 76 : 81) + '" cy="' + (B.shY + 3) + '" rx="4" ry="2.4" fill="' + H + '" opacity=".35" filter="url(#z' + c.n + 'b1)"/><ellipse cx="' + (m ? 124 : 119) + '" cy="' + (B.shY + 3) + '" rx="4" ry="2.4" fill="' + H + '" opacity=".22" filter="url(#z' + c.n + 'b1)"/>';
    if (m) {
      /* صدر عريض + بطن مقسّم + خطوط V */
      s += soft(c, 'M77 ' + (B.shY + 24) + 'Q88 ' + (B.shY + 33) + ' 99 ' + (B.shY + 27) + 'M123 ' + (B.shY + 24) + 'Q112 ' + (B.shY + 33) + ' 101 ' + (B.shY + 27), S, 2.2, .5);
      s += line('M78 ' + (B.shY + 23) + 'Q88 ' + (B.shY + 31) + ' 99 ' + (B.shY + 26) + 'M122 ' + (B.shY + 23) + 'Q112 ' + (B.shY + 31) + ' 101 ' + (B.shY + 26), S, .8, .55);
      s += '<ellipse cx="88" cy="' + (B.shY + 17) + '" rx="8" ry="5" fill="' + H + '" opacity=".25" filter="url(#z' + c.n + 'b2)"/><ellipse cx="112" cy="' + (B.shY + 17) + '" rx="8" ry="5" fill="' + H + '" opacity=".15" filter="url(#z' + c.n + 'b2)"/>';
      s += line('M100 ' + (B.shY + 28) + 'V' + (B.waistY + 6), S, .7, .45);
      [B.shY + 36, B.shY + 45, B.shY + 54].forEach(function (yy) { s += line('M93.6 ' + yy + 'Q96.6 ' + (yy + 1.2) + ' 99 ' + yy + 'M101 ' + yy + 'Q103.4 ' + (yy + 1.2) + ' 106.4 ' + yy, S, .6, .45); });
      s += soft(c, 'M92.4 ' + (B.shY + 30) + 'Q91.4 ' + (B.shY + 46) + ' 93 ' + (B.shY + 60) + 'M107.6 ' + (B.shY + 30) + 'Q108.6 ' + (B.shY + 46) + ' 107 ' + (B.shY + 60), S, 1.4, .4);
      s += soft(c, 'M82.6 ' + (B.waistY - 16) + 'Q84 ' + (B.waistY - 4) + ' 83 ' + (B.waistY + 6) + 'M117.4 ' + (B.waistY - 16) + 'Q116 ' + (B.waistY - 4) + ' 117 ' + (B.waistY + 6), S, 2, .45);
    } else {
      s += soft(c, 'M96.6 ' + (B.waistY - 14) + 'Q96 ' + (B.waistY) + ' 97 ' + (B.waistY + 8) + 'M103.4 ' + (B.waistY - 14) + 'Q104 ' + (B.waistY) + ' 103 ' + (B.waistY + 8), S, 1.1, .35) + line('M100 ' + (B.waistY - 16) + 'V' + (B.waistY + 6), S, .5, .3);
      s += bust(c, B, S, H, 1);
      s += soft(c, 'M86.4 ' + (B.waistY - 8) + 'Q88.6 ' + (B.waistY + 2) + ' 86 ' + (B.hipY - 6) + 'M113.6 ' + (B.waistY - 8) + 'Q111.4 ' + (B.waistY + 2) + ' 114 ' + (B.hipY - 6), S, 1.6, .4);
    }
    s += '<ellipse cx="100" cy="' + (B.waistY + (m ? 10 : 9)) + '" rx=".9" ry="1.4" fill="' + S + '" opacity=".5"/>';
    s += line('M' + (m ? 86 : 88) + ' ' + (B.hipY - 4) + 'Q' + (m ? 92 : 93) + ' ' + (B.hipY + 4) + ' 98 ' + (B.crotchY - 2) + 'M' + (m ? 114 : 112) + ' ' + (B.hipY - 4) + 'Q' + (m ? 108 : 107) + ' ' + (B.hipY + 4) + ' 102 ' + (B.crotchY - 2), S, .6, .35);
    return s;
  }
  function bust(c, B, S, H, k) {
    var y = B.shY + 18;
    return soft(c, 'M84 ' + (y + 8) + 'Q91 ' + (y + 11) + ' 97 ' + (y + 7) + 'M116 ' + (y + 8) + 'Q109 ' + (y + 11) + ' 103 ' + (y + 7), S, 1.2, .25 * k);
  }
  function legDetail(c, B) {
    var S = dk(SK, .42), H = lt(SK, .4), s = '';
    [B.legL, mxp(B.legL)].forEach(function (L, i) {
      var k = L[2], a = L[4], sg = i ? -1 : 1;
      /* الركبة */
      s += line('M' + r(k[0] - 2.6) + ' ' + r(k[1] - 1) + 'Q' + k[0] + ' ' + r(k[1] + 2.6) + ' ' + r(k[0] + 2.6) + ' ' + r(k[1] - 1), S, .55, .5);
      s += '<ellipse cx="' + r(k[0] - sg * .4) + '" cy="' + r(k[1] - 3) + '" rx="2" ry="2.8" fill="' + H + '" opacity=".35" filter="url(#z' + c.n + 'b1)"/>';
      /* ظل الساق والفخذ (الجهة الخارجية) + لمعة الساق */
      s += soft(c, 'M' + r(L[1][0] - sg * (L[1][2] / 2 - 1.4)) + ' ' + r(L[1][1] - 8) + 'Q' + r(L[1][0] - sg * (L[1][2] / 2 - 1)) + ' ' + r(L[1][1] + 14) + ' ' + r(k[0] - sg * 3) + ' ' + r(k[1] - 4), S, 1.8, .4);
      s += soft(c, 'M' + r(L[3][0] - sg * 3.4) + ' ' + r(k[1] + 6) + 'Q' + r(L[3][0] - sg * 4.4) + ' ' + r(L[3][1] + 4) + ' ' + r(a[0] - sg * 2.6) + ' ' + r(a[1] - 6), S, 1.6, .45);
      s += line('M' + r(L[3][0] + sg * 1.4) + ' ' + r(k[1] + 8) + 'Q' + r(L[3][0] + sg * 1.6) + ' ' + r(L[3][1] + 8) + ' ' + r(a[0] + sg * .6) + ' ' + r(a[1] - 4), H, .7, .45);
      s += line('M' + r(L[1][0] + sg * 1.6) + ' ' + r(L[1][1] - 6) + 'Q' + r(L[1][0] + sg * 3.4) + ' ' + r(L[1][1] + 12) + ' ' + r(k[0] + sg * 1.6) + ' ' + r(k[1] - 6), S, .6, .4);
      s += '<ellipse cx="' + r(L[3][0] - sg * 1.6) + '" cy="' + r(L[3][1] - 2) + '" rx="2.2" ry="6" fill="' + H + '" opacity=".28" filter="url(#z' + c.n + 'b1)"/>';
      /* عظم الكاحل */
      s += '<circle cx="' + r(a[0] + sg * 2.2) + '" cy="' + r(a[1] + 1) + '" r=".9" fill="' + S + '" opacity=".45"/>';
    });
    return s;
  }
  function armDetail(c, A, side) {
    var S = dk(SK, .42), H = lt(SK, .4), e = A[2], s = '';
    /* عضلة الكتف + الكوع + خط المعصم */
    s += soft(c, 'M' + r(A[0][0] - side * 3.4) + ' ' + r(A[0][1] + 2) + 'Q' + r(A[1][0] - side * 4.2) + ' ' + r(A[1][1] - 6) + ' ' + r(A[1][0] - side * 3.2) + ' ' + r(A[1][1] + 2), S, 1.4, .4);
    s += line('M' + r(e[0] - 1.6) + ' ' + r(e[1] - .6) + 'q1.6 1.4 3.2 0', S, .5, .55);
    var u = A[1], w = A[3];
    s += soft(c, 'M' + r(A[0][0] + side * (A[0][2] / 2 - 2)) + ' ' + r(A[0][1] + 6) + 'Q' + r(u[0] + side * (u[2] / 2 - .6)) + ' ' + r(u[1] + 2) + ' ' + r(e[0] + side * (e[2] / 2 - 1.4)) + ' ' + r(e[1] - 3), S, 1.6, .45);
    s += '<ellipse cx="' + r((A[0][0] + u[0]) / 2 + side * 1.4) + '" cy="' + r(u[1] - 2) + '" rx="2" ry="5" fill="' + H + '" opacity=".3" filter="url(#z' + c.n + 'b1)"/>';
    s += soft(c, 'M' + r(e[0] - side * (e[2] / 2 - 1.2)) + ' ' + r(e[1] + 2) + 'Q' + r(w[0] - side * (w[2] / 2 - .4)) + ' ' + r(w[1] - 4) + ' ' + r(A[4][0] - side * 1.4) + ' ' + r(A[4][1] - 3), S, 1.3, .4);
    s += '<ellipse cx="' + r(A[1][0] + side * 1.2) + '" cy="' + r(A[1][1] - 4) + '" rx="1.6" ry="4" fill="' + H + '" opacity=".35" filter="url(#z' + c.n + 'b1)"/>';
    s += line('M' + r(A[4][0] - 2) + ' ' + r(A[4][1] - 1.4) + 'q2 1 4 0', S, .4, .45);
    return s;
  }
  function shoes(c, B, m) {
    var lg = B.legL, a = lg[lg.length - 1], sh = c.cyl('#1a1310', 80, 120, { sheen: .2 }), s = '';
    if (m) {
      s += '<path d="M' + (a[0] - 6.6) + ' ' + (a[1] - 1) + 'C' + (a[0] - 8) + ' ' + (a[1] + 4) + ' ' + (a[0] - 8) + ' ' + (a[1] + 7) + ' ' + (a[0] - 6) + ' ' + (a[1] + 8) + 'L' + (a[0] + 8) + ' ' + (a[1] + 8.6) + 'C' + (a[0] + 8.6) + ' ' + (a[1] + 6) + ' ' + (a[0] + 7.6) + ' ' + (a[1] + 2) + ' ' + (a[0] + 6) + ' ' + (a[1] - 1) + 'Z" fill="' + sh + '"/>';
      var b = 200 - a[0];
      s += '<path d="M' + (b + 6.6) + ' ' + (a[1] - 1) + 'C' + (b + 8) + ' ' + (a[1] + 4) + ' ' + (b + 8) + ' ' + (a[1] + 7) + ' ' + (b + 6) + ' ' + (a[1] + 8) + 'L' + (b - 8) + ' ' + (a[1] + 8.6) + 'C' + (b - 8.6) + ' ' + (a[1] + 6) + ' ' + (b - 7.6) + ' ' + (a[1] + 2) + ' ' + (b - 6) + ' ' + (a[1] - 1) + 'Z" fill="' + sh + '"/>';
      s += '<path d="M' + (a[0] - 5) + ' ' + (a[1] + 4.6) + 'q4 -1.4 8 -.4M' + (b - 3) + ' ' + (a[1] + 4.2) + 'q4 -1 8 .4" stroke="#fff" stroke-width=".8" opacity=".5" fill="none"/>';
    } else {
      [a[0], 200 - a[0]].forEach(function (x, i) { var y = a[1]; s += '<path d="M' + (x - 3) + ' ' + (y - 2) + 'C' + (x - 4) + ' ' + (y + 4) + ' ' + (x - 2) + ' ' + (y + 9) + ' ' + (x + (i ? 1 : -1) * .5) + ' ' + (y + 11) + 'C' + (x + 2.6) + ' ' + (y + 9) + ' ' + (x + 4) + ' ' + (y + 4) + ' ' + (x + 3) + ' ' + (y - 2) + 'Z" fill="' + sh + '"/><path d="M' + (x + (i ? -2.6 : 2.6)) + ' ' + (y + 3) + 'L' + (x + (i ? -3.4 : 3.4)) + ' ' + (y + 10.6) + '" stroke="#1a1310" stroke-width="1.2"/>'; });
    }
    return s;
  }

  /* ---------- الرسم الكامل ---------- */
  function AZ3(d, model, bg) {
    var g = window; var n = (typeof SVGN === 'number') ? ++SVGN : (g.__azn = (g.__azn || 0) + 1) + 9000;
    var c = new Ctx(n), F = n, m = (model || (d && d.model === 'm' ? 'm' : 'f')) === 'm', B = m ? BODY.m : BODY.f;
    var col = function (id) { try { return colorHex(id); } catch (e) { return '#888'; } };
    var parts = d ? [d.base, d.extra, d.extra2].filter(function (x) { return x && x.type; }).map(function (x) { return { type: x.type, hex: col(x.color), color: x.color, fabric: x.fabric, pattern: x.pattern }; }) : [];
    var ty = parts.map(function (p) { return p.type; }), has = function (t) { return ty.indexOf(t) >= 0; };
    var hasBag = has('bag'), longOuter = has('abaya') || has('daraa');
    var armL = B.armL, armR = hasBag ? B.armRbag : B.armR;
    if (m && hasBag) armR = B.armRbag;
    if (m && longOuter) { armR = B.armRbag; armL = mxp(B.armRbag); }
    var hangL = m && longOuter;
    var bagHand = m ? [armR[4][0], armR[4][1] + 3] : [armL[4][0] + .5, armL[4][1] + 3];
    var o = { armL: armL, armR: armR, bagHand: bagHand, tuck: has('shirt') && (has('pants') || has('skirt') || has('maxi')), shayla: !m && has('scarf') && longOuter };
    c.defs.push('<filter id="z' + F + 'b1" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.1"/></filter><filter id="z' + F + 'b2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.6"/></filter><filter id="z' + F + 'ds" x="-30%" y="-10%" width="160%" height="130%"><feDropShadow dx="3.2" dy="3" stdDeviation="2.6" flood-color="#3a2456" flood-opacity=".28"/></filter><linearGradient id="z' + F + 'au" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF1B8"/><stop offset=".35" stop-color="#E2B33C"/><stop offset=".6" stop-color="#9C6E12"/><stop offset=".8" stop-color="#E9C25A"/><stop offset="1" stop-color="#7A5409"/></linearGradient>');
    var Z = { full: 0, bottom: 1, top: 2, outer: 3, acc: 4 }, zone = { shirt: 'top', jacket: 'outer', pants: 'bottom', skirt: 'bottom', dress: 'full', abaya: 'outer', daraa: 'full', maxi: 'bottom', scarf: 'acc', bag: 'acc', hat: 'acc', belt: 'acc', necklace: 'acc' };
    parts.sort(function (a, b) { var za = o.tuck && a.type === 'shirt' ? .5 : Z[zone[a.type]], zb = o.tuck && b.type === 'shirt' ? .5 : Z[zone[b.type]]; return za - zb; });
    var mains = '', sleeves = '', accs = '', hat = '', bag = '', shayla = null;
    if (!has('shirt') && !has('dress') && !has('daraa') && !has('abaya') && !has('jacket')) {
      /* قطعة أساسية بسيطة إذا ما في قطعة فوق */
      var tc = m ? '#f2f2f5' : '#1d1d1f', tb = m ? B.hipY + 4 : B.waistY + 2;
      mains += c.paint(upper(B, .8, tb, null, 'round'), tc, 'cotton', 'plain', m ? 70 : 76, m ? 130 : 124, null, { y1: B.shY, y2: tb });
      if (!m) mains = mains.replace(/^/, '');
    }
    if (has('jacket') && !has('shirt') && !has('dress') && !has('daraa')) { var vy = B.shY; mains += '<path d="M' + (100 - B.nw - 2) + ' ' + (vy - 7) + 'Q100 ' + (vy + 1) + ' ' + (100 + B.nw + 2) + ' ' + (vy - 7) + 'L' + (100 + B.nw + 8) + ' ' + (vy + 4) + 'L100 ' + (vy + 34) + 'L' + (100 - B.nw - 8) + ' ' + (vy + 4) + 'Z" fill="' + c.cyl(m ? '#ececf1' : '#1d1d1f', 88, 112) + '"/>'; }
    parts.forEach(function (p) {
      var res = piece(c, B, p, m, o);
      if (res.shayla) { shayla = { hex: p.hex, pt: c.pattern(p.hex, p.pattern) }; return; }
      mains += res.S; sleeves += res.sl; accs += res.acc; if (res.hat) hat = res.hat; if (res.bag) bag = res.bag;
    });
    var fig = '';
    /* شعر خلفي (بنت بدون شيلة/قبعة) */
    if (!m && !shayla) fig += '<path d="' + cr([[90, 34], [86, 52], [82, 74], [86, 92], [80, 112], [88, 118], [94, 98], [93, 76], [95, 56]], true) + '" fill="#2a1a14"/>';
    /* الأرجل والجوتي */
    var lgR = mxp(B.legL);
    fig += '<path d="' + limb(B.legL) + '" fill="' + c.skin(80, 102) + '"/><path d="' + limb(lgR) + '" fill="' + c.skin(98, 120) + '"/>' + legDetail(c, B) + shoes(c, B, m);
    fig += '<path d="' + limb(B.neck) + '" fill="' + c.skin(94, 106) + '"/><path d="' + B.torso + '" fill="' + c.skin(m ? 68 : 76, m ? 132 : 124) + '"/>' + torsoDetail(c, B, m);
    fig += mains;
    if (!m && !has('abaya') && !has('daraa')) {
      var kf = c.clip(upper(B, 0, B.waistY + 6, null, 'deep'));
      fig += '<g clip-path="url(#' + kf + ')">' + soft(c, 'M86 ' + (B.waistY - 10) + 'Q89 ' + B.waistY + ' 86 ' + (B.waistY + 8) + 'M114 ' + (B.waistY - 10) + 'Q111 ' + B.waistY + ' 114 ' + (B.waistY + 8), '#000', 2, .3) + '</g>';
    }
    if (m && !has('jacket') && !has('abaya') && !has('daraa')) {
      var kk = c.clip(upper(B, 0, B.waistY + 8, null, 'round')), S2 = '#000';
      fig += '<g clip-path="url(#' + kk + ')" opacity=".55">' + soft(c, 'M77 ' + (B.shY + 24) + 'Q88 ' + (B.shY + 33) + ' 99 ' + (B.shY + 27) + 'M123 ' + (B.shY + 24) + 'Q112 ' + (B.shY + 33) + ' 101 ' + (B.shY + 27), S2, 2.4, .35) + soft(c, 'M92.4 ' + (B.shY + 32) + 'Q91.4 ' + (B.shY + 46) + ' 93 ' + (B.shY + 60) + 'M107.6 ' + (B.shY + 32) + 'Q108.6 ' + (B.shY + 46) + ' 107 ' + (B.shY + 60), S2, 1.6, .25) + '<ellipse cx="88" cy="' + (B.shY + 17) + '" rx="8" ry="5" fill="#fff" opacity=".25" filter="url(#z' + c.n + 'b2)"/><ellipse cx="112" cy="' + (B.shY + 17) + '" rx="8" ry="5" fill="#fff" opacity=".14" filter="url(#z' + c.n + 'b2)"/></g>';
    }
    /* الأذرع */
    var xs = function (A) { var a = A.map(function (p) { return p[0]; }); return [Math.min.apply(0, a) - 6, Math.max.apply(0, a) + 6]; }, XL = xs(armL), XR = xs(armR);
    fig += '<path d="' + limb(armL) + '" fill="' + c.skin(XL[0], XL[1]) + '"/><path d="' + limb(armR) + '" fill="' + c.skin(XR[0], XR[1]) + '"/>' + armDetail(c, armL, 1) + armDetail(c, armR, -1);
    var handsS = '';
    if (!m) { handsS += handSVG(c, armL[4][0] + .5, armL[4][1] + 3, 8); handsS += hasBag ? '' : '<g transform="translate(116.5 131) rotate(118)"><path d="M-3 -4C-3.6 0 -3.4 4 -2.4 7C-1 8.6 1.6 8.4 2.8 6.8C3.4 3 3.4 -1 3 -4.6Z" fill="' + c.skin(-4, 4) + '"/><path d="M-1 1.6V6.8M.8 1.4V6.8M2.2 1.2V5.6" stroke="' + dk(SK, .4) + '" stroke-width=".35" opacity=".6"/></g>'; if (hasBag) handsS += handSVG(c, armR[4][0] - .5, armR[4][1] + 3, -8); }
    else if (hangL) { handsS += handSVG(c, armL[4][0], armL[4][1] + 3, 4) + handSVG(c, armR[4][0], armR[4][1] + 3, -4); }
    else { if (hasBag) handsS += handSVG(c, armR[4][0], armR[4][1] + 3, -4); handsS += '<path d="M79 146.6L88.6 145' + (hasBag ? '' : 'M121 146.6L111.4 145') + '" stroke="#000" stroke-width="1.4" opacity=".35"/>'; }
    fig += sleeves + handsS + accs + bag;
    fig += headSVG(c, B, m, { hat: !!hat, shayla: shayla }) + hat;
    if (!m && !shayla && !hat) fig += '';
    var ref = 'z' + F + 'fig', mk = 'z' + F + 'mk';
    c.defs.push('<linearGradient id="z' + F + 'mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></linearGradient><mask id="' + mk + '" maskUnits="userSpaceOnUse" x="0" y="252" width="200" height="28"><rect x="0" y="252" width="200" height="28" fill="url(#z' + F + 'mg)"/></mask>');
    var st = stage(c, bg);
    var T = 'translate(100 4) scale(.87) translate(-100 -4)';
    var out = '<svg viewBox="0 0 200 280" class="dsvg az3" xmlns="http://www.w3.org/2000/svg"><defs>' + c.defs.join('') + '</defs>' + st +
      '<g mask="url(#' + mk + ')"><g transform="translate(0 504) scale(1 -1)"><use href="#' + ref + '"/></g></g>' +
      '<ellipse cx="102" cy="254" rx="30" ry="3.6" fill="#2a1840" opacity=".35" filter="url(#z' + F + 'b2)"/>' +
      '<g id="' + ref + '"><g transform="' + T + '" filter="url(#z' + F + 'ds)">' + fig + '</g></g>' + crowd(c) + '</svg>';
    return out;
  }
  window.AZ3 = AZ3;
  try { var st = document.createElement('style'); st.textContent = '.dsvg.az3{border-radius:12px;overflow:hidden}'; (document.head || document.documentElement).appendChild(st); } catch (e) { }
})();
