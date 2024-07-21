let express = require('express')
// 引入基本配置
let upload = require('../utils/base')
let route = express.Router()

function handlerFiles(req, res) {
    let option = {
        code: 1,
        // 更改绝对路径为相对路径
        files: req.files.map(item => `http://127.0.0.1:3000/images/${item.filename}`)
    }
    res.json(option)
}

route.post('/files', upload.array('files'), handlerFiles)

module.exports = route