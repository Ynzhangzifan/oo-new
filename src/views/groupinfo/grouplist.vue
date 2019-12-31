<!-- 好友信息 -->
<template>
  <div class="Info-wrapper">
    <div class="friendInfo" style="height:100%"
         >
      <div class="esInfo">
        <div class="left">
          <div class="people">
            <div class="nickname">
              <!-- <input type="text"
                     maxlength="16"
                     v-if="edit_group_name == true"
                     v-model="old_name"
                     @blur="confirm"> -->
                     <span>{{$store.state.groupsdatas.group_name}}</span>
                     <p style="font-size:16px">{{$store.state.groupsdatas.num}}人</p>
            </div>
          </div>
          <!-- <div class="signature">{{this.$store.state.groupsdatas.signature}}</div> -->
        </div>
      </div>
      <div class="detInfo">
        <div class="member"
             style="position: relative;"
             v-for="item in this.$store.state.groupsdatas.data">
             <div>
               <img :src="item.user_img"
                  width="66"
                  height="66"
                  style="cursor: pointer"
                  @click="information(item)"
                  :alt="item.username">
              <p class="wename">{{item.username}}</p>
             </div>
          
        </div>
        <div class="member"
             @click="delmember"
             v-if="email == this.$store.state.groupsdatas.group_email">
          <div class="adddel">-</div>
          <p class="wename">{{$t('friend.删除')}}</p>
        </div>
        <div class="member"
             @click="addmember">
          <div class="adddel">+</div>
          <p class="wename">{{$t('friend.添加')}}</p>
        </div>
      </div>
      <div class="btn">
        <div class="send"
             @click="send">
          <span>{{$t('friend.发消息')}}</span>
        </div>
        <div class="del"
             @click="delGroup(this.$store.state.groupsdatas.id)">
          <span>{{$t('friend.退出群聊')}}</span>
        </div>
      </div>
    </div>
    <!-- 点击群成员 -->
    <div class="dialogs"
         v-if="dialoginformation == true"
         v-show="addArr">
      <div class="header">
        <span></span>
        <span class="close"
              @click="dialoginformation=false">X</span>
      </div>
      <div class="contents">
        <div>
          <div class="nicknames">{{informationlist.username}}</div>
          <img src="../../assets/img/woman.png"
               alt=""
               class="pic"
               v-if="informationlist.sex ==0">
          <img src="../../assets/img/men.png"
               alt=""
               class="pic"
               v-else>
        </div>
        <div class="portrait">
          <img width="84"
               height="84"
               :src="informationlist.img">
        </div>
      </div>
      <div class="underline"></div>
      <div class="addfriends">
        <div></div>
        <div>
          <img src="../../assets/img/Sendout.png"
               alt=""
               class="pic"
               v-if="informationlist.poss ==true">
          <img src="../../assets/img/addfriend.png"
               alt=""
               class="pic"
               v-else
               @click="newadd">
        </div>
      </div>
    </div>

    <!-- 加好友备注 -->
    <div class="dialogs"
         v-if="dialoginformations == true"
         v-show="addArr">
      <div class="header">
        <span class="addadd">{{$t('friend.添加朋友')}}</span>
        <span class="close"
              @click="dialoginformations=false">X</span>
      </div>
      <div class="remarks">
        <el-input v-model="remark"
                  maxlength="10"></el-input>
        <div class="verification">{{$t('friend.你需要发送验证请求，对方通过后你才能加其为朋友')}}</div>
      </div>
      <div class="verifications">
        <div class="createtrue"
             @click="application">
          <span>{{$t('friend.确定')}}</span>
        </div>
        <div class="createstrue"
             @click="applications">
          <span>{{$t('friend.取消')}}</span>
        </div>
      </div>

    </div>
    <!-- 添加组成员 -->
    <el-dialog
               :visible.sync="addDialogVisible"
               width="620px">
      <div class="content">

        <div class="left">
          <div class="friend-list">
            <ul>
              <li v-for="item in addArr"
                  class="frienditem"
                  @click="addcheck(item.id)">
                <div class="friend-info">
                  <img class="avatar"
                       width="48"
                       height="48"
                       :src="item.img">
                  <div class="remark">{{item.username}}</div>
                  <div class="check"><i :class="(item.check)? 'iconfont icon-duigoutianchong-':'iconfont icon-yuanquanweixuanfuben'"></i></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="right">
          <p class="title">{{$t('friend.请勾选需要添加的联系人')}}</p>
          <ul>
            <li v-for="item in rightArr2"
                class="frienditem">
              <div class="friend-info">
                <img class="avatar"
                     width="48"
                     height="48"
                     :src="item.img">
                <div class="remark">{{item.username}}</div>
              </div>
            </li>
          </ul>

          <div class="create"
                 @click="memebradd()">
              <button style="background:#52d68a">{{$t('friend.添加')}}</button>
            </div>
            <div class="creates"
                 @click="cancel">
              <button>{{$t('friend.取消')}}</button>
            </div>

        </div>
      </div>
    </el-dialog>
    <!-- 删除组成员 -->
    <el-dialog 
               :visible.sync="delDialogVisible"
               width="620px">
      <div class="content">

        <div class="left">
          <div class="friend-list">
            <ul>
              <li v-for="item in delArr"
                  class="frienditem"
                  @click="delcheck(item.id)">
                <div class="friend-info">
                  <img class="avatar"
                       width="48"
                       height="48"
                       :src="item.img">
                  <div class="remark">{{item.username}}</div>
                  <div class="check"><i :class="(item.check)? 'iconfont icon-duigoutianchong-':'iconfont icon-yuanquanweixuanfuben'"></i></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="right">
          <p class="title">{{$t('friend.请勾选需要删除的群成员')}}</p>
          <ul>
            <li v-for="item in rightArr"
                class="frienditem">
              <div class="friend-info">
                <img class="avatar"
                     width="48"
                     height="48"
                     :src="item.img">
                <div class="remark">{{item.username}}</div>
              </div>
            </li>
          </ul>

          <div class="create"
                @click="memebrdel()">
            <button>{{$t('friend.删除')}}</button>
          </div>
          <div class="creates"
                @click="cancel">
            <button>{{$t('friend.取消')}}</button>
          </div>

        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import router from '../../router'
