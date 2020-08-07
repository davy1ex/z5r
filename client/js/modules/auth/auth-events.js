// 12.07.20 (авторизация)
// ########## АВТОРИЗАЦИЯ ##########
$('#auth').submit(function (event) { // авторизация: Создаёт куки login=root    
    var $form = $( this ),
    login = $form.find( "input[name='login']" ).val(),
    password = $form.find( "input[name='password']" ).val();

    console.log(login)
    console.log(password)

    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({'operation': 'login', 'login': login, 'password': password}),
        
        success: function(response) {            
            if (response.success) {
                location.reload()
            }
            
            else {
                alert('try again')        
            }
        }
    })
})

$('.log_out').on('click', function () { // выход: удаляет куки login=root
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({'operation': 'logout'}),
        
        success: function(response) {            
            if (response.success) {
                location.reload()
            }
        }
    })
})