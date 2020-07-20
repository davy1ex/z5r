function set_mode(mode) { // хз что это
    // возможные режимы: 0 - норма, 1 - блок, 2 - свободный проход, 3 - ожидание свободного прохода
    response = create_request()

    if ( !(mode in [0, 1, 2, 3]) ) {
        console.log('error')
    }

    response['messages'].push({
        'id': 2,
        'operation': 'set_mode',
        'mode': mode
    })

    console.log(JSON.parse(JSON.stringify(response)))
}


function set_active(active) { // хз что это
    response = create_request()

    response['messages'].push({
        'id': 3,
        'operation': 'set_active',
        'active': active,
        'online': 1 // переделать в праметр функции
    })

    window.location.href = "/server/api.php?operation=set_active&mode=1"
    $.get(
        "/server/api.php",
        {operation: 'set_active', mode: '1'}
    );
}


// навешиваются методы на элементы управления
$('.mode0').click(function() { // хз что это
    if ($(this).is(":checked")) {
        set_mode(0)
    }
})


$('#set_active').click(function(){ // хз что это
    if($(this).is(":checked")){  // checked
        set_active(1)
    }
    else if($(this).is(":not(:checked)")){ // unchecked
        set_active(0)
    }
});










// 12.07.20 (авторизация)
// ########## АВТОРИЗАЦИЯ ##########




// ########## АВТОРИЗАЦИЯ ##########










// 14.07.20 (добавление карт)
// ########## КАРТЫ ##########

// ########## КАРТЫ ##########



// 16.07.20 (добавление событий)





// # 18.07.20 - ПОЛЬЗОВАТЕЛИ
