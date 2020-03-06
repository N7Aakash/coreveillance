<?php

include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$CheckSQL = "SELECT * FROM users ";

$results=mysqli_query($con, $CheckSQL);
//echo mysqli_num_rows($results);
//$check = mysqli_fetch_assoc($results);
//var_dump($check[1]);


if (mysqli_num_rows($results) == 0) {

    $EmailExistMSG = 'No Users ! Please enter some users for display ';


    $EmailExistJson = json_encode($EmailExistMSG);


    echo $EmailExistJson;

} else if(isset($results)){
    $posts_arr = array();
    foreach($results as $res){
        extract($res);
        $post_item = array(
            'user_id' => $user_id,
            'user_role_id' => $user_role_id,
            'user_token' => $user_token,
            'f_name' => $f_name,
            'l_name' => $l_name,
            'email' => $email,
            'password' => $password,
            'wing' => $wing,
            'flat_no' => $flat_no,
            'phone_number' => $phone_number
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