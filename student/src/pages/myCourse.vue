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
    <flexbox :gutter="0">
      <flexbox-item style="padding: 20px 10px 10px 20px">
        <div v-bind:class="{ card: isActive }">
          <flexbox orient="vertical">
            <flexbox-item v-bind:class="{ cardText: isActive }">在线考试</flexbox-item>
            <flexbox-item><img src="./../assets/onlinetest.png" style="height: 40px;margin-bottom: 10px;"/></flexbox-item>
            <flexbox-item><mt-button @click.native="goTest" type="primary" size="small" style="border-radius: 20px;">&nbsp;点击进入&nbsp;</mt-button></flexbox-item>
          </flexbox>
        </div>
      </flexbox-item>
      <flexbox-item style="padding: 20px 20px 10px 10px">
        <div v-bind:class="{ card: isActive }">
          <flexbox orient="vertical">
            <flexbox-item v-bind:class="{ cardText: isActive }">成绩查看</flexbox-item>
            <flexbox-item><img src="./../assets/score.png" style="height: 40px;margin-bottom: 10px;"/></flexbox-item>
            <flexbox-item><mt-button @click.native="goScore" type="primary" size="small" style="border-radius: 20px;">&nbsp;点击进入&nbsp;</mt-button></flexbox-item>
          </flexbox>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0">
      <flexbox-item style="padding: 20px 10px 10px 20px">
        <div v-bind:class="{ card: isActive }">
          <flexbox orient="vertical">
            <flexbox-item v-bind:class="{ cardText: isActive }">错题本</flexbox-item>
            <flexbox-item><img src="./../assets/errorbook.png" style="height: 40px;margin-bottom: 10px;"/></flexbox-item>
            <!--<flexbox-item><el-button type="primary" round size="mini">&nbsp;点击进入&nbsp;</el-button></flexbox-item>-->
            <flexbox-item><mt-button @click.native="goCollection" type="primary" size="small" style="border-radius: 20px;">&nbsp;点击进入&nbsp;</mt-button></flexbox-item>
          </flexbox>
        </div>
      </flexbox-item>
      <flexbox-item style="padding: 20px 20px 10px 10px">
        <div v-bind:class="{ card: isActive }">
          <flexbox orient="vertical">
            <flexbox-item v-bind:class="{ cardText: isActive }">知识点查看</flexbox-item>
            <flexbox-item><img src="./../assets/knowledge.png" style="height: 40px;margin-bottom: 10px;"/></flexbox-item>
            <flexbox-item><mt-button @click.native="goKnowledge" type="primary" size="small" style="border-radius: 20px;">&nbsp;点击进入&nbsp;</mt-button></flexbox-item>
          </flexbox>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import axios from 'axios'
import { Flexbox, FlexboxItem, XButton } from 'vux'
export default {
  components: {
    Flexbox,
    FlexboxItem,
    XButton
  },
  data () {
    return {
      isActive: true,
      courseId: '',
      courseName: ' '
    }
  },
  created () {
    if (this.$route.query.courseId) {
      this.courseId = this.$route.query.courseId
    } else {
      this.$router.push({path: '/courseList'})
    }
  },
  mounted () {
    this.getName()
  },
  methods: {
    goHome () {
      this.$router.push('/home')
    },
    goBack () {
      this.$router.back(-1)
    },
    goTest () {
      this.$router.push({path: '/testList', query: {courseId: this.courseId}})
    },
    goScore () {
      this.$router.push({path: '/allScore', query: {courseId: this.courseId}})
    },
    goCollection () {
      this.$router.push({path: '/myCollection', query: {courseId: this.courseId}})
    },
    goKnowledge () {
      this.$router.push('/kPoint')
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
    }
  }
}
</script>

<style scoped>
  .card{
    padding: 20px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    color: #303133;
  }
  .vux-flexbox-item {
    text-align: center;
  }
  .cardText{
    color: #409EFF;
    margin-bottom: 10px!important;
  }

</style>
