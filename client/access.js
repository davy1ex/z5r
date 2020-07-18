access = getCookie('access')
console.log(access)

if (access === 'guard') {
    $('#settings').remove()
    $('#myBtn').remove()
}

if (access === 'main_guard') {
    $('#add_device').remove()
}