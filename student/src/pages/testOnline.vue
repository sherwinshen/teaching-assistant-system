<template>
  <div style="background: #fafafa">
    <!--顶部-->
    <div v-bind:class="{ top: isActive }">
      <div style="display: flex;align-items: center;">
        <img src="./../assets/timeIcon.png" style="height: 20px;padding: 0px 10px 0px 20px; border-right: 1px solid #C0C4CC;margin-right: 10px;"/>
        <countdown v-model="endTime" @on-finish="finish" v-show="show"></countdown>
       </div>
      <div style="margin-right: 20px;" @click="submit">
        <div style="color:#09BB07;"><icon type="success-no-circle"></icon>提交试卷</div>
      </div>
    </div>
    <div style="height: 55px"></div>
    <div v-for="(data,index) in questionList" :key="data._id">
      <el-tag type="primary" size="medium" style="margin: 15px 10px 5px 10px">{{myfilter3(data.questionType)}}</el-tag>
      <div style="margin: 5px 10px; font-size: 18px">题{{index+1}}—{{data.stem}}</div>
      <checklist v-if="data.questionType==='1'" :max="1" random-order :options="[{key: 'A', value: data.optionA},{key: 'B', value: data.optionB},{key: 'C', value: data.optionC},{key: 'D', value: data.optionD}]" v-model="value[index]"></checklist>
      <checklist v-if="data.questionType==='2'" random-order :options="[{key: 'A', value: data.optionA},{key: 'B', value: data.optionB},{key: 'C', value: data.optionC},{key: 'D', value: data.optionD}]" v-model="value[index]"></checklist>
      <checklist v-if="data.questionType==='3'" :max="1" :options="[{key: 1, value: '正确'},{key: 2, value: '错误'}]" v-model="value[index]"></checklist>
    </div>
   </div>

</template>

<script>
import axios from 'axios'
import { Countdown, Icon, Checklist } from 'vux'
import { MessageBox } from 'mint-ui'
export default {
  components: {
    Countdown,
    Icon,
    Checklist
  },
  data () {
    return {
      testId: '',
      isActive: true,
      endTime: 0,
      show: true,
      value: [],
      questionList: []
    }
  },
  mounted () {
    this.getTest()
  },
  created () {
    if (this.$route.query.testId) {
      var testId = this.$route.query.testId
      this.testId = testId
      // 判断是否已经完成考试
      var param = {
        testId: testId,
        studentId: localStorage.getItem('userId')
      }
      axios.post('/tests/isSubmit', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          MessageBox.alert('已完成过考试').then(action => {
            // 跳转成绩显示页面
            this.$router.push({path: '/myScore3', query: { testId: testId }})
          })
        }
      })
    } else {
      this.$router.push({path: '/home'})
    }
  },
  methods: {
    myfilter3 (value) {
      if (value === 1 || value === '1') return '单选'
      else if (value === 2 || value === '2') return '多选'
      else if (value === 3 || value === '3') return '判断'
      else return value
    },
    getTest () {
      var param = {
        testId: this.testId
      }
      axios.get('/tests/getTest', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          var endTime = res.result.testTime * 60
          axios.get('/tests/getTestContent', {
            params: {testContent: res.result.testContent}
          }).then((response) => {
            var res2 = response.data
            if (res2.status === '0') {
              this.endTime = endTime
              var questionCount = res2.result.length
              var list = this.random(questionCount, 0, questionCount - 1)
              var questionList = []
              for (var i = 0; i < questionCount; i++) {
                questionList[i] = res2.result[list[i]]
              }
              this.questionList = questionList
            }
          })
        } else {
          console.log('error')
        }
      })
    },
    random (n, min, max) {
      var arr = []
      var arr2 = []
      for (var l = 0; l < max - min + 1; l++) {
        arr[l] = l + min
      }
      for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
      for (i = 0; i < n; i++) {
        arr2[i] = arr[i]
      }
      return arr2
    },
    submit () {
      const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
      this.$vux.confirm.show({
        confirmText: '提交',
        content: '确认提交试卷？',
        title: '提示',
        onConfirm () {
          _this.submitTest()
        }
      })
    },
    submitTest () {
      var answer = []
      var _this = this
      _this.value.forEach(function (item, index) {
        answer.push({ questionId: _this.questionList[index]._id, answer: item })
      })
      var studentId = localStorage.getItem('userId')
      var param = {
        studentId: studentId,
        testId: this.testId,
        answer: answer
      }
      axios.post('/tests/submitTest', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          // 跳转成绩显示页面
          this.$router.push({path: '/myScore3', query: { testId: this.testId }})
        }
      })
    },
    finish () {
      var _this = this
      _this.$vux.alert.show({
        title: '注意',
        content: '时间已到，终止考试',
        onHide () {
          _this.submitTest()
        }
      })
    }
  }
}
</script>

<style>
  .weui-cell__bd p {
    margin: 5px 0px;
  }

</style>
