function add_day_to_selected_cell(day_id, periodicity) {
    html = 
    "<div class='day' id=selected-day" + day_id + ">"
        if (!periodicity) {html += "<div class='day-title'>" + get_day_by_numb(day_id) + "</div>"}
        else {html += "<div class='day-title'>день " + day_id + "</div>"}
        
        html += "<div class='day-schedule'>\
            <div class='work-time'>1. <input id='start_time1' class='start_time' type='time'>-<input id='end_time1' class='end_time' type='time'></div>\
            <div class='work-time'>2. <input id='start_time2' class='start_time' type='time'>-<input id='end_time2' class='end_time' type='time'></div>\
            <div class='work-time'>3. <input id='start_time3' class='start_time' type='time'>-<input id='end_time3' class='end_time' type='time'></div>\
            <div class='work-time'>4. <input id='start_time4' class='start_time' type='time'>-<input id='end_time4' class='end_time' type='time'></div>\
            <div class='work-time'>5. <input id='start_time5' class='start_time' type='time'>-<input id='end_time5' class='end_time' type='time'></div>\
        </div>\
    </div>"

    $('.all-selected-days-cell').append(html)
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



$('#periodicity-btn').click(function () {
    if($(this).is(":checked")) {
        var start_day_html = 
        "\
        <legend>\
            Опорная дата:\
            <input id='start_day' type='time'>\
        </legend>\
        "


        var n_work_day_html = 
        "<button value=1 id='n_work_day_btn'>Добавить рабочие дни</button>"

        var n_holiday_html = 
        "\
        <legend>\
            Период\
            <input id='n_holiday' type='number' min='1' max='7' value=1>\
        </legend>\
        "

        $('#add_start_day').html(start_day_html) // добавляет поле ввода первого дня работы
        $('#add_n_work_day').html(n_work_day_html) // кнопка добавления новых рабочих дней
        $('#add_n_holiday').html(n_holiday_html) // поле ввода выходных

        $('.all-days-cell').hide() // скрывает блок выбора рабочих дней непериодического графика
        
        $('#create-schedule-btn').hide() // скрывает кнопка создания непериодического графика
        $('#create-periodicity-schedule-btn').show() // показывает кнопку создания периодческого графика
        $('.all-selected-days-cell').html("") // очищает выбранные дни, если они были
        $('#selected-periodicity-days').val('1') // сбрасывает количество рабочих дней периодического графика
        
        add_day_to_selected_cell(1, 1) // создаёт первый (дефолтный) день

        $('#n_work_day_btn').on('click', function() {
            var day_id = 0;

            $('#selected-periodicity-days').val(function () {
                day_id = parseInt(this.value) + 1
                return day_id
            })
            
            add_day_to_selected_cell(day_id, 1)
        })
    } else {
        $('#add_start_day').html("") // очищает поле ввода первого дня работы
        $('#add_n_work_day').html("") // очищает кнопку добавления рабочего дня
        $('#add_n_holiday').html("") // очищает поле ввода выходных

        $('.all-days-cell').show() // показывает блок с выбором рабочих дней непериодического графика
        $('#create-schedule-btn').show()
        $('#create-periodicity-schedule-btn').hide() // скрывает кнопку добавления периодического расписания
        

        $('.all-selected-days-cell').html("") // очищает выбранные дни
        show_all_days_cell()
    }
})

$('#create-schedule-btn').on('click', function() {
    var work_days = {"days": []}
    
    $.each(get_selected_days(), function (i, day) {
        var work_time = get_work_times(day, periodicity=0)
        if (work_time.schedule.length > 0) {
            work_days.days.push(work_time)
        }
    })
    
    console.log(work_days)
    add_schedule(
        title = $('#title').val(),
        work_days = work_days,
        periodicity = 0
    )

    take_work_schedules()
})

$('#create-periodicity-schedule-btn').on('click', function() {
    var work_days = {"days": []}
    
    $.each(Array(parseInt($('#selected-periodicity-days').val())), function (i) {
        var work_time = get_work_times(i+1, periodicity=1)
        if (work_time.schedule.length > 0) {
            work_days.days.push(work_time)
        }
    })
    
    console.log(work_days)
    add_schedule(
        title = $('#title').val(),
        work_days = work_days,
        periodicity = 1
    )

    take_work_schedules()
})
