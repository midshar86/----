let route = require('express').Router()

let upload = require('../util/base.util')

route.post('/file', upload.single('file'), (req, res) => {
    let option = {
        code: 1,
        info: req.file
    }
    res.json(option)
})

module.exports = route