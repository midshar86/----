class CreateFirework {
    constructor({ x, y }) {
        // 接收触发鼠标点击事件的坐标
        this.xPos = x
        this.yPos = y
        this.addFireworkBox()
        this.fireworkUp()
    }

    // 添加烟花元素
    addFireworkBox(x, y) {
        // 创建烟花元素点
        let el = document.createElement('div')

        if (x && y) {
            // 如果该函数有数据
            el.style.left = this.xPos + 'px'
            el.style.top = this.yPos + 'px'
            el.classList.add('small')
        } else { // 如果该函数没有传入数据
            // 添加指定类名
            el.classList.add('firebox')
            // 定位至鼠标点击的最下方
            el.style.left = this.xPos + 'px'
            el.style.top = innerHeight - 10 + 'px'
            el.style.opacity = 0.2
            // 将新建元素存放到结构函数中
            this.el = el
        }

        // 添加随机颜色
        this.randomColors(el)

        // 将烟花元素追加到页面
        document.body.appendChild(el)

        return el
    }

    // 随机颜色函数
    randomColors(el) {
        let r = Math.round(Math.random() * 255)
        let g = Math.round(Math.random() * 255)
        let b = Math.round(Math.random() * 255)
        el.style.backgroundColor = `rgb(${r},${g},${b})`
    }

    // 烟花升起函数
    fireworkUp() {
        animationFun(this.el, { top: this.yPos, opacity: 1 }, this.handlerUp.bind(this))
    }

    // 处理烟花升起
    handlerUp() {
        this.el.remove()
        for (let i = 0; i < 200; i++) {
            let smallFires = this.addFireworkBox(this.xPos, this.yPos)
            // 为爆炸后的元素点左偏移量与上偏移量设置随机值, 偏移距离在鼠标点击处 ±200px
            let [leftPos, topPos] = this.computedRandom(150, this.xPos, this.yPos)
            if (leftPos && topPos) {
                // 为爆炸后的元素定位
                animationFun(smallFires, { left: leftPos, top: topPos }, () => {
                    smallFires.remove()
                })
            } else {
                smallFires.remove()
            }
        }
    }

    // 获取范围中的随机值
    computedRandom(radius, x, y) {
        let getPos = []
        let leftPos = Math.round(Math.random() * (2 * radius) + x - radius)
        let topPos = Math.round(Math.random() * (2 * radius) + y - radius)
        let absDistance = Math.round(Math.sqrt((leftPos - x) ** 2 + (topPos - y) ** 2))
        if (absDistance <= radius) {
            getPos.push(leftPos, topPos)
        }
        return getPos
    }
}

// 为整个页面创建点击事件
document.addEventListener('click', handlerCLick)

// 事件处理函数
function handlerCLick(e) {
    let firework = new CreateFirework({ x: e.pageX, y: e.pageY })
}