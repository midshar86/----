let express = require('express')
let router = express()

// 引入用户登录模块
let login = require('./login')
router.use('/user', login)

// 引入用户注册模块
let register = require('./register')
router.use('/user', register)

// 引入用户主页模块
let home = require('./home')
router.use('/user', home)

module.exports = router