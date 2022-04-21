// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
  host: '101.35.211.143',
  user: 'root',
  password: 'muxin',
  database: 'phobox',
})

// 向外共享 db 数据库连接对象
module.exports = db