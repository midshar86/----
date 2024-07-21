// 配置单文件上传
let express = require('express')
let route = express.Router()
// 引入配置好的存储位置与文件名配置方式
let upload=require('./base')

function handlerFile(req, res) {
    let option = {
        code: 1,
        file: req.file,
        details: req.body
    }
    res.json(option)
}

route.post('/file', upload.single('sFile'), handlerFile)

module.exports = route