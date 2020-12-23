/*
 * @Author: your name
 * @Date: 2020-12-18 18:01:44
 * @LastEditTime: 2020-12-23 14:18:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zmy\bank_sys\src\utils\request.js
 */
import axios from 'axios'

// 创建一个axios实例 我们通过这个实例去发请求
const request = axios.create({
  // baseURL: 'http://yy.gz2vip.idcfengye.com' // 请求的基础路径
  baseURL: 'http://localhost:8000'
})
// 导出请求方法
export default request
