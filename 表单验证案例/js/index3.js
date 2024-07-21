// todo ----------------------变量区----------------------
//#region 
// 获取所有的输入框元素
let inputEles = document.querySelectorAll('#register>div>input')
// 建立提示信息
let tipsInfo = ['请输入纯英文昵称', '请输入11位电话号码', '请输入字母开头的6~20位邮箱名,邮箱名可以由数字、字母、下划线构成', '请输入由数字、大小写字母组成的高强度密码', '请再次输入密码']
// 获取用户名输入框
let userName = document.getElementById('username')
// 获取电话输入框
let phoneNum = document.getElementById('tele')
// 获取邮箱输入框
let emailEle = document.getElementById('email')
// 获取首次密码输入
let pswEle = document.getElementById('psw')
// 获取密码再次输入
let pswAgainEle = document.getElementById('psw_2')
// 获取选择按钮
let selectBtns = document.querySelectorAll('#tip>p>span')
// 获取弹出框
let tipEle = document.getElementById('tip')
// 获取注册按钮
let registerBtn = document.getElementById('clickTo')
//#endregion
// todo ----------------------变量区----------------------

// todo ----------------------事件区----------------------
//#region 
// 遍历所有的input对象, 并添加焦点事件
for (let i = 0; i < inputEles.length; i++) {
    inputEles[i].addEventListener('focus', handlerFocus)
    // 同时为每个兄弟DOM节点添加自定义属性, 放入提示信息
    inputEles[i].nextElementSibling.dataset.tip = tipsInfo[i]
}

// 为错误弹出框按钮绑定点击事件
for (let i = 0; i < selectBtns.length; i++) {
    selectBtns[i].addEventListener('click', handlerCancer)
}

userName.addEventListener('blur', handlerNameCheck)
phoneNum.addEventListener('blur', handlerPhoneNumCheck)
emailEle.addEventListener('blur', handlerEmailCheck)
pswEle.addEventListener('blur', handlerPasswordCheck)
pswAgainEle.addEventListener('blur', handlerPasswordCheckAgain)
registerBtn.addEventListener('click', handlerClickToRegister)
//#endregion
// todo ----------------------事件区----------------------

// todo ----------------------函数功能区----------------------
//#region 
// 输入框的焦点事件
function handlerFocus() {
    let nextSiblingEle = this.nextElementSibling
    nextSiblingEle.style.visibility = 'visible'
    nextSiblingEle.style.color = '#888'
    nextSiblingEle.innerText = nextSiblingEle.dataset.tip
    this.style.borderColor = 'orange'
}

// 验证用户名
function handlerNameCheck() {
    // 只允许输入纯英文
    let reg = /^[a-z]+$/i
    // 验证成功
    if (reg.test(this.value)) {
        checkInfo('success', userName)
    } else { // 验证失败
        checkInfo('failed', userName, '请检查您的用户名信息是否是纯英文!')
    }
}

// 验证电话号码
function handlerPhoneNumCheck() {
    let reg = /^1[3-9]\d{9}$/
    if (reg.test(this.value)) {
        checkInfo('success', phoneNum)
    } else {
        checkInfo('failed', phoneNum, '请检查您输入的电话号码, 必须以1开头,第二位数字非0~2')
    }
}

// 验证邮箱
function handlerEmailCheck() {
    let reg = /^[a-z]\w{5,19}@\w{2,20}\.[a-z]+/i
    if (reg.test(this.value)) {
        checkInfo('success', emailEle)
    } else {
        checkInfo('failed', emailEle, '请检查您输入的邮箱地址!重新输入!')
    }
}

// 验证首次密码强度
function handlerPasswordCheck() {
    // 在输入第一个密码框时, 如果第二个密码框有输入, 则清空
    pswAgainEle.value = ''
    // 根据正则判断密码
    let flag = checkPassword(pswEle)
    if (flag === 3) {
        checkInfo('success', pswEle)
    } else {
        checkInfo('failed', pswEle, '请检查密码是否符合规则!密码必须包含大小写字母及数字!')
    }
}

// 再次验证密码强度
function handlerPasswordCheckAgain() {
    // 根据正则判断密码
    let flag = checkPassword(pswAgainEle)
    if (flag === 3) {
        checkInfo('success', pswAgainEle)
    } else {
        checkInfo('failed', pswAgainEle, '请检查密码是否符合规则!密码必须包含大小写字母及数字!')
    }
    // 如果第一个密码框不为空, 则判断是否与第二个密码框密码一致
    if (pswEle.value !== '') {
        // 如果密码不一致, 显示错误框
        if (pswEle.value !== pswAgainEle.value) {
            tipEle.style.visibility = 'visible'
            this.style.borderColor = 'red'
            this.nextElementSibling.style.color = 'red'
            inputEles[3].style.borderColor = 'red'
            // 同时将密码框信息清空
            pswEle.value = ''
            pswAgainEle.value = ''
        }
    }
}

// 提取函数, 实现验证成功与验证失败时的样式更改
function checkInfo(type, dom, info) {
    // 获取当前输入框的兄弟节点
    let nextEle = dom.nextElementSibling
    // 如果验证成功
    if (type === 'success') {
        dom.style.borderColor = 'green'
        nextEle.style.visibility = 'hidden'
    } else if (type === 'failed') {
        // 验证失败
        dom.style.borderColor = 'red'
        nextEle.style.color = 'red'
        nextEle.innerText = info
    }
}

// 判断密码强度
function checkPassword(dom) {
    // 创建计数器, 判断密码中有几种类型的值
    let flag = 0
    // 判断密码中是否存在数字
    let hasNum = /\d/
    // 判断密码中是否存在大写字母
    let hasUpperChar = /[A-Z]/
    // 判断密码中是否存在小写字母
    let hasLowerChar = /[a-z]/

    // 只要符合任意一种情况, 计数器+1
    if (hasNum.test(dom.value)) {
        flag++
    }
    if (hasLowerChar.test(dom.value)) {
        flag++
    }
    if (hasUpperChar.test(dom.value)) {
        flag++
    }
    // 返回计数器
    return flag
}

// 当点击确定或者取消时, 隐藏错误弹出框
function handlerCancer() {
    tipEle.style.visibility = 'hidden'
}

// 点击注册
function handlerClickToRegister() {
    // 获取所有的提示标签
    let labels = document.querySelectorAll('label')
    // 遍历提示标签, 如果有任意标签仍然存在提示,则注册失败
    for (let i = 0; i < labels.length; i++) {
        // 如果有未点击的输入框未输入信息, 则注册失败
        if (labels[i].style.visibility !== 'hidden' || !inputEles[i].value) {
            // 让光标移动到未通过验证的输入框中
            inputEles[i].focus()
            console.log('注册失败!请检查注册信息!')
            return
        }
    }
    // 否则注册成功
    console.log('注册成功!')
}
//#endregion
// todo ----------------------函数功能区----------------------