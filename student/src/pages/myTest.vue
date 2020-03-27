<template>
    <div>
      <!--顶部-->
      <div v-bind:class="{ top: isActive }">
        <div style="display: flex;align-items: center;">
          <img src="./../assets/home.png" style="height: 20px;padding: 0px 10px 0px 20px; border-right: 1px solid #C0C4CC;" @click="goHome"/>
          <div style="color: #606266;margin-left: 15px;font-size: 16px;min-width: 80px;">答案详情</div>
        </div>
        <div>
          <el-button type="text" icon="el-icon-back" style="margin-right: 20px" @click="goBack">返回</el-button>
        </div>
      </div>
      <div style="height: 55px"></div>
      <!--答案-->
      <div v-for="(element,index) in content" :key="element._id" style="font-size: 14px;padding: 10px;border-bottom: 1px solid rgba(0,0,0,.125);">
        <div style="display: flex;justify-content: space-between; align-items: center;margin-bottom: 10px;">
          <div>
            <span>题{{index+1}} —</span>
            <span style="color: #409EFF" v-if="element.questionType==='2' || element.questionType==='1'">正确答案：<span v-for="item in element.answer" :key="item">{{item}}&nbsp;</span></span>
            <span style="color: #409EFF" v-if="element.questionType==='3'">正确答案：<span v-for="item in element.answer" :key="item">{{ myfilter5(item) }}</span></span>
          </div>
          <div v-if="element.isRight===true" style="color: #67C23A">
            <span  v-if="element.questionType==='2' || element.questionType==='1'">你的答案：<span v-for="item in element.yourAnswer" :key="item">{{item}}&nbsp;</span></span>
            <span  v-if="element.questionType==='3'">你的答案：<span v-for="item in element.yourAnswer" :key="item">{{ myfilter5(item) }}</span></span>
          </div>
          <div v-if="element.isRight===false" style="color: #F56C6C">
            <span  v-if="element.questionType==='2' || element.questionType==='1'">你的答案：<span v-for="item in element.yourAnswer" :key="item">{{item}}&nbsp;</span></span>
            <span  v-if="element.questionType==='3'">你的答案：<span v-for="item in element.yourAnswer" :key="item">{{ myfilter5(item) }}</span></span>
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
    </div>

</template>

<script>
import axios from 'axios'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      isActive: true,
      testId: '',
      value: [],
      content: [],
      isEnding: true
    }
  },
  mounted () {
    this.getAnswer()
  },
  created () {
    if (this.$route.query.testId) {
      this.testId = this.$route.query.testId
    } else {
      this.$router.push({path: '/home'})
    }
  },
  methods: {
    isEnd () {
    },
    goBack () {
      this.$router.back(-1)
    },
    goHome () {
      this.$router.push('/home')
    },
    myfilter5 (value) {
      if (value === 1 || value === '1') {
        return '正确'
      } else {
        return '错误'
      }
    },
    getAnswer () {
      var param2 = {
        testId: this.testId
      }
      axios.get('/tests/testIsEnding', {
        params: param2
      }).then((response2) => {
        var res2 = response2.data
        if (res2.status === '0') {
          MessageBox.alert('请在考试结束后查看答案').then(action => {
            this.$router.back(-1)
          })
        } else if (res2.status === '2') {
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
                studentId: localStorage.getItem('userId')
              }
              axios.get('/tests/getMyTest', {
                params: param2
              }).then((response) => {
                var res = response.data
                var test = test1
                var test2 = res.result['answerResult']
                for (var i = 0; i < test.length; i++) {
                  for (var j = 0; j < test2.length; j++) {
                    if (test[i]['_id'] === test2[j]['questionId']) {
                      test[i]['yourAnswer'] = test2[j]['answer']
                      test[i]['isRight'] = test2[j]['isRight']
                    }
                  }
                }
                this.content = test
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
