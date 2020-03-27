<template>
  <div>
    <!--顶部-->
    <div v-bind:class="{ top: isActive }">
      <div style="display: flex;align-items: center;">
        <img src="./../assets/home.png"
             style="height: 20px;padding: 0px 10px 0px 20px; border-right: 1px solid #C0C4CC;" @click="goHome"/>
        <div style="color: #606266;margin-left: 15px;font-size: 16px;min-width: 80px;">{{courseName}}</div>
      </div>
      <div>
        <el-button type="text" icon="el-icon-back" style="margin-right: 20px" @click="goBack">返回</el-button>
      </div>
    </div>
    <div style="height: 50px"></div>
    <div style="overflow: hidden;">
      <!--charts部分-->
      <el-row style="width: 100%;background-color: #fff;padding: 20px 0px 0px 0px ">
        <el-col :span="24" class="makeCenter">
          <div id="myChart" :style="{height: '220px'}"></div>
        </el-col>
      </el-row>
      <!--次数部分-->
      <div style="padding: 15px 0px">
        <flexbox>
          <flexbox-item>
            <flexbox orient="vertical" style="margin-left: 5px;color:#409EFF;text-align: center;">
              <flexbox-item >总平均分</flexbox-item>
              <flexbox-item style="font-size: 20px">{{averageScore}}分</flexbox-item>
            </flexbox>
          </flexbox-item>
          <flexbox-item>
            <flexbox orient="vertical" style="margin-left: 5px; color:#409EFF;text-align: center;">
              <flexbox-item>分数&lt;50</flexbox-item>
              <flexbox-item style="font-size: 20px">{{this.num1}}次</flexbox-item>
            </flexbox>
          </flexbox-item>
          <flexbox-item>
            <flexbox orient="vertical" style="margin-left: 5px; color:#409EFF;text-align: center;">
              <flexbox-item>分数&gt;90</flexbox-item>
              <flexbox-item style="font-size: 20px">{{this.num2}}次</flexbox-item>
            </flexbox>
          </flexbox-item>
          <flexbox-item>
            <flexbox orient="vertical" style="margin-left: 5px; color:#409EFF;text-align: center;">
              <flexbox-item>未答题</flexbox-item>
              <flexbox-item style="font-size: 20px">{{this.num3}}次</flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
      </div>
      <!--部分二-->
      <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
        <thead>
        <tr style="background-color: #F7F7F7">
          <th>考试时间</th>
          <th>分数</th>
          <th>排名</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(value,index) in content" :key="index">
          <td>{{ myfilter(value.testTime)}}</td>
          <td v-if="value.score !== -1">{{value.score}}</td>
          <td v-if="value.score === -1">——</td>
          <td>暂无</td>
          <td>
            <el-button type="text" @click="goTest(value.testId)">查看试卷</el-button>
          </td>
        </tr>
        </tbody>
      </x-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {XButton, XTable, Flexbox, FlexboxItem} from 'vux'
import {MessageBox} from 'mint-ui'
import {format} from 'silly-datetime'

// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入组件
require('echarts/lib/chart/line')
// 引入提示框和图例组件
require('echarts/lib/component/title')
require('echarts/lib/component/markLine')
require('echarts/lib/component/markPoint')

export default {
  components: {
    XButton,
    XTable,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      courseId: '',
      isActive: true,
      courseName: '',
      averageScore: 0.0,
      content: [],
      num1: 0,
      num2: 0,
      num3: 0,
      mydate: [],
      score: []
    }
  },
  mounted () {
    this.getName()
    this.getContent()
    this.getScore()
  },
  created () {
    if (this.$route.query.courseId) {
      this.courseId = this.$route.query.courseId
    } else {
      this.$router.push({path: '/home'})
    }
  },
  methods: {
    getScore () {
      var param = {
        studentId: localStorage.getItem('userId'),
        courseId: this.courseId
      }
      axios.get('/lists/getScore', {
        params: param
      }).then((response) => {
        let res = response.data
        if (res.status === '2') {
        } else {
          if (res.result.length > 0) {
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
          } else {
          }
        }
      })
    },
    drawChart () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {text: '考试成绩详情', left: 'center'},
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
    },
    myfilter (value) {
      return format(value, 'YYYY/MM/DD')
    },
    goHome () {
      this.$router.push('/home')
    },
    goBack () {
      this.$router.back(-1)
    },
    getName () {
      var param = {
        courseId: this.courseId
      }
      axios.get('/courses/getName', {
        params: param
      }).then((response) => {
        var res = response.data
        this.courseName = res.result.courseName
      })
    },
    getContent () {
      var param = {
        studentId: localStorage.getItem('userId'),
        courseId: this.courseId
      }
      axios.get('/lists/getScore', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          var score = res.result
          if (score.length === 0) {
            this.averageScore = 0.0
          } else {
            this.content = score
            var scoreSum = 0
            for (var i = 0; i < score.length; i++) {
              scoreSum = scoreSum + score[i]['score']
            }
            var averageScore = scoreSum / score.length
            this.averageScore = averageScore.toFixed(1)
            for (var j = 0; j < score.length; j++) {
              if (score[j].answerResult[0] === 'Unanswered') {
                this.num3++
              } else {
                if (score[j].score > 90) {
                  this.num2++
                } else if (score[j].score < 50) {
                  this.num1++
                }
              }
            }
          }
        } else if (res.status === '2' || res.status === '3') {
          MessageBox.alert('还未参加考试').then(action => {
            this.$router.back(-1)
          })
        }
      })
    },
    goTest (testId) {
      this.$router.push({path: '/myScore2', query: {testId: testId}})
    }
  }
}
</script>

<style>
  .mImg {
    padding-bottom: 50%;
    display: block;
    position: relative;
    max-width: 100%;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    border-radius: 2px;
    background: url("../assets/bg_1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }

  .mTitle {
    color: #fff;
    text-align: center;
    text-shadow: 0 0 2px rgba(0, 0, 0, .5);
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 30%;
    transform: translateY(-50%);
  }

  .mBtn {
    color: #606266;
    margin: 0px 10px;
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 82%;
    transform: translateY(-50%);
  }

  .vux-flexbox-item {
    margin-top: 0px !important;
  }
</style>
