<?php


include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$visitor_id = $obj["visitor_id"];


    $Sql_Query = "UPDATE visitor_visiting SET updated_at=now() WHERE visitor_id='$visitor_id'";


    if(mysqli_query($con, $Sql_Query)){


        $MSG = 'true';


        $json = json_encode($MSG);


        echo $json;

    } else {

        echo mysqli_error($con);

    }


mysqli_close($con);
