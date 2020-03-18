<?php

include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$CheckSQL = "SELECT image,anomaly_id,anomaly.anomaly_description_id,anomaly_text,anomaly_title, anomaly_range , anomaly_frame,anomaly_type_text FROM `anomaly` INNER join anomaly_description on anomaly.anomaly_description_id = anomaly_description.anomaly_description_id inner join anomaly_type on anomaly_description.anomaly_type_id=anomaly_type.anomaly_type_id ORDER BY anomaly.anomaly_id desc LIMIT 10";

$results=mysqli_query($con, $CheckSQL);
//echo mysqli_num_rows($results);
//$check = mysqli_fetch_assoc($results);
//var_dump($check[1]);
 $posts_arr = array();
    foreach($results as $res){
        extract($res);
        $i=0;
        $post_item = array(
                    'image' => $image,
                    'anomaly_id' =>$anomaly_id,
                    'anomaly_text'=>$anomaly_text,
                    'anomaly_title' => $anomaly_title,
                    'anomaly_frame'=> $anomaly_frame,
                    'anomaly_type_text' => $anomaly_type_text,

                    );

         array_push($posts_arr, $post_item);

        }

                            $json = json_encode($posts_arr);


                            echo $json;

mysqli_close($con);

?>