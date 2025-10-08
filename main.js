document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      document.querySelector("header").innerHTML = data;

      fetch("session_check.php")
        .then(res => res.json())
        .then(data => {
          const profileBox = document.getElementById("profile-box");

          if (data.loggedIn) {
            profileBox.innerHTML = `
              <a href="#">Welcome, ${data.username} ▾</a>
              <ul class="dropdown-content">
                <li><a href="profile.html">My Profile</a></li>
                <li><a href="#" id="logoutBtn">Logout</a></li>
              </ul>
            `;

            // Logout functionality
            document.getElementById("logoutBtn").addEventListener("click", (e) => {
              e.preventDefault();
              fetch("logout.php")
                .then(res => res.json())
                .then(msg => {
                  alert(msg.message);
                  location.reload(); // Refresh to reset header
                });
            });
          } else {
            profileBox.innerHTML = `
              <a href="#">Profile ▾</a>
              <ul class="dropdown-content">
                <li><a href="login.html">Login</a></li>
                <li><a href="registration.html">Register</a></li>
              </ul>
            `;
          }
        });
    });

  // Load Footer dynamically
  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.querySelector("footer").innerHTML = data;
    });
});
