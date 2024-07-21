// 获取点击元素header与移动元素div
let headerEle = document.querySelector('#root>header')
let divRootEle = document.getElementById('root')
let btnEle = document.querySelector('#root>button')

// 为点击元素添加事件
headerEle.addEventListener('mousedown', handlerMousedown)
// 为window添加鼠标抬起事件, 防止卡顿
window.addEventListener('mouseup', handlerMoseup)
// 为回放按钮添加事件
btnEle.addEventListener('click', replayPath)
// 为window绑定组合键事件
window.addEventListener('keydown', handlerGroup)

// 存储点击开始时鼠标相对于元素的偏移量
let offsetMouseX, offsetMouseY

// 存放拖拽路径
let posArray = []

// 设置鼠标按下事件
function handlerMousedown(e) {
    // 获取每次按下鼠标按键时点击点相对于最近元素的水平偏移量与垂直偏移量
    offsetMouseX = e.offsetX
    offsetMouseY = e.offsetY

    // 为window添加鼠标移动事件, 防止卡顿
    window.addEventListener('mousemove', handlerMousemove)

    // 在按下时首先记录依次元素偏移距离
    posArray.push({
        x: divRootEle.offsetLeft,
        y: divRootEle.offsetTop
    })
}

// 设置鼠标移动事件
function handlerMousemove(e) {
    // 为元素设置定位的left与top值, 该值等于每次鼠标按下时的偏移量减去按下时鼠标点击点相对于最近元素的偏移量, 这样可以防止元素在点击时出现位移现象
    divRootEle.style.left = e.pageX - offsetMouseX + 'px'
    divRootEle.style.top = e.pageY - offsetMouseY + 'px'

    // 每次移动时记录拖拽路径
    posArray.push({
        x: e.pageX - offsetMouseX,
        y: e.pageY - offsetMouseY
    })

    // 阻止默认文本选择事件
    e.preventDefault()
}

// 当鼠标抬起时, 取消鼠标移动事件
function handlerMoseup(e) {
    // 移除鼠标移动事件
    window.removeEventListener('mousemove', handlerMousemove)

    // 防止元素被拖动到屏幕顶部与左侧
    divRootEle.style.left = parseInt(divRootEle.style.left) < 0 ? '0px' : divRootEle.style.left
    divRootEle.style.top = parseInt(divRootEle.style.top) < 0 ? '0px' : divRootEle.style.top
}

function replayPath() {
    let timeCounter = setInterval(() => {
        // 将存储路径信息的数组从尾部删除, 返回被删除的元素
        let delObj = posArray.pop()
        // 为元素的定位属性赋值
        divRootEle.style.left = delObj.x + 'px'
        divRootEle.style.top = delObj.y + 'px'
        // 数组被清空后, 删除定时器
        if (!posArray.length) {
            clearInterval(timeCounter)
        }
    }, 10)
}

function handlerGroup(e) {
    // 如果同时按下组合键ctrl+b, 执行回放功能
    // if (e.ctrlKey && e.keyCode === 66) {
    //     replayPath()
    // }

    // 如果同时按下组合键ctrl+b, 模拟点击回放按钮, 执行回放
    if (e.ctrlKey && e.keyCode === 66) {
        btnEle.dispatchEvent(new Event('click'))
    }
}