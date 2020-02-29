<?php


include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$f_name = $obj['f_name'];
$l_name = $obj['f_name'];
$phone_number = $obj['phone_number'];
$email = $obj['email'];
$visitor_type_id = $obj["visitor_type_id"];



//echo $email;



    $Sql_Query = "insert into visitor (f_name,l_name,email_id,phone_no,visitor_type_id) values ('$f_name','$l_name','$email','$phone_number','$visitor_type_id')";


    if (mysqli_query($con, $Sql_Query)) {


        $MSG = 'true';


        $json = json_encode($MSG);


        echo $json;

    } else {

        echo 'Try Again';

    }

mysqli_close($con);
