// 只要用户创建相同的结构, 那么便可以复用该对象

// todo---------构造函数区---------
// 利用面向对象的编程思想创建一个选项卡
class CreateTab {
    constructor(headDom, contentDom) {
        // 存储数据
        // 存储选项卡顶部按钮
        this.headEles = document.querySelectorAll(`${headDom}>span`)
        // 存储选项卡内容元素
        this.contentEles = document.querySelectorAll(`${contentDom}>div`)
        // 存储选项卡根元素
        this.rootEle = document.querySelector('.root')
        // 存储定时器
        this.resTime = null
        // 记录定时播放当前的下标
        this.count = 0
    }

    // 为选项卡顶部按钮添加点击事件
    addEvents() {
        for (let i = 0; i < this.headEles.length; i++) {
            // 改变事件处理函数中的this指向, 同时将此次点击的按钮下标作为参数传递
            this.headEles[i].addEventListener('click', this.handlerClick.bind(this, i))
        }
    }

    // 点击事件处理函数
    handlerClick(getIndex) {
        // 清空选项卡顶部按钮与选项卡内容的所有类名
        this.clearClassNames()
        // 为当前点击的内容添加类名
        this.addClassName(getIndex)
        this.count = getIndex
    }

    // 移除所有类名函数
    clearClassNames() {
        for (let i = 0; i < this.headEles.length; i++) {
            this.headEles[i].classList.remove('active')
            this.contentEles[i].classList.remove('active')
        }
    }

    // 为当前点击按钮添加类名
    addClassName(getIndex) {
        this.headEles[getIndex].classList.add('active')
        this.contentEles[getIndex].classList.add('active')
    }

    // 自动播放函数
    autoplay() {
        this.resTime = setInterval(() => {
            this.headEles[this.count].dispatchEvent(new Event('click'))
            this.count++
            // 当循环播放至末尾, 则返回重新播放
            if (this.count === 4) {
                this.count = 0
            }
        }, 1500)
    }

    // 鼠标控制自动播放
    mouseControl() {
        // 当鼠标移入时, 停止自动播放
        this.rootEle.addEventListener('mouseenter', () => {
            clearInterval(this.resTime)
        })
        // 当鼠标离开时, 从停止自动播放的地方继续播放
        this.rootEle.addEventListener('mouseleave', () => {
            this.autoplay()
        })
    }
}
// todo---------构造函数区---------

// todo---------测试---------
//#region 
let newTab = new CreateTab('.head', '.content')
newTab.addEvents()
// 开启自动播放
newTab.autoplay()
// 开启鼠标控制
newTab.mouseControl()
let newTab1 = new CreateTab('.head1', '.content1')
newTab1.addEvents()
//#endregion
// todo---------测试---------