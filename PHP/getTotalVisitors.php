<?php

include 'Database.php';
$db=new Database();
$con=$db->getConnection();

$mydate=getdate();
//echo "$mydate[year]-$mydate[mday]";
$CheckSQL = "SELECT count(*) as cnt FROM visitor";
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
    extract(mysqli_fetch_assoc($results));




//        $json = json_encode($posts_arr);


        echo $cnt;

}
else {

    echo 'Try Again';

}

mysqli_close($con);

?>