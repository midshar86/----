let route = require('express').Router()

let { getTokenInfo } = require('../middleware/userlogin')
let { handlerLogin, handlerVerify } = require('../controller/userlogin')

// 为请求方法添加中间件
route.get('/details', getTokenInfo, handlerVerify)
route.post('/login', handlerLogin)

module.exports = route