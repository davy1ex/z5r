// access = getCookie('access')
// console.log(access)

function create_session_data(login, access) {
    return {'login': login, 'access': access}
}

function get_session() {
    $.ajax({
        type: 'POST', 
        url: '/server/api.php', 
        dataType: 'json', 
        contentType: 'application/json', 
        data: JSON.stringify({'operation': 'get_session'}),
    
        success: function(response) {
            if (response.login != null) {
                // create_session_data(response.session.login, response.session.access)
                var access = response.access
                console.log(access)
                if (access === 'guard') {
                    $('#settings').remove()
                    $('#myBtn').remove()
                }
                
                if (access === 'main_guard') {
                    $('#add_device').remove()
                }

                take_cards()
                take_users()	
                create_events_table()

                $(document).ready(function(){
                    setInterval(create_events_table, 20000);
                });
            }

            else {
                console.log('u not loggined')
            }
        }
    })
}

get_session()
// var access = get_session()['access']
// console.log('access')

