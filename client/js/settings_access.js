function create_access_settings_div() {
    settings_access = get_settings_access()
    console.log(settings_access[0].mode)
    
    if (settings_access[0].mode == "1") {
        $('#option-one').prop("checked", 1);        
    }

    if (settings_access[0].mode == "2") {
        $('#option-two').prop("checked", 1);        
    }

    if (settings_access[0].mode == "3") {
        $('#option-three').prop("checked", 1);        
    }

    if (settings_access[0].mode == "4") {
        $('#option-four').prop("checked", 1);        
    }



    if (settings_access[0].point_type == "1") {
        $('#option-one-door').prop("checked", 1);        
    }
    if (settings_access[0].point_type == "2") {
        $('#option-two-door').prop("checked", 1);        
    }
    if (settings_access[0].point_type == "3") {
        $('#option-three-tab').prop("checked", 1);        
    }
    if (settings_access[0].point_type == "4") {
        $('#option-four-tab').prop("checked", 1);        
    }




    if (settings_access[0].server_sync == "0") {
        $('#set_active').prop("checked", 0);        
    }
    if (settings_access[0].server_sync == "1") {
        $('#set_active').prop("checked", 1);        
    }


}