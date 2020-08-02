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