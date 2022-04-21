// 路由处理函数模块中，专门负责存放每个路由对应的处理函数
// 这是卡片列表路由模块函数的实现

// 导入数据库模块
const db = require('../db/index')

// 默认获取图片列表数据
exports.getPhoList = function (req, res) {

    // 定义查询卡片列表数据的sql语句
    const sql = 'select * from phobox order by pid desc'

    // 执行sql语句
    db.query(sql, function (err, results) {
        if (err) return res.cc(err)

        res.send({
            status: 0,
            message: '获取图片列表成功!',
            data: results,
        })
    })
}


// 根据左侧列表选项获取表单数据
exports.getListByParams = function (req, res) {
    const sql = 'select * from phobox where linktag =? order by pid desc'

    db.query(sql, [req.body.linktag], function (err, results) {
        if (err) return res.cc(err)

        res.send({
            status: 0,
            message: '查询图片列表成功!',
            data: results,
        })
    })
}

// 根据作者搜索栏获取图片列表数据

exports.getListByName = function (req, res) {
    const sql = 'select * from phobox where name =? or extraname =? order by pid desc'

    console.log(req.body);

    db.query(sql, [req.body.name,req.body.name], function (err, results) {
        if (err) return res.cc(err)

        res.send({
            status:0,
            message:'查询作者图片成功!',
            data:results,
        })
    })
}