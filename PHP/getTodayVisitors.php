<?php

include 'Database.php';
$db=new Database();
$con=$db->getConnection();

$mydate=getdate();
//echo "$mydate[year]-$mydate[mday]";
$CheckSQL = "SELECT *,visitor_visiting.created_at as check_in FROM visitor_visiting INNER join visitor on visitor_visiting.visitor_id=visitor.visitor_id where visitor_visiting.created_at like '$mydate[year]-0$mydate[mon]-$mydate[mday]%'";
//echo $CheckSQL;
$results=mysqli_query($con, $CheckSQL);
//echo mysqli_num_rows($results);
//$check = mysqli_fetch_assoc($results);
//var_dump($check[1]);


if (mysqli_num_rows($results) == 0) {

    $EmailExistMSG = 'No Visitor ! Please enter some Visitors for display ';


    $EmailExistJson = json_encode($EmailExistMSG);


    echo $EmailExistJson;

} else if(isset($results)){
   $posts_arr = array();
      foreach($results as $res){
          extract($res);
          $post_item = array(
              'visitor_id' => $visitor_id,
              'f_name' => $f_name,
              'l_name' => $l_name,
              'email_id' => $email_id,
              'phone_no' => $phone_no,
              'visitor_type_id' => $visitor_type_id,
//              'image'=>$image,
              'date_first_visited'=>$created_at,
              'guard_incharge'=>$created_by,
              'visitor_visiting_flat'=>$visitor_visiting_flat,
              'visitor_visiting_wing'=>$visitor_visiting_wing,
              'num_of_pax'=>$num_of_pax,
              'check_in'=>$check_in,
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