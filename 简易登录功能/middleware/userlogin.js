let jsonwebtoken = require('jsonwebtoken')

// 获取并解密token
function getTokenInfo(req, res, next) {
    let { authorization } = req.headers
    jsonwebtoken.verify(authorization, 'secret', (err, data) => {
        // 如果解密失败, 则进行错误处理
        if (err) {
            // 调用全局错误处理中间件
            next('请检查是否已登录!请求头是否携带token字段!')
        } else { // 否则, 调用下一个中间件处理
            req.data = data
            next()
        }
    })
}

module.exports = {
    getTokenInfo
}