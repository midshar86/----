// 引入token插件
let jsonwebtoken = require('jsonwebtoken')
// 引入数据库模块
let userBaseInfoModel = require('../utils/database')

function handlerLogin(req, res) {
    let { username, password } = req.body

    userBaseInfoModel.find({ username }).then(data => {
        // 如果在数据库中查询有数据
        if (data.length) {
            // 如果查询到的数据密码与用户输入的密码一致, 则表示登录成功
            // 根据用户的账号密码生成对应的token信息, 有效期一小时
            let token = jsonwebtoken.sign(req.body, 'secretKey', { expiresIn: 3600 })
            if (password === data[0].password) {
                let option = {
                    code: 1,
                    message: '用户登录成功!此次的登录状态有效期1小时,1小时后登录状态过期!',
                    username,
                    token
                }
                res.json(option)
            } else { // 否则表示用户密码输入错误
                let option = {
                    code: 0,
                    message: '请检查用户密码!用户密码错误!'
                }
                res.json(option)
            }
        } else {
            let option = {
                code: 0,
                message: '请检查用户信息!没有找到对应的用户名!'
            }
            res.json(option)
        }
    })
}

module.exports = {
    handlerLogin
}