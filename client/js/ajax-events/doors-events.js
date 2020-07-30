// 16.07.20 (добавление событий)
// односторонняя дверь
$('#open-oneside-door-btn').on('click', function(event) {
    // var current_date = new Date()    
    // $.ajax({
    //     type: "POST",
    //     url: '/server/api.php',
    //     dataType: 'json',
    //     contentType: 'application/json',
    //     data: JSON.stringify({
    //         'operation': 'action',
    //         'action': 'открытие',
    //         'source_type': 'оператор',
    //         'source_name': get_current_user().username,
    //         'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
    //     })
    // })
    action('открытие', 'оператор', get_current_user().username)
}) 
$('#close-oneside-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'закрытие',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':')
        })
    })
})
$('#unlock-oneside-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'разблокирование',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#lock-oneside-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'заблокирование',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})




// Двусторонняя дверь
$('#open-twoside-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'открытие',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#unlock-twoside-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'разблокирование',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#close-twoside-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'закрытие',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#lock-twoside-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'заблокирование',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})





// Турникет вход
$('#open-wicketentry-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'открытие',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#unlock-wicketentry-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'разблокирование',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#close-wicketentry-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'закрытие',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#lock-wicketentry-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'заблокирование',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
// Турникет выход
$('#open-wicketexit-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'открытие',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#unlock-wicketexit-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'разблокирование',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#close-wicketexit-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'закрытие',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#lock-wicketexit-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'заблокирование',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})




// Распашной турникет вход
$('#open-swingenry-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'открытие',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#unlock-swingenty-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'разблокирование',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#close-swingentry-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'закрытие',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#lock-swingentry-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'заблокирование',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})




// Распашной турникет выход
$('#open-swingexit-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'открытие',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#unlock-swingexit-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'разблокирование',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#close-swingexit-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'закрытие',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})
$('#lock-swingexit-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'action',
            'action': 'заблокирование',
            'source_type': 'оператор',
            'source_name': get_current_user().username,
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})



$('#test_event').on('click', function(event) {
    var test_events = ['закрытие | охранник Петя', 'Взлом']
    var source = ['охранник', 'устройство']
    var current_date = new Date()
    
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
            'operation': 'new_event',
            'action': test_events[Math.floor(Math.random() * test_events.length)],
            'source_type': 'устройство',
            'source_name': 'устройство',
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})