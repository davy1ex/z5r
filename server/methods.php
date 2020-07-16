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
    
    return true;

    
}

function check_usr($login, $password) {
    // проверяет данные пользователя
    if ($login == 'root' and $password == 'toor') {
        echo json_encode([
            'success' => 1
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
    $query = $pdo -> prepare('INSERT INTO cards (card, block_type, shord_code, tz) VALUES (?, ?, ?, ?)');
    $query -> execute([
        $numb_card,
        (int)$block_type,
        (int)$shord_code,
        (int)$tz
    ]);  
    $pdo = null;

    echo json_encode([
        'success'   => 1
    ]);
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
function add_device_by_token($token) {
    echo json_encode([
        'success'   => 1
    ]);
}
