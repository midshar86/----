// todo------------------父类-------------------------
//#region 
// 父类构造函数
function CreateDrag(container, dragNode) {
    // 获取拖拽容器
    this.rooter = document.querySelector(container)
    // 获取拖拽元素
    this.header = document.querySelector(dragNode)
    // 使用变量接收点击时鼠标距离最近元素的偏移量
    this.clickLeft = null
    this.clickTop = null
    // 调用初始化函数
    this.init()
}

// 初始化
CreateDrag.prototype.init = function () {
    // 为拖拽元素绑定鼠标按下事件
    this.header.addEventListener('mousedown', this.handlerMouseDown.bind(this))
    // 为防止卡顿, 为document元素添加鼠标抬起事件
    document.addEventListener('mouseup', this.handlerMouseup.bind(this))
}

// 鼠标按下事件
CreateDrag.prototype.handlerMouseDown = function (e = event) {
    // 获取鼠标按下时距离最近元素的偏移量
    this.clickLeft = e.offsetX
    this.clickTop = e.offsetY

    // 阻止默认事件
    e.preventDefault()

    // 因为bind方法返回一个新函数, 如果直接在事件处理中调用, 则返回的新函数没有接收参数, 后续移除事件便无法实现
    // 所以这里用新函数覆盖旧函数, 同时将更改this后的新函数用作事件处理函数
    this.handlerMouseMove = this.handlerMouseMove.bind(this)
    // 为防止卡顿, 将鼠标移动事件绑定在document中
    document.addEventListener('mousemove', this.handlerMouseMove)
}

// 鼠标移动事件
CreateDrag.prototype.handlerMouseMove = function (e = event) {
    // 减去1表示修正偏移量
    this.rooter.style.left = e.pageX - this.clickLeft - 1 + 'px'
    this.rooter.style.top = e.pageY - this.clickTop - 1 + 'px'
}

// 鼠标抬起事件
CreateDrag.prototype.handlerMouseup = function () {
    // 移除鼠标移动事件
    document.removeEventListener('mousemove', this.handlerMouseMove)
}
//#endregion
// todo------------------父类-------------------------

// todo------------------子类-------------------------
//#region 
// 创建一个子类, 要求子类继承父类的功能, 并且能够实现边界检测
// 利用借用继承继承父类的实例对象参数
function CreateDragWithRange(...argus) {
    // 绑定父类的this指向为子类的实例
    CreateDrag.apply(this, argus)

    // 获取元素的宽度与高度
    this.eleWidth = this.rooter.offsetWidth
    this.eleHeight = this.rooter.offsetHeight
    // 计算拖拽允许的最大偏移量
    this.maxWidth = innerWidth - this.eleWidth
    this.maxHeight = innerHeight - this.eleHeight
}
// 利用原型继承继承父类的方法
CreateDragWithRange.prototype = Object.create(CreateDrag.prototype)

// 更改鼠标移动方法
CreateDragWithRange.prototype.handlerMouseMove = function (e = event) {
    // 计算左偏移距离
    let leftPos = e.pageX - this.clickLeft
    // 计算上偏移距离
    let topPos = e.pageY - this.clickTop

    // 设定边界值
    leftPos = leftPos < 0 ? 0 : leftPos
    topPos = topPos < 0 ? 0 : topPos
    leftPos = leftPos > this.maxWidth ? this.maxWidth : leftPos
    topPos = topPos > this.maxHeight ? this.maxHeight : topPos

    // 为拖拽元素赋值偏移量
    this.rooter.style.left = leftPos - 1 + 'px'
    this.rooter.style.top = topPos - 1 + 'px'
}
//#endregion
// todo------------------子类-------------------------

// 创建父类的实例对象
new CreateDrag('.root', '.head')

// 创建子类实例
new CreateDragWithRange('.box', '.heads')