/*
 * @Author: your name
 * @Date: 2020-12-16 19:07:34
 * @LastEditTime: 2020-12-21 16:25:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zmy\express\app.js
 */

// const createError = require('http-errors')
const express = require('express')
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

const app = express()


// app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'pubic')))
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  next()
})
// post请求
app.use(bodyParser.urlencoded({ extended:true }))
app.use('/', indexRouter)
app.use('/users', userRouter)


app.listen(8000, () => {
  console.log("Server is rning...")
})
