// Firebase SDK v10+
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// ✅ Firebase конфигурация
const firebaseConfig = {
  apiKey: "AIzaSyCClVQXq8Y5lk2mDHznmvojt9JnLUp6yeQ",
  authDomain: "qr-menu-c4ae0.firebaseapp.com",
  projectId: "qr-menu-c4ae0",
  storageBucket: "qr-menu-c4ae0.appspot.com", // 🔧 исправлено
  messagingSenderId: "474351769143",
  appId: "1:474351769143:web:a9e192499f96dc0e4011b2",
  measurementId: "G-BJ03P7FWGD",
  databaseURL: "https://qr-menu-c4ae0-default-rtdb.europe-west1.firebasedatabase.app/" // ✅ добавлено
};

// 🔧 Инициализация
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// ✅ Авторизация
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

// ✅ Кнопка выхода
window.logout = function () {
  signOut(auth)
    .then(() => window.location.href = "login.html")
    .catch(err => alert("Ошибка выхода: " + err.message));
};

// ✅ Загрузка заказов
const ordersRef = ref(db, 'orders');

onValue(ordersRef, (snapshot) => {
  const orders = snapshot.val();
  const container = document.getElementById('orders');
  container.innerHTML = '';

  if (!orders) {
    container.innerHTML = '<p>Пока заказов нет</p>';
    return;
  }

  Object.entries(orders).forEach(([id, order]) => {
    const div = document.createElement('div');
    div.className = 'order-item';
    div.innerHTML = `
      <strong>${order.name || 'Неизвестный клиент'}</strong> заказал: ${order.product || 'неизвестный товар'}
      <br><small>${new Date(order.createdAt || Date.now()).toLocaleString()}</small>
    `;
    container.appendChild(div);
  });
});
