// todo--------------分页器----------------
class PagingButton {
    // todo-----------------构造函数----------------------
    constructor(option) {
        this.option = {
            // 创建分页器按钮的个数
            count: 5,
            // 存储分页器按钮的目标对象
            container: '.root',
            // 存放当前点击的按钮, 与按钮上的数字对应
            nowClick: 1,
            // 按照要求划分显示的按钮, 多余数量按钮显示为省略号
            cutCounter: 5,
            callback: function () { },
            ...option
        }
        // 存放按钮的数组
        this.baseButton = []
        // 调用初始化函数
        this.init()
    }
    // todo-----------------构造函数----------------------

    // todo-----------------初始化函数----------------------
    init() {
        // 解构, 方便数据操作
        let { count, container } = this.option
        // 获取指定存储分页器按钮的目标对象的DOM结构并存入原始数据中
        this.option.container = document.querySelector(container)

        // 按照参数创建分页器的按钮个数, 并存入数组中
        for (let i = 1; i <= count; i++) {
            this.baseButton.push(i)
        }

        // 调用渲染函数
        this.renderPage()

        this.handlerClick = this.handlerClick.bind(this)
        // 利用事件委托机制为分页器按钮的父元素添加点击事件
        this.option.container.addEventListener('click', this.handlerClick)
    }
    // todo-----------------初始化函数----------------------

    // todo-----------------渲染页面函数----------------------
    renderPage() {
        let { container, nowClick, cutCounter } = this.option
        // 声明变量存储开头截取的数据与末尾截取的数据,以及新数组
        let endBtns, startBtns, cutBtns

        if (nowClick > 1) {
            // 当被点击的按钮大于2时, 我希望被选中的按钮显示在中间
            startBtns = this.baseButton.slice(nowClick - 2, nowClick + Math.ceil(cutCounter / 2) - 2)
        } else { // 默认一开始的情况下在按钮1处显示
            startBtns = this.baseButton.slice(nowClick - 1, nowClick + Math.ceil(cutCounter / 2) - 1)
        }

        // 判断如果当前显示的分页器按钮在末尾, 且数量已经足够指定的个数, 则不用显示省略号按钮
        if (nowClick - 2 + cutCounter >= this.baseButton.length) {
            // 直接拆将末尾对应的指定按钮个数截取
            endBtns = this.baseButton.slice(-cutCounter)
            cutBtns = [...endBtns]
        } else { // 否则, 需要显示省略号按钮
            endBtns = this.baseButton.slice(-Math.floor(cutCounter / 2))
            cutBtns = [...startBtns, '...', ...endBtns]
        }

        // 当点击的按钮数字大于3时, 固定按钮1的位置在最前方
        if (nowClick > 3) {
            cutBtns.unshift(1, '...')
        }

        // 创建完整的数据用于渲染页面
        let completeButton = ['上一页', ...cutBtns, '下一页']

        // 将数组中的内容渲染成html格式, 并且为当前选中的按钮添加active类名
        let resArray = completeButton.map(item => `<a href='javascript:void(0)' class='pagebutton ${item === this.baseButton[nowClick - 1] ? "active" : ""}'>${item}</a>`).join('')

        // 将分页器按钮放入页面
        container.innerHTML = resArray

        // !渲染完成后调用回调函数
        this.option.callback(nowClick)
    }
    // todo-----------------渲染页面函数----------------------

    // todo-----------------事件触发函数----------------------
    handlerClick(e) {
        let { nowClick } = this.option
        // 获取事件源
        let eTarget = e.target
        // 只有当点击的元素为分页器按钮时, 才能够触发对应的事件
        if (eTarget.nodeName === 'A') {
            // 判断如果点击分页器按钮后如果当前页小于最小值, 赋值为最小值
            if (eTarget.innerText === '上一页') {
                // !当第一个按钮显示为1时, 再次点击上一页时防止重复调用回调函数
                if (nowClick <= 1) {
                    this.option.nowClick = 1
                    return
                }
                this.option.nowClick--
            } else if (eTarget.innerText === '下一页') {
                // !当最后一个按钮显示为1时, 再次点击下一页时防止重复调用回调函数
                if (nowClick >= this.baseButton.length) {
                    this.option.nowClick = this.baseButton.length
                    return
                }
                // 判断如果点击分页器按钮后如果当前页大于最大值, 赋值为最大值
                this.option.nowClick++
            } else if (eTarget.innerText === '...') { // 如果点击的是省略号按钮, 则什么也不做
                return false
            } else { // 否则, 为当前分页器的值
                this.option.nowClick = Number(eTarget.innerText)
            }

            // 如果重复点击同一个按钮, 防止重复触发回调函数
            if (nowClick === this.option.nowClick) {
                return false
            }
            // !点击元素后重新渲染页面
            this.renderPage()
        }
    }
    // todo-----------------事件触发函数----------------------

    // !-----------------清除分页器----------------------
    // !当需要创建多个实例时, 又希望之前创建的实例不再干扰页面, 需要调用此方法移除已绑定的事件与分页器的内容
    destroyPager() {
        // 移除点击事件
        this.option.container.removeEventListener('click', this.handlerClick)
        // 清空按钮容器
        this.option.container.innerHTML = ''
    }
    // !-----------------清除分页器----------------------
}
// todo--------------分页器----------------

export default PagingButton