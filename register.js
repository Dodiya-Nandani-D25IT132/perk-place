document.getElementById("registrationForm").addEventListener("submit", function(e){
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const username = document.getElementById("usernameReg").value;
    const password = document.getElementById("passwordReg").value;

    fetch("registration.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `fullname=${encodeURIComponent(fullname)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if (data.status === "success") {
            window.location.href = "index.html"; // Redirect after success
        }
    })
    .catch(err => console.error(err));
});
