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
 

$('#export-events-btn').on('click', function () {
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

$('#export-config-btn').on('click', function() {
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

    config["access_settings"] = get_settings_access()
    download(JSON.stringify(config), 'config', 'application/json')
})

$('.write-config').submit(function() {
    var selectedFile = $('#input-write-config').prop('files')[0]; 
    var form_data = new FormData();                  
    form_data.append('file', selectedFile);
    console.log(form_data)
    $.ajax({
        url: '/server/upload.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(php_script_response){
            alert(php_script_response); // display response from the PHP script, if any
        }
    });
})