// 14.07.20 (добавление карт)
// ########## КАРТЫ ##########
$('.add_btn').on('click', function () { // добавляет карту
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        data: {
            'operation':    'add_card',
            'numb_card':    $('#numb_card').val(),
            'block_type':   $('#cbk1').is(':checked') == true ? 1 : 0,
            'shord_code':   $('#cbk2').is(':checked') == true ? 1 : 0, 
            'tz':           $('#card_tz').val()
        },
        success: function(response) {
            take_cards()
        }
    })
})


$('#del_all_cards').on('click', function(event) { // удаляет карту
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        data: {
            'operation': 'del_all_cards'            
        },

        success: function(response) {
            take_cards()
        }
    })
})