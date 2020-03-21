<?php

include 'Database.php';
$db=new Database();
$con=$db->getConnection();

$mydate=getdate();
//echo "$mydate[year]-$mydate[mday]";
$CheckSQL = "SELECT * FROM visitor WHERE visitor_type_id=1";
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

mysqli_close($con);

?>