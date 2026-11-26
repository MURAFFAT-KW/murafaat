/* أقنعني — إضافات مشتركة لكل الألعاب (2026-11-25)
   ١) سطر تلميح قصير لكل مرحلة   ٢) انتقال بين المراحل مع ٣-٢-١   ٣) صورة نتائج تنشرها
   تعتمد على window.AQS اللي تعرّفه كل لعبة (G و U و isHost)، وما تكتب أي شي بقاعدة البيانات. */
(function () {
  'use strict';
  if (window.AQPLUS) return; window.AQPLUS = 1;
  var EN = /-en\.html/.test(location.pathname) || document.documentElement.lang === 'en';
  var GAME = (location.pathname.split('/').pop() || '').replace(/(-en)?\.html$/, '');
  if (!/^(murafaat|mazad|nadik|azyaa|aqar)$/.test(GAME)) return;
  var BOT = /[?&]bot=/.test(location.search) || /[?&]inspect=1/.test(location.search);
  function T(a, e) { return EN ? e : a; }
  var COLOR = { murafaat: '#DE0921', mazad: '#0554A4', nadik: '#E0A800', azyaa: '#7B2FBE', aqar: '#1E8A4C' }[GAME];
  var GNAME = { murafaat: ['المنصة', 'MANASSA'], mazad: ['المزاد', 'MAZAD'], nadik: ['الرئيس', 'RAEES'], azyaa: ['الأزياء', 'AZYAA'], aqar: ['العقار', 'AQAR'] }[GAME];

  /* اسم المرحلة + التلميح: [عربي, English, تلميح عربي, English hint] */
  var P = {
    murafaat: {
      perks: ['المزايا', 'Perks', 'اختر مزاياك بسرية. كل ميزة تنستخدم مرة وحدة باللعبة.', 'Pick your perks in secret. Each one works once per game.'],
      qwrite: ['كتابة الأسئلة', 'Writing questions', 'اكتب أسئلة تختلف عليها الآراء، محد يشوف اللي تكتبه.', 'Write questions people disagree on. Nobody sees what you write.'],
      qreview: ['مراجعة الأسئلة', 'Reviewing questions', 'المضيف يراجع الأسئلة قبل لا نبدأ.', 'The host reviews the questions before we start.'],
      addq: ['أسئلة زيادة', 'More questions', 'نحتاج أسئلة زيادة، أضيفوا.', 'We need a few more questions. Add some.'],
      answers: ['الإجابات السرية', 'Secret answers', 'جاوب بسرية، محد يعرف إجابتك.', 'Answer in secret. Nobody will know your answer.'],
      'case': ['المرافعة', 'The debate', 'كل طرف يقنع الجمهور برأيه، وبعدها التصويت.', 'Each side convinces the crowd, then everyone votes.'],
      nocase: ['ما في مرافعة', 'No debate', 'هالمرة الكل اتفق، نكمل للي بعده.', 'Everyone agreed this time. On to the next.']
    },
    mazad: {
      perks: ['المزايا', 'Perks', 'اختر ٣ مزايا بسرية، تستخدمها وأنت بايع.', 'Pick 3 perks in secret. You use them while selling.'],
      items: ['الأغراض', 'Products', 'جهّزوا الأغراض اللي بتنباع.', 'Get the products ready for sale.'],
      round: ['البيعة', 'The sale', 'بايعين يقنعونكم بنفس الغرض، وأول مشتري يأكد ياخذه.', 'Two sellers pitch the same item. The first buyer to confirm gets it.']
    },
    nadik: {
      picks: ['التشكيلات', 'Squads', 'اختر تشكيلتين تاريخيتين بسرية.', 'Pick two historic squads in secret.'],
      tier: ['اختيار الفئة', 'Tier pick', 'اختر: الفريق الأقوى أو الأضعف.', 'Choose: the stronger team or the weaker one.'],
      reveal: ['الكشف', 'Reveal', 'انكشفت التشكيلات!', 'The squads are revealed!'],
      market: ['سوق الانتقالات', 'Transfer market', 'اشتر وبيع لاعبين بميزانيتك.', 'Buy and sell players with your budget.'],
      lineup: ['خماسي الكأس', 'Cup five', 'اختر خماسيك للكأس.', 'Choose your five for the cup.'],
      cup: ['الكأس', 'The cup', 'أقنع الجمهور يصوّت لفريقك.', 'Convince the crowd to vote for your team.']
    },
    azyaa: {
      buy: ['الشراء', 'Buying', 'اشتر الخامات والمزايا من رأس مالك.', 'Buy materials and perks from your capital.'],
      design: ['التصميم', 'Design', 'صمّم تشكيلتك، وشوف العارضة وأنت تختار.', 'Design your collection and watch the mannequin as you pick.'],
      build: ['بناء المشروع', 'Building the project', 'سمّ البراند، اكتب وصفه، واختر قطعتك المميزة.', 'Name your brand, describe it and pick your signature piece.'],
      talk: ['الإقناع', 'Pitching', 'الحين دور الإقناع: خلّ الناس يزورون متجرك.', 'Pitch time: get people to visit your store.'],
      shop: ['السوق', 'Market', 'زر المتاجر واشتر من محفظة التسوق.', 'Visit the stores and buy with your shopping wallet.'],
      vote: ['التصويت', 'Voting', 'صوّت لأفضل مصمم، ما تقدر تصوّت لنفسك.', 'Vote for the best designer. You can’t vote for yourself.']
    },
    aqar: {
      setup: ['التجهيز', 'Setup', 'اختر مزاياك وابنِ عقاراتك بميزانيتك.', 'Pick perks and build your properties with your budget.'],
      pre: ['قبل الجولة', 'Before the round', 'تقدر تستخدم مزاياك الحين.', 'You can use your perks now.'],
      pitch: ['العرض', 'Pitch', 'صاحب المكتب يعرض عقاره ويقنعكم.', 'The office owner pitches their property.'],
      deals: ['الصفقات', 'Deals', 'فاوضوا وكمّلوا الصفقات قبل لا يخلص الوقت.', 'Negotiate and close deals before time runs out.'],
      summary: ['ملخص الجولة', 'Round summary', 'هذي نتيجة الجولة.', 'Here is how the round went.'],
      vote: ['التصويت', 'Voting', 'صوّت لأفضل إقناع.', 'Vote for the best pitch.']
    }
  }[GAME] || {};

  var css = document.createElement('style');
  css.textContent =
    '.aqhint{display:flex;align-items:center;gap:8px;margin:8px 0 2px;padding:8px 12px;border-radius:14px;background:color-mix(in srgb,' + COLOR + ' 9%,#fff);color:#12203A;font-size:.86rem;font-weight:600;line-height:1.5;border:1px solid color-mix(in srgb,' + COLOR + ' 22%,#fff)}' +
    '.aqhint i{font-style:normal;font-size:1rem}' +
    'html[data-theme="dark"] .aqhint{background:color-mix(in srgb,' + COLOR + ' 18%,#141C2E);color:#E8EDF5;border-color:color-mix(in srgb,' + COLOR + ' 35%,#141C2E)}' +
    '.aqtr{position:fixed;inset:0;z-index:9998;display:grid;place-items:center;background:radial-gradient(120% 90% at 50% 20%,color-mix(in srgb,' + COLOR + ' 55%,#12203A),#0E1626);color:#fff;text-align:center;font-family:"Readex Pro","Alexandria",system-ui,sans-serif;animation:aqtrIn .25s ease both;cursor:pointer}' +
    '.aqtr.out{animation:aqtrOut .35s ease both}' +
    '.aqtr small{display:block;font-size:1rem;opacity:.75;font-weight:700;margin-bottom:6px}' +
    '.aqtr h2{margin:0;font-size:clamp(2rem,9vw,3.4rem);font-weight:800}' +
    '.aqtr .n{margin-top:18px;font:800 clamp(3.2rem,16vw,6rem)/1 "Alexandria",system-ui,sans-serif;color:#FBC611;animation:aqtrPop .5s cubic-bezier(.2,.9,.25,1.4) both}' +
    '@keyframes aqtrIn{from{opacity:0}}@keyframes aqtrOut{to{opacity:0;transform:scale(1.04)}}@keyframes aqtrPop{from{opacity:0;transform:scale(.4)}}' +
    '@media (prefers-reduced-motion:reduce){.aqtr,.aqtr .n{animation:none}}' +
    '.aqshare{display:block;width:100%;margin:12px 0 0;border:0;border-radius:16px;padding:14px;font:800 1rem "Readex Pro","Alexandria",system-ui,sans-serif;background:' + COLOR + ';color:#fff;box-shadow:inset 0 -3px 0 rgba(0,0,0,.15)}' +
    'html.aq-tv .aqhint{font-size:1rem}';
  (document.head || document.documentElement).appendChild(css);

  function S() { return window.AQS || null; }
  function st() { var s = S(); if (!s) return null; try { return { G: s.G, U: s.U, host: s.isHost() }; } catch (e) { return null; } }

  /* ---------- ١) سطر التلميح ---------- */
  function hint(x) {
    var app = document.getElementById('app'); if (!app) return;
    var old = app.querySelector('.aqhint');
    var g = x && x.G, u = x && x.U, txt = '';
    if (g && u && u.code && !u.splash && !u.notice && !/^(home|join|kicked)$/.test(u.view || '')) {
      if (g.phase === 'lobby') txt = x.host ? T('شارك الكود، وابدأ لما يكتمل العدد.', 'Share the code and start when everyone is in.') : T('انطر المضيف يبدأ اللعبة.', 'Wait for the host to start the game.');
      else if (P[g.phase]) txt = EN ? P[g.phase][3] : P[g.phase][2];
    }
    if (!txt) { if (old) old.remove(); return; }
    if (old && old.dataset.t === txt) return;
    if (old) old.remove();
    var top = app.querySelector('header.top') || app.querySelector('.top');
    var d = document.createElement('div'); d.className = 'aqhint'; d.dataset.t = txt; d.setAttribute('role', 'note');
    d.innerHTML = '<i>💡</i><span></span>'; d.lastChild.textContent = txt;
    if (top && top.parentNode) top.parentNode.insertBefore(d, top.nextSibling); else app.insertBefore(d, app.firstChild);
  }

  /* ---------- ٢) الانتقال بين المراحل ---------- */
  var lastKey = null, trT = null;
  function phaseKey(g) { return g.phase + '|' + (g.round || g.season || g.caseNo || '') ; }
  function transition(x) {
    var g = x && x.G; if (!g || !x.U || !x.U.code) { lastKey = null; return; }
    var k = phaseKey(g);
    if (lastKey === null) { lastKey = k; return; }          /* أول مرة ندخل الصفحة: لا */
    if (k === lastKey) return;
    lastKey = k;
    if (g.phase === 'lobby' || g.phase === 'final' || !P[g.phase] || BOT) return;
    var name = EN ? P[g.phase][1] : P[g.phase][0];
    var rd = g.round || g.season || g.caseNo;
    var sub = rd ? T('الجولة ', 'Round ') + rd : T(GNAME[0], GNAME[1]);
    show(name, sub);
  }
  function show(name, sub) {
    var o = document.querySelector('.aqtr'); if (o) o.remove();
    clearTimeout(trT);
    o = document.createElement('div'); o.className = 'aqtr'; o.setAttribute('aria-live', 'polite');
    o.innerHTML = '<div><small></small><h2></h2><div class="n">3</div></div>';
    o.querySelector('small').textContent = sub; o.querySelector('h2').textContent = name;
    document.body.appendChild(o);
    var n = 3, el = o.querySelector('.n');
    function beep() { try { if (window.AQFX && AQFX.on() && AQFX.fx.tick) AQFX.fx.tick(); } catch (e) { } }
    beep();
    function step() {
      n--;
      if (n <= 0) { close(); return; }
      var c = el.cloneNode(); c.textContent = n; el.replaceWith(c); el = c; beep();
      trT = setTimeout(step, 550);
    }
    function close() { clearTimeout(trT); if (!o.parentNode) return; o.classList.add('out'); setTimeout(function () { o.remove(); }, 350); }
    o.addEventListener('click', close);
    trT = setTimeout(step, 550);
  }

  /* ---------- ٣) صورة النتائج ---------- */
  function podiumData(p) {
    var out = [];
    p.querySelectorAll('.pod').forEach(function (x) {
      var n = x.querySelector('b,.pn'), blk = x.querySelector('.blk,.pb');
      if (!n) return;
      var r = blk ? +String(blk.textContent).replace(/[^\d]/g, '') || 0 : 0;
      if (!r) r = x.classList.contains('p1') || x.classList.contains('g') ? 1 : x.classList.contains('p2') || x.classList.contains('s') ? 2 : 3;
      var sc = '', all = x.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) { var e = all[i]; if (e.children.length || e === n || e === blk) continue; var t = (e.textContent || '').trim(); if (/\d/.test(t) && /[^\d\s]/.test(t) && t.length < 24) { sc = t; break; } }
      out.push({ n: n.textContent.trim(), r: r, s: sc });
    });
    return out.sort(function (a, b) { return a.r - b.r; }).slice(0, 3);
  }
  function loadImg(src) { return new Promise(function (res) { var i = new Image(); i.onload = function () { res(i); }; i.onerror = function () { res(null); }; i.src = src; }); }
  function drawCard(data) {
    var W = 1080, H = 1350, c = document.createElement('canvas'); c.width = W; c.height = H;
    var x = c.getContext('2d');
    var bg = x.createRadialGradient(W / 2, 260, 60, W / 2, 600, 1100);
    bg.addColorStop(0, '#22375F'); bg.addColorStop(.55, '#12203A'); bg.addColorStop(1, '#0A1426');
    x.fillStyle = bg; x.fillRect(0, 0, W, H);
    x.fillStyle = COLOR; x.fillRect(0, 0, W, 16); x.fillRect(0, H - 16, W, 16);
    return loadImg('icon-512.png').then(function (logo) {
      if (logo) { x.save(); var s = 230; x.beginPath(); if (x.roundRect) x.roundRect(W / 2 - s / 2, 90, s, s, 52); else x.rect(W / 2 - s / 2, 90, s, s); x.clip(); x.drawImage(logo, W / 2 - s / 2, 90, s, s); x.restore(); }
      x.direction = EN ? 'ltr' : 'rtl'; x.textAlign = 'center'; x.fillStyle = '#fff';
      x.font = '800 92px "Alexandria","Readex Pro",system-ui,sans-serif';
      x.fillText(T(GNAME[0], GNAME[1]), W / 2, 430);
      x.font = '600 40px "Readex Pro",system-ui,sans-serif'; x.fillStyle = 'rgba(255,255,255,.7)';
      x.fillText(T('نتيجة جلستنا', 'Our results'), W / 2, 495);
      var cols = { 1: ['#FBC611'], 2: ['#C9D2E0'], 3: ['#E59B5A'] };
      var slot, hgt = { 1: 330, 2: 250, 3: 190 }, base = 1120, med = { 1: '🥇', 2: '🥈', 3: '🥉' };
      if (EN) slot = { 2: W / 2 - 300, 1: W / 2, 3: W / 2 + 300 }; else slot = { 2: W / 2 + 300, 1: W / 2, 3: W / 2 - 300 };
      data.forEach(function (d) {
        var r = Math.min(3, Math.max(1, d.r)), cx = slot[r], h = hgt[r], w = 260;
        var grd = x.createLinearGradient(0, base - h, 0, base); grd.addColorStop(0, cols[r][0]); grd.addColorStop(1, 'rgba(255,255,255,.08)');
        x.fillStyle = grd; x.beginPath(); if (x.roundRect) x.roundRect(cx - w / 2, base - h, w, h, [26, 26, 0, 0]); else x.rect(cx - w / 2, base - h, w, h); x.fill();
        x.fillStyle = '#12203A'; x.font = '800 96px "Alexandria",system-ui,sans-serif'; x.fillText(String(r), cx, base - h + 110);
        x.font = '72px system-ui'; x.fillText(med[r], cx, base - h - 150);
        x.fillStyle = '#fff'; x.font = '800 44px "Readex Pro",system-ui,sans-serif';
        var nm = d.n; while (x.measureText(nm).width > 290 && nm.length > 2) nm = nm.slice(0, -1); if (nm !== d.n) nm += '…';
        x.fillText(nm, cx, base - h - 60);
        if (d.s) { x.font = '600 30px "Readex Pro",system-ui,sans-serif'; x.fillStyle = 'rgba(255,255,255,.7)'; x.fillText(d.s.slice(0, 20), cx, base - h - 18); }
      });
      x.fillStyle = 'rgba(255,255,255,.9)'; x.font = '700 40px "Readex Pro",system-ui,sans-serif';
      x.fillText(T('أقنعني · ألعاب جماعية', 'AQNINI · party games'), W / 2, 1215);
      x.fillStyle = '#FBC611'; x.font = '700 34px "Readex Pro",system-ui,sans-serif'; x.direction = 'ltr';
      x.fillText('muraffat-kw.github.io/murafaat', W / 2, 1275);
      return c;
    });
  }
  function share(p, btn) {
    var data = podiumData(p); if (!data.length) return;
    btn.disabled = true; var lbl = btn.textContent; btn.textContent = T('لحظة…', 'One moment…');
    var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    fontsReady.then(function () { return drawCard(data); }).then(function (c) {
      c.toBlob(function (b) {
        btn.disabled = false; btn.textContent = lbl;
        if (!b) return;
        var f = null; try { f = new File([b], 'aqnieni-' + GAME + '.png', { type: 'image/png' }); } catch (e) { }
        if (f && navigator.canShare && navigator.canShare({ files: [f] })) { navigator.share({ files: [f], title: T('أقنعني', 'AQNINI') }).catch(function () { }); return; }
        var url = URL.createObjectURL(b), a = document.createElement('a'); a.href = url; a.download = 'aqnieni-' + GAME + '.png'; document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      }, 'image/png');
    });
  }
  function shareBtn() {
    if (BOT) return;
    document.querySelectorAll('.podium').forEach(function (p) {
      var host = p.parentNode; if (!host || host.querySelector('.aqshare')) return;
      var b = document.createElement('button'); b.type = 'button'; b.className = 'aqshare'; b.textContent = T('📸 شارك صورة النتائج', '📸 Share the results');
      b.addEventListener('click', function () { share(p, b); });
      p.insertAdjacentElement('afterend', b);
    });
  }

  var pend = false;
  function tick() { pend = false; var x = st(); hint(x); transition(x); shareBtn(); }
  new MutationObserver(function () { if (!pend) { pend = true; requestAnimationFrame(tick); } }).observe(document.documentElement, { childList: true, subtree: true });
})();

