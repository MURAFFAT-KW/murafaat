/* أقنعني — يحفظ نسخة من الصفحات عشان تفتح أسرع. الصفحات تتحدث من النت أول (عشان أي تعديل ترفعه يبين على طول)، والصور والملفات المشتركة من النسخة المحفوظة */
var C = 'aqnieni-2026-11-25a';
self.addEventListener('install', function (e) { self.skipWaiting(); e.waitUntil(caches.open(C).then(function (c) { return c.addAll(['aq-pro.js', 'aq-brand.js', 'aq-theme.js', 'apple-touch-icon.png', 'icon-192.png']).catch(function () { }); })); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (k) { return Promise.all(k.filter(function (x) { return x !== C; }).map(function (x) { return caches.delete(x); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener('fetch', function (e) {
  var r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin) return;
  var page = r.mode === 'navigate' || /\.html$/.test(u.pathname) || u.pathname.slice(-1) === '/';
  if (page) {
    e.respondWith(new Promise(function (res) {
      var done = false, t = setTimeout(function () { caches.match(r, { ignoreSearch: true }).then(function (m) { if (m && !done) { done = true; res(m); } }); }, 3500);
      fetch(r).then(function (n) { clearTimeout(t); var cp = n.clone(); caches.open(C).then(function (c) { c.put(r, cp); }); if (!done) { done = true; res(n); } })
        .catch(function () { caches.match(r, { ignoreSearch: true }).then(function (m) { if (!done) { done = true; res(m || Response.error()); } }); });
    }));
  } else {
    e.respondWith(caches.match(r).then(function (m) {
      var f = fetch(r).then(function (n) { if (n.ok) { var cp = n.clone(); caches.open(C).then(function (c) { c.put(r, cp); }); } return n; }).catch(function () { return m; });
      return m || f;
    }));
  }
});
