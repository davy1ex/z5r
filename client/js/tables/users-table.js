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
            // html += '<td>' + </td>'
            html += '<td>' + '<button id=' + String(item.id) + ' class="edit-usr-btn">' + '<img class=" qr-code-icon" src="/client/img/edit.png" alt=""></img>' + '</button>' +'<button id=' + String(item.id) + ' class="del-usr-btn"><img src="/client/img/remove.png"></button>' + '<button id= ' + String(item.id) + ' class="generate_qr_token">\
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

    $('.edit-usr-btn').on('click', function() {
        $.ajax({
            type: "POST",
            url: '/server/api.php',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({'operation': 'get_user', 'user_id': this.id}),

            success: function(response) {
                $('#username').val(response.user.username)
                $('#login').val(response.user.login)
                $('#password').val(response.user.password)
                $('#access').val(response.user.access)
            }
        })
    })

    // 16.07.20 (QR CODES)
    // Генерация кр кода с токеном по нажанию кнопки:
    function generate_token() { // возвращает рандомный набор символов (8 штук)
        return Math.random().toString(36).substr(2);
    }

    $('.generate_qr_token').on('click', function() { // Отображает кр-код с токеном и добавляет его в бд
        var token = generate_token()
        var token_data = {"ApiAddress":"http://z5r.000webhostapp.com/server/api.php","Token": token}
        var user_id = this.id
        console.log(user_id)
        console.log(token_data)
        $('.qr-code-field').append('<div id="qrcode" style="margin: 40px"></div>')
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: "gg",
            width: 128,
            height: 128,
            // 35B0FF
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        })
            
        qrcode.makeCode(JSON.stringify(token_data)); // make another code.
        console.log('token-qr-code created')
        
        $.ajax({
            type: "POST",
            url: '/server/api.php',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                'operation': 'add_token',
                'token': token,
                'user_id': user_id
            })
        })

        console.log('token added to db')

        setTimeout(function () {remove_token()}, 30000) // через 30 секунд убирает отображающийся кр-код и удаляет токен из бд

        function remove_token() {
            $.ajax({
                type: 'POST',
                url: '/server/api.php',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({'operation': 'remove_token', 'token': token})
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
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({'operation': 'del_user', 'user_id': this.id}),
                    
            success: function(response) {
                take_users()
            }
        })
    })

}


function take_users() { // получает массив карт с сервера    
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',            
        
        data: JSON.stringify({
            'operation': 'get_users'
        }),
        
        success: function (response) {
            var jsonData = response
            get_users_table(jsonData.users)
        }
    })
}