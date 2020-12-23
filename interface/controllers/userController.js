/*
 * @Author: your name
 * @Date: 2020-12-18 14:47:47
 * @LastEditTime: 2020-12-22 20:27:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zmy\interface\controllers\userController.js
 */
const dbConfig = require('../util/dbconfig')
function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

let validatePhone = []

// 手机号是否收到过验证码
let sendCodeP = (phone) => {
  for (let item of validatePhone) {
    if (phone == item.phone) {
      return true
    }
  }
  return false
}

// 验证码和手机号是否匹配
let findCodeAndPhone = (phone, code) => {
  for (let item of validatePhone) {
    if (phone == item.phone && code == item.code) {
      return 1
    }
  }
  return 0
}
// 模拟验证码发送接口
sendCode = (req, res) => {
  let phone = req.query.phone
  if (sendCodeP(phone)) {
    res.send({
      'code': 400,
      'msg': '已经发送过验证码'
    })
  }
  let code = rand(1000, 9999)
  validatePhone.push({
    'phone': phone,
    'code': code
  })
  console.log(validatePhone)
  res.send({
    'code': 200,
    'msg': 'success'
  })
}

// 验证码登录接口
codeLogin = (req, res) => {
  let { phone, code } = req.query
  // 验证手机号是否发送过验证码
  if (sendCodeP(phone)) {
    // 验证码是否和手机号匹配
    let status = findCodeAndPhone(phone, code)
    if (status) {
      // 登录成功
      // 登录成功之后的操作
      res.send({
        'code': 200,
        'msg': 'success'
      })
    } else {
      res.send({
        'code': 400,
        'msg': '登录失败'
      })
    }
  } else {
    res.send({
      'code': 400,
      'msg': '未发送验证码'
    })
  }
}

// 用户名/手机号 登录
login = (req, res) => {
  let username = req.query.username
  let password = req.query.password
  let usernm = /^[-_a-zA-Z]{4,16}$/
  let phone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
  if (usernm.test(username)) {
    let sql = 'select * from userinfo where name=? and password=?'
    let sqlArr = [username, password]
    const callBack = (err, data) => {
      if (err) {
        res.sendStatus(400)
      } else if (data == '') {
        res.sendStatus(401)
      } else {
        res.sendStatus(200)
      }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  } else if (phone.test(username)) {
    let sql = 'select * from userinfo where phone=? and password=?'
    let sqlArr = [username, password]
    const callBack = (err, data) => {
      if (err) {
        res.sendStatus(400)
      } else if (data == '') {
        res.sendStatus(401)
      } else {
        res.sendStatus(200)
      }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  }
}
module.exports = {
  sendCode,
  codeLogin,
  login
}