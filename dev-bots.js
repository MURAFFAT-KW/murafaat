/* أقنعني — عقول البوتات (نسخة المطوّر)
   كل لعبة لها دالة: brain(ctx, isBot) ترجع نص إذا سوّت حركة، أو null إذا ما في شي تسويه.
   البوت يقرأ حالة اللعبة من قاعدة البيانات المحلية ويضغط الأزرار مثل اللاعب الحقيقي. */
window.__DEV_BRAINS = window.__DEV_BRAINS || {};
(function (B) {
  'use strict';

  /* ---------- أدوات مشتركة ---------- */
  function left(G) { if (!G || !G.endsAt) return Infinity; if (G.pz > 0 && G.endsAt - Date.now() > 1e9) return G.pz; return (G.endsAt - Date.now()) / 1000; }
  function since(c, key) { var t = c.mem.ts || (c.mem.ts = {}); if (t[key] == null) t[key] = Date.now(); return (Date.now() - t[key]) / 1000; }
  // المضيف يضغط «إنهاء» إذا الكل خلص أو خلص الوقت أو طال الانتظار
  function hostEnd(c, allDone, minWait, maxWait, key) {
    var w = since(c, 'H' + key);
    if (w < (minWait || 2)) return null;
    var el = c.$('#endBtn'); if (!el || !c.vis(el)) return null;
    var g = c.G();
    if (allDone || left(g) <= 0 || w > (maxWait || 600)) { c.clickEl(el); return 'المضيف: إنهاء المرحلة (' + key + ')'; }
    return null;
  }
  function doneIn(c, G, phase, filter) {
    return (G.players || []).filter(filter || function () { return true; }).every(function (p) { var m = c.inp(p.id); return m && m.done && m.done[phase] === G.gameNo; });
  }
  function startLobby(c, G) {
    if (!c.isHost()) return null;
    if (since(c, 'lobby') < 2) return null;
    var names = (G.players || []).map(function (p) { return p.name; });
    var waiting = (c.D.bots || []).filter(function (b) { return names.indexOf(b.name) < 0; });
    if (waiting.length && since(c, 'lobby') < 40) return null;
    if (c.click('startGame')) return 'المضيف: بدأ اللعبة';
    return null;
  }

  /* =====================================================================
     الأزياء
     ===================================================================== */
  B.azyaa = function (c, isBot) {
    var G = c.G(), me = c.me(); if (!G || !me) return null;
    var host = c.isHost(), m = c.inp(me.id) || {}, ph = G.phase, gn = G.gameNo;
    if (ph === 'lobby') return startLobby(c, G);
    if (c.has('closeModal') && ph !== 'shop') { c.click('closeModal'); return '.'; }
    var mineDone = m.done && m.done[ph] === gn;

    if (ph === 'buy') {
      if (!mineDone) {
        var mem = c.mem; since(c, 'buy' + gn);
        if (c.has('togPerk')) {
          if (!mem.perkTried) { mem.perkTried = 1; if (Math.random() < 0.5 && c.click('togPerk', null, 'rand')) return 'اشترى ميزة'; }
          if (c.click('sub', null, function (l) { return l.find(function (e) { return e.dataset.v === 'mat'; }); })) return '.';
        }
        var plan = mem.plan || (mem.plan = { types: c.rnd(2, 3), fabrics: 2, colors: 2 });
        var keys = ['types', 'fabrics', 'colors'];
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i], have = (m[k] || []).length;
          if (have < plan[k]) {
            var opts = c.acts('togOwn').filter(function (e) { return e.dataset.k === k && !e.classList.contains('on'); });
            if (opts.length) { c.clickEl(c.pick(opts)); return 'اشترى خامة (' + k + ')'; }
          }
        }
        var st = m.store || {};
        if (!st.bg) { var b1 = c.acts('setStore').filter(function (e) { return e.dataset.k === 'bg'; }); if (b1.length) { c.clickEl(c.pick(b1)); return 'اختار خلفية المتجر'; } }
        if (!st.border) { var b2 = c.acts('setStore').filter(function (e) { return e.dataset.k === 'border'; }); if (b2.length) { c.clickEl(c.pick(b2)); return 'اختار إطار المتجر'; } }
        if (c.click('markDone')) return 'خلص الشراء';
      }
      if (host) return hostEnd(c, doneIn(c, G, 'buy'), 3, 400, 'buy');
      return null;
    }

    if (ph === 'design') {
      if (!mineDone) {
        if (c.has('saveD')) {
          var mm = c.mem; if (!mm.ed) mm.ed = { n: 0 };
          var ed = mm.ed;
          if (ed.n < 3) {
            var opt = c.acts('setD').filter(function (e) { return !e.classList.contains('on') && !(e.dataset.part === 'extra' && e.dataset.key !== 'type' && Math.random() < 0.3); });
            ed.n++;
            if (opt.length && c.clickEl(c.pick(opt))) return '.';
          }
          if (ed.price == null) ed.price = c.rnd(-2, 6);
          if (ed.price !== 0) { var up = ed.price > 0; ed.price += up ? -1 : 1; if (c.click('price', null, function (l) { return l.find(function (e) { return e.dataset.v === (up ? '1' : '-1'); }); })) return '.'; }
          c.fill('#dname', c.pick(c.en ? ['Night', 'Desert Rose', 'Pearl', 'Urban', 'Breeze', 'Royal'] : ['ليل', 'وردة الصحراء', 'لؤلؤ', 'أوربن', 'نسمة', 'ملكي']) + ' ' + c.rnd(1, 99));
          c.mem.ed = null; if (c.click('saveD')) return 'حفظ تصميم';
          return null;
        }
        var dz = m.designs || [];
        var idx = dz.findIndex(function (d) { return !d; });
        if (idx >= 0) { if (c.click('edit', null, function (l) { return l.find(function (e) { return +e.dataset.i === idx; }); })) return 'يصمم تصميم ' + (idx + 1); }
        else if (c.click('markDone')) return 'خلص التصاميم';
      }
      if (host) return hostEnd(c, doneIn(c, G, 'design'), 3, 600, 'design');
      return null;
    }

    if (ph === 'build') {
      if (!mineDone) {
        var br = m.brand || {};
        var fm = c.mem.filled || (c.mem.filled = {});
        if (!br.name && !fm['n' + gn]) { fm['n' + gn] = 1; c.fill('#bname', c.pick(c.en ? ['Noor', 'Velvet House', 'Dar Style', 'Sadu', 'Lulu'] : ['نور', 'بيت المخمل', 'دار ستايل', 'سدو', 'لولو']) + ' ' + c.rnd(1, 9)); return 'سمّى البراند'; }
        if (!br.desc && !fm['d' + gn]) { fm['d' + gn] = 1; c.fill('#bdesc', c.en ? 'Modern pieces with a Gulf touch.' : 'قطع عصرية بلمسة خليجية.'); return 'كتب وصف البراند'; }
        if (m.featured == null) { if (c.click('feat', null, 'rand')) return 'اختار القطعة المميزة'; }
        if ((m.perks || []).indexOf('sale') >= 0 && !m.discount) { if (c.click('disc', null, function (l) { return l.find(function (e) { return e.dataset.v === '1'; }); })) return 'حط تنزيلات'; }
        if (c.click('markDone')) return 'خلص بناء المشروع';
      }
      if (host) return hostEnd(c, doneIn(c, G, 'build'), 3, 400, 'build');
      return null;
    }

    if (ph === 'talk') {
      var t = G.talk || {};
      var sp = t.speakers && t.speakers[t.idx];
      if (sp === me.id && c.has('extra') && Math.random() < 0.05) { c.click('extra'); return 'استخدم الوقت الإضافي'; }
      if (host) return hostEnd(c, false, 6, 25, 'talk' + t.round + '.' + t.idx);
      return null;
    }

    if (ph === 'shop') {
      var sh = G.shop || {}, key = 'shop' + sh.round, w = since(c, key);
      var mem2 = c.mem; if (mem2.k2 !== key) { mem2.k2 = key; mem2.visits = c.rnd(1, 3); mem2.inStore = 0; }
      var wallet = (G.wallet && G.wallet[me.id] != null) ? G.wallet[me.id] : 50;
      if (c.has('buy') || c.has('closeModal')) {
        mem2.inStore++;
        if (mem2.inStore > 1 && wallet > 0 && Math.random() < 0.7) {
          var buys = c.acts('buy');
          if (buys.length) { buys.sort(function () { return Math.random() - 0.5; }); c.clickEl(buys[0]); return 'اشترى قطعة'; }
        }
        if (mem2.inStore > 2) { c.click('closeModal'); return '.'; }
        return '.';
      }
      if (mem2.visits > 0 && w > 1) { mem2.visits--; mem2.inStore = 0; if (c.click('openStore', null, 'rand')) return 'زار متجر'; }
      if (host) return hostEnd(c, false, 8, 30, key);
      return null;
    }

    if (ph === 'vote') {
      var v = m.vote;
      if (!(v && v.g === gn)) {
        // يصوّت للمتجر اللي فيه أكثر تصاميم مكتملة (مع شوية عشوائية)
        var cards = c.acts('vote');
        if (cards.length) {
          var best = cards.map(function (e) { var st = (G.stores || {})[e.dataset.id] || {}; return { e: e, s: (st.designs || []).filter(Boolean).length + Math.random() * 3 }; }).sort(function (a, b) { return b.s - a.s; })[0];
          c.clickEl(best.e); return 'صوّت للإبداع';
        }
      }
      if (host) { var all = (G.players || []).every(function (p) { var x = (c.inp(p.id) || {}).vote; return x && x.g === gn; }); return hostEnd(c, all, 3, 120, 'vote'); }
      return null;
    }
    return null;
  };

  /* =====================================================================
     العقار
     ===================================================================== */
  function r10(v) { return Math.max(10, Math.round(v / 10) * 10); }
  B.aqar = function (c, isBot) {
    var G = c.G(), me = c.me(); if (!G || !me) return null;
    var CF = (typeof CONFIG !== 'undefined') ? CONFIG : null, SV = (typeof specValue === 'function') ? specValue : null;
    if (!CF || !SV) return null;
    var host = c.isHost(), m = c.inp(me.id) || {}, ph = G.phase, gn = G.gameNo, mem = c.mem;
    if (ph === 'lobby') return startLobby(c, G);
    var mineDone = m.done && m.done[ph] === gn;
    var budget = (G.budget || {})[me.id] || 0;

    // نافذة استخدام ميزة مفتوحة
    if (c.has('perkGo')) { var sel = c.$('#pt'); if (sel && sel.options.length) c.fill(sel, sel.options[c.rnd(0, sel.options.length - 1)].value); c.click('perkGo'); return 'استخدم ميزة'; }
    // نافذة عرض شراء مفتوحة
    if (c.has('sendOffer')) {
      var opb = c.acts('op')[0], vEl = opb && opb.parentElement && opb.parentElement.querySelector('.v');
      var tgt = mem.offerTarget, cur = +(((vEl || {}).textContent || '').replace(/[^0-9]/g, '')) || 0;
      if (ph !== 'deals' || (mem.sendTries = (mem.sendTries || 0) + 1) > 45) { mem.sendTries = 0; mem.offerTarget = null; c.click('closeModal'); return 'سكّر نافذة العرض'; }
      if (tgt && cur && Math.abs(cur - tgt) >= 10 && (mem.opClicks = (mem.opClicks || 0) + 1) < 40) { c.click('op', null, function (l) { return l.find(function (e) { return e.dataset.v === (tgt > cur ? '1' : '-1'); }); }); return '.'; }
      mem.opClicks = 0; mem.offerTarget = null;
      if (tgt == null && mem.sentOnce) { mem.sentOnce = 0; mem.sendTries = 0; c.click('closeModal'); return 'العرض ما انرسل (الميزانية؟)'; }
      mem.sentOnce = 1;
      if (c.click('sendOffer')) { mem.sendTries = 0; return 'قدّم عرض شراء بـ ' + cur; }
      c.click('closeModal'); return '.';
    }
    if (c.has('closeModal')) { c.click('closeModal'); return '.'; }

    if (ph === 'setup') {
      if (!mineDone) {
        var perks = m.perks || [], props = m.props || [];
        if (!mem.sp) mem.sp = { perks: c.rnd(1, 2), props: c.rnd(1, 3), q: null };
        var sp = mem.sp, spent = perks.length * CF.perkPrice + props.reduce(function (a, x) { return a + SV(x); }, 0), bud = G.settings.budget - spent;
        if (c.has('togPerk')) {
          if (perks.length < sp.perks) {
            var good = ['budgetUp', 'protect', 'outbid', 'deposit', 'budgetDown', 'violation'];
            var opts = c.acts('togPerk').filter(function (e) { return !e.classList.contains('perk') || !e.classList.contains('on'); }).filter(function (e) { return good.indexOf(e.dataset.id) >= 0 && perks.indexOf(e.dataset.id) < 0; });
            if (opts.length) { c.clickEl(c.pick(opts)); return 'اشترى ميزة'; }
          }
          if (c.click('sub', null, function (l) { return l.find(function (e) { return e.dataset.v === 'props'; }); })) return '.';
        }
        if (c.has('buyProp')) {
          // تسعير العقارات اللي اشتراها: سعر العرض أعلى من القيمة بـ 10–40٪
          for (var i = 0; i < props.length; i++) {
            var p0 = props[i], want = mem['ask' + p0.key] || (mem['ask' + p0.key] = r10(SV(p0) * (1.1 + Math.random() * 0.3)));
            if (p0.asking < want) { if (c.click('setupAsk', null, function (l) { return l.find(function (e) { return e.dataset.key === p0.key && e.dataset.v === '1'; }); })) return '.'; }
          }
          if (props.length < sp.props && (props.length === 0 || bud > G.settings.budget * 0.35)) {
            if (!sp.q) {
              // يخطط بيت يناسب ميزانيته (يخلي فلوس للشراء)
              var cap = props.length === 0 ? bud * 0.6 : bud * 0.5, plan = null;
              for (var t = 0; t < 60 && !plan; t++) {
                var x = { area: c.pick(CF.areas).id, land: c.pick(CF.lands).id, floors: c.rnd(1, CF.maxFloors), style: c.pick(CF.styles).id, basement: Math.random() < 0.3, color: Math.random() < 0.6 ? 'white' : c.pick(CF.colors).id, extras: CF.extras.filter(function () { return Math.random() < 0.3; }).map(function (e) { return e.id; }) };
                if (SV(x) <= cap) plan = x;
              }
              if (!plan) { sp.props = props.length; return null; }
              sp.q = [['area', plan.area], ['land', plan.land], ['style', plan.style], ['color', plan.color]].map(function (a) { return { k: a[0], v: a[1] }; })
                .concat(plan.extras.map(function (e) { return { k: 'extras', v: e }; }))
                .concat([{ fl: plan.floors }, { bs: plan.basement }]);
            }
            var st = sp.q.shift();
            if (st) {
              if (st.k) { var el = c.acts('setDraft').find(function (e) { return e.dataset.k === st.k && e.dataset.v === st.v; }); if (el && !(st.k !== 'extras' && el.classList.contains('on'))) { c.clickEl(el); return '.'; } return '.'; }
              if (st.fl) { var curF = +((c.$('.stepper .v') || {}).textContent || 1); if (curF !== st.fl) { sp.q.unshift(st); c.click('floors', null, function (l) { return l.find(function (e) { return e.dataset.v === (st.fl > curF ? '1' : '-1'); }); }); return '.'; } return '.'; }
              if (st.bs != null) { c.click('basement', null, function (l) { return l.find(function (e) { return e.dataset.v === (st.bs ? '1' : '0'); }); }); return '.'; }
            }
            sp.q = null;
            if (c.click('buyProp')) return 'بنى عقار';
          }
          if (c.click('markDone')) return 'خلص تجهيز المكتب';
        }
      }
      if (host) return hostEnd(c, doneIn(c, G, 'setup'), 3, 500, 'setup');
      return null;
    }

    var myPerks = ((G.perks || {})[me.id] || []).filter(function (k) { return ((G.used || {})[me.id] || []).indexOf(k) < 0; });
    function usePerk(ids, chance) {
      var b = c.acts('perk').filter(function (e) { return ids.indexOf(e.dataset.id) >= 0 && !e.dataset.t; });
      if (b.length && Math.random() < chance) { c.clickEl(b[0]); return 'فتح ميزة ' + b[0].dataset.id; }
      return null;
    }

    if (ph === 'pre') {
      var k1 = 'pre' + G.round;
      if (!mem[k1]) { mem[k1] = 1; var u = usePerk(['budgetUp', 'violation', 'budgetDown'], 0.35); if (u) return u; }
      if (host && since(c, 'Hpre' + G.round) > 3) { if (c.click('startPitches')) return 'المضيف: بدأ العروض'; }
      return null;
    }

    if (ph === 'pitch') {
      var cp = (G.presenters || [])[G.pIdx] || {};
      if (cp.id === me.id) {
        var kk = 'pp' + G.round + '.' + G.pIdx;
        if (!mem[kk]) { mem[kk] = 1; var mineP = (G.props || []).filter(function (x) { return x.owner === me.id; }).sort(function (a, b) { return b.asking - a.asking; });
          if (mineP.length > 1 && cp.prop !== mineP[0].id && c.click('pitchProp', null, function (l) { return l.find(function (e) { return +e.dataset.id === mineP[0].id; }); })) return 'اختار عقار يعرضه'; }
      }
      if (host) return hostEnd(c, false, 5, 20, 'pitch' + G.round + '.' + G.pIdx);
      return null;
    }

    if (ph === 'deals') {
      var rk = 'deals' + G.round, w = since(c, rk);
      // يرد على العروض
      var inc = (G.offers || []).filter(function (o) { return o.seller === me.id; });
      if (inc.length && w > 1.5) {
        var o = inc[0], pr = (G.props || []).find(function (x) { return x.id === o.propId; }) || {};
        var floor = Math.max((pr.cost || 0) * 1.0, (pr.asking || 0) * (0.72 + Math.random() * 0.13));
        var ok = o.price >= floor;
        if (c.click('offerResp', null, function (l) { return l.find(function (e) { return e.dataset.id === o.id && e.dataset.ok === (ok ? '1' : '0'); }); })) return (ok ? 'قبل' : 'رفض') + ' عرض بـ ' + o.price;
      }
      var rq = (G.rentReqs || []).filter(function (q) { return q.owner === me.id; });
      if (rq.length) { var okr = Math.random() < 0.6; if (c.click('rentResp', null, function (l) { return l.find(function (e) { return e.dataset.id === rq[0].id && e.dataset.ok === (okr ? '1' : '0'); }); })) return (okr ? 'وافق' : 'رفض') + ' على إيجار'; }
      // يشتري: يقدّر القيمة من المواصفات (الأسعار معروفة للكل) ويقارنها بالسعر المطلوب
      if (!mem[rk]) mem[rk] = { tries: c.rnd(1, 3), asked: {} };
      var dm = mem[rk];
      if (dm.tries > 0 && w > 2 + Math.random() * 4) {
        var mine2 = (G.offers || []).filter(function (o) { return o.buyer === me.id; }).map(function (o) { return o.propId; });
        var cands = (G.props || []).filter(function (x) { return x.owner !== me.id && mine2.indexOf(x.id) < 0 && !dm.asked[x.id]; }).map(function (x) { var est = SV(x); return { x: x, est: est, deal: est / x.asking }; })
          .filter(function (a) { return a.x.asking <= a.est * 1.3 && budget >= r10(Math.min(a.x.asking, a.est)) * 0.8; }).sort(function (a, b) { return b.deal - a.deal; });
        dm.tries--;
        if (cands.length) {
          var best = cands[0], target = r10(Math.min(best.x.asking, best.est * (0.85 + Math.random() * 0.3)));
          if (target > budget) target = r10(budget - 10);
          if (target >= 10 && c.click('openOffer', null, function (l) { return l.find(function (e) { return +e.dataset.id === best.x.id; }); })) { dm.asked[best.x.id] = 1; mem.offerTarget = target; return 'يفتح عرض على عقار'; }
        }
      }
      // يعدّل سعر عقاره إذا ما أحد اهتم
      if (w > 12 && !dm.cut && Math.random() < 0.3) { dm.cut = 1; var myp = (G.props || []).filter(function (x) { return x.owner === me.id; })[0]; if (myp && myp.asking > SV(myp) && c.click('ask', null, function (l) { return l.find(function (e) { return +e.dataset.id === myp.id && e.dataset.v === '-1'; }); })) return 'نزّل سعر عقاره'; }
      if (!dm.perk && w > 4) { dm.perk = 1; var up = usePerk(['protect', 'budgetUp'], 0.25); if (up) return up; }
      if (host) { var busy = (G.offers || []).length > 0; return hostEnd(c, !busy && w > 18, 8, 60, rk); }
      return null;
    }

    if (ph === 'summary') {
      if (host && since(c, 'Hsum' + G.round) > 3) { if (c.click('summaryNext')) return 'المضيف: الجولة الجاية'; }
      return null;
    }

    if (ph === 'vote') {
      var v = m.vote;
      if (!(v && v.g === gn) && c.has('vote')) { c.click('vote', null, 'rand'); return 'صوّت لأفضل إقناع'; }
      if (host) { var all = (G.players || []).every(function (p) { var x = (c.inp(p.id) || {}).vote; return x && x.g === gn; }); return hostEnd(c, all, 3, 60, 'vote'); }
      return null;
    }
    return null;
  };

  /* =====================================================================
     المنصة (مرافعات)
     ===================================================================== */
  var ANS_AR = ['نعم', 'لا', 'أكيد', 'مستحيل', 'يعتمد', 'أحيانًا', 'طبعًا لا', 'أفضل شي', 'مو مهم', 'الاثنين', 'الصبح', 'بالليل', 'البحر', 'البر', 'القهوة', 'الشاي'];
  var ANS_EN = ['Yes', 'No', 'Definitely', 'Never', 'Depends', 'Sometimes', 'Of course not', 'The best', 'Not important', 'Both', 'Morning', 'Night', 'Sea', 'Desert', 'Coffee', 'Tea'];
  var Q_AR = ['الأكل البيتي أحسن من المطاعم؟', 'الصيف أحلى من الشتا؟', 'السفر بروحك أحسن؟', 'القهوة أهم من الفطور؟', 'الدوام من البيت أحسن؟'];
  var Q_EN = ['Is home food better than restaurants?', 'Is summer better than winter?', 'Is solo travel better?', 'Is coffee more important than breakfast?', 'Is working from home better?'];
  // جواب له علاقة بالسؤال: من الخيارات الجاهزة للسؤال، وإلا من نص السؤال نفسه
  function ansFor(c, G, qid) {
    var q = (G.qmap || {})[qid] || {}, o = q.opts, t = String(q.text || '');
    if (o && o.length) return c.pick(o);
    var m = t.match(/^(.+?)\s+(?:أحسن|أفضل|أهم|أحلى|أصعب|أسهل)\s+من\s+(.+?)[؟?]?$/) || t.match(/^(.+?)\s+(?:better|more important|nicer|harder|easier)\s+than\s+(.+?)[؟?]?$/i);
    if (m) return c.pick([m[1].replace(/^(هل|is|are)\s+/i, ''), m[2]]);
    m = t.match(/^(.+?)\s+(?:ولا|أو|or)\s+(.+?)[؟?]?$/i);
    if (m) return c.pick([m[1].replace(/^(هل|is|are)\s+/i, ''), m[2]]);
    return c.pick(c.en ? ['Yes', 'No'] : ['أكيد', 'لا أبد']);
  }
  B.murafaat = function (c, isBot) {
    var G = c.G(), me = c.me(); if (!G || !me) return null;
    var host = c.isHost(), ph = G.phase, mem = c.mem;
    if (ph === 'lobby') return startLobby(c, G);
    if (c.click('forceGo')) return 'المضيف: كمّل بدون الباقين';
    // نوافذ اختيار (مساعد / شاهد)
    if (c.has('pickHelper')) { c.click('pickHelper', null, 'rand'); return 'اختار مساعد'; }
    if (c.has('pickWitness')) { c.click('pickWitness', null, 'rand'); return 'استدعى شاهد'; }
    var wt = c.$('#wtext'); if (wt && c.vis(wt) && c.has('witSubmit')) { var cw = G.cur || {}, da = cw.defA || '', db = cw.defB || '', fa = Math.random() < 0.5, x1 = fa ? da : db, x2 = fa ? db : da;
      c.fill(wt, c.en ? 'From what I\'ve seen, «' + x1 + '» makes more sense than «' + x2 + '».' : 'من تجربتي، «' + x1 + '» أصح من «' + x2 + '».'); c.click('witSubmit'); return 'كتب شهادته'; }
    if (c.has('objVote') && !mem['obj' + G.caseNo + (G.cur && G.cur.obj ? G.cur.obj.at || '' : '')]) { mem['obj' + G.caseNo + (G.cur && G.cur.obj ? G.cur.obj.at || '' : '')] = 1; c.click('objVote', null, 'rand'); return 'صوّت على الاعتراض'; }

    if (ph === 'perks') {
      if (c.has('confirmPerks')) {
        if (mem.pk == null) { mem.pk = c.rnd(1, 3); }
        if (mem.pk > 0) { mem.pk--; var free = c.acts('togglePerk').filter(function (e) { return !e.classList.contains('on'); }); if (free.length && Math.random() < 0.8) { c.clickEl(c.pick(free)); return 'اختار ميزة'; } }
        if (c.click('confirmPerks')) return 'أكد المزايا';
      }
      if (host) return hostEnd2(c, 'perksNext', 3, 30, 'perks');
      return null;
    }
    if (ph === 'qwrite') {
      if (c.has('submitQs')) {
        var fs = c.$$('textarea.field, input.field').filter(c.vis);
        fs.forEach(function (f, i) { if (!f.value) c.fill(f, (c.en ? Q_EN : Q_AR)[(i + c.rnd(0, 4)) % 5]); });
        c.click('submitQs'); return 'كتب أسئلة';
      }
      if (host) return hostEnd2(c, 'qwriteNext', 3, 30, 'qwrite');
      return null;
    }
    if (ph === 'qreview') { if (host) return hostEnd2(c, 'startAnswers', 3, 20, 'qreview'); return null; }
    if (ph === 'answers') {
      if (c.has('submitAnswers')) {
        c.$$('[data-bind="ans"]').forEach(function (f) { if (!f.value) c.fill(f, ansFor(c, G, f.getAttribute('data-q'))); });
        c.click('submitAnswers'); return 'كتب إجاباته السرية';
      }
      if (host) return hostEnd2(c, 'answersNext', 3, 30, 'answers' + G.ansRound);
      return null;
    }
    if (ph === 'nocase') { if (host && since(c, 'nc' + G.caseNo) > 2) { if (c.click('skipCase')) return 'المضيف: تخطى السؤال'; } return null; }
    if (ph === 'addq') { if (host) { if (c.click('presetQ', null, 'rand')) return '.'; if (c.click('submitAddQ')) return 'المضيف: أضاف سؤال'; c.click('cancelAddQ'); } return null; }

    if (ph === 'case') {
      var cur = G.cur || {}, st = cur.stage, key = 'c' + G.caseNo + st + (cur.round || '');
      if (st === 'vote') {
        var vkey = 'v' + (cur.vote && cur.vote.key || G.caseNo);
        if (!mem[vkey]) {
          var opts = c.acts('pick');
          if (opts.length && !c.$('.vopt.on')) { var r = Math.random(); var pk = r < 0.45 ? opts[0] : r < 0.9 ? opts[1] || opts[0] : opts[opts.length - 1]; c.clickEl(pk); return '.'; }
          if (c.click('confirmVote')) { mem[vkey] = 1; return 'صوّت'; }
        }
        if (host) { var vd = (cur.vote && cur.vote.done || []).length, need = Math.max(1, (G.players || []).length - 2 - (cur.helperA ? 1 : 0) - (cur.helperB ? 1 : 0)); if (vd >= need && since(c, 'H2v' + key) > 2) { if (c.click('endVote')) return 'المضيف: endVote (الكل صوّت)'; } }
        if (host) return hostEnd2(c, 'endVote', 30, 30, key);
        return null;
      }
      if (st === 'done') {
        if (c.has('reqAppeal') && !mem['ap' + G.caseNo] && Math.random() < 0.15) { mem['ap' + G.caseNo] = 1; c.click('reqAppeal'); return 'طلب استئناف'; }
        if (c.has('confirmAppeal')) { c.click('confirmAppeal'); return 'أكد الاستئناف'; }
        if (host) { var w = since(c, 'H' + key); if (w > 4) { var order = ['nextCase', 'tiebreak', 'finalAppeal', 'noAppeal']; for (var i = 0; i < order.length; i++) if (c.click(order[i])) return 'المضيف: ' + order[i]; } }
        return null;
      }
      if (st === 'tally1' && !host && c.has('reqAppeal') && !mem['ra' + G.caseNo] && since(c, 'ra' + key) > 2) { mem['ra' + G.caseNo] = 1; if (Math.random() < 0.4) { c.click('reqAppeal'); return 'طلب استئناف'; } }
      if (st === 'tally1' || st === 'tally2') { if (host) { var w2 = since(c, 'H' + key); if (w2 > 3 && (c.click('next') || c.click('nextCase') || c.click('tiebreak') || c.click('finalAppeal') || c.click('confirmAppeal') || c.click('noAppeal'))) return 'المضيف: بعد النتيجة'; } return null; }
      // مرحلة الكلام: الطرفين يستخدمون مزايا أحيانًا
      var pb = c.acts('perk').filter(function (e) { return !e.classList.contains('used'); });
      if (pb.length && !mem['pp' + key] && Math.random() < 0.3) { mem['pp' + key] = 1; c.clickEl(c.pick(pb)); return 'استخدم ميزة'; }
      mem['pp' + key] = 1;
      if (host) { var w3 = since(c, 'H' + key); if (w3 > 5 && c.click('next')) return 'المضيف: المرحلة اللي بعدها (' + st + ')'; }
      return null;
    }
    return null;
  };
  function hostEnd2(c, act, minWait, maxWait, key) {
    var w = since(c, 'H2' + key); if (w < minWait) return null;
    var prog = c.$$('.prog .chip, .progress .chip, .pchips .chip').length;
    if (w > maxWait || /(\d+)\s*(من|of|\/)\s*\1/.test(c.text())) { if (c.click(act)) return 'المضيف: ' + act; if (c.click('force')) return 'المضيف: كمّل'; }
    return null;
  }

  /* =====================================================================
     المزاد
     ===================================================================== */
  var ITEMS_AR = ['ريموت التلفزيون', 'مخدة الكنبة', 'كوب القهوة', 'شاحن التلفون', 'ساعة الحايط', 'نظارة شمسية', 'قلم', 'مفتاح السيارة'];
  var ITEMS_EN = ['TV remote', 'Sofa cushion', 'Coffee mug', 'Phone charger', 'Wall clock', 'Sunglasses', 'Pen', 'Car key'];
  B.mazad = function (c, isBot) {
    var G = c.G(), me = c.me(); if (!G || !me) return null;
    var host = c.isHost(), ph = G.phase, mem = c.mem, m = c.inp(me.id) || {};
    if (ph === 'lobby') { if (host && !mem.src && c.click('setSrc', /جاهز|Ready|ready/)) { mem.src = 1; return 'المضيف: أغراض جاهزة'; } return startLobby(c, G); }
    if (c.has('perkGo')) { c.$$('select.field').forEach(function (s2) { if (s2.options.length) c.fill(s2, s2.options[c.rnd(0, s2.options.length - 1)].value); }); c.click('perkGo'); return 'استخدم ميزة'; }

    if (ph === 'perks') {
      if (c.has('sendPerks')) {
        if (mem.pk == null) mem.pk = 3;
        if (mem.pk > 0) { var free = c.acts('togglePerk').filter(function (e) { return !e.classList.contains('on') && e.getAttribute('aria-pressed') !== 'true'; }); mem.pk--; if (free.length) { c.clickEl(c.pick(free)); return 'اختار ميزة'; } }
        if (c.click('sendPerks')) return 'أرسل مزاياه';
      }
      if (host) return hostEnd2(c, 'perksNext', 3, 30, 'perks');
      return null;
    }
    if (ph === 'items') {
      if (c.has('sendItems')) {
        c.$$('[data-bind="item"]').forEach(function (f) { if (!f.value) c.fill(f, c.pick(c.en ? ITEMS_EN : ITEMS_AR)); });
        c.click('sendItems'); return 'كتب أغراض';
      }
      if (host) return hostEnd2(c, 'itemsNext', 3, 30, 'items');
      return null;
    }
    if (ph === 'round') {
      var cur = G.cur || {}, st = cur.stage, key = cur.key + st, w = since(c, key);
      var wallet = ((G.econ || {})[me.id] || {}).w;
      if (st === 'vote') {
        var v = m.vote;
        if (!(v && v.key === cur.key)) {
          if (!mem['vp' + cur.key]) { mem['vp' + cur.key] = 1; if (c.click('pick', null, 'rand')) return '.'; }
          if (c.click('sendVote')) return 'صوّت على الغرض';
        }
      } else if (st === 'price') {
        var side = cur.a === me.id ? 'a' : cur.b === me.id ? 'b' : null;
        if (side && !(m.price && m.price.key === cur.key && m.price.ver === (cur.pv || {})[side])) {
          if (!mem['pp' + cur.key]) {
            mem['pp' + cur.key] = 1;
            // يستخدم ميزة أحيانًا
            var pb = c.acts('perk'); if (pb.length && Math.random() < 0.35) { c.clickEl(c.pick(pb)); return 'فتح ميزة'; }
            var ps = c.acts('pset'); if (ps.length) { var vals = ps.map(function (e) { return +e.dataset.v; }); var target = c.rnd(4, 14); var best = ps.sort(function (x, y) { return Math.abs(+x.dataset.v - target) - Math.abs(+y.dataset.v - target); })[0]; c.clickEl(best); return '.'; }
          }
          if (c.click('sendPrice')) return 'حط سعر';
        }
      } else if (st === 'buy') {
        var isSeller = cur.a === me.id || cur.b === me.id;
        if (!isSeller && !cur.closed && !(m.buy && m.buy.key === cur.key)) {
          // كل بوت ياخذ وقت تفكير مختلف، عشان مو نفس الشخص يسبق كل مرة
          if (mem['bd' + cur.key] == null) mem['bd' + cur.key] = c.rnd(1, 9);
          if (w < mem['bd' + cur.key]) return null;
          if (!mem['bp' + cur.key]) {
            mem['bp' + cur.key] = 1;
            var pr = cur.prices || {}, cap = wallet == null ? 20 : wallet;
            var opts = ['a', 'b'].filter(function (k) { return pr[k] != null && pr[k] <= cap; });
            var choice = 'x';
            if (opts.length) {
              opts.sort(function (x, y) { return pr[x] - pr[y] + (Math.random() - 0.5) * 3; });
              var p0 = pr[opts[0]];
              // سعر حلو = يشتري غالبًا، معقول = أحيانًا، غالي = نادرًا
              var want = p0 <= 6 ? 0.9 : p0 <= 9 ? 0.6 : p0 <= 13 ? 0.3 : 0.1;
              if (Math.random() < want) choice = opts[0];
            }
            var el = c.acts('pick').find(function (e) { return e.dataset.v === choice; }) || c.acts('pick').find(function (e) { return e.dataset.v === 'x'; });
            if (el) { c.clickEl(el); return '.'; }
          }
          if (c.click('sendBuy')) return 'قرر الشراء';
        }
      } else if ((st === 'pitch1' || st === 'pitch2') && cur[cur.speaker] === me.id && w > 6) {
        if (!mem['pd' + key]) { mem['pd' + key] = 1; if (c.click('pitchDone')) return 'خلص عرضه'; }
      }
      if (host) {
        if (st === 'result') { if (w > 4 && c.click('nextRound')) return 'المضيف: الجولة الجاية'; return null; }
        // ما شي ينتقل بروحه: المضيف ينقل كل مرحلة
        var mx = st === 'reveal' ? 4 : (st === 'pitch1' || st === 'pitch2') ? (cur.spDone === st ? 3 : 12) : st === 'buy' ? (cur.closed ? 3 : 14) : 12;
        if (w > mx && c.click('skip')) return 'المضيف: إنهاء (' + st + ')';
      }
      return null;
    }
    return null;
  };

  /* =====================================================================
     الرئيس (نادييك)
     ===================================================================== */
  B.nadik = function (c, isBot) {
    var G = c.G(), me = c.me(); if (!G || !me) return null;
    var host = c.isHost(), ph = G.phase, mem = c.mem, m = c.inp(me.id) || {};
    if (ph === 'lobby') return startLobby(c, G);
    if (c.has('closeModal') && !c.has('sendVote')) { c.click('closeModal'); return '.'; }
    var own = G.own || {}, roster = Object.keys(own).filter(function (k) { return own[k] === me.id; });
    var val = function (k) { return (G.val && G.val[k] != null) ? G.val[k] : (G.settings.base || 5); };
    var bal = (G.bal || {})[me.id] || 0;

    if (ph === 'picks') {
      if (!(m.picks && m.picks.g === G.gameNo) && c.has('sendPicks')) {
        var sw = c.$('#pt-w'), ss = c.$('#pt-s');
        if (sw && ss && sw.options && sw.options.length > 2) {
          if (!mem.pkW) { mem.pkW = c.rnd(1, sw.options.length - 1); c.fill(sw, sw.options[mem.pkW].value); return 'اختار الفريق الأضعف'; }
          if (!mem.pkS) { var b0; do { b0 = c.rnd(1, ss.options.length - 1); } while (ss.options.length > 2 && ss.options[b0].value === sw.options[mem.pkW].value); mem.pkS = b0; c.fill(ss, ss.options[b0].value); return 'اختار الفريق الأقوى'; }
        } else {
          // وضع «اكتب تشكيلتك»: يعبي الخانات بأسماء
          var NM = c.en ? ['Salem', 'Bader', 'Fahad', 'Hamad', 'Nasser', 'Jassim', 'Mishal', 'Talal', 'Ahmad', 'Saud', 'Faisal', 'Majed', 'Waleed', 'Turki'] : ['سالم', 'بدر', 'فهد', 'حمد', 'ناصر', 'جاسم', 'مشعل', 'طلال', 'أحمد', 'سعود', 'فيصل', 'ماجد', 'وليد', 'تركي'];
          c.$$('input.field').filter(c.vis).forEach(function (f, i) { if (!f.value) c.fill(f, NM[i % NM.length] + ' ' + c.rnd(1, 99)); });
        }
        if (c.click('sendPicks')) { return 'أرسل الفريقين'; }
        mem.pkW = mem.pkS = 0; return '.';
      }
      if (host) return hostEnd2(c, 'picksNext', 3, 30, 'picks');
      return null;
    }
    if (ph === 'tier') {
      if (!(m.tier && m.tier.g === G.gameNo) && c.has('tierPick')) {
        if (!mem['t' + G.gameNo]) { mem['t' + G.gameNo] = 1; c.click('tierPick', null, 'rand'); return 'اختار القوة'; }
        if (c.click('sendTier')) return 'أكد الاختيار';
      }
      if (host) return hostEnd2(c, 'tierNext', 3, 30, 'tier');
      return null;
    }
    if (ph === 'reveal') {
      if (c.click('ready')) return 'جاهز للسوق';
      if (host && since(c, 'rv' + G.gameNo) > 4) { if (c.click('revealNext')) return 'المضيف: فتح السوق'; }
      return null;
    }
    if (ph === 'market') {
      var mk = G.mk || {}, key = mk.key + mk.stage, w = since(c, key);
      if (mk.stage === 'list') {
        if (!(m.list && m.list.key === mk.key) && c.has('toggleList')) {
          var plan = mem['L' + mk.key];
          if (!plan) {
            var sorted = roster.slice().sort(function (x, y) { return val(x) - val(y); });
            var spare = Math.max(1, Math.min(2, roster.length - 5));
            plan = mem['L' + mk.key] = { pks: sorted.slice(0, spare), adj: {} };
            plan.pks.forEach(function (k) { plan.adj[k] = c.rnd(0, 3); });
          }
          for (var i = 0; i < plan.pks.length; i++) {
            var k = plan.pks[i], el = c.acts('toggleList').find(function (e) { return e.dataset.k === k; });
            var on = c.acts('askAdj').some(function (e) { return e.dataset.k === k; });
            if (el && !on) { c.clickEl(el); return '.'; }
            if (on && plan.adj[k] > 0) { plan.adj[k]--; if (c.click('askAdj', null, function (l) { return l.find(function (e) { return e.dataset.k === k && e.dataset.v === '1'; }); })) return '.'; }
          }
          if (c.click('sendList')) return 'عرض ' + plan.pks.length + ' لاعب للبيع';
        }
      } else if (mk.stage === 'bid') {
        var mb = m.bids;
        if (!(mb && mb.key === mk.key && mb.done) && c.has('sendBids')) {
          var bp = mem['B' + mk.key];
          if (!bp) {
            var listed = Object.keys(mk.lst || {}).filter(function (l) { return mk.lst[l].seller !== me.id; });
            var myListed = Object.keys(mk.lst || {}).filter(function (l) { return mk.lst[l].seller === me.id; }).length;
            var need = Math.max(0, 5 - (roster.length - myListed)) + (Math.random() < 0.4 ? 1 : 0);
            var room = 9 - roster.length;
            var cand = listed.filter(function (l) { return mk.lst[l].ask <= bal; }).sort(function (x, y) { return (mk.lst[x].ask - val(mk.lst[x].pk)) - (mk.lst[y].ask - val(mk.lst[y].pk)) + (Math.random() - 0.5) * 4; });
            var take = [], spend = 0;
            cand.forEach(function (l) { if (take.length < Math.min(need, room) && spend + mk.lst[l].ask + 2 <= bal) { take.push(l); spend += mk.lst[l].ask + 2; } });
            bp = mem['B' + mk.key] = { q: take, adj: {} };
            take.forEach(function (l) { bp.adj[l] = c.rnd(0, 2); });
          }
          while (bp.q.length) {
            var l0 = bp.q[0], has = c.acts('bidDel').some(function (e) { return e.dataset.l === l0; });
            if (!has) { if (c.click('bidNew', null, function (l) { return l.find(function (e) { return e.dataset.l === l0; }); })) return 'قدّم عرض على لاعب'; bp.q.shift(); continue; }
            if (bp.adj[l0] > 0) { bp.adj[l0]--; if (c.click('bidAdj', null, function (l) { return l.find(function (e) { return e.dataset.l === l0 && e.dataset.v === '1'; }); })) return '.'; }
            bp.q.shift();
          }
          if (w > 2 && c.click('sendBids')) return 'خلص المزايدة';
        }
      } else if (c.click('ready')) return 'جاهز';
      if (host) { var mx = mk.stage === 'review' ? 6 : 25; if (w > 3 && (w > mx || /(\d+)\s*(من|of|\/)\s*\1/.test(c.text()))) { if (c.click('skip')) return 'المضيف: إنهاء (' + mk.stage + ')'; } }
      return null;
    }
    if (ph === 'lineup') {
      if (!(m.xi && m.xi.g === G.gameNo) && (c.has('sendXI') || c.has('xiAuto'))) {
        if (!mem['xi' + G.gameNo]) { mem['xi' + G.gameNo] = 1; if (c.click('xiAuto')) return 'اختار التشكيلة'; }
        if (c.click('sendXI')) return 'أرسل التشكيلة';
      }
      if (host && since(c, 'xi' + G.gameNo) > 4) { if (c.click('cupStart')) return 'المضيف: بدأ الكأس'; if (c.click('skip')) return 'المضيف: كمّل'; }
      return null;
    }
    if (ph === 'cup') {
      var cup = G.cup || {}, ck = 'cup' + (cup.mi != null ? cup.mi : '') + (cup.round || '') + cup.stage, w2 = since(c, ck);
      if (c.has('pick') && !mem['v' + ck]) {
        if (!mem['vp' + ck]) { mem['vp' + ck] = 1; if (c.click('pick', null, 'rand')) return '.'; }
        mem['v' + ck] = 1; if (c.click('sendVote')) return 'صوّت بالكأس';
      }
      if (host) { if (w2 > 4 && (c.click('cupNext') || (w2 > 20 && c.click('skip')))) return 'المضيف: الكأس'; if (w2 > 3 && c.click('cupStart')) return 'المضيف: بدأ الكأس'; }
      return null;
    }
    return null;
  };
})(window.__DEV_BRAINS);
