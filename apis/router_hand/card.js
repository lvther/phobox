// 路由处理函数模块中，专门负责存放每个路由对应的处理函数
// 这是卡片列表路由模块函数的实现

// 导入数据库模块
const db = require('../db/index')

var pager = {
    page: 0,
    maxnum: 0,
    pagesize: 0,
    total: 0
}
// 默认获取图片列表数据
exports.getPhoList = function (req, res) {

    // 定义查询卡片列表数据的sql语句
    const sql = 'select * from phobox order by pid desc'

    // 执行sql语句
    db.query(sql, function (err, results) {
        if (err) return res.cc(err)

        // 当前页码
        pager.page = req.body.page
        // 总共查询到的记录
        pager.maxnum = results.length
        // 每页显示的记录数
        pager.pagesize = 2
        // 一共有多少页
        pager.total = Math.ceil(pager.maxnum / pager.pagesize)

        // 将查询的结果进行切片
        let startindex = (pager.page - 1) * pager.pagesize
        var datalist = results.splice(startindex, pager.pagesize)


        res.send({
            status: 0,
            message: '获取图片列表成功!',
            data: datalist,
            varpage: pager,
        })
    })
}


// 根据左侧列表选项获取表单数据
exports.getListByParams = function (req, res) {

    const sql = 'select * from phobox where basetag=? and grouptag=? and linktag =? and itemtag=? and emotag=? and extratag=? order by pid desc'

    db.query(sql, [req.body.basetag,req.body.grouptag,req.body.linktag,req.body.itemtag,req.body.emotag,req.body.extratag], function (err, results) {
        if (err) return res.cc(err)

        // 当前页码
        pager.page = req.body.page
        // 总共查询到的记录
        pager.maxnum = results.length
        // 每页显示的记录数
        pager.pagesize = 2
        // 一共有多少页
        pager.total = Math.ceil(pager.maxnum / pager.pagesize)

        // 将查询的结果进行切片
        let startindex = (pager.page - 1) * pager.pagesize
        var datalist = results.splice(startindex, pager.pagesize)

        res.send({
            status: 0,
            message: '查询图片列表成功!',
            data: datalist,
            varpage: pager,
        })
    })
}

// 根据作者搜索栏获取图片列表数据

exports.getListByName = function (req, res) {
    const sql = 'select * from phobox where name =? or extraname =? order by pid desc'


    db.query(sql, [req.body.name, req.body.name], function (err, results) {
        if (err) return res.cc(err)

        // 当前页码
        pager.page = req.body.page
        // 总共查询到的记录
        pager.maxnum = results.length
        // 每页显示的记录数
        pager.pagesize = 2
        // 一共有多少页
        pager.total = Math.ceil(pager.maxnum / pager.pagesize)

        // 将查询的结果进行切片
        let startindex = (pager.page - 1) * pager.pagesize
        var datalist = results.splice(startindex, pager.pagesize)

        res.send({
            status: 0,
            message: '查询作者图片成功!',
            data: datalist,
            varpage: pager,
        })
    })
}

exports.getTagLst = function (req, res) {
    const sql = 'select * from taglist'

    db.query(sql, function (err, results) {
        if (err) return res.cc(err)

        res.send({
            status: 0,
            message: '获取标签列表成功!',
            data: results,
        })
    })
}

exports.getMainTag=function(req,res){
    const sql = 'select * from maintag'

    db.query(sql, function (err, results) {
        if (err) return res.cc(err)

        res.send({
            status: 0,
            message: '获取标签列表成功!',
            data: results,
        })
    })
}