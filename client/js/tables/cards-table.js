// 14.07.20 (добавление карт)
// ########## КАРТЫ ##########
function get_cards_table(cards_list) { // рисует таблицу с картами
    var perrow = 1, // 2 cells per row
            html =
    '<table>\
        <thead>\
            <tr>\
                <th scope="col">Номер карты</th>\
                <th scope="col">Блокирующая карта</th>\
                <th scope="col">Короткий код карты</th>\
                <th scope="col">tz</th>\
                <th scope="col">Удаление</th>\
            </tr>\
        </thead>\
        <tr>';

        // Loop through array and add table cells
        $.each(cards_list, function(i, item) {
            if(parseInt(item.block_type) == true) {
                block_type =
                    '<span class="checkmark">\
                        <div class="checkmark_stem"></div>\
                        <div class="checkmark_kick"></div>\
                    </span>'
            }

            else {
                block_type = '<span class="close">×</span>'
            }

            if(parseInt(item.shord_code)) {
                shord_code =
                '<span class="checkmark">\
                    <div class="checkmark_stem"></div>\
                    <div class="checkmark_kick"></div>\
                </span>'
            }

            else {
                shord_code = '<span class="close">×</span>'
            }

            html += "<td data-label='Card number'>" + item.card + "</td>";
            html += "<td data-label='Blocking card'>" + block_type + "</td>";
            html += "<td data-label='Short code card'>" + shord_code + "</td>";
            html += "<td data-label='tz'>" + item.tz + "</td>";
            // html += "<td data-label='Del'>" + '<button id=' + item.id + ' class="del_btn">Удалить</button>' + "</td>";
            html  += '<td>'
             + '<button id=' + String(item.id) + ' class="edit-card-btn">'
                 + '<img class=" qr-code-icon" src="/client/img/edit.png" alt=""></img>' + '</button>'
             + '<button id=' + String(item.id) + ' class="del_btn"><img src="/client/img/remove.png"></button></td>'

            var next = i+1;
            if (next%perrow==0 && next!=cards_list.length) {
                html += "</tr><tr>";
            }
            
        })

    html += "</tr></table>";
    
    $('.cards-table').html(html)

    $('.edit-card-btn').on('click', function() {
        $.ajax({
            type: "POST",
            url: '/server/api.php',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({'operation': 'get_card', 'card_id': this.id}),

            success: function(response) {
                console.log(response.card)
                $('#numb_card').val(response.card.card)
                $('#cbk1').val(response.card.block_type)
                $('#cbk2').val(response.card.shord_code)
                $('#card_tz').val(response.card.tz)
            }
        })
    })

    $('.del_btn').on('click', function() { //удаляет карту
        console.log(this.id)
        if (confirm('Are you sure you want to save this thing into the database?')) {
            $.ajax({
                type: "POST",
                url: '/server/api.php',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({'operation': 'del_card', 'card_id': this.id}),

                success: function(response) {
                    take_cards()
                }
            })
          } else {
            // Do nothing!
            console.log('Thing was not saved to the database.');
          }
        
    })
}


function take_cards() { // получает массив карт с сервера    
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        
        dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
            'operation': 'get_cards'
        }),
        
        success: function (response) {
            var jsonData = response
            get_cards_table(jsonData.cards)
        }
    })
}