window.onload = function () {
    // 获取输入框元素
    let userNameEle = document.getElementById('username')
    let passwordEle = document.getElementById('password')

    // 获取显示隐藏按钮元素
    let showOrHiddenEle = document.getElementById('showOrHidden')

    // 获取提示信息元素
    let tipsEle = document.querySelectorAll('.loginInfos>div>p:last-child')

    // 获取提示信息的样式
    let tipsOneStyle = getComputedStyle(tipsEle[0])
    let tipsTwoStyle = getComputedStyle(tipsEle[1])

    // 获取警告弹窗元素
    let warningEle = document.getElementById('warning')

    // 获取警告信息元素
    let warningInfosEle = document.querySelector('#warning>p>span:first-child')

    // 获取关闭警告弹窗元素
    let closeWarningEle = document.querySelector('#warning>p>span:last-child')

    // 获取登录按钮与注册按钮
    let loginBtn = document.getElementById('login')
    let registerBtn = document.getElementById('register')

    // 为登录按钮绑定事件
    loginBtn.addEventListener('click', handlerLogin)

    // 为输入框绑定聚焦事件
    userNameEle.addEventListener('focus', handlerTipsInfo)
    passwordEle.addEventListener('focus', handlerTipsInfo)
    // 为输入框绑定失去焦点事件
    userNameEle.addEventListener('blur', handlerUserName)
    passwordEle.addEventListener('blur', handlerPassword)
    // 为显示隐藏按钮添加点击事件
    showOrHiddenEle.addEventListener('click', handlerShowOrHiddenPsw)

    // 为关闭警告弹窗按钮添加事件
    closeWarningEle.addEventListener('click', handlerCloseWarning)
    // 为注册按钮添加事件
    registerBtn.addEventListener('click', handlerRegister)

    // 聚焦输入框时显示出提示文字
    function handlerTipsInfo() {
        let siblingEle = this.parentNode.nextElementSibling
        siblingEle.innerText = this.dataset.info
        siblingEle.classList.add('focus')
    }

    // 验证用户名格式, 当用户输入的用户名匹配设定的格式时, 不再显示提示文字
    function handlerUserName() {
        let siblingEle = this.parentNode.nextElementSibling
        let reg = /^[a-z](\w){3,7}$/i
        if (reg.test(userNameEle.value)) {
            siblingEle.classList.remove('focus')
        }
    }

    // 验证密码格式, 当用户输入的密码匹配设定的格式时, 不再显示提示文字
    function handlerPassword() {
        let count = 0
        let passwordVal = passwordEle.value
        let siblingEle = this.parentNode.nextElementSibling
        if (/[a-z]/.test(passwordVal)) {
            count++
        }
        if (/[A-Z]/.test(passwordVal)) {
            count++
        }
        if (/[0-9]/.test(passwordVal)) {
            count++
        }
        // 当用户输入的密码中包含大小写英文字母以及数字时, 并且密码长度在6~12位数时, 不再显示提示文本
        if (passwordVal.length >= 6 && passwordVal.length <= 12 && count === 3) {
            siblingEle.classList.remove('focus')
        }
    }

    // 登录功能
    async function handlerLogin() {
        console.log(tipsOneStyle.visibility, tipsTwoStyle.visibility)
        if (tipsOneStyle.visibility === 'visible' || tipsTwoStyle.visibility === 'visible' || !userNameEle.value || !passwordEle.value) {
            // 当提示信息为可见状态时, 说明用户的数据未通过校验, 此时不允许登录
            warningEle.classList.add('show')
            return
        }

        let username = userNameEle.value
        let password = passwordEle.value
        let option = {
            url: 'http://localhost:8888/users/login',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                username,
                password
            }
        }
        let res = await axios(option)

        switch (res.data.code) {
            case 0:
            case 5:
            case 401:
                warningEle.classList.add('show')
                warningInfosEle.innerText = res.data.message
                break;
            case 1:
                // 登录成功, 在本地存储中存储用户信息
                localStorage.setItem('userData', JSON.stringify(res.data))
                // 登录成功, 跳转至用户中心
                // alert('登录成功!')
                location.href = './userSapce.html';
                break;
        }
    }

    // 设置关闭弹窗按钮事件
    function handlerCloseWarning() {
        warningEle.classList.remove('show')
    }

    // 设置显示隐藏按钮事件
    function handlerShowOrHiddenPsw() {
        if (this.checked) {
            passwordEle.type = 'text'
        } else {
            passwordEle.type = 'password'
        }
    }

    // 执行注册跳转
    function handlerRegister() {
        location.href = './register.html'
    }
}