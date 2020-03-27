<template>
  <div class="fillContain" style="">
    <!--顶部部分-->
    <el-row style="width: 100%; padding: 5px 15px;background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
      <el-col :span="24" class="makeCenter">
        <!--返回按钮-->
        <el-button type="text" class="makeCenter" @click="goback" icon="el-icon-back">
          <span>返回</span>
        </el-button>
        <span>{{courseName}}</span>
      </el-col>
    </el-row>
    <!--统计部分-->
    <el-row type="flex" class="row-bg" justify="space-between" style="margin: 20px 0px 20px 0px">
      <el-col :span="5">
        <el-card style=" border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
          <el-row>
            <el-col :span="8" style="text-align: center;">
              <img src="../assets/pic5.png" style="height: 50px;">
            </el-col>
            <el-col :span="16">
              <div style="font-size: 18px;text-align: right;">
                参与人数
                <div style="font-size:24px ;">{{testNum}}人</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card style=" border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
          <el-row>
            <el-col :span="8" style="text-align: center;">
              <img src="../assets/pic6.png" style="height: 50px;">
            </el-col>
            <el-col :span="16">
              <div style="font-size: 18px;text-align: right;">
                未考人数
                <div style="font-size:24px ;">{{this.noNum}}人</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card style=" border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
          <el-row>
            <el-col :span="8" style="text-align: center;">
              <img src="../assets/pic7.png" style="height: 50px;">
            </el-col>
            <el-col :span="16">
              <div style="font-size: 18px;text-align: right;">
                试卷查看
                <div>
                  <el-button type="text" style="padding: 7px 0px!important;font-size: 18px" @click="watchTest">点击</el-button>
                  <!--<el-button type="text" plain size="small"  @click="watchTest">点击</el-button>-->
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card style=" border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
          <el-row>
            <el-col :span="8" style="text-align: center;">
              <img src="../assets/pic8.png" style="height: 50px;">
            </el-col>
            <el-col :span="16">
              <div style="font-size: 18px;text-align: right;">
                平均分
                <div style="font-size:24px ;">{{this.averageScore}}分</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--图表部分-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <div id="chart1" style="min-height: 300px"></div>
        </div>
      </el-col>
    </el-row>
    <!--成绩部分-->
    <el-row style="width: 100%; margin-top:10px;padding: 5px 15px;background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
      <el-col :span="24" style="display: flex;flex-direction: row;justify-content: center;align-items: center;min-height: 80px;">
        <el-table :data="tableData" style="width: 100%" height="540" stripe :default-sort = "{prop: 'score', order: 'descending'}">
          <el-table-column type="index">
          </el-table-column>
          <el-table-column label="姓名" >
            <template slot-scope="scope">
              <span>{{ scope.row.studentName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="学号" >
            <template slot-scope="scope">
              <span>{{ scope.row.studentId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="分数" prop="score" sortable>
            <template slot-scope="scope">
              <span>{{scope.row.score}}</span>
            </template>
          </el-table-column>
          <el-table-column label="正确题数" >
            <template slot-scope="scope">
              <span>{{myfilter7(scope.row.rightCount)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="goScore(scope.row.studentId)" icon="el-icon-view" type="primary" plain >考试详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--考试选择模态框-->
    <el-dialog title="查看试卷" :visible.sync="testmodel" width="40%">
      <div v-for="(element,index) in testList" :key="element._id" style="font-size: 14px;padding: 10px;border-bottom: 1px solid rgba(0,0,0,.125);">
        <div style="display: flex;justify-content: space-between; align-items: center;margin-bottom: 10px;">
          <span style="font-weight: bold">题{{index+1}}—{{myfilter3(element.questionType)}}</span>
          <span  v-if="element.questionType==='2' || element.questionType==='1'" style="color:#409EFF;">答案：<span v-for="item in element.answer" :key="item">{{item}}&emsp;</span></span>
          <span  v-if="element.questionType==='3'" style="color:#409EFF;">答案：<span v-for="item in element.answer" :key="item">{{ myfilter5(item) }}&emsp;</span></span>
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
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼图组件
require('echarts/lib/chart/bar')
// 引入提示框和图例组件
require('echarts/lib/component/title')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/markLine')
require('echarts/lib/component/markPoint')

export default {
  data () {
    return {
      testId: '',
      testNum: 0,
      isEnding: false,
      testList: [],
      scoreList: [],
      tableData: [],
      courseName: '',
      testmodel: false,
      scoremodel: false,
      noNum: 0,
      averageScore: 0,
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      num5: 0,
      num6: 0
    }
  },
  created () {
    if (this.$route.query.testId) {
      this.testId = this.$route.query.testId
    } else {
      this.$router.push({path: '/teacher/testStatistics'})
    }
  },
  mounted () {
    this.getTestNum()
    this.getScore()
    this.getName()
    if (this.isEnding === false) {
      this.intervalid1 = setInterval(() => {
        this.getTestNum()
        this.getScore()
      }, 80000)
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalid1)
  },
  methods: {
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
    myfilter7 (value) {
      if (value === -1) return '未考试'
      else return value
    },
    goback () {
      this.$router.back(-1)
    },
    getTestNum () {
      var param = {
        testId: this.testId
      }
      axios.get('/tests/getTestNum', {
        params: param
      }).then((response) => {
        var res = response.data
        this.testNum = res.result.testNum
        if (res.result.isEnding === true) {
          this.isEnding = true
        } else {
          this.isEnding = false
        }
      })
    },
    watchTest () {
      var param = {
        testId: this.testId
      }
      axios.get('/tests/getTestList', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          this.testmodel = true
          this.testList = res.result
        }
      })
    },
    endTest () {
      var param = {
        testId: this.testId
      }
      axios.get('/tests/endTest', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          this.$message({
            message: '考试已结束',
            type: 'success'
          })
          this.isEnding = true
          clearInterval(this.intervalid1)
        }
      })
    },
    getScore () {
      var param = {
        testId: this.testId
      }
      axios.get('/lists/getScoreAll', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          var scoreList = res.result1
          var nameList = res.result2
          var scoreAll = 0
          var noNum = 0
          var yesNum = 0
          var num1 = 0
          var num2 = 0
          var num3 = 0
          var num4 = 0
          var num5 = 0
          var num6 = 0
          for (var i = 0; i < scoreList.length; i++) {
            for (var j = 0; j < nameList.length; j++) {
              if (scoreList[i]['studentId'] === nameList[j]['studentId']) {
                scoreList[i]['studentName'] = nameList[j]['studentName']
              }
            }
            if (scoreList[i]['rightCount'] === -1) { noNum++ } else {
              yesNum++
              scoreAll += scoreList[i]['score']
            }
            if (scoreList[i]['score'] === 100) num1++
            else if (scoreList[i]['score'] < 100 && scoreList[i]['score'] >= 80) num2++
            else if (scoreList[i]['score'] < 80 && scoreList[i]['score'] >= 60) num3++
            else if (scoreList[i]['score'] < 60 && scoreList[i]['score'] >= 40) num4++
            else if (scoreList[i]['score'] < 40 && scoreList[i]['score'] > 0) num5++
            else if (scoreList[i]['score'] === 0) num6++
          }
          this.tableData = scoreList
          this.noNum = noNum
          this.averageScore = (scoreAll / yesNum).toFixed(1)
          this.num1 = num1
          this.num2 = num2
          this.num3 = num3
          this.num4 = num4
          this.num5 = num5
          this.num6 = num6
          this.drawChart()
        }
      })
    },
    goScore (value) {
      var param = {
        testId: this.testId
      }
      axios.get('/tests/getTestList', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          var test1 = res.result
          var param2 = {
            testId: this.testId,
            studentId: value
          }
          axios.get('/tests/getMyTest', {
            params: param2
          }).then((response) => {
            var res = response.data
            var test = test1
            var test2 = res.result['answerResult']
            if (test2[0] === 'Unanswered') {
              this.$alert('该学生未答题', '提示', {
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
    getName () {
      var param = {
        testId: this.testId
      }
      axios.get('/courses/getName2', {
        params: param
      }).then((response) => {
        var res = response.data
        this.courseName = res.result.courseName
        if (res.result.isEnding === true) {
          this.isEnding = true
        } else {
          this.isEnding = false
        }
      })
    },
    drawChart () {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = echarts.init(document.getElementById('chart1'))
      // 绘制图表
      myChart1.setOption({
        color: ['#409EFF'],
        title: { text: '考试成绩分布图', left: 'center' },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}人'
        },
        xAxis: {
          name: '分数/分',
          type: 'category',
          data: ['100', '80-100', '60-80', '40-60', '0-40', '0']
        },
        yAxis: {
          name: '人数/人',
          type: 'value'
        },
        series: [{
          data: [this.num1, this.num2, this.num3, this.num4, this.num5, this.num6],
          type: 'bar'
        }]
      })
    }
  }
}
</script>

<style>
  .grid-content {
    padding: 20px 5px 5px 0px;
    border-radius: 4px;
    min-height: 36px;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
  }

</style>
