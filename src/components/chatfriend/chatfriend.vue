<template>
  <div class="chat-friend">
    <el-row class="friend"
            v-if="selectedChat.id.indexOf('friend')==0">
      <el-col class="friend-top">
        <img class="img"
             :src="selectedChat.user.img"
             alt="">
        <p class="name">{{selectedChat.user.name}}</p>

        <p class="account">账号：<span>{{selectedChat.user.email}}</span></p>
        <p class="account"
           v-if="selectedChat.user.address"
           style="margin-top:18px;padding:0 20px;"><img style="width:18px;height:22px;"
               src="../../assets/img/position1.png"
               alt=""><span style="margin-left:12px;">{{selectedChat.user.address}}</span></p>
      </el-col>
      <el-col class="friend-bottom">
        <p @click="clearMessage">{{$t('maininfo.清空聊天记录')}}</p>
      </el-col>
    </el-row>
    <el-row class="group"
            v-if="selectedChat.id.indexOf('group')==0">
      <el-col>
        <div style="height:75%">

          <div style="height:50%;padding-top:10%">

            <img class=""
                 :src="selectedChat.user.img"
                 alt=""><i @click="toggleShow"
               class="el-icon-edit-outline"></i>
            <p class="group-name">
              {{$t('friend.群聊名称')}} <i @click="editname"
                 v-if="editShow"
                 style="cursor:pointer"
                 class="el-icon-edit-outline"></i></p>
            <el-input size="mini"
                      maxlength="20"
                      @blur="confirmName"
                      v-if="edit_group_name == true"
                      v-model="old_name">
            </el-input><span class="gname"
                  v-else>{{selectedChat.user.name}}</span>
          </div>
          <div class="friendInfo"
               style="height:calc(51% - 20px)">
            <div style="height:1px; width:88%;background:#E4E6E6;margin: 0px auto 0;"></div>
            <div class="detInfo">
              <div class="member"
                   v-for="item in info">
                <img :src="item.img"
                     width="66"
                     height="66"
                     style="cursor: pointer"
                     @click="information(item)"
                     :alt="item.username">
                <p class="wename">{{item.username}}</p>
              </div>
              <div class="member"
                   @click="delmem"
                   v-if="selfemail == selectedChat.master">
                <div class="adddel">-</div>
                <p class="wename">{{$t('friend.删除')}}</p>
              </div>
              <div class="member"
                   @click="addmem">
                <div class="adddel">+</div>
                <p class="wename">{{$t('friend.添加')}}</p>
              </div>
            </div>
          </div>
          <div style="height:1px; width:88%;background:#E4E6E6;margin: 15px auto 0;"></div>
        </div>
        <div class="group-bottom"
             style="height:25%">
          <p @click="clearMessage">{{$t('maininfo.清空聊天记录')}}</p>
        </div>
      </el-col>
    </el-row>
    <!-- 添加组成员 -->
    <el-dialog :title="selectedChat.user.name"
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

          <div class="create">
            <el-button @click="memberadd()"
                       style="color: #fff;background:#52d68a"
                       size="mini">
              {{$t('friend.添加')}}
            </el-button>
            <el-button @click="addcancel()"
                       style="background:#FFFFFF;border:1px solid #8F9090;color:#606060"
                       size="mini">
              {{$t('friend.取消')}}
            </el-button>
          </div>

        </div>
      </div>
    </el-dialog>
    <!-- 删除组成员 -->
    <el-dialog :title="selectedChat.user.name"
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

          <div class="create">
            <el-button @click="memberdel()"
                       style="color: #fff;background:#52d68a"
                       size="mini">
              {{$t('friend.删除')}}
            </el-button>
            <el-button @click="delcancel()"
                       style="background:#FFFFFF;border:1px solid #8F9090;color:#606060"
                       size="mini">
              {{$t('friend.取消')}}
            </el-button>
          </div>

        </div>
      </div>
    </el-dialog>
    <!-- 点击群成员 -->
    <div class="dialogs"
         v-if="dialoginformation == true"
         v-show="addArr">
      <div class="header">
        <span></span>
        <span class="close"
              @click="dialoginformation=false"><i style="font-size: 16px; cursor: pointer;"
             class="el-dialog__close el-icon el-icon-close"></i>
        </span>
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
               @click="sendmess"
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
              @click="dialoginformations=false"><i style="font-size: 16px; cursor: pointer;"
             class="el-dialog__close el-icon el-icon-close"></i></span>
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
    <my-upload field="img"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="show"
               :width="300"
               :height="300"
               :url="uploadUrl"
               :params="params"
               img-format="png"></my-upload>
  </div>
