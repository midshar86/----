// 获取跳转商品的详细信息
let goodsDetails = JSON.parse(localStorage.getItem('details')).info

// 获取显示商品详情容器
let goodsBox = document.querySelector('.goods-container')

// 渲染页面
goodsBox.innerHTML = `
    <div class="logo"><img src='${goodsDetails.img_big_logo}'/></div>
    <div class="infos">
        <p>${goodsDetails.title}</p>
        <p>价格：￥ ${goodsDetails.price}</p>
        <p>${goodsDetails.is_sale === true ? '促销价: ￥ ' + goodsDetails.current_price : ''}</p>
        <div>
            <span>${goodsDetails.is_sale === true ? '热销' : ''}</span>
            <span>${goodsDetails.is_hot === true ? '热卖' : ''}</span>
        </div>
    </div>
    ${goodsDetails.goods_introduce}
`

let originPrice = document.querySelector('.infos>p:nth-child(2)')
let salePrice = document.querySelector('.infos>p:nth-child(3)')
let saleGoods = document.querySelector('.infos>div>span:first-child')
let hotGoods = document.querySelector('.infos>div>span:last-child')

if (salePrice.innerText) {
    originPrice.classList.add('del')
    salePrice.classList.add('sale')
}

if (saleGoods.innerText) {
    saleGoods.classList.add('hasValue')
}
if (hotGoods.innerText) {
    hotGoods.classList.add('hasValue')
}