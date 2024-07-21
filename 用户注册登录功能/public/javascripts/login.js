let usernameEle = document.getElementById('username')
let passwordEle = document.getElementById('password')
let btnEle = document.getElementById('btn')
let tipEle = document.querySelector('.tip')
let tipinfoEle = document.querySelector('.tip>.tipinfo')
let closeEle = document.querySelector('.close')

btnEle.addEventListener('click', handlerLogin)
usernameEle.addEventListener('focus', handlerFocus)
usernameEle.addEventListener('blur', handlerCheck)
passwordEle.addEventListener('focus', handlerFocus)
passwordEle.addEventListener('blur', handlerCheck)
closeEle.addEventListener('click', handlerClose)
document.addEventListener('keyup', handlerKeyup)

// 当html页面开始加载时, 读取存储的cookie值, 将用户名自动填至对应的输入框
window.onload = () => {
    let cookieArray = document.cookie.split('; ').map(item => item.split('='))
    for (let item of cookieArray) {
        if (item[0] === 'username') {
            usernameEle.value = item[1]
        }
    }
}

// 统一处理当输入框获取焦点时的事件
function handlerFocus() {
    let tipEle = this.nextElementSibling
    tipEle.innerText = this.dataset.tip
    tipEle.classList.add('active')
}
// 统一处理当输入框失去焦点时的事件
function handlerCheck() {
    if (this.value !== '') {
        this.nextElementSibling.classList.remove('active')
    }
}

async function handlerLogin() {
    // 先判断表单内容是否都已填写, 如果存在空数据, 则提示用户
    if (usernameEle.value === '') {
        tipinfoEle.innerText = '用户名不能为空!'
        tipEle.classList.add('active')
        return
    }
    if (passwordEle.value === '') {
        tipinfoEle.innerText = '用户密码不能为空!'
        tipEle.classList.add('active')
        return
    }

    // 当用户输入数据不为空时
    // 点击登录时, 向后端发起请求, 比对输入的用户名是否存在数据库中
    // 存在则登录成功
    let option = {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameEle.value,
            password: passwordEle.value
        })
    }
    let res = await fetch('http://127.0.0.1:3000/user/login', option)
    let data = await res.json()

    // 登陆后通过弹窗告知登录是否成功
    if (data.code) {
        // 登录成功之后将用户的token信息存储到sessionStorage中
        sessionStorage.setItem('tokeninfo', data.token)

        tipinfoEle.innerText = '登录成功! 3s之后将会跳转至首页!'
        tipEle.classList.add('active')
        let time = setTimeout(() => {
            location.href = './home.html'
            clearTimeout(time)
        }, 3000);
    } else {
        tipinfoEle.innerText = data.message
        passwordEle.value = ''
        tipEle.classList.add('active')
    }
}

function handlerClose() {
    tipEle.classList.remove('active')
}

function handlerKeyup(e) {
    if (e.keyCode === 13) {
        btnEle.dispatchEvent(new Event('click'))
    }
}