function animationFun(dom, options, callback = () => { }) {
    // 包装属性
    for (let prop in options) {
        // 判断传入的属性是否为特殊属性
        let origin
        switch (prop) {
            case 'opacity':
                origin = parseInt(getComputedStyle(dom)[prop]) * 100
                let endState = options[prop] * 100
                options[prop] = { origin, endState }
                break;
            default:
                origin = parseInt(getComputedStyle(dom)[prop])
                options[prop] = { origin, endState: options[prop] }
        }
    }

    // !新定时器开始之前， 清空定时器
    clearInterval(dom.time)

    // 创建定时器
    dom.time = setInterval(() => {
        for (let attr in options) {
            let { origin, endState } = options[attr]
            // 实现减速运动, 每次的步长为剩余差距值的1/10
            let step = (endState - origin) / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step)
            options[attr].origin += step

            // 判断传入的属性是否是特殊属性
            switch (attr) {
                case 'opacity':
                    dom.style[attr] = origin / 100
                    break;
                default:
                    dom.style[attr] = origin + 'px'
            }
            if (origin === endState) {
                delete options[attr]
                for (let i in options) {
                    return false
                }
                clearInterval(dom.time)
                callback()
            }
        }
    }, 17)
}