<?php


include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$name = $obj['name'];

$email = $obj['email'];

$password = $obj['password'];

//echo $email;

$CheckSQL = "SELECT * FROM users WHERE user_email='$email'";

// Executing SQL Query.
$check = mysqli_fetch_array(mysqli_query($con, $CheckSQL));


if (isset($check)) {

    $EmailExistMSG = 'Email Already Exist, Please Try Again !!!';

    $EmailExistJson = json_encode($EmailExistMSG);


    echo $EmailExistJson;

} else {


    $Sql_Query = "insert into users (user_name,user_email,user_password) values ('$name','$email','$password')";


    if (mysqli_query($con, $Sql_Query)) {


        $MSG = 'true';


        $json = json_encode($MSG);


        echo $json;

    } else {

        echo 'Try Again';

    }
}
mysqli_close($con);
