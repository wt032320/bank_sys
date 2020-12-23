/*
 * @Author: your name
 * @Date: 2020-12-21 18:32:45
 * @LastEditTime: 2020-12-21 18:43:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zmy\bank_sys\src\api\user.js
 */
// 用户相关请求模块

// 用户登录
export const login = params => {
  return  request({
    method: 'POST',
    url: `users/login?username=${user.name}&password=${user.password}`,
    data: params
  })
}
// 获取用户信息
// export const getmoney = () => {

// }
// 修改用户信息
// export const updateMoney = () => {

// }