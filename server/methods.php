<?php
session_start();
require_once ('db.php');

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

// 17.07.20 (авторизация с параметрами доступа)
function check_usr($login, $password) {
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `users` WHERE login = ? AND password = ?');
    $query -> execute([$login, $password]);
    $users = $query -> fetchAll(PDO::FETCH_ASSOC);
    $pdo = null;

    header("Content-Type: application/json");
    
    if (count($users) > 0 ) {
        // session_start()
        $_SESSION['login'] = $login;
        $_SESSION['access'] = $users[0]['access'];

        echo json_encode([
            'success' => true,
            'access' => $users[0]['access'],
            'users' => $users
        ]);

        
        
    }

    else {
        echo json_encode([
            'success' => false,
            'access' => $users[0]['access']
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

function get_cards() { 
    // получает все карты из бд
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `cards`');
    $query -> execute();
    $cards = $query -> fetchAll(PDO::FETCH_ASSOC);
    $pdo = null;
    
    header("Content-Type: application/json");

    echo json_encode([
        'success'   => 1,
        'cards'     => $cards
    ]);
}

function get_card($card_id) {
    // Получает карту
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `cards` WHERE id=?');
    $query -> execute([(int)$card_id]);
    $cards = $query -> fetchAll(PDO::FETCH_ASSOC);
    $pdo = null;

    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1,
        'card'     => $cards[0]
    ]);
}

function get_card_by_card_numb($card_numb) {
    // Получает карту
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `cards` WHERE card=?');
    $query -> execute([$card_numb]);
    $cards = $query -> fetchAll(PDO::FETCH_ASSOC);
    $pdo = null;

    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1,
        'card'     => $cards[0]
    ]);
}


function del_all_cards() {
    global $pdo;
    $query = $pdo -> prepare('DELETE FROM cards');
    $query -> execute();
    $pdo = null;

    header("Content-Type: application/json");

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

    header("Content-Type: application/json");

    echo json_encode([
        'success'   => 1
    ]);
}

// 14.07.20 (добавление карт) 
function add_card($numb_card, $operator_name, $block_type, $shord_code, $tz) {
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `cards` WHERE card = ?');
    $query -> execute([$numb_card]);
    $cards = $query -> fetchAll(PDO::FETCH_ASSOC);

    header("Content-Type: application/json");

    if (count($cards) > 0) { // если карта уже есть в бд
        $query = $pdo -> prepare('UPDATE `cards` SET `operator_name` = ?, `block_type` = ?, `shord_code` = ?, `tz` = ? WHERE card = ?');
        $query -> execute([
            $operator_name,
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
        $query = $pdo -> prepare('INSERT INTO cards (card, operator_name, block_type, shord_code, tz) VALUES (?, ?, ?, ?, ?)');
        $query -> execute([
            $numb_card,
            $operator_name,
            (int)$block_type,
            (int)$shord_code,
            (int)$tz
        ]);  
        $pdo = null;
        
        echo json_encode([
            'success'   => '1',
        ]);
    }
}

// 15.07.20 (отображение лога на стороне клиента)
function get_events() {
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `events` ORDER BY `events`.`date` ASC');
    $query -> execute();
    $events = $query -> fetchAll(PDO::FETCH_ASSOC);

    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1,
        'events'     => array_slice($events, -5)
    ], JSON_FORCE_OBJECT);
}

// 16.07.20 (добавление событий)
function add_event($action, $date, $source_type, $source_name) {
    global $pdo;
    $query = $pdo -> prepare('INSERT INTO events (action, date, source_type, source_name) VALUES (?, ?, ?, ?)');
    $query -> execute([
        $action,        
        $date,
        $source_type,
        $source_name
    ]);  
    $pdo = null;
    header("Content-Type: application/json");
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
    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1
    ]);
}

function remove_token($token) {
    global $pdo;
    $query = $pdo -> prepare('UPDATE `users` SET token="" WHERE token=?');
    $query -> execute([$token]);
    $pdo = null;
    header("Content-Type: application/json");
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
    $users = $query -> fetchAll(PDO::FETCH_ASSOC);        
    
    header("Content-Type: application/json");
    if (count($users) == 0)  {
        echo json_encode(['success' => false, 'status' => 'token not found']);
    }

    else {
        $query = $pdo -> prepare('UPDATE `users` SET device_id=?, device_type=?, device_mac=?, token=? WHERE token = ?');
        $query -> execute([
            $device_id,
            $device_type,
            $device_mac,
            null,
            $token
        ]);
        $pdo = null;

        echo json_encode(['success' => true]);
    }
    
}


# 18.07.20 - ПОЛЬЗОВАТЕЛИ
function get_users() { 
    // получает всех юзеров из бд
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `users`');
    $query -> execute();
    $users = $query -> fetchAll(PDO::FETCH_ASSOC);
    $pdo = null;
    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1,
        'users'     => $users
    ]);
}

