let express = require('express')
let sub = express.Router()
sub.get('/sub', (req, res) => {
    res.send('子路由的响应数据!')
})

module.exports = sub