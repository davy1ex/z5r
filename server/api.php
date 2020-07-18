<?php
include_once ('functions.php');
include_once ('methods.php');



$data = json_decode(file_get_contents('php://input'), true);

if ($data['operation'] == 'power_on') {
    header("HTTP/1.1 200 Content-type: application/json ");
    exit(json_encode(power_on($data['active'], $data['mode'])));
}


if ($_GET['operation'] == 'set_active') {
    if (power_on($_GET['active'], $_GET['mode'])) {
        print_r([
            'id'        => 123456789,
            'success'   => 1
        ]);
    }
}


if ($_POST['operation'] == 'login') {;
    check_usr($_POST['login'], $_POST['password']);
}


// кинуть все карты
if ($_POST['operation'] == 'get_cards'){
    get_cards();
}

if ($_POST['operation'] == 'del_card') {
    del_card($_POST['card_id']);
}

if ($_POST['operation'] == 'del_all_cards') {
    del_all_cards();
}

// 14.07.20 (добавление карт)
if ($_POST['operation'] == 'add_card') {
    add_card($_POST['numb_card'], $_POST['block_type'], $_POST['shord_code'], $_POST['tz']);
}

// 15.07.20 (отображение лога на стороне клиента)
if ($_POST['operation'] == 'get_events') {
    get_events();
}

// 16.07.20 (добавление событий)
if ($_POST['operation'] == 'new_event') {
    add_event($_POST['action'], $_POST['date']);
}

// 16.07.20 (Генерация кр кода с токеном по нажанию кнопки) 
if ($_POST['operation'] == 'add_token') {
    add_token($_POST['token']);
}

if ($_POST['operation'] == 'remove_token') {
    remove_token($_POST['token']);
}

$data = json_decode(file_get_contents('php://input'), true);
if ($data['operation'] == 'add_device') {
    add_device_by_token($data['token']);
}






// 18.07.20 - ПОЛЬЗОТВАТЕЛИ
if ($_POST['operation'] == 'get_users') {
    get_users();
}

if ($_POST['operation'] == 'add_user') {
    add_user($_POST['username'], $_POST['login'], $_POST['password'], $_POST['access']);
}

if ($_POST['operation'] == 'del_user') {
    del_user($_POST['user_id']);
}