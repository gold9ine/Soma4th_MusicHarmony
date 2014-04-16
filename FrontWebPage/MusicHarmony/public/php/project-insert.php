<?PHP
// header('Content-Type: text/html; charset=utf-8');
// session_cache_expire(1800);
// //현재 페이지에만 임의로 1800을 줍니다.
// session_start();
?>

<?php
include_once ('./config.php');

extract($_POST);
$USER_ID=$_POST["USER_ID"];
$USER_PASSWORD=$_POST["USER_PASSWORD"];
$E_MAIL=$_POST["E_MAIL"];
$IP_ADDRESS=$_POST["IP_ADDRESS"];
$MAC_ADDRESS=$_POST["MAC_ADDRESS"];
$USER_NICKNAME=$_POST["USER_NICKNAME"];

// echo $USER_ID.'<br/>';
// echo $USER_PASSWORD.'<br/>';
// echo $E_MAIL.'<br/>';
// echo $IP_ADDRESS.'<br/>';
// echo $MAC_ADDRESS.'<br/>';

mysql_select_db($SGdb, $conn);

$q="INSERT INTO MANAGER(USER_ID,
USER_PASSWORD,
E_MAIL,
IP_ADDRESS,
MAC_ADDRESS,
USER_NICKNAME)
VALUES('$USER_ID',
'$USER_PASSWORD',
'$E_MAIL',
'$IP_ADDRESS',
'$MAC_ADDRESS',
'$USER_NICKNAME')";

mysql_query($q, $conn);
?>

<meta http-equiv="refresh" content="0; url=../page/index.html">
<script>
alert("회원가입을 축하드립니다.");
</script>