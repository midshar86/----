// 配置主路由
let express = require('express')
let route = express()

let handlerFile = require('../utils/uploaderfile.util.js')
let handlerFiles = require('../utils/uploaderfiles.util.js')
let handlerFields = require('../utils/uploaderfield.util.js')

// 主路由使用use引入子路由
route.use('/user', handlerFile)
route.use('/user', handlerFiles)
route.use('/user', handlerFields)

module.exports = route