/*
 * @Author: your name
 * @Date: 2020-12-16 19:08:02
 * @LastEditTime: 2020-12-18 17:31:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zmy\express\util\dbconfig.js
 */

const mysql = require('mysql')
module.exports = {
  config: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'wt182320..',
    database: 'User'
  },
  // 连接数据库， 使用mysql的连接池连接方式
  // 连接池对象
  sqlConnect:function(sql, sqlArr, callBack) {
    var pool = mysql.createPool(this.config)
    pool.getConnection((err, connection) => {
    
      if (err) {
        console.log('连接失败')
        return
      }  
      // 事件驱动回调
      connection.query(sql, sqlArr, callBack)
      // 释放连接
      connection.release()
    })
  }
}