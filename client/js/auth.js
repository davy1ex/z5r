// 12.07.20 (авторизация)
// ########## АВТОРИЗАЦИЯ ##########
$('#log_in').on('click', function (event) { // авторизация: Создаёт куки login=root    
    // var $form = $( this ),
    // login = $form.find( "input[name='login']" ).val(),
    // password = $form.find( "input[name='password']" ).val();
    var login = $('#auth_login').val()
    var password = $('#auth_password').val()

    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({'operation': 'login', 'login': login, 'password': password}),
        
        success: function(response) {            
            if (response.success) {
                alert('u loginned')
                
                // setCookie('login', 'root')
                // setCookie('access', response.access)
                location.reload()
            }
            
            else {
                alert('try again')        
            }
        }
    })
})

$('.log_out').on('click', function () { // выход: удаляет куки login=root
    // deleteCookie('login')
    // deleteCookie('access')
    // window.location.href = '/client/index.html?#'
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({'operation': 'logout'}),
        
        success: function(response) {            
            if (response.success) {
                alert('u disloginned')
                
                // setCookie('login', 'root')
                // setCookie('access', response.access)
                location.reload()
            }
            
            else {
                alert('try again')        
            }
        }
    })
})