/*
 * @Author: your name
 * @Date: 2020-12-16 19:54:13
 * @LastEditTime: 2020-12-18 17:13:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zmy\express\routes\users.js
 */
const express = require('express')
const router = express.Router()
const log = require('../controllers/userController')

router.post('/sendcode', log.sendCode)
router.post('/codelogin', log.codeLogin)
router.post('/login', log.login)

module.exports = router