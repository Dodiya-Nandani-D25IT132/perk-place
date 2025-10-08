<?php
session_start();
if(!isset($_SESSION['admin_logged_in'])){
    header("Location: admin_login.php");
    exit();
}
require 'db_connect.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Admin Dashboard</title>
<link rel="stylesheet" href="admin.css">
</head>
<body>

<div class="admin-header">
  <h2>Admin Dashboard</h2>
  <div class="admin-nav">
    <button id="usersBtn" class="btn active-tab">Users</button>
    <button id="ordersBtn" class="btn">Orders</button>
    <button id="logoutBtn" class="btn">Logout</button>
  </div>
</div>

<div class="admin-main" id="content">
</div>

<script src="admin.js"></script>
</body>
</html>
