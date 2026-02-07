(function () {
  const FIVE_HOURS = 5 * 60 * 60 * 1000;
  const now = Date.now();

  // Проверяем localStorage + cookie (двойная защита)
  const ls = localStorage.getItem("qrLoginTime");
  const cookieHasQR = document.cookie.includes("qrSession=1");
  const valid = ls && (now - parseInt(ls, 10) < FIVE_HOURS) && cookieHasQR;

  function hardBlock() {
    try { window.stop(); } catch (e) {}
    // подчистим всё
    localStorage.clear();
    document.cookie = "qrSession=; Max-Age=0; path=/; samesite=lax";
    // глушим текущую страницу и мгновенно редиректим на главную с QR
    document.documentElement.innerHTML = '<meta http-equiv="refresh" content="0;url=/index.html">';
  }

  if (!valid) {
    hardBlock();
    return;
  }

  // Ломаем кнопку «Назад» (даже если пользователь её жмёт)
  window.history.replaceState(null, "", window.location.href);
  window.history.pushState(null, "", window.location.href);
  window.addEventListener("popstate", () => {
    window.history.pushState(null, "", window.location.href);
  });

  // Если страница досталась из bfcache — проверим повторно
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      const ls = localStorage.getItem("qrLoginTime");
      const cookieHasQR = document.cookie.includes("qrSession=1");
      if (!ls || !cookieHasQR || (Date.now() - parseInt(ls,10) >= FIVE_HOURS)) {
        hardBlock();
      }
    }
  });
})();
