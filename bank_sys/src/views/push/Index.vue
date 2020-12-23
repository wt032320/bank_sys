<!--
 * @Author: your name
 * @Date: 2020-12-22 19:29:08
 * @LastEditTime: 2020-12-23 20:00:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zmy\bank_sys\src\views\push\Index.vue
-->
<template>
  <div class="push-money">
    <el-form
      class="push-form"
      ref="push-form"
      :model="user"
      :rules="formRules"
    >
      <el-form-item prop="cardnumber">
        <el-input
          v-model="user.cardnumber"
          placeholder="请输入银行卡号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="money">
        <el-input
          v-model="user.money"
          placeholder="请输入存款金额(:元)"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="pushMoney"
          class="btn"
          :loading="loginLoading"
        >存款</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import request from '@/utils/request.js'
export default {
  name: 'pushMoney',
  data () {
    return {
      user: {
        cardnumber: '',
        money: '',
        nmoney: ''
      },
      loginLoading: false, // 查询状态
      formRules: { // 表单验证规则
        cardnumber: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' },
          { pattern: /^([1-9]{1})(\d{14}|\d{17})$/, message: '请输入正确的银行卡号' }
        ]
      }
    }
  },
  methods: {
    pushMoney () {
      // 表单验证
      this.$refs['push-form'].validate(valid => {
        // 如果表单验证失败, 停止请求提交
        if (!valid) {
          return
        }
        // 获取表单数据
        const user = this.user
        const param = new URLSearchParams()
        param.append('cardnumber', user.cardnumber)
        // 验证通过，提交登录
        // 开启loading...
        this.loginLoading = true
        request({
          method: 'POST',
          url: `getmoney/?cardnumber=${user.cardnumber}`,
          data: param
        }).then(res => {
          const ss = parseInt(res.data.list[0].deposit) + parseInt(user.money)
          user.nmoney = String(ss)
        })
        const params = new URLSearchParams()
        params.append('cardnumber', user.cardnumber)
        params.append('nmoney', user.nmoney)
        request({
          method: 'POST',
          url: `drawmoney/?cardnumber=${user.cardnumber}&money=${user.nmoney}`,
          data: params
        }).then(res => {
          // 取款
          this.$message({
            message: '存款成功',
            type: 'success'
          })

          // 关闭loading...
          this.loginLoading = false
        }).catch(error => {
          console.log(error)
          this.$message.error('存款失败,银行卡号错误')

          // 关闭loading...
          this.loginLoading = false
        })
      })
    }
  }
}
</script>
<style>
  .push-money {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
  }

  .btn {
    width: 100%;
  }
</style>
