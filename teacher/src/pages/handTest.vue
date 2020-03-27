<template>
  <div>
    <!--返回和筛选-->
    <div style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;margin-bottom: 10px;">
      <!--返回部分-->
      <el-row style="padding:0px 10px;border-bottom: 1px solid rgba(0,0,0,.125);">
        <!--返回部分-->
        <el-col :span="24" class="makeCenter">
          <!--返回按钮-->
          <el-button type="text" class="makeCenter" icon="el-icon-back" @click="goback">
            <span>返回</span>
          </el-button>
        </el-col>
      </el-row>
      <!--筛选部分-->
      <el-row style="padding:10px 10px;">
        <el-col :span="5">
          <div class="makeCenter" style="margin-right: 10px">
            <span style="width: 45px;font-size: 14px;">题库:</span>
            <el-select v-model="bankId" clearable placeholder="请选择" size="mini">
              <el-option
                v-for="item in options1"
                :key="item._id"
                :label="item.bankName"
                :value="item._id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="makeCenter" style="margin-right: 10px">
            <span style="width: 45px;font-size: 14px;">类型:</span>
            <el-select v-model="questionType" clearable placeholder="请选择" size="mini">
              <el-option
                v-for="item in options2"
                :key="item.value1"
                :label="item.label1"
                :value="item.value1">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="makeCenter" style="margin-right: 10px">
            <span style="width: 45px;font-size: 14px;">难度:</span>
            <el-select v-model="difficulty" clearable placeholder="请选择" size="mini">
              <el-option
                v-for="item in options3"
                :key="item.value2"
                :label="item.label2"
                :value="item.value2">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="makeCenter" style="margin-right: 10px">
            <span style="width: 45px;font-size: 14px;">章节:</span>
            <el-input v-model="chapter" placeholder="请输入数字，如1" size="mini"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <!--筛选按钮-->
          <div style="text-align: center">
            <el-button type="primary" size="mini" plain @click="filterBtn">确认筛选</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--题目选择-->
    <el-row>
      <el-col :span="24"
              style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;margin-bottom: 10px;">
        <div style="color:#409EFF;background: #EBEEF5;min-height: 15px;padding: 5px 10px;font-size: 14px;height: 20px;">
          题目选择
        </div>
        <el-table
          :data="questionList"
          height="450"
        >
          <el-table-column fixed label="类型" min-width="80" align="center">
            <template slot-scope="scope">
              <span>{{myfilter3(scope.row.questionType)}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed label="难度" min-width="80" align="center">
            <template slot-scope="scope">
              <span>{{myfilter2(scope.row.difficulty)}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed label="章节" min-width="80" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.chapter}}</span>
            </template>
          </el-table-column>
          <el-table-column label="题干" width="250" align="left" :show-overflow-tooltip="isTrue">
            <template slot-scope="scope">
              <span>{{scope.row.stem}}</span>
            </template>
          </el-table-column>
          <el-table-column label="选项" min-width="250" align="left" :show-overflow-tooltip="isTrue">
            <template slot-scope="scope">
              <span
                v-if="scope.row.questionType==='2' || scope.row.questionType==='1'">A：{{scope.row.optionA}}&emsp;</span>
              <span
                v-if="scope.row.questionType==='2' || scope.row.questionType==='1'">B：{{scope.row.optionB}}&emsp;</span>
              <span
                v-if="scope.row.questionType==='2' || scope.row.questionType==='1'">C：{{scope.row.optionC}}&emsp;</span>
              <span
                v-if="scope.row.questionType==='2' || scope.row.questionType==='1'">D：{{scope.row.optionD}}&emsp;</span>
            </template>
          </el-table-column>
          <el-table-column label="答案" min-width="100" align="left" :show-overflow-tooltip="isTrue">
            <template slot-scope="scope">
              <span v-for="item in scope.row.answer" :key="item" v-if="scope.row.questionType==='3'">{{ myfilter5(item)}}</span>
              <span v-for="item in scope.row.answer" :key="item"
                    v-if="scope.row.questionType==='2' || scope.row.questionType==='1'">{{item}}&emsp;</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="addQuestion(scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--试卷预览-->
    <el-row>
      <el-col :span="24"
              style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;margin-bottom: 10px;min-height: 300px;">
        <div style="color:#409EFF;background: #EBEEF5;padding: 5px 10px;font-size: 14px;height: 20px">试卷预览
          <small style="color: #303133">&nbsp;&nbsp;注：可拖拽调整顺序</small>
        </div>
        <draggable v-model="testList">
          <transition-group>
            <div v-for="(element,index) in testList" :key="element._id"
                 style="font-size: 14px;padding: 0px 10px 10px 10px;border-bottom: 1px solid rgba(0,0,0,.125);">
              <div style="display: flex;justify-content: space-between; align-items: center;">
                <span>题{{index+1}}—{{myfilter3(element.questionType)}}</span>
                <el-button type="text" icon="el-icon-error" @click="deleteQuestion(element)" style="font-size: 13px;">
                  删除
                </el-button>
              </div>
              <div style="margin-bottom: 5px">
                {{element.stem}}
              </div>
              <div v-if="element.questionType==='2' || element.questionType==='1'">A：{{element.optionA}}</div>
              <div v-if="element.questionType==='2' || element.questionType==='1'">B：{{element.optionB}}</div>
              <div v-if="element.questionType==='2' || element.questionType==='1'">C：{{element.optionC}}</div>
              <div v-if="element.questionType==='2' || element.questionType==='1'">D：{{element.optionD}}</div>
            </div>
          </transition-group>
        </draggable>
      </el-col>
    </el-row>
    <!--试卷发布-->
    <el-row>
      <el-col :span="24"
              style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;margin-bottom: 10px;">
        <div :span="24" style="display: flex;justify-content: space-between;align-items: center;padding: 10px;">
          <div style="display: flex;justify-content: space-between;align-items: center;">
            <span style="font-size: 14px;min-width:70px ">考试用时:</span>
            <el-input v-model="time" placeholder="请输入内容" size="mini" style="margin-right: 10px"></el-input>
            <span style="font-size: 14px;min-width:70px ">/分钟</span>
          </div>
          <div>
            <el-button type="primary" size="mini" plain @click="releaseTest">发布试卷</el-button>
            <el-button type="primary" size="mini" plain @click="temporaryTest">暂存试卷</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data () {
    return {
      courseId: '',
      bankId: '',
      questionType: '',
      difficulty: '',
      chapter: '',
      options1: [
        {
          _id: '题库编号',
          bankName: '题库名称'
        }],
      options2: [
        {
          value1: '1',
          label1: '单选题'
        }, {
          value1: '2',
          label1: '多选题'
        }, {
          value1: '3',
          label1: '判断题'
        }],
      options3: [
        {
          value2: '3',
          label2: '难'
        }, {
          value2: '2',
          label2: '中'
        }, {
          value2: '1',
          label2: '易'
        }],
      questionList: [
        {
          '_id': '',
          'bankId': '',
          'chapter': '',
          'questionType': '',
          'difficulty': '',
          'stem': '',
          'options': [],
          'answer': []
        }
      ],
      testList: [],
      time: '',
      isTrue: true
    }
  },
  created () {
    if (this.$route.query.courseId) {
      this.courseId = this.$route.query.courseId
    } else {
      this.$router.push({path: '/teacher/testRelease'})
    }
  },
  mounted () {
    this.getBankList()
    this.tipAlert()
  },
  methods: {
    // 过滤器
    myfilter2 (value) {
      if (value === 3 || value === '3') return '难'
      else if (value === 2 || value === '2') return '中'
      else if (value === 1 || value === '1') return '易'
      else return value
    },
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
    // 返回按钮
    goback () {
      this.$router.back(-1)
    },
    // 获取题库名称列表
    getBankList () {
      var teacherId = localStorage.getItem('userId')
      var param = {
        teacherId: teacherId
      }
      axios.get('/lists/bankNameList', {
        params: param
      }).then((response) => {
        var res = response.data
        // console.log(res)
        this.options1 = res.result
      })
    },
    // 题目筛选获取
    filterBtn () {
      var num = /^\+?[1-9][0-9]*$/
      var param = {
        bankId: this.bankId,
        questionType: this.questionType,
        difficulty: this.difficulty,
        chapter: this.chapter
      }
      if (this.bankId === '') {
        this.$alert('题库不能为空,请先选择题库！', '警告', {confirmButtonText: '确定', type: 'warning'})
      } else if (this.chapter !== '') {
        if (num.test(this.chapter) === false) {
          this.$alert('章节输入内容错误,请输入正整数，如1', '警告', {confirmButtonText: '确定', type: 'warning'})
        } else {
          // console.log(param)
          axios.get('/lists/questionList3', {
            params: param
          }).then((response) => {
            var res = response.data
            this.questionList = res.result
          })
        }
      } else {
        axios.get('/lists/questionList3', {
          params: param
        }).then((response) => {
          var res = response.data
          this.questionList = res.result
        })
      }
    },
    // 提示信息
    tipAlert () {
      this.$message({
        message: '请先选择题库进行组卷',
        type: 'warning',
        center: true
      })
    },
    // 添加题目
    addQuestion (value) {
      var flag = false
      var myList = this.testList
      myList.forEach(function (item) {
        if (item._id === value._id) {
          flag = true
        }
      })
      if (flag === true) {
        this.$message({
          message: '该题已选择',
          type: 'error',
          center: true
        })
      } else {
        this.testList.push(value)
      }
    },
    // 删除题目
    deleteQuestion (value) {
      var myList = this.testList
      myList.forEach(function (item, index) {
        if (item._id === value._id) {
          myList.splice(index, 1)
        }
      })
    },
    // 发布试卷
    releaseTest () {
      var reg = /^[0-9]*[1-9][0-9]*$/
      if (this.testList.length === 0) {
        this.$message({
          type: 'error',
          message: '题目不能为空'
        })
      } else if (this.time === '') {
        this.$message({
          type: 'error',
          message: '考试时间不能为空'
        })
      } else if (!reg.test(parseInt(this.time))) {
        this.$message({
          type: 'error',
          message: '考试时间请输入大于0的正整数'
        })
      } else {
        var myList = this.testList
        var testContent = []
        var answer = []
        myList.forEach(function (item) {
          testContent.push(item._id)
        })
        myList.forEach(function (item) {
          answer.push({questionId: item._id, answer: item.answer})
        })
        var param = {
          'testContent': testContent,
          'courseId': this.courseId,
          'testTime': this.time,
          'answer': answer
        }
        axios.post('/tests/testRelease', {
          params: param
        }).then((response) => {
          var res = response.data
          if (res.status === '0') {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.$router.push({path: '/teacher/testRelease/testNow', query: {testId: res.result}})
          } else {
            this.$message({
              type: 'warning',
              message: '发布失败'
            })
          }
        })
      }
    },
    // 暂存试卷
    temporaryTest () {
      var myList = this.testList
      var testContent = []
      var answer = []
      myList.forEach(function (item) {
        testContent.push(item._id)
      })
      myList.forEach(function (item) {
        answer.push({questionId: item._id, answer: item.answer})
      })
      var param = {
        'testContent': testContent,
        'courseId': this.courseId,
        'answer': answer
      }
      axios.post('/tests/testTemporary', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          this.$message({
            type: 'success',
            message: '暂存成功!'
          })
          this.$router.push({path: '/teacher/testRelease/temporaryList', query: {courseId: this.courseId}})
        } else {
          this.$message({
            type: 'warning',
            message: '暂存失败'
          })
        }
      })
    }
  }
}
</script>

<style>
  .cell {
    font-size: 14px;
    font-weight: normal;
    color: #303133;
  }
</style>
