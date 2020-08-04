$('.day').on('click', function() {
    $(this).addClass('day-selected')
    var day_id = this.id
    console.log(day_id)
    if (!JSON.parse("[" + $('#selected-days').val().slice(" ") + "]").includes(parseInt(day_id))) {
        $('#selected-days').val(function () {
            return this.value + "," + day_id
        })
        
        html = 
        "<div class='day' id=selected-day" + day_id + ">\
            <div class='day-title'>" + get_day_by_numb(day_id) + "</div>\
            <div class='day-schedule'>\
                <div class='work-time'>1. <input id='start_time1' class='start_time' type='time'>-<input id='end_time1' class='end_time' type='time'></div>\
                <div class='work-time'>2. <input id='start_time2' class='start_time' type='time'>-<input id='end_time2' class='end_time' type='time'></div>\
                <div class='work-time'>3. <input id='start_time3' class='start_time' type='time'>-<input id='end_time3' class='end_time' type='time'></div>\
                <div class='work-time'>4. <input id='start_time4' class='start_time' type='time'>-<input id='end_time4' class='end_time' type='time'></div>\
                <div class='work-time'>5. <input id='start_time5' class='start_time' type='time'>-<input id='end_time5' class='end_time' type='time'></div>\
            </div>\
        </div>"

        $('.all-selected-days-cell').append(html)
    }
})

$('#create-schedule-btn').on('click', function() {
    var work_days = {"days": []}
    
    $.each(get_selected_days(), function (i, day) {
        var work_time = get_work_times(day)
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
    // show_work_schedules_table()
    take_work_schedules()
})