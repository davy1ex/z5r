function create_request(method, params=null) {
    // создаёт шаблон запроса клиента
    var current_date = new Date()
    response = {
        'date': [current_date.getFullYear(), current_date.getMonth() + 1, current_date.getDate()].join('-') + ' ' + [current_date.getHours(), current_date.getMinutes(), current_date.getSeconds()].join(':'),
        'messages': [
            
        ]
    }

    return response
}