<?php


include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$json = file_get_contents('php://input');

//print_r($json);
$obj = json_decode($json, true);
var_dump($obj);
//
////$l_name = $obj['user_role_id'];
$image = $obj['image'];

  $query = "insert into anomaly(camera_id, image) values(1,'$image')";
     $res= mysqli_query($con,$query);


    if ($res) {



        $msg = "inserted successfully";

        $json = json_encode($msg);


        echo $json;

    } else {

        echo $con->error;

    }
mysqli_close($con);
?>