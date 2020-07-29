// function create_request(method, params=null) {
//     // создаёт шаблон запроса клиента
//     var current_date = new Date()
//     response = {
//         'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
//         'messages': [
            
//         ]
//     }

//     return response
// }

function get_current_user() {
    var current_user = function() { 
        var tmp = null
        $.ajax({
            async: false,
            type: "POST",
            global: false,
            url: '/server/api.php',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                'operation': 'current_user'
            }),

            success: function(response) {
                tmp = response.user
            }
            
        })
        return tmp
    }()
    return current_user
}


function get_settings_access() {
    var settings = function() { 
        var tmp = null
        $.ajax({
            async: false,
            type: "POST",
            global: false,
            url: '/server/api.php',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                'operation': 'get_settings_access'
            }),

            success: function(response) {
                tmp = response.settings
            }
            
        })
        return tmp
    }()
    return settings
}


function set_mode(mode) { 
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'set_mode',
            'mode': mode
        })        
    })
}

function set_point_type(point_type) { 
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'set_point_type',
            'point_type': point_type
        })        
    })
}

function set_active(active) {
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'set_active',
            'active': active
        })        
    })   
}