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
                // set user session
                // $_SESSION['id'] = '0';
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
    // if ($_SESSION['id'] == '0') {
    if (count($_COOKIE) > 0) {
        return true;
    }

    else {
        return false;
    }
}


// function out() {
//     setcookie ("login", 'root', time() + 0);    
// }