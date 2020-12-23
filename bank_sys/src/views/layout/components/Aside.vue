<!--
 * @Author: your name
 * @Date: 2020-12-22 16:41:52
 * @LastEditTime: 2020-12-22 19:25:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zmy\bank_sys\src\views\layout\components\Aside.vue
-->
<template>
  <el-menu
    default-active="/layout"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
  >
    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/pushmoney">
      <i class="el-icon-money"></i>
      <span slot="title">存款</span>
    </el-menu-item>
    <el-menu-item index="/getmoney">
      <i class="el-icon-wallet"></i>
      <span slot="title">取款</span>
    </el-menu-item>
    <el-menu-item index="/lookmoney">
      <i class="el-icon-s-data"></i>
      <span slot="title">查询余额</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'AppAside',
  props: ['is-collapse'],
  data () {
    return {
      // isCollapse: false
    }
  }
}
</script>
<style>

</style>
