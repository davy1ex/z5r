<?php
$login = 'root';
// $pass = md5('toor');
$pass = 'toor';


$respond = array(
    'id'        =>  '1243254144',
    'method'    =>  'login',
    'login'     =>  '',
    'pass'      =>  '',
);



// CHECK LOGIN
if ($_POST['login'] == $login) {
    $respond['login'] = 1;
}

else if ($_POST['login'] != $login) {
    $respond['login'] = 0;
}


// CHECK PASS
if ($_POST['pass'] == $pass) {
    $respond['pass'] = 1;
}

else if ($_POST['pass'] != $pass) {
    $respond['pass'] = 0;
}


echo json_encode($respond);