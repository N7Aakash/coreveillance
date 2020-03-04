<?php


include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$json = file_get_contents('php://input');

$obj = json_decode($json, true);

//$l_name = $obj['user_role_id'];
$f_name = $obj['f_name'];
$l_name = $obj['l_name'];
$user_email = $obj['email'];
//$password = password_hash($obj['password'],PASSWORD_BCRYPT);
$password = $obj['password'];
$wing = $obj['wing'];
$flat_no = $obj['flat_no'];
$phone_number = $obj['phone_number'];

//echo $email;

$CheckSQL = "SELECT * FROM users WHERE email='$user_email'";

// Executing SQL Query.
$result=mysqli_query($con, $CheckSQL);

if (mysqli_num_rows($result)==1) {

    $EmailExistMSG = 'Email Already Exist, Please Try Again !!!';

    $EmailExistJson = json_encode($EmailExistMSG);


    echo $EmailExistJson;

} else {


    $Sql_Query = "insert into users (user_role_id,f_name,l_name,email,password,wing,flat_no,phone_number) values (3,'$f_name','$l_name','$user_email','$password','$wing','$flat_no','$phone_number')";


    if (mysqli_query($con, $Sql_Query)) {


        $MSG = 'true';


        $json = json_encode($MSG);


        echo $json;

    } else {

        echo 'Try Again';

    }
}
mysqli_close($con);
