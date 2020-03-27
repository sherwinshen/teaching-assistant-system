<template>
  <div>
    <!--顶部-->
    <div v-bind:class="{ top: isActive }">
      <div style="display: flex;align-items: center;">
        <img src="./../assets/home.png" style="height: 20px;padding: 0px 10px 0px 20px; border-right: 1px solid #C0C4CC;" @click="goHome"/>
        <div style="color: #606266;margin-left: 15px;font-size: 16px;min-width: 80px;">成绩报告</div>
      </div>
    </div>
    <div style="height: 55px"></div>
    <div style="overflow: hidden;">
      <!--部分一-->
      <masker style="border-radius: 2px;" color="409EFF" :opacity="0.1">
        <div class="img"></div>
        <div slot="content">
          <div class="title">
            <flexbox>
              <flexbox-item>
                <div style="text-align: right;margin-right: 20px;font-size: 16px;">
                  分数:&nbsp;<span style="font-size: 30px">{{score}}</span>&nbsp;分
                </div>
              </flexbox-item>
              <flexbox-item>
                <flexbox orient="vertical" style="text-align: left;font-size: 16px;">
                  <flexbox-item>共&nbsp;<span style="font-size: 24px">{{questionNum}}</span>&nbsp;题</flexbox-item>
                  <flexbox-item>答对&nbsp;<span style="font-size: 24px">{{rightNum}}</span>&nbsp;题</flexbox-item>
                </flexbox>
              </flexbox-item>
            </flexbox>
          </div>
          <div class="btn">
            <mt-button type="primary" style="width: 40%" @click="goTest">查看答案</mt-button>
          </div>
        </div>
      </masker>
      <!--部分二-->
      <div style="margin: 10px;padding:5px 0px 10px 0px;border-bottom: 1px solid #606266">
        <div style="display: flex;align-items: center;flex-direction: row;justify-content: space-between;">
          <div>
            <span>答题卡</span>
          </div>
          <div style="margin-right: 20px;">
            <span>正确</span><span v-bind:class="{icon_s: isActive }" style="background-color: #409EFF;"></span>
            <span style="margin-left: 25px">错误</span><span v-bind:class="{icon_s: isActive }" style="background-color: #F56C6C;"></span>
          </div>
        </div>
      </div>
      <!--部分三-->
      <flexbox :gutter="2" wrap="wrap" style="margin: 5px 10px; text-align: center">
        <flexbox-item :span="1/6" v-for="(value, index) in result" :key="index" style="margin-bottom: 10px">
          <span v-if="value.isRight === true" v-bind:class="{icon_t: isActive }">{{index+1}}</span>
          <span v-if="value.isRight === false" v-bind:class="{icon_f: isActive }">{{index+1}}</span>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { Masker, Flexbox, FlexboxItem, Badge } from 'vux'
import axios from 'axios'
export default {
  components: {
    Masker,
    Flexbox,
    FlexboxItem,
    Badge
  },
  data () {
    return {
      testId: '',
      isActive: true,
      result: '',
      score: 0,
      questionNum: 0,
      rightNum: 0
    }
  },
  mounted () {
    this.getScore()
  },
  created () {
    if (this.$route.query.testId) {
      this.testId = this.$route.query.testId
    } else {
      this.$router.push({path: '/home'})
    }
  },
  methods: {
    goHome () {
      this.$router.push('/home')
    },
    getScore () {
      var studentId = localStorage.getItem('userId')
      var param = {
        studentId: studentId,
        testId: this.testId
      }
      axios.get('/students/getScore1', {
        params: param
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          var result = res.result
          this.score = result.score
          this.questionNum = result.answerResult.length
          this.rightNum = result.rightCount
          this.result = result.answerResult
        }
      })
    },
    goTest () {
      // 跳转成绩详情页面
      this.$router.push({path: '/myTest', query: { testId: this.testId }})
    }
  }
}
</script>

<style>
  .img {
    padding-bottom: 50%;
    display: block;
    position: relative;
    max-width: 100%;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    border-radius: 2px;
    background: url("../assets/bg_1.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
  }

  .title {
    color: #fff;
    text-align: center;
    text-shadow: 0 0 2px rgba(0, 0, 0, .5);
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 30%;
    transform: translateY(-50%);
  }
  .btn {
    color: #fff;
    text-align: center;
    text-shadow: 0 0 2px rgba(0, 0, 0, .5);
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 82%;
    transform: translateY(-50%);
  }
  .icon_s {
    position: absolute;
    margin: 5px;
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%;
  }
  .icon_t {
    width: 26px;
    height: 26px;
    border-radius: 99px;
    font-size: 18px;
    padding: 10px;
    color: #fff;
    text-align: center;
    display: inline-block;
    background-color: #409EFF;
  }
  .icon_f {
    width: 26px;
    height: 26px;
    border-radius: 99px;
    font-size: 18px;
    padding: 10px;
    color: #fff;
    text-align: center;
    display: inline-block;
    background-color: #F56C6C;
  }
</style>
