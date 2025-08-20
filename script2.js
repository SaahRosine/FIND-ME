document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".cart-icon");
    const cart = document.querySelector(".cart");
    const cartClose = document.querySelector("#cart-close");
    const cartContent = document.querySelector(".cart-content"); 

    cartIcon.addEventListener("click", () => cart.classList.add("active"));
    cartClose.addEventListener("click", () => cart.classList.remove("active"));

    const addCartButtons = document.querySelectorAll(".add-cart");
    addCartButtons.forEach(button => {
        button.addEventListener("click", event => {
            const productBox = event.target.closest(".product-box");
            addToCart(productBox);
        });
    });

    const addToCart = (productBox) => {
        const productImgSrc = productBox.querySelector("img").src;
        const productTitle = productBox.querySelector(".product-title").textContent;
        const price = productBox.querySelector(".price").textContent;

        const cartItems = cartContent.querySelectorAll(".cart-product-title");
        for (let item of cartItems) {
            if (item.textContent === productTitle) {
                alert("This item already exists in the cart.");
                return;
            }
        }

        
        const CartBox = document.createElement("div");
        CartBox.classList.add("cart-box");
        CartBox.innerHTML = `
            <img src="${productImgSrc}" class="cart-img">
            <div class="cart-detail">
                <h2 class="cart-product-title">${productTitle}</h2>
                <span class="cart-price">${price}</span>
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
            let quantity = parseInt(numberElement.textContent); 

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
        const totalPriceElement = document.querySelector(".total-price");
        const cartBoxes = cartContent.querySelectorAll(".cart-box");
        let total = 0;

        cartBoxes.forEach(CartBox => {
            const priceElement = CartBox.querySelector(".cart-price");
            const quantityElement = CartBox.querySelector(".number");
            const price = parseInt(priceElement.textContent.replace("FCFA", "").trim());
            const quantity = parseInt(quantityElement.textContent);
            total += price * quantity;
        });

        totalPriceElement.textContent = `FCFA ${total}`;
    };

    let cartItemCount = 0;
    const updateCartCount = change => {
        const cartItemCountBadge = document.querySelector(".cart-item-count");
        cartItemCount += change;
        if (cartItemCount > 0) {
            cartItemCountBadge.style.visibility = "visible";
            cartItemCountBadge.textContent = cartItemCount;
        } else {
            cartItemCountBadge.style.visibility = "hidden";
            cartItemCountBadge.textContent = "";
        }
    };

    const buyNowButton = document.querySelector(".btn-buy");
    buyNowButton.addEventListener("click", () => {
        const cartBoxes = cartContent.querySelectorAll(".cart-box");
        if (cartBoxes.length === 0) {
            alert("Your cart is empty. Please add items before buying.");
            return;
        }

        cartBoxes.forEach(CartBox => CartBox.remove());
        cartItemCount = 0;
        updateCartCount(0);
        updateTotalPrice();

        alert("Thank you for your purchase!");
    });
});
