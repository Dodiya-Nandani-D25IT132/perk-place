// Setup order modal
function setupOrderModal() {
    const proceedBtn = document.getElementById("proceed");
    const modal = document.getElementById("orderModal");
    const closeBtn = modal.querySelector(".close");

    // Open modal on proceed
    proceedBtn.addEventListener("click", () => {
        const cart = getCart();
        if (cart.length === 0) {
            alert("Cart is empty! Add items before proceeding.");
            return;
        }
        modal.style.display = "block";
    });

    // Close modal on X button
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal if clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

    const orderForm = document.getElementById("orderForm");

    // Submit order and send to PHP
    orderForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const cart = getCart();
        if(cart.length === 0){
            alert("Cart is empty!");
            return;
        }

        const cartItems = JSON.stringify(cart);
        let totalPrice = 0;
        cart.forEach(item => totalPrice += item.price * item.quantity);

        const name = document.getElementById("custName").value;
        const phone = document.getElementById("custContact").value;
        const address = document.getElementById("custAddress").value;
const email = document.getElementById("custEmail").value;

        fetch("process_order.php", {  // ← changed path to root
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&cart_items=${encodeURIComponent(cartItems)}&total_price=${encodeURIComponent(totalPrice)}`
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if(data.status === 'success') {
                clearCart();
                modal.style.display = "none";
            }
        })
        .catch(err => console.error(err));
    });
}

// Initialize cart page
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    setupOrderModal();

    // Clear cart button
    const clearBtn = document.getElementById("clear-cart");
    if (clearBtn) clearBtn.addEventListener("click", clearCart);
});