function get_user($user_id) {
    // Получает юзера
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `users` WHERE id=?');
    $query -> execute([(int)$user_id]);
    $users = $query -> fetchAll(PDO::FETCH_ASSOC);
    $pdo = null;

    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1,
        'user'     => $users[0]
    ]);
}

function current_user() {
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `users` WHERE login=?');
    $query -> execute([$_SESSION['login']]);
    $users = $query -> fetchAll(PDO::FETCH_ASSOC);
    $pdo = null;


    header('Content-Type: application/json');

    echo json_encode([
        'success' => 1,
        'user' => $users[0]
    ]);
}

function add_user($username, $login, $password, $access) {
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `users` WHERE login = ?');
    $query -> execute([$login]);
    $users = $query -> fetchAll(PDO::FETCH_ASSOC);
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

        header("Content-Type: application/json");
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
    $query = $pdo -> prepare('DELETE FROM `users` WHERE id=?');
    $pdo = null;

    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1
    ]);
}

function del_all_users() {
    global $pdo;
    $query = $pdo -> prepare('DELETE FROM users');
    $query -> execute();

    $query = $pdo -> prepare('INSERT INTO users (id, username, login, password, access) VALUES (?, ?, ?, ?, ?)');
    $query -> execute([
        1,
        'root',
        'root',
        'toor',
        'admin'
    ]);
    $pdo = null;

    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1
    ]);
}



// 27.07.20 - ПРОШИВКИ
function put_config($namefile) {
    $uploaddir = '/configs/';
    $uploadfile = $uploaddir . basename($namefile);

    header("Content-Type: application/json");
    if (move_uploaded_file($namefile, $uploadfile)) {
        echo json_encode([
            'success' => 1,
            'files' => $_FILES
        ]);
    } else {
        echo json_encode([
            'success' => 0,
            'files' => $_FILES
        ]);
    }
}

function get_settings_access() {
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `settings_access`');
    $query -> execute();
    $settings = $query -> fetchAll(PDO::FETCH_ASSOC);

    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1,
        'settings'     => $settings
    ]);
}

function set_mode($mode) {
    global $pdo;    
    $query = $pdo -> prepare('UPDATE `settings_access` SET `mode` = ? WHERE id = 1');
    $query -> execute([
        (int)$mode
    ]);
    $pdo = null;

    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1
    ], JSON_FORCE_OBJECT);
}

function set_point_type($point_type) {
    global $pdo;    
    $query = $pdo -> prepare('UPDATE `settings_access` SET `point_type` = ? WHERE id = 1');
    $query -> execute([
        (int)$point_type
    ]);
    $pdo = null;

    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1
    ], JSON_FORCE_OBJECT);
}

function set_active($active) {
    global $pdo;    
    $query = $pdo -> prepare('UPDATE `settings_access` SET `server_sync` = ? WHERE id = 1');
    $query -> execute([
        (int)$active
    ]);
    $pdo = null;

    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1
    ], JSON_FORCE_OBJECT);
}


function import_config($filename) {
    $string = file_get_contents("../configs/" . $filename, true);
    $json_a = json_decode($string);
    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1,
        'path' => "configs/" . $filename,
        'file' => $json_a
    ], JSON_FORCE_OBJECT);
}


// function get_all_work_times() {
//     global $pdo;
//     $query = $pdo -> prepare('SELECT * FROM `work_time`');
//     $query -> execute();
//     $work_time = $query -> fetchAll(PDO::FETCH_ASSOC);

//     header("Content-Type: application/json");
//     echo json_encode([
//         'success'   => 1,
//         'work_time'     => $work_time
//     ], JSON_FORCE_OBJECT);
// }


function add_work_time($start_time, $end_time, $title) {
    global $pdo;
    $query = $pdo -> prepare('INSERT INTO work_time (start_time, end_time, title) VALUES (?, ?, ?)');
    $query -> execute([
        $start_time,
        $end_time,
        $title
    ]);
    $pdo = null;

    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1
    ]);
}


function del_work_schedule($work_schedule_id) {
    global $pdo;
    $query = $pdo -> prepare('DELETE FROM work_schedule WHERE id=:id');
    $query -> execute(array(':id' => (int)$work_schedule_id));
    $pdo = null;

    header("Content-Type: application/json");

    echo json_encode([
        'success'   => 1
    ]);
}


function get_work_schedules() {
    global $pdo;
    $query = $pdo -> prepare('SELECT * FROM `work_schedule`');
    $query -> execute();
    $work_schedule = $query -> fetchAll(PDO::FETCH_ASSOC);

    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1,
        'work_schedule'     => $work_schedule
    ]);
}


function add_schedule($title, $work_days, $periodicity) {
    global $pdo;
    $query = $pdo -> prepare('INSERT INTO work_schedule (title, work_days, periodicity) VALUES (?, ?, ?)');
    $query -> execute([
        $title,
        $work_days,
        (int)$periodicity
    ]);
    $pdo = null;

    header("Content-Type: application/json");
    echo json_encode([
        'success'   => 1
    ]);
}