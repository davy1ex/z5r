function show_work_schedules_table(work_schedules) {
    var work_schedule_list = work_schedules.work_schedule
    var html = ""
    $.each(work_schedule_list, function(i, item) {
        html += 
        '<table>\
            <thead>\
                <tr>\
                    <th scope="col">Название</th>'
                    

                    $.each(JSON.parse(item.work_days).days, function(i, day) {
                        html += '<th scope="col">' + day.day + '</th>'
                    })
                    html += 
                    '<th scope="col">Действия</th>\
                </tr>\
            </thead>\
            <tbody>\
            <tr>';
            var title = item.title
            html += '<td data-label="Название">' + title + '</td>'
            var work_schedule_id = item.id
            $.each(JSON.parse(item.work_days).days, function(i, day) {
                if (day.schedule.length > 0) {
                    var day_label = day.day
                    html += '<td data-label=' + day_label + '>'
                    $.each(day.schedule, function (i, schedule) {
                        html += schedule.start_time + '-' + schedule.end_time + '<br>'
                    })
                    html += '</td>'
                } 
                
                else {
                    html += '<td data-label=' + day_label +'>-</td>'
                }

                
            })
            html += '<td data-label="Действия">' + '<button id=' + String(work_schedule_id) + ' class="del-work-schedule-btn"><img src="/client/img/remove.png"></button></td>'
            html += '</tr></tbody></table>'
    })
    
    $('#work-schedules-table').html(html)    

    $('.del-work-schedule-btn').on('click', function(event) {
        if (confirm('Вы действительно хотите удалить это время?')) {
            del_work_schedule(this.id)
            take_work_schedules()
        }
    })
}


function take_work_schedules() { // получает массив карт с сервера    
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',            
        
        data: JSON.stringify({
            'operation': 'get_work_schedules'
        }),
        
        success: function (response) {
            var jsonData = response
            show_work_schedules_table(jsonData)
        }
    })
} 