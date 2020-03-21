<?php
include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$json = file_get_contents('php://input');

$obj = json_decode($json, true);


$pass=$obj['password'];
$type=$obj['requestType'];


if($type==1){
$email = $obj['email'];
$CheckSQL = "SELECT * FROM users WHERE email='$email'";
}
else{
$flat_no = $obj['flat_no'];
$CheckSQL = "SELECT * FROM users inner join user_role_type on users.user_role_id=user_role_type.user_role_type_id WHERE flat_no='$flat_no'";
}
// Executing SQL Query.

$result=mysqli_query($con, $CheckSQL);


if (mysqli_num_rows($result)==0) {

    $EmailExistJson = json_encode("User does Not Exist, Please Register First !!!");

    echo $EmailExistJson;

} else if(isset($result)){

    extract(mysqli_fetch_assoc($result));
    //echo strlen($password);
//    $passs = password_hash($pass,PASSWORD_BCRYPT);
//    echo (password_verify($password,$passs));
//    if(password_verify($password,substr(password_hash($pass,PASSWORD_BCRYPT),0,60) ))
//        echo json_encode("Password matched");
//    else
//        echo password_verify($password,password_hash($pass,PASSWORD_BCRYPT));
    if($password === $pass){
       $posts_arr = array();
          $post_item = array(
                   'user_id' => $user_id,
                   'user_role_id' => $user_role_id,
                   'f_name' => $f_name,
                   'l_name' => $l_name,
                   'email' => $email,
                   'phone_number' => $phone_number,
                   'flat_no'=>$flat_no,
                   'wing'=>$wing,
                   'user_role_id'=>$user_role_id,
                   'user_role_name'=>$user_role_name,
               );


//               array_push($posts_arr, $post_item);
                 $json = json_encode($post_item);


                       echo $json;
    }else if($password !== $pass)
       echo json_encode("Password did not matched");

}
else {

    echo 'Try Again';

}
//echo $type;
mysqli_close($con);