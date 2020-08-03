// $('#add-work-time-form').submit(function (event) {
//     var data = $('#add-work-time-form').serializeArray();
    
//     add_work_time(
//         $('#add-work-time-form').find("input[name='start-time'").val(),
//         $('#add-work-time-form').find("input[name='end-time'").val(),
//         $('#add-work-time-form').find("input[name='title'").val()
//     )
// })

// $('.del-work-time-btn').on('click', function(event) {
    
//     if (confirm('Вы действительно хотите удалить это время?')) {
//         del_work_time(this.id)
//         show_work_time_table()
//     }
// })

$('.day').on('click', function() {
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
    // console.log($('#title').val())
    var work_days = {"days": []
    }
    // $.each(get_selected_days(), function (i, item) {
    //     work_days.days.push({"day": get_day_by_numb(item), "schedule": []})

        // $.each($('.work-time'), function(j, item) {
        //     work_days.days[i].schedule.push({'start_time': item['children'][0]['value'], "end_time": item['children'][1]['value']})
        // })
    // })

    $.each(work_days.days, function(i, item) {
        $.each($('.work-time'), function(j, time) {
            item.schedule.push({'start_time': time['children'][0]['value']})
            console.log(item)
            // console.log($(time['children'][0]['value']))
            // item.schedule.push({'start_time': time['children'][0]['value'], "end_time": time['children'][1]['value']})
        })
    })
    
    console.log(work_days)
    add_schedule(
        title = $('#title').val(),
        work_days = work_days,
        periodicity = 0
    )
})