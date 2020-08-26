$('#enable-settings-access').on('click', function() {
    var data = {"entry": {}, "exit": {}}
    
    data["entry"]["entry-lock-type"] = $('#select-entry-lock-type').val()
    data["entry"]["entry-time-openning"] = $('#input-entry-time-openning').val()
    data["entry"]["entry-time-pass"] = $('#input-entry-time-pass').val()
    data["entry"]["check-entry-pass"] = $('#check-entry-pass').is(":checked")

    data["exit"]["exit-lock-type"] = $('#select-exit-lock-type').val()
    data["exit"]["exit-time-openning"] = $('#input-exit-time-openning').val()
    data["exit"]["exit-time-pass"] = $('#input-exit-time-pass').val()
    data["exit"]["check-exit-pass"] = $('#check-exit-pass').is(":checked")

    console.log(data)
})


$('#enable-settings-access-one-door').on('click', function() {
    var data = {"entry": {}, "exit": {"area-position": [], "area-signed-position": []}}
    
    data["entry"]["entry-lock-type"] = $('#select-entry-lock-type').val()
    data["entry"]["entry-time-openning"] = $('#input-entry-time-openning').val()
    data["entry"]["entry-time-pass"] = $('#input-entry-time-pass').val()
    data["entry"]["check-entry-pass"] = $('#check-entry-pass').is(":checked")

    data["exit"]["direct-control"] = $('#cbk-direct-control').is(":checked")
    
    data["exit"]["authorized-management"] = $('#ckb-authorized-management').is(":checked")
    
    data["exit"]["area-position"][0] = $('#ckb-top-input-field').is(":checked")
    data["exit"]["area-position"][1] = $('#ckb-left-input-field').is(":checked")
    data["exit"]["area-position"][2] = $('#ckb-right-input-field').is(":checked")
    data["exit"]["area-position"][3] = $('#ckb-bottom-input-field').is(":checked")

    data["exit"]["length-password"] = $('#input-length-password').val()
    data["exit"]["color-password"] = $('#select-color-password').val()

    data["exit"]["clock"] = $('#ckb-clock').is(":checked")

    data["exit"]["emergency-opening"] = $('#ckb-emergency-opening').is(":checked")

    data["exit"]["distance-alarm"] = $('#input-distance-alarm').val()
    data["exit"]["time-distance"] = $('#input-time-distance').val()
    data["exit"]["sensetivity"] = $('#input-sensetivity').val()
    data["exit"]["background-distance"] = $('#input-background-distance').val()
    data["exit"]["positive-response-distance"] = $('#input-positive-response-distance').val()
    data["exit"]["negative-response-distance"] = $('#input-negative-response-distance').val()

    data["exit"]["signed-unlock-door"] = $('#ckb-signed-unlock-door').is(":checked")

    data["exit"]["area-signed-position"][0] = $('#ckb-signed-top-input-field').is(":checked")
    data["exit"]["area-signed-position"][1] = $('#ckb-signed-left-input-field').is(":checked")
    data["exit"]["area-signed-position"][2] = $('#ckb-signed-right-input-field').is(":checked")
    data["exit"]["area-signed-position"][3] = $('#ckb-signed-bottom-input-field').is(":checked")

    data["exit"]["signed-length-password"] = $('#input-signed-length-password').val()
    data["exit"]["signed-color-password"] = $('#select-signed-color-password').val()

    console.log(data)
})


$('#increase-managemend-password-length').on('click', function() {
    var current_value = parseInt($('#input-length-password').val())
    $('#input-length-password').val(current_value + 1).change()
})

$('#decrease-managemend-password-length').on('click', function() {
    var current_value = parseInt($('#input-length-password').val())
    if (current_value > 1) {
        $('#input-length-password').val(current_value - 1).change()
    }
})

$('#input-length-password').change(function() {
    if (parseInt(this.defaultValue) < parseInt(this.value)) {
        var element_id = this.value
        var html =         
            '<select name="select-color-password" id="select-color-password' + String(element_id) + '">\
                <option value="red">Красный</option>\
                <option value="green">Зелёный</option>\
                <option value="blue">Синий</option>\
                <option value="yellow">Жёлтый</option>\
                <option value="purple">Фиолетовый</option>\
                <option value="orange">Оранжевый</option>\
            </select>'
        $('.management').append(html)
    }

    else {
        $('#select-color-password'+this.defaultValue).remove()
    }

    this.defaultValue = this.value
})




$('#increase-signed-password-length').on('click', function() {
    var current_value = parseInt($('#input-signed-length-password').val())
    $('#input-signed-length-password').val(current_value + 1).change()
})

$('#decrease-signed-password-length').on('click', function() {
    var current_value = parseInt($('#input-signed-length-password').val())
    if (current_value > 1) {
        $('#input-signed-length-password').val(current_value - 1).change()
    }
})

$('#input-signed-length-password').change(function() {
    if (parseInt(this.defaultValue) < parseInt(this.value)) {
        var element_id = this.value
        var html =         
            '<select name="select-color-password" id="select-signed-color-password' + String(element_id) + '">\
                <option value="red">Красный</option>\
                <option value="green">Зелёный</option>\
                <option value="blue">Синий</option>\
                <option value="yellow">Жёлтый</option>\
                <option value="purple">Фиолетовый</option>\
                <option value="orange">Оранжевый</option>\
            </select>'
        $('.signed').append(html)
    }

    else {
        $('#select-signed-color-password'+this.defaultValue).remove()
    }

    this.defaultValue = this.value
})