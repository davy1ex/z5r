<?php
include_once ('functions.php');
include_once ('methods.php');






if ($_GET['operation'] == 'power_on') {
    if (power_on($_GET['active'], $_GET['mode'])) {
        print_r([
            'id'        => 123456789,
            'success'   => 1
        ]);
    }
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