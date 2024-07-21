// 获取所有需要排列的元素
let imgBoxEles = document.querySelectorAll('.img-box')
// 设置数组以存放基准元素
let baseArray = []
// 遍历所有需要排列的元素, 将前四个作为基准元素, 将后续的元素依次定位在本次循环时高度最小的元素之后

// 图片加载速度比较慢, 设定当所有的外部资源加载完毕后再执行代码
window.onload = function () {
    for (let i = 0; i < imgBoxEles.length; i++) {
        if (i < 4) {
            // 向数组中存放基准元素的高度
            baseArray.push(imgBoxEles[i].offsetHeight)
        } else {
            // 找出基准元素中的最小高度
            let getBaseArrayMinHeight = getMinHeight(baseArray).minHeight
            // 找出基准元素中最小高度的下标
            let getBaseArrayMinHeightIndex = getMinHeight(baseArray).minHeightIndex
            // 将下标转换为对应的元素
            let minHeightEle = imgBoxEles[getBaseArrayMinHeightIndex]
            // 获取最小高度元素的高度与左偏移量
            let minHeightOffsetHeight = getBaseArrayMinHeight
            let minHeightOffsetLeft = minHeightEle.offsetLeft
            // 将元素绝对定位在最小基准高度元素之后
            imgBoxEles[i].style.position = 'absolute'
            imgBoxEles[i].style.left = minHeightOffsetLeft + 'px'
            imgBoxEles[i].style.top = minHeightOffsetHeight + 'px'
            // 将新元素的高度添加到最小基准高度
            baseArray[getBaseArrayMinHeightIndex] += imgBoxEles[i].offsetHeight
        }
    }
    // 为外层元素设置最大高度, 隐藏末尾显示的元素
    let container = document.getElementsByClassName('container')[0]
    container.style.height = getMinHeight(baseArray).minHeight + 'px'
    container.style.overflow = 'hidden'
}

// 查找数组中的最小值, 返回该最小值与最小值下标
function getMinHeight(arr) {
    if (!(arr instanceof Array)) {
        throw new Error("参数应当为一个数组!")
    }
    let minHeight = arr[0]
    let minHeightIndex = 0
    for (let i = 1; i < arr.length; i++) {
        if (minHeight > arr[i]) {
            minHeight = arr[i]
            minHeightIndex = i
        }
    }
    return {
        minHeight: minHeight,
        minHeightIndex: minHeightIndex
    }
}