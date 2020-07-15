function get_cards_table(cards_list) { // рисует таблицу из массива с картами
    var perrow = 1, // 2 cells per row
            html = 
    '<table>\
        <thead>\
            <tr>\
                <th scope="col">Номер карты</th>\
                <th scope="col">Блокирующая карта</th>\
                <th scope="col">Коротокий код карты</th>\
                <th scope="col">tz</th>\
                <th scope="col">Удаление</th>\
            </tr>\
        </thead>\
        <tr>';

        // Loop through array and add table cells
        $.each(cards_list, function(i, item) {
            if(item.block_type) {
                block_type = 
                    '<span class="checkmark">\
                        <div class="checkmark_stem"></div>\
                        <div class="checkmark_kick"></div>\
                    </span>'
            }

            else {
                block_type = '<span class="close">×</span>'
            }

            if(item.shord_code) {
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
            html += "<td data-label='Del'>" + '<button id=' + item.id + ' class="del_btn">Удалить</button>' + "</td>";
                    
            var next = i+1;
            if (next%perrow==0 && next!=cards_list.length) {
                html += "</tr><tr>";
            }
            
        })
    
    html += "</tr></table>";
    $('.cards-table').html(html)
}


function take_cards() { // получает массив карт с сервера
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        
        data: {
            'operation': 'get_cards'
        },
        
        success: function (response) {
            var jsonData = JSON.parse(response)
            console.log(jsonData)
            get_cards_table(jsonData.cards)
        }
    })
}

take_cards()


// 15.07.20 (отображение лога на стороне клиента)
function create_events_table() {
    $.ajax({
        type: "POST",
        url: '/server/api.php',

        data: {
            'operation': 'get_events'
        },

        success: function (response) {
            var events_list = JSON.parse(response).events
            var perrow = 1,
            html = 
            '<table>\
                <caption>События</caption>\
                <thead>\
                    <tr>\
                        <th scope="col">Дата и время</th>\
                        <th scope="col">Источник</th>\
                    </tr>\
                </thead>\
                <tr>';

            $.each(events_list, function(i, item) {
                html += '<td data-label="Дата и время">' + item.date + '</td>'
                html += '<td data-label="Истоник">' + item.action + '</td>'

                var next = i+1;
                if (next%perrow==0 && next!=events_list.length) {
                    html += "</tr><tr>";
                }
            })
            
            html += "</tr></table>";
            $('#events-table').html(html)
        }
    })
}

create_events_table()