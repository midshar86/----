// todo -------------------变量区-------------------
//#region 
// 获取对应的元素
let inputEles = document.querySelectorAll('div>input')
let labelEles = document.querySelectorAll('div>label')
let btn = document.getElementById('clickTo')

btn.addEventListener('click', handlerClick)
//#endregion
// todo -------------------变量区-------------------

// todo -------------------建立正则-------------------
//#region
// 建立用户名规则：只允许输入纯英文, 并且长度只能为5~8位数
let userName_regExp = /^([a-z]|[A-Z]){5,8}$/
// 建立电话号码规则: 只允许输入13位数字
let tele_regExp = /^\d{11}$/
// 建立邮箱规则: 邮箱名遵循特定格式, 并且可以由数字字母下划线组成
let email_regExp = /^\w+@([0-9]|[a-z]|[A-Z])+.([a-z]|[A-Z])+$/
// 建立密码规则: 密码必须由数字和大小写字母构成
let psw_regExp1 = /\d+/
let psw_regExp2 = /[a-z]+/
let psw_regExp3 = /[A-Z]+/

// 创建一个数组用来存放正则信息
let regArray = [userName_regExp, tele_regExp, email_regExp]
//#endregion
// todo -------------------建立正则-------------------

// todo -------------------函数区-------------------
//#region 
function handlerClick() {
    // 创建一个计数器, 当用户填写的信息与正则匹配时加1
    let trueCount = 0
    // 遍历前三个用户输入的内容与前三个正则匹配, 若每个信息都匹配成功, 循环结束后计数器值为3
    for (let i = 0; i < 3; i++) {
        if (regArray[i].test(inputEles[i].value)) {
            // 与正则匹配成功, 隐藏提示信息, 边框显示橙色
            trueCount++
            labelEles[i].style.visibility = 'hidden'
            inputEles[i].style.border = '2px solid orange'
        } else {
            // 与正则匹配失败, 对应输入框显示提示词, 并且边框显示红色
            labelEles[i].style.visibility = 'visible'
            inputEles[i].style.border = '2px solid red'
        }
    }

    // 获取第一次输入的密码信息与第二次输入的密码信息
    let pswInput1 = inputEles[3].value
    let pswInput2 = inputEles[4].value
    // 两次输入密码不一致
    if (pswInput1 !== pswInput2) {
        alert('两次输入的密码不一致,请重新输入!')
        inputEles[3].value = ''
        inputEles[4].value = ''
        // 改变边框颜色
        inputEles[3].style.border = '2px solid red'
        inputEles[4].style.border = '2px solid red'
    } else {
        // 密码输入一致, 则判断是否符合正则

        // 如果符合正则
        if (psw_regExp1.test(pswInput1) && psw_regExp2.test(pswInput1) && psw_regExp3.test(pswInput1)) {
            inputEles[3].style.border = '2px solid orange'
            inputEles[4].style.border = '2px solid orange'
            trueCount += 2
            labelEles[3].style.visibility = 'hidden'
            labelEles[4].style.visibility = 'hidden'

        } else if (!pswInput1) {
            alert('密码不允许为空!')
        } else {
            // 不符合正则则显示提示词
            labelEles[3].style.visibility = 'visible'
            labelEles[4].style.visibility = 'visible'
            inputEles[3].style.border = '2px solid red'
            inputEles[4].style.border = '2px solid red'
        }
    }
    // 如果核对正确的信息数量为输入框个数, 则注册成功
    if (trueCount === inputEles.length) {
        console.log('注册成功')
    }
}
//#endregion
// todo -------------------函数区-------------------