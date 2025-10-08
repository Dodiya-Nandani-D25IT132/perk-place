const usersBtn = document.getElementById('usersBtn');
const ordersBtn = document.getElementById('ordersBtn');
const logoutBtn = document.getElementById('logoutBtn');
const content = document.getElementById('content');

loadUsers();

usersBtn.addEventListener('click', loadUsers);
ordersBtn.addEventListener('click', loadOrders);
logoutBtn.addEventListener('click', () => { window.location.href = 'logout.php'; });

function loadUsers() {
    usersBtn.classList.add('active-tab');
    ordersBtn.classList.remove('active-tab');

    fetch('fetch_users.php')
        .then(res => res.text())
        .then(html => {
            content.innerHTML = html;
            document.getElementById('userForm').addEventListener('submit', submitUserForm);
        });
}

function loadOrders() {
    ordersBtn.classList.add('active-tab');
    usersBtn.classList.remove('active-tab');

    fetch('fetch_orders.php')
        .then(res => res.text())
        .then(html => content.innerHTML = html);
}


// Edit user

function submitUserForm(e){
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch('add_edit_user.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(msg => {
            alert(msg);
            loadUsers(); 
            e.target.reset();
            document.getElementById('userFormTitle').innerText = "Add New User";
            document.getElementById('password').placeholder = "Leave blank to keep current password";
        });
}
function editUser(id){
    fetch('get_user.php?id=' + id)
        .then(res => res.json())
        .then(user => {
            document.getElementById('userFormTitle').innerText = "Edit User";
            document.getElementById('userId').value = user.id; // important
            document.getElementById('fullname').value = user.fullname;
            document.getElementById('email').value = user.email;
            document.getElementById('phone').value = user.phone;
            document.getElementById('address').value = user.address;
            document.getElementById('username').value = user.username;
            document.getElementById('password').value = '';
            document.getElementById('password').placeholder = "Leave blank to keep current password";
        });
}


// Delete user
function deleteUser(id){
    if(confirm("Are you sure to delete this user?")){
        fetch('delete_user.php?id=' + id)
            .then(res => res.text())
            .then(msg => {
                alert(msg);
                loadUsers();
            });
}
};