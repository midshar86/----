let jsonwebtoken = require('jsonwebtoken')

// 处理用户登录
function handlerLogin(req, res, next) {
    let { username, password } = req.body
    let expiresIn = 1800
    if (username === 'midshar' && password === 123456) {
        // 为用户信息加密
        let jwt = jsonwebtoken.sign({
            username,
            password
        }, 'secret', { expiresIn })

        let option = {
            code: 1,
            message: `登录成功!您的登录状态将在${expiresIn / 3600}小时后失效.`,
            token: jwt
        }
        res.json(option)
    } else {
        // 调用全局错误处理中间件
        next('登陆失败!请检查账号密码!')
        res.json(option)
    }
}

// 处理用户数据
function handlerVerify(req, res) {
    console.log(req.data)
    let option = {
        code: 1,
        username: req.data.username,
        message: '免密登录请求成功!'
    }
    res.json(option)
}

module.exports = {
    handlerLogin,
    handlerVerify
}