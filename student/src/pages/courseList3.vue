<template>
  <div>
    <!--顶部-->
    <div v-bind:class="{ top: isActive }">
      <div style="display: flex;align-items: center;">
        <img src="./../assets/home.png" style="height: 20px;padding: 0px 10px 0px 20px; border-right: 1px solid #C0C4CC;" @click="goHome"/>
        <div style="color: #606266;margin-left: 15px;font-size: 16px;min-width: 80px;">成绩查询</div>
      </div>
      <div style="display: flex;align-items: center;">
        <i class="el-icon-warning" style="color:#67C23A;"></i><span style="margin:0px 20px 0px 5px;font-size: 14px;color: #67C23A">请先选择课程</span>
      </div>
    </div>
    <div style="height: 35px"></div>
    <group>
      <cell v-for="value in courseList" :key="value._id" :title=value.courseName :link="{path:'/allScore',query:{courseId:value._id}}" >
        <span style="font-size: 16px">{{value.schoolYear}}</span>
        <span style="font-size: 16px;margin-right:10px ">{{myfliter(value.semester)}}</span>
      </cell>
    </group>
  </div>
</template>

<script>
import axios from 'axios'
import { Cell, CellBox, CellFormPreview, Group } from 'vux'
export default {
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox
  },
  data () {
    return {
      isActive: true,
      isNull: false,
      courseList: []
    }
  },
  mounted () {
    this.getCoursesList()
  },
  methods: {
    myfliter (value) {
      return '第' + value + '学期'
    },
    goHome () {
      this.$router.push('/home')
    },
    goAdd () {
      this.$router.push('/addCourse')
    },
    getCoursesList () {
      var studentId = localStorage.getItem('userId')
      var param = {
        studentId: studentId
      }
      axios.get('/lists/getCourse', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '2') {
          this.courseList = []
          this.isNull = true
        } else {
          this.isNull = false
          this.courseList = res.result
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
