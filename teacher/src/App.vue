<template>
  <div id="app" class="fillContain">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body, html {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    font-style: normal;
    text-decoration: none;
    border: none;
  }

  .fillContain {
    height: 100%;
    width: 100%;
  }

  .makeCenter {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
