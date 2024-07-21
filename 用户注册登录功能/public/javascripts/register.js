// 获取表单中的各项元素
let usernameEle = document.getElementById('username')
let passwordEle = document.getElementById('password')
let rpasswordEle = document.getElementById('rpassword')
let nicknameEle = document.getElementById('nickname')
let ageEle = document.getElementById('age')
let genderEles = document.querySelectorAll('[name="gender"]')
let btnEle = document.getElementById('btn')
let tipEle = document.querySelector('.tip')
let tipInfoEle = document.querySelector('.tip>.tipinfo')
let closeTipEle = document.querySelector('.tip>.close')

// 为表单的各个输入框以及注册按钮设置事件
usernameEle.addEventListener('focus', handlerInputEvent)
usernameEle.addEventListener('blur', handlerUsernameCheck)
passwordEle.addEventListener('focus', handlerInputEvent)
passwordEle.addEventListener('blur', handlerPasswordCheck)
rpasswordEle.addEventListener('focus', handlerInputEvent)
rpasswordEle.addEventListener('blur', handlerRePasswordCheck)
nicknameEle.addEventListener('focus', handlerInputEvent)
nicknameEle.addEventListener('blur', handlerNicknameCheck)
ageEle.addEventListener('focus', handlerInputEvent)
ageEle.addEventListener('blur', handlerAgeCheck)
btnEle.addEventListener('click', handlerSubmit)
closeTipEle.addEventListener('click', handlerCloseTip)
document.addEventListener('keyup', handlerKeyup)

// !事件处理函数---------
// 所有的输入框使用同一个事件处理函数,
// 输入框获取焦点时, 显示提示信息
function handlerInputEvent() {
    let tipEle = this.nextElementSibling
    tipEle.innerText = this.dataset.tip
    tipEle.classList.add('active')
}
// !事件处理函数---------

// !用户名---------
// 验证用户名输入
function handlerUsernameCheck() {
    let reg = /^[a-z]\w{2,9}$/i
    let inputVal = this.value
    if (reg.test(inputVal) && inputVal.length >= 3 && inputVal.length <= 10) {
        this.nextElementSibling.classList.remove('active')
    }
}
// !用户名---------

// !用户密码---------
// 验证密码输入
function handlerPasswordCheck() {
    let count = 0
    let inputVal = this.value
    if (/[a-z]/.test(inputVal)) {
        count++
    }
    if (/[A-Z]/.test(inputVal)) {
        count++
    }
    if (/[0-9]/.test(inputVal)) {
        count++
    }
    if (inputVal.length >= 6 && count === 3) {
        this.nextElementSibling.classList.remove('active')
    }
}
// !用户密码---------

// !重复用户密码---------
// 重复密码输入
function handlerRePasswordCheck() {
    let inputVal = this.value
    if (inputVal === passwordEle.value) {
        this.nextElementSibling.classList.remove('active')
    } else {
        this.nextElementSibling.innerText = '两次密码输入不一致!请重新输入!'
        this.value = ''
    }
}
// !重复用户密码---------

// !用户昵称---------
// 验证用户昵称
function handlerNicknameCheck() {
    // 要求昵称中不能存在空白字符并且长度大于1
    let reg = /\s/
    let inputVal = this.value
    if (!(reg.test(inputVal)) && inputVal.length >= 1) {
        this.nextElementSibling.classList.remove('active')
    }
}
// !用户昵称---------

// !用户年龄---------
// 验证用户年龄
function handlerAgeCheck() {
    let inputVal = this.value - 0
    if (inputVal <= 60 && inputVal >= 18) {
        this.nextElementSibling.classList.remove('active')
    }
}
// !用户年龄---------

// !提交表单数据---------
async function handlerSubmit() {
    let username, password, nickname, age, gender
    // 先获取用户性别数据
    for (let i = 0; i < genderEles.length; i++) {
        if (genderEles[i].checked) {
            gender = genderEles[i].value
        }
    }

    // 判断如果页面没有出现任何提示数据并且各个输入框均有输入内容
    let tipEles = document.querySelectorAll('label>p')
    let inputEles = document.querySelectorAll('label>input')

    for (let i = 0; i < tipEles.length; i++) {
        // 如果存在任意一个空白输入框, 则显示提示窗口
        if (inputEles[i].value === '') {
            tipInfoEle.innerText = '表单输入不允许为空!'
            tipEle.classList.add('active')
            return
        }
        // 如果任意一个提示信息出现, 则显示提示窗口
        if (tipEles[i].className) {
            tipInfoEle.innerText = '请检查表单的输入内容!'
            tipEle.classList.add('active')
            return
        }
    }

    // 所有数据通过验证后, 向后端发起请求, 将yoghurt的注册信息存入数据库
    username = usernameEle.value
    password = passwordEle.value
    nickname = nicknameEle.value
    age = ageEle.value

    let option = {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            nickname,
            age,
            gender
        })
    }
    let res = await fetch('http://127.0.0.1:3000/user/register', option)
    let data = await res.json()

    // 如果服务端返回的数据不是错误, 那么注册之后直接跳转至登录页面
    if (data.code) {
        // 注册成功后, 立刻保存用户名至cookie中
        let time = new Date()
        document.cookie = `username=${username};expires=${time.setDate(time.getDate() + 1)}`

        // 显示注册成功信息及网页跳转信息
        tipInfoEle.innerText = '注册成功!3s之后将会跳转至登录页面...'
        tipEle.classList.add('active')
        let timer = setTimeout(() => {
            location.href = './login.html'
            clearTimeout(timer)
        }, 3000)
    } else { // 显示注册失败信息
        tipInfoEle.innerText = data.message
        tipEle.classList.add('active')
    }

}
// !提交表单数据---------

// !关闭提示窗口---------
function handlerCloseTip() {
    tipEle.classList.remove('active')
}
// !关闭提示窗口---------

function handlerKeyup(e) {
    if (e.keyCode === 13) {
        btnEle.dispatchEvent(new Event('click'))
    }
}