$('#periodicity-btn').change(function () {
    if($(this).is(":checked")) {
        $('#add_start_day').show() // добавляет поле ввода первого дня работы
        $('#n_work_days').show() // поле ввода рабочих дней
        $('#create-periodicity-schedule-btn').show() // показывает кнопку создания периодческого графика

        $('#create-schedule-btn').hide() // скрывает кнопка создания непериодического графика        
        
        $('.all-selected-days-cell').html("") // очищает выбранные дни, если они были
        $('#selected-periodicity-days').val("") // сбрасывает количество рабочих дней периодического графика
        $('.all-days-cell').html('') // очищает сетку дней для выбора
        
        if (get_selected_days(1).length < 1) {add_periodicity_day_to_select(1)} // добавляет первый день, если таковых ещё нет        

    } else {
        $('#add_start_day').hide() // очищает поле ввода первого дня работы
        // $('#add_n_work_day').html("") // очищает кнопку добавления рабочего дня
        $('#n_work_days').hide() // очищает поле ввода выходных
        $('#selected-periodicity-days').val("") // сбрасывает количество рабочих дней периодического графика
        // $('.all-days-cell').show() // показывает блок с выбором рабочих дней непериодического графика
        $('#create-schedule-btn').show()
        $('#create-periodicity-schedule-btn').hide() // скрывает кнопку добавления периодического расписания
        

        $('.all-selected-days-cell').html("") // очищает выбранные дни
        show_all_days_cell()
    }

    // $('.all-selected-days-cell').html("")
})

$('#increase-work-days').on('click', function() {
    var current_value = parseInt($('#n_work_days_input').val())
    $('#n_work_days_input').val(current_value + 1).change()
})

$('#decrease-work-days').on('click', function() {
    var current_value = parseInt($('#n_work_days_input').val())
    if (current_value > 1) {
        $('#n_work_days_input').val(current_value - 1).change()
    }
})

$('#n_work_days_input').change(function() {
    if (parseInt(this.defaultValue) < parseInt(this.value)) {
        console.log('увеличилось')        
        add_periodicity_day_to_select(this.value)
    }

    else {
        console.log('уменьшилось')
        console.log('было: ' + this.defaultValue + ' стало: ' + this.value)
        console.log('пытаюсь удалить ' + this.defaultValue)
        if (parseInt(this.defaultValue) > 1) {
            del_periodicity_day_to_select(this.defaultValue)
        }
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
    $('#selected-periodicity-days').val("")
    $('.all-selected-days-cell').html("") // очищает выбранные дни
    $('#title').val() // очищает название
    show_all_days_cell()
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
        periodicity = 1,
        start_day = $('#start_day').val()
    )

    take_work_schedules()
    $('.all-selected-days-cell').html("") // очищает выбранные дни, если они были
    $('#selected-periodicity-days').val("") // сбрасывает количество рабочих дней периодического графика
    $('.all-days-cell').html('') // очищает сетку дней для выбора
    $('#title').val() // очищает название
    if (get_selected_days(1).length < 1) {add_periodicity_day_to_select(1)}
})



