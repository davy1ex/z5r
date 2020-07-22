// 12.07.20 (авторизация)
// ########## АВТОРИЗАЦИЯ ##########
$('#auth').submit(function (event) { // авторизация: Создаёт куки login=root    
    var $form = $( this ),
    login = $form.find( "input[name='login']" ).val(),
    password = $form.find( "input[name='password']" ).val();
        
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({'operation': 'login', 'login': login, 'password': password}),
        
        success: function(response) {            
            if (response.success) {
                setCookie('login', 'root', {'max-age': 3600})
                setCookie('access', response.access, {'max-age': 3600})
            }
            
            else {
                alert('try again')
            }
        }
    })
})

$('.log_out').on('click', function () { // выход: удаляет куки login=root
    deleteCookie('login')
    deleteCookie('access')
    window.location.href = '/client/index.html?#'
})