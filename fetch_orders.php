<?php
require 'db_connect.php';

$result = $conn->query("SELECT * FROM orders ORDER BY id DESC");

echo "<h3>Orders List</h3>";
echo "<table border='1' cellpadding='10'>
<tr>
<th>ID</th><th>Customer Name</th><th>Email</th><th>Phone</th><th>Address</th>
<th>Items</th><th>Total Price</th><th>Order Date</th></tr>";

if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        echo "<tr>
        <td>".$row['id']."</td>
        <td>".$row['customer_name']."</td>
        <td>".$row['customer_email']."</td>
        <td>".$row['customer_phone']."</td>
        <td>".$row['customer_address']."</td>
        <td>".$row['items']."</td>
        <td>".$row['total_price']."</td>
        <td>".$row['order_date']."</td>
        </tr>";
    }
}else{
    echo "<tr><td colspan='8'>No orders found</td></tr>";
}

$conn->close();
?>
