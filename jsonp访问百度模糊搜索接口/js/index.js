// todo-----------varity-------------
//#region 
// 获取输入框元素
let inputEle = document.querySelector('#root>input')
// 获取渲染列表元素
let listEle = document.getElementById('list')
// 存储定时器
let timer
//#endregion
// todo-----------varity-------------

// todo-----------event-------------
//#region 
// 当用户输入内容时触发事件
inputEle.addEventListener('input', handlerClick)
//#endregion
// todo-----------event-------------

// todo-----------function-------------
//#region 
// 渲染页面函数
function render(data) {
    // 如果返回的查找值为空, 清除数据, 隐藏列表
    if (!data.g) {
        listEle.innerHTML = ''
        listEle.classList.remove('active')
        inputEle.classList.remove('active')
    } else { // 否则, 向页面中渲染数据
        listEle.innerHTML = data.g.map(item => `<li>${item.q}</li>`).join('')
        listEle.classList.add('active')
        inputEle.classList.add('active')
    }
}

function handlerClick() {
    // 清除前一个定时器
    clearTimeout(timer)

    // 如果输入不为空
    if (inputEle.value !== '') {
        // 设置定时器, 在300ms延迟后执行请求
        timer = setTimeout(() => {
            let newScr = document.createElement('script')
            let url =
                `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=${inputEle.value}&req=2&csor=4&pwd=his&cb=render`
            newScr.src = url
            document.body.appendChild(newScr)
            newScr.remove()
        }, 300)
    } else {
        // 输入为空, 主动调用渲染函数
        render({})
    }
}
//#endregion
// todo-----------function-------------