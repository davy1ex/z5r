function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function put(key, value) {
    this.container[key] = value;
}
 

$('#export-events').on('click', function () {
    var events_log =  function () {
        var tmp = null
        $.ajax({
            async: false,
            type: "POST",
            global: false,
            url: '/server/api.php',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({'operation': 'get_events'}),

            success: function(response) {
                tmp = response.events                
            }        
        })
        return tmp
    }()

    // console.log(events_log)
    download(JSON.stringify(events_log), 'events', 'application/json')
})

$('#export-config').on('click', function() {
    var config = {}
    var cards = function () {
        var tmp = null
        $.ajax({
            async: false,
            type: "POST",
            global: false,
            url: '/server/api.php',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({'operation': 'get_cards'}),

            success: function(response) {
                tmp = response.cards 
            }        
        })
        return tmp
    }()

    config["cards"] = cards

    var users = function () {
        var tmp = null
        $.ajax({
            async: false,
            type: "POST",
            global: false,
            url: '/server/api.php',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({'operation': 'get_users'}),

            success: function(response) {
                tmp = response.users          
            }        
        })
        return tmp
    }()

    config["users"] = users
    download(JSON.stringify(config), 'config', 'application/json')
})

$('.write-config').submit(function() {
    $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'multipart/form-data',
        data: JSON.stringify({'operation': 'put_config'}),

        success: function(response) {
            console.log(response.files)
            if (response.success) {                
                alert('Прошивка загружена')
            }

            else {
                alert('Прошивка не загружена')
            }
        }        
    })
})