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

    // console.log(JSON.parse(JSON.stringify(response)))
    window.location.href = "/server/api.php?operation=set_active&mode=1"
    $.get(
        "/server/api.php",
        {operation: 'set_active', mode: '1'},
        
        
        // console.log('success')
        
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
$('#auth').submit(function (event) { // авторизация: Создаёт куки login=root    
    var $form = $( this ),
    login = $form.find( "input[name='login']" ).val(),
    password = $form.find( "input[name='password']" ).val();
        
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        data: {'operation': 'login', 'login': login, 'password': password},
        
        success: function(response) {
            var jsonData = JSON.parse(response);
            
            if (jsonData.success == "1") {
                setCookie('login', 'root', {'max-age': 3600})
            }
        }
    })
})


$('.log_out').on('click', function () { // выход: удаляет куки login=root
    deleteCookie('login')
})
// ########## АВТОРИЗАЦИЯ ##########










// 14.07.20 (добавление карт)
// ########## КАРТЫ ##########
$('.add_btn').on('click', function () { // добавляет карту
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        data: {
            'operation':    'add_card',
            'numb_card':    $('#numb_card').val(),
            'block_type':   $('#cbk1').is(':checked') == true ? 1 : 0,
            'shord_code':   $('#cbk2').is(':checked') == true ? 1 : 0, 
            'tz':           $('#card_tz').val()
        },
        success: function(response) {
            // window.location = '/'
            take_cards()
        }
    })
    
})


$('#del_all_cards').on('click', function(event) {
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        data: {
            'operation': 'del_all_cards'            
        },

        success: function(response) {
            take_cards()
        }
    })
})
// ########## КАРТЫ ##########



// 16.07.20 (добавление событий)
$('#open-oneside-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        data: {
            'operation': 'new_event',
            'action': 'открытие',
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        }
    })
}) 


$('#close-oneside-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        data: {
            'operation': 'new_event',
            'action': 'закрытие',
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        }
    })
}) 


$('#unlock-oneside-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        data: {
            'operation': 'new_event',
            'action': 'разблокирование',
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        }
    })
})


$('#lock-oneside-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        data: {
            'operation': 'new_event',
            'action': 'заблокирование',
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        }
    })
})






// 16.07.20 (QR CODES)
// Генерация кр кода с токеном по нажанию кнопки:
function generate_token() {
    return Math.random().toString(36).substr(2);
}


$('#generate_qr_token').on('click', function() {
    var token = generate_token()
    $('.qr-code-field').append('<div id="qrcode" style="margin: 40px"></div>')
	var qrcode = new QRCode(document.getElementById("qrcode"), {
		text: "gg",
		width: 128,
		height: 128,
		colorDark : "#35B0FF",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
	})
		
    qrcode.makeCode(token); // make another code.
    console.log('token-qr-code crated')
    
    $.ajax({
        type: "POST",
        url: '/server/api.php',

        data: {
            'operation': 'add_token',
            'token': token
        }
    })

    console.log('token added to db')

    setTimeout(function () {remove_token()}, 30000)

    function remove_token() {
        $.ajax({
            type: 'POST',
            url: '/server/api.php',
            data: {'operation': 'remove_token', 'token': token}
        })
        console.log('token removed from db')
        qrcode.clear()
        $('#qrcode').remove()
        console.log('token-qr-code removed')
    }
})