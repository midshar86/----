let express = require('express')

let ser = express.Router()

ser.get('/home', (req, res) => {
    res.send('服务器已启动!')
})

module.exports = ser