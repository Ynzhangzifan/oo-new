<template>
  <div class="message clearfix">
    <!-- <div class="search-list fl"> -->
      <!-- <search></search> -->
      <!-- <messagelist></messagelist> -->
    <!-- </div> -->
    <!-- <div class="chat-box fl"
         v-if="active==1">
      <chatfriend></chatfriend>
    </div> -->
    <div class="chat-box">
      <chatfriend></chatfriend>
    </div>
    <!-- <div class="addfriend fl"
         v-if="active==0">
      <addfriend></addfriend>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState([
      'active',
    ]),
  },
  components: {
    // search: () => import('../search/search'),
    // messagelist: () => import('../../components/friendslist/friendslist'),
    chatfriend: () => import('../friendinfo/friendlist'),
    // addfriend: () => import('../addfriend/addfriend'),
  },

  data () {
    return {
      selectFriendId: null,
    }
  },
};
</script>
<style>
</style>
<style scoped lang="less">
.message {
  width: 100%;
  height: 100%;
  .search-list {
    width: 24.5%;
    height: 100%;
    background-color: #363e47;
  }
  .chat-box {
    // width: 626px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 0 16px 16px 0;
    // box-shadow: 2px 0 3px -1px #ccc;
  }
  .addfriend {
    width: 75.5%;
    height: 100%;
    background-color: #fff;
    border-radius: 0 16px 16px 0;
  }
}
</style>