import PagingButton from './pager.js'
window.onload = function () {
    // 获取输入框元素
    let inputEle = document.querySelector('.search-container>input')
    let searchEle = document.querySelector('.search-container>span')
    // 获取筛选框元素
    let isSaleOrHotEle = document.getElementById('isSaleOrHot')
    let saleNumEle = document.getElementById('saleNum')
    let sortTypeEle = document.getElementById('sortType')
    let goodsTypeEle = document.getElementById('goodsType')
    // 存储分页器实例
    let pagerData = null

    // 获取商品信息
    async function getGoodsData(params = {}) {
        // 解构排序筛选框的值
        let [sortType, sortMethod] = sortTypeEle.value.split('-')
        // !设置默认的请求参数, 关联数据
        let option = {
            // 默认请求地址
            url: 'http://localhost:8888/goods/list',
            params: {
                // 每次携带10条数据
                pagesize: 10,
                // 当前页数根据传入的参数而定， 默认为第一页
                current: 1,
                // 携带第二个筛选框的数据
                search: inputEle.value,
                // 携带第三个筛选框的数据
                saleType: saleNumEle.value,
                // 携带排序方法的数据
                sortType,
                sortMethod,
                // 携带选择商品类别数据
                category: goodsTypeEle.value,
                // 合并参数, 主要是为了方便分页器传递参数
                ...params
            }
        }
        // !当第一项筛选项不为空, 携带信息, 否则不携带该信息
        if (isSaleOrHotEle.value) {
            option.params.filter = isSaleOrHotEle.value
        }
        // 发送请求, 获取服务器响应的数据
        let res = (await axios(option)).data

        // // 渲染页面
        // renderPage(res.list)
        // 返回响应请求的数据
        return res
    }

    // 设置渲染页面函数
    function renderPage(data) {
        // 获取商品显示区域容器
        let container = document.querySelector('.goods-container')

        // 向页面中渲染内容
        container.innerHTML = data.map(item => {
            // 获取商品信息描述文本
            let info = item.title.split(' ').join('')
            // 渲染至页面

            // 加入title属性是为了让鼠标悬停时获得完整的商品描述
            return `<div class='goodsInfo' data-index="${item.goods_id}">
        <img src='${item.img_big_logo}'/>
        <p>￥${item.price}</p>
        <p title=${info}>${info}</p>
        <div>
            <span>${item.is_hot === true ? '热卖' : ''}</span>
            <span>${item.is_sale === true ? '折扣' : ''}</span>
        </div>
        </div>`
        }
        ).join('')

        // 获取当前页的所有显示商品
        let goodsBoxs = container.children

        // 为所有显示商品添加点击事件
        for (let i = 0; i < goodsBoxs.length; i++) {
            goodsBoxs[i].addEventListener('click', handlerTurnToDetails)
        }
    }

    // 跳转详情页面
    async function handlerTurnToDetails() {
        let id=this.dataset.index
        let option = {
            url: `http://localhost:8888/goods/item/${id}`
        }
        let res = (await axios(option)).data
        // 将商品数据存储到本地
        localStorage.setItem('details', JSON.stringify(res))
        // 在新标签页打开商品详情页面
        window.open(`./details.html#${id}`, '_blank')
    }

    // 实现渲染分类下拉菜单
    function renderOptions(data) {
        goodsTypeEle.innerHTML += data.map(item => `<option value="${item}">${item}</option>`)
    }

    // 初始化函数
    async function init() {
        // 渲染页面并获取响应请求的数据
        let res = await getGoodsData()
        renderPage(res.list)
        // 获取服务端分类信息列表
        let goodsTypes = (await axios('http://localhost:8888/goods/category')).data.list
        // 渲染分类列表至下拉菜单
        renderOptions(goodsTypes)
        // 分页器参数
        let option = {
            count: res.total
        }
        // 调用分页器函数
        setPager(option)
    }

    // 创建分页器
    function setPager(params = {}) {
        // !如果存在分页器实例, 则调用实例上的清除方法
        // !是为了防止实例之间相互干扰
        if (pagerData) {
            pagerData.destroyPager()
        }
        // 设置分页器通用参数
        params = {
            cutCounter: 10,
            container: '#cont',
            callback,
            ...params
        }
        // 存储分页器实例
        pagerData = new PagingButton(params)
    }

    // 初始化页面
    init()

    // 创建分页器按钮点击事件
    async function callback(index) {
        // 传入分页器参数
        let option = {
            // 携带点击的页数
            current: index
        }
        // 重新渲染页面
        let res = await getGoodsData(option)
        renderPage(res.list)
    }

    // 实现搜索功能
    async function handlerSearch() {
        let res = await getGoodsData()
        renderPage(res.list)
        // 重新创建分页器

        // 分页器参数
        let option = {
            count: res.total,
        }
        // 调用函数创建分页器
        setPager(option)
    }

    // 为页面绑定enter按键事件
    function handlerKeyup(e) {
        // 按下回车键, 执行搜索功能
        if (e.keyCode === 13) {
            searchEle.dispatchEvent(new Event('click'))
        }
    }

    // 设置第一个筛选框
    async function handlerSelect() {
        let res = await getGoodsData()
        renderPage(res.list)
        // 分页器参数
        let option = {
            count: res.total,
        }
        setPager(option)
    }

    // 设置第二个筛选框
    async function handlerHowSale() {
        let res = await getGoodsData()
        renderPage(res.list)
        // 分页器参数
        let option = {
            count: res.total,
        }
        setPager(option)
    }

    // 设置第三个筛选框
    async function handlerSortType() {
        let res = await getGoodsData()
        renderPage(res.list)
        // 分页器参数
        let option = {
            count: res.total,
        }
        setPager(option)
    }

    // 设置选择商品类别筛选框
    async function handlerGoodsType() {
        let res = await getGoodsData()
        renderPage(res.list)
        // 分页器参数
        let option = {
            count: res.total,
        }
        setPager(option)
    }

    // 添加事件
    function addEvent() {
        searchEle.addEventListener('click', handlerSearch)
        document.documentElement.addEventListener('keyup', handlerKeyup)
        isSaleOrHotEle.addEventListener('change', handlerSelect)
        saleNumEle.addEventListener('change', handlerHowSale)
        sortTypeEle.addEventListener('change', handlerSortType)
        goodsTypeEle.addEventListener('change', handlerGoodsType)
    }

    addEvent()
}