document.addEventListener("DOMContentLoaded",()=>{
    const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button =>{
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});

const addToCart = (productBox) => {
    const cartContent = document.querySelector(".cart-content");
    console.log(cartContent)
    const productImgScr = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const price = productBox.querySelectorAll(".price").textContent;

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item. textContent === productTitle) {
            alert("this item already exist in the cart.");
            return;
        }
    }
    const CartBox = document.createElement("div");
    CartBox.classList.add("cart-box");
    CartBox.innerHTML = `
    <img src="$(productImgScr)" class="cart-img">
                <div cladocss="cart-detail">
                    <h2 class="cart-product-title">hospital</h2>
                    <span class="cart-price">1000FCFA</span>
                    <div class="cart-quantity">
                        <button id="decrement">-</button>
                        <span class="number">1</span>
                        <button id="increment">+</button>
                    </div>
                </div>
                <i class="ri-delete-bin-line cart-remove"></i>
    `;
    cartContent.appendChild(CartBox);

    CartBox.querySelector(".cart-remove").addEventListener("click", () => {
        CartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();

    });
    CartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = CartBox.querySelector(".number");
        const decrementButton = CartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#999";
            }
        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity;

        updateTotalPrice();

    });

    updateCartCount(1);

    updateTotalPrice();

};

const updateTotalPrice = () => {
    const totalPricceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(CartBox => {
        const priceElement = CartBox.querySelector(".cart-price");
        const quantityElement = CartBox.querySelector(".number");
        const price = priceElement.textContent.replace("FCFA", "");
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPricceElement.textContent = `FCFA{total}`;
};

let cartItemCount = 0;
const cartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent ="";
    }
};

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("your cart is empty. please add items to your cart before buying.");
        return;
    }

    cartBoxes.forEach(CartBox => CartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    alert("thank you for your purchase!!!!!");
});
})