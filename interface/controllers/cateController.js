/*
 * @Author: your name
 * @Date: 2020-12-18 13:41:22
 * @LastEditTime: 2020-12-23 19:57:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zmy\interface\controllers\cateController.js
 */
const dbConfig = require('../util/dbconfig')
// 查余额
getData = (req, res) => {
  let cardnumber = req.query.cardnumber
  const sql = 'select deposit from userinfo where card_number=?'
  const sqlArr = [cardnumber]
  const callBack = (err, data) => {
    if (err) {
      res.sendStatus(400)
    } else {
      res.send({
        list: data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}

// 获取客户存款
lookMoney = (req, res) => {
  let cardNumber = req.query.cardnumber
  let cardPassword = req.query.password
  let card = /^([1-9]{1})(\d{14}|\d{17})$/
  if (card.test(cardNumber)) {
    let sql = 'select deposit from userinfo where card_number=? and card_password=?'
    let sqlArr =[cardNumber, cardPassword]
    const callBack = (err, data) => {
      if (err) {
        res.sendStatus(400)
      } else if (data == '') {
        res.sendStatus(401)
      } else {
        res.status(200).send({
          list: data
        })
      }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  }
}

// 取/存钱
drawMoney = (req, res) => {
  let cardnumber = req.query.cardnumber
  let money = req.query.money
  let card = /^([1-9]{1})(\d{14}|\d{17})$/
  if (card.test(cardnumber)) {
    let sql1 = 'update userinfo set deposit=? where card_number=?'
    let sqlArr1 = [money, cardnumber]
    const callBackc = (err, data) => {
      if (err) {
        res.sendStatus(400)
      } else {
        res.sendStatus(200)
      }
    }
    dbConfig.sqlConnect(sql1, sqlArr1, callBackc)
  }
}

module.exports = {
  getData,
  lookMoney,
  drawMoney
}