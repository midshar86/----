window.onload = () => {
    // 获取所有的输入框元素
    let inputEles = document.querySelectorAll('.box>p>input')
    // 获取弹窗元素
    let warningEle = document.getElementById('warning')
    // 获取弹窗信息元素
    let warningInfoEle = document.querySelector('#warning>p>span:first-child')
    // 获取关闭弹窗元素
    let closeWarningEle = warningInfoEle.nextElementSibling
    // 获取修改按钮元素
    let changeBtn = document.getElementById('changeUserData')
    // 获取注销登录按钮元素
    let logoutBtn = document.getElementById('logout')

    // 初始化函数
    function init() {
        // 获取本地存储中的用户信息
        let userData = JSON.parse(localStorage.getItem('userData'))
        // 如果存在用户id值, 则利用该id获取用户信息并渲染页面
        if (userData) {
            renderInfo(userData)
        } else { // 否则, 跳转至登录页面
            location.href = './login.html'
        }
        // 将获取到的用户数据存入初始化函数的属性中
        init.saveData = getUserData()
    }

    // 调用初始化函数
    init()

    // 获取用户数据
    function getUserData() {
        let { token, user } = JSON.parse(localStorage.getItem('userData'))
        return {
            token,
            user
        }
    }

    // 渲染页面函数
    async function renderInfo(userData) {
        let { token, user } = userData
        let option = {
            url: 'http://localhost:8888/users/info',
            headers: {
                authorization: token
            },
            params: {
                id: user.id,
            }
        }
        // 获取用户信息
        let { data } = await axios(option)

        // 将获取到的用户信息显示在输入框中
        inputEles[0].value = data.info.username
        inputEles[1].value = data.info.nickname
        inputEles[2].value = data.info.age
        inputEles[3].value = data.info.gender
    }

    // 为昵称输入框添加事件
    inputEles[1].addEventListener('focus', handlerNickname)
    inputEles[1].addEventListener('blur', handlerCheckNickname)
    // 为年龄输入框添加事件
    inputEles[2].addEventListener('focus', handlerAge)
    inputEles[2].addEventListener('blur', handlerCheckAge)
    // 为性别输入框添加事件
    inputEles[3].addEventListener('focus', handlerSex)
    inputEles[3].addEventListener('blur', handlerCheckSex)
    // 为提交修改添加事件
    changeBtn.addEventListener('click', handlerSubmit)
    // 为关闭弹窗元素添加事件
    closeWarningEle.addEventListener('click', handlerCloseWarning)

    // 为注销按钮添加事件
    logoutBtn.addEventListener('click', handlerLogout)

    // 昵称输入框获取焦点时, 显示提示文本
    function handlerNickname() {
        showTips.call(this)
    }

    function handlerCheckNickname() {
        let reg = /^\S{4,12}$/
        if (reg.test(this.value)) {
            this.nextElementSibling.classList.remove('show')
        }
    }

    // 年龄输入框获取焦点时, 显示提示文本
    function handlerAge() {
        showTips.call(this)
    }

    function handlerCheckAge() {
        let reg = /^\d{1,3}$/
        let getAge = this.value === "" ? '' : Number(this.value)
        if (reg.test(getAge)) {
            if (getAge > 120) {
                this.nextElementSibling.innerText = '年龄太大！'
                this.value = ''
                return
            } else if (getAge === 0) {
                this.nextElementSibling.innerText = '您还未出生'
                this.value = ''
                return
            }
            this.nextElementSibling.classList.remove('show')
        }
    }

    // 性别输入框获取焦点时, 显示提示文本
    function handlerSex() {
        showTips.call(this)
    }

    function handlerCheckSex() {
        let getSex = this.value
        let tipsEle = this.nextElementSibling
        switch (getSex) {
            case '男':
            case '女':
                tipsEle.classList.remove('show');
                break;
            case '':
                tipsEle.innerText = '不允许输入为空!'
                break;
            default:
                tipsEle.innerText = '请检查输入的性别!'
                break
        }
    }

    // 显示提示文本都有统一的结构, 在这里使用函数统一处理
    function showTips() {
        let tipsEle = this.nextElementSibling
        tipsEle.innerText = this.dataset.info
        tipsEle.classList.add('show')
    }

    async function handlerSubmit() {
        let i, j
        // 如果没有提示文本出现
        for (i = 0; i < inputEles.length; i++) {
            if (inputEles[i].nextElementSibling.className) {
                break
            }
        }
        // 所有的输入框没有空白
        for (j = 0; j < inputEles.length; j++) {
            if (!(inputEles[j].value)) {
                break
            }
        }

        // 如果上述任意情况意外退出
        if (i < inputEles.length || j < inputEles.length) {
            warningEle.classList.add('show')
            warningInfoEle.innerText = '请检查输入的信息!!'
            return
        }

        // 通过所有验证, 发送请求更改数据
        if (i === 4 && j === 4) {
            let { user, token } = init.saveData
            // 存放更改之后的数据
            let changesData = {}

            // 对比更改前后的数据是否一致
            let originUserData = {
                nickname: user.nickname,
                age: user.age,
                gender: user.gender
            }
            let changeAfterData = {
                nickname: inputEles[1].value,
                age: inputEles[2].value,
                gender: inputEles[3].value
            }

            for (let prop in originUserData) {
                if (originUserData[prop] !== changeAfterData[prop]) {
                    changesData[prop] = changeAfterData[prop]
                }
            }

            // 如果没有更改任何数据. 返回
            if (JSON.stringify(changesData).length === 2) {
                // 未改变任何数据
                return
            }

            // 否则, 执行请求
            let option = {
                url: 'http://localhost:8888/users/update',
                method: 'post',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': token
                },
                data: {
                    id: user.id,
                    ...changesData
                }
            }

            await axios(option)
            alert('用户信息修改成功!')
        }
    }

    function handlerCloseWarning() {
        warningEle.classList.remove('show')
    }

    // 实现注销功能
    async function handlerLogout() {
        let { id } = init.saveData.user
        let option = {
            url: 'http://localhost:8888/users/logout',
            params: {
                id
            }
        }
        let { data } = await axios(option)
        switch (data.code) {
            case 0:
            case 5:
            case 401:
                handlerFailed(data.message);
                break;
            case 1:
                // 注销成功, 删除本地存储的用户信息, 并且跳转至登陆页面
                localStorage.removeItem('userData');
                location.href = './login.html'
                break;
        }

    }

    // 失败处理函数
    function handlerFailed(getData) {
        warningInfoEle.innerText = getData
        warningEle.classList.add('show')
    }
}