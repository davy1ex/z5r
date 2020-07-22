// 15.07.20 (отображение лога на стороне клиента)
function create_events_table() {
    console.log('event table created/updated')
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            'operation': 'get_events'
        }),

        success: function (response) {
            events_list = response.events
            
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