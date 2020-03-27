<template>
  <div>
    <!--顶部-->
    <div v-bind:class="{ top: isActive }">
      <div style="display: flex;align-items: center;">
        <img src="./../assets/home.png" style="height: 20px;padding: 0px 10px 0px 20px; border-right: 1px solid #C0C4CC;" @click="goHome"/>
        <div style="color: #606266;margin-left: 15px;font-size: 18px;min-width: 80px;">添加课程</div>
      </div>
      <div>
        <el-button type="text" icon="el-icon-back" style="margin-right: 20px" @click="goBack">返回</el-button>
      </div>
    </div>
    <div style="height: 55px"></div>
    <!--搜索部分-->
    <div style="padding: 5px 10px;background-color: #EFEFF4;">
      <el-row :gutter="10">
        <el-col :span="18">
          <x-input placeholder="请输入教师姓名或课程名称" style="background-color: #FFF;height:15px;" v-model="value">
            <i class="el-icon-search"></i>
          </x-input>
        </el-col>
        <el-col :span="6">
          <x-button style="background-color:#409EFF;height:35px;color: #FFF;font-size: 15px;" @click.native="searchCourse">搜索</x-button>
        </el-col>
      </el-row>
    </div>
    <!--显示部分-->
    <group style="margin-top: -20px">
      <!--<cell-box v-for="value in courseList" :key="value._id">-->
        <!--<span>{{value.courseName}}</span>&nbsp;<span style="font-size: small;color: #909399">任课老师：{{value.teacherName}}</span>-->
        <!--<el-button type="text" icon="el-icon-plus">添加</el-button>-->
      <!--</cell-box>-->
      <cell v-for="value in courseList" :key="value._id" :title="value.courseName" :inline-desc="'教师: ' + value.teacherName +  ' '  + '班级: ' + value.className ">
        <el-button icon="el-icon-plus" size="small" @click="add(value._id)">添加</el-button>
      </cell>
    </group>

  </div>
</template>

<script>
import { Search, XButton, XInput, Card, Cell, CellBox, Group, Alert, AlertModule } from 'vux'
import axios from 'axios'
export default {
  components: {
    Search,
    XButton,
    XInput,
    Card,
    CellBox,
    Group,
    Cell,
    Alert,
    AlertModule
  },
  data () {
    return {
      isActive: true,
      value: '',
      courseList: [],
      isNull: true
    }
  },
  methods: {
    goHome () {
      this.$router.push('/home')
    },
    goBack () {
      this.$router.back(-1)
    },
    searchCourse () {
      var param = {
        value: this.value
      }
      axios.get('/courses/searchCourse', {
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
    },
    add (value) {
      var param = {
        studentId: this.$store.state.studentId,
        studentName: this.$store.state.studentName,
        courseId: value
      }
      axios.post('/courses/addCourseStudent', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          const _this = this
          this.$vux.alert.show({
            title: '提示',
            content: '课程添加成功',
            onHide () {
              _this.$router.push('/courseList')
            }
          })
        } else if (res.status === '2') {
          const _this = this
          this.$vux.confirm.show({
            title: '警告',
            content: '您不在课程学生名单中！',
            confirmText: '申请',
            cancelText: '确定',
            onCancel () {
              _this.$router.push('/courseList')
            },
            onConfirm () {}
          })
        } else if (res.status === '3') {
          this.$vux.alert.show({
            title: '警告',
            content: '该课程已添加'
          })
        } else {
          // 添加失败
        }
      })
    }
  }
}
</script>

<style scoped>
  .top{
    background: #FFF;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 50px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
  .cardFlex {
    display: flex;
  }
</style>
