// 我的思路

// 获取点击元素header与移动元素div
let headerEle = document.querySelector('#root>header')
let divRootEle = document.getElementById('root')

// 为点击元素添加事件
headerEle.addEventListener('mousedown', handlerMousedown)
// 将鼠标抬起事件添加给window, 防止卡顿带来的负面效应
window.addEventListener('mouseup', handlerMoseup)

// 存储点击开始时元素的行内样式所载明的偏移量
let oringinX, oringinY

// 元素点击时鼠标指针的水平偏移量与垂直偏移量
let initClickX, initClickY

// 点击元素后鼠标移动的水平距离与垂直距离
let moveX, moveY

// 获取元素的边框宽度
let divRootEleLeftBorder = divRootEle.clientLeft
let divRootEleTopBorder = divRootEle.clientTop

// 设置鼠标按下事件
function handlerMousedown(e) {
    // 点击鼠标时, 记录元素的初始偏移量, 如果此时行内样式没有值, 则将初始偏移量记录为0
    oringinX = parseInt(divRootEle.style.left) || 0
    oringinY = parseInt(divRootEle.style.top) || 0

    // 点击鼠标时, 获取点击点的水平位置与垂直位置
    initClickX = e.pageX
    initClickY = e.pageY

    // 在用户点击按键的情况下再移动鼠标, 将鼠标移动事件添加到window中,防止卡顿
    window.addEventListener('mousemove', handlerMousemove)
}

// 设置鼠标移动事件
function handlerMousemove(e) {
    // 获取当前鼠标移动位置相对于点击时的偏移量
    moveX = e.pageX - initClickX
    moveY = e.pageY - initClickY

    // 设置元素的定位属性为初始偏移量加上当前鼠标移动的偏移量
    divRootEle.style.left = oringinX + moveX + 'px'
    divRootEle.style.top = oringinY + moveY + 'px'
}

// 当鼠标抬起时, 取消鼠标移动事件
function handlerMoseup() {
    window.removeEventListener('mousemove', handlerMousemove)

    // 获取当前元素的left与top定位属性值
    oringinX = parseInt(divRootEle.style.left)
    oringinY = parseInt(divRootEle.style.top)

    // 防止元素被拖到窗口顶部与左侧之外
    divRootEle.style.left = oringinX < 0 ? 0 : (oringinX + 'px')
    divRootEle.style.top = oringinY < 0 ? 0 : (oringinY + 'px')
}