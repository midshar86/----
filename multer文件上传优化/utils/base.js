// 更改文件上传的位置以及默认文件名
let multer = require('multer')
let { resolve, parse } = require('path')

let setting = multer.diskStorage({
    // 修改上传文件存储位置
    destination(req, file, callback) {
        callback(null, resolve(__dirname, '../public/images'))
    },
    // 修改默认存储文件名称
    filename(req, file, callback) {
        console.log(file)
        let { originalname } = file
        let { ext, name } = parse(originalname)
        callback(null, `${name}-${Date.now()}${ext}`)
    }
})

// 挂载配置方法
let upload = multer({ storage: setting })

module.exports = upload