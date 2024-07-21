let inputEles = document.querySelectorAll('.loginInfos>div>p>input')

let registerBtn = document.getElementById('register')

let showOrHiddenEle = document.getElementById('showOrHidden')

let warningEle = document.getElementById('warning')

let warningInfoEle = document.querySelector('#warning>p>span:first-child')

let closeWarningEle = document.querySelector('#warning>p>span:last-child')

for (let i = 0; i < inputEles.length; i++) {
    inputEles[i].addEventListener('focus', handlerFocus)
}

// 为用户名输入框添加失去焦点事件
inputEles[0].addEventListener('blur', handlerUsername)
// 为用户昵称添加失去焦点事件
inputEles[1].addEventListener('blur', handlerNickname)
// 为用户首次输入密码框添加失去焦点事件
inputEles[2].addEventListener('blur', handlerPassword)
// 为用户再次输入密码框添加失去焦点事件
inputEles[3].addEventListener('blur', handlerRePassword)
// 为显示隐藏密码选项设置点击事件
showOrHiddenEle.addEventListener('click', handlerHideOrShowPsw)
// 为关闭弹窗元素添加点击事件
closeWarningEle.addEventListener('click', handlerCloseWarning)
// 为注册按钮绑定点击事件
registerBtn.addEventListener('click', handlerRegister)


// 当输入框获得焦点时, 显示提示文本信息
function handlerFocus() {
    let tipsContainer = this.parentNode.nextElementSibling
    tipsContainer.innerText = this.dataset.info
    tipsContainer.classList.add('focus')
}

// 实现用户名验证
function handlerUsername() {
    let tipsContainer = this.parentNode.nextElementSibling
    let reg = /^[a-z]\w{3,7}$/i
    if (reg.test(this.value)) {
        tipsContainer.classList.remove('focus')
    }
}

// 实现昵称验证
function handlerNickname() {
    let tipsContainer = this.parentNode.nextElementSibling
    let reg = /^\S{4,12}$/
    if (reg.test(this.value)) {
        tipsContainer.classList.remove('focus')
    }
}

// 处理第一次输入的密码验证
function handlerPassword() {
    let count = 0
    let tipsContainer = this.parentNode.nextElementSibling
    let inputPsw = this.value
    if (/[a-z]/.test(inputPsw)) {
        count++
    }
    if (/[A-Z]/.test(inputPsw)) {
        count++
    }
    if (/\d/.test(inputPsw)) {
        count++
    }
    if (count === 3 && inputPsw.length >= 6 && inputPsw.length <= 12) {
        tipsContainer.classList.remove('focus')
    }
}

// 处理再次输入密码验证
function handlerRePassword() {
    let tipsContainer = this.parentNode.nextElementSibling
    if (this.value && this.value === inputEles[2].value) {
        tipsContainer.classList.remove('focus')
    } else if (this.value !== inputEles[2].value) {
        tipsContainer.innerText = '两次密输入码不一致!请重新输入!'
        inputEles[3].value = ''
    }
}

// 处理点击显示隐藏按钮事件
function handlerHideOrShowPsw() {
    if (this.checked) {
        inputEles[2].type = 'text'
        inputEles[3].type = 'text'
    } else {
        inputEles[2].type = 'password'
        inputEles[3].type = 'password'
    }
}

async function handlerRegister() {
    let i, j
    let allTips = document.querySelectorAll('.loginInfos>div>p:last-child')
    for (i = 0; i < allTips.length; i++) {
        if (allTips[i].innerText) {
            break;
        }
    }
    for (j = 0; j < inputEles.length; j++) {
        if (inputEles[j].value === '') {
            break
        }
    }
    // 存在提示语或者某个输入框为空
    if (i < allTips.length || j < inputEles.length) {
        warningEle.classList.add('show')
        return
    }

    let option = {
        url: 'http://localhost:8888/users/register',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            username: inputEles[0].value,
            password: inputEles[2].value,
            rpassword: inputEles[3].value,
            nickname: inputEles[1].value
        }
    }

    let { data } = await axios(option)
    console.log(data)
    switch (data.code) {
        case 0:
        case 5:
        case 401:
            handlerRegisterError(data.message);
            break;
        case 1:
            handlerRegisterSuccess(data.message);
            break
    }
}

function handlerCloseWarning() {
    warningEle.classList.remove('show')
}

function handlerRegisterError(info) {
    warningInfoEle.innerText = info
    warningEle.classList.add('show')
}

function handlerRegisterSuccess(info) {
    warningInfoEle.innerText = info + ' 3秒之后即将跳转至登录页面！'
    warningEle.classList.add('show')
    location.href = './login.html'
}