access = getCookie('access')
console.log(access)

if (access === 'guard') {
    $('#settings').remove()
}

if (access === 'main_guard') {
    $('#add_device').remove()
}