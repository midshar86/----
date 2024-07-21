let prevBtn = document.querySelector('.btns>div:first-child')
let nextBtn = document.querySelector('.btns>div:last-child')
let spanEles = document.querySelectorAll('.pagination>span')
let swiperDivs = document.querySelectorAll('.swiperpage>div')
let container = document.querySelector('.swiperpage')
// 存储本次点击的位置
let index = 0
// 记录上一次点击的位置
let prevIndex

// 为后退按钮添加事件
prevBtn.addEventListener('click', handlerPrev)
// 前进按钮添加事件
nextBtn.addEventListener('click', handlerNext)
// 为分页器添加事件
for (let i = 0; i < spanEles.length; i++) {
    spanEles[i].addEventListener('mouseover', handlerPagination)
}

// 处理后退按钮的事件
function handlerPrev() {
    // 记录上一次点击的位置
    prevIndex = index
    // 如果index为0, 轮播从最大值继续开始
    if (!index) {
        index = spanEles.length - 1
    } else { // 否则, 继续向前轮播
        index--
    }
    handlerChange()
}

// 处理前进按钮的事件
function handlerNext() {
    // 记录上一次点击的位置
    prevIndex = index
    // 如果index为4, 轮播从最小值继续开始
    if (index === spanEles.length - 1) {
        index = 0
    } else { // 否则, 继续向前轮播
        index++
    }
    handlerChange()
}

// 处理分页器的事件
function handlerPagination() {
    // 获取此次点击元素的下标
    let findIndex = getIndex(spanEles, this)
    // 如果此次点击获取的下标与原index值相同, 则返回
    if (findIndex === index) {
        return false
    }
    // 记录上一次点击的位置
    prevIndex = index
    // 否则, 将此次获取的下标赋值给index
    index = findIndex
    handlerChange()
}

// 获取下标函数
function getIndex(datas, target) {
    for (let i = 0; i < datas.length; i++) {
        if (target === datas[i]) {
            return i
        }
    }
    return -1
}

// 在获取好index值之后
function handlerChange() {
    // 获取单个轮播图的宽度
    let containerLeft = swiperDivs[0].offsetWidth
    // 为容器设置动画, 让容器的左偏移量为单个轮播图的宽度*轮播图的下标
    animationFun(container, { left: -containerLeft * index })
    // 清除指示器的类名
    for (let i = 0; i < spanEles.length; i++) {
        spanEles[i].classList.remove('active')
    }
    // 为当前指示器添加样式
    spanEles[index].classList.add('active')
}