import qs from 'qs'
import search from '../../components/group/friend'
import myUpload from 'vue-image-crop-upload'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'selectedFriend',
      'selectedGroup',
      'searchedFriendlist2',
      'selectedChat',
    ]),
    ...mapState([
      'selectGroupId',
      'searchText2',
      'activeGroup',
      'groupsdatas',
      'groupsdata',
    ]),
  },
  data () {
    return {
      remark: this.$t('friend.我是') + sessionStorage.username,
      dialoginformations: false,
      informationlist: [],
      dialoginformation: false,
      searchedFriendlistCopy: [],
      searchstatus: false,
      id: '',
      Info: {},
      listInfo: {},
      accountid: '',
      newArr: [],
      groupname: '',
      exit: '',
      action: '',
      Info: {},
      dialog: false,
      dialog2: false,
      delArr: [],
      addArr: [],
      test: '123',
      rightArr: [],
      rightArr2: [],
      email: sessionStorage.oo_email,
      edit_group_name: false,
      params: {
        group_id: '',
        token: sessionStorage.token,
        name: 'group_avatar'
      },
      show: false,
      old_avatar: '',
      old_name: '',
      Passvalue: null,
      addDialogVisible: false,
      delDialogVisible: false,
    }
  },
  mounted () {
    let than = this
    // mounted事件时   vuex中数据 searchedFriendlist2 未获取到   故时有定时器获取
    setTimeout(() => {
      let arr = this.searchedFriendlist2
      for (var item in arr) {
        arr[item].check = false
      }
      this.searchedFriendlistCopy = arr

    }, 1000)


  },
  created () {
    
  },
  methods: {
    // 取消创建群组
    creates () {
      this.groupname = ''
      this.newArr = []
      for (var i = 0; i < this.searchedFriendlistCopy.length; i++) {
        this.searchedFriendlistCopy[i].check = false
        console.log(this.searchedFriendlistCopy[i].check)
      }

    },
    //群聊成员添加好友
    newadd () {
      this.dialoginformation = false
      this.dialoginformations = true
    },
    // 添加好友接口
    application () {
      var _this = this
      this.$axios.post('addFriend?lang=' + sessionStorage.lang, qs.stringify({ 'id': this.informationlist.id, 'remark': this.remark, 'token': sessionStorage.token }))
        .then(function (res) {
          if (res.data.status == 1) {
            _this.$message({
              message: res.data.msg,
              type: 'success'
            });
            _this.dialog = false
          } else if (res.data.status == 0) {
            _this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
    },

    applications () {
      this.dialoginformations = false
    },
    addcancel () {
      this.addDialogVisible = false

    },
    delcancel () {
      this.delDialogVisible = false
    },
    //群聊点击头像添加好友
    information (item) {
      console.log(item)
      this.informationlist = item
      // console.log(this.searchedFriendlist2)
      for (var i = 0; i < this.searchedFriendlist2.length; i++) {
        if (this.searchedFriendlist2[i].id == item.id) {
          this.informationlist.poss = true
        }
      }
      this.dialoginformation = true
    },
    delsel (id) {
      // this.del(id);
      //  this.newArr.splice(index,1)
      //  console.log(this.searchedFriendlist2.check)
      //  this.searchedFriendlistCopy.check = false
      let data = JSON.parse(JSON.stringify(this.searchedFriendlistCopy))
      data.forEach((element) => {
        if (element.id === id) {
          if (element.check) {
            element.check = false;
            this.del(id);
          }
        }
      });
      this.searchedFriendlistCopy = data
    },
    send () {
      this.$store.dispatch('sendGroup')
      this.$store.dispatch('search', '')
    },
    edit () {
      this.old_name = this.selectedGroup.username
      this.edit_group_name = true
    },
    confirm () {
      if (this.old_name.length < 2) {
        this.$message({
          message: res.data.msg,
          type: 'error'
        });
        this.old_name = this.selectedGroup.username
      } else {
        var _this = this;
        // this.$axios.post(API + '/OO/index.php/Admin/Admin/updateGroupInfo', qs.stringify({ 'group_name': this.old_name, 'group_id': this.selectedGroup.id, 'token': sessionStorage.token }))
        //   .then(function (res) {
        //     if (res.data.status == 1) {

        //     } else {
        //       _this.selectedGroup.username = _this.old_name
        //       alert(res.data.msg)
        //     }
        //     _this.edit_group_name = false
        //   })
      }
    },
    check (id) {
      let data = JSON.parse(JSON.stringify(this.searchedFriendlistCopy))
      // console.log(that.searchedFriendlist2)
      //  console.log(data,'qwe')
      data.forEach((element) => {
        if (element.id === id) {
          if (element.check) {
            element.check = false;
            this.del(id);
          } else {
            element.check = true;
            this.add(element)
          }
        }
      });
      this.searchedFriendlistCopy = data
    },
    delcheck (id) {
      this.test += 1
      // console.log(this.searchedFriendlistCopy)
      // this.searchedFriendlistCopy.check = false
      for (var item in this.delArr) {
        if (this.delArr[item].id == id) {
          if (this.delArr[item].check == true) {
            this.delArr[item].check = false
            var newArr = []
            for (var item in this.rightArr) {
              if (this.rightArr[item].id != id) {
                newArr.push(this.rightArr[item])
              }
            }
            this.rightArr = newArr
          } else {
            this.delArr[item].check = true
            this.rightArr.push(this.delArr[item])
          }
        }
      }
    },
    addcheck (id) {
      this.test += 1
      for (var item in this.addArr) {
        if (this.addArr[item].id == id) {
          if (this.addArr[item].check == true) {
            this.addArr[item].check = false
            var newArr = []
            for (var item in this.rightArr2) {
              if (this.rightArr2[item].id != id) {
                newArr.push(this.rightArr2[item])
              }
            }
            this.rightArr2 = newArr
          } else {
            this.addArr[item].check = true
            this.rightArr2.push(this.addArr[item])
          }
        }
      }
    },
    memebrdel () {
      var Arr = []
      for (var item in this.rightArr) {
        Arr.push(this.rightArr[item].id)
      }
      var _this = this
      this.$axios.post('deleteGroupUser?lang=' + sessionStorage.lang, qs.stringify({ 'group_member': Arr, 'group_id': this.selectedGroup.id, 'token': sessionStorage.token }))
        .then(function (res) {
          if (res.data.status == 1) {
            _this.$message({
              message: res.data.msg,
              type: 'success'
            });
            _this.delDialogVisible = false
          } else if (res.data.status == 0) {
            _this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
    },
    cancel () {
      this.dialog = false
      this.dialog2 = false
    },
    memebradd () {
      var Arr = []
      for (var item in this.rightArr2) {
        Arr.push(this.rightArr2[item].id)
      }
      var _this = this
      this.$axios.post('/putUserGroup?lang=' + sessionStorage.lang, qs.stringify({ 'group_member': Arr, 'group_id': this.selectedGroup.id, 'token': sessionStorage.token }))
        .then(function (res) {
          if (res.data.status == 1) {
            _this.$message({
              message: res.data.msg,
              type: 'success'
            });
            _this.loadgroupmember()
            _this.addDialogVisible = false
          } else if (res.data.status == 0) {
            _this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
    },
    add (obj) {
      this.newArr.push(obj)
    },
    del (id) {
      var newArr2 = []
      for (var item in this.newArr) {
        if (this.newArr[item].id != id) {
          newArr2.push(this.newArr[item])
        }
      }
      this.newArr = newArr2
    },
    create () {
      if (!this.groupname) {
        this.$message({
          message: this.$t('friend.群组名称不能为空'),
          type: 'error'
        });
        return false
      } else if (this.newArr.length < 2) {
        this.$message({
          message: this.$t('friend.成员必须两名以上'),
          type: 'error'
        });
        return false
      }
      var _this = this;
      var idArr = []
      for (var item in this.newArr) {
        idArr.push(this.newArr[item].id)
      }
      this.$axios.post('createGroup?lang=' + sessionStorage.lang, qs.stringify({ 'group_member': idArr, 'group_name': this.groupname, 'token': sessionStorage.token }))
        .then(function (res) {
          if (res.data.status == 1) {
            // 给好友列表添加check属性
            // let arr = _this.searchedFriendlist2
            // for (var item in arr) {
            //   arr[item].check = false
            // }
            _this.groupname = ''
            _this.newArr = []
            for (var i = 0; i < _this.searchedFriendlistCopy.length; i++) {
              _this.searchedFriendlistCopy[i].check = false
              console.log(_this.searchedFriendlistCopy[i].check)
            }
            console.log(res.data.id)
            _this.$store.dispatch('selectGroup', res.data.id)
          } else if (res.data.status == 0) {
            _this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
    },
    delGroup (id) {
      var _this = this;
      this.$axios.post('deleteGroup?lang=' + sessionStorage.lang, qs.stringify({ 'action': this.action, 'group_id': id, 'token': sessionStorage.token }))
        .then(function (res) {
          if (res.data.status == 1) {
            _this.$message({
              message: res.data.msg,
              type: 'success'
            });
            _this.$store.dispatch('delchat', id)
            _this.$store.dispatch('selectGroup', '')
          } else if (res.data.status == 0) {
            _this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
    },
    loadgroupmember () {
      var _this = this;
      this.$axios.post('queryAllGroupUser?lang=' + sessionStorage.lang, qs.stringify({ 'group_id': this.selectedGroup.id, 'token': sessionStorage.token }))
        .then(function (res) {
          if (res.data.status == 1) {
            _this.Info = res.data.data
          } else if (res.data.status == 0) {

          }
        })
    },
    delmember () {
      this.delArr = []
      this.rightArr = []
      this.delDialogVisible = true
      for (var item in this.Info) {
        this.Info[item].check = false
        if (this.Info[item].owner != 1) {
          this.delArr.push(this.Info[item])
        }
      }
      console.log(this.delArr)
    },
    addmember () {
      this.addDialogVisible = true
      var _this = this;
      this.$axios.post('queryNoGroupUser?lang=' + sessionStorage.lang, qs.stringify({ 'group_id': this.selectedGroup.id, 'token': sessionStorage.token }))
        .then(function (res) {
          if (res.data.status == 1) {
            _this.Info = res.data.data
            _this.addset(res.data.data)
          } else {
            _this.$message({
              message: res.data.msg,
              type: 'error'
            });
            _this.addDialogVisible = false
          }

        })
    },
    addset (params) {
      this.addArr = []
      this.rightArr2 = []
      for (var item in params) {
        params[item].check = false
        this.addArr = params
      }
    },
    toggleShow () {
      this.old_avatar = this.selectedGroup.img
      this.params.group_id = this.selectedGroup.id
      this.show = !this.show;
    },
    /**
* crop success
*
* [param] imgDataUrl
* [param] field
*/
    cropSuccess (imgDataUrl, field) {
      // console.log(imgDataUrl, field)
      console.log('-------- crop success --------');
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess (jsonData, field) {
      if (jsonData.status == 1) {
        this.selectedGroup.img = jsonData.img
      } else {
        this.selectedGroup.img = this.old_avatar
        this.$message({
          message: jsonData.msg,
          type: 'error'
        });
      }
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail (status, field) {
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    }
  },

  components: {
    search,
    'my-upload': myUpload
  },
  watch: {
    // selectedGroup (curVal, oldVal) {
    //   // 获取群归属
    //   if (this.selectedGroup.attribution == sessionStorage.oo_email) {
    //     this.exit = this.$t('friend.删除群组')
    //     this.action = 'del'
    //   } else {
    //     this.exit = this.$t('friend.退出群组')
    //     this.action = 'exit'
    //   }
    //   this.loadgroupmember()
    // },
    deep: true
  },
}
</script>

<style lang="stylus" scoped>
.dialog
  padding 20px
  position absolute
  box-sizing border-box
  width 42%
  background #f2f7f7
  overflow auto
  top 24%
  text-align center
  height calc(100% - 38%)
  .header
    display flex
    position relative
    padding 10px 10px 10px 30px
    font-size 16px
  .close
    position absolute
    right 10px
    cursor pointer
  .content
    height 90%
    padding 10px
.select-friend
  display flex
  padding 10px
  box-sizing border-box
  height calc(100% - 86px)
  .left
    width 50%
    height 100%
    flex-direction column
    .friend-list
      padding 0 15px
      width 100%
      height 80%
      margin-top 10px
      border-radius 3px
      overflow auto
      .frienditem
        list-style none
        border-top 1px solid #dadada
        &:first-child, &.noborder
          border-top none
        .list_title
          box-sizing border-box
          width 100%
          font-size 16px
          padding 15px 0 3px 20px
          color #999
        .friend-info
          display flex
          position relative
          padding 16px 10px
          transition background-color 0.1s
          &:hover
            background-color rgb(220, 220, 220)
          &.active
            background-color #c4c4c4
          .avatar
            border-radius 50%
            margin-right 12px
          .remark
            font-size 20px
            line-height 48px
            color #060606
            flex 3
            max-width 120px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
          .check
            position absolute
            right 15px
            top 22px
            padding 0px
            font-size 20px
            color #52d68a
            cursor pointer
            flex 1
  .right
    padding-left 10px
    margin-left 10px
    border-left 1px solid #888
    width 50%
    height 100%
    ul
      height calc(100% - 50px - 20%)
      max-height 490px
      overflow auto
      margin-bottom 5px
    p
      font-size 20px
      color #000
      text-align center
      margin-top 20px
    .friend-info
      display flex
      position relative
      padding 16px 30px
      transition background-color 0.1s
      .avatar
        border-radius 50%
        margin-right 12px
      .remark
        font-size 20px
        line-height 48px
        max-width 100px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
      .check
        position absolute
        right 30px
        top 25px
        padding 0px
        font-size 20px
        color #b1b1b1
.newfriend
  height 86px
  line-height 85px
  box-sizing border-box
  border-bottom 1px solid #e7e7e7
  .nickname
    font-size 20px
.detInfo
  padding 6% 23%
  display flex
  flex-wrap wrap
  justify-content left;
  height 60%
  border-bottom 1px solid #d5d9de
  overflow auto
padding 40px 0
  border-top 1px solid #e7e7e7
  border-bottom 1px solid #e7e7e7
.remark, .area, .wxid
  font-size 14px
  margin-top 20px
  span
    font-size 14px
    color rgba(153, 153, 153, 0.8)
    margin-right 40px
.remark
  margin-top 0
.member
  height 30%
  width 66px
  margin:0 3.2%
  img
    border-radius 50%
    width 66px
    height 66px
    box-shadow 0px 3px 6px 0 #818181
  div
    text-align center
    font-size 16px
    color #000
    cursor pointer
    
.btn
  display flex
  justify-content center
  align-items center
.send
  
  text-align center
  width 108px
  height 36px
  left 200px
  line-height 36px
  font-size 18px
  color #fff
  background-color #52d68a
  cursor pointer
  border-radius 10px
  &:hover
    background rgb(18, 150, 17)
.del
  margin-left 20px
  text-align center
  width 108px
  height 36px
  left 400px
  line-height 36px
  font-size 18px
  color #fff
  background-color #f55f5f
  cursor pointer
  border-radius 10px
  &:hover
    background #d50a00
</style>

<style scoped lang="less">
.newfriend {
  text-align: center;
}
.Info-wrapper {
  background: #fff;
  height: 100%;
}
.nickname {
  // box-shadow: 0 3px 3px 0 #16171612;
  border-bottom: 1px solid #d5d9de;
}
.search-input {
  text-align: center;
  height: 20%;
}
.search-input input {
  width: 90%;
  height: 34px;
  background: #dfdfdf;
  border: none;
  border-radius: 10px;
  padding-left: 20px;
  color: #818181;
  font-size: 18px;
}
.create {
  display: inline-block;
  margin-left: 20%;
}
.creates {
  display: inline-block;
}
.creates .el-button {
  width: 100%;
  background-color: #f2f7f7;
  color: #818181;
  font-size: 18px;
  margin-top: 20px;
  border-radius: 10px;
  border: 1px solid #818181;
  margin-left: 10%;
}
.create .el-button {
  width: 100%;
  background-color: #52d68a;
  color: #fff;
  font-size: 18px;
  margin-top: 20px;
  border-radius: 10px;
}
.friendInfo .nickname {
  height: 86px;
  text-align: left;
  font-size: 20px;
  color: #303841;
  padding: 20px;
}
.wename {
  width: 66px;
  text-align: center;
  margin-top: 10px;
}
.adddel {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  line-height: 60px;
  text-align: center;
  background-color: #f2f7f7;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
}
.create button:nth-child(1) {
  display: inline-block;
  /* width: 108px; */
  color: #fff;
  background: #f55f5f;
  border-radius: 10px;
  font-size: 18px;
  margin-right: 10px;
  cursor: pointer;
  border: none;
  padding: 5px 15px;
  box-sizing: border-box
}
.creates button:nth-child(1) {
  display: inline-block;
  /* width: 108px; */
  color: #818181;
  background: #fff;
  border-radius: 10px;
  font-size: 18px;
  margin-right: 10px;
  cursor: pointer;
  border: 1px solid #818181;
  padding: 5px 15px;
  box-sizing: border-box
}
.dialogs {
  position: absolute;
  top: 40%;
  left: 48%;
  width: 406px;
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
}
.dialogs .header {
  display: flex;
  justify-content: space-between;
}
.contents {
  display: flex;
  justify-content: space-between;
}
.contents .nicknames {
  display: inline-block;
  padding: 20px 0 0 40px;
  box-sizing: border-box;
  margin-right: 10px;
  font-size: 20px;
  vertical-align: bottom;
}
.portrait {
  margin-right: 30px;
}
.portrait img {
  border-radius: 50%;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
}
.underline {
  width: 90%;
  margin: 20px auto;
  height: 2px;
  background: #dfdfdf;
  margin-bottom: 20px;
}
.addfriends {
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
  cursor: pointer;
}
.addadd {
  padding-left: 20px;
  box-sizing: border-box;
  font-size: 20px;
  color: #818181;
}
.remarks {
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  color: #060606;
}
.verification {
  font-size: 14px;
  color: rgba(129, 129, 129, 0.65);
}
.verifications {
  display: flex;
  margin-top: 20px;
  text-align: right;
}
.verifications div:nth-child(1) {
  font-size: 14px;
  width: 70px;
  color: #fff;
  background: #52d68a;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 10px;
  margin-right: 10px;
  margin-left: 200px;
  cursor: pointer;
}
.verifications div:nth-child(2) {
  font-size: 14px;
  width: 70px;
  color: #818181;
  background: #fff;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #818181;
  box-sizing: border-box;
  cursor: pointer;
}
.content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 380px;
    .left {
      border-right: 1px solid #929393;
      width: 50%;
      height: 100%;
      .friend-list {
        width: 100%;
        height: 100%;
        padding: 46px 0 20px 0;
        overflow-y: auto;
        .frienditem {
          width: 100%;
          height: 100%;
          cursor: pointer;
          .friend-info {
            width: 100%;
            height: 66px;
            line-height: 66px;

            position: relative;
            .avatar {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              display: inline-block;
            }
            .remark {
              display: inline-block;
              margin-left: 10px;
              font-size: 16px;
              color: #060606;
            }
            .check {
              display: inline-block;
              position: absolute;
              top: 0px;
              right: 12px;

              i {
                font-size: 20px;
              }
            }
          }
        }
      }
    }
    .right {
      width: 50%;
      padding-top: 14px;
      position: relative;
      .title {
        color: #000;
        text-align: center;
        font-size: 16px;
      }
      ul {
        padding: 10px 0 10px 20px;
        height: 314px;
        overflow-y: auto;

        .friend-info {
          width: 100%;
          height: 66px;
          line-height: 66px;

          position: relative;
          .avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: inline-block;
          }
          .remark {
            display: inline-block;
            margin-left: 10px;
            font-size: 16px;
            color: #060606;
          }
          .check {
            display: inline-block;
            position: absolute;
            top: 0px;
            right: 12px;

            i {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
</style>
<style>
.remarks .el-input .el-input__inner {
  /* min-height: 18px !important; */
  border: 1px solid #dfdfdf !important;
  color: #606266;
  border-radius: 8px;
  width: 90%;
  max-height: 114px;
  min-height: 60px;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/

  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 6px;
  margin-right: 2px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #b3b3b3 !important;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  /* -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  /* border-radius: 0; */
  /* background: rgba(0, 0, 0, 0.1); */
}
</style>
<style scoped>
.select-friend .left .friend-list::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/*正常情况下滑块的样式*/

.select-friend .left .friend-list::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在该类指向的控件上时滑块的样式*/

.select-friend .left .friend-list:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在滑块上时滑块的样式*/

.select-friend .left .friend-list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*正常时候的主干部分*/

/* .select-friend .left .friend-list::-webkit-scrollbar-track {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: white;
} */
/*鼠标悬浮在滚动条上的主干部分*/

.select-friend .left .friend-list::-webkit-scrollbar-track:hover {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.01);
}

.select-friend .right ul::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/*正常情况下滑块的样式*/

.select-friend .right ul::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在该类指向的控件上时滑块的样式*/

.select-friend .right ul:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在滑块上时滑块的样式*/

.select-friend .right ul::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*正常时候的主干部分*/

/* .select-friend .left .friend-list::-webkit-scrollbar-track {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: white;
} */
/*鼠标悬浮在滚动条上的主干部分*/

.select-friend .right ul::-webkit-scrollbar-track:hover {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.01);
}

</style>