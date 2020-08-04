console.log('таблицы расписаний загружены')
function show_work_schedules_table() {
    var perrow = 1,
    html = 
    '<table>\
        <thead>\
            <tr>\
                <th scope="col">Название</th>\
                <th scope="col">Действия</th>\
            </tr>\
        </thead>\
        <tbody>\
        <tr>';
    var work_schedule_list = get_all_work_schedules().work_schedule
    
    console.log(work_schedule_list)

    $.each(work_schedule_list, function(i, item) {
        // html += '<td data-label="Начало">' + item.start_time + '</td>'
        // html += '<td data-label="Конец">' + item.end_time + '</td>'
        html += '<td data-label="Название">' + item.title + '</td>'
        html += '<td data-label="Действия">' + '<button id=' + String(item.id) + ' class="del-work-schedule-btn"><img src="/client/img/remove.png"></button></td>'
        
        var next = i+1;
        if (next%perrow==0 && next!=work_schedule_list.length) {
            // html += "</tr><tr>";
            html += "</tr>";
        }
    })
    html += '</tr></tbody></table>'

    $('#work-schedules-table').html(html)
}