<template>
  <div class="fillContain" style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
    <div style="margin: 40px 300px;">
      <div style="text-align: center;width: 400px;margin: 20px 0px">
        <div style="font-size: 20px;margin: 20px 0px 40px 40px;text-align: center">密码更改</div>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px">
          <el-form-item label="原始密码" prop="oldPass">
            <el-input type="password" v-model="ruleForm2.oldPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">确认更改</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
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
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        pass: '',
        checkPass: '',
        oldPass: ''
      },
      teacherId: '',
      rules2: {
        oldPass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var teacherId = localStorage.getItem('userId')
          axios.post('/teachers/changePwd', {
            teacherId: teacherId,
            oldPwd: this.ruleForm2.oldPass,
            password: this.ruleForm2.pass
          }).then((response) => {
            let res = response.data
            if (res.status === '0') {
              this.$message({
                type: 'success',
                message: '更改成功'
              })
              this.$refs[formName].resetFields()
            } else if (res.status === '2') {
              this.$message({
                type: 'error',
                message: '原始密码错误！'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
