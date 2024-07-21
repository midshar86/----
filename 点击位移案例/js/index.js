// 获取目标元素
let divBox = document.getElementsByClassName('box')[0]

// 获取元素的宽度与高度
let boxWidth = divBox.offsetWidth
let boxHeight = divBox.offsetHeight
// 为可视窗口添加点击事件
document.addEventListener('click', handlerClick)

function handlerClick(evt) {
    // 设置事件对象兼容性
    evt = evt || event
    // 获取点击区域的偏移量, 并且让元素中心位于点击处
    let _posLeft = evt.clientX - boxWidth / 2
    let _posTop = evt.clientY - boxHeight / 2
    // 不允许元素超过可视窗口区域
    _posLeft = evt.clientX < (boxWidth / 2) ? 0 : (evt.clientX > (innerWidth - boxWidth / 2) ? (innerWidth - boxWidth) : _posLeft)
    _posTop = evt.clientY < (boxHeight / 2) ? 0 : (evt.clientY > (innerHeight - boxHeight / 2) ? (innerHeight - boxHeight) : _posTop)
    // 为元素设置水平偏移量与垂直偏移量
    divBox.style.left = _posLeft + 'px'
    divBox.style.top = _posTop + 'px'
}