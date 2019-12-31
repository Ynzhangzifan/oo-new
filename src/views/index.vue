<template>
  <div class="vue-chat">
    <div class="container clearfix">
      <div class="aside fl">
        <sidebar></sidebar>
      </div>
      <div class="main fr">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from './sidebar/sidebar'

export default {
  components: {
    sidebar,
  },

};
</script>
<style>
</style>
<style scoped lang="less">
.vue-chat {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  .container {
    width: 100%;
    height: 100%;
    min-width: 1150px;
    .aside {
      width: 21%;
      min-width:230px;
      height: 100%;
      background-color: #f9f9f9;
      border-right:1px solid #d5d9de
    }
    .main {
      width: 79%;
      // min-width:calc(80% - 230px);
      box-sizing: border-box;
      height: 100%;
    }
  }
}
</style>