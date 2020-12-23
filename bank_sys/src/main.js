/*
 * @Author: your name
 * @Date: 2020-12-16 17:26:54
 * @LastEditTime: 2020-12-16 17:45:11
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \zmy\bank_sys\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
