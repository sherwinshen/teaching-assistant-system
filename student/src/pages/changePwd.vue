<template>
    <div>
      <!--顶部-->
      <div v-bind:class="{ top: isActive }">
        <div style="display: flex;align-items: center;">
          <img src="./../assets/home.png" style="height: 20px;padding: 0px 10px 0px 20px; border-right: 1px solid #C0C4CC;" @click="goHome"/>
          <div style="color: #606266;margin-left: 15px;font-size: 16px;min-width: 80px;">修改密码</div>
        </div>
        <div>
          <el-button type="text" icon="el-icon-back" style="margin-right: 20px" @click="goBack">返回</el-button>
        </div>
      </div>
      <div style="height: 55px"></div>
      <div>
        <mt-field label="原始密码" placeholder="请输入密码" type="password" v-model="oldPwd"></mt-field>
        <mt-field label="新密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-field label="确认密码" placeholder="请输入密码" type="password" v-model="checkPwd"></mt-field>
      </div>
      <div style="text-align: center;margin: 10px 0px 0px 0px">
        <mt-button type="primary" style="margin: 5px 20px; width: 100px;" size="small" @click.native="postChange">确   认</mt-button>
        <mt-button type="default" style="margin: 5px 20px; width: 100px;" size="small" @click.native="clear">重   置</mt-button>
      </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import axios from 'axios'
export default {
  data () {
    return {
      isActive: true,
      oldPwd: '',
      password: '',
      checkPwd: ''
    }
  },
  methods: {
    goHome () {
      this.$router.push('/home')
    },
    goBack () {
      this.$router.back(-1)
    },
    postChange () {
      if (this.password !== this.checkPwd) {
        MessageBox('提示', '确认密码与新密码不一致！')
        this.password = ''
        this.checkPwd = ''
      } else {
        var studentId = localStorage.getItem('userId')
        axios.post('/students/changePwd', {
          studentId: studentId,
          oldPwd: this.oldPwd,
          password: this.password
        }).then((response) => {
          let res = response.data
          if (res.status === '0') {
            MessageBox('提示', '更新密码成功！').then(action => {
              this.oldPwd = ''
              this.password = ''
              this.checkPwd = ''
              this.$router.push('/home')
            })
          } else if (res.status === '2') {
            MessageBox('提示', '原始密码错误！')
            this.oldPwd = ''
          }
        })
      }
    },
    clear () {
      this.oldPwd = ''
      this.password = ''
      this.checkPwd = ''
    }
  }
}
</script>

<style scoped>

</style>
