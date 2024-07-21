let jsonwebtoken = require('jsonwebtoken')

function handlerVerify(req, res) {
    // 获取前端传入的token信息
    let token = req.headers.authorization
    // 如果token值不为空
    if (token !== 'null') {
        // 如果前端传入的token能够被正确解析, 则表示已登录
        try {
            let data = jsonwebtoken.verify(token, 'secretKey')
            res.json({
                code: 1,
                message: '已登录!',
                username: data.username
            })
            console.log(data)
        } catch (err) { // 如果前端传入的token值不能被正确解析, 则报错
            res.json({
                code: 0,
                message: '用户信息获取失败!'
            })
            console.log(err)
        }
    } else {
        // 如果获取到的token值为空, 直接报错
        res.json({
            code: 0,
            message: '未登录, 请登录后重试!'
        })
    }
}

module.exports = {
    handlerVerify
}