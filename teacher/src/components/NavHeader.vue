<template>
<div>
  <div class="navbar">
    <div class="navbar-left-container"></div>
    <div class="navbar-right-container" style="display: flex;">
      <img src="./../assets/user-1.png" style="margin: 0px 15px 0px 0px;height: 30px"/>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">{{$store.state.teacherName}}<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="goPwd">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        axios.post('/teachers/logout').then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.$store.commit('updateTeacherName', '')
            this.$store.commit('updateTeacherId', '')
            localStorage.clear()
            this.$router.push('/')
          }
        })
      } else if (command === 'goPwd') {
        this.$router.push({path: '/teacher/changePwd'})
      }
    }
  }
}
</script>

<style scoped>
  .navbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .navbar-left-container{
    margin: 10px;
  }
  .navbar-right-container{
    margin: 10px;
  }
  .navbar-right-container{
    align-items: center;
  }

</style>
