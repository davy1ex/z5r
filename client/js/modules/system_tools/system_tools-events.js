
 

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

$('#import-config').submit(function() {
    var selectedFile = $('#input-import-config').prop('files')[0]; 
    var form_data = new FormData();            
    form_data.append('file', selectedFile);
    // console.log(form_data)
    console.log("/configs/" + selectedFile.name)
    $.ajax({
        url: '/server/upload.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'POST'
        
    });

    $(document).ready(function() {
        $.ajax({
            type: "POST",
            async: false,
            url: '/server/api.php',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({'operation': 'import_config', 'filename': selectedFile.name}),
    
            success: function(response) {
                clear_cards()
                $.each(response.file.cards, function(i, item) {                    
                    add_card(
                        numb_card = item.card, 
                        block_type = item.block_type, 
                        shord_code = item.shord_code, 
                        tz = item.tz
                    )
                })

                clear_users()
                $.each(response.file.users, function(i, item) {
                    add_user(
                        username = item.username,
                        login = item.login,
                        password = item.password,
                        access = item.access,
                        device_id = item.device_id,
                        device_type = item.device_type,
                        device_mac = item.device_mac
                    )
                })

                set_mode(response.file.access_settings[0].mode)
                set_point_type(response.file.access_settings[0].point_type)
                set_active(response.file.access_settings[0].server_sync)
            }
        })
    }

)})

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