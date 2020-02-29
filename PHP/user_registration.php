<?php


include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$f_name = $obj['f_name'];
$l_name = $obj['f_name'];
$email = $obj['email'];
$password = password_hash($obj['password'],PASSWORD_BCRYPT);
$wing = $obj['wing'];
$flat_no = $obj['flat_no'];
$phone_number = $obj['phone_number'];

//echo $email;

$CheckSQL = "SELECT * FROM users WHERE user_email='$email'";

// Executing SQL Query.
$check = mysqli_fetch_array(mysqli_query($con, $CheckSQL));


if (isset($check)) {

    $EmailExistMSG = 'Email Already Exist, Please Try Again !!!';

    $EmailExistJson = json_encode($EmailExistMSG);


    echo $EmailExistJson;

} else {


    $Sql_Query = "insert into users (f_name,l_name,email,password,wing,flat_no,phone_number) values ('$f_name','$l_name','$email','$password','$wing','$flat_no','$phone_number')";


    if (mysqli_query($con, $Sql_Query)) {


        $MSG = 'true';


        $json = json_encode($MSG);


        echo $json;

    } else {

        echo 'Try Again';

    }
}
mysqli_close($con);
