//导入express来创建服务器
const express = require('express')
// 创建express的服务器实例
const app = express()

// 导入并配置cors中间件，用来解决跨域问题
const cors = require('cors')

// 将cors注册为全局中间件
app.use(cors())

// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({
    extended: false
}))

// 封装一个错误报告函数中间件，必须在所有路由之间注册
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
        res.send({
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 导入并使用卡片图片列表的路由模块
const cardlistRouter = require('./router/card')
// 注册中间件，并为路由挂载统一的访问前缀
app.use('/api', cardlistRouter)


// 启动服务监听
app.listen(3008, function () {
    console.log('server on http://127.0.0.1:3008');
})