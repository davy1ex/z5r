function get_all_work_times() {
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
                'operation':    'get_all_work_times'
            }),
            
            success: function(response) {
                tmp = response
            }
        })
        return tmp
    }()
    return response
}


function show_work_time_table() {
    var perrow = 1,
    html = 
    '<table>\
        <thead>\
            <tr>\
                <th scope="col">Начало</th>\
                <th scope="col">Конец</th>\
                <th scope="col">Название</th>\
                <th scope="col">Действия</th>\
            </tr>\
        </thead>\
        <tbody>\
        <tr>';
    var work_time_list = get_all_work_times().work_time
    

    $.each(work_time_list, function(i, item) {
        html += '<td data-label="Начало">' + item.start_time + '</td>'
        html += '<td data-label="Конец">' + item.end_time + '</td>'
        html += '<td data-label="Название">' + item.title + '</td>'
        html += '<td data-label="Действия">' + '<button id=' + String(item.id) + ' class="del-work-time-btn del_btn"><img src="/client/img/remove.png"></button></td>'
        
        var next = i+1;
        if (next%perrow==0 && next!=work_time_list.length) {
            // html += "</tr><tr>";
            html += "</tr>";
        }
    })
    html += '</tr></tbody></table>'

    $('#work-time-table').html(html)
}

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


function del_work_time(work_time_id) {
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
                'operation':    'del_work_time',
                'work_time_id': work_time_id
            }),
            
            success: function(response) {
                tmp = response
            }
        })
        return tmp
    }()
    return response
}


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

var json = {
    "days": [
        {
            "day": "пн",
            "schedule": [
                {"start_time": "10:00", "end_time": "18:00"}
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