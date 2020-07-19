function get_cards_table(cards_list) { // рисует таблицу с картами
    var perrow = 1, // 2 cells per row
            html =
    '<table>\
        <thead>\
            <tr>\
                <th scope="col">Номер карты</th>\
                <th scope="col">Блокирующая карта</th>\
                <th scope="col">Короткий код карты</th>\
                <th scope="col">tz</th>\
                <th scope="col">Удаление</th>\
            </tr>\
        </thead>\
        <tr>';

        // Loop through array and add table cells
        $.each(cards_list, function(i, item) {
            if(parseInt(item.block_type) == true) {
                block_type =
                    '<span class="checkmark">\
                        <div class="checkmark_stem"></div>\
                        <div class="checkmark_kick"></div>\
                    </span>'
            }

            else {
                block_type = '<span class="close">×</span>'
            }

            if(parseInt(item.shord_code)) {
                shord_code =
                '<span class="checkmark">\
                    <div class="checkmark_stem"></div>\
                    <div class="checkmark_kick"></div>\
                </span>'
            }

            else {
                shord_code = '<span class="close">×</span>'
            }

            html += "<td data-label='Card number'>" + item.card + "</td>";
            html += "<td data-label='Blocking card'>" + block_type + "</td>";
            html += "<td data-label='Short code card'>" + shord_code + "</td>";
            html += "<td data-label='tz'>" + item.tz + "</td>";
            html += "<td data-label='Del'>" + '<button id=' + item.id + ' class="del_btn">Удалить</button>' + "</td>";

            var next = i+1;
            if (next%perrow==0 && next!=cards_list.length) {
                html += "</tr><tr>";
            }
            
        })

    html += "</tr></table>";
    
    $('.cards-table').html(html)
    $('.del_btn').on('click', function() { //удаляет карту
        console.log(this.id)
        
        $.ajax({
            type: "POST",
            url: '/server/api.php',
            data: {'operation': 'del_card', 'card_id': this.id},
                    
            success: function(response) {
                // window.location = '/'
                take_cards()
            }
        })
    })
}


function take_cards() { // получает массив карт с сервера    
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        
        data: {
            'operation': 'get_cards'
        },
        
        success: function (response) {
            var jsonData = JSON.parse(response)
            get_cards_table(jsonData.cards)
        }
    })
}

// 15.07.20 (отображение лога на стороне клиента)
function create_events_table() {
    console.log('event table created/updated')
    $.ajax({
        type: "POST",
        url: '/server/api.php',

        data: {
            'operation': 'get_events'
        },

        success: function (response) {
            var events_list = JSON.parse(response).events
            var perrow = 1,
            html = 
            '<table>\
                <caption>События</caption>\
                <thead>\
                    <tr>\
                        <th scope="col">Дата и время</th>\
                        <th scope="col">Источник</th>\
                    </tr>\
                </thead>\
                <tr>';

            $.each(events_list, function(i, item) {
                html += '<td data-label="Дата и время">' + item.date + '</td>'
                html += '<td data-label="Истоник">' + item.action + '</td>'

                var next = i+1;
                if (next%perrow==0 && next!=events_list.length) {
                    html += "</tr><tr>";
                }
            })
            
            html += "</tr></table>";
            $('#events-table').html(html)
        }
    })
}


// ##### ПОЛЬВЗОВАТЕЛИ ###### (18.07.20)
function get_users_table(users_list) { // рисует таблицу с пользователями
    var perrow = 1, // 2 cells per row
            html =
    '<table>\
        <thead>\
            <tr>\
                <th scope="col">Имя пользователя</th>\
                <th scope="col">Тип учетной записи</th>\
                <th scope="col">ID</th>\
                <th scope="col">Устройство</th>\
                <th scope="col">MAC-адрес</th>\
                <th scope="col">Действия</th>\
            </tr>\
        </thead>\
        <tr>';

        

        // Loop through array and add table cells
        $.each(users_list, function(i, item) {
            // русификация уровня доступа
            if (item.access == 'admin') {
                var access = 'Админ'
            }    
            else if (item.access == 'guard') {
                var access = 'Охранник'
            }    
            else if (item.access == 'main_guard') {
                var access = 'Начальник службы безопасности'
            }

            html += '<td data-label="Пользователь">' + item.username + "</td>";
            html += '<td data-label="Тип учетной записи">' + access + "</td>";
            html += '<td data-label="ID">' + item.device_id + "</td>";
            html += '<td data-label="Устройство">' + item.device_type + "</td>";
            html += '<td data-label="MAC-адрес">' + item.device_mac + "</td>";
            html += '<td>' + '<button id=' + String(item.id) + ' class="del_btn del-usr-btn">Удалить</button>' + '<button id= ' + String(item.id) + ' class="generate_qr_token">\
                <span class="tooltip_2">\
                    <img class=" qr-code-icon" src="/client/img/qr-code-icon.png" alt="">\
                    <span class="tooltip-text">Привязать устройство</span>\
                </span>\
            </button>' + '</td>'




            var next = i+1;
            if (next%perrow==0 && next!=users_list.length) {
                html += "</tr><tr>";
            }
            
        })

    html += "</tr></table>";
    
    $('#users-table').html(html)

    // 16.07.20 (QR CODES)
    // Генерация кр кода с токеном по нажанию кнопки:
    function generate_token() {
        return Math.random().toString(36).substr(2);
    }

    $('.generate_qr_token').on('click', function() {
        var token = generate_token()
        console.log(token)
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
    $('.del-usr-btn').on('click', function() { //удаляет карту
        console.log(this.id)
        
        $.ajax({
            type: "POST",
            url: '/server/api.php',
            data: {'operation': 'del_user', 'user_id': this.id},
                    
            success: function(response) {
                // window.location = '/'
                take_users()
            }
        })
    })

}


function take_users() { // получает массив карт с сервера    
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        
        data: {
            'operation': 'get_users'
        },
        
        success: function (response) {
            var jsonData = JSON.parse(response)
            get_users_table(jsonData.users)
        }
    })
}
// ##### ПОЛЬЗОВАТЕЛИ #####


$(document).ready(function(){
    setInterval(create_events_table, 20000);
});

create_events_table() // рисует таблицу с эвентами
take_cards() // рисует таблицу с картами
take_users() // рисует таблицу с пользователями