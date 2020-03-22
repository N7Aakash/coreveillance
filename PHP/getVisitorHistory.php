<?php

include 'Database.php';
$db=new Database();
$con=$db->getConnection();

$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$v_id = $obj['visitor_id'];
$CheckSQL = "SELECT *,visitor.created_at as first_visited FROM visitor inner join visitor_visiting on visitor.visitor_id = visitor_visiting.visitor_id where visitor.visitor_id='$v_id'";

$results=mysqli_query($con, $CheckSQL);
//echo mysqli_num_rows($results);
//$check = mysqli_fetch_assoc($results);
//var_dump($check[1]);


if (mysqli_num_rows($results) == 0) {

    $EmailExistMSG = 'No History ! Please enter some History for display';


    $EmailExistJson = json_encode($EmailExistMSG);


    echo $EmailExistJson;

} else if(isset($results)){
  $posts_arr = array();
    foreach($results as $res){
        extract($res);
        $post_item = array(
            'visitor_id' => $visitor_id,
              'visitor_visiting_id' => $visitor_visiting_id,
            'f_name' => $f_name,
            'l_name' => $l_name,
            'email_id' => $email_id,
            'phone_no' => $phone_no,
            'visitor_type_id' => $visitor_type_id,
            'date_first_visited'=>$first_visited,
            'visitor_visiting_flat'=>$visitor_visiting_flat,
            'visitor_visiting_wing'=>$visitor_visiting_wing,
            'person'=>$num_of_pax,
            'check_in'=>$created_at,
            'check_in_incharge'=>$created_by,
            'check_out_incharge'=>$updated_by,
            'check_out'=>$updated_at,
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