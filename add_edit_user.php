<?php
require 'db_connect.php';

$id = $_POST['id'] ?? null;
$fullname = htmlspecialchars(trim($_POST['fullname']));
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($_POST['phone']));
$address = htmlspecialchars(trim($_POST['address']));
$username = htmlspecialchars(trim($_POST['username']));
$password = $_POST['password'] ?? '';

if($id){
    if($password){
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("UPDATE users SET fullname=?, email=?, phone=?, address=?, username=?, password=? WHERE id=?");
        $stmt->bind_param("ssssssi", $fullname, $email, $phone, $address, $username, $hashedPassword, $id);
    } else {
        $stmt = $conn->prepare("UPDATE users SET fullname=?, email=?, phone=?, address=?, username=? WHERE id=?");
        $stmt->bind_param("sssssi", $fullname, $email, $phone, $address, $username, $id);
    }
    $msg = "updated";
} else {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (fullname,email,phone,address,username,password) VALUES (?,?,?,?,?,?)");
    $stmt->bind_param("ssssss", $fullname, $email, $phone, $address, $username, $hashedPassword);
    $msg = "added";
}

if($stmt->execute()){
    echo "User $msg successfully!";
}else{
    echo "Error: ".$stmt->error;
}

$stmt->close();
$conn->close();
?>
