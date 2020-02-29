<?php
include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$email = $obj['email'];
$pass=$obj['password'];
$CheckSQL = "SELECT * FROM users WHERE user_email='$email'";

// Executing SQL Query.
$result=mysqli_query($con, $CheckSQL);


if (!isset($result)) {

    $EmailExistMSG = 'Email does Not Exist, Please Register First !!!';

    // Converting the message into JSON format.
    $EmailExistJson = json_encode($EmailExistMSG);

    echo $EmailExistJson;

} else if(isset($result)){

    extract(mysqli_fetch_assoc($result));
    if($user_password === $pass)
        echo json_encode("Password matched");
    else
        echo json_encode("Password Matching Failed!");


}
else {

    echo 'Try Again';

}
mysqli_close($con);