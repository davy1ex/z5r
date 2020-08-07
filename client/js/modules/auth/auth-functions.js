function get_settings_access() {
    var settings = function() { 
        var tmp = null
        $.ajax({
            async: false,
            type: "POST",
            global: false,
            url: '/server/api.php',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                'operation': 'get_settings_access'
            }),

            success: function(response) {
                tmp = response.settings
            }
            
        })
        return tmp
    }()
    return settings
}



