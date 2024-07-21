// todo----------------------函数功能区-----------------------
//#region 
// 封装一个动画函数, 实现任意属性的动画, 并且多动画效果同时执行
function animationFun(dom, optionsObj, callback = () => { }) { // 对应的参数分别是 : 需要操作的dom对象, 属性的目标参数, 需要操作的属性, 动画执行完毕后的回调函数

    for (let prop in optionsObj) {
        // 声明变量存放目标原始属性值
        let oldValue
        // !包装参数对象, 将{key:value}=>{key:{oldValue,targetValue}}
        switch (prop) {
            case 'opacity': // 如果是特殊属性opacity, 放大目标属性便于计算
                let target = optionsObj[prop] * 100
                // 获取dom的初始属性值, 放大原始属性便于计算
                oldValue = parseInt(getComputedStyle(dom)[prop]) * 100
                // 将原始值与目标值赋予对应属性
                optionsObj[prop] = { oldValue, target }
                break;
            default:
                // 否则不进行放大
                oldValue = parseInt(getComputedStyle(dom)[prop])
                // 将原始值与目标值赋予对应属性
                optionsObj[prop] = { oldValue, target: parseInt(optionsObj[prop]) }
                break;
        }
    }

    // !因为定时器可以开启多个, 在开启新的定时器之前, 先清空原有的定时器
    clearInterval(dom.time)

    // todo创建定时器动画
    // 将定时器存入到dom对象中, 便于在创建下一个定时器之前清除
    dom.time = setInterval(() => {
        // !要实现多个效果一起应用, 在定时器执行的时候, 为每条需要改变的属性添加效果
        // !一个定时器, 同时改变很多属性
        for (let attr in optionsObj) {
            // 解构赋值, 分别是原有属性值与目标属性值
            let { oldValue, target } = optionsObj[attr]
            // 设置缓冲效果, 让盒子元素的步长每次变为剩余距离的1/10
            let step = (target - oldValue) / 35

            // !浏览器能够识别的最小像素为1px, 如果剩余距离大于0, 向上取整(即右移); 否则, 向下取整(即左移)
            step = step > 0 ? Math.ceil(step) : Math.floor(step)

            // 计算整体偏移量, 同时存入对象中的原始值
            optionsObj[attr].oldValue += step

            switch (attr) {
                // 为dom对象赋值属性值
                case 'opacity':
                    // 判断是否是特殊属性, 还原单位
                    dom.style[attr] = oldValue / 100
                    break;
                default:
                    dom.style[attr] = oldValue + 'px'
            }

            // !设置缓冲效果后, 最终元素的数值变化都会是±1, 只要设置的单位是整数, 元素属性值一定会等于目标值, 同时删除该条数据
            if (oldValue === target) {
                delete optionsObj[attr]
                // 如果存储数据的对象为空, 则表示动画均执行结束
                for (let i in optionsObj) {
                    // 如果对象中还有数据, 会直接返回
                    return false
                }
                // 清除动画
                clearInterval(dom.time)
                // 执行回调函数
                callback()
            }
        }
    }, 20)
}
//#endregion
// todo----------------------函数功能区-----------------------