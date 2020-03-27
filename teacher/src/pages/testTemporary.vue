<template>
  <div class="fillContain" style="">
    <!--顶部部分-->
    <el-row style="width: 100%; padding:5px 15px;background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
      <el-col :span="24" class="makeCenter">
        <!--返回按钮-->
        <el-button type="text" class="makeCenter" @click="goback" icon="el-icon-back">
          <span>返回</span>
        </el-button>
      </el-col>
    </el-row>
    <!--试卷预览-->
    <el-row style="margin-top: 10px;">
      <el-col :span="24" style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;margin-bottom: 10px;min-height: 300px;">
        <div style="color:#409EFF;background: #EBEEF5;padding: 5px 10px;font-size: 14px;height: 20px">试卷预览</div>
        <draggable v-model="testList" >
          <transition-group>
            <div v-for="(element,index) in testList" :key="element._id" style="font-size: 14px;padding: 10px;border-bottom: 1px solid rgba(0,0,0,.125);">
              <div style="display: flex;justify-content: space-between; align-items: center;">
                <span>题{{index+1}}—{{myfilter3(element.questionType)}}</span>
              </div>
              <div style="margin: 5px 0px">
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
      <el-col :span="24" style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;margin-bottom: 10px;">
        <div :span="24" style="display: flex;justify-content: space-between;align-items: center;padding: 10px;">
          <div style="display: flex;justify-content: space-between;align-items: center;">
            <span style="font-size: 14px;min-width:70px ">考试用时:</span>
            <el-input v-model="time" placeholder="请输入内容" size="mini" style="margin-right: 10px"></el-input>
            <span style="font-size: 14px;min-width:70px ">/分钟</span>
          </div>
          <div>
            <el-button type="primary" size="mini" plain @click="releaseTest">立即发布</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      testId: '',
      testList: [],
      time: ''
    }
  },
  created () {
    if (this.$route.query.testId) {
      this.testId = this.$route.query.testId
    } else {
      this.$router.push({path: '/teacher/testRelease'})
    }
    this.getTestList()
  },
  methods: {
    // 返回按钮
    goback () {
      this.$router.back(-1)
    },
    // 过滤器
    myfilter3 (value) {
      if (value === 1 || value === '1') return '单选'
      else if (value === 2 || value === '2') return '多选'
      else if (value === 3 || value === '3') return '判断'
      else return value
    },
    myfilter6 (value) {
      if (value === 0) return 'A'
      else if (value === 1) return 'B'
      else if (value === 2) return 'C'
      else if (value === 3) return 'D'
    },
    // 获取题目列表
    getTestList () {
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
    // 发布试卷
    releaseTest () {
      var reg = /^[0-9]*[1-9][0-9]*$/
      if (this.time === '') {
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
        var param = {
          'testId': this.testId,
          'testTime': this.time
        }
        axios.post('/tests/testRelease2', {
          params: param
        }).then((response) => {
          var res = response.data
          if (res.status === '0') {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.$router.push({path: '/teacher/testRelease/testNow', query: { testId: this.testId }})
          } else {
            this.$message({
              type: 'warning',
              message: '发布失败'
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
