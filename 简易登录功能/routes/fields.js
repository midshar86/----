let route = require('express').Router()
let upload = require('../util/base.util')

let option = [
    { name: 'file1' },
    { name: 'file2' }
]

route.post('/fields', upload.fields(option), (req, res) => {
    let setting = {
        code: 1,
        info: Object.values(req.files).map(item => `http://127.0.0.1:3000/images/${item[0].filename}`)
    }
    res.json(setting)
})

module.exports = route