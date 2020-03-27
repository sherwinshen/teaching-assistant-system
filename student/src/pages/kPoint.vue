<template>
  <div style="height: 100%">
    <!--顶部-->
    <div v-bind:class="{ top: isActive }">
      <div style="display: flex;align-items: center;">
        <img src="./../assets/home.png" style="height: 20px;padding: 0px 10px 0px 20px; border-right: 1px solid #C0C4CC;" @click="goHome"/>
        <div style="color: #606266;margin-left: 15px;font-size: 16px;min-width: 80px;">知识点查看</div>
      </div>
      <div>
        <el-button type="text" icon="el-icon-back" style="margin-right: 20px" @click="goBack">返回</el-button>
      </div>
    </div>
    <div style="height: 35px"></div>
    <panel :list="list" type="5" @on-click-item="clickGo"></panel>
  </div>
</template>

<script>
import { Panel } from 'vux'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      isActive: true,
      list: [{
        src: 'http://www.fourdays.top/assets/img/img1.png',
        title: '计算机网络-概述',
        desc: '1. 计算机网络的概念、组成和功能 2. 计算机网络的分类 3. 计算机网络的标准化工作及相关知识'
      },
      {
        src: 'http://www.fourdays.top/assets/img/img2.png',
        title: '计算机网络-物理层设备',
        desc: ' 1. 中继器 2. 集线器'
      },
      {
        src: 'http://www.fourdays.top/assets/img/img3.png',
        title: '计算机网络-网络层功能',
        desc: '1. 异构网络互联 2. 路由与转发 3. 拥塞控制 '
      },
      {
        src: 'http://www.fourdays.top/assets/img/img4.png',
        title: '计算机网络-路由算法',
        desc: '1. 静态路由与动态路由 2. 距离-向量路由算法 3. 链路状态路由算法 4. 层次路由'
      },
      {
        src: 'http://www.fourdays.top/assets/img/img5.png',
        title: '计算机网络-路由协议',
        desc: ' 1. 自治系统 2. 域内路由与域间路由 3. RIP协议 4. OSPF协议 5. BGP路由协议'
      }
      ]
    }
  },
  components: {
    Panel
  },
  methods: {
    goHome () {
      this.$router.push('/home')
    },
    goBack () {
      this.$router.back(-1)
    },
    clickGo (item) {
      MessageBox('提示', '暂未上传详细内容')
    }
  }
}
</script>

<style scoped>

</style>
