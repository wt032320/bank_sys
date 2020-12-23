<!--
 * @Author: your name
 * @Date: 2020-12-16 17:37:46
 * @LastEditTime: 2020-12-22 19:18:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zmy\bank_sys\src\views\login\Login.vue
-->
<template>
  <div class="login-container">
    <!--
      配置 Form 表单验证
      1.必须给 el-form 组件绑定 model 为表单数据对象
      2.给需要验证的表单项 el-form-item 绑定prop属性
      3.通过 el-form 组件的rules属性配置验证规则
      4.手动触发表单验证： 给 el-form 设置 ref , 通过ref 获取 el-form 调用组件的 validate 进行验证
    -->
    <el-form
      class="login-form"
      ref="login-form"
      :model="user"
      :rules="formRules"
    >
      <div class="login-head">
        <img src="./ss.jpg" alt="" width="300px" height="60px">
      </div>
      <el-form-item prop="name">
        <el-input
          v-model="user.name"
          placeholder="请输入用户名或身份证号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="user.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="isAgree">
        <el-checkbox v-model="user.isAgree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onLogin"
          class="btn"
          :loading="loginLoading"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request.js'
export default {
  name: 'LoginIndex',
  components: {

  },
  data () {
    return {
      user: {
        name: '18829705316', // 用户名或手机号
        password: '123456', // 密码
        isAgree: false // 是否同意协议
      },
      loginLoading: false, // 登录状态
      formRules: { // 表单验证规则
        name: [
          { required: true, message: '请输入用户名或手机号', trigger: 'blur' },
          { pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, message: '请输入正确的用户名或手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        isAgree: [
          {
            // 自定义校验规则
            // 验证通过： callback()
            // 验证失败： callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请勾选用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 表单验证
      this.$refs['login-form'].validate(valid => {
        // 如果表单验证失败, 停止请求提交
        if (!valid) {
          return
        }
        // 获取表单数据
        const user = this.user
        const params = new URLSearchParams()
        params.append('username', user.name)
        params.append('password', user.password)
        // 验证通过，提交登录
        // 开启loading...
        this.loginLoading = true
        request({
          method: 'POST',
          url: `users/login?username=${user.name}&password=${user.password}`,
          data: params
        }).then(res => {
          console.log(res)
          // 登录成功
          this.$message({
            message: '登录成功',
            type: 'success'
          })

          // 关闭loading...
          this.loginLoading = false
          // 跳转
          this.$router.push({
            name: 'Home'
          })
        }).catch(error => {
          console.log(error)
          this.$message.error('登陆失败,手机号或验证码错误')

          // 关闭loading...
          this.loginLoading = false
        })
      })
    }
  }
}
</script>
<style lang="css">
  .login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('./login_bg.jpg') no-repeat;
    background-size: cover;
  }
  .login-head {
    margin-bottom: 30px;
  }
  .login-form {
    background-color: #fff;
    padding: 50px;
    min-width: 300px;
  }

  .btn {
    width: 100%;
  }

</style>
