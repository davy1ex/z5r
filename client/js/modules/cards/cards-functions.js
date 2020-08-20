function add_card(numb_card, operator_name, block_type, shord_code, tz, work_schedule) {
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
                'operation':        'add_card',
                'numb_card':        numb_card,
                'operator_name':    operator_name,
                'block_type':       block_type,  // 1 or 0
                'shord_code':       shord_code,  // 1 or 0
                'tz':               tz,
                'work_schedule':    work_schedule
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



// 14.07.20 (добавление карт)
// ########## КАРТЫ ##########
function get_cards_table(cards_list) { // рисует таблицу с картами
    var perrow = 1, // 2 cells per row
            html =
    '<table>\
        <thead>\
            <tr>\
                <th scope="col">ФИО</th>\
                <th scope="col">Номер карты</th>\
                <th scope="col">Удаление</th>\
            </tr>\
        </thead>';
        

        // Loop through array and add table cells
        $.each(cards_list, function(i, item) {
            html += '<tr>'
            if(parseInt(item.block_type) == true) {
                block_type =
                    '<span class="checkmark">\
                        <div class="checkmark_stem"></div>\
                        <div class="checkmark_kick"></div>\
                    </span>'
            }

            else {
                block_type = '<span class="close">x</span>'
            }

            if(parseInt(item.shord_code)) {
                shord_code =
                '<span class="checkmark">\
                    <div class="checkmark_stem"></div>\
                    <div class="checkmark_kick"></div>\
                </span>'
            }

            else {
                shord_code = '<span class="close">x</span>'
            }

            html += "<td data-label='Operator name'>" + (item.operator_name == '' ? '-' : item.operator_name)  + "</td>";
            html += "<td data-label='Card number'>" + item.card + "</td>";
            html  += '<td>'
             + '<button id=' + String(item.id) + ' class="edit-card-btn">'
                 + '<img class=" qr-code-icon" src="/client/img/edit.png" alt=""></img>' + '</button>'
             + '<button id=' + String(item.id) + ' class="del_btn"><img src="/client/img/remove.png"></button></td>'

            var next = i+1;
            if (next%perrow==0 && next!=cards_list.length) {
                // html += "</tr><tr>";
                html += "</tr>";
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
                $('#operator_name').val(response.card.operator_name)
                $('#numb_card').val(response.card.card)
            }
        })
    })

    $('.del_btn').on('click', function() { //удаляет карту
        console.log(this.id)
        if (confirm('Вы уверены, что хотите удалить карту?')) {
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