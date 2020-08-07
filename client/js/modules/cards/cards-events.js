// 14.07.20 (добавление карт)
// ########## КАРТЫ ##########
$('.add_btn').on('click', function () { // добавляет карту
    add_card(
        $('#numb_card').val(),
        $('#operator_name').val(),
        $('#cbk1').is(':checked') == true ? 1 : 0,
        $('#cbk2').is(':checked') == true ? 1 : 0, 
        $('#card_tz').val()
    )
    take_cards()
})


$('#del_all_cards').on('click', function(event) { // удаляет карту
    if (confirm('Are you sure you want to save this thing into the database?')) {
        clear_cards()
        take_cards()
    }
})