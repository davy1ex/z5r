<?php

function enter() {
    $LOGIN = 'root';
    $PASSWORD = 'toor';

    $error = array();

    if ($_POST['login'] != "" && $_POST['password'] != "") { // если данные верные
        $usr_login = $_POST['login']; 
        $usr_password = $_POST['password'];

        if ($usr_login == $LOGIN )  { // верный логин
            if ($usr_password == $PASSWORD) { //верный пароль
                // set user cookie
                setcookie ("login", 'root', time() + 50000);    
            }

            else { // неверный пароль
                $error[] = "Неверный пароль";                                       
                return $error;          
            }
        }
    }

    else { // если данные не верные
        $error[] = "Поля не должны быть пустыми!";              
        return $error;  
    }

    return $error; 
}


function login() {
    if (count($_COOKIE) > 0) {
        return true;
    }

    else {
        return false;
    }
}


// function index() {
//     echo '<script>
//         window.location.href = "/client/index.html?#";
//         </script>';
// }