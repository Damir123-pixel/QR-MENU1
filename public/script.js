function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} добавлено в корзину!`);
}
function addToCartAndGo(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));

  // Переход на страницу корзины
  window.location.href = "cart.html";
}

function addToCartAndGo(itemName, price) {
  
  showNotification(); 
}

// Показ уведомления
function showNotification() {
  const notification = document.getElementById('cartNotification');
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000); // 2 секунды
}

