// todo--------------varity---------------
//#region 
let addCookieEle = document.getElementById('addBtn')
let searchCookieEle = document.getElementById('searchBtn')
let delCookieEle = document.getElementById('delBtn')
//#endregion
// todo--------------varity---------------

// todo--------------function---------------
//#region 
// 处理cookie
function handlerCookie(...argus) {
    // 判断接受到的参数个数, 如果参数个数大于1个, 表示要设置cookie
    if (argus.length > 1) {
        let [key, value, option] = argus
        let date
        // 处理日期格式的有效期参数, 要求传入一个数字, 在该天之后cookie过期
        if (typeof (option) === 'number') {
            if (option) {
                date = new Date()
                date.setDate(date.getDate() + option)
            }
        } else if (option) { // 如果第三个参数有值, 但是并不是数字, 则打印提示信息
            console.error('第三个参数类型错误!应当为一个数字!')
            return
        }

        // 如果传入的有名值对, 则将其存入cookie
        document.cookie = `${key ? key : ''}=${value ? value : ''};expires=${date ? date : ''}`
    } else if (argus.length === 1) {
        // 如果接受到的参数个数为1个, 表示查询cookie
        let [key] = argus
        // 将字符串转换为数组
        let cookieArray = document.cookie.split('; ')
        // 转换为二维数组
        let keyValueArray = cookieArray.map(item => item.split('='))
        // 比对目标key值是否存在数组中
        let res = keyValueArray.filter(item => key === item[0])
        return res.length ? res[0][1] : ''
    }
}

function testAdd() {
    handlerCookie('midshar', 'male')
}

function testSearch() {
    console.log(handlerCookie('midshar'))
}

function testDel() {
    handlerCookie('midshar', null, -1)
}
//#endregion
// todo--------------function---------------

// todo--------------test---------------
//#region 
addCookieEle.addEventListener('click', testAdd)
searchCookieEle.addEventListener('click', testSearch)
delCookieEle.addEventListener('click', testDel)
//#endregion
// todo--------------test---------------