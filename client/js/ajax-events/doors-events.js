// 16.07.20 (добавление событий)
$('#open-oneside-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'new_event',
            'action': 'открытие',
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
}) 


$('#close-oneside-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        data: {
            'operation': 'new_event',
            'action': 'закрытие',
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        }
    })
}) 


$('#unlock-oneside-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        data: {
            'operation': 'new_event',
            'action': 'разблокирование',
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        }
    })
})


$('#lock-oneside-door-btn').on('click', function(event) {
    var current_date = new Date()
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        data: {
            'operation': 'new_event',
            'action': 'заблокирование',
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        }
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
            'source': source[Math.floor(Math.random() * source.length)],
            'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        })
    })
})