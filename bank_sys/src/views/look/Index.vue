<!--
 * @Author: your name
 * @Date: 2020-12-22 19:09:05
 * @LastEditTime: 2020-12-23 17:04:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zmy\bank_sys\src\views\look\Index.vue
-->
<template>
  <div class="look-money">
    <el-form
      class="look-form"
      ref="look-form"
      :model="user"
      :rules="formRules"
    >
      <el-form-item prop="cardnumber">
        <el-input
          v-model="user.cardnumber"
          placeholder="请输入银行卡号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="user.password"
          placeholder="请输入银行卡密码"
        ></el-input>
      </el-form-item>
      <el-form-item id="mon" style="display: none">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="money"
            label="余额(:元)"
            width="180">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="query"
          class="btn"
          :loading="loginLoading"
        >查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import request from '@/utils/request.js'
export default {
  name: 'LookMoney',
  data () {
    return {
      user: {
        cardnumber: '',
        password: ''
      },
      tableData: [{
        money: ''
      }],
      loginLoading: false, // 查询状态
      formRules: { // 表单验证规则
        cardnumber: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' },
          { pattern: /^([1-9]{1})(\d{14}|\d{17})$/, message: '请输入正确的银行卡号' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ]
      }
    }
  },
  methods: {
    query () {
      // 表单验证
      this.$refs['look-form'].validate(valid => {
        // 如果表单验证失败, 停止请求提交
        if (!valid) {
          return
        }
        // 获取表单数据
        const user = this.user
        const params = new URLSearchParams()
        params.append('cardnumber', user.cardnumber)
        params.append('password', user.password)
        // 验证通过，提交登录
        // 开启loading...
        this.loginLoading = true
        request({
          method: 'POST',
          url: `lookmoney/?cardnumber=${user.cardnumber}&password=${user.password}`,
          data: params
        }).then(res => {
          this.tableData[0].money = res.data.list[0].deposit
          const m = document.getElementById('mon')
          m.style.display = 'block'
          // 查询
          this.$message({
            message: '查询成功',
            type: 'success'
          })

          // 关闭loading...
          this.loginLoading = false
        }).catch(error => {
          console.log(error)
          const m = document.getElementById('mon')
          m.style.display = 'none'
          this.$message.error('查询失败,银行卡号或密码错误')

          // 关闭loading...
          this.loginLoading = false
        })
      })
    }
  }
}
</script>
<style lang="css">
  .look-money {
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
