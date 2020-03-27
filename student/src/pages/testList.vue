<template>
    <div>
      <!--顶部-->
      <div v-bind:class="{ top: isActive }">
        <div style="display: flex;align-items: center;">
          <img src="./../assets/home.png" style="height: 20px;padding: 0px 10px 0px 20px; border-right: 1px solid #C0C4CC;" @click="goHome"/>
          <div style="color: #606266;margin-left: 15px;font-size: 16px;min-width: 80px;">考试列表</div>
        </div>
        <div>
          <el-button type="text" icon="el-icon-back" style="margin-right: 20px" @click="goBack">返回</el-button>
        </div>
      </div>
      <div style="height: 35px"></div>
      <group>
        <cell v-for="(value,index) in testList" :key="value._id"  :link="{path:'/testOnline',query:{testId:value._id}}">
          <span slot="title">考试{{index+1}}</span>
          <span style="font-size: 12px;">限时：{{value.testTime}}分钟</span>
          <span style="font-size: 12px;margin:0px 10px;">题量：{{value.questionNum}}题</span>
        </cell>
      </group>
    </div>
</template>

<script>
import { Cell, CellBox, CellFormPreview, Group } from 'vux'
import { MessageBox } from 'mint-ui'
import axios from 'axios'
export default {
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox
  },
  data () {
    return {
      courseId: '',
      isActive: true,
      testList: []
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
    this.getCoursesList()
  },
  methods: {
    goHome () {
      this.$router.push('/home')
    },
    goBack () {
      this.$router.back(-1)
    },
    getCoursesList () {
      var courseId = this.courseId
      var param = {
        courseId: courseId
      }
      axios.get('/courses/getTestNow', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '2') {
          MessageBox.alert('暂无考试').then(action => {
            this.$router.back(-1)
          })
        } else if (res.status === '0') {
          var testIdList = res.result.testNow
          var param = {
            testIdList: testIdList
          }
          axios.get('/tests/getTestList2', {
            params: param
          }).then((response) => {
            var res = response.data
            this.testList = res.result
          })
        } else {
          console.log('查询错误')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
