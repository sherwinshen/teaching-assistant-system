<template>
  <div>
    <!--logo-->
    <div style="text-align: center;margin-top: 50px;">
      <img src="./../assets/logo.png" style="height: 140px"/>
    </div>
    <!--用户-->
    <div style="text-align: center;margin-top: 40px;">
      <el-input v-model="studentId" placeholder="输入学号" size="medium" style="width: 75%;" >
        <img slot="prefix" src="./../assets/user.png" style="height: 20px;padding: 8px 0px">
      </el-input>
    </div>
    <div style="text-align: center;margin-top: 15px;">
      <el-input v-model="studentName" placeholder="输入姓名" size="medium" style="width: 75%;" >
        <img slot="prefix" src="./../assets/user.png" style="height: 20px;padding: 8px 0px">
      </el-input>
    </div>
    <!--密码-->
    <div style="text-align: center;margin-top: 15px;">
      <el-input v-model="password" placeholder="输入密码" size="medium" type="password" style="width: 75%;" >
        <img slot="prefix" src="./../assets/password.png" style="height: 20px;padding: 8px 0px">
      </el-input>
    </div>
    <!--密码-->
    <div style="text-align: center;margin-top: 15px;">
      <el-input v-model="password2" placeholder="再次输入密码" size="medium" type="password" style="width: 75%;" >
        <img slot="prefix" src="./../assets/password.png" style="height: 20px;padding: 8px 0px">
      </el-input>
    </div>
    <!--登录-->
    <div style="text-align: center;margin-top: 15px;">
      <el-button type="primary" round size="medium" style="width: 75%;height: 36px;" @click="register">注册</el-button>
    </div>
    <div style="text-align: center;margin-top: 10px;">
      <el-button type="text" size="small" style="width: 45%;" @click="goback" icon="el-icon-back">返回登录</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      studentId: '',
      studentName: '',
      password: '',
      password2: ''
    }
  },
  methods: {
    goback () {
      this.$router.push('/')
    },
    register () {
      if (this.password === '' || this.password2 === '' || this.studentId === '' || this.studentName === '') {
        // this.$messagebox('警告', '检查是否有内容未填写')
      } else if (this.password !== this.password2) {
        // this.$messagebox('警告', '两次密码输入不一致')
      } else {
        axios.post('/students/register', {
          studentId: this.studentId,
          password: this.password,
          studentName: this.studentName
        }).then((response) => {
          let res = response.data
          if (res.status === '0') {
            MessageBox.alert('注册成功').then(action => {
              this.$router.push('/')
            })
          } else if (res.status === '2') {
            this.$messagebox('警告', '该账号已注册')
            this.studentId = ''
            this.studentName = ''
            this.password = ''
            this.password2 = ''
          }
        })
      }
    }
  }
}
</script>

<style>
  .el-input--prefix .el-input__inner {
    border-radius: 30px;
    padding-left: 45px;
    border-color: #303133;
  }
  .el-input__prefix{
    margin: 0px 10px;
  }
</style>
