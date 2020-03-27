<template>
  <div>
    <!--顶部-->
    <div v-bind:class="{ top: isActive }">
      <div style="display: flex;align-items: center;">
        <img src="./../assets/home.png" style="height: 20px;padding: 0px 10px 0px 20px; border-right: 1px solid #C0C4CC;" @click="goHome"/>
        <div style="color: #606266;margin-left: 15px;font-size: 16px;min-width: 80px;">个人中心</div>
      </div>
    </div>
    <div style="height: 55px"></div>
    <mt-cell to="/home" style="background: rgba(89,159,232,0.2)">
      <img slot="icon" src="./../assets/c_icon1.png" width="20" height="20" style="margin-left: 30px;">
      <span slot="title" style="margin-left: 30%;;font-size: 14px; color: #509FE8;">修改资料</span>
    </mt-cell>
    <mt-cell to="/changePwd" >
      <img slot="icon" src="./../assets/c_icon2.png" width="18" height="20" style="margin-left: 30px;margin-right: 2px;">
      <span slot="title" style="margin-left: 30%;;font-size: 14px; color: #636363;">修改密码</span>
    </mt-cell>
    <mt-cell to="/home" >
      <img slot="icon" src="./../assets/c_icon3.png" width="20" height="20" style="margin-left: 30px;">
      <span slot="title" style="margin-left: 30%;;font-size: 14px; color: #636363;">意见反馈</span>
    </mt-cell>
    <mt-cell to="/home" >
      <img slot="icon" src="./../assets/c_icon4.png" width="20" height="20" style="margin-left: 30px;">
      <span slot="title" style="margin-left: 30%;;font-size: 14px; color: #636363;">使用指南</span>
    </mt-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: true
    }
  },
  methods: {
    goHome () {
      this.$router.push('/home')
    }
  }
}
</script>

<style>
  .mint-cell-title{
    display: flex;
    align-items: center;
    padding: 20px 0px;
  }

</style>
