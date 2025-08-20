document.addEventListener("DOMContentLoaded", () => {
  const cart = []; 
  const addButtons = document.querySelectorAll(".add-cart, .product button");

  
  addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      const name = product.querySelector("h3").textContent;
      const price = parseInt(product.querySelector(".price").textContent.replace("FCFA", "").replace("F", "").trim());
      const img = product.querySelector("img").src;

      addToCart({ name, price, img });
    });
  });

  function addToCart(item) {
    
    const existing = cart.find(p => p.name === item.name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }

    renderCart();
  }

  function renderCart() {
    let cartBox = document.querySelector(".cart-box-container");
    if (!cartBox) {
      cartBox = document.createElement("div");
      cartBox.className = "cart-box-container";
      cartBox.style.position = "fixed";
      cartBox.style.top = "80px";
      cartBox.style.right = "20px";
      cartBox.style.width = "300px";
      cartBox.style.maxHeight = "400px";
      cartBox.style.overflowY = "auto";
      cartBox.style.background = "#fff";
      cartBox.style.border = "1px solid #ddd";
      cartBox.style.borderRadius = "10px";
      cartBox.style.padding = "10px";
      cartBox.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
      cartBox.innerHTML = `<h3>Your Cart</h3><div class="cart-items"></div><div class="cart-total"></div><button class="checkout">Checkout</button>`;
      document.body.appendChild(cartBox);

      cartBox.querySelector(".checkout").addEventListener("click", checkout);
    }

    const cartItems = cartBox.querySelector(".cart-items");
    cartItems.innerHTML = "";

    cart.forEach((p, i) => {
      const div = document.createElement("div");
      div.style.display = "flex";
      div.style.justifyContent = "space-between";
      div.style.alignItems = "center";
      div.style.marginBottom = "10px";

      div.innerHTML = `
        <img src="${p.img}" alt="${p.name}" style="width:40px;height:40px;object-fit:cover;border-radius:5px;">
        <span style="flex:1; margin-left:10px;">${p.name}</span>
        <span>${p.price}F</span>
        <div>
          <button class="dec" data-i="${i}">-</button>
          <span>${p.qty}</span>
          <button class="inc" data-i="${i}">+</button>
        </div>
        <button class="remove" data-i="${i}" style="color:red;">x</button>
      `;
      cartItems.appendChild(div);
    });

    
    const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);
    cartBox.querySelector(".cart-total").textContent = `Total: ${total} FCFA`;

  
    cartItems.querySelectorAll(".dec").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.i;
        if (cart[i].qty > 1) {
          cart[i].qty--;
        } else {
          cart.splice(i, 1);
        }
        renderCart();
      });
    });
    cartItems.querySelectorAll(".inc").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.i;
        cart[i].qty++;
        renderCart();
      });
    });
    cartItems.querySelectorAll(".remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.i;
        cart.splice(i, 1);
        renderCart();
      });
    });
  }

  function checkout() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);
    alert(`Thank you for your purchase! Total: ${total} FCFA`);

    const purchases = JSON.parse(localStorage.getItem("fm_purchases") || "[]");
    purchases.push({
      uid: localStorage.getItem("fm_current_user") || "guest",
      items: cart.map(c => ({ name: c.name, qty: c.qty, price: c.price })),
      total,
      ts: Date.now()
    });
    localStorage.setItem("fm_purchases", JSON.stringify(purchases));

    cart.length = 0;
    renderCart();
  }
});


