let express = require('express')
let sub = express.Router()

sub.get('/home', (req, res) => {
    res.send('您发送的请求服务器已经响应成功！')
})

module.exports = sub