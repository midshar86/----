// todo------------------变量存储区--------------------
//#region 
let dataSaving = {}
let inputEle = document.querySelector('p>input')
let btnEle = document.querySelector('input+button')
let btnEle2 = document.querySelector('p>button:last-child')
let container = document.getElementById('list')
let inputValue = inputEle.value
//#endregion
// todo------------------变量存储区--------------------

// todo------------------事件添加区--------------------
//#region 
// 为按钮添加点击事件
btnEle.addEventListener('click', handlerClick)
document.addEventListener('keyup', handlerKeyup)
btnEle2.addEventListener('click', handlerClear)
//#endregion
// todo------------------事件添加区--------------------

// todo------------------功能函数区--------------------
//#region 
// 配置属性的get方法
function getStorage() {
    // 取出本地存储的值
    let storageData = localStorage.getItem('datas')
    // 如果该值为null, 则将初始值设置为空数组
    if (!storageData) {
        storageData = []
    } else { // 否则将本地存储的值解析成json字符串
        storageData = JSON.parse(storageData)
    }
    // 返回存储数据的json字符串
    return storageData
}

// 配置属性的set方法
function setStorage(val) {
    // 将输入数据转换为json字符串并且存入本地存储
    val = JSON.stringify(val)
    localStorage.setItem('datas', val)
}

// 为对象设置get方法与set方法
Object.defineProperty(dataSaving, 'datas', {
    get: getStorage,
    set: setStorage
})

// 渲染函数
function render() {
    // 获取本地存储的内容
    let resData = dataSaving.datas
    // 将本地存储的数据渲染到页面
    container.innerHTML = resData.map(item => `<li>${item}<button onclick='handlerDel()'>Delete</button></li>`).join("")
}

// 配置好属性的get与set方法后, 调用render函数
render()

// 点击事件处理函数
function handlerClick() {
    // 取出存储在本地的值
    let resData = dataSaving.datas
    // 获取输入框的值
    let inputValue = inputEle.value
    // 如果输入框的值为空或者为重复值, 不做任何操作
    if (inputValue === "") {
        alert('不允许输入为空!')
        return false
    }
    if (resData.indexOf(inputValue) !== -1) {
        alert('不允许添加重复值!')
        inputEle.value = ''
        return false
    }
    inputEle.value = ''
    // 否则将数据推入数组
    resData.push(inputValue)
    // 将输入数据存入本地存储中
    dataSaving.datas = resData
    // 再次调用渲染函数
    render()
}

// 清除所有数据
function handlerClear() {
    localStorage.clear()
    render()
}

// 添加删除事件
function handlerDel(e = event) {
    // 获取本地存储的数据
    let resData = dataSaving.datas
    // 获取父元素的数据
    let content = e.target.parentNode.innerText.slice(0, -e.target.innerText.length)
    // 当前点击的元素父元素存储的数据在本地存储中的下标
    let index = resData.indexOf(content)
    // 删除该元素
    resData.splice(index, 1)
    // 将数据存储到本地存储中
    dataSaving.datas = resData
    // 重新渲染页面
    render()
}

// 事件派发
function handlerKeyup(e) {
    if (e.keyCode === 13) {
        btnEle.dispatchEvent(new Event('click'))
    }
}
//#endregion
// todo------------------功能函数区--------------------