<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    height: 100%;
    width: 100%;
  }
  body,html {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    font-style: normal;
    text-decoration: none;
    border: none;
  }
  .fillContain{
    height: 100%;
    width: 100%;
  }
  .top{
    background: #FFF;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 50px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    z-index: 9999;
  }
</style>
