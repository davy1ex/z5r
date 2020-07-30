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

function add_user(username, login, password, access) {
    var response = function() {
        var tmp = null
        $.ajax({
            async: false,
            type: "POST",
            global: false,
            url: '/server/api.php',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                'operation':    'add_user',
                'username':     username,
                'login':        login,
                'password':     password,
                'access':       access
            }),
            success: function(response) {
                tmp = response
            }
        })
        return tmp  
    }()

    return response
}

function get_user(user_id) {
    var user = function() { 
        var tmp = null
        $.ajax({
            async: false,
            type: "POST",
            global: false,
            url: '/server/api.php',
            dataType: 'json',
            contentType: 'application/json',
            
            data: JSON.stringify({
                'operation': 'get_user',
                'user_id': user_id
            }),

            success: function(response) {
                tmp = response.user
            }
            
        })
        return tmp
    }()
    return user
}


function clear_users() {
    $.ajax({
        type: "POST",
        async: false,
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'del_all_users'            
        })
    })
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


function add_card(numb_card, block_type, shord_code, tz) {
    var response = function () {
        var tmp = null
        $.ajax({
            type: "POST",
            async: false,
            global: false,
            url: '/server/api.php',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                'operation':    'add_card',
                'numb_card':    numb_card,
                'block_type':   block_type,  // 1 or 0
                'shord_code':   shord_code,  // 1 or 0
                'tz':           tz
            }),
            success: function(response) {
                tmp = response
            }
        })
        return tmp
    }()
    return response
}

function get_card_by_card_numb(card_numb) {
    var response = function () {
        var tmp = null
        $.ajax({
            type: "POST",
            async: false,
            global: false,
            url: '/server/api.php',
            dataType: 'json',
            contentType: 'application/json',
            
            data: JSON.stringify({
                'operation':    'get_card_by_card_numb',
                'card_numb':    card_numb
            }),
            
            success: function(response) {
                tmp = response
            }
        })
        return tmp
    }()
    return response
}

function clear_cards() {
    $.ajax({
        type: "POST",
        async: false,
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'del_all_cards'            
        })
    })
}

function action(action_name, souce_type, source_name) {
    var current_date = new Date()    
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': action_name,
            'source_type': souce_type,
            'source_name': source_name,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
}