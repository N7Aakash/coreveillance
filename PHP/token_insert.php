<?php


include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$json = file_get_contents('php://input');

$obj = json_decode($json, true);

//$l_name = $obj['user_role_id'];
$token = $obj['token'];



    $Sql_Query = "insert into token (token) values ('$token')";


    if (mysqli_query($con, $Sql_Query)) {


        $MSG = 'true';


        $json = json_encode($MSG);


        echo $json;

}
mysqli_close($con);
