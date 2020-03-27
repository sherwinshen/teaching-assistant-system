<template>
  <div class="fillContain">
    <el-container class="fillContain">
      <!--左侧区域-->
      <el-aside width="200px" style="box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);">
        <div class="logo" style="">
          <div class="logo-img">
            <img class="navbar-brand-logo" src="./../assets/logo-header.png" style="width:160px;margin-top: 5px"/>
          </div>
        </div>
        <el-menu style="border-right: solid 0px ;" :router="isTrue">
          <el-menu-item @click="go('classManage')" index="classManage" style="height:70px" >
            <img src="./../assets/icon1.png" style="width:30px;margin:20px 10px;"/>
            <span slot="title">课程管理</span>
          </el-menu-item>
          <el-menu-item @click="go('testRelease')" index="testRelease" style="height:70px">
            <img src="./../assets/icon2.png" style="width:30px;margin:20px 10px;"/>
            <span slot="title">试题发布</span>
          </el-menu-item>
          <el-menu-item @click="go('bankManage')" index="bankManage" style="height:70px">
            <img src="./../assets/icon3.png" style="width:30px;margin:20px 10px;"/>
            <span slot="title">题库管理</span>
          </el-menu-item>
          <el-menu-item @click="go('studentManage')" index="studentManage" style="height:70px">
            <img src="./../assets/icon4.png" style="width:30px;margin:20px 10px;"/>
            <span slot="title">学生管理</span>
          </el-menu-item>
          <el-menu-item @click="go('testStatistics')" index="testStatistics" style="height:70px">
            <img src="./../assets/icon5.png" style="width:30px;margin:20px 10px;"/>
            <span slot="title">成绩统计</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!--头部区域-->
        <el-header style="border-bottom: 1px solid rgba(0,0,0,.1);">
          <nav-header></nav-header>
        </el-header>
        <!--中间区域-->
        <el-main style="background: hsla(240,7%,81%,.15);padding: 10px">
            <router-view></router-view>
        </el-main>
        <!--<el-footer>Footer</el-footer>-->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import NavHeader from './../components/NavHeader'

export default {
  data () {
    return {
      isTrue: true
    }
  },
  components: {
    NavHeader
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
    go (index) {
      this.$router.push({ path: '/teacher/' + index })
    },
    checkLogin () {
      axios.get('/teachers/checkLogin').then((response) => {
        let res = response.data
        if (res.status === '0') {
        } else {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style scoped>
  .logo{
    padding: 10px 0px;
    margin: 0px 20px 20px 20px;
    border-bottom: 1px solid #9B9B9B;
  }
</style>
