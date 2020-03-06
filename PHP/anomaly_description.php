<?php


include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$json = file_get_contents('php://input');

$obj = json_decode($json, true);


$anomaly_type_id = $obj["anomaly_type_id"];
$anomaly_range = $obj["anomaly_range"];
$anomaly_frame = $obj["anomaly_frame"];



    $Sql_Query = "insert into anomaly_description (anomaly_title,anomaly_text,anomaly_type_id,anomaly_range,anomaly_frame) values ('Lorem Ipsum','Lorem Ipsum','$anomaly_type_id','$anomaly_range','$anomaly_frame')";


    if (mysqli_query($con, $Sql_Query)) {


        $MSG = 'true';


        $json = json_encode($MSG);


        echo $json;

    } else {

        echo 'data not inserted';

    }

mysqli_close($con);
