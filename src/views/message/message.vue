<template>
  <div class="message clearfix">
    
    <!-- <div class="search-list fl">
      <search></search>
      <messagelist></messagelist>
    </div> -->
    <!-- <div v-if="activeMessage==1"
         style="height:100%">
      <div class="chat-box fl">
        <chatbox></chatbox>
        <v-text></v-text>
      </div>
      <div class="chat-friend fr"
           v-if="activeMessage==1">
        <chatfriend></chatfriend>
      </div>
    </div> -->
    <!-- <div class="addfriend fr"
         v-if="activeMessage==0">
      <addfriend></addfriend>
    </div> -->
    <div class="frist">
      <frist></frist>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState([
      'activeMessage',
      'news'
    ]),

  },
  components: {
    // search: () => import('../search/search'),
    messagelist: () => import('../../components/messagelist/messagelist'),
    chatbox: () => import('../../components/chatbox/chatbox'),
    vText: () => import('../../components/text/text'),
    chatfriend: () => import('../../components/chatfriend/chatfriend'),
    addfriend: () => import('../addfriend/addfriend'),
    frist:() => import('../frist/frist')
      },
  data () {
    return {
      active: null,
    }
  },
  mounted(){
    console.log(this.$store.state.news)
  }
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
    background-color: #fff;
  }
  .chat-box {
    // width: 626px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-right: 1px solid #cccccc40;
    // box-shadow: 2px 0 3px -1px #0000000f;
  }
  .chat-friend {
    width: 22.2%;
    border-radius: 0 10px 10px 0;
    height: 100%;
    background-color: #fff;
    // box-shadow: 1px 3px 5px #0000000f
    box-shadow: 0px 0px 0px #0000000f inset, 0px 0px 0px #0000000f inset,
      0px 0px 0px #0000000f inset, 4px 2px 8px #0000000f inset;
  }
  .addfriend {
    width: 75.5%;
    height: 100%;
    background-color: #fff;
    border-radius: 0 10px 10px 0;
  }
}
</style>