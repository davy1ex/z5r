$('#periodicity-btn').click(function () {
    if($(this).is(":checked")) {
        // var start_day_html = 
        // "\
        // <legend>\
        //     Опорная дата:\
        //     <input id='start_day' type='time'>\
        // </legend>\
        // "

        // var n_work_days = 
        // "\
        // <legend>\
        //     Период\
        //     <input id='n_work_days_input' type='number' min='0' max='31' value=0>\
        // </legend>\
        // "

        // $('#add_start_day').html(start_day_html) // добавляет поле ввода первого дня работы
        $('#add_start_day').show() // добавляет поле ввода первого дня работы
        // $('#add_n_work_day').html(n_work_day_html) // кнопка добавления новых рабочих дней
        $('#n_work_days').show() // поле ввода рабочих дней

        // $('.all-days-cell').hide() // скрывает блок выбора рабочих дней непериодического графика
        
        $('#create-schedule-btn').hide() // скрывает кнопка создания непериодического графика
        $('#create-periodicity-schedule-btn').show() // показывает кнопку создания периодческого графика
        $('.all-selected-days-cell').html("") // очищает выбранные дни, если они были
        $('#selected-periodicity-days').val("") // сбрасывает количество рабочих дней периодического графика
        
        // add_day_to_selected_cell(1, 1) // создаёт первый (дефолтный) день
        $('.all-days-cell').html('')
        add_periodicity_day_to_select(1)
        

    } else {
        $('#add_start_day').hide() // очищает поле ввода первого дня работы
        // $('#add_n_work_day').html("") // очищает кнопку добавления рабочего дня
        $('#n_work_days').hide() // очищает поле ввода выходных
        $('#selected-periodicity-days').val() // сбрасывает количество рабочих дней периодического графика
        // $('.all-days-cell').show() // показывает блок с выбором рабочих дней непериодического графика
        $('#create-schedule-btn').show()
        $('#create-periodicity-schedule-btn').hide() // скрывает кнопку добавления периодического расписания
        

        $('.all-selected-days-cell').html("") // очищает выбранные дни
        show_all_days_cell()
    }

    // $('.all-selected-days-cell').html("")
})

$('#n_work_days_input').change(function() {
    if (this.defaultValue < this.value) {
        console.log('увеличилось')

        add_periodicity_day_to_select(this.value)
    }

    else {
        console.log('уменьшилось')
        console.log('было: ' + this.defaultValue + ' стало: ' + this.value)
        console.log('пытаюсь удалить ' + this.defaultValue)
        del_periodicity_day_to_select(this.defaultValue)
    }
    this.defaultValue = this.value
})

$('#create-schedule-btn').on('click', function() {
    var work_days = {"days": []}

    $.each(get_selected_days(), function (i, select_day) {
        if (select_day != -1) {
            var like_another_value = $('#selected-day' + select_day + ' .like-another-day-select').val()
            
            if (like_another_value !== "-") {
                var work_time = get_work_times(day_id=select_day, like_as=$('#selected-day' + select_day + ' .like-another-day-select').val(), periodicity=0)
            }

            else {
                var work_time = get_work_times(select_day, periodicity=0)
            }

            if (work_time.schedule.length > 0 || work_time.like_as != null) {
                work_days.days.push(work_time)
            }

            
        }
        
    })
    // work_days.days.sort(function (a, b) {if (a.like_as != null) {return -1} if (b.like_as == null) {return 1} return 0}), - сортирует нуллы в конце
    // work_days.days.sort(function (a, b) {if (a.like_as == null) {return -1} if (b.like_as != null) {return 1} return 0}) - нулы в начале
    add_schedule(
        title = $('#title').val(),
        work_days = work_days.days.sort(function (a, b) {if (a.like_as == null) {return -1} if (b.like_as != null) {return 1} return 0}),
        periodicity = 0
    )

    take_work_schedules()
})

$('#create-periodicity-schedule-btn').on('click', function() {
    var work_days = {"days": []}
    
    $.each(get_selected_days(true), function (i, select_day) {
        var like_another_value = $('#selected-day' + select_day + ' .like-another-day-select').val()
            
            if (like_another_value !== "-") {
                var work_time = get_work_times(day_id=select_day, like_as=$('#selected-day' + select_day + ' .like-another-day-select').val(), periodicity=0)
            }

            else {
                var work_time = get_work_times(select_day, periodicity=0)
            }

            if (work_time.schedule.length > 0 || work_time.like_as != null) {
                work_days.days.push(work_time)
            }
    })
    
    console.log(work_days)
    add_schedule(
        title = $('#title').val(),
        work_days = work_days.days.sort(function (a, b) {if (a.like_as == null) {return -1} if (b.like_as != null) {return 1} return 0}),
        periodicity = 1
    )

    take_work_schedules()
})



