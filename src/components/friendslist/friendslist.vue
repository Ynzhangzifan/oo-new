<!-- 好友列表 -->
<template>
  <div class="friendlist">
    <ul>
      <li v-for="item in searchedFriendlist"
          class="frienditem"
          :class="{ noborder: !item.initial}">
        <div class="list_title"
             v-if="item.initial">{{item.initial}}</div>
        <div class="friend-info"
             :class="{ active: item.id === selectFriendId }"
             @click="selectFriend(item.id)">
          <img class="avatar"
               width="48"
               height="48"
               :src="item.img">
          <div class="remark">{{item.username}}
            <span class="tips"
                  v-if="item.tips>0">{{item.tips}}</span>
          </div>

        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState([
      'selectFriendId',
      'searchText'
    ]),
    ...mapGetters([
      'searchedFriendlist'
    ])
  },
  methods: {
    ...mapActions([
      'selectFriend',
    ])
  },
}
</script>

<style lang="stylus" scoped>
.friendlist
  height calc(100% - 86px)
  overflow-y auto
  .frienditem
    border-top 1px solid #2a2d31
    &:first-child, &.noborder
      border-top none
    .list_title
      box-sizing border-box
      width 100%
      font-size 16px
      padding 15px 0 5px 20px
      color #dfdfdf
      background #363e47
    .friend-info
      display flex
      padding 20px
      transition background-color 0.1s
      font-size 0
      &:hover
        background-color #303841
      &.active
        background-color #303841
      .avatar
        min-width 48px
        border-radius 50%
        margin-right 12px
      .remark
        font-size 20px
        line-height 48px
        position relative
        color #ffffff
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        .tips
          height 16px
          width 16px
          background #F55F5F
          display block
          border-radius 10px
          position absolute
          top 4px
          right -14px
          font-size 10px
          color #fff
          text-align center
          line-height 16px
</style>
<style scoped>
.friendlist::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/*正常情况下滑块的样式*/

.friendlist::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在该类指向的控件上时滑块的样式*/

.friendlist:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在滑块上时滑块的样式*/

.friendlist::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}

/*鼠标悬浮在滚动条上的主干部分*/

.friendlist::-webkit-scrollbar-track:hover {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.01);
}
</style>
