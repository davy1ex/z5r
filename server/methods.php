<?php
include_once ('functions.php');


function power_on($active, $mode) {
    // хз зачем это
    $response = create_request();

    array_push($response['messages'], array(
        'id'            =>  123456789,
        'operation'     =>  'power_on',
        'fw'            =>  '1.0.1',
        'conn_fw'       =>  0,
        'active'        =>  $active,
        'mode'          =>  $mode,
        'controller_ip' =>  '192.168.0.222'
    ));
    
    return $response;

    
}

// function check_usr($login, $password) {
//     // проверяет данные пользователя
//     if ($login == 'root' and $password == 'toor') {
//         echo json_encode([
//             'success' => 1
//         ]);
//     }

//     else {
//         echo json_encode([
//             'success' => 0
//         ]);
//     }
// }

// 17.07.20 (авторизация с параметрами доступа)
function check_usr($login, $password) {
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `users` WHERE login = ? AND password = ?');
    $query -> execute([$login, $password]);
    $users = $query -> fetchAll();
    $pdo = null;
    // echo json_encode([
    //     'success' => 1,
    //     'data' => json_encode($users)
    // ]);
    if ($users[0]['login'] == $login) {
        echo json_encode([
            'success' => 1,
            'access'  => $users[0]['access']
        ]);
    }

    else {
        echo json_encode([
            'success' => 0
        ]);
    }
}

// все карты

// $cards = [
//     [
//         "card"  => "00B5009EC1A8",
//         // "flags" => 0,
//         "block_type" => false,
//         "shord_code" => false,
//         "tz"    => 255
//     ],
    
//     [
//         "card"  => "0000000FE32A2",
//         // "flags" => 32,
//         "block_type" => true,
//         "shord_code" => false,
//         "tz"    => 255
//     ]
// ];

// 13.07.20 (все карты через бд)
require_once ('db.php');

function get_cards() { 
    // получает все карты из бд
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `cards`');
    $query -> execute();
    $cards = $query -> fetchAll();
    $pdo = null;
    // раскомментить, чтобы статично рисовать "тестовые" карты:
    // global $cards
    echo json_encode([
        'success'   => 1,
        'cards'     => $cards
    ]);
}





function del_all_cards() {
    global $pdo;
    $query = $pdo -> prepare('DELETE FROM cards');
    $query -> execute();
    $pdo = null;

    echo json_encode([
        'success'   => 1
    ]);
}

function del_card($card_id) {
    // удаляет карту по её айди 
    global $pdo;
    $query = $pdo -> prepare('DELETE FROM cards WHERE id=:id');
    $query -> execute(array(':id' => (int)$card_id));
    $pdo = null;

    echo json_encode([
        'success'   => 1
    ]);
}

// 14.07.20 (добавление карт) 
function add_card($numb_card, $block_type, $shord_code, $tz) {
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `cards` WHERE card = ?');
    $query -> execute([$numb_card]);
    $cards = $query -> fetchAll();
    if (count($cards) > 0) { // если карта уже есть в бд
        $query = $pdo -> prepare('UPDATE `cards` SET `block_type` = ?, `shord_code` = ?, `tz` = ? WHERE card = ?');
        $query -> execute([
            (int)$block_type,
            (int)$shord_code,
            (int)$tz,
            $numb_card
        ]);
        $pdo = null;
        echo json_encode([
            'success'   => '1',
        ]);
    } 

    else {
        $query = $pdo -> prepare('INSERT INTO cards (card, block_type, shord_code, tz) VALUES (?, ?, ?, ?)');
        $query -> execute([
            $numb_card,
            (int)$block_type,
            (int)$shord_code,
            (int)$tz
        ]);  
        $pdo = null;
        echo json_encode([
            'success'   => '1',
        ]);
    }


    // $query = $pdo -> prepare('INSERT INTO cards (card, block_type, shord_code, tz) VALUES (?, ?, ?, ?)');
    // $query -> execute([
    //     $numb_card,
    //     (int)$block_type,
    //     (int)$shord_code,
    //     (int)$tz
    // ]);  
    // $pdo = null;

    // echo json_encode([
    //     'success'   => 1
    // ]);
}

