window.onload = function () {
    let inputEles = document.querySelectorAll('.box>p>input')
    let changePswEle = document.getElementById('changeUserPsw')
    let warningEle = document.getElementById('warning')
    let warningInfoEle = document.querySelector('#warning>p>span:first-child')
    let closeWarningEle = warningInfoEle.nextElementSibling

    // 为旧密码输入框添加事件
    inputEles[1].addEventListener('focus', handlerOldPsw)
    inputEles[1].addEventListener('blur', handlerCheckOldPsw)
    // 为首次输入密码框添加事件
    inputEles[2].addEventListener('focus', handlerPassword)
    inputEles[2].addEventListener('blur', handlerCheckPassword)
    // 为再次输入密码框添加事件
    inputEles[3].addEventListener('focus', handlerRepassword)
    inputEles[3].addEventListener('blur', handlerCheckRepassword)

    changePswEle.addEventListener('click', handlerChangePsw)
    closeWarningEle.addEventListener('click', handlerCloseWarning)

    function init() {
        let userData = JSON.parse(localStorage.getItem('userData'))
        if (!userData) {
            location.href = './login.html'
            return
        }

        init.savaData = userData
        console.log(init.savaData)

        renderPage()
    }
    init()

    // 渲染页面结构
    function renderPage() {
        inputEles[0].value = init.savaData.user.username
    }

    // 输入旧密码框获取焦点时, 显示提示文本
    function handlerOldPsw() {
        // 改变原函数的this指向为输入框
        showTips.call(this)
    }

    function handlerCheckOldPsw() {
        if (this.value) {
            this.nextElementSibling.classList.remove('show')
        }
    }

    // 首次输入密码框获取焦点时, 显示提示文本
    function handlerPassword() {
        // 改变原函数的this指向为输入框
        showTips.call(this)
    }

    function handlerCheckPassword() {
        let count = 0
        if (/[0-9]/.test(this.value)) {
            count++
        }
        if (/[a-z]/.test(this.value)) {
            count++
        }
        if (/[A-Z]/.test(this.value)) {
            count++
        }
        if (count === 3) {
            this.nextElementSibling.classList.remove('show')
        }
    }

    // 再次输入密码框获取焦点时, 显示提示文本
    function handlerRepassword() {
        showTips.call(this)
    }

    function handlerCheckRepassword() {
        let tipsEle = this.nextElementSibling
        if (this.value === inputEles[2].value && this.value) {
            tipsEle.classList.remove('show')
        }
        if (this.value !== inputEles[2].value) {
            tipsEle.innerText = '两次输入密码不一致！请重新输入！'
            this.value = ''
        }
    }

    // 判断两次密码输入是否一致
    if (inputEles[2].value !== inputEles[3].value) {
        warningEle.classList.add('show')
        warningInfoEle.innerText = '两次密码输入不一致!'
        inputEles[2].value = ''
        inputEles[3].value = ''
        return
    }

    // 显示提示文本都有统一的结构, 在这里使用函数统一处理
    function showTips() {
        let tipsEle = this.nextElementSibling
        tipsEle.innerText = this.dataset.info
        tipsEle.classList.add('show')
    }

    async function handlerChangePsw() {
        let { token, user } = init.savaData
        if (inputEles[2].value !== inputEles[3].value) {
            warningInfoEle.innerText = '两次密码输入不一致!'
            warningEle.classList.add('show')
            inputEles[2].value = ''
            inputEles[3].value = ''
            return
        }

        let params = {
            url: 'http://localhost:8888/users/rpwd',
            method: 'post',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                authorization: token
            },
            data: {
                id: user.id,
                oldPassword: inputEles[1].value,
                newPassword: inputEles[2].value,
                rNewPassword: inputEles[3].value
            }
        }

        let { data } = await axios(params)
        switch (data.code) {
            case 0:
            case 5:
            case 401:
                warningInfoEle.innerText = data.message
                warningEle.classList.add('show');
                break;
            case 1:
                alert('密码修改成功!');
                break

        }
    }

    function handlerCloseWarning() {
        warningEle.classList.remove('show')
    }
}