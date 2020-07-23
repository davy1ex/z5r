<?php
session_start();

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


function create_request() {
//     // создаёт шаблон запроса севера

//     // Запрос:
//     // {
//         // "id": 123456789,
//         // "operation": "power_on",
//         // "fw": "1.0.1",
//         // "conn_fw": "2.0.2",
//         // "active": 0,
//         // "mode": 0,
//         // "controller_ip": "192.168.0.222"
//     // }
    $response = [
        'type'      =>  'Z5RWEB',
        "sn"        =>  50001,
        'messages'  =>  []
    ];

    return $response;
}