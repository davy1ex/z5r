function get_work_schedules() {
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
                'operation':    'get_work_schedules'
            }),
            
            success: function(response) {
                tmp = response
            }
        })
        return tmp
    }()
    return response
}


function add_schedule(title, work_days, periodicity) {
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
                'operation':    'add_schedule',
                'title':        title,
                'work_days':    JSON.stringify(work_days),
                'periodicity':  periodicity
            }),
            
            success: function(response) {
                tmp = response
            }
        })
        return tmp
    }()
    return response
}

function del_work_schedule(work_schedule_id) { // удаляет рабочий график по айди
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
                'operation':    'del_work_schedule',
                'work_schedule_id': work_schedule_id
            }),
            
            success: function(response) {
                tmp = response
            }
        })
        return tmp
    }()
    return response
}

function get_selected_days() {
    return JSON.parse("[" + $('#selected-days').val().slice(" ") + "]")
}

function get_day_by_numb(numb) { // возвращает день недели по числу (пн = 0 и т.д.)
    if (numb == "0") return "Пн"
    if (numb == "1") return "Вт"
    if (numb == "2") return "Ср"
    if (numb == "3") return "Чт"
    if (numb == "4") return "Пт"
    if (numb == "5") return "Сб"
    if (numb == "6") return "Вс"
}

function get_work_times(day_id, like_as, periodicity) {
    var day = $('#selected-day' + day_id)
    if (periodicity) {
        var day_list = {'day': 'день ' + day_id, "schedule": []}    
    }

    else if (like_as){
        var day_list = {'day': get_day_by_numb(like_as), "schedule": []}    
    }

    else { var day_list = {'day': get_day_by_numb(day_id), "schedule": []} }

    
    

    $.each(day.find('.work-time'), function (i, work_time) {
        if ($(work_time).find('.start_time').val() != "" && $(work_time).find('.end_time').val() != "") {
            day_list.schedule.push({"start_time": $(work_time).find('.start_time').val(), "end_time": $(work_time).find('.end_time').val()})
        }
    })
    return day_list
}

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


function take_work_schedules() { // получает массив рабочих графиков с сервера  
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

function create_select_like_another_day(day_id) {
    html = 
        "как в: <select class='like-another-day-select'>\
        <option value='-'>-</option>"

            $.each(get_selected_days(), function (i, select_day) {
                if (select_day != "-1" && select_day != day_id) {
                    html += "<option value=" + select_day + ">" + get_day_by_numb(select_day) + "</option>"
                }
            })
        html += "</select>"
    
    $('#selected-day' + day_id +  ' .like-another-day').html(html)
}


function add_day_to_selected_cell(day_id, periodicity) {
    html = 
    "<div class='day' id=selected-day" + day_id + ">"
        if (!periodicity) {html += "<div class='day-title'>" + get_day_by_numb(day_id) + "</div>"}
        else {html += "<div class='day-title'>день " + day_id + "</div>"}
        
        html += "<div class='like-another-day'></div>"
            

        html += 
        "<div class='day-schedule'>\
            <div class='work-time'>1. <input id='start_time1' class='start_time' type='time'>-<input id='end_time1' class='end_time' type='time'></div>\
            <div class='work-time'>2. <input id='start_time2' class='start_time' type='time'>-<input id='end_time2' class='end_time' type='time'></div>\
            <div class='work-time'>3. <input id='start_time3' class='start_time' type='time'>-<input id='end_time3' class='end_time' type='time'></div>\
            <div class='work-time'>4. <input id='start_time4' class='start_time' type='time'>-<input id='end_time4' class='end_time' type='time'></div>\
            <div class='work-time'>5. <input id='start_time5' class='start_time' type='time'>-<input id='end_time5' class='end_time' type='time'></div>\
        </div>\
    </div>"
    $('.all-selected-days-cell').append(html)

    $.each(get_selected_days(), function (i, select_day) {
        create_select_like_another_day(select_day)
    })
}

function show_all_days_cell() {
    html = 
    '<div id="0" class="day">\
        <div class="day-title">\
            Пн\
        </div>\
    </div>\
    <div id="1" class="day">\
        <div class="day-title">\
            Вт\
        </div>\
    </div>\
    <div id="2" class="day">\
        <div class="day-title">\
            Ср\
        </div>\
    </div>\
    <div id="3" class="day">\
        <div class="day-title">\
            Чт\
        </div>\
    </div>\
    <div id="4" class="day">\
        <div class="day-title">\
            Пт\
        </div>\
    </div>\
    <div id="5" class="day">\
        <div class="day-title">\
            Сб\
        </div>\
    </div>\
    <div id="6" class="day">\
        <div class="day-title">\
            Вс\
        </div>\
    </div>'
    $('.all-days-cell').html(html)
    $('#selected-days').val('-1')
    $('.day').on('click', function() {
        $(this).addClass('day-selected')
        var day_id = this.id
        console.log(day_id)
        if (!JSON.parse("[" + $('#selected-days').val().slice(" ") + "]").includes(parseInt(day_id))) {
            $('#selected-days').val(function () {
                return this.value + "," + day_id
            })
    
            add_day_to_selected_cell(day_id)
        }
    })
}