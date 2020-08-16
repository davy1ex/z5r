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

function get_work_schedule(work_schedule_id) {
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
                'operation':    'get_work_schedule',
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

function get_selected_days(periodicity=false) {
    // return JSON.parse("[" + $('#selected-days').val().slice(" ") + "]")
    if (periodicity) {
        return JSON.parse("[" + $('#selected-periodicity-days').val() + "]")        
    }
    return JSON.parse("[" + $('#selected-days').val() + "]")
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

function get_numb_by_day(day) { // возвращает номер дня по дню недели
    day = day.toLowerCase()
    if (day == "пн") return "0"
    if (day == "вт") return "1"
    if (day == "ср") return "2"
    if (day == "чт") return "3"
    if (day == "пт") return "4"
    if (day == "сб") return "5"
    if (day == "вс") return "6"
}

function get_work_times(day_id, like_as) { // возвращает выбранные временные интервалы дня. Если это копипаст, то показывает индекс откуда копипаст
    var day = $('#selected-day' + day_id)
    var day_list = {'day': day_id, "schedule": [], "like_as": null} 
    
    if (like_as){
        day_list['like_as'] = like_as
    }   

    else {
        $.each(day.find('.work-time'), function (i, work_time) {
            if ($(work_time).find('.start_time').val() != "" && $(work_time).find('.end_time').val() != "") {
                day_list.schedule.push({"start_time": $(work_time).find('.start_time').val(), "end_time": $(work_time).find('.end_time').val()})
            }
        })
    }
    return day_list
}

function show_work_schedules_table(work_schedules, periodicity=false) { // вставляет таблицу с рабочими графиками
    var work_schedule_list = work_schedules.work_schedule
    var html = ""
    $.each(work_schedule_list, function(i, item) {
        item.work_days = JSON.parse(item.work_days).sort(function (a, b) {if (a.day < b.day) {return -1} if (a.day > b.day) {return 1} return 0 })
        html += 
        '<table>\
            <thead>\
                <tr>\
                    <th scope="col">Название</th>'

                    $.each(item.work_days, function(i, day) {
                        if (item.periodicity == "1") {html += '<th scope="col">День ' + day.day + '</th>'}
                        else {html += '<th scope="col">' + get_day_by_numb(day.day) + '</th>'}
                        
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
            
            $.each(item.work_days, function(i, day) {
                if (day.schedule.length > 0 || day.like_as != null) {
                    var day_label = get_day_by_numb(day.day)
                    html += '<td data-label=' + day_label + '>'
                    if (day.like_as == null) {
                        $.each(day.schedule, function (i, schedule) {
                            html += schedule.start_time + '-' + schedule.end_time + '<br>'
                        })
                    }
                    else {
                        for (var i in item.work_days) {
                            if (item.work_days[i]['day'] == day.like_as) {var like_as_day = item.work_days[i]}
                        }
                        $.each(like_as_day.schedule, function (i, schedule) {
                            html += schedule.start_time + '-' + schedule.end_time + '<br>'
                        })
                    }
                    html += '</td>'
                } 
                
                else {
                    html += '<td data-label=' + day_label +'>-</td>'
                }

                
            })
            html += '<td data-label="Действия">' + '<button id=' + String(work_schedule_id) + ' class="edit-work-schedule-btn">' + '<img class=" qr-code-icon" src="/client/img/edit.png" alt=""></img>' + '</button><button id=' + String(work_schedule_id) + ' class="del-work-schedule-btn"><img src="/client/img/remove.png"></button></td>'
            html += '</tr></tbody></table>'
    })
    
    $('#work-schedules-table').html(html)    

    $('.del-work-schedule-btn').on('click', function(event) {
        if (confirm('Вы действительно хотите удалить это время?')) {
            del_work_schedule(this.id)
            take_work_schedules()
        }
    })

    $('.edit-work-schedule-btn').on('click', function() {
        $('.all-selected-days-cell').html("") // очищает выбранные дни
        show_all_days_cell() // очищает сетку выбираемых дней
        $('#create-schedule-btn').hide() // скрывает кнопка создания непериодического графика
        $('#create-periodicity-schedule-btn').show() // показывает кнопку создания периодческого графика

        var work_schedule = get_work_schedule(this.id).work_schedule // получает текущее расписание
        $('#title').val(work_schedule[0].title)
        if (work_schedule[0].periodicity) {
            $('.all-days-cell').html('')
            $('#add_start_day').show() 
            $('#n_work_days').show()
            $('#n_work_days_input').val(JSON.parse(work_schedule[0].work_days).length)
        }
        
        $.each(JSON.parse(work_schedule[0].work_days), function(i, work_day) { // перебирает отсортированные дни графика)
            // .sort(function (a, b) {if (a.day < b.day) {return -1} if (a.day > b.day) {return 1} return 0 })
            $('#' + work_day.day).addClass('day-selected')
            
            if (work_schedule[0].periodicity) { // если график периодический
                add_periodicity_day_to_select(work_day.day)        
                $('.select-day').addClass('day-selected')
            }            

            add_day_to_selected_cell(work_day.day, periodicity=work_schedule[0].periodicity)

            if (work_day.periodicity) {array_selected_days = JSON.parse("[" + $('#selected-periodicity-days').val() + "]")} // массив выбранных дней}
            else {array_selected_days = JSON.parse("[" + $('#selected-days').val() + "]")} // массив выбранных дней}
    
            if (!array_selected_days.includes(parseInt(work_day.day))) { // если этот день не в выбранных
                if (work_schedule[0].periodicity) {
                    $('#selected-periodicity-days').val(function () { // добавляет в поле ввода выбранных дней
                        if (this.value == "") {
                            return work_day.day
                        }
            
                        return this.value + "," + work_day.day
                    })
                }

                else {
                    $('#selected-days').val(function () { // добавляет в поле ввода выбранных дней
                        if (this.value == "") {
                            return work_day.day
                        }
            
                        return this.value + "," + work_day.day
                    })
                }
            }
        })



        $.each(JSON.parse(work_schedule[0].work_days), function(i, work_day) {
            if (work_day.like_as != null) { // если копипаст рабочег графика               
                create_select_like_another_day(work_day.day, work_day.like_as, periodicity=work_schedule[0].periodicity)                
            }

            else if (work_day.like_as == null) {
                $.each(work_day.schedule, function(j, schedule) {
                    $('#selected-day' + work_day.day + ' #start_time' + work_day.day + parseInt(j+1)).val(schedule.start_time).change()                    
                    $('#selected-day' + work_day.day + ' #end_time' + work_day.day + parseInt(j+1)).val(schedule.end_time).change()
                    
                    $('#selected-day' + work_day.day + ' .like-another-day-select').val('-').change()
                })
            }

        })
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


function create_select_like_another_day(day_id, periodicity=false) {
    var html = 
    "как в: <select  class='like-another-day-select'>\
    <option value='-'>-</option>"

        $.each(get_selected_days(periodicity), function (i, select_day) {
            // && get_selected_days().indexOf(day_id) > get_selected_days().indexOf(select_day)
            if (select_day != day_id  && get_work_times(select_day).schedule.length > 0) {
                if (!periodicity) {
                    html += "<option value=" + select_day + ">" + get_day_by_numb(select_day) + "</option>"
                }
                else {
                    html += "<option value=" + select_day + ">День " + select_day + "</option>"
                }
            }
        })

    html += "</select>"
    var selected_day = $('#selected-day' + day_id + ' .like-another-day-select').val()
    $('#selected-day' + day_id +  ' .like-another-day').html(html)    
    
    $('#selected-day' + day_id +  ' .like-another-day-select').change(function() {
        var selected_day = $('#selected-day' + day_id + ' .like-another-day-select').val()
        if (this.value != '-') {            
            $.each(Array(5), function(j) {
                $('#selected-day' + day_id + ' #start_time' + day_id + parseInt(j+1)).val("").change()             
                $('#selected-day' + day_id + ' #end_time' + day_id + parseInt(j+1)).val("").change()
            })
            $('#selected-day' + day_id + ' .day-schedule').hide()
        }
    
        else {
            $('#selected-day' + day_id + ' .day-schedule').show()
        }
        
        if (selected_day == null || selected_day == undefined) {
            $('#selected-day' + day_id + ' .like-another-day-select').val('-')
            $('#selected-day' + day_id + ' .day-schedule').show()
        }
        else {
            $('#selected-day' + day_id + ' .like-another-day-select').val(selected_day)
            selected_day != '-' ? $('#selected-day' + day_id + ' .day-schedule').hide() : $('#selected-day' + day_id + ' .day-schedule').show()
        }
    })
    
    if (selected_day == null || selected_day == undefined || !(get_selected_days(periodicity).includes(selected_day))) {
        $('#selected-day' + day_id + ' .like-another-day-select').val('-')
        $('#selected-day' + day_id + ' .day-schedule').show()
    }
    else {
        $('#selected-day' + day_id + ' .like-another-day-select').val(selected_day)
        selected_day != '-' ? $('#selected-day' + day_id + ' .day-schedule').hide() : $('#selected-day' + day_id + ' .day-schedule').show()
    }
}

function add_day_to_selected_cell(day_id, periodicity=false) {
    var html = 
    "<div class='day' id=selected-day" + day_id + ">"
        if (!periodicity) {html += "<div class='day-title'>" + get_day_by_numb(day_id) + "</div>"}
        else {html += "<div class='day-title'>день " + day_id + "</div>"}
        
        html += "<div class='like-another-day'></div>"
            

        html += 
        "<div class='day-schedule'>\
            <div class='work-time'>1. <input id='start_time" + day_id + "1' class='start_time' type='time'>-<input id='end_time" + day_id + "1' class='end_time' type='time'></div>\
            <div class='work-time'>2. <input id='start_time" + day_id + "2' class='start_time' type='time'>-<input id='end_time" + day_id + "2' class='end_time' type='time'></div>\
            <div class='work-time'>3. <input id='start_time" + day_id + "3' class='start_time' type='time'>-<input id='end_time" + day_id + "3' class='end_time' type='time'></div>\
            <div class='work-time'>4. <input id='start_time" + day_id + "4' class='start_time' type='time'>-<input id='end_time" + day_id + "4' class='end_time' type='time'></div>\
            <div class='work-time'>5. <input id='start_time" + day_id + "5' class='start_time' type='time'>-<input id='end_time" + day_id + "5' class='end_time' type='time'></div>\
        </div>\
    </div>"
    $('.all-selected-days-cell').append(html)
    
    $.each(get_selected_days(periodicity), function (i, select_day) {
        create_select_like_another_day(select_day, periodicity=periodicity)
    })

    $('.start_time').change(function() {
        $.each(get_selected_days(periodicity), function (i, select_day) {
            create_select_like_another_day(select_day,  periodicity = periodicity)
            
        })
    })
    $('.end_time').change(function() {
        $.each(get_selected_days(periodicity), function (i, select_day) {      
            create_select_like_another_day(select_day, periodicity = periodicity)            
        })
    })
}

function del_day_to_selected_cell(day_id) {
    $('#selected-day'+day_id).remove()   
    
}

function show_all_days_cell() {
    html = 
    '<div id="0" class="select-day">\
        <div class="day-title">\
            Пн\
        </div>\
    </div>\
    <div id="1" class="select-day">\
        <div class="day-title">\
            Вт\
        </div>\
    </div>\
    <div id="2" class="select-day">\
        <div class="day-title">\
            Ср\
        </div>\
    </div>\
    <div id="3" class="select-day">\
        <div class="day-title">\
            Чт\
        </div>\
    </div>\
    <div id="4" class="select-day">\
        <div class="day-title">\
            Пт\
        </div>\
    </div>\
    <div id="5" class="select-day">\
        <div class="day-title">\
            Сб\
        </div>\
    </div>\
    <div id="6" class="select-day">\
        <div class="day-title">\
            Вс\
        </div>\
    </div>'
    $('.all-days-cell').html(html)
    $('#selected-days').val('')
    
    $('.select-day').on('click', function() {
        $(this).addClass('day-selected') // помечает день выбранным
        var day_id = this.id
    
        array_selected_days = JSON.parse("[" + $('#selected-days').val() + "]") // массив выбранных дней
    
        if (!array_selected_days.includes(parseInt(day_id))) { // если этот день не в выбранных
            $('#selected-days').val(function () { // добавляет в поле ввода выбранных дней
                if (this.value == "") {
                    return day_id
                }
    
                return this.value + "," + day_id
            })
    
            add_day_to_selected_cell(day_id)
        }
    
        else {
            array_selected_days.splice(array_selected_days.indexOf(parseInt(day_id)), 1) // удаляет день из выбранных
            $('#selected-days').val(array_selected_days) // применяет массив выбранных дней в скрытое поле ввода
            
            $(this).removeClass('day-selected') // помечает день не выбранным
    
            del_day_to_selected_cell(day_id) // удаляет выбранный день из выбранныех
            console.log(get_selected_days())
            $.each(array_selected_days, function (i, select_day) {
                create_select_like_another_day(select_day, periodicity=false)
            })
        }
    })
}


function add_periodicity_day_to_select(day_id) {
    html = '<div id="' + day_id + '" class="select-day select-day' + day_id + '">\
        <div class="day-title">\
            день ' + day_id + '\
        </div>\
    </div>'
    $('.all-days-cell').append(html)

    $('.select-day'+day_id).on('click', function() {
        var array_selected_days = JSON.parse("[" + $('#selected-periodicity-days').val() + "]")
        var day_id = this.id

        if (!array_selected_days.includes(parseInt(day_id))) {
            $(this).addClass('day-selected')
            
            $('#selected-periodicity-days').val(function () { // добавляет в поле ввода выбранных дней
                if (this.value == "") {
                    return day_id
                }
    
                return this.value + "," + day_id
            })
            add_day_to_selected_cell(day_id, periodicity=true)
        }

        else if (array_selected_days.includes(parseInt(day_id))) {
            array_selected_days.splice(array_selected_days.indexOf(parseInt(day_id)), 1) // удаляет день из выбранных
            $('#selected-periodicity-days').val(array_selected_days) // применяет массив выбранных дней в скрытое поле ввода            
            $(this).removeClass('day-selected') // помечает день не выбранным    
            del_day_to_selected_cell(day_id) // удаляет выбранный день из выбранныех
            
            $.each(array_selected_days, function (i, select_day) {
                create_select_like_another_day(select_day, periodicity=true)
            })
        }
    })
}

function del_periodicity_day_to_select(day_id) {
    $('.all-days-cell ' + '#' + day_id).remove()
    
    var array_selected_days = JSON.parse("[" + $('#selected-periodicity-days').val() + "]")
    array_selected_days.splice(array_selected_days.indexOf(parseInt(day_id)), 1) // удаляет день из выбранных
    $('#selected-periodicity-days').val(array_selected_days) // применяет массив выбранных дней в скрытое поле ввода    
    del_day_to_selected_cell(day_id) // удаляет выбранный день из выбранныех

    
}