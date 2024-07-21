let route = require('express').Router()
let upload = require('../util/base.util')

route.post('/files', upload.array('files'), (req, res) => {
    let option = {
        code: 1,
        info: req.files.map(item => `http://127.0.0.1:3000/images/${item.filename}`)
    }
    res.json(option)
})

module.exports = route