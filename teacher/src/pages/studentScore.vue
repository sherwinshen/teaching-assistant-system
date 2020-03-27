<template>
  <div>
    <!--顶部部分-->
    <el-row style="width: 100%; padding: 5px 15px; background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;margin-bottom: 10px">
      <el-col :span="24" class="makeCenter">
        <!--返回按钮-->
        <el-button type="text" class="makeCenter" @click="goback" icon="el-icon-back">
          <span>返回</span>
        </el-button>
        <div class="makeCenter">
          {{this.studentName}}同学
        </div>
      </el-col>
    </el-row>
    <!--charts部分-->
    <el-row style="width: 100%; padding: 25px 15px 0px 15px; background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;margin-bottom: 10px" v-if="this.flag === true">
      <el-col :span="24" class="makeCenter">
        <div id="myChart" :style="{width: '1000px', height: '250px'}"></div>
      </el-col>
    </el-row>
    <!--考试详情部分-->
    <el-row v-if="this.flag === true" style="width: 100%; margin-top:10px;padding: 5px 15px;background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
      <el-col :span="24" style="display: flex;flex-direction: row;justify-content: center;align-items: center;min-height: 80px;">
        <el-table :data="data" style="width: 100%" height="540" stripe :default-sort = "{prop: 'score', order: 'descending'}">
          <el-table-column type="index">
          </el-table-column>
          <el-table-column label="考试日期" align="center">
            <template slot-scope="scope">
              <span>{{myfilter(scope.row.testTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="分数" prop="score" sortable align="center">
            <template slot-scope="scope">
              <span>{{scope.row.score}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="goScore(scope.row.studentId,scope.row.testId)" icon="el-icon-view" type="primary" plain >考试详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-if="this.flag === false">
      <el-card>
        <div style="min-height: 250px;display: flex; justify-content:center;align-items:center">
          <el-row type="flex" justify="center" style="">
            <img src="../assets/confused.png" style="height: 35px;">
            <div style="margin-left:15px;font-size: 24px ">暂未参加考试</div>
          </el-row>
        </div>
      </el-card>
    </el-row>
    <!--考试选择模态框-->
    <el-dialog title="查看试卷" :visible.sync="scoremodel" width="40%">
      <div v-for="(element,index) in scoreList" :key="element._id" style="font-size: 14px;padding: 10px;border-bottom: 1px solid rgba(0,0,0,.125);">
        <div style="display: flex;justify-content: space-between; align-items: center;margin-bottom: 10px;">
          <span style="font-weight: bold">题{{index+1}}—{{myfilter3(element.questionType)}}</span>
          <div v-if="element.isRight===true" style="color: #67C23A">
            <span  v-if="element.questionType==='2' || element.questionType==='1'">回答：<span v-for="item in element.yourAnswer" :key="item">{{item}}&nbsp;</span></span>
            <span  v-if="element.questionType==='3'">回答：<span v-for="item in element.yourAnswer" :key="item">{{ myfilter5(item) }}</span></span>
          </div>
          <div v-if="element.isRight===false" style="color: #F56C6C">
            <span  v-if="element.questionType==='2' || element.questionType==='1'">回答：<span v-for="item in element.yourAnswer" :key="item">{{item}}&nbsp;</span></span>
            <span  v-if="element.questionType==='3'">回答：<span v-for="item in element.yourAnswer" :key="item">{{ myfilter5(item) }}</span></span>
          </div>
        </div>
        <div style="margin-bottom: 5px">
          {{element.stem}}
        </div>
        <div  v-if="element.questionType==='2' || element.questionType==='1'">A：{{element.optionA}}</div>
        <div  v-if="element.questionType==='2' || element.questionType==='1'">B：{{element.optionB}}</div>
        <div  v-if="element.questionType==='2' || element.questionType==='1'">C：{{element.optionC}}</div>
        <div  v-if="element.questionType==='2' || element.questionType==='1'">D：{{element.optionD}}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import {format} from 'silly-datetime'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼图组件
require('echarts/lib/chart/line')
// 引入提示框和图例组件
require('echarts/lib/component/title')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/markLine')
require('echarts/lib/component/markPoint')
export default {
  data () {
    return {
      studentId: '',
      courseId: '',
      data: [],
      scoremodel: false,
      scoreList: [],
      flag: true,
      mydate: [],
      score: [],
      studentName: ''
    }
  },
  created () {
    if (this.$route.query.studentId) {
      this.studentId = this.$route.query.studentId
      this.courseId = this.$route.query.courseId
    } else {
      this.$router.push({path: '/teacher/testStatistics'})
    }
  },
  mounted () {
    this.getScore()
    this.getName()
  },
  methods: {
    goback () {
      this.$router.back(-1)
    },
    getName () {
      this.studentName = this.$store.state.TstudentName
    },
    // 过滤器
    myfilter3 (value) {
      if (value === 1 || value === '1') return '单选'
      else if (value === 2 || value === '2') return '多选'
      else if (value === 3 || value === '3') return '判断'
      else return value
    },
    myfilter4 (value) {
      if (value === 1) return 'A'
      else if (value === 2) return 'B'
      else if (value === 3) return 'C'
      else if (value === 4) return 'D'
    },
    myfilter5 (value) {
      if (value === 1 || value === '1') {
        return '正确'
      } else {
        return '错误'
      }
    },
    myfilter6 (value) {
      if (value === 0) return 'A'
      else if (value === 1) return 'B'
      else if (value === 2) return 'C'
      else if (value === 3) return 'D'
    },
    myfilter (value) {
      return format(value, 'YYYY/MM/DD')
    },
    getScore () {
      var param = {
        studentId: this.studentId,
        courseId: this.courseId
      }
      axios.get('/lists/getScore', {
        params: param
      }).then((response) => {
        let res = response.data
        if (res.status === '2') {
          this.flag = false
        } else if (res.status === '3') {
          this.flag = false
        } else if (res.result.length > 0) {
          this.flag = true
          this.data = res.result
          var mydate = []
          var score = []
          for (var i = 0; i < res.result.length; i++) {
            mydate[i] = format(res.result[i].testTime, 'YYYY/MM/DD')
            score[i] = res.result[i].score
          }
          this.mydate = mydate
          this.score = score
          this.drawChart()
        }
      })
    },
    goScore (studentId, testId) {
      var param = {
        testId: testId
      }
      axios.get('/tests/getTestList', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          var test1 = res.result
          var param2 = {
            testId: testId,
            studentId: studentId
          }
          axios.get('/tests/getMyTest', {
            params: param2
          }).then((response) => {
            var res = response.data
            var test = test1
            var test2 = res.result['answerResult']
            if (test2[0] === 'Unanswered') {
              this.$alert('该次考试未答题', '提示', {
                confirmButtonText: '确定'
              })
            } else {
              for (var i = 0; i < test.length; i++) {
                for (var j = 0; j < test2.length; j++) {
                  if (test[i]['_id'] === test2[j]['questionId']) {
                    test[i]['yourAnswer'] = test2[j]['answer']
                    test[i]['isRight'] = test2[j]['isRight']
                  }
                }
              }
              this.scoremodel = true
              this.scoreList = test
            }
          })
        }
      })
    },
    drawChart () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '考试成绩详情', left: 'center' },
        tooltip: {},
        xAxis: {
          name: '日期',
          type: 'category',
          data: this.mydate
        },
        yAxis: {
          name: '分数',
          type: 'value'
        },
        series: [{
          data: this.score,
          type: 'line',
          smooth: true,
          markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ]
          }
        }]
      })
    }
  }
}
</script>

<style scoped>

</style>
