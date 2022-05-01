// 路由模块只存储只存放客户端的请求与处理函数之间的映射关系
// 这是卡片列表路由模块

// 导入express来创建路由
const express=require('express')
// 创建路由对象
const router=express.Router()

// 导入卡片列表的路由处理函数模块
const pholist_hand=require('../router_hand/card')
// 获取卡片列表的路由
router.post('/pholist',pholist_hand.getPhoList)

// 根据查询参数获取图片列表
router.post('/phoitem',pholist_hand.getListByParams)

router.post('/author',pholist_hand.getListByName)

router.get('/taglist',pholist_hand.getTagLst)

router.get('/maintag',pholist_hand.getMainTag)
// 向外暴露共享路由对象
module.exports=router