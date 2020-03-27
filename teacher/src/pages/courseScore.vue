<template>
  <div>
    <!--顶部部分-->
    <el-row
      style="width: 100%; padding: 5px 15px; background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
      <el-col :span="24" class="makeCenter">
        <!--返回按钮-->
        <el-button type="text" class="makeCenter" @click="goback" icon="el-icon-back">
          <span>返回</span>
        </el-button>
        <div class="makeCenter">
          {{this.courseName}}
        </div>
        <!--<div class="makeCenter">-->
          <!--<a href="" id="download"><el-button type="success" icon="el-icon-download" size="small">导出成绩</el-button></a>-->
        <!--</div>-->
      </el-col>
    </el-row>
    <!--统计部分-->
    <el-row type="flex" class="row-bg" justify="space-between" style="margin: 20px 0px 20px 0px">
      <el-col :span="5">
        <el-card class="box-card" style=" border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
          <el-row>
            <el-col :span="8" style="text-align: center;">
              <img src="../assets/pic1.png" style="height: 50px;">
            </el-col>
            <el-col :span="16">
              <div style="font-size: 18px;text-align: right;">
                学生人数
                <div style="font-size:24px ;">{{studentNum}}人</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="box-card" style=" border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
          <el-row>
            <el-col :span="8" style="text-align: center;">
              <img src="../assets/pic2.png" style="height: 50px;">
            </el-col>
            <el-col :span="16">
              <div style="font-size: 18px;text-align: right;">
                考试次数
                <div style="font-size:24px ;">{{this.testNum}}次</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="box-card" style=" border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
          <el-row>
            <el-col :span="8" style="text-align: center;">
              <img src="../assets/pic3.png" style="height: 50px;">
            </el-col>
            <el-col :span="16">
              <div style="font-size: 18px;text-align: right;">
                总参与率
                <div style="font-size:24px ;">{{ myfilter10(this.allNum ,this.testNum ,this.studentNum)}}</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="box-card" style=" border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
          <el-row>
            <el-col :span="8" style="text-align: center;">
              <img src="../assets/pic4.png" style="height: 50px;">
            </el-col>
            <el-col :span="16">
              <div style="font-size: 18px;text-align: right;">
                导出成绩
                <a href="" id="download"><el-button type="text" style="padding: 8px 0px!important;">确认导出</el-button></a>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--表格部分-->
    <el-row style="margin: 10px 0px">
      <el-col :span="13" style="padding: 5px 10px;background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px 0px 0px 4px;height: 580px">
        <el-table
          :data="tableData1"
          style="width: 100%"
          height="570">
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            label="考试日期">
            <template slot-scope="scope">
              <span>{{ myfilter(scope.row.testDate)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            property="questionNum"
            label="题量">
          </el-table-column>
          <el-table-column
            property="testNum"
            label="参与人数">
          </el-table-column>
          <el-table-column
            label="是否结束">
            <template slot-scope="scope">
              <span>{{ myfilter1(scope.row.isEnding)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleWatch1(scope.row._id)" type="primary" plain>查看成绩</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="11" style="padding: 5px 10px;background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:0px 4px 4px 0px;height: 580px">
        <el-table
          :data="tableData2"
          highlight-current-row
          style="width: 100%"
          height="570">
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            property="studentName"
            label="姓名">
          </el-table-column>
          <el-table-column
            property="studentId"
            label="学号">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleWatch2(scope.row.studentId, scope.row.studentName)" type="primary" plain>查看成绩</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import {format} from 'silly-datetime'

export default {
  data () {
    return {
      courseId: '',
      courseName: '',
      tableData1: [],
      tableData2: [],
      studentNum: 0,
      testNum: 0,
      pRate: 0,
      allNum: 0
    }
  },
  created () {
    if (this.$route.query.courseId) {
      this.courseId = this.$route.query.courseId
    } else {
      this.$router.push({path: '/teacher/testStatistics'})
    }
  },
  mounted () {
    this.getStudentList()
    this.getTestList()
    this.courseName = this.$store.state.courseName
    document.getElementById('download').href = '/upload/courseScore?courseId=' + this.courseId
  },
  methods: {
    myfilter (value) {
      return format(value, 'YYYY/MM/DD')
    },
    myfilter1 (value) {
      if (value === true) return '已结束'
      else return '进行中'
    },
    myfilter10 (allNum, testNum, studentNum) {
      if (testNum !== 0) {
        var value = this.allNum / (this.testNum * this.studentNum)
        let str = Number(value * 100).toFixed(1)
        str += '%'
        return str
      } else {
        return '0%'
      }
    },
    goback () {
      this.$router.back(-1)
    },
    // 获取学生列表
    getStudentList () {
      var teacherId = localStorage.getItem('userId')
      var param = {
        teacherId: teacherId,
        courseId: this.courseId
      }
      axios.get('/lists/studentList', {
        params: param
      }).then((response) => {
        let res = response.data
        this.tableData2 = res.result
        this.studentNum = res.result.length
      })
    },
    // 获取考试列表
    getTestList () {
      var param = {
        courseId: this.courseId
      }
      axios.get('/lists/testList', {
        params: param
      }).then((response) => {
        let res = response.data
        this.tableData1 = res.result
        this.testNum = res.result.length
        var allnum = 0
        for (var i = 0; i < res.result.length; i++) {
          allnum += res.result[i].testNum
        }
        this.allNum = allnum
      })
    },
    handleWatch1 (value) {
      var testId = value
      this.$router.push({path: '/teacher/testStatistics/testNow2', query: {testId: testId}})
    },
    handleWatch2 (value, studentName) {
      this.$store.commit('updateTstudentName', studentName)
      var studentId = value
      this.$router.push({
        path: '/teacher/testStatistics/studentScore',
        query: {studentId: studentId, courseId: this.courseId}
      })
    }
  }
}
</script>

<style scoped>

</style>
