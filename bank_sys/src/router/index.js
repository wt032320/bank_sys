/*
 * @Author: your name
 * @Date: 2020-12-16 17:26:54
 * @LastEditTime: 2020-12-22 19:30:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zmy\bank_sys\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login/Index.vue')
const Home = () => import('@/views/home/Index.vue')
const Layout = () => import('@/views/layout/Index.vue')
const LookMoney = () => import('@/views/look/Index.vue')
const GetMoney = () => import('@/views/get/Index.vue')
const PushMoney = () => import('@/views/push/Index.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    // name: 'Layout', 如果有默认子路由 就不要给父路由设置name
    component: Layout,
    children: [
      {
        path: '', // path为空会作为默认子路由
        name: 'Home',
        component: Home
      },
      {
        path: '/lookmoney',
        name: 'look',
        component: LookMoney
      },
      {
        path: '/getmoney',
        name: 'get',
        component: GetMoney
      },
      {
        path: '/pushmoney',
        name: 'push',
        component: PushMoney
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
