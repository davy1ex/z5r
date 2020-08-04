



function add_work_time(start_time, end_time, title) {
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
                'operation':    'add_work_time',
                'start_time':   start_time,
                'end_time':     end_time,
                'title':        title
            }),
            
            success: function(response) {
                tmp = response
            }
        })
        return tmp
    }()
    return response
}






var json = {
    "days": [
        {
            "day": "пн",
            "schedule": [
                {"start_time": "10:00", "end_time": "18:00"},
                {"start_time": "11:00", "end_time": "12:00"}
            ]
        },

        {
            "day": "вт",
            "schedule": [
                {"start_time": "11:00", "end_time": "17:00"}
            ]
        }
    ]
}

