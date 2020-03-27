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
    <!--中间部分-->
    <el-row style="width: 100%; margin-top:10px;padding: 5px 15px;background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
      <el-col :span="24" style="display: flex;flex-direction: row;justify-content: center;align-items: center;min-height: 100px;">
        <div style="font-size: 24px;margin: 0px 50px;">参与人数<span style="font-size: 60px">{{testNum}}</span>人</div>
        <div style="margin: 20px 50px 0px 50px;">
          <el-button type="danger" plain size="small" @click="endTest" :disabled="isEnding">结束考试</el-button>
          <el-button type="info" plain size="small" @click="watchTest">查看试卷</el-button>
          <el-button type="primary" plain size="small" @click="refreshTest">刷新详情</el-button>
        </div>
      </el-col>
    </el-row>
    <!--成绩部分-->
    <el-row style="width: 100%; margin-top:10px;padding: 5px 15px;background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
      <el-col :span="24" style="display: flex;flex-direction: row;justify-content: center;align-items: center;min-height: 100px;">
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
              <el-button size="mini" @click="goScore(scope.row.studentId, scope.row.rightCount)" icon="el-icon-view" type="primary" plain >考试详情</el-button>
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
      scoremodel: false
    }
  },
  created () {
    if (this.$route.query.testId) {
      this.testId = this.$route.query.testId
    } else {
      this.$router.push({path: '/teacher/testRelease'})
    }
    // this.getTestNum()
  },
  mounted () {
    this.getTestNum()
    this.getScore()
    this.getName()
    if (this.isEnding === false) {
      this.intervalid1 = setInterval(() => {
        this.getTestNum()
        this.getScore()
      }, 6000)
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
      // this.$router.push({})
      this.$router.push({path: '/teacher/testRelease'})
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
    refreshTest () {
      this.getTestNum()
      this.getScore()
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
          this.getScore()
          this.getTestNum()
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
          for (var i = 0; i < scoreList.length; i++) {
            for (var j = 0; j < nameList.length; j++) {
              if (scoreList[i].studentId === nameList[j].studentId) {
                scoreList[i]['studentName'] = nameList[j]['studentName']
              }
            }
          }
          this.tableData = scoreList
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
    }
  }
}
</script>

<style scoped>

</style>
