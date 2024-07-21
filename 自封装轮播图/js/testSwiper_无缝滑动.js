let prevBtn = document.querySelector('.btns>div:first-child')
let nextBtn = document.querySelector('.btns>div:last-child')
let spanEles = document.querySelectorAll('.pagination>span')
let swiperDivs = document.querySelectorAll('.swiperpage>div')
let container = document.querySelector('.swiperpage')
let rootDiv = document.querySelector('.root')
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
    if (index === 0) {
        index = swiperDivs.length - 1
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
    if (index === swiperDivs.length - 1) {
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

    // 如果时向后点击, 当前轮播图为下标为0,前一个下标在末尾
    if (index === 0 && prevIndex === swiperDivs.length - 1) {
        // 瞬移至第一张轮播图
        container.style.left = 0 + 'px'
        prevIndex = index
        // 然后下标自增1
        index++
    }
    // 如果是向前点击
    if (index === swiperDivs.length - 1 && prevIndex === 0) {
        // 顺移至末尾
        container.style.left = -containerLeft * index + 'px'
        prevIndex = index
        // 然后下标自减1
        index--
    }

    // 添加滑动动画效果
    animationFun(container, { left: -containerLeft * index })

    // 清除指示器的所有类名
    for (let i = 0; i < swiperDivs.length; i++) {
        // 因为轮播图数量比指示器数量多1， 所以要减去1
        if (i < swiperDivs.length - 1) {
            spanEles[i].classList.remove('active')
        }
    }

    // 为指示器添加样式
    // 判断如果点击下标为末尾复制的元素， 则点亮第一个指示器
    if (index === swiperDivs.length - 1) {
        spanEles[0].classList.add('active')
    } else {
        spanEles[index].classList.add('active')
    }
}

// 设置自动轮播功能
function autoPlay() {
    return setInterval(() => {
        // 使用虚拟触发事件
        nextBtn.dispatchEvent(new Event('click'))
    }, 2000)
}
// 当页面打开后, 自动进行轮播
let resTime = autoPlay()

// 当鼠标移入时, 停止轮播
rootDiv.addEventListener('mouseenter', () => {
    clearInterval(resTime)
})

// 当鼠标移开后, 继续轮播
rootDiv.addEventListener('mouseleave', () => {
    resTime = autoPlay()
})