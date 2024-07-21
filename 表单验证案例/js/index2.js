// 获取所有的输入框元素
let inputEles = document.querySelectorAll('#register>div>input')

let btn = document.getElementById('clickTo')

// 建立提示数组
let tipsInfo = ['请输入纯英文昵称', '请输入11位电话号码', '请输入字母开头的6~20位邮箱名,邮箱名可以由数字、字母、下划线构成', '请输入由数字、大小写字母组成的高强度密码', '请再次输入密码']
let tipsInfos = ['请输入5~8位纯英文用户名', '请检查您输入的电话号码是否是11位数', '您输入的邮箱有误', '您输入的密码有误', '请再次输入密码']

// 建立正则表达式
// 验证用户名
let userName_reg = /^([a-z]|[A-Z]){5,8}$/
// 验证电话号码
let telephone_reg = /^\d{11}$/
// 验证邮箱地址
let email_reg = /^([a-z]|[A-Z])\w{5,19}@([a-z]|\d|[A-Z])+\.[a-z]+/
// 验证密码
let psw_reg = /(\d+[a-z]+[A-Z]+)|(\d+[A-Z]+[a-z]+)|([a-z]+\d+[A-Z]+)|([a-z]+[A-Z]+\d+)|([A-Z]+[a-z]+\d+)|([A-Z]+\d+[a-z]+)/

// 创建正则表达式数组
let regArray = [userName_reg, telephone_reg, email_reg, psw_reg, psw_reg]

// 为每一个输入框添加焦点事件
for (let i = 0; i < inputEles.length; i++) {
    inputEles[i].addEventListener('focus', handlerFocus)
    inputEles[i].addEventListener('blur', function () {
        let nextSibling = this.nextElementSibling
        // 当密码框1不为空并且密码框2与密码框1密码不同时
        // 或者当密码框2不为空且密码框1与密码框2密码不同时
        if ((i === 4 && inputEles[3].value) || (i === 3 && inputEles[4].value)) {
            if (inputEles[3].value !== inputEles[4].value) {
                alert('两次输入的密码不一致！')
                inputEles[3].value = ''
                inputEles[4].value = ''
            }
        }
        if (!regArray[i].test(inputEles[i].value)) {
            this.style.border = '2px solid red'
            nextSibling.innerText = tipsInfos[i]
            nextSibling.style.color='red'
        } else {
            this.style.border = '2px solid green'
            nextSibling.style.visibility = 'hidden'
        }
    })
    // 将提示数组中的值添加为自定义属性
    inputEles[i].nextElementSibling.dataset.tip = tipsInfo[i]
}

btn.addEventListener('click', handlerClick)

function handlerFocus(e) {
    // 获取输入框的兄弟元素
    let nextSibling = this.nextElementSibling
    // 将兄弟元素的内容显示为提示数组中的提示信息
    nextSibling.innerText = nextSibling.dataset.tip
    // 将提示信息显示为可见
    nextSibling.style.visibility = 'visible'
    nextSibling.style.color='#999'
    this.style.border = '2px solid orange'
    
}

function handlerClick() {
    for (let i = 0; i < inputEles.length; i++) {
        if (inputEles[i].nextElementSibling.style.visibility === 'visible' || inputEles[i].value === '') {
            console.log('请检查注册信息!')
            return
        }
    }
    console.log('注册成功!')
}