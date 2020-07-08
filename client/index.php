<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include_once ('lib/connect.php');


if (login()) {
    include_once ('templates/index.html');
}

else {
    if (isset($_POST['log_in'])) { // Если нажажа кнопка авторизации
        $error = enter();

        if (count($error) != 0) {
            echo $error;
        }
    }

    else {        
        include_once ('templates/login.html');
    }
}


