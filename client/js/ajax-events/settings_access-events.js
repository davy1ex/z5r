$('#option-one').click(function () {
    set_mode(1)
})

$('#option-two').click(function () {
    set_mode(2)
})

$('#option-three').click(function () {
    set_mode(3)
})

$('#option-four').click(function () {
    set_mode(4)
})


$('#option-one-door').click(function () {
    set_point_type(1)
})

$('#option-two-door').click(function () {
    set_point_type(2)
})

$('#option-three-tab').click(function () {
    set_point_type(3)
})

$('#option-four-tab').click(function () {
    set_point_type(4)
})





$('#set_active').click(function () {
    if($(this).is(":checked")) {
        set_active(1)
    } else {
        set_active(0)
    }
})

$('#clear-config-btn').click(function() {
    if (confirm('Вы уверены, что хотите очистить конфигурацию контроллера?')) {
        clear_cards()
        clear_users()    

        set_mode(0)
        set_point_type(0)
        set_active(0)


        location.reload()
    }
})

$('#clear-events-btn').click(function() {
    if (confirm('Вы уверены, что хотите очистить журнал событий?')) {
        clear_events()
        location.reload()
    }
})