// todo-------------------变量获取区-----------------------
//#region 
let btnEle = document.getElementById('btn')
let btnvEle = document.getElementById('btnv')
let btnpvEle = document.getElementById('btnpv')
let contEle = document.querySelector('.cont')
//#endregion
// todo-------------------变量获取区-----------------------

// todo-------------------函数功能区-----------------------
//#region 
// 封装一个ajax方法, 传入参数为一个对象, 对象中包含method方法、url请求地址、search查询参数(对象格式, 包含name与age属性)
function myAjax(data) {
    let {
        // 指定请求方法
        method,
        // 指定请求路径
        url,
        // 指定查询字段
        search,
        // 指定回调函数
        callback,
        // 指定响应请求的数据格式
        responseType
    } = {
        // 为method设置默认方法为get
        method: 'get',
        // 设置默认回调函数为空
        callback: () => { },
        // 默认格式为转换为json
        responseType: 'json',
        // 合并传入的参数
        ...data
    }

    // 如果需要带参数的查询, 处理字符串
    let str = ''
    if (search) {
        // 调用字符串处理函数
        str = handlerString(search)
    }

    // 新建请求
    let xhr = new XMLHttpRequest()

    // 如果方法为get并且携带有参数
    if (method.toLowerCase() === 'get' && search) {
        // 将参数以key=value的形式拼接在?结尾的原始url末尾
        url += '?' + str
    }

    // 发送请求
    xhr.open(method, url)

    // 如果方法为post并且携带有参数
    if (method.toLowerCase() === 'post' && search) {
        // 设置请求头
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        // 将参数以key=value的形式放在send方法中
        xhr.send(str)
    } else {
        xhr.send()
    }
    // 返回 Promise 对象包装异步响应请求, 可以不再调用回调函数, 而是使用 .then 或者 async 方法处理请求的响应数据
    return new Promise((resolve, reject) => {
        xhr.onload = function () {
            switch (responseType) {

                // 如果需要纯文本类型的数据
                case 'text':
                    callback(xhr.responseText);
                    // 响应成功, 将响应数据作为Promise对象的状态值
                    resolve(xhr.responseText)
                    break;

                // 如果需要json格式的数据
                case 'json':
                    try {
                        callback(JSON.parse(xhr.responseText));
                        // 将响应数据作为Promise对象的状态值
                        resolve(JSON.parse(xhr.responseText))
                    } catch (e) {
                        callback(xhr.responseText);
                        // 将响应数据作为Promise对象的状态值
                        resolve(xhr.responseText)
                    }
                    break;
            }
        }
    })
}
// 处理字符串函数, 如果有参数传递, 则将参数转换成key=value的形式
function handlerString(data) {
    let str = ''
    for (let key in data) {
        str += `${key}=${data[key]}&`
    }
    // 去除末尾的&字符
    str = str.slice(0, str.length - 1)
    return str
}
//#endregion
// todo-------------------函数功能区-----------------------

// todo-------------------事件处理函数-----------------------
//#region 
// 使用 .then 语法获取请求响应的数据
function handlerRequestGet() {
    let option = {
        url: 'http://localhost:8888/test/first',
        responseType: 'text'
    }
    // ! .then后面的回调函数接收的参数是 Promise 对象中成功或者失败后传递的状态值
    myAjax(option).then(res => contEle.innerHTML = res)
}

// 使用 async 语法获取异步请求响应的数据
async function handlerRequestGetValue() {
    let option = {
        url: 'http://localhost:8888/test/second',
        search: {
            name: 'midshar',
            age: 888
        }
    }
    let res = await myAjax(option)
    console.log(res)
}

// 使用 async 语法获取异步请求响应的数据
async function handlerRequestPostPostValue() {
    let option = {
        method: 'post',
        url: 'http://localhost:8888/test/fourth',
        search: {
            name: 'midshar',
            age: 666
        }
    }
    let res = await myAjax(option)
    console.log(res)
}
//#endregion
// todo-------------------事件处理函数-----------------------

// todo-------------------事件绑定区-----------------------
//#region 
btnEle.addEventListener('click', handlerRequestGet)
btnvEle.addEventListener('click', handlerRequestGetValue)
btnpvEle.addEventListener('click', handlerRequestPostPostValue)
//#endregion
// todo-------------------事件绑定区-----------------------