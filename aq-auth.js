/* أقنعني — صفحة تسجيل الدخول (حساب Google عن طريق Firebase Auth)
   - المضيف بس يسجّل دخول: اللي يفتح رابط دعوة (#room-XXXX) أو جهازه مقفول على الدعوة يدخل على طول
   - نسخ المطوّر (dev / inspect / ?dev=1) ما يطلع لها تسجيل
   - بعد الدخول: window.AQ_USER = { uid, name, email, photo } وزر الحساب فوق بصفحة الألعاب */
(function () {
  var CFG = {
    apiKey: "AIzaSyByoJGFA6WSH5IXgZ4rxbNITx2Oqnjai1A",
    authDomain: "murafaat-1a91d.firebaseapp.com",
    databaseURL: "https://murafaat-1a91d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "murafaat-1a91d",
    storageBucket: "murafaat-1a91d.firebasestorage.app",
    messagingSenderId: "615464516120",
    appId: "1:615464516120:web:ec7d9c38154400ca58216d"
  };
  var SDK = 'https://www.gstatic.com/firebasejs/10.12.2/';
  var path = location.pathname.split('/').pop() || 'index.html';
  var EN = /-en\.html$|^en\.html$/.test(path);
  var HUB = path === 'index.html' || path === 'en.html' || path === '';
  function T(a, e) { return EN ? e : a; }

  /* مين ما يحتاج تسجيل */
  var skip = false;
  try {
    if (/^#room-[A-Za-z0-9]{4,6}$/.test(location.hash || '')) skip = true;
    if (/[?&]dev=1(&|$)/.test(location.search) || /^(dev|inspect)\.html$/.test(path)) skip = true;
    if (localStorage.getItem('aqnieni.guest') === '1' && !/[?&]unlock=/.test(location.search)) skip = true;
    if (window.AQ_NO_AUTH) skip = true;
  } catch (e) { }
  if (skip) return;

  var dark = false;
  try { dark = document.documentElement.classList.contains('aq-dark') || localStorage.getItem('aqnieni.theme') === 'dark' || (!localStorage.getItem('aqnieni.theme') && matchMedia('(prefers-color-scheme: dark)').matches); } catch (e) { }

  /* نغطي الصفحة من أول لحظة عشان ما تبين اللعبة قبل الدخول */
  var css = '' +
    '#aqAuth{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:28px;' +
    'background:' + (dark ? '#0F1626' : '#FFFFFF') + ';color:' + (dark ? '#EEF2FA' : '#12203A') + ';font-family:"Readex Pro","Alexandria",system-ui,sans-serif;direction:' + (EN ? 'ltr' : 'rtl') + ';transition:opacity .35s}' +
    '#aqAuth.hide{opacity:0;pointer-events:none}' +
    '#aqAuth .box{width:100%;max-width:380px;text-align:center}' +
    '#aqAuth .logo{width:78%;max-width:280px;margin:0 auto 6px;display:block;min-height:120px}' +
    '#aqAuth h1{font-family:"Alexandria",system-ui,sans-serif;font-weight:800;font-size:26px;margin:18px 0 6px;color:' + (dark ? '#FFFFFF' : '#DE0921') + '}' +
    '#aqAuth p.sub{margin:22px 0 28px;font-size:15px;opacity:.7;line-height:1.7}' +
    '#aqAuth .g{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;padding:16px 18px;border-radius:16px;border:1.5px solid ' + (dark ? '#2A3550' : '#DCE2EE') + ';' +
    'background:' + (dark ? '#18213A' : '#fff') + ';color:inherit;font:600 17px "Readex Pro",system-ui,sans-serif;box-shadow:0 6px 18px rgba(18,32,58,.08);cursor:pointer}' +
    '#aqAuth .g:active{transform:scale(.98)}#aqAuth .g[disabled]{opacity:.6}' +
    '#aqAuth .g svg{width:22px;height:22px;flex:none}' +
    '#aqAuth .err{min-height:22px;margin:14px 0 0;color:#DE0921;font-size:14px}' +
    '#aqAuth .note{margin:22px 0 0;font-size:13px;opacity:.6;line-height:1.8}' +
    '#aqAuth .note a{color:inherit}' +
    '#aqAuth .or{display:flex;align-items:center;gap:12px;margin:18px 0;font-size:13px;opacity:.55}#aqAuth .or:before,#aqAuth .or:after{content:"";flex:1;height:1px;background:currentColor;opacity:.35}' +
    '#aqAuth .e{width:100%;padding:15px 18px;border-radius:16px;border:0;background:#0554A4;color:#fff;font:600 17px "Readex Pro",system-ui,sans-serif;cursor:pointer}' +
    '#aqAuth .e[disabled]{opacity:.6}#aqAuth .e:active{transform:scale(.98)}' +
    '#aqAuth form{text-align:start}#aqAuth input{display:block;width:100%;box-sizing:border-box;margin:0 0 12px;padding:14px 16px;border-radius:14px;border:1.5px solid ' + (dark ? '#2A3550' : '#DCE2EE') + ';background:' + (dark ? '#18213A' : '#fff') + ';color:inherit;font:16px "Readex Pro",system-ui,sans-serif;direction:ltr;text-align:' + (EN ? 'left' : 'right') + '}' +
    '#aqAuth input.nm{direction:' + (EN ? 'ltr' : 'rtl') + '}#aqAuth input:focus{outline:none;border-color:#0554A4}' +
    '#aqAuth .lnk{display:block;width:100%;margin:12px 0 0;padding:6px;border:0;background:none;color:#0554A4;font:500 14px "Readex Pro",system-ui,sans-serif;cursor:pointer}' +
    '#aqAuth .ok{color:#1E8E3E}' +
    '#aqAuth .spin{width:34px;height:34px;border-radius:50%;border:4px solid rgba(5,84,164,.18);border-top-color:#0554A4;margin:30px auto;animation:aqsp 1s linear infinite}' +
    '@keyframes aqsp{to{transform:rotate(360deg)}}' +
    '#aqAcc{position:fixed;top:14px;z-index:50}' +
    '#aqAccBtn{width:46px;height:46px;border-radius:50%;border:2px solid ' + (dark ? '#2A3550' : '#E3E8F2') + ';background:' + (dark ? '#18213A' : '#fff') + ' center/cover no-repeat;font:700 18px "Alexandria",system-ui;color:#0554A4;box-shadow:0 4px 12px rgba(18,32,58,.1);cursor:pointer}' +
    '#aqAccMenu{position:absolute;top:54px;' + (EN ? 'left' : 'right') + ':0;min-width:220px;padding:14px;border-radius:16px;background:' + (dark ? '#18213A' : '#fff') + ';color:inherit;box-shadow:0 12px 32px rgba(18,32,58,.18);font:14px "Readex Pro",system-ui;text-align:start}' +
    '#aqAccMenu[hidden]{display:none}#aqAccMenu b{display:block;font-size:15px}#aqAccMenu small{display:block;opacity:.6;margin:2px 0 12px;word-break:break-all}' +
    '#aqAccMenu button{width:100%;padding:10px;border-radius:12px;border:0;background:#FDECEE;color:#DE0921;font:600 14px "Readex Pro",system-ui;cursor:pointer}';
  var st = document.createElement('style'); st.textContent = css; (document.head || document.documentElement).appendChild(st);

  var G_ICON = '<svg viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';

  var ov = document.createElement('div'); ov.id = 'aqAuth';
  ov.innerHTML = '<div class="box"><img class="logo" alt="' + T('أقنعني', 'AQNINI') + '"><div class="spin"></div></div>';
  document.documentElement.appendChild(ov); setLogo();

  function setLogo() {
    var img = ov.querySelector('.logo'); if (!img) return; delete img.dataset.aqsrc;
    var pick = function () {
      var L = window.__BRAND_LOGO;
      if (L) { img.src = L; img.classList.add('fulllogo'); try { window.dispatchEvent(new Event('aqtheme')); } catch (e) { } return true; } return false;
    };
    if (!pick()) { var s = document.createElement('script'); s.src = 'aq-brand.js'; s.onload = pick; document.head.appendChild(s); }
  }

  var NOTE = function () {
    return '<p class="note">' + T('عندك رابط دعوة؟ افتحه مباشرة وتدخل الغرفة بدون تسجيل.', 'Got an invite link? Open it directly — no sign-in needed.') + '<br>' +
      T('بتسجيلك توافق على <a href="terms.html">الشروط</a> و<a href="privacy.html">سياسة الخصوصية</a>.', 'By signing in you agree to the <a href="terms.html">Terms</a> and <a href="privacy.html">Privacy Policy</a>.') + '</p>';
  };
  function showLogin(msg) {
    var box = ov.querySelector('.box');
    box.innerHTML = '<img class="logo" alt="">' +
      '<p class="sub">' + T('سجّل دخولك عشان تنشئ غرفة وتلعب مع ربعك', 'Sign in to create a room and play with your friends') + '</p>' +
      '<button class="g" type="button">' + G_ICON + '<span>' + T('الدخول بحساب Google', 'Continue with Google') + '</span></button>' +
      '<div class="or">' + T('أو', 'or') + '</div>' +
      '<button class="e" type="button">✉️ ' + T('الدخول بالإيميل', 'Continue with email') + '</button>' +
      '<p class="err">' + (msg || '') + '</p>' + NOTE();
    setLogo();
    box.querySelector('.g').onclick = signIn;
    box.querySelector('.e').onclick = function () { showEmail('in'); };
  }

  /* الدخول بالإيميل: in = دخول، up = حساب جديد، reset = نسيت كلمة السر */
  function showEmail(mode, keep) {
    var box = ov.querySelector('.box'), up = mode === 'up', rs = mode === 'reset';
    var title = rs ? T('نسيت كلمة السر؟', 'Forgot your password?') : up ? T('حساب جديد', 'Create an account') : T('الدخول بالإيميل', 'Sign in with email');
    box.innerHTML = '<img class="logo" alt="" style="width:46%;min-height:0">' +
      '<p class="sub" style="margin-bottom:18px">' + (rs ? T('اكتب إيميلك ونرسل لك رابط تغيّر منه كلمة السر.', 'Enter your email and we will send you a reset link.') : title) + '</p>' +
      '<form novalidate>' +
      (up ? '<input class="nm" name="n" type="text" autocomplete="name" placeholder="' + T('اسمك', 'Your name') + '" required>' : '') +
      '<input name="m" type="email" autocomplete="email" inputmode="email" placeholder="' + T('الإيميل', 'Email') + '" required>' +
      (rs ? '' : '<input name="p" type="password" autocomplete="' + (up ? 'new-password' : 'current-password') + '" placeholder="' + T(up ? 'كلمة السر (٦ أحرف أو أكثر)' : 'كلمة السر', up ? 'Password (6+ characters)' : 'Password') + '" required>') +
      '<button class="e" type="submit">' + (rs ? T('أرسل الرابط', 'Send link') : up ? T('سجّل', 'Create account') : T('دخول', 'Sign in')) + '</button>' +
      '</form><p class="err"></p>' +
      (mode === 'in' ? '<button class="lnk" data-go="reset" type="button">' + T('نسيت كلمة السر؟', 'Forgot password?') + '</button>' +
        '<button class="lnk" data-go="up" type="button">' + T('ما عندك حساب؟ سجّل حساب جديد', 'No account? Create one') + '</button>' :
        '<button class="lnk" data-go="in" type="button">' + T('عندك حساب؟ ادخل', 'Have an account? Sign in') + '</button>') +
      '<button class="lnk" data-go="back" type="button" style="opacity:.7">' + T('رجوع', 'Back') + '</button>' + NOTE();
    setLogo();
    var f = box.querySelector('form'), er = box.querySelector('.err'), b = f.querySelector('.e');
    if (keep && f.m) f.m.value = keep;
    box.querySelectorAll('.lnk').forEach(function (x) {
      x.onclick = function () { var g = x.getAttribute('data-go'); if (g === 'back') showLogin(); else showEmail(g, f.m.value); };
    });
    f.onsubmit = function (ev) {
      ev.preventDefault(); er.className = 'err'; er.textContent = '';
      var m = (f.m.value || '').trim(), pw = f.p ? f.p.value : '', nm = f.n ? f.n.value.trim() : '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) { er.textContent = T('اكتب إيميل صحيح.', 'Enter a valid email.'); return; }
      if (up && !nm) { er.textContent = T('اكتب اسمك.', 'Enter your name.'); return; }
      if (!rs && pw.length < 6) { er.textContent = T('كلمة السر لازم ٦ أحرف أو أكثر.', 'Password must be at least 6 characters.'); return; }
      b.disabled = true;
      var job = rs ? auth.sendPasswordResetEmail(m) :
        up ? auth.createUserWithEmailAndPassword(m, pw).then(function (c) { return c.user.updateProfile({ displayName: nm }).then(function () { done(c.user); }); }) :
          auth.signInWithEmailAndPassword(m, pw);
      job.then(function () {
        if (rs) { er.className = 'err ok'; er.textContent = T('أرسلنا الرابط على إيميلك. شيّك على البريد (وحتى الـ Junk).', 'Link sent. Check your inbox (and junk folder).'); b.disabled = false; }
      }).catch(function (e) { b.disabled = false; er.textContent = errText(e); });
    };
  }

  function load(src) { return new Promise(function (ok, no) { var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); }); }
  var auth;
  function ready() {
    var p = window.firebase && firebase.app ? Promise.resolve() : load(SDK + 'firebase-app-compat.js');
    return p.then(function () { return firebase.auth ? null : load(SDK + 'firebase-auth-compat.js'); }).then(function () {
      var app; try { app = firebase.app('aqauth'); } catch (e) { app = firebase.initializeApp(CFG, 'aqauth'); }
      auth = app.auth(); return auth;
    });
  }

  function errText(e) {
    var c = (e && e.code) || '';
    if (/popup-closed|cancelled-popup/.test(c)) return T('سكّرت نافذة الدخول، جرّب مرة ثانية.', 'The sign-in window was closed. Try again.');
    if (/network/.test(c)) return T('ما فيه اتصال بالإنترنت.', 'No internet connection.');
    if (/email-already-in-use/.test(c)) return T('هالإيميل مسجّل من قبل. اضغط «عندك حساب؟ ادخل».', 'This email already has an account. Sign in instead.');
    if (/invalid-credential|wrong-password|user-not-found|invalid-login/.test(c)) return T('الإيميل أو كلمة السر غلط.', 'Wrong email or password.');
    if (/weak-password/.test(c)) return T('كلمة السر ضعيفة، خلها ٦ أحرف أو أكثر.', 'Password is too weak.');
    if (/invalid-email/.test(c)) return T('اكتب إيميل صحيح.', 'Enter a valid email.');
    if (/too-many-requests/.test(c)) return T('محاولات كثيرة، انتظر شوي وجرّب.', 'Too many attempts. Try again later.');
    if (/unauthorized-domain|operation-not-allowed|configuration/.test(c)) return T('تسجيل الدخول لسا ما تفعّل. كلّم المضيف.', 'Sign-in is not enabled yet.');
    return T('صار خطأ بالدخول، جرّب مرة ثانية.', 'Sign-in failed. Try again.');
  }

  function signIn() {
    var b = ov.querySelector('.g'), er = ov.querySelector('.err'); if (b) b.disabled = true; if (er) er.textContent = '';
    var prov = new firebase.auth.GoogleAuthProvider(); prov.setCustomParameters({ prompt: 'select_account' });
    auth.signInWithPopup(prov).catch(function (e) {
      if (/popup-blocked|operation-not-supported/.test((e && e.code) || '')) return auth.signInWithRedirect(prov);
      if (b) b.disabled = false; if (er) er.textContent = errText(e);
    });
  }

  function done(u) {
    window.AQ_USER = { uid: u.uid, name: u.displayName || '', email: u.email || '', photo: u.photoURL || '' };
    try { window.dispatchEvent(new CustomEvent('aq:user', { detail: window.AQ_USER })); } catch (e) { }
    ov.classList.add('hide'); setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 400);
    if (HUB) accountButton(u);
  }

  function accountButton(u) {
    var add = function () {
      if (document.getElementById('aqAcc')) return;
      var w = document.createElement('div'); w.id = 'aqAcc';
      var first = (u.displayName || u.email || '?').trim().charAt(0).toUpperCase();
      w.innerHTML = '<button id="aqAccBtn" type="button" aria-label="' + T('حسابي', 'My account') + '"></button>' +
        '<div id="aqAccMenu" hidden><b></b><small></small><button type="button">' + T('تسجيل خروج', 'Sign out') + '</button></div>';
      var btn = w.querySelector('#aqAccBtn'), m = w.querySelector('#aqAccMenu');
      if (u.photoURL) btn.style.backgroundImage = 'url("' + u.photoURL + '")'; else btn.textContent = first;
      m.querySelector('b').textContent = u.displayName || T('حسابي', 'My account');
      m.querySelector('small').textContent = u.email || '';
      btn.onclick = function (e) { e.stopPropagation(); m.hidden = !m.hidden; };
      document.addEventListener('click', function () { m.hidden = true; });
      m.onclick = function (e) { e.stopPropagation(); };
      m.querySelector('button').onclick = function () { auth.signOut().then(function () { location.reload(); }); };
      /* الزر بالزاوية المقابلة لزر اللغة */
      w.style[EN ? 'left' : 'right'] = '14px';
      document.body.appendChild(w);
    };
    if (document.body) add(); else document.addEventListener('DOMContentLoaded', add);
  }

  ready().then(function () {
    auth.getRedirectResult().catch(function (e) { showLogin(errText(e)); });
    auth.onAuthStateChanged(function (u) { if (u) done(u); else showLogin(); });
  }).catch(function () {
    showLogin(T('ما قدرنا نحمّل صفحة الدخول. تأكد من الإنترنت وحدّث الصفحة.', 'Could not load sign-in. Check your connection and refresh.'));
  });
})();
