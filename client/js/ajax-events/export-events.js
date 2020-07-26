function get_events() {
    var events_log =  $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({'operation': 'get_events'}),

        success: function(response) {
            return response.events
            
        }        
    }).responseText

    return events_log
}

$('#export-events').on('click', function () {
    var events_log =  $.ajax({
        type: "POST",
        url: '/server/api.php',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({'operation': 'get_events'}),

        success: function(response) {
            return response.events
            
        }        
    }).responseText
    
    // return events_log
    console.log(events_log)
})