access = getCookie('access')
console.log(access)

if (access === 'guard') {
    $('#settings').remove()
}