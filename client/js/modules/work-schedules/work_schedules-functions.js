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
        
        var work_schedule = get_work_schedule(this.id).work_schedule // получает текущее расписание
        $('#title').val(work_schedule[0].title)
        
        if (work_schedule[0].periodicity != '0') { // выставляет поля ввода, необходимые для периодческого графика
            console.log('график периодический')
            $('#periodicity-btn').prop('checked', true).change() // меняет чекбокс на периодический (применяет стили)
            $('.all-days-cell').html('') // принудительно очищает сетку с выбираемыми днями
        }

        else {
            $('#periodicity-btn').prop('checked', false).change() // меняет чекбокс на непериодический (применяет стили)
        }
        
        $.each(JSON.parse(work_schedule[0].work_days), function(i, work_day) { // перебирает дни графика
            // .sort(function (a, b) {if (a.day < b.day) {return -1} if (a.day > b.day) {return 1} return 0 })
            $('#' + work_day.day).addClass('day-selected') // помечает выбранным
            
            if (work_schedule[0].periodicity != '0') { // если график периодический, добавляет его дни в выбираемые
                add_periodicity_day_to_select(work_day.day)        // добавляет день в выбираемые
                $('.select-day').addClass('day-selected')          // помечает его как выбранный
            }
            
            

            if (work_day.periodicity != '0') {array_selected_days = JSON.parse("[" + $('#selected-periodicity-days').val() + "]")} // массив выбранных дней
            else {array_selected_days = JSON.parse("[" + $('#selected-days').val() + "]")} // массив выбранных дней
    
            if (!array_selected_days.includes(parseInt(work_day.day))) { // если этот день не в выбранных
                if (work_schedule[0].periodicity != '0') {
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
            add_day_to_selected_cell(work_day.day, periodicity=parseInt(work_schedule[0].periodicity)) // добавляет день в сетку выбранных
        })





        $.each(JSON.parse(work_schedule[0].work_days), function(i, work_day) {
            // add_day_to_selected_cell(work_day.day, periodicity=parseInt(work_schedule[0].periodicity), add_select_like_another_day=true) // добавляет день в сетку выбранных
            console.log(work_day)
            console.log(work_day.like_as)
            if (work_day.like_as != null) { // если копипаст рабочего графика   
                console.log('копипащу')            
                create_select_like_another_day(work_day.day, periodicity=parseInt(work_schedule[0].periodicity), like_as=work_day.like_as)
            }

            else if (work_day.like_as == null) {
                console.log('не копипащу')            
                create_select_like_another_day(work_day.day, periodicity=parseInt(work_schedule[0].periodicity))
                $.each(work_day.schedule, function(j, schedule) {
                    $('#selected-day' + work_day.day + ' #start_time' + work_day.day + parseInt(j+1)).val(schedule.start_time)
                    $('#selected-day' + work_day.day + ' #end_time' + work_day.day + parseInt(j+1)).val(schedule.end_time)
                    
                    $('#selected-day' + work_day.day + ' .like-another-day-select').val('-')
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


// function create_select_like_another_day(day_id, periodicity, like_as='') {
//     console.log('получил')
//     console.log(periodicity)
//     console.log('привет, день ' + day_id)
//     var html = 
//     "как в: <select  class='like-another-day-select' value='-'>\
//     <option value='-'>-</option>"
//         $.each(get_selected_days(periodicity), function (i, select_day) {
//             // && get_selected_days().indexOf(day_id) > get_selected_days().indexOf(select_day)
//             if (select_day != day_id  && get_work_times(select_day).schedule.length > 0) {
//                 if (!periodicity) {
//                     html += "<option value=" + select_day + ">" + get_day_by_numb(select_day) + "</option>"
//                 }
//                 else {
//                     html += "<option value=" + select_day + ">День " + select_day + "</option>"
//                 }
//             }
//         })
//     html += "</select>"
    
//     var selected_day = $('#selected-day' + day_id + ' .like-another-day-select').val()
//     console.log('у тебя было значение: ' + selected_day)
//     $('#selected-day' + day_id +  ' .like-another-day').html(html)
    
//     $('#selected-day' + day_id +  ' .like-another-day-select').change(function() {
//         var selected_day = $('#selected-day' + day_id + ' .like-another-day-select').val()
//         console.log('у дня' + day_id + ' был выбран день ' + selected_day)
//         if (this.value != '-') {
//             $.each(Array(5), function(j) {
//                 $('#selected-day' + day_id + ' #start_time' + day_id + parseInt(j+1)).val("").change()
//                 $('#selected-day' + day_id + ' #end_time' + day_id + parseInt(j+1)).val("").change()
//             })
//             console.log('обновляю другие дни')
//             console.log(periodicity)
            
//             $('#selected-day' + day_id + ' .day-schedule').hide()
//         }
    
//         else {
//             $('#selected-day' + day_id + ' .day-schedule').show()
//         }
        
//         if (selected_day == null || selected_day == undefined) {
//             $('#selected-day' + day_id + ' .like-another-day-select').val('-')
//             $('#selected-day' + day_id + ' .day-schedule').show()
//         }
//         else {
//             $('#selected-day' + day_id + ' .like-another-day-select').val(selected_day)
//             selected_day != '-' ? $('#selected-day' + day_id + ' .day-schedule').hide() : $('#selected-day' + day_id + ' .day-schedule').show()
//         }
//     })
    
//     console.log(like_as)
//     if (get_selected_days(periodicity).includes(parseInt(like_as))) {
//         console.log('привет от лайк эс ' + like_as)
//         $('#selected-day' + day_id + ' .like-another-day-select').val(like_as)
//         if (like_as == "-") {
//             $('#selected-day' + day_id + ' .day-schedule').show()
//         }
//         else {
//             $('#selected-day' + day_id + ' .day-schedule').hide()
//         }
//     }
//     else {
//         console.log('привет от селектед дэй: ' + selected_day)
//         if (get_selected_days(periodicity).includes(parseInt(selected_day))) {
//             $('#selected-day' + day_id + ' .like-another-day-select').val(selected_day)
//             selected_day != '-' ? $('#selected-day' + day_id + ' .day-schedule').hide() : $('#selected-day' + day_id + ' .day-schedule').show()
            
//         }
//         else {
//             console.log('выставляю минус, потому что selected_day == ' + selected_day + ' a дни выбраны были: ')
//             console.log(periodicity)
//             console.log(get_selected_days(periodicity))
//             $('#selected-day' + day_id + ' .like-another-day-select').val('-')
//             $('#selected-day' + day_id + ' .day-schedule').show()
//         }
//     }    
// }


function create_select_like_another_day(day_id, periodicity, like_as=null, save_like_as=false) {
    console.log('привет, день: ' + day_id)
    console.log('лайк ас:' + like_as)
    console.log('периодичность: ')
    console.log(periodicity)
    if (save_like_as) {        
        var selected_day = $('#selected-day' + day_id + ' .like-another-day-select').val()
        console.log('надо схоранить like_as день, он: ' + selected_day)
    }

    var html = 
    "как в: <select  class='like-another-day-select' value='-'>\
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
    $('#selected-day' + day_id +  ' .like-another-day').html(html)
    

    $('#selected-day' + day_id +  ' .like-another-day-select').change(function() {        
        if (this.value != '-') {
            $.each(Array(5), function(j) {
                $('#selected-day' + day_id + ' #start_time' + day_id + parseInt(j+1)).val("")
                $('#selected-day' + day_id + ' #end_time' + day_id + parseInt(j+1)).val("")
            })
            $('#selected-day' + day_id + ' .day-schedule').hide()
            console.log('был выбран копипаст, обновляю дни')
            $.each(get_selected_days(periodicity), function(i, select_day) {
                create_select_like_another_day(select_day, periodicity, like_as=null, save_like_as=true)
            })
        }
        else {
            $('#selected-day' + day_id + ' .day-schedule').show()
        }       
        
    })
    

    if (like_as != null) {
        $('#selected-day' + day_id + ' .like-another-day-select').val(like_as)
    }
    
    if (save_like_as) {
        console.log(get_selected_days(periodicity))
        console.log(selected_day)
        if (get_work_times(selected_day).schedule.length > 0) {
            console.log('восстанавливаю имеющееся значение: ' + selected_day)     
            $('#selected-day' + day_id + ' .like-another-day-select').val(selected_day)
        }
        else {
            $('#selected-day' + day_id + ' .like-another-day-select').val('-')
        }
    }

    console.log('по итогу значение: ' + $('#selected-day' + day_id + ' .like-another-day-select').val())
    if ($('#selected-day' + day_id + ' .like-another-day-select').val() != '-') {
        $('#selected-day' + day_id + ' .day-schedule').hide()
    }
    else {
        $('#selected-day' + day_id + ' .day-schedule').show()
    }       
}



function add_day_to_selected_cell(day_id, periodicity=false) { // создаёт хтмл блок выбранного дня и добавляет его в сетку
    console.log('добавляю новый день' + day_id + 'в сетку')
    console.log('периодичность: ' + periodicity)
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
        console.log('прогоняю для генерации: ' + select_day)
        create_select_like_another_day(select_day, periodicity=periodicity)
    })

    $('.start_time').change(function() {
        $.each(get_selected_days(periodicity), function (i, select_day) {
            console.log('прогоняю, потому что поменялось время: ' + select_day)
            create_select_like_another_day(select_day,  periodicity=periodicity)
            
        })
    })
    $('.end_time').change(function() {
        $.each(get_selected_days(periodicity), function (i, select_day) {      
            create_select_like_another_day(select_day, periodicity=periodicity)            
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