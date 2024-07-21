let express = require('express')
let route = express()

// let singleFile = require('./file')
// route.use('/user', singleFile)

// let multipartFiles = require('./files')
// route.use('/user', multipartFiles)

// let fieldsFiles = require('./fields')
// route.use('/user', fieldsFiles)

// 挂载子路由
let loginPart = require('./userlogin')
route.use('/user', loginPart)

module.exports = route