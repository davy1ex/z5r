// ##### ПОЛЬВЗОВАТЕЛИ ###### (18.07.20)
$('#add-user-btn').on('click', function () { // добавляет пользователя
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation':    'add_user',
            'username':     $('#username').val(),
            'login':        $('#login').val(),
            'password':     $('#password').val(),
            'access':       $('#access').val()
        }),
        success: function(response) {
            take_users()
        }
    })    
})