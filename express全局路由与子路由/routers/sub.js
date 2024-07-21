// 编写子路由
let express = require('express')
// 创建一个子路由对象
let sub = express.Router()

// 使用get方法访问根目录
sub.get('/', (req, res) => {
    res.send('sub 路由')
})

sub.get('/menu', (req, res) => {
    res.send('menu 路径中的路由')
})

module.exports = sub