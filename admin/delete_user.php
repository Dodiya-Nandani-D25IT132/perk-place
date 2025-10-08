<?php
require 'db_connect.php';
$id = $_GET['id'] ?? 0;
$stmt = $conn->prepare("DELETE FROM users WHERE id=?");
$stmt->bind_param("i", $id);

if($stmt->execute()){
    echo "User deleted successfully!";
}else{
    echo "Error: ".$stmt->error;
}
$stmt->close();
$conn->close();
?>
