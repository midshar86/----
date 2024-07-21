window.onload = async () => {
    let token = sessionStorage.getItem('tokeninfo')
    console.log(token)
    let option = {
        headers: {
            'Authorization': token
        }
    }
    let res = await fetch('http://127.0.0.1:3000/user/home', option)
    let data = await res.json()
    console.log(data)
    // 如果后端返回的结果是未登录状态, 则直接跳转至登录页面
    if (!(data.code)) {
        location.href = './login.html'
    }
}