document.addEventListener("DOMContentLoaded", () => {
  // Fetch user profile
  fetch("profile.php", { credentials: "include" }) // include session
    .then(res => res.json())
    .then(data => {
      console.log("Profile data:", data); 
      const profileBox = document.getElementById("profile-details");

      if (!data.loggedIn) {
        profileBox.innerHTML = `<p>Please <a href="login.html">login</a> first.</p>`;
        return;
      }

      profileBox.innerHTML = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <span id="email">${data.email}</span></p>
        <p><strong>Phone:</strong> <span id="phone">${data.phone}</span></p>
        <p><strong>Address:</strong> ${data.address}</p>
        <button id="editBtn">Edit</button>
        <div id="editForm" style="display:none;">
          <input type="email" id="newEmail" value="${data.email}" required>
          <input type="text" id="newPhone" value="${data.phone}" required>
          <input type="text" id="newAddress" value="${data.address}" required>

          <button id="saveBtn">Save</button>
        </div>
      `;

      // Show edit form
      document.getElementById("editBtn").addEventListener("click", () => {
        document.getElementById("editForm").style.display = "block";
      });

      // Save updated email & phone
      document.getElementById("saveBtn").addEventListener("click", () => {
        const newEmail = document.getElementById("newEmail").value.trim();
        const newPhone = document.getElementById("newPhone").value.trim();
        const newAddress = document.getElementById("newAddress").value.trim();

        fetch("update_profile.php", {
          method: "POST",
          credentials: "include", // important for session
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: newEmail, phone: newPhone, address: newAddress })
        })
          .then(res => res.json())
          .then(msg => {
            alert(msg.message);
            if (msg.success) location.reload();
          })
          .catch(err => console.error("Update error:", err));
      });
    })
    .catch(err => console.error("Error fetching profile:", err));
});