/* أقنعني — بلاغ وطرد (2026-11-26): زر 🚩 بكل الألعاب
   أي لاعب يقدر يبلّغ عن لاعب أو محتوى، والمضيف يقدر يطرد أي لاعب بأي وقت (ما يقدر يرجع لنفس الغرفة).
   البلاغات تنحفظ في docs/feedback بنوع report. الإيميل الرسمي: عبّه في AQ_CONTACT_EMAIL لما يجهز. */
(function () {
  'use strict';
  if (window.AQREPORT) return; window.AQREPORT = 1;
  var AQ_CONTACT_EMAIL = ''; // ← الإيميل الرسمي للتواصل والبلاغات (فاضي لين يجهز)
  var EN = /-en\.html/.test(location.pathname) || document.documentElement.lang === 'en';
  var GAME = (location.pathname.split('/').pop() || '').replace(/(-en)?\.html$/, '');
  if (!/^(murafaat|mazad|nadik|azyaa|aqar)$/.test(GAME)) return;
  if (/[?&]bot=/.test(location.search)) return;
  var DEV = /[?&](dev|inspect)=/.test(location.search);
  function T(a, e) { return EN ? e : a; }
  function S() { return window.AQS || null; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var REASONS = [['name', 'اسم مسيء', 'Offensive name'], ['talk', 'كلام أو محتوى مسيء', 'Offensive words or content'], ['cheat', 'غش أو تخريب', 'Cheating or trolling'], ['other', 'شي ثاني', 'Something else']];
  var st = { open: false, step: 'list', target: null, reason: '', note: '', sent: {}, confirm: null, err: '' };

  var css = document.createElement('style');
  css.textContent =
    '#aqrep{position:fixed;left:12px;bottom:calc(14px + env(safe-area-inset-bottom));z-index:70;width:44px;height:44px;border-radius:50%;background:#fff;border:1.5px solid #D5DBE5;display:grid;place-items:center;font-size:19px;line-height:1;box-shadow:0 4px 14px rgba(18,32,58,.14);cursor:pointer}' +
    '#aqrep[hidden]{display:none}' +
    '#aqrepov{position:fixed;inset:0;z-index:9990;background:rgba(14,22,48,.55);display:flex;align-items:flex-end;justify-content:center}' +
    '#aqrepov .sh{background:#fff;color:#12203A;width:100%;max-width:560px;max-height:88vh;overflow:auto;border-radius:22px 22px 0 0;padding:20px 18px calc(22px + env(safe-area-inset-bottom));font:500 15px/1.6 "Readex Pro","Alexandria",system-ui,sans-serif;direction:' + (EN ? 'ltr' : 'rtl') + '}' +
    '#aqrepov h3{margin:0 0 4px;font-size:1.15rem}#aqrepov .mu{color:#5B6678;font-size:.88rem;margin:0 0 12px}' +
    '#aqrepov .row{display:flex;align-items:center;gap:8px;padding:10px 0;border-bottom:1px solid #EEF1F5}#aqrepov .row b{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '#aqrepov button{font:700 14px "Readex Pro","Alexandria",system-ui,sans-serif;border-radius:12px;padding:8px 12px;border:1.5px solid #D5DBE5;background:#fff;color:#12203A;cursor:pointer}' +
    '#aqrepov button.red{background:#DE0921;border-color:#DE0921;color:#fff}#aqrepov button.pri{background:#12203A;border-color:#12203A;color:#fff}#aqrepov button.wide{width:100%;padding:13px;margin-top:10px;font-size:15px}' +
    '#aqrepov .chips{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 10px}#aqrepov .chips button.on{background:#12203A;color:#fff;border-color:#12203A}' +
    '#aqrepov textarea{width:100%;box-sizing:border-box;border:1.5px solid #D5DBE5;border-radius:12px;padding:10px;font:inherit;resize:vertical}' +
    '#aqrepov .tag{font-size:.78rem;color:#5B6678;background:#F4F6F9;border-radius:99px;padding:2px 9px}' +
    '#aqrepov .ok{background:#ECFDF3;color:#067647;border-radius:12px;padding:10px 12px;font-weight:700;margin:8px 0}' +
    '#aqrepov .er{color:#C81E1E;font-size:.86rem;min-height:1em}#aqrepov .ct{margin-top:14px;font-size:.82rem;color:#5B6678;text-align:center}';
  document.head.appendChild(css);

  var btn = document.createElement('button');
  btn.id = 'aqrep'; btn.type = 'button'; btn.hidden = true; btn.textContent = '🚩';
  btn.setAttribute('aria-label', T('بلاغ وإدارة اللاعبين', 'Report & players'));
  btn.addEventListener('click', function () { st.open = true; st.step = 'list'; st.confirm = null; draw(); });
  function mount() { if (!document.body.contains(btn)) document.body.appendChild(btn); }

  function ctx() {
    var s = S(); if (!s) return null;
    var G = s.G, U = s.U; if (!G || !U || !G.code) return null;
    return { s: s, G: G, U: U, me: s.me ? s.me() : null, host: s.isHost && s.isHost() };
  }
  function tick() {
    mount();
    var c = ctx();
    var show = !!(c && /^(game|wait|spect)$/.test(c.U.view || '') && !document.querySelector('.splash'));
    btn.hidden = !show;
    if (!show && st.open) close();
  }
  setInterval(tick, 700);

  function close() { st.open = false; var o = document.getElementById('aqrepov'); if (o) o.remove(); }
  function contact() {
    return '<div class="ct">' + T('للتواصل مع فريق أقنعني: ', 'Contact the AQNINI team: ') + (AQ_CONTACT_EMAIL ? '<a href="mailto:' + esc(AQ_CONTACT_EMAIL) + '">' + esc(AQ_CONTACT_EMAIL) + '</a>' : T('الإيميل الرسمي قريبًا', 'official email coming soon')) + '</div>';
  }
  function draw() {
    var o = document.getElementById('aqrepov');
    if (!st.open) { if (o) o.remove(); return; }
    var c = ctx(); if (!c) { close(); return; }
    var kicked = c.G.kicked || {}, h = '';
    if (st.step === 'list') {
      var others = (c.G.players || []).filter(function (p) { return p.id !== c.me; });
      h = '<h3>🚩 ' + T('بلاغ وإدارة اللاعبين', 'Report & players') + '</h3><p class="mu">' +
        (c.host ? T('تقدر تطرد أي لاعب يسيء، وما يقدر يرجع لنفس الغرفة. وتقدر تبلّغنا عنه بعد.', 'You can remove anyone who misbehaves; they can’t rejoin this room. You can also report them to us.')
          : T('إذا أحد أساء أو كتب شي مو زين، بلّغنا. المضيف يقدر يطرده من الغرفة.', 'If someone is abusive or writes something offensive, report it. The host can remove them from the room.')) + '</p>';
      h += others.map(function (p) {
        var k = !!kicked[p.id];
        return '<div class="row"><b>' + esc(p.name) + '</b>' + (k ? '<span class="tag">' + T('مطرود', 'Removed') + '</span>' : '') +
          (st.sent[p.id] ? '<span class="tag">' + T('تم البلاغ ✓', 'Reported ✓') + '</span>' : '<button type="button" data-rp="rep" data-id="' + esc(p.id) + '">' + T('بلاغ', 'Report') + '</button>') +
          (c.host && !k ? '<button type="button" class="red" data-rp="kick" data-id="' + esc(p.id) + '">' + T('طرد', 'Remove') + '</button>' : '') + '</div>';
      }).join('') || '<p class="mu">' + T('ما في لاعبين ثانيين للحين.', 'No other players yet.') + '</p>';
      h += (st.sent._content ? '<div class="ok">' + T('وصل بلاغك عن المحتوى، شكرًا.', 'Your content report was sent, thanks.') + '</div>' : '<button type="button" class="wide" data-rp="rep" data-id="_content">' + T('بلاغ عن سؤال أو منتج أو محتوى مسيء', 'Report an offensive question, product or content') + '</button>');
      if (st.confirm) {
        var tp = (c.G.players || []).filter(function (p) { return p.id === st.confirm; })[0];
        h += '<div class="ok" style="background:#FEF3F2;color:#B42318">' + T('متأكد تطرد ', 'Remove ') + esc(tp ? tp.name : '') + T('؟ ما يقدر يرجع لهالغرفة.', '? They can’t rejoin this room.') +
          '<div style="display:flex;gap:8px;margin-top:8px"><button type="button" class="red" data-rp="kickok">' + T('إي، اطرده', 'Yes, remove') + '</button><button type="button" data-rp="kickno">' + T('لا', 'No') + '</button></div></div>';
      }
      h += '<button type="button" class="wide" data-rp="close">' + T('إغلاق', 'Close') + '</button>';
    } else {
      var tg = st.target === '_content' ? T('محتوى في اللعبة', 'Content in the game') : (((c.G.players || []).filter(function (p) { return p.id === st.target; })[0]) || {}).name || '';
      h = '<h3>🚩 ' + T('بلاغ: ', 'Report: ') + esc(tg) + '</h3><p class="mu">' + T('وش صار؟', 'What happened?') + '</p><div class="chips">' +
        REASONS.map(function (r) { return '<button type="button" data-rp="why" data-r="' + r[0] + '" class="' + (st.reason === r[0] ? 'on' : '') + '">' + (EN ? r[2] : r[1]) + '</button>'; }).join('') + '</div>' +
        '<textarea id="aqrept" rows="3" maxlength="300" placeholder="' + T('تفاصيل (اختياري)', 'Details (optional)') + '">' + esc(st.note) + '</textarea>' +
        '<div class="er">' + esc(st.err) + '</div>' +
        '<button type="button" class="pri wide" data-rp="send">' + T('أرسل البلاغ', 'Send report') + '</button><button type="button" class="wide" data-rp="back">' + T('رجوع', 'Back') + '</button>';
    }
    h += contact();
    if (!o) { o = document.createElement('div'); o.id = 'aqrepov'; document.body.appendChild(o); }
    o.innerHTML = '<div class="sh" role="dialog" aria-modal="true">' + h + '</div>';
  }
  function send(c) {
    var p = (c.G.players || []).filter(function (x) { return x.id === st.target; })[0];
    var mine = (c.G.players || []).filter(function (x) { return x.id === c.me; })[0];
    var rec = { type: 'report', game: GAME, lang: EN ? 'en' : 'ar', room: c.G.code, phase: c.G.phase || '', target: st.target === '_content' ? 'content' : (p ? p.name : ''), targetId: st.target === '_content' ? '' : st.target, reason: st.reason, text: (st.note || '').trim().slice(0, 300), by: mine ? mine.name : (c.host ? 'host' : ''), at: Date.now() };
    var done = function () { st.sent[st.target] = 1; st.step = 'list'; st.reason = ''; st.note = ''; st.err = ''; draw(); };
    var fail = function () {
      var msg = T('بلاغ أقنعني', 'AQNINI report') + ' (' + GAME + ' · ' + rec.room + ')\n' + rec.target + ' — ' + rec.reason + (rec.text ? '\n' + rec.text : '');
      try { navigator.clipboard.writeText(msg); } catch (x) { }
      st.err = T('ما قدرنا نرسل البلاغ، نسخناه لك عشان ترسله لنا.', 'Couldn’t send it; copied so you can send it to us.'); draw();
    };
    if (DEV) { try { console.log('[AQ report]', rec); } catch (x) { } done(); return; }
    try {
      if (window.firebase && firebase.apps && firebase.apps.length) firebase.database().ref('docs/feedback').push(JSON.stringify(rec)).then(done, fail);
      else fail();
    } catch (x) { fail(); }
  }
  document.addEventListener('input', function (e) { if (e.target && e.target.id === 'aqrept') st.note = e.target.value; });
  document.addEventListener('click', function (e) {
    var ov = document.getElementById('aqrepov');
    if (ov && e.target === ov) { close(); return; }
    var b = e.target.closest && e.target.closest('[data-rp]'); if (!b) return;
    e.stopPropagation();
    var a = b.getAttribute('data-rp'), c = ctx(); if (!c) { close(); return; }
    if (a === 'close') { close(); return; }
    if (a === 'rep') { st.step = 'form'; st.target = b.getAttribute('data-id'); st.reason = ''; st.note = ''; st.err = ''; st.confirm = null; }
    else if (a === 'why') { st.reason = b.getAttribute('data-r'); st.err = ''; }
    else if (a === 'back') { st.step = 'list'; }
    else if (a === 'send') { if (!st.reason) { st.err = T('اختر وش صار أول.', 'Pick what happened first.'); } else { send(c); return; } }
    else if (a === 'kick') { st.confirm = b.getAttribute('data-id'); }
    else if (a === 'kickno') { st.confirm = null; }
    else if (a === 'kickok') { if (c.host && c.s.kick) c.s.kick(st.confirm); st.confirm = null; }
    draw();
  }, true);
})();