// 15.07.20 (отображение лога на стороне клиента)
function get_events() {
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `events` ORDER BY `events`.`date` ASC');
    $query -> execute();
    $events = $query -> fetchAll();

    echo json_encode([
        'success'   => 1,
        'events'     => $events
    ]);
}
// 16.07.20 (добавление событий)
function add_event($event, $date) {
    global $pdo;
    $query = $pdo -> prepare('INSERT INTO events (action, date) VALUES (?, ?)');
    $query -> execute([
        $event,
        $date
    ]);  
    $pdo = null;

    echo json_encode([
        'success'   => 1
    ]);
}


// 16.07.20 (Генерация кр кода с токеном по нажанию кнопки)
function add_token($token, $user_id) {
    global $pdo;
    $query = $pdo -> prepare('UPDATE `users` SET token=? WHERE id=?');
    $query -> execute([
        $token,
        (int)$user_id
    ]);  

    $pdo = null;

    echo json_encode([
        'success'   => 1
    ]);
}

function remove_token($token) {
    global $pdo;
    $query = $pdo -> prepare('UPDATE `users` SET token="" WHERE token=?');
    $query -> execute([$token]);
    $pdo = null;

    echo json_encode([
        'success'   => 1
    ]);
}

function add_device_by_token($token, $device_id, $device_type, $device_mac) {
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `users` WHERE token = ?');
    $query -> execute([
        $token
    ]);
    $users = $query -> fetchAll();
    
    
    // header("HTTP/1.1 200 test: " . json_encode($devices));
    if ($users[0]['id']) {
        // global $pdo;
        $query = $pdo -> prepare('UPDATE `users` SET device_id=?, device_type=?, device_mac=? WHERE token = ?');
        $query -> execute([
            $device_id,
            $device_type,
            $device_mac,
            $token
        ]);
        $pdo = null;

        header("HTTP/1.1 200 success");  //$users[0]['token'] . $device_id . ' , ' . $device_type . ' , ' .  $device_mac);
        // echo json_encode([
        //     'success'   => 1,
        //     'phone_id'        => $query['phone_id']
        // ]);
    }

    else {
        header("HTTP/1.1 200 no found");
    }
}


# 18.07.20 - ПОЛЬЗОВАТЕЛИ
function get_users() { 
    // получает всех юзеров из бд
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `users`');
    $query -> execute();
    $users = $query -> fetchAll();
    $pdo = null;

    echo json_encode([
        'success'   => 1,
        'users'     => $users
    ]);
}

function get_user($user_id) {
    // Получает юзера
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `users` WHERE id=?');
    $query -> execute([$user_id]);
    $users = $query -> fetchAll();
    $pdo = null;

    echo json_encode([
        'success'   => 1,
        'user'     => $users[0]
    ]);
}

function add_user($username, $login, $password, $access) {
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `users` WHERE login = ?');
    $query -> execute([$login]);
    $users = $query -> fetchAll();
    if ($users[0]['login'] == $login) { // если пользователь уже есть в бд
        $query = $pdo -> prepare('UPDATE `users` SET `username` = ?, `login` = ?, `password` = ?, `access` = ? WHERE id = ?');
        $query -> execute([
            $username,
            $login,
            $password,
            $access,
            $users[0]['id']
        ]);
        $pdo = null;
        echo json_encode([
            'success'   => '1',
        ]);
    } 

    else {
        $query = $pdo -> prepare('INSERT INTO users (username, login, password, access) VALUES (?, ?, ?, ?)');
        $query -> execute([
            $username,
            $login,
            $password,
            $access,
        ]);  
        $pdo = null;
        echo json_encode([
            'success'   => '1',
        ]);
    }
}

function del_user($user_id) {
    // удаляет карту по её айди 
    global $pdo;
    $query = $pdo -> prepare('DELETE FROM `users` WHERE id=?');
    $query -> execute(array((int)$user_id));
    $pdo = null;

    echo json_encode([
        'success'   => 1
    ]);
}