</template>
<script>
import qs from 'qs'
import myUpload from 'vue-image-crop-upload'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  components: {
    'my-upload': myUpload
  },
  data () {
    return {
      uploadUrl: '',
      editShow: true,
      disabled: true,
      groupname: '',
      edit_group_name: false,
      old_name: '',
      params: {
        group_id: '',
        token: sessionStorage.token,
        name: 'group_avatar'
      },
      show: false,
      old_avatar: '',
      Info: {},
      info: {},
      selfemail: sessionStorage.email,
      remark: this.$t('friend.我是') + sessionStorage.username,
      dialoginformations: false,
      informationlist: [],
      dialoginformation: false,
      searchedFriendlistCopy: [],
      searchstatus: false,
      id: '',
      listInfo: {},
      accountid: '',
      newArr: [],
      exit: '',
      action: '',
      dialog: false,
      dialog2: false,
      addDialogVisible: false,
      delDialogVisible: false,

      delArr: [],
      addArr: [],
      test: '123',
      rightArr: [],
      rightArr2: [],
      selFriendId: '',
    }
  },
  created () {
    this.groupname = this.selectedChat.user.name
    this.loadgroupmember()
  },
  computed: {
    ...mapGetters([
      'selectedChat',
      'messages',
      'selectedFriend',
      'selectedGroup',
      'searchedFriendlist2',
    ]),
    ...mapState([
      'user',
      'selectId',
      'selectGroupId',
      'searchText2',
      'activeGroup',
    ])
  },
  methods: {
    ...mapActions([
      'selectSession',
    ]),
    editname () {
      this.old_name = this.selectedChat.user.name
      this.edit_group_name = true
      // this.disabled = false
      this.editShow = false
    },
    confirmName () {
      if (this.old_name.length < 2) {
        this.$message({
          message: this.$t('friend.群组名不能小于两位'),
          type: 'warning'
        })
        this.old_name = this.selectedChat.user.name
        return false
        // this.disabled = true
        // this.editShow = true
      } else {
        this.$axios.post('/updateGroupInfo?lang=' + sessionStorage.lang, qs.stringify({
          token: sessionStorage.token,
          group_id: this.selectedChat.id,
          group_name: this.old_name
        })).then(res => {
          if (res.data.status == 1) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })

          } else if (res.data.status == 0) {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
            this.old_name = this.selectedChat.user.name
          } else if (res.data.status == 9) {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
            this.old_name = this.selectedChat.user.name
            this.$router.push('/login')
            sessionStorage.removeItem('token')
          }
        })
        // this.selectedChat.user.name = this.groupname
      }
      // this.disabled = true
      this.edit_group_name = false
      this.editShow = true
    },
    toggleShow () {
      this.old_avatar = this.selectedChat.user.img
      this.params.group_id = this.selectedChat.id
      this.show = !this.show;
      var domain = (process.env.API_ROOT != '') ? process.env.API_ROOT : (window.location.host + '/')
      var domainname = window.location.protocol
      this.uploadUrl = domainname + '//' + domain + '/OO/index.php/uploadGroupImage?lang=' + sessionStorage.lang
    },

    cropSuccess (imgDataUrl, field) {

      console.log('-------- crop success --------');
    },

    cropUploadSuccess (jsonData, field) {
      if (jsonData.status == 1) {
        this.selectedChat.user.img = jsonData.img
      } else {
        this.selectedChat.user.img = this.old_avatar

      }
    },

    cropUploadFail (status, field) {
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    },
    loadgroupmember () {
      this.$axios.post('queryAllGroupUser?lang=' + sessionStorage.lang, qs.stringify({ 'group_id': this.selectedChat.id, 'token': sessionStorage.token }))
        .then(res => {
          if (res.data.status == 1) {
            this.info = res.data.data
          } else if (res.data.status == 0) {

          }
        })
    },
    //群聊成员添加好友
    newadd () {
      this.dialoginformation = false
      this.dialoginformations = true
    },
    // 添加好友接口
    application () {
      this.$axios.post('addFriend?lang=' + sessionStorage.lang, qs.stringify({ 'id': this.informationlist.id, 'remark': this.remark, 'token': sessionStorage.token }))
        .then(res => {
          if (res.data.status == 1) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.dialog = false
            this.dialoginformations = false
          } else if (res.data.status == 0) {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
            this.dialog = false
            this.dialoginformations = false
          }
        })
    },

    applications () {
      this.dialoginformations = false
    },
    //群聊点击头像添加好友
    information (item) {
      console.log(item)
      this.selFriendId = item.id
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
      console.log(data, 'qwe')
      // this.$delete(this,'searchedFriendlist2')
      // this.$set(this,'searchedFriendlist2',data)
      // console.log(this.searchedFriendlist2,'qwe')
      this.searchedFriendlistCopy = data
      // for (var item in data) {
      //   debugger
      //   if (that.searchedFriendlist2[item].id == id) {
      //     console.log(that.searchedFriendlist2[item].check)
      //     console.log(id)
      //     console.log(that.searchedFriendlist2[item].id)s
      //     if (that.searchedFriendlist2[item].check == true) {
      //       that.searchedFriendlist2[item].check = false
      //       that.del(id)
      //     } else{
      //       that.searchedFriendlist2[item].check = true
      //       that.add(that.searchedFriendlist2[item])
      //     }
      //   }
      // }
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
    // 删除群成员提交
    memberdel () {
      var Arr = []
      for (var item in this.rightArr) {
        Arr.push(this.rightArr[item].id)
      }
      this.$axios.post('deleteGroupUser?lang=' + sessionStorage.lang, qs.stringify({
        'group_member': Arr,
        'group_id': this.selectedChat.id,
        'token': sessionStorage.token
      }))
        .then(res => {
          if (res.data.status == 1) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.loadgroupmember()
            this.delDialogVisible = false
          } else if (res.data.status == 0) {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
    },
    addcancel () {
      this.addDialogVisible = false

    },
    delcancel () {
      this.delDialogVisible = false
    },
    // 添加群成员提交
    memberadd () {
      var Arr = []
      for (var item in this.rightArr2) {
        Arr.push(this.rightArr2[item].id)
      }
      this.$axios.post('/putUserGroup?lang=' + sessionStorage.lang, qs.stringify({
        'group_member': Arr,
        'group_id': this.selectedChat.id,
        'token': sessionStorage.token      }))
        .then(res => {
          if (res.data.status == 1) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.loadgroupmember()
            this.addDialogVisible = false

          } else if (res.data.status == 0) {

            this.$message({
              type: 'error',
              message: res.data.msg
            })
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


    delmem () {
      this.delArr = []
      this.rightArr = []
      this.delDialogVisible = true
      for (var item in this.info) {
        this.info[item].check = false
        if (this.info[item].owner != 1) {
          this.delArr.push(this.info[item])
        }
      }
      console.log(this.delArr)
    },
    addmem () {
      this.addDialogVisible = true
      this.$axios.post('queryNoGroupUser?lang=' + sessionStorage.lang, qs.stringify({
        'group_id': this.selectedChat.id,
        'token': sessionStorage.token      }))
        .then(res => {
          if (res.data.status == 1) {
            this.Info = res.data.data
            this.addset(res.data.data)
            console.log(res.data.data)
          } else {
            this.addDialogVisible = false
            this.$message({
              type: 'warning',
              message: res.data.msg
            })

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
    // 清空聊天记录
    clearMessage () {
      console.log(this.selectedChat.id)
      this.$store.dispatch('clearMessage', this.selectedChat.id)
    },
    // 私聊群好友
    sendmess () {
      // console.log(this.selFriendId)
      this.$store.dispatch('sendPrivatemess', this.selFriendId)
      this.dialoginformation = false
      // this.$store.dispatch('search', '')
    }
  },
  watch: {
    selectedChat (curVal, oldVal) {
      // 获取群归属
      // if (this.selectedGroup.attribution == sessionStorage.email) {
      //   this.exit = this.$t('friend.删除群组')
      //   this.action = 'del'
      // } else {
      //   this.exit = this.$t('friend.退出群组')
      //   this.action = 'exit'
      // }
      this.loadgroupmember()
    },
    deep: true
  }


};
</script>

<style>
.chat-friend .el-dialog .el-dialog__body {
  padding: 0px 20px;
}
.chat-friend .el-dialog .el-dialog__body .iconfont.icon-duigoutianchong- {
  color: #52d68a;
}
.chat-friend .el-dialog .el-dialog__header {
  /* background-color: #dfdfdf; */
  text-align: left;
  padding: 0 0 0 20px;
  box-shadow: 0 3px 3px 0px rgba(22, 23, 22, 0.071);
  /* font-size: 26px; */
  color: #303841;
}
.chat-friend .el-dialog .el-dialog__title {
  height: 48px;
  line-height: 48px;
  color: #060606;
}

.chat-friend .el-dialog .el-dialog__headerbtn {
  top: 16px;
}
.group .el-input {
  width: 90%;
  margin-top: 10px;
  border-bottom: none;
  height: 36px;
  line-height: 33px;
  border-radius: 10px;
}

.group .el-input .el-input__inner {
  color: #818181;
  text-align: center;
  background-color: #f1f7f7;
  font-size: 16px;
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
.remarks .el-input .el-input__inner {
  /* min-height: 18px !important; */
  border: 1px solid #dfdfdf !important;
  color: #606266;
  border-radius: 8px;
  width: 90%;
  max-height: 114px;
  min-height: 60px;
}
</style>

<style scoped lang="less">
.chat-friend {
  width: 100% !important;
  .friend {
    width: 100%;
    height: 75%;
    text-align: center;

    .friend-top {
      width: 100%;
      height: 100%;
      padding-top: 40px;
      text-align: center;
      overflow: auto;
      box-sizing: border-box;
      img.img {
        width: 60%;
        border-radius: 50%;
        box-shadow: 0px 3px 6px 0 #818181;
      }
      .name {
        margin-top: 20px;
        color: #303841;
        font-size: 26px;
      }
      .account {
        font-size: 16px;
        color: #818181;
        height: 30px;
        line-height: 30px;
      }
    }
    .friend-bottom {
      height: 25%;
      padding-top: 64px;
      width: 88%;
      margin-left: 6%;
      border-top: 1px solid #e4e6e6;
      p {
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        color: #f55f5f;
        font-size: 18px;
      }
    }
  }
  .group {
    height: 100%;
    .el-col {
      width: 100%;
      height: 100%;
      // padding-top: 40px;
      overflow: hidden;
      text-align: center;
      img {
        width: 55%;
        border-radius: 50%;
        box-shadow: 0px 3px 6px 0 #818181;
      }
      i {
        cursor: pointer;
        vertical-align: bottom;
        font-size: 18px;
      }
      .group-name {
        font-size: 18px;
        margin-top: 10%;
        color: #060606;
      }
      .gname {
        display: inline-block;
        color: #818181;
        text-align: center;
        font-size: 16px;
        height: 38px;
        line-height: 38px;
      }
      .friendInfo {
        .detInfo {
          width: 100%;
          // max-height: 100px;
          max-height: 100%;
          overflow-y: auto;
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          padding: 0 0 0 30px;

          .member {
            width: 54px;
            height: 74px;
            justify-content: space-around;
            margin-top: 5%;
            margin-right: 5%;
            img {
              width: 54px;
              height: 54px;
              box-shadow: 0px 3px 6px 0 #818181;
            }
            .wename {
              font-size: 14px;
              height: 20px;
              line-height: 20px;
              color: #060606;
              width: 54px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .adddel {
              width: 54px;
              height: 54px;
              border: 1px solid #e8e8e8;
              border-radius: 50%;
              text-align: center;
              background-color: #f2f7f7;
              font-size: 36px;
              color: #c8c8c8;
              cursor: pointer;
              // box-shadow: 0px 3px 6px 0 #818181;
            }
          }
        }
      }
      .group-bottom {
        width: 100%;
        p {
          padding-top: 64px;
          cursor: pointer;
          color: #f55f5f;
          font-size: 18px;
        }
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 460px;
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
        height: 374px;
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
      .create {
        position: absolute;
        bottom: 20px;
        right: 10px;
        .el-button {
          border-radius: 6px;
        }
      }
    }
  }
  .dialogs {
    position: absolute;
    top: 40%;
    left: 48%;
    width: 406px;
    background: #fff;
    border-radius: 10px;
    padding: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    .header {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      .addadd {
        padding-left: 20px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 20px;
        color: #818181;
      }
    }
    .contents {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      .nicknames {
        display: inline-block;
        padding: 20px 0 0 40px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-right: 10px;
        font-size: 20px;
        vertical-align: bottom;
      }
      img {
        border: none;
        vertical-align: middle;
      }
      .portrait {
        margin-right: 30px;
        img {
          border-radius: 50%;
          -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
          box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
        }
      }
    }
    .underline {
      width: 90%;
      margin: 20px auto;
      height: 2px;
      background: #dfdfdf;
      margin-bottom: 20px;
    }
    .addfriends {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      padding-right: 30px;
      cursor: pointer;
    }
    .remarks {
      text-align: center;
      margin-top: 10px;
      font-size: 20px;
      color: #060606;
      .verification {
        font-size: 14px;
        color: rgba(129, 129, 129, 0.65);
      }
    }
    .verifications {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin-top: 20px;
      text-align: right;
      div:nth-child(1) {
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
      div:nth-child(2) {
        font-size: 14px;
        width: 70px;
        color: #818181;
        background: #fff;
        height: 26px;
        line-height: 26px;
        text-align: center;
        border-radius: 10px;
        border: 1px solid #818181;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        cursor: pointer;
      }
    }
  }
}
</style>