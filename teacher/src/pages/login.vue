<template>
  <div class="fillContain">
    <el-row class="fillContain" style="min-width: 1024px">
      <!--左边-->
      <el-col :span="12" class="loginLeft" style="height:100%">
      </el-col>
      <!--右边-->
      <el-col :span="12" class="loginRight" style="height:100%">
          <div class="loginBox">
            <p style="text-align:center;font-family:Microsoft YaHei;font-size: 28px">教师用户</p>
            <el-input v-model="teacherId" placeholder="请输入教师工号" style="margin:10px 0px" class="userBtn"></el-input>
            <el-input v-model="password" placeholder="请输入账号密码" style="margin:10px 0px 10px 0px" type="password"></el-input>
            <div>
                <el-checkbox v-model="checked" style="float: left">记住密码</el-checkbox>
                <el-button type="text" style="float:right;padding:0px;">忘记密码？</el-button>
            </div>
            <el-button type="primary" style="width: 100%;clear: both;margin:10px 0px 0px 0px" @click="login">登   录</el-button>
            <p style="text-align:center;font-family:Microsoft YaHei;font-size: small">还没有账号？<el-button type="text" @click="registerModel = true">点击注册</el-button></p>
          </div>
      </el-col>
    </el-row>
    <!--添加课程模态框-->
    <el-dialog title="用户注册" :visible.sync="registerModel" width="40%" :before-close="registerClose">
      <el-form :model="form" :label-position="labelPosition" >
        <el-form label-position="right" label-width="80px" :model="form" :rules="rules">
          <el-form-item label="教师工号" prop="teacherId">
            <el-input v-model="form.teacherId"></el-input>
          </el-form-item>
          <el-form-item label="教师姓名" prop="teacherName">
            <el-input v-model="form.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="passwordRepeat">
            <el-input v-model="form.passwordRepeat" type="password"></el-input>
          </el-form-item>
        </el-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="registerClose">取 消</el-button>
        <el-button type="primary" @click="register">注册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      var reg = /^.{6,}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('密码至少六位'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      var reg = /^.{6,}$/
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('密码至少六位'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      teacherId: '',
      password: '',
      checked: true,
      registerModel: false,
      labelPosition: 'right',
      form: {
        teacherId: '',
        password: '',
        passwordRepeat: '',
        teacherName: ''
      },
      rules: {
        teacherId: [
          { required: true, message: '请输入教师工号', trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        passwordRepeat: [
          { required: true, trigger: 'blur', validator: validatePass2 }
        ],
        teacherName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    login () {
      axios.post('/teachers/login', {
        teacherId: this.teacherId,
        password: this.password
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.$message({
            type: 'success',
            message: '登录成功'
          })
          this.$store.commit('updateTeacherName', res.result.userName)
          localStorage.setItem('userName', res.result.userName)
          this.$store.commit('updateTeacherId', res.result.userId)
          localStorage.setItem('userId', res.result.userId)
          this.$router.push('teacher/classManage')
        } else {
          this.$message({
            type: 'error',
            message: '登录失败,请确认账号或密码是否正确'
          })
        }
      })
    },
    // 取消注册
    registerClose () {
      this.form.teacherId = ''
      this.form.password = ''
      this.form.passwordRepeat = ''
      this.form.teacherName = ''
      this.registerModel = false
    },
    // 注册
    register () {
      if (this.form.password !== this.form.passwordRepeat) {
        this.$message({
          type: 'error',
          message: '两次输入密码不一致'
        })
      } else {
        axios.post('/teachers/register', {
          teacherId: this.form.teacherId,
          password: this.form.password,
          teacherName: this.form.teacherName
        }).then((response) => {
          let res = response.data
          if (res.status === '0') {
            console.log('注册成功')
            this.$message({
              type: 'success',
              message: '注册成功请登录'
            })
            this.form.teacherId = ''
            this.form.password = ''
            this.form.passwordRepeat = ''
            this.form.teacherName = ''
            this.registerModel = false
          } else if (res.status === '2') {
            console.log('注册失败')
            this.$message({
              type: 'error',
              message: '该账号已注册'
            })
          }
        })
      }
    }

  }
}
</script>

<style scoped>
  .loginLeft{
    background-image: url("./../assets/login-left.png");
    background-size:100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    position:relative;
  }
  .loginRight{
    position:relative;
  }
  .loginBox{
    width: 360px;
    height: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -240px;
    margin-left: -180px;
  }
</style>
