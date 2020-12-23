/*
 * @Author: your name
 * @Date: 2020-12-16 19:27:17
 * @LastEditTime: 2020-12-23 17:16:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zmy\express\routes\index.js
 */

const express = require('express')
const router = express.Router()
const data = require('../controllers/cateController')

router.post('/getmoney', data.getData)
router.post('/lookmoney', data.lookMoney)

router.post('/drawmoney', data.drawMoney)

module.exports = router
