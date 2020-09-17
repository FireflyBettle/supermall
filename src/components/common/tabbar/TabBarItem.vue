<template>
  <div class="tab-bar-item" @click="itemClcik">
    <div v-if="isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style=styleColor><slot name="item-text"></slot></div>
  </div>
</template>

<script>
    export default {
      name: "TabbarItem",
      data() {
        return {
          // isActive: true,
        }
      },
      props:{
        path: String,
        activeColor: {
          type: String,
          default: 'orange'
        }
      },
      computed: {
        isActive() {
          return this.$route.path.indexOf(this.path) == -1
        },
        styleColor() {
          return !this.isActive ? {color:this.activeColor} : {}
        }
      },
      methods: {
        itemClcik() {
          this.$router.replace(this.path).catch(err => {err})
        }
      },
      activated() {
        // console.log(1);
      }
    }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 24px;
    vertical-align: middle;
    height: 24px;
    margin-bottom: 3px;
  }
</style>
