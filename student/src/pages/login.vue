<template>
  <div>
    <!--logo-->
    <div style="text-align: center;padding-top: 50px;">
      <img src="./../assets/logo.png" style="height: 140px"/>
    </div>
    <!--用户-->
    <div style="text-align: center;margin-top: 40px;">
      <el-input v-model="studentId" placeholder="输入学号" size="medium" style="width: 75%;" >
        <img slot="prefix" src="./../assets/user.png" style="height: 20px;padding: 8px 0px">
      </el-input>
    </div>
    <!--密码-->
    <div style="text-align: center;margin-top: 15px;">
      <el-input v-model="password" placeholder="输入密码" size="medium" type="password" style="width: 75%;" >
        <img slot="prefix" src="./../assets/password.png" style="height: 20px;padding: 8px 0px">
      </el-input>
    </div>
    <!--登录-->
    <div style="text-align: center;margin-top: 15px;">
      <el-button type="primary" round size="medium" style="width: 75%;height: 36px;" @click="login">登录</el-button>
    </div>
    <div style="text-align: center;margin-top: 10px;display: flex;justify-content: space-between;align-items: center;">
      <el-button type="text" size="small" style="width: 45%;" @click="register">立即注册</el-button>
      <el-button type="text" size="small" style="width: 45%;color: #303133">忘记密码？</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      studentId: '',
      password: '',
      value: '',
      show: false
    }
  },
  methods: {
    register () {
      this.$router.push('/register')
    },
    login () {
      axios.post('/students/login', {
        studentId: this.studentId,
        password: this.password
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.$store.commit('updateStudentName', res.result.userName)
          localStorage.setItem('userName', res.result.userName)
          this.$store.commit('updateStudentId', res.result.userId)
          localStorage.setItem('userId', res.result.userId)
          this.$router.push('/home')
        } else {
          this.$message({
            type: 'error',
            message: '登录失败'
          })
        }
      })
    }
  }
}
</script>

<style>
  .el-input--prefix .el-input__inner {
  border-radius: 30px;
  padding-left: 40px!important;
  border-color: #303133;
}
  .el-input__prefix{
    margin: 0px 10px;
  }
</style>
