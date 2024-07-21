let prevBtn = document.querySelector('.btns>div:first-child')
let nextBtn = document.querySelector('.btns>div:last-child')
let spanEles = document.querySelectorAll('.pagination>span')
let swiperDivs = document.querySelectorAll('.swiperpage>div')
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
    // 清除所有的class类名, 包括轮播图与下方指示器
    for (let i = 0; i < spanEles.length; i++) {
        swiperDivs[i].classList.remove('active')
        swiperDivs[i].classList.remove('prev')
        spanEles[i].classList.remove('active')
    }
    // 显示当前元素与指示器
    swiperDivs[index].classList.add('active')
    spanEles[index].classList.add('active')

    // 为显示元素添加动画
    // 当元素显示后, 设置元素的透明度为0
    swiperDivs[index].style.opacity = 0
    // 调用动画函数, 将元素设置为不透明
    animationFun(swiperDivs[index], { opacity: 1 })

    // 隐藏前一个元素
    swiperDivs[prevIndex].classList.add('prev')
    console.log(index,prevIndex)
}