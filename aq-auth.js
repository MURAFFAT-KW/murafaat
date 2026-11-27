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
    '#aqAuth .box{width:100%;max-width:380px;text-align:center}#aqAuth:focus-within .note{display:none}' +
    '#aqAuth .logo{width:78%;max-width:280px;margin:0 auto 6px;display:block;min-height:120px}' +
    '#aqAuth h1{font-family:"Alexandria",system-ui,sans-serif;font-weight:800;font-size:26px;margin:18px 0 6px;color:' + (dark ? '#FFFFFF' : '#DE0921') + '}' +
    '#aqAuth p.sub{margin:22px 0 28px;font-size:15px;opacity:.7;line-height:1.7}' +
    '#aqAuth .g{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;padding:16px 18px;border-radius:16px;border:1.5px solid ' + (dark ? '#2A3550' : '#DCE2EE') + ';' +
    'background:' + (dark ? '#18213A' : '#fff') + ';color:inherit;font:600 17px "Readex Pro",system-ui,sans-serif;box-shadow:0 6px 18px rgba(18,32,58,.08);cursor:pointer}' +
    '#aqAuth .g:active{transform:scale(.98)}#aqAuth .g[disabled]{opacity:.6}' +
    '#aqAuth .g svg{width:22px;height:22px;flex:none}' +
    '#aqAuth .err{min-height:22px;margin:14px 0 0;color:#DE0921;font-size:14px}' +
    '#aqAuth .note{position:fixed;left:24px;right:24px;bottom:calc(18px + env(safe-area-inset-bottom));margin:0;font-size:12px;opacity:.55;line-height:1.7;text-align:center}' +
    '#aqAuth .note a{color:inherit}' +
    '#aqAuth .or{display:flex;align-items:center;gap:12px;margin:18px 0;font-size:13px;opacity:.55}#aqAuth .or:before,#aqAuth .or:after{content:"";flex:1;height:1px;background:currentColor;opacity:.35}' +
    '#aqAuth .e{width:100%;padding:15px 18px;border-radius:16px;border:0;background:#0554A4;color:#fff;font:600 17px "Readex Pro",system-ui,sans-serif;cursor:pointer}' +
    '#aqAuth .e[disabled]{opacity:.6}#aqAuth .e:active{transform:scale(.98)}' +
    '#aqAuth form{text-align:start}#aqAuth input{display:block;width:100%;box-sizing:border-box;margin:0 0 12px;padding:14px 16px;border-radius:14px;border:1.5px solid ' + (dark ? '#2A3550' : '#DCE2EE') + ';background:' + (dark ? '#18213A' : '#fff') + ';color:inherit;font:16px "Readex Pro",system-ui,sans-serif;direction:ltr;text-align:' + (EN ? 'left' : 'right') + '}' +
    '#aqAuth input.nm{direction:' + (EN ? 'ltr' : 'rtl') + '}#aqAuth input:focus{outline:none;border-color:#0554A4}' +
    '#aqAuth .lnk{display:block;width:100%;margin:12px 0 0;padding:6px;border:0;background:none;color:#0554A4;font:500 14px "Readex Pro",system-ui,sans-serif;cursor:pointer}' +
    '#aqAuth .ok{color:#1E8E3E}' +
    '#aqLang{position:fixed;top:max(10px,env(safe-area-inset-top));' + (EN ? 'right' : 'left') + ':12px;z-index:2;background:' + (dark ? '#18213A' : '#fff') + ';border:1.5px solid ' + (dark ? '#2A3550' : '#D5DBE5') + ';border-radius:99px;padding:5px 14px;font:700 .9rem/1.4 "Readex Pro","Alexandria",system-ui,sans-serif;color:inherit;cursor:pointer;box-shadow:0 3px 10px rgba(18,32,58,.1)}' +
    '#aqAuth .pw{position:relative}#aqAuth .pw input{padding-' + (EN ? 'right' : 'left') + ':52px}' +
    '#aqAuth .eye{position:absolute;top:0;' + (EN ? 'right' : 'left') + ':4px;height:52px;width:46px;border:0;background:none;color:inherit;opacity:.55;cursor:pointer;display:flex;align-items:center;justify-content:center}' +
    '#aqAuth .eye svg{width:22px;height:22px}' +
    '#aqAuth .mail{font-size:44px;margin:4px 0 6px}#aqAuth .sub b{direction:ltr;unicode-bidi:embed}' +
    '#aqAuth .spin{width:34px;height:34px;border-radius:50%;border:4px solid rgba(5,84,164,.18);border-top-color:#0554A4;margin:30px auto;animation:aqsp 1s linear infinite}' +
    '@keyframes aqsp{to{transform:rotate(360deg)}}';
  var st = document.createElement('style'); st.textContent = css; (document.head || document.documentElement).appendChild(st);

  var EYE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
  var EYE_OFF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.9 17.9A10.4 10.4 0 0 1 12 19c-6.4 0-10-7-10-7a18.5 18.5 0 0 1 5-5.9M9.9 5.2A9.6 9.6 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.2 3.2M14.1 14.1a3 3 0 1 1-4.2-4.2M2 2l20 20"/></svg>';
  var G_ICON = '<svg viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';

  var ov = document.createElement('div'); ov.id = 'aqAuth';
  ov.innerHTML = '<div class="box"><img class="logo" alt="' + T('أقنعني', 'AQNINI') + '"><div class="spin"></div></div>';
  document.documentElement.appendChild(ov); setLogo();

  /* زر اللغة من أول صفحة — نفس مكان زر اللغة بصفحة الألعاب */
  function otherLang() {
    var to = HUB ? (EN ? 'index.html' : 'en.html') : (EN ? path.replace(/-en\.html$/, '.html') : path.replace(/\.html$/, '-en.html'));
    return to + location.search + location.hash;
  }
  function langBtn() {
    if (ov.querySelector('#aqLang')) return;
    var b = document.createElement('button'); b.id = 'aqLang'; b.type = 'button';
    b.textContent = EN ? 'عربي' : 'English'; b.lang = EN ? 'ar' : 'en';
    b.onclick = function () { try { localStorage.setItem('aqnieni.lang', EN ? 'ar' : 'en'); } catch (e) { } location.href = otherLang(); };
    ov.appendChild(b);
  }
  langBtn();

  function setLogo() {
    var img = ov.querySelector('.logo'); if (!img) return; delete img.dataset.aqsrc;
    var pick = function () {
      var L = window.__BRAND_LOGO;
      if (L) { img.src = L; img.classList.add('fulllogo'); try { window.dispatchEvent(new Event('aqtheme')); } catch (e) { } return true; } return false;
    };
    if (!pick()) { var s = document.createElement('script'); s.src = 'aq-brand.js'; s.onload = pick; document.head.appendChild(s); }
  }

  var NOTE = function () {
    return '<p class="note">' + T('بالمتابعة، أنت توافق على <a href="terms.html">الشروط</a> و<a href="privacy.html">سياسة الخصوصية</a>', 'By continuing, you agree to the <a href="terms.html">Terms</a> and <a href="privacy.html">Privacy Policy</a>') + '</p>';
  };
  function showLogin(msg) {
    var box = ov.querySelector('.box');
    box.innerHTML = '<img class="logo" alt="">' +
      '<p class="sub">' + T('سجّل دخولك لإنشاء غرفة واللعب مع أصدقائك', 'Sign in to create a room and play with your friends') + '</p>' +
      '<button class="g" type="button">' + G_ICON + '<span>' + T('الدخول بحساب Google', 'Continue with Google') + '</span></button>' +
      '<div class="or">' + T('أو', 'or') + '</div>' +
      '<button class="e" type="button">✉️ ' + T('الدخول بالبريد الإلكتروني', 'Continue with email') + '</button>' +
      '<p class="err">' + (msg || '') + '</p>' + NOTE();
    setLogo();
    box.querySelector('.g').onclick = signIn;
    box.querySelector('.e').onclick = function () { showEmail('in'); };
  }

  /* الدخول بالإيميل: in = دخول، up = حساب جديد، reset = نسيت كلمة السر */
  function showEmail(mode, keep) {
    var box = ov.querySelector('.box'), up = mode === 'up', rs = mode === 'reset';
    var title = rs ? T('استعادة كلمة المرور', 'Reset your password') : up ? T('إنشاء حساب جديد', 'Create an account') : T('الدخول بالبريد الإلكتروني', 'Sign in with email');
    box.innerHTML = '<img class="logo" alt="" style="width:46%;min-height:0">' +
      '<p class="sub" style="margin-bottom:18px">' + (rs ? T('أدخل بريدك الإلكتروني وسنرسل لك رابطًا لتغيير كلمة المرور.', 'Enter your email and we will send you a reset link.') : title) + '</p>' +
      '<form novalidate>' +
      (up ? '<input class="nm" name="n" type="text" autocomplete="name" placeholder="' + T('الاسم', 'Your name') + '" required>' : '') +
      '<input name="m" type="email" autocomplete="email" inputmode="email" placeholder="' + T('البريد الإلكتروني', 'Email') + '" required>' +
      (rs ? '' : '<div class="pw"><input name="p" type="password" autocomplete="' + (up ? 'new-password' : 'current-password') + '" placeholder="' + T(up ? 'كلمة المرور (٦ أحرف على الأقل)' : 'كلمة المرور', up ? 'Password (6+ characters)' : 'Password') + '" required>' +
        '<button class="eye" type="button" aria-label="' + T('إظهار كلمة المرور', 'Show password') + '">' + EYE + '</button></div>') +
      '<button class="e" type="submit">' + (rs ? T('إرسال الرابط', 'Send link') : up ? T('إنشاء الحساب', 'Create account') : T('تسجيل الدخول', 'Sign in')) + '</button>' +
      '</form><p class="err"></p>' +
      (mode === 'in' ? '<button class="lnk" data-go="reset" type="button">' + T('نسيت كلمة المرور', 'Forgot password') + '</button>' +
        '<button class="lnk" data-go="up" type="button">' + T('إنشاء حساب جديد', 'Create a new account') + '</button>' :
        '<button class="lnk" data-go="in" type="button">' + T('تسجيل الدخول بحساب موجود', 'Sign in to an existing account') + '</button>') +
      '<button class="lnk" data-go="back" type="button" style="opacity:.7">' + T('رجوع', 'Back') + '</button>' + NOTE();
    setLogo();
    var f = box.querySelector('form'), er = box.querySelector('.err'), b = f.querySelector('.e');
    if (keep && f.m) f.m.value = keep;
    var ey = f.querySelector('.eye');
    if (ey) ey.onclick = function () { var sh = f.p.type === 'password'; f.p.type = sh ? 'text' : 'password'; ey.innerHTML = sh ? EYE_OFF : EYE; ey.setAttribute('aria-label', sh ? T('إخفاء كلمة المرور', 'Hide password') : T('إظهار كلمة المرور', 'Show password')); };
    box.querySelectorAll('.lnk').forEach(function (x) {
      x.onclick = function () { var g = x.getAttribute('data-go'); if (g === 'back') showLogin(); else showEmail(g, f.m.value); };
    });
    f.onsubmit = function (ev) {
      ev.preventDefault(); er.className = 'err'; er.textContent = '';
      var m = (f.m.value || '').trim(), pw = f.p ? f.p.value : '', nm = f.n ? f.n.value.trim() : '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) { er.textContent = T('أدخل بريدًا إلكترونيًا صحيحًا.', 'Enter a valid email.'); return; }
      if (up && !nm) { er.textContent = T('أدخل الاسم.', 'Enter your name.'); return; }
      if (!rs && pw.length < 6) { er.textContent = T('يجب أن تكون كلمة المرور ٦ أحرف على الأقل.', 'Password must be at least 6 characters.'); return; }
      b.disabled = true;
      var job = rs ? auth.sendPasswordResetEmail(m) :
        up ? auth.createUserWithEmailAndPassword(m, pw).then(function (c) { return c.user.updateProfile({ displayName: nm }).then(function () { return c.user.sendEmailVerification(); }).then(function () { showVerify(c.user); }); }) :
          auth.signInWithEmailAndPassword(m, pw);
      job.then(function () {
        if (rs) { er.className = 'err ok'; er.textContent = T('تم إرسال الرابط إلى بريدك الإلكتروني. تحقق من البريد الوارد ومجلد الرسائل غير المرغوب فيها.', 'Link sent. Check your inbox (and junk folder).'); b.disabled = false; }
      }).catch(function (e) { b.disabled = false; er.textContent = errText(e); });
    };
  }

  /* تأكيد البريد: الحساب بالبريد ما يدخل لين يأكد إن البريد له */
  function needsVerify(u) { var pd = (u && u.providerData) || []; return !!u && !u.emailVerified && pd.length > 0 && pd.every(function (p) { return p.providerId === 'password'; }); }
  function showVerify(u) {
    var box = ov.querySelector('.box');
    box.innerHTML = '<img class="logo" alt="" style="width:46%;min-height:0">' +
      '<div class="mail">✉️</div>' +
      '<p class="sub" style="margin:0 0 6px;opacity:1;font-weight:600">' + T('تأكيد البريد الإلكتروني', 'Verify your email') + '</p>' +
      '<p class="sub" style="margin:0 0 22px">' + T('أرسلنا رابط التأكيد إلى', 'We sent a verification link to') + '<br><b></b><br>' + T('افتح الرابط، ثم اضغط «تم التأكيد».', 'Open the link, then tap “I have verified”.') + '</p>' +
      '<button class="e" data-a="ok" type="button">' + T('تم التأكيد', 'I have verified') + '</button>' +
      '<p class="err"></p>' +
      '<button class="lnk" data-a="re" type="button">' + T('إعادة إرسال الرابط', 'Resend the link') + '</button>' +
      '<button class="lnk" data-a="out" type="button" style="opacity:.7">' + T('استخدام بريد آخر', 'Use another email') + '</button>' + NOTE();
    box.querySelector('.sub b').textContent = u.email || '';
    setLogo();
    var er = box.querySelector('.err'), ok = box.querySelector('[data-a=ok]');
    ok.onclick = function () {
      ok.disabled = true; er.className = 'err'; er.textContent = '';
      u.reload().then(function () {
        var cu = auth.currentUser;
        if (cu && cu.emailVerified) done(cu);
        else { ok.disabled = false; er.textContent = T('لم يتم التأكيد بعد. تحقق من بريدك ومجلد الرسائل غير المرغوب فيها.', 'Not verified yet. Check your inbox and junk folder.'); }
      }).catch(function (e) { ok.disabled = false; er.textContent = errText(e); });
    };
    box.querySelector('[data-a=re]').onclick = function () {
      er.className = 'err'; er.textContent = '';
      u.sendEmailVerification().then(function () { er.className = 'err ok'; er.textContent = T('تم إرسال رابط جديد.', 'A new link was sent.'); })
        .catch(function (e) { er.textContent = errText(e); });
    };
    box.querySelector('[data-a=out]').onclick = function () { auth.signOut().then(function () { showEmail('up'); }); };
  }

  function load(src) { return new Promise(function (ok, no) { var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); }); }
  var auth;
  function ready() {
    var p = window.firebase && firebase.app ? Promise.resolve() : load(SDK + 'firebase-app-compat.js');
    return p.then(function () { return firebase.auth ? null : load(SDK + 'firebase-auth-compat.js'); }).then(function () {
      var app; try { app = firebase.app('aqauth'); } catch (e) { app = firebase.initializeApp(CFG, 'aqauth'); }
      auth = app.auth(); auth.languageCode = EN ? 'en' : 'ar'; return auth;
    });
  }

  function errText(e) {
    var c = (e && e.code) || '';
    if (/popup-closed|cancelled-popup/.test(c)) return T('تم إغلاق نافذة تسجيل الدخول. حاول مرة أخرى.', 'The sign-in window was closed. Try again.');
    if (/network/.test(c)) return T('لا يوجد اتصال بالإنترنت.', 'No internet connection.');
    if (/email-already-in-use/.test(c)) return T('هذا البريد الإلكتروني مسجّل مسبقًا. اختر «تسجيل الدخول بحساب موجود».', 'This email already has an account. Sign in instead.');
    if (/invalid-credential|wrong-password|user-not-found|invalid-login/.test(c)) return T('البريد الإلكتروني أو كلمة المرور غير صحيحة.', 'Wrong email or password.');
    if (/weak-password/.test(c)) return T('كلمة المرور ضعيفة، يجب أن تكون ٦ أحرف على الأقل.', 'Password is too weak.');
    if (/invalid-email/.test(c)) return T('أدخل بريدًا إلكترونيًا صحيحًا.', 'Enter a valid email.');
    if (/too-many-requests/.test(c)) return T('محاولات كثيرة. يرجى المحاولة لاحقًا.', 'Too many attempts. Try again later.');
    if (/unauthorized-domain|operation-not-allowed|configuration/.test(c)) return T('تسجيل الدخول غير متاح حاليًا.', 'Sign-in is not enabled yet.');
    return T('تعذّر تسجيل الدخول. حاول مرة أخرى.', 'Sign-in failed. Try again.');
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

  /* زر الحساب = الإعدادات: الصوت، المظهر، سجلي، اللغة، تسجيل الخروج — بدل الأزرار اللي تحت */
  function accountButton(u) {
    var add = function () {
      if (document.getElementById('aqAcc')) return;
      var dk = function () { return window.AQTHEME ? AQTHEME.dark() : dark; };
      var st = document.createElement('style');
      st.textContent = '#aqsnd,#aqstat,#aqtheme{display:none!important}' +
        '#aqAcc{position:fixed;top:max(10px,env(safe-area-inset-top));' + (EN ? 'left' : 'right') + ':12px;z-index:60}' +
        '#aqAccBtn{position:relative;width:44px;height:44px;border-radius:50%;border:2px solid #E3E8F2;background:#fff center/cover no-repeat;font:700 18px "Alexandria",system-ui;color:#0554A4;box-shadow:0 4px 12px rgba(18,32,58,.12);cursor:pointer;padding:0}' +
        '#aqAccBtn i{position:absolute;bottom:-4px;' + (EN ? 'right' : 'left') + ':-4px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.2);font-size:12px;line-height:20px;font-style:normal}' +
        '#aqSet{position:fixed;inset:0;z-index:2147482000;background:rgba(10,16,30,.45);display:flex;align-items:flex-end;justify-content:center;opacity:0;transition:opacity .25s}' +
        '#aqSet.on{opacity:1}#aqSet .sh{width:100%;max-width:480px;border-radius:24px 24px 0 0;padding:10px 20px calc(22px + env(safe-area-inset-bottom));transform:translateY(30px);transition:transform .25s;font-family:"Readex Pro",system-ui,sans-serif;direction:' + (EN ? 'ltr' : 'rtl') + '}' +
        '#aqSet.on .sh{transform:none}#aqSet .gr{width:40px;height:5px;border-radius:9px;background:currentColor;opacity:.2;margin:0 auto 14px}' +
        '#aqSet h3{margin:0 0 14px;font:800 20px "Alexandria",system-ui,sans-serif}' +
        '#aqSet .me{display:flex;align-items:center;gap:12px;padding:12px;border-radius:16px;margin-bottom:12px}' +
        '#aqSet .me .av{width:46px;height:46px;border-radius:50%;flex:none;background:#E8EEF8 center/cover no-repeat;display:grid;place-items:center;font:700 18px "Alexandria";color:#0554A4}' +
        '#aqSet .me b{display:block;font-size:16px}#aqSet .me small{display:block;opacity:.6;font-size:13px;direction:ltr;text-align:' + (EN ? 'left' : 'right') + ';word-break:break-all}' +
        '#aqSet .row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 4px;border-bottom:1px solid rgba(128,140,160,.18);font-size:16px;width:100%;background:none;border-left:0;border-right:0;border-top:0;color:inherit;font-family:inherit;cursor:pointer;text-align:start}' +
        '#aqSet .row span{display:flex;align-items:center;gap:10px}#aqSet .row .ch{opacity:.4;font-size:18px}' +
        '#aqSet .seg{display:flex;border-radius:12px;padding:3px;gap:2px;flex:none}#aqSet .seg button{border:0;background:none;color:inherit;font:600 13px "Readex Pro",system-ui;padding:7px 10px;border-radius:9px;cursor:pointer;opacity:.7}' +
        '#aqSet .seg button.on{opacity:1}' +
        '#aqSet .out{width:100%;margin-top:18px;padding:14px;border-radius:14px;border:0;font:700 15px "Readex Pro",system-ui;cursor:pointer}' +
        '#aqSet .del{display:block;margin:14px auto 0;background:none;border:0;font:600 13px "Readex Pro",system-ui;cursor:pointer;opacity:.75;text-decoration:underline}' +
        '#aqSet .dz{text-align:center;padding:6px 0}#aqSet .dz .ic{font-size:40px;margin:4px 0 8px}#aqSet .dz p{margin:0 0 16px;font-size:14.5px;line-height:1.8;opacity:.8}' +
        '#aqSet .dz input{display:block;width:100%;box-sizing:border-box;margin:0 0 12px;padding:14px 16px;border-radius:14px;border:1.5px solid rgba(128,140,160,.35);background:transparent;color:inherit;font:16px "Readex Pro",system-ui;direction:ltr;text-align:' + (EN ? 'left' : 'right') + '}' +
        '#aqSet .dz .er{color:#DE0921;font-size:13.5px;margin:0 0 10px;min-height:1px}' +
        '#aqSet .dz .go{width:100%;padding:14px;border-radius:14px;border:0;font:700 15px "Readex Pro",system-ui;cursor:pointer;background:#DE0921;color:#fff}' +
        '#aqSet .dz .go[disabled]{opacity:.6}#aqSet .dz .no{width:100%;margin-top:8px;padding:13px;border-radius:14px;border:0;background:none;color:inherit;font:600 15px "Readex Pro",system-ui;cursor:pointer}';
      document.head.appendChild(st);

      var w = document.createElement('div'); w.id = 'aqAcc';
      var first = (u.displayName || u.email || '?').trim().charAt(0).toUpperCase();
      w.innerHTML = '<button id="aqAccBtn" type="button" aria-label="' + T('الإعدادات', 'Settings') + '"><i>⚙️</i></button>';
      var btn = w.querySelector('#aqAccBtn');
      if (u.photoURL) btn.style.backgroundImage = 'url("' + u.photoURL + '")'; else btn.insertBefore(document.createTextNode(first), btn.firstChild);
      btn.onclick = function () { openSettings(u, first); };
      document.body.appendChild(w);
    };
    if (document.body) add(); else document.addEventListener('DOMContentLoaded', add);
  }

  function openSettings(u, first) {
    if (document.getElementById('aqSet')) return;
    var isD = window.AQTHEME ? AQTHEME.dark() : dark;
    var bg = isD ? '#141C30' : '#fff', fg = isD ? '#EEF2FA' : '#12203A', card = isD ? '#1C2640' : '#F3F6FB';
    var pref = 'auto'; try { pref = localStorage.getItem('aqnieni.theme') || 'auto'; } catch (e) { }
    var snd = window.AQFX ? AQFX.on() : false;
    var o = document.createElement('div'); o.id = 'aqSet';
    o.innerHTML = '<div class="sh" style="background:' + bg + ';color:' + fg + '"><div class="gr"></div>' +
      '<h3>' + T('الإعدادات', 'Settings') + '</h3>' +
      '<div class="me" style="background:' + card + '"><div class="av"></div><div><b></b><small></small></div></div>' +
      (window.AQFX ? '<button class="row" data-k="snd" type="button"><span>🔊 ' + T('الصوت', 'Sound') + '</span><i class="sw"></i></button>' : '') +
      (window.AQTHEME ? '<div class="row" style="cursor:default"><span>🌓 ' + T('المظهر', 'Appearance') + '</span><div class="seg" style="background:' + card + '">' +
        '<button data-t="auto" type="button">' + T('تلقائي', 'Auto') + '</button><button data-t="light" type="button">' + T('صباحي', 'Light') + '</button><button data-t="dark" type="button">' + T('مسائي', 'Dark') + '</button></div></div>' : '') +
      (window.AQSTATS && AQSTATS.open ? '<button class="row" data-k="stats" type="button"><span>🏅 ' + T('سجلي وإنجازاتي', 'My stats & badges') + '</span><b class="ch">' + (EN ? '›' : '‹') + '</b></button>' : '') +
      '<button class="row" data-k="lang" type="button"><span>🌐 ' + T('اللغة', 'Language') + '</span><span style="opacity:.6">' + T('العربية', 'English') + ' ' + (EN ? '›' : '‹') + '</span></button>' +
      '<button class="out" type="button" style="background:' + (isD ? '#3A1820' : '#FDECEE') + ';color:' + (isD ? '#FF8A95' : '#DE0921') + '">' + T('تسجيل الخروج', 'Sign out') + '</button>' +
      '<button class="del" type="button" style="color:' + (isD ? '#FF8A95' : '#DE0921') + '">' + T('حذف الحساب', 'Delete account') + '</button></div>';
    var av = o.querySelector('.av'); if (u.photoURL) av.style.backgroundImage = 'url("' + u.photoURL + '")'; else av.textContent = first;
    o.querySelector('.me b').textContent = u.displayName || T('حسابي', 'My account');
    o.querySelector('.me small').textContent = u.email || '';
    var close = function () { o.classList.remove('on'); setTimeout(function () { if (o.parentNode) o.parentNode.removeChild(o); }, 250); };
    o.onclick = function (e) { if (e.target === o) close(); };
    var sw = o.querySelector('[data-k=snd]');
    var paintSw = function (el, v) {
      el.style.cssText = 'position:relative;display:block;width:50px;height:30px;border-radius:99px;flex:none;transition:background .2s;background:' + (v ? '#1E8E3E' : (isD ? '#3A4560' : '#C9D1DE'));
      el.innerHTML = '<b style="position:absolute;top:3px;' + ((v ? !EN : EN) ? 'left' : 'right') + ':3px;width:24px;height:24px;border-radius:50%;background-image:linear-gradient(#fff,#fff);box-shadow:0 1px 3px rgba(0,0,0,.25)"></b>';
    };
    if (sw) { paintSw(sw.querySelector('.sw'), snd); sw.onclick = function () { var v = !AQFX.on(); AQFX.set(v); paintSw(sw.querySelector('.sw'), v); if (v && AQFX.fx && AQFX.fx.start) AQFX.fx.start(); }; }
    var segs = o.querySelectorAll('.seg button');
    var mark = function (v) { segs.forEach(function (x) { var on = x.getAttribute('data-t') === v; x.classList.toggle('on', on); x.style.background = on ? '#0554A4' : 'transparent'; x.style.color = on ? '#fff' : fg; }); };
    mark(pref === 'light' || pref === 'dark' ? pref : 'auto');
    segs.forEach(function (x) { x.onclick = function () { var v = x.getAttribute('data-t'); AQTHEME.set(v === 'auto' ? '' : v); mark(v); close(); setTimeout(function () { openSettings(u, first); }, 280); }; });
    var stt = o.querySelector('[data-k=stats]'); if (stt) stt.onclick = function () { close(); setTimeout(function () { AQSTATS.open(); }, 260); };
    o.querySelector('[data-k=lang]').onclick = function () { try { localStorage.setItem('aqnieni.lang', EN ? 'ar' : 'en'); } catch (e) { } location.href = otherLang(); };
    o.querySelector('.out').onclick = function () { auth.signOut().then(function () { location.reload(); }); };
    o.querySelector('.del').onclick = function () { delView(o.querySelector('.sh'), u, close); };
    document.body.appendChild(o); requestAnimationFrame(function () { o.classList.add('on'); });
  }

  /* حذف الحساب (متطلب Apple): تأكيد → إعادة التحقق → حذف نهائي */
  function delView(sh, u, close) {
    var isD = window.AQTHEME ? AQTHEME.dark() : dark;
    var pd = (u.providerData || []).map(function (x) { return x.providerId; });
    var pw = pd.indexOf('password') > -1 && pd.indexOf('google.com') < 0;
    sh.innerHTML = '<div class="gr"></div><div class="dz" style="text-align:center">' + '<div style="width:64px;height:64px;margin:6px auto 12px;border-radius:50%;display:grid;place-items:center;background:' + (isD ? '#3A1820' : '#FDECEE') + '"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="' + (isD ? '#FF8A95' : '#DE0921') + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5"/></svg></div>' +
      '<h3>' + T('حذف الحساب', 'Delete account') + '</h3>' +
      '<p>' + T('سيتم حذف حسابك وبياناتك نهائياً، ولا يمكن التراجع عن هذا الإجراء.', 'Your account and its data will be permanently deleted. This cannot be undone.') + '</p>' +
      (pw ? '<input type="password" autocomplete="current-password" placeholder="' + T('أدخل كلمة المرور للتأكيد', 'Enter your password to confirm') + '">' : '') +
      '<div class="er"></div>' +
      '<button class="go" type="button" style="background-image:linear-gradient(#DE0921,#DE0921);color:#fff">' + T('حذف الحساب نهائياً', 'Delete permanently') + '</button>' +
      '<button class="no" type="button">' + T('إلغاء', 'Cancel') + '</button></div>';
    var go = sh.querySelector('.go'), er = sh.querySelector('.er'), inp = sh.querySelector('input');
    sh.querySelector('.no').onclick = close;
    go.onclick = function () {
      er.textContent = '';
      if (inp && !inp.value) { er.textContent = T('أدخل كلمة المرور.', 'Enter your password.'); inp.focus(); return; }
      go.disabled = true; go.textContent = T('جارٍ الحذف…', 'Deleting…');
      var re;
      if (inp) re = u.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(u.email, inp.value));
      else { var gp = new firebase.auth.GoogleAuthProvider(); gp.setCustomParameters({ prompt: 'select_account' }); re = u.reauthenticateWithPopup(gp); }
      re.then(function () { return u.delete(); }).then(function () {
        sh.innerHTML = '<div class="gr"></div><div class="dz" style="text-align:center"><div style="font-size:40px;margin:6px 0 10px">✅</div><h3>' + T('تم حذف الحساب', 'Account deleted') + '</h3><p>' + T('شكراً لاستخدامك أقنعني.', 'Thank you for playing AQNINI.') + '</p></div>';
        setTimeout(function () { location.reload(); }, 1800);
      }).catch(function (e) {
        go.disabled = false; go.textContent = T('حذف الحساب نهائياً', 'Delete permanently');
        var c = (e && e.code) || '';
        er.textContent = /user-mismatch/.test(c) ? T('اختر نفس الحساب المسجّل للتأكيد.', 'Choose the same signed-in account to confirm.') : errText(e);
      });
    };
  }

  ready().then(function () {
    auth.getRedirectResult().catch(function (e) { showLogin(errText(e)); });
    auth.onAuthStateChanged(function (u) { if (!u) showLogin(); else if (needsVerify(u)) showVerify(u); else done(u); });
  }).catch(function () {
    showLogin(T('تعذّر تحميل صفحة الدخول. تحقق من الاتصال وأعد تحميل الصفحة.', 'Could not load sign-in. Check your connection and refresh.'));
  });
})();
