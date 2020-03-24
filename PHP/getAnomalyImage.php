<?php
include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$json = file_get_contents('php://input');

$obj = json_decode($json, true);


$id=$obj['anomaly_description_id'];



$CheckSQL = "SELECT * FROM anomaly WHERE anomaly_description_id='1'";
// Executing SQL Query.

$result=mysqli_query($con, $CheckSQL);


if (mysqli_num_rows($result)==0) {

    $EmailExistJson = json_encode("Images does Not Exist, Please add some images First !!!");

    echo $EmailExistJson;

} else if(isset($result)){
  $posts_arr = array();
    foreach($result as $res){
        extract($res);
        $post_item = array(
            'anomaly_id'=>$anomaly_id,
                          'camera_id'=>$camera_id,
                         'image'=>$image,
        );


        array_push($posts_arr, $post_item);

    }


        $json = json_encode($posts_arr);


        echo $json;

}
else {

    echo 'Try Again';

}
//echo $type;
mysqli_close($con);
