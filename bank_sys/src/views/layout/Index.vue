<!--
 * @Author: your name
 * @Date: 2020-12-22 15:51:38
 * @LastEditTime: 2020-12-22 19:59:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zmy\bank_sys\src\views\layout\Index.vue
-->
<template>
  <el-container class="layout-comtainer">
    <el-aside
      class="aside"
      width="auto"
    >
      <app-aside class="aside-menu" :is-collapse="isCollapse"/>
    </el-aside>
    <el-container>
      <el-header
        class="header"
      >
        <div>
          <i :class="{ 'el-icon-s-fold': isCollapse, 'el-icon-s-unfold': !isCollapse }" @click="isCollapse=!isCollapse"></i>
          <span>网上银行个人信息查询系统</span>
        </div>
        <div class="head">
          <img src="./sss.jpg" alt="">
          <span>admin</span>
        </div>
      </el-header>
      <el-main
        class="main"
      >
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/Aside'
export default {
  name: 'Layout',
  components: {
    AppAside
  },
  data () {
    return {
      isCollapse: false // 折叠
    }
  }
}
</script>

<style>
  .layout-comtainer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  /* .aside {
    background-color: blue;
  } */

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #cccccc;
  }

  .aside-menu {
    height: 100%;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .head {
    display: flex;
    align-items: center;
  }

  .main {
    padding: 0;
  }
</style>
