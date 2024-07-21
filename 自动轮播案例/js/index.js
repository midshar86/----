let divRoot = document.getElementById('root')
let divHead = document.getElementById('head')
let divContent = document.getElementById('content')
let spanEles = divHead.children
let divEles = divContent.children
let isKeyDown = false

// 初始化播放位置与定时器返回值
let count = 0,
    resTimeCount

// 创建一个渐变颜色数组, 为内容区添加背景色
let colorsArray = ['#7514b3,#ee617c', '#fc5f3a,#ebc360', '#38a066,#23e6c4', '#2E3192,#1bffff',
    '#009245,#FCEE21', '#00A8C5,#FFFF7E', '#FCA5F1,#B5FFFF'
]

// 为点击源与展示内容区创建自定义属性并且为点击源绑定事件
for (let i = 0; i < spanEles.length; i++) {
    spanEles[i].dataset.index = i
    divEles[i].dataset.index = i
    divEles[i].style.background = `linear-gradient(to right top,${colorsArray[i]})`
    spanEles[i].addEventListener('click', handlerClick)
}

// 为播放区添加鼠标移入与离开事件
divRoot.addEventListener('mouseover', handlerMouseOver)
divRoot.addEventListener('mouseleave', handlerMouseLeave)

function handlerClick(e) {
    // 获取点击源元素
    let targetEle = e.target
    // 在下一次点击样式生效之前, 先清除所有样式, 包括点击区域与展示区域
    for (let i = 0; i < spanEles.length; i++) {
        spanEles[i].classList.remove('active')
        // 如果点击源是span标签, 将展示区的所有元素设置为隐藏
        divEles[i].style.opacity = 0
    }
    // 为本次点击元素添加样式
    targetEle.classList.add('active')
    // 获取本次点击源的下标, 将对应下标的展示区域显示
    let clickIndex = targetEle.dataset.index
    divEles[clickIndex].style.opacity = 1

    // 用户点击时记录点击的位置, 让后续继续播放时从该位置处播放
    count = e.target.dataset.index - 0
}

// // 当用户鼠标悬停在播放区时, 停止自动播放
function handlerMouseOver() {
    clearInterval(resTimeCount)
}

// 当用户鼠标离开播放区时, 继续自动播放
function handlerMouseLeave() {
    resTimeCount = autoPlay()
}

divRoot.addEventListener('mousedown', e => {
    // 禁止选中文本
    e.preventDefault()
})

// 继续播放函数
function autoPlay() {
    return setInterval(() => {
        count %= spanEles.length;
        spanEles[count].dispatchEvent(new Event('click'))
        count++;
    }, 2000)
}

// 自动播放选项卡
resTimeCount = autoPlay()

// document.addEventListener('keydown', handlerKeyDown)

// 利用快捷键实现开关自动播放功能
// function handlerKeyDown(e) {
//     if (e.ctrlKey && e.keyCode === 66 && !isKeyDown) {
//         clearInterval(resTimeCount)
//         isKeyDown = !isKeyDown
//         console.log('已关闭自动播放')
//     } else if (e.ctrlKey && e.keyCode === 66 && isKeyDown) {
//         resTimeCount = autoPlay()
//         isKeyDown = !isKeyDown
//         console.log('已开启自动播放')
//     }
// }