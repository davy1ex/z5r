// 16.07.20 (добавление событий)
// односторонняя дверь
$('#open-oneside-door-btn').on('click', function(event) {
    action('открытие', 'оператор', get_current_user().username)
}) 

$('#close-oneside-door-btn').on('click', function(event) {
    action('закрытие', 'оператор', get_current_user().username)
})
$('#unlock-oneside-door-btn').on('click', function(event) {
    action('разблокирование', 'оператор', get_current_user().username)
})
$('#lock-oneside-door-btn').on('click', function(event) {
    action('заблокирование', 'оператор', get_current_user().username)
})




// Двусторонняя дверь
$('#open-twoside-door-btn').on('click', function(event) {
    action('открытие', 'оператор', get_current_user().username)
})
$('#unlock-twoside-door-btn').on('click', function(event) {
    action('разблокирование', 'оператор', get_current_user().username)
})
$('#close-twoside-door-btn').on('click', function(event) {
    action('закрытие', 'оператор', get_current_user().username)
})
$('#lock-twoside-door-btn').on('click', function(event) {
    action('заблокирование', 'оператор', get_current_user().username)
})





// Турникет вход
$('#open-wicketentry-btn').on('click', function(event) {
    action('открытие', 'оператор', get_current_user().username)
})
$('#unlock-wicketentry-btn').on('click', function(event) {
    action('разблокирование', 'оператор', get_current_user().username)
})
$('#close-wicketentry-btn').on('click', function(event) {
    action('закрытие', 'оператор', get_current_user().username)
})
$('#lock-wicketentry-btn').on('click', function(event) {
    action('заблокирование', 'оператор', get_current_user().username)
})
// Турникет выход
$('#open-wicketexit-btn').on('click', function(event) {
    action('открытие', 'оператор', get_current_user().username)
})
$('#unlock-wicketexit-btn').on('click', function(event) {
    action('разблокирование', 'оператор', get_current_user().username)
})
$('#close-wicketexit-btn').on('click', function(event) {
    action('закрытие', 'оператор', get_current_user().username)
})
$('#lock-wicketexit-btn').on('click', function(event) {
    action('заблокирование', 'оператор', get_current_user().username)
})




// Распашной турникет вход
$('#open-swingenry-door-btn').on('click', function(event) {
    action('открытие', 'оператор', get_current_user().username)
})
$('#unlock-swingenty-door-btn').on('click', function(event) {
    action('разблокирование', 'оператор', get_current_user().username)
})
$('#close-swingentry-door-btn').on('click', function(event) {
    action('закрытие', 'оператор', get_current_user().username)
})
$('#lock-swingentry-door-btn').on('click', function(event) {
    action('заблокирование', 'оператор', get_current_user().username)
})




// Распашной турникет выход
$('#open-swingexit-door-btn').on('click', function(event) {
    action('открытие', 'оператор', get_current_user().username)
})
$('#unlock-swingexit-door-btn').on('click', function(event) {
    action('разблокирование', 'оператор', get_current_user().username)
})
$('#close-swingexit-door-btn').on('click', function(event) {
    action('закрытие', 'оператор', get_current_user().username)
})
$('#lock-swingexit-door-btn').on('click', function(event) {
    action('заблокирование', 'оператор', get_current_user().username)
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