// ========== CART FUNCTIONS ==========

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(item) {
    const cart = getCart();
    const existingItem = cart.find(i => i.name === item.name);
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push(item);
    }
    saveCart(cart);
    alert(`${item.name} is added to cart!`);
}

// Render cart on cart page
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    if (!cartItems) return;

    const cart = getCart();
    cartItems.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>
                <button onclick="changeQuantity('${item.name}', -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity('${item.name}', 1)">+</button>
            </td>
            <td>₹${itemTotal}</td>
            <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
        `;
        cartItems.appendChild(tr);
    });

    cartTotal.textContent = `Total: ₹${total}`;
}

// Change quantity
function changeQuantity(name, change) {
    const cart = getCart();
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.quantity += change;
    if (item.quantity < 1) item.quantity = 1;
    saveCart(cart);
    renderCart();
}

// Remove item
function removeFromCart(name) {
    let cart = getCart();
    cart = cart.filter(i => i.name !== name);
    saveCart(cart);
    renderCart();
}

// Clear cart
function clearCart() {
    localStorage.removeItem("cart");
    renderCart();
}

// Add-to-cart button functionality
document.addEventListener("DOMContentLoaded", () => {
    const addButtons = document.querySelectorAll(".add-to-cart");
    addButtons.forEach(button => {
        button.addEventListener("click", () => {
            const item = {
                name: button.dataset.name,
                price: parseFloat(button.dataset.price),
                image: button.dataset.image,
                quantity: 1
            };
            addToCart(item);
        });
    });
});





