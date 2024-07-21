// todo-----------------数值区-----------------
// #region
// 获取展示区容器元素
let divShow = document.querySelector('.show')
// 获取展示区图片元素
let divImgShow = divShow.children[0]
// 获取展示区蒙版元素
let divSelect = document.querySelector('.select')

// 获取大图区容器元素
let divShowDetails = document.querySelector('.showdetails')
// 获取大图区图片元素
let divShowDetailsImg = divShowDetails.children[0]

// 获取小图区图片元素
let imagessEles = document.querySelectorAll('.list>li>img')

// 获取蒙版的宽度与高度
// 获取蒙版的所有css样式
let divSelectCssInfo = getComputedStyle(divSelect)
let selectWidth = parseInt(divSelectCssInfo.width)
let selectHeight = parseInt(divSelectCssInfo.height)

// 获取展示图区域的宽度与高度
let divShowWidth = divShow.offsetWidth
let divShowHeight = divShow.offsetHeight

// 等比例计算
// !当元素的display属性为none时, 无法通过offsetWidth或者offsetHeight获取元素的宽高
// 获取大图区容器的所有css样式
let divShowDetailsCssInfo = getComputedStyle(divShowDetails)
// 获取大图区容器的宽度与高度
let divShowDetailsWidth = parseInt(divShowDetailsCssInfo.width)
let divShowDetailsHeight = parseInt(divShowDetailsCssInfo.height)
// 计算大图区与展示区的比例
let scaleValue = divShowDetailsWidth / selectWidth
//#endregion
// todo-----------------数值区-----------------

// todo-----------------事件区-----------------
// #region
// 为展示区图标添加鼠标移入、移出与移动事件
divImgShow.addEventListener('mouseenter', handlerOnDivShowMouseenter)
divImgShow.addEventListener('mouseout', handlerOnDivShowMouseout)
divImgShow.addEventListener('mousemove', handlerOnDivShowMousemove)

// 为小图添加鼠标移入事件
for (let i = 0; i < imagessEles.length; i++) {
    imagessEles[i].addEventListener('mouseenter', handlerOnUlListMouseenter)
}
//#endregion
// todo-----------------事件区-----------------

// todo-----------------函数功能区-----------------
//#region 
// 查找对应的dom元素的下标, 无法找到返回-1
function findIndex(arr, dom) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === dom) {
            return i
        }
    }
    return -1
}

// 小图的鼠标移入事件
function handlerOnUlListMouseenter(e) {
    // 判断当前鼠标移入的是哪个元素
    let index = findIndex(imagessEles, e.target)

    // 鼠标移入到缩略图上时, 显示对应的展示图
    divImgShow.src = `../images/showPic/${index + 1}.webp`
    // 显示对应的大图
    divShowDetails.children[0].src = `../images/showPic/${index + 1}.webp`

    for (let i = 0; i < imagessEles.length; i++) {
        // 清除所有的class类
        imagessEles[i].classList.remove('active')
    }
    // 并为当前点击源对应的元素添加选中边框
    imagessEles[index].classList.add('active')
}

// 在图片展示区添加鼠标移入事件, 显示蒙版与放大图
function handlerOnDivShowMouseenter(e) {
    divShowDetails.style.display = 'block'
    divSelect.style.display = 'block'
}

// 在图片展示区添加鼠标移出事件, 隐藏蒙版与放大图
function handlerOnDivShowMouseout(e) {
    divShowDetails.style.display = 'none'
    divSelect.style.display = 'none'
}

function handlerOnDivShowMousemove(e) {
    // 获取鼠标移动距离最近元素的偏移量
    // !因为蒙版设置了pointer-event:none属性, 此时的偏移量是距离展示区容器的偏移量
    let offsetx = e.offsetX
    let offsety = e.offsetY

    // 防止蒙版移出屏幕
    // !小于最小值时设置为0, 大于最大值时, 设置为最大值
    let leftPos = offsetx < selectWidth / 2 ? 0 : (offsetx > (divShowWidth - selectWidth / 2) ? (divShowWidth - selectWidth) : offsetx - selectWidth / 2)
    let topPos = offsety < selectHeight / 2 ? 0 : (offsety > (divShowHeight - selectHeight / 2) ? (divShowHeight - selectHeight) : offsety - selectHeight / 2)
    divSelect.style.left = leftPos + 'px'
    divSelect.style.top = topPos + 'px'

    // 当鼠标在展示图上移动的时候, 由于两组图之间有1.6倍关系, 大图按照比例滚动, 直接使用蒙版与展示图之间的定位偏移属性left与top来指定放大图的移动
    // !注意大图的移动方向是相反方向
    divShowDetailsImg.style.marginLeft = -divSelect.offsetLeft * scaleValue + 'px'
    divShowDetailsImg.style.marginTop = -divSelect.offsetTop * scaleValue + 'px'
}
//#endregion
// todo-----------------函数功能区-----------------