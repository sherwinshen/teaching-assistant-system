<template>
  <div style="height: 100%">
    <!--顶部-->
    <div v-bind:class="{ top: isActive }">
      <div style="display: flex;align-items: center;">
        <img src="./../assets/home.png" style="height: 20px;padding: 0px 10px 0px 20px; border-right: 1px solid #C0C4CC;" @click="goHome"/>
        <div style="color: #606266;margin-left: 15px;font-size: 16px;min-width: 80px;">我的课程</div>
      </div>
      <div>
        <el-button type="text" icon="el-icon-circle-plus-outline" style="margin-right: 20px" @click="goAdd">添加课程</el-button>
      </div>
    </div>
    <div style="height: 35px"></div>
    <group v-if="this.isNull === false">
      <cell v-for="value in courseList" :key="value._id" :inline-desc="'任课老师：'+value.teacherName" :title=value.courseName :link="{path:'/myCourse',query:{courseId:value._id}}" >
        <span style="font-size: 16px">{{value.schoolYear}}</span>
        <span style="font-size: 16px;margin-right:10px ">{{myfliter(value.semester)}}</span>
      </cell>
    </group>
    <div v-if="this.isNull === true" style="text-align: center;height: 100%;display: flex;justify-content:center;align-items:center;color: #606266;">
      <div style="display: flex;align-items: center;">
        <img src="../assets/unamused.png" style="height: 30px;">
        <div style="margin-left:15px;font-size: 20px ">暂未加入课程</div>
      </div>
    </div>
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
