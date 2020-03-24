<?php

include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$CheckSQL = "SELECT * FROM anomaly_description inner join anomaly_type on anomaly_description.anomaly_type_id=anomaly_type.anomaly_type_id ORDER by anomaly_description.created_at ASC";

$results=mysqli_query($con, $CheckSQL);
//echo mysqli_num_rows($results);
//$check = mysqli_fetch_assoc($results);
//var_dump($check[1]);


if (mysqli_num_rows($results) == 0) {

    $EmailExistMSG = 'No Anomalies ! Please enter some Anomalies for display ';


    $EmailExistJson = json_encode($EmailExistMSG);


    echo $EmailExistJson;

} else if(isset($results)){
    $posts_arr = array();
    foreach($results as $res){
        extract($res);
        $post_item = array(
          'anomaly_description_id'=>$anomaly_description_id,
          'anomaly_text'=>$anomaly_text,
          'anomaly_title'=>$anomaly_title,
          'anomaly_range'=>$anomaly_range,
          'anomaly_frame'=>$anomaly_frame,
          'anomaly_date'=>$created_at,
          'anomaly_type'=>$anomaly_type_text,
        );


        array_push($posts_arr, $post_item);

    }


        $json = json_encode($posts_arr);


        echo $json;

}
else {

    echo 'Try Again';

}

mysqli_close($con);

?>