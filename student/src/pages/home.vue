<template>
    <div>
      <!--logo-->
      <el-row>
        <el-col :span="24">
          <div style="text-align: center;padding: 50px 0px 30px 0px;font-family:Hiragino Sans GB;color: #606266;text-align: center;">
            <div style="font-size: 26px;">课堂教学辅助系统</div>
            <div style="font-size: 20px;margin-bottom: 10px;">—FourDays—</div>
            <div>欢迎使用，<span>{{$store.state.studentName}}</span>同学</div>
          </div>
        </el-col>
      </el-row>
      <!--七大板块-->
      <el-row style="margin: 0px 10px;font-size: 14px;color: #3A4049">
        <el-col :span="8">
          <div style="text-align: center;padding: 20px 0px;border-bottom:solid 1px #909399;border-right:solid 1px #909399">
            <div @click="goOne">
              <img src="./../assets/icon1.png" style="height: 40px;"/>
              <div style="margin: 5px 0px">我的课程</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="text-align: center;padding: 20px 0px;border-bottom:solid 1px #909399;border-right:solid 1px #909399">
            <div @click="goTwo">
              <img src="./../assets/icon2.png" style="height: 40px;"/>
              <div style="margin: 5px 0px">在线答题</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="text-align: center;padding: 20px 0px;border-bottom:solid 1px #909399">
            <div @click="goThree">
              <img src="./../assets/icon3.png" style="height: 40px;"/>
              <div style="margin: 5px 0px">成绩查询</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="text-align: center;padding: 20px 0px;border-bottom:solid 1px #909399;border-right:solid 1px #909399">
            <div @click="goFour">
              <img src="./../assets/icon4.png" style="height: 40px;"/>
              <div style="margin: 5px 0px">错题本</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="text-align: center;padding: 20px 0px;border-bottom:solid 1px #909399;border-right:solid 1px #909399">
            <div @click="goFive">
              <img src="./../assets/icon5.png" style="height: 40px;"/>
              <div style="margin: 5px 0px">知识点查看</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="text-align: center;padding: 20px 0px;border-bottom:solid 1px #909399">
            <img src="./../assets/icon8.png" style="height: 40px;"/>
            <div style="margin: 5px 0px">消息通知</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="text-align: center;padding: 20px 0px;border-right:solid 1px #909399">
            <div @click="goSeven">
              <img src="./../assets/icon6.png" style="height: 40px;"/>
              <div style="margin: 5px 0px">个人中心</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="text-align: center;padding: 20px 0px;border-right:solid 1px #909399">
            <div  @click="logOut">
              <img src="./../assets/icon7.png" style="height: 40px;"/>
              <div style="margin: 5px 0px">退出</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import axios from 'axios'
import { MessageBox } from 'mint-ui'
export default {
  methods: {
    goOne () {
      this.$router.push('/courseList')
    },
    goTwo () {
      this.$router.push('/courseList2')
    },
    goThree () {
      this.$router.push('/courseList3')
    },
    goFour () {
      this.$router.push('/courseList4')
    },
    goFive () {
      this.$router.push('/kPoint')
    },
    goSeven () {
      this.$router.push('/userCenter')
    },
    logOut () {
      MessageBox.confirm('确定退出?').then(action => {
        axios.post('/students/logout').then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.$store.commit('updateStudentName', '')
            this.$store.commit('updateStudentId', '')
            localStorage.clear()
            this.$router.push('/')
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
