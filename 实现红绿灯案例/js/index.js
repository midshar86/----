// 创建一个信号灯, 实现红灯亮3秒, 然后绿灯亮3秒, 然后黄灯亮2秒, 红灯亮3秒...
let btnEle = document.querySelector('.btn')
let lightEle = document.querySelector('.light')

// 创建一个函数用来变更颜色, 并且在一定时间后执行成功
function createLights(color, time) {
    // 先改变灯的颜色
    lightEle.style.backgroundColor = color
    // 返回一个 Promise 对象, 在一定时间后承诺兑现成功
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 承诺兑现成功
            resolve()
        }, time)
    })
}

// 使用.then语法实现
function handlerClickThen() {
    createLights('red', 3000)
        // 注意.then方法中的参数是一个函数
        .then(() => createLights('green', 3000))
        .then(() => createLights('yellow', 2000))
        .then(handlerClickThen)
}

// 使用Async语法实现
async function handlerClickAsy() {
    await createLights('red', 3000)
    await createLights('green', 3000)
    await createLights('yellow', 2000)
    handlerClickAsy()
}

// 为按钮绑定事件
btnEle.addEventListener('click', handlerClickAsy)