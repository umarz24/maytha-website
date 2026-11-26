const products = {
  claw: { name: "The Claw Edit", price: 19 },
  scrunchie: { name: "Soft Satin", price: 15 },
  pearl: { name: "Pearl Details", price: 22 },
  headband: { name: "The Headband Edit", price: 25 }
};
const cart = {};
const $ = (id) => document.getElementById(id);
const money = (n) => `SAR ${n.toFixed(2).replace(/\.00$/, "")}`;

function renderCart() {
  const entries = Object.entries(cart).filter(([, qty]) => qty > 0);
  const count = entries.reduce((sum, [, qty]) => sum + qty, 0);
  const subtotal = entries.reduce((sum, [key, qty]) => sum + products[key].price * qty, 0);
  $("cartCount").textContent = count;
  $("subtotal").textContent = money(subtotal);
  $("cartItems").innerHTML = entries.length ? entries.map(([key, qty]) => `
    <div class="cart-item">
      <div>${products[key].name}<small>${money(products[key].price)} each</small></div>
      <div class="quantity-controls">
        <button data-change="${key}" data-delta="-1" aria-label="Remove one">−</button>
        <span>${qty}</span>
        <button data-change="${key}" data-delta="1" aria-label="Add one">+</button>
      </div>
    </div>`).join("") : '<p class="empty-cart">Your bag is waiting for something lovely.</p>';
}
function openCart() {
  document.body.classList.add("cart-open");
  $("cartDrawer").setAttribute("aria-hidden", "false");
}
function closeCart() {
  document.body.classList.remove("cart-open");
  $("cartDrawer").setAttribute("aria-hidden", "true");
}
document.querySelectorAll("[data-product]").forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.product;
    cart[key] = (cart[key] || 0) + 1;
    renderCart();
    openCart();
  });
});
$("cartItems").addEventListener("click", event => {
  const button = event.target.closest("[data-change]");
  if (!button) return;
  const key = button.dataset.change;
  cart[key] = Math.max(0, (cart[key] || 0) + Number(button.dataset.delta));
  renderCart();
});
$("cartTrigger").addEventListener("click", openCart);
$("closeCart").addEventListener("click", closeCart);
$("cartBackdrop").addEventListener("click", closeCart);
$("checkoutButton").addEventListener("click", () => alert("MAYTHA checkout is not live yet. These are preview products and prices."));
$("menuToggle").addEventListener("click", () => {
  const nav = $("mainNav");
  const isOpen = nav.classList.toggle("open");
  $("menuToggle").setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll("#mainNav a").forEach(link => link.addEventListener("click", () => {
  $("mainNav").classList.remove("open");
  $("menuToggle").setAttribute("aria-expanded", "false");
}));
$("year").textContent = new Date().getFullYear();
renderCart();
