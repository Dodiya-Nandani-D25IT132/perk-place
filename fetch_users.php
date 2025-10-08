<?php
require 'db_connect.php';

$result = $conn->query("SELECT * FROM users ORDER BY id DESC");

echo '<h3 id="userFormTitle">Add New User</h3>
<form id="userForm">
<input type="hidden" name="id" id="userId">
<label>Full Name:</label><input type="text" name="fullname" id="fullname" required><br><br>
<label>Email:</label><input type="email" name="email" id="email" required><br><br>
<label>Phone:</label><input type="text" name="phone" id="phone" required><br><br>
<label>Address:</label><input type="text" name="address" id="address"><br><br>
<label>Username:</label><input type="text" name="username" id="username" required><br><br>
<label>Password:</label><input type="password" name="password" id="password" placeholder="Leave blank to keep current"><br><br>
<button type="submit">Save</button>
</form>
<hr>';

echo "<h3>Users List</h3>";
echo "<table border='1' cellpadding='10'>
<tr><th>ID</th><th>Full Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Username</th><th>Actions</th></tr>";

if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        echo "<tr>
        <td>{$row['id']}</td>
        <td>{$row['fullname']}</td>
        <td>{$row['email']}</td>
        <td>{$row['phone']}</td>
        <td>{$row['address']}</td>
        <td>{$row['username']}</td>
        <td>
        <button type='button' onclick='editUser({$row['id']})'>Edit</button>
        <button type='button' onclick='deleteUser({$row['id']})'>Delete</button>
        </td>
        </tr>";
    }
}else{
    echo "<tr><td colspan='7'>No users found</td></tr>";
}

$conn->close();
?>

<script>
document.getElementById('userForm').addEventListener('submit', submitUserForm);
</script>
