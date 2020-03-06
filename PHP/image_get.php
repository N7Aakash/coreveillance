<?php

include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$CheckSQL = "SELECT * FROM image where id=30";

$results=mysqli_query($con, $CheckSQL);
//echo mysqli_num_rows($results);
//$check = mysqli_fetch_assoc($results);
//var_dump($check[1]);


extract(mysqli_fetch_assoc($results));
echo $image;
mysqli_close($con);

?>