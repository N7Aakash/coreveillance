<?php


include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$f_name = $obj['f_name'];
$l_name = $obj['l_name'];
$phone_no = $obj['phone_no'];
$email_id = $obj['email_id'];
$visitor_type_id =2;



//echo $email;



    $Sql_Query = "insert into visitor (f_name,l_name,email_id,phone_no,visitor_type_id, created_by) values ('$f_name','$l_name','$email_id','$phone_no','$visitor_type_id', 4)";


    if (mysqli_query($con, $Sql_Query)) {


        $MSG = 'true';


        $json = json_encode($MSG);


        echo $json;

    } else {

        echo 'Try Again';

    }

mysqli_close($con);
