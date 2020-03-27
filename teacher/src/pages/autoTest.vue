<template>
  <div>
    <!--返回和筛选-->
    <div style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;margin-bottom: 10px;">
      <!--返回部分-->
      <el-row style="padding:0px 10px;border-bottom: 1px solid rgba(0,0,0,.125);">
        <!--返回部分-->
        <el-col :span="24" class="makeCenter">
          <!--返回按钮-->
          <el-button type="text" class="makeCenter" icon="el-icon-back"  @click="goback">
            <span>返回</span>
          </el-button>
        </el-col>
      </el-row>
      <!--筛选部分-->
      <div style="margin: 20px 10px 0px 10px">
        <el-form :inline="true" :model="form" class="myform">
          <el-form-item label="题库">
            <el-select v-model="form.bankId" clearable placeholder="请选择" size="small" style="width: 150px" @change="getCount">
              <el-option
                v-for="item in options1"
                :key="item._id"
                :label="item.bankName"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-input v-model="form.difficulty" placeholder="输入1-3之间的数" size="small" style="width: 150px" pattern="[1-3]"></el-input>
          </el-form-item>
          <el-form-item label="单选">
            <el-input-number v-model="form.count1" :disabled="flag" size="small" style="width: 150px" :min=0 :max="max1"></el-input-number>
          </el-form-item>
          <el-form-item label="多选">
            <el-input-number v-model="form.count2" :disabled="flag" size="small" style="width: 150px" :min=0 :max="max2"></el-input-number>
          </el-form-item>
          <el-form-item label="判断">
            <el-input-number v-model="form.count3" :disabled="flag" size="small" style="width: 150px" :min=0 :max="max3"></el-input-number>
          </el-form-item>
        </el-form>
        <div style="text-align: center; margin-bottom: 20px">
            <el-button type="primary" @click="autoGo" size="small" style="margin: 0px 20px">开始组卷</el-button>
            <el-button @click="cancelGo" size="small" style="margin: 0px 20px">取消重置</el-button>
        </div>
      </div>
    </div>
    <!--试卷预览-->
    <el-row v-loading="loading">
      <el-col :span="24" style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;margin-bottom: 10px;min-height: 200px;">
        <div style="color:#409EFF;background: #EBEEF5;padding: 5px 10px;font-size: 14px;height: 20px">试卷预览</div>
        <div v-for="(element,index) in testList" :key="index"
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
      max1: 20,
      max2: 20,
      max3: 20,
      flag: true,
      form: {
        bankId: '',
        difficulty: '',
        count1: 0,
        count2: 0,
        count3: 0
      },
      options1: [{_id: '题库编号', bankName: '题库名称'}],
      testList: [],
      time: '',
      loading: false
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
  },
  methods: {
    myfilter3 (value) {
      if (value === 1 || value === '1') return '单选'
      else if (value === 2 || value === '2') return '多选'
      else if (value === 3 || value === '3') return '判断'
      else return value
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
        this.options1 = res.result
      })
    },
    getCount (value) {
      var param = {
        bankId: value
      }
      axios.get('/banks/questionCount3', {
        params: param
      }).then((response) => {
        var res = response.data
        this.form.count1 = 0
        this.form.count2 = 0
        this.form.count3 = 0
        this.max1 = res.max1
        this.max2 = res.max2
        this.max3 = res.max3
        this.flag = false
      })
    },
    // 组卷
    autoGo () {
      this.loading = true
      if (this.form.bankId === '') {
        this.$message({
          showClose: true,
          message: '请必须选择一个题库进行组卷',
          type: 'error'
        })
      } else if (this.form.count1 === 0 && this.form.count2 === 0 && this.form.count3 === 0) {
        this.$message({
          showClose: true,
          message: '请必须设定一个题型的题量',
          type: 'error'
        })
      } else if (this.form.count1 + this.form.count2 + this.form.count3 < 4) {
        this.$message({
          showClose: true,
          message: '请至少设置4道题目',
          type: 'error'
        })
      } else if (this.form.difficulty < 1 || this.form.difficulty > 3 || isNaN(this.form.difficulty)) {
        this.$message({
          showClose: true,
          message: '请输入1-3之间的数字',
          type: 'error'
        })
      } else {
        var param = {
          'difficulty': this.form.difficulty,
          'count1': this.form.count1,
          'count2': this.form.count2,
          'count3': this.form.count3,
          'bankId': this.form.bankId
        }
        axios.get('/tests/autoTest', {
          params: param
        }).then((response) => {
          var res = response.data
          if (res.status === '1') {
            this.loading = false
            this.testList = []
            this.$message({
              showClose: true,
              message: '组卷失败，请重新设置参数',
              center: true,
              type: 'error'
            })
          } else {
            this.loading = false
            this.testList = res.result.question
          }
        })
      }
    },
    cancelGo () {
      this.form.bankId = ''
      this.form.difficulty = ''
      this.form.count1 = 0
      this.form.count2 = 0
      this.form.count3 = 0
      this.testList = []
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
  .myform .el-form-item{
    margin-bottom: 20px!important;
  }

</style>
