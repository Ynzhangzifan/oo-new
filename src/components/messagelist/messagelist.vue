<!-- 聊天列表 -->
<template>
  <div class="msglist">
    <ul>
      <li v-for="item in sortArr"
          class="sessionlist"
          :class="{ active: item.id === selectId }"
          @click="selectSession(item.id)">
        <div class="list-left">
          <img class="avatar"
               width="54"
               height="54"
               :alt="item.user.name"
               :src="item.user.img">{{item.index}}
          <span class="tips"
                v-if="item.tips && item.id != selectId">{{item.tips}}</span>
        </div>
        <div class="list-right"
             @click="item.tips = 0">
          <p class="name">{{item.user.name}}</p>
          <span class="time">{{item.applydate}}</span>
          <p class="lastmsg">
            <span v-if="item.content"
                  v-html="replaceFace1(item.content,item)"></span>
            <span v-else>
              {{$t('message.已经置顶聊天')}}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      secret_key: sessionStorage.secret_key
    }
  },
  computed: {
    ...mapState([
      'selectId',
      'searchText',
      'emojis',
    ]),
    ...mapGetters([
      'searchedChatlist',
      'selectedChat'
    ]),
    sortArr: function () {
      return this.sortKey(this.searchedChatlist, 'index')
    }
  },
  created () {
    // this.initData()
  },
  methods: {
    ...mapActions([
      'selectSession',
      // 'initData'
    ]),
    sortKey (array, key) {
      // console.log(array)
      for (var item in array) {

        var lastmessage = array[item].messages[array[item].messages.length - 1]
        // array[item].content = this.decode(array[item].content, this.secret_key)
        if (lastmessage && lastmessage.is_burn == 0) {
          array[item]['last'] = { 'name': (lastmessage.name) ? lastmessage.name : this.$t('message.我'), 'content': lastmessage.content ? this.decode(lastmessage.content, this.secret_key) : 'null' }
        } else if (lastmessage && lastmessage.is_burn != 0) {
          array[item]['last'] = { 'name': (lastmessage.name) ? lastmessage.name : this.$t('message.我'), 'content': lastmessage.content ? this.decode(lastmessage.content, this.secret_key) : 'null' }
        }
        // else if (lastmessage && lastmessage.self && array[item].id.slice(0, 5) == 'group') {
        //   // array[item].content = this.decode(array[item].content, this.secret_key)
        //   array[item]['last'] = { 'name': (lastmessage.name) ? lastmessage.name : '我', 'content': lastmessage.content ? this.decode(lastmessage.content, this.secret_key) : 'null' }
        // }
        // else if (lastmessage && !lastmessage.self && array[item].id.slice(0, 5) == 'group') {
        //   array[item]['last'] = { 'name': (lastmessage.name) ? lastmessage.name : '我', 'content': lastmessage.content ? lastmessage.content : 'null' }
        // }
      }
      return array.sort(function (a, b) {
        // console.log(a, b)
        return b.timestamp - a.timestamp;

      })
    },
    replaceFace1 (con, item) {
      // console.log(con)
      con = this.decode(con, this.secret_key)
      if (con.includes('/:')) {
        var emojis = this.emojis;
        for (var i = 0; i < emojis.length; i++) {
          if (emojis[i].size == 'xs') {
            con = con.replace(emojis[i].reg, '<img src="static/emoji/' + emojis[i].file + '"  alt="" style="vertical-align: middle;" />');
          } else {
            con = con.replace(emojis[i].reg, '<img src="static/emoji/' + emojis[i].file + '"  alt="" style="vertical-align: middle; width: 24px;" />');
          }
        }
        if (item.chatname) {
          if (item.last) {
            if (item.notice && item.id != this.selectId) {
              console.log('notice')
              con = item.notice + item.last.name + ':' + con
              con = con.replace(item.notice, '<span style="color:#f55f5f">' + item.notice + '</span>')
            }
            else {
              con = item.last.name + ':' + con
            }
          } else {
            if (item.notice && item.id != this.selectId) {
              con = item.notice + item.chatname + ':' + con
              con = con.replace(item.notice, '<span style="color:#f55f5f">' + item.notice + '</span>')
            }
            else {
              con = item.chatname + ':' + con
            }


          }
        }

        return con;
      } else {
        // console.log(item)
        con = con.replace(/\n/g, "<br/>")
        if (item.chatname) {
          if (item.last) {
            if (item.notice && item.id != this.selectId) {
              console.log('notice')
              con = item.notice + item.last.name + ':' + con
              con = con.replace(item.notice, '<span style="color:#f55f5f">' + item.notice + '</span>')
            }
            else {
              con = item.last.name + ':' + con
            }
          } else {
            if (item.notice && item.id != this.selectId) {
              con = item.notice + item.chatname + ':' + con
              con = con.replace(item.notice, '<span style="color:#f55f5f">' + item.notice + '</span>')
            }
            else {
              con = item.chatname + ':' + con
            }


          }
        }
      }
      return con;
    },
  },
  filters: {
    // 将日期过滤为 hour:minutes
    time (date) {
      if (typeof date === 'string') {
        date = new Date(date);
      }
      if (date.getMinutes() < 10) {
        return date.getHours() + ':0' + date.getMinutes();
      } else {
        return date.getHours() + ':' + date.getMinutes();
      }
    }
  },
  mounted () {
    if (sessionStorage.ref == 1) {
      return false
    }
    location.reload()
    sessionStorage.setItem('ref', 1)

  },
  // watch: {
  //   sortArr () {
  //     this.$store.dispatch('chatlistSort')
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
.msglist
  height calc(100% - 86px)
  overflow-y auto
  .sessionlist
    display flex
    padding 16px 12px
    transition background-color 0.1s
    font-size 0
    &:hover
      background-color #404953
    &.active
      background-color #404953
      box-shadow 0 3px 3px 0px #080a0833
    .avatar
      border-radius 50%
      margin-right 12px
    .list-left
      position relative
      .tips
        height 16px
        width 16px
        background #52d48a
        display block
        border-radius 10px
        position absolute
        top -5px
        right 5px
        font-size 10px
        color #fff
        text-align center
        line-height 16px
    .list-right
      position relative
      flex 1
      .name
        display inline-block
        vertical-align top
        font-size 16px
        color #dfdfdf
        width 50%
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
      .time
        float right
        color #dfdfdf
        font-size 12px
        vertical-align top
      .lastmsg
        position absolute
        font-size 14px
        width calc(100% - 34px)
        height 22px
        line-height 22px
        color #818181
        bottom 0
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
</style>
