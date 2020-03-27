<template>
  <div class="fillContain" style="background-color: #fff; border: 1px solid rgba(0,0,0,.125);border-radius:4px;">
    <!--顶部部分-->
    <el-row style="width: 100%; padding:5px 15px;border-bottom: 1px solid rgba(0,0,0,.125);">
      <el-col :span="24" class="makeCenter">
        <!--返回按钮-->
        <el-button type="text" class="makeCenter" @click="goback" icon="el-icon-back">
          <span>返回</span>
        </el-button>
      </el-col>
    </el-row>
    <el-row style="min-height:300px">
      <el-col :span="8" style="height: 100%;padding: 30px">
        <el-card class="mycard">
          <span style="font-weight: bold;font-size: 20px;">自动组卷</span>
          <img src="./../assets/autoTest.png" style="height: 80px;display: block;margin: 20px 0px 30px 0px">
          <el-button type="primary" round size="small" @click="autoGo">点击进入</el-button>
        </el-card>
      </el-col>
      <el-col :span="8" style="height: 100%;padding: 30px">
        <el-card class="mycard">
          <span style="font-weight: bold;font-size: 20px;">手动组卷</span>
          <img src="./../assets/handTest.png" style="height: 80px;display: block;margin: 20px 10px 30px 0px">
          <el-button type="primary" round size="small" @click="handGo">点击进入</el-button>
        </el-card>
      </el-col>
      <el-col :span="8" style="height: 100%;padding: 30px">
        <el-card class="mycard">
          <span style="font-weight: bold;font-size: 20px;">暂存试卷</span>
          <img src="./../assets/temporaryTest.png" style="height: 80px;display: block;margin: 20px 10px 30px 0px">
          <el-button type="primary" round size="small" @click="temporaryGo">点击进入</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      courseId: ''
    }
  },
  created () {
    if (this.$route.query.courseId) {
      this.courseId = this.$route.query.courseId
    } else {
      this.$router.push({path: '/teacher/testRelease'})
    }
  },
  methods: {
    // 返回按钮
    goback () {
      this.$router.back(-1)
    },
    // 手动组卷
    handGo () {
      this.$router.push({path: '/teacher/testRelease/handTest', query: {courseId: this.courseId}})
    },
    // 自动组卷
    autoGo () {
      this.$router.push({path: '/teacher/testRelease/autoTest', query: {courseId: this.courseId}})
    },
    // 暂存试卷
    temporaryGo () {
      this.$router.push({path: '/teacher/testRelease/temporaryList', query: {courseId: this.courseId}})
    }
  }
}
</script>

<style>
  .mycard{
    display: flex;
    flex-direction:row-reverse;
    justify-content: center;
  }
</style>
