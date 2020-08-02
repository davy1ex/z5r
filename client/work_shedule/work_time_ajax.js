$('#add-work-time-form').submit(function (event) {
    var data = $('#add-work-time-form').serializeArray();
    
    add_work_time(
        $('#add-work-time-form').find("input[name='start-time'").val(),
        $('#add-work-time-form').find("input[name='end-time'").val(),
        $('#add-work-time-form').find("input[name='title'").val()
    )
})

$('.del-work-time-btn').on('click', function(event) {
    
    if (confirm('Вы действительно хотите удалить это время?')) {
        del_work_time(this.id)
        show_work_time_table()
    }
})

$('.day').on('click', function() {
    var day_id = this.id
    console.log(day_id)
    if (!JSON.parse("[" + $('#selected-days').val().slice(" ") + "]").includes(parseInt(day_id))) {
        $('#selected-days').val(function () {
            return this.value + "," + day_id
        })
        
        html = 
        "<div class='day'>\
            <div class='day-title'>" + get_day_by_numb(day_id) + "</div>\
            <div class='day-schedule'>\
            \
            </div>\
        </div>"

        $('.all-selected-days-cell').append(html)
    }
})