<?php
include_once ('functions.php');
include_once ('methods.php');



$data = json_decode(file_get_contents('php://input'), true);

if ($data['operation'] == 'power_on') {
    header("HTTP/1.1 200 Content-type: application/json ");
    echo json_encode(power_on($data['active'], $data['mode']));
}


if ($data['operation'] == 'set_active') {
    if (power_on($data['active'], $data['mode'])) {
        echo json_encode([
            'id'        => 123456789,
            'success'   => 1
        ]);
    }
}

if ($data['operation'] == 'login') {;
    check_usr($data['login'], $data['password']);
}

// if ($_POST['operation'] == 'login') {;
//     check_usr($_POST['login'], $_POST['password']);
// }


// кинуть все карты
if ($data['operation'] == 'get_cards'){
    get_cards();
}

if ($data['operation'] == 'del_card') {
    del_card($data['card_id']);
}

if ($data['operation'] == 'del_all_cards') {
    del_all_cards();
}

// 14.07.20 (добавление карт)
if ($data['operation'] == 'add_card') {
    add_card($data['numb_card'], $data['block_type'], $data['shord_code'], $data['tz']);
}

// 15.07.20 (отображение лога на стороне клиента)
if ($data['operation'] == 'get_events') {
    get_events();
}

// 16.07.20 (добавление событий)
if ($data['operation'] == 'new_event') {
    add_event($_POST['action'], $_POST['date']);
}

// 16.07.20 (Генерация кр кода с токеном по нажанию кнопки) 
if ($data['operation'] == 'add_token') {
    add_token($data['token'], $data['user_id']);
}

if ($data['operation'] == 'remove_token') {
    remove_token($data['token']);
}

if ($data['operation'] == 'add_device') {
    add_device_by_token($data['token'], $data['device_id'], $data['device_type'], $data['device_mac']);
}






// 18.07.20 - ПОЛЬЗОТВАТЕЛИ
if ($data['operation'] == 'get_users') {
    get_users();
}

if ($data['operation'] == 'get_user') {
    get_user($data['user_id']);
}

if ($data['operation'] == 'add_user') {
    add_user($data['username'], $data['login'], $data['password'], $data['access']);
}

if ($data['operation'] == 'del_user') {
    del_user($data['user_id']);
}