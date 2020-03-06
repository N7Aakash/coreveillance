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
$CheckSQL = "SELECT * FROM users WHERE flat_no='$flat_no'";
}
// Executing SQL Query.
$result=mysqli_query($con, $CheckSQL);


if (mysqli_num_rows($result)==0) {
    $EmailExistMSG = 'User does Not Exist, Please Register First !!!';
   //    var_dump($obj);
    // Converting the message into JSON format.
    $EmailExistJson = json_encode($EmailExistMSG);

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
    if($password === $pass)
  echo json_encode("Password matched");
    else
       echo json_encode("Password did not matched");

}
else {

    echo 'Try Again';

}
//echo $type;
mysqli_close($con);