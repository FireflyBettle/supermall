<template>
  <div id="app">
    <MainTabbar></MainTabbar>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
  import MainTabbar from 'components/content/mainTabbar/MainTabbar'
  export default {
    name: 'App',
    components: {
        MainTabbar
    }
  }
</script>
<style lang="less">
  @import "assets/css/base.css";
</style>
