<template>
  <div class="message clearfix">
    <!-- <div class="search-list fl">
      <search></search>
      <messagelist></messagelist>
    </div> -->
    <div class="chat-box fl">
      <chatfriend></chatfriend>
    </div>
  </div>
</template>

<script>

export default {
  components: {
    // search: () => import('../search/search'),
    // messagelist: () => import('../../components/grouplist/grouplist'),
    chatfriend: () => import('../groupinfo/grouplist'),
  },

};
</script>
<style>
</style>
<style scoped lang="less">
.message {
  width: 100%;
  height: 100%;
  .chat-box {
    // width: 626px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    // box-shadow: 2px 0 3px -1px #ccc;
  }
}
</style>