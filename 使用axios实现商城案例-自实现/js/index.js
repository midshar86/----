// todo---------------变量获取区---------------
//#region 
let rootEle = document.querySelector('.root')
let pageEle = document.querySelector('.page')
let inputEle = document.querySelector('.search>input')
let searchEle = document.querySelector('.search>span')
let s1 = document.getElementById('isSpecial')
let s2 = document.getElementById('saleType')
let s3 = document.getElementById('sortType')
// 设置变量防止懒加载重复执行
let flag = true
// 获取蒙版元素
let boardEle = document.getElementById('board')
// 要展示在页面的数据
let showGoods = []
// 定义请求携带的参数变量
let current = 1, pagesize = 10, search, filter, saleType, sortType, sortMethod, category
// 设置请求地址
let url = 'http://localhost:8888/goods/list'
//#endregion
// todo---------------变量获取区---------------

// todo---------------事件绑定区---------------
//#region 
// 当页面加载完毕后触发首次请求
window.addEventListener('load', getFirstGoods)
// 点击搜索时执行请求
searchEle.addEventListener('click', handlerSearch)
document.addEventListener('keyup', handlerKeyup)
// 为筛选框添加事件
s1.addEventListener('change', handlerS1)
s2.addEventListener('change', handlerS2)
s3.addEventListener('change', handlerS3)
//#endregion
// todo---------------事件绑定区---------------

// todo---------------函数功能区---------------
//#region
// 设置请求参数
function setOption() {
    let option
    search = inputEle.value
    filter = s1.value
    saleType = s2.value

    // 如果参数中选择了按照id排序
    if (s3.value === 'id') {
        sortType = s3.value
        delete option?.params?.sortMethod
    }

    // 设置参数
    option = {
        url,
        params: {
            current,
            pagesize,
            search,
            filter,
            saleType,
            sortType
        }
    }

    // 当筛选方法不是以id排序时, 加入排序依据
    if (s3.value !== 'id') {
        [sortType, sortMethod] = s3.value.split('-')
        option.params.sortMethod = sortMethod
    }

    console.log(option)
    return option
}

// 渲染函数
function render(arr) {
    rootEle.innerHTML = arr.map(item => {
        let str = `<div>
        <img src=${item.img_big_logo}>
        <p>￥${item.price}</p>
        <p>${item.title}</p>
        <div>
            <p>${item.is_hot === true ? 'hot! 热销' : ''}</p>
            <p>${item.is_sale === true ? 'sale! 折扣' : ''}</p>
        </div>
        </div>`
        return str
    }).join('')
}

// 首次渲染
async function getFirstGoods() {
    current = 1
    option = setOption()
    showGoods = (await axios(option)).data.list
    render(showGoods)
}

// 执行搜索请求
async function handlerSearch() {
    let value = inputEle.value
    // 搜索框为空, 直接返回
    if (value === '') {
        return
    }
    current = 1
    let option = setOption()
    showGoods = (await axios(option)).data.list
    render(showGoods)
}

// 键盘事件, 当点击enter键时, 执行商品搜索
function handlerKeyup(e) {
    if (e.keyCode === 13) {
        searchEle.dispatchEvent(new Event('click'))
    }
}

// 筛选有无折扣与热卖
async function handlerS1() {
    current = 1
    option = setOption()
    option.params.filter = this.value
    filter = this.value
    showGoods = (await axios(option)).data.list
    render(showGoods)
}

// 筛选具体折扣
async function handlerS2() {
    current = 1
    option = setOption()
    option.params.saleType = this.value
    saleType = this.value
    showGoods = (await axios(option)).data.list
    render(showGoods)
}

// 筛选排序方法
async function handlerS3() {
    [sortType, sortMethod] = this.value.split('-')
    current = 1
    option = setOption()
    option.params.sortType = sortType
    sortType = sortType
    showGoods = (await axios(option)).data.list
    render(showGoods)
}

// 实现懒加载
window.onscroll = () => {
    // 页面整体高度
    let totalHeight = rootEle.offsetTop + rootEle.offsetHeight
    // 页面卷动距离与视口高度之和
    let moveHeight = document.documentElement.scrollTop + innerHeight

    // 防止反复获取数据
    if (!flag) {
        return
    }

    // 当距离页面底部小于10像素时触发懒加载功能, 获取下一页数据
    if (totalHeight - moveHeight <= 20) {
        flag = false

        // 设置定时器, 一秒之后获取数据
        // 此时设置蒙版为可见
        boardEle.style.visibility = 'visible'
        let resTime = setTimeout(async () => {
            current++
            let option = setOption()
            let res = (await axios(option)).data.list
            if (res.length === 0) {
                flag = true
                boardEle.style.visibility = 'hidden'
                return
            }

            showGoods = [...showGoods, ...res]
            render(showGoods)
            // 渲染页面后, 将蒙版隐藏
            boardEle.style.visibility = 'hidden'
            console.log(showGoods)
            flag = true
            clearTimeout(resTime)
        }, 1000);
    }
}
//#endregion
// todo---------------函数功能区---------------