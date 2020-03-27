<template>
    <div>
      <!--顶部-->
      <div v-bind:class="{ top: isActive }">
        <div style="display: flex;align-items: center;">
          <img src="./../assets/home.png" style="height: 20px;padding: 0px 10px 0px 20px; border-right: 1px solid #C0C4CC;" @click="goHome"/>
          <div style="color: #606266;margin-left: 15px;font-size: 16px;min-width: 80px;">{{courseName}}</div>
        </div>
        <div>
          <el-button type="text" icon="el-icon-back" style="margin-right: 20px" @click="goBack">返回</el-button>
        </div>
      </div>
      <div style="height: 55px"></div>
      <div v-for="(data,index) in questionList" :key="data._id">
        <el-tag type="primary" size="medium" style="margin: 15px 10px 5px 10px">{{myfilter3(data.questionType)}}</el-tag>
        <div style="margin: 5px 10px; font-size: 18px">题{{index+1}}—{{data.stem}}</div>
        <checklist v-if="data.questionType==='1'" disabled :options="[{key: 'A', value: data.optionA},{key: 'B', value: data.optionB},{key: 'C', value: data.optionC},{key: 'D', value: data.optionD}]" v-model="value[index]"></checklist>
        <checklist v-if="data.questionType==='2'" disabled :options="[{key: 'A', value: data.optionA},{key: 'B', value: data.optionB},{key: 'C', value: data.optionC},{key: 'D', value: data.optionD}]" v-model="value[index]"></checklist>
        <checklist v-if="data.questionType==='3'" disabled :options="[{key: 1, value: '正确'},{key: 2, value: '错误'}]" v-model="value[index]"></checklist>
        <!--<div style="margin: 15px 0px 5px 0px">-->
          <!--<el-tag type="primary" size="medium" style="margin:0px 10px">{{myfilter3(data.questionType)}}</el-tag>-->
          <!--<span style="margin: 0px 10px ; font-size: 18px;">题{{index+1}}—{{data.stem}}</span>-->
        <!--</div>-->
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Checklist } from 'vux'
import { MessageBox } from 'mint-ui'
export default {
  components: {
    Checklist
  },
  data () {
    return {
      courseId: '',
      isActive: true,
      courseName: '',
      value: [],
      questionList: []
    }
  },
  created () {
    if (this.$route.query.courseId) {
      this.courseId = this.$route.query.courseId
    } else {
      this.$router.push({path: '/home'})
    }
  },
  mounted () {
    this.getName()
    this.getContent()
  },
  methods: {
    myfilter3 (value) {
      if (value === 1 || value === '1') return '单选'
      else if (value === 2 || value === '2') return '多选'
      else if (value === 3 || value === '3') return '判断'
      else return value
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
        courseId: this.courseId,
        studentId: localStorage.getItem('userId')
      }
      axios.get('/tests/getCollection', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          this.value = res.answer
          this.questionList = res.result
        } else if (res.status === '2') {
          MessageBox.alert('暂无错题').then(action => {
            // 跳转成绩显示页面
            this.$router.back(-1)
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
