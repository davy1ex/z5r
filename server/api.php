<?php
include_once ('functions.php');
include_once ('methods.php');
session_start();


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

if ($data['operation'] == 'login') {
    check_usr($data['login'], $data['password']);
}

if ($data['operation'] == 'logout') {
    session_destroy();
}

if ($data['operation'] == 'get_session') {
    header("HTTP/1.1 200 Content-type: application/json ");
    echo json_encode([
        'success'=> true, 
        'login' => $_SESSION['login'], 
        'access' => $_SESSION['access']
    ]);
}

// if ($_POST['operation'] == 'login') {;
//     check_usr($_POST['login'], $_POST['password']);
// }


// кинуть все карты
if ($data['operation'] == 'get_cards'){
    get_cards();
}

if ($data['operation'] == 'get_card') {
    get_card($data['card_id']);
}

if ($data['operation'] == 'get_card_by_card_numb') {
    get_card_by_card_numb($data['card_numb']);
}

if ($data['operation'] == 'del_card') {
    del_card($data['card_id']);
}

if ($data['operation'] == 'del_all_cards') {
    del_all_cards();
}

// 14.07.20 (добавление карт)
if ($data['operation'] == 'add_card') {
    add_card($data['numb_card'], $data['operator_name'], $data['block_type'], $data['shord_code'], $data['tz']);
}

// 15.07.20 (отображение лога на стороне клиента)
if ($data['operation'] == 'get_events') {
    get_events();
}

// 16.07.20 (добавление событий)
if ($data['operation'] == 'new_event') {
    add_event($data['action'], $data['date'], $data['source_type'], $data['source_name']);
}

if ($data['operation'] == 'action') {
    add_event($data['action'], $data['date'], $data['source_type'], $data['source_name']);
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

if ($data['operation'] == 'current_user') {
    current_user();
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

if ($data['operation'] == 'del_all_users') {
    del_all_users();
}


// 27.07.20 - ПРОШИВКИ
if ($data['operation'] == 'put_config') {
    put_config($data['filename']);
}

if ($data['operation'] == 'get_settings_access') {
    get_settings_access();
}

if ($data['operation'] == 'set_mode') {
    set_mode((int)$data['mode']);
}

if ($data['operation'] == 'set_point_type') {
    set_point_type((int)$data['point_type']);
}

if ($data['operation'] == 'set_active') {
    set_active((int)$data['active']);
}


if ($data['operation'] == 'import_config') {
    import_config($data['filename']);
}

if ($data['operation'] == 'get_all_work_times') {
    get_all_work_times();
}


if ($data['operation'] == 'add_work_time') {
    add_work_time($data['start_time'], $data['end_time'], $data['title']);
}

if ($data['operation'] == 'del_work_time') {
    del_work_time($data['work_time_id']);
}



// WORK SHEDUELS
if ($data['operation'] == 'get_work_schedules') {
    get_work_schedules();
}