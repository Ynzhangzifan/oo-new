<template>
  <div class="sidelist">
    <el-row>
      <!-- 用户头像 -->
      <el-col class="user-img">
        <div style="width:80%;height:50px;display:flex;position:relative;">
          <div style="position: absolute;left:25px;top:11px" class="pic">
            <img v-if="this.$store.state.zt == 1" src="../../assets/img/zaixian.png" alt="">
            <img v-if="this.$store.state.zt == 2" src="../../assets/img/likai.png" alt="">
            <img v-if="this.$store.state.zt == 3" src="../../assets/img/wurao.png" alt="">
            <img v-if="this.$store.state.zt == 4" src="../../assets/img/yinshen.png" alt="">
          </div>
          
          <img style="width:36px;height:36px;border-radius: 50%;margin-top:7px;" :src="this.$store.state.oo_avatar"
             alt="">
          <div style="display: inline-block;height:40px;line-height:35px;margin-left:5px">
            <span style="display: block;height:20px;font-size:16px;color:#000">{{$store.state.oo_username}}</span>
            <span style="display: block;height:20px;font-size:12px;color:#9aa2a6" v-if="this.$store.state.zt == 1">在线</span>
            <span style="display:block;height:20px;font-size:12px;color:#9aa2a6" v-if="this.$store.state.zt == 2">离开</span>
            <span style="display:block;height:20px;font-size:12px;color:#9aa2a6" v-if="this.$store.state.zt == 3">请勿打扰</span>
            <span style="display:block;height:20px;font-size:12px;color:#9aa2a6" v-if="this.$store.state.zt == 4">隐身</span>
          </div>
        </div>
        <img @click="dialog" style="width:24px;height:24px;margin-top:13px;cursor: pointer;" src="../../assets/img/setting.png"
             alt="">
      </el-col>
      <el-col classs="search" style="text-align:center">
        <el-input :placeholder="$t('login.搜索')"
                  prefix-icon="el-icon-search"
                  v-model="search"
                  @keyup.native="change">
        </el-input>
      </el-col>
      <el-col class="side-content">
        <el-menu :default-active="activeHight"
                 class="el-menu-vertical-demo"
                 router
                 @select="clearSearch"
                 background-color="#f9f9f9"
                 text-color="#808082"
                 active-text-color="#3068cc">
          <el-badge v-if="conversation == 1" is-dot class="item">
               <el-menu-item class="message item"
                        index="/message">{{$t('friend.消息')}}
              </el-menu-item>    
          </el-badge>
          <el-menu-item v-else class="message item"
                        index="/message">{{$t('friend.消息')}}
          </el-menu-item>
          <el-badge v-if="userids>0" is-dot class="item">
               <el-menu-item class="friend" @click="contacts"
                        index="/friend">{{$t('friend.联系人')}}
              </el-menu-item>    
          </el-badge>
          <el-menu-item v-else class="friend item" @click="contacts"
                        index="/friend">{{$t('friend.联系人')}}
          </el-menu-item>
          <el-menu-item class="group item" @click="groupslist"
                        index="/group">{{$t('friend.群组')}}
          </el-menu-item>
          <el-menu-item class="set item" @click="notices"
                        index="/setting">{{$t('friend.通知')}}
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col style="width:100%;height:100%">
        <indexs></indexs>
      </el-col>
      
      <el-col style="padding:30% 10% 0 10%;text-align:center">
        <img src="../../assets/img/tishi.png" alt="">
        <p style="font-size:20px;color:#000;font-weight:bold;margin:20px 0 20px 0;">开始在OO上聊天</p>
        <p style="font-size:14px;color:#808082">在联系人列表，选择添加联系人，等待对方同意后，即可开始与好友聊天！</p>
      </el-col>
      <el-col v-if="active==1">
        <chatfriend></chatfriend>
      </el-col>
    </el-row> -->
    <el-dialog
      :title="$t('maininfo.设置')"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div class="message clearfix">
        <div class="search-list fl">
          <setlist @active="getActive"></setlist>
        </div>
        <div class="set-content fr">
          <selfset v-if="active==1"></selfset>
          <safeset v-if="active==2"></safeset>
          <soundset v-if="active==3"></soundset>
          <privacySet v-if="active==4"></privacySet>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState([
      'active',
      'activeGroup',
      'activeMessage',
      'conversation',
      'userids',
      'zt',
      'oo_avatar',
      'numlists',
      'numlist',
      'contactslist',
      'contactslists',
      'groupsdata',
    ]),
    sortArr: function () {
      return this.sortKey(this.searchedChatlist, 'index')
    }
  },
  data () {
    // this.img = setInterval(() => {
    //   return sessionStorage.image
    // }, 1000)
    return {
      // oo_avatar: sessionStorage.oo_avatar,
      activeHight: this.$route.path,
      statusNum:sessionStorage.oo_statusNum,
      oo_username:sessionStorage.oo_username,
      search:'',
      active: '1',
      dialogVisible:false,
    }
  },
  components: {
    setlist: () => import('../setlist/setlist'),
    selfset: () => import('../setcontent/selfset'),
    safeset: () => import('../setcontent/safeset'),
    soundset: () => import('../setcontent/soundset'),
    privacySet: () => import('../setcontent/privacySet'),
    
  },
  methods: {
    //点击设置
    dialog(){
      this.dialogVisible = true
    },
    //关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    getActive (active) {
      this.active = active
    },
    clearSearch (active) {
      this.$store.dispatch('search', '')
      // console.log(active)
      if(active == '/message'){
        this.$store.state.news = 1
      }else{
        this.$store.state.news = 0
      }
      if(active == '/friend'){
        this.$store.state.contacts = 1
      }else{
        this.$store.state.contacts = 0
      }
      if(active == '/group'){
        this.$store.state.groupslist = 1
      }else {
        this.$store.state.groupslist = 0
      }
      if(active == '/setting'){
        this.$store.state.notices = 1
      }else{
        this.$store.state.notices = 0
      }
      this.$store.state.active = 1
      this.$store.state.activeGroup = 1
      this.$store.state.activeMessage = 1


    },
    //点击通知
    notices(){
      let that = this
      var msg_obj = { "action_type": "admin_query_application", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,};
      var msg = JSON.stringify(msg_obj);
      that.global.ws.send(msg);
      that.global.ws.onmessage = function(res) {
        var data = JSON.parse(res.data)
        console.log(data.status)
        if(data.status == 9){
            that.$router.push('/login')
        }else if(data.status == 0){
            that.$message({
                message: data.msg,
                type: 'error'
            });
            that.intbefo()
        }else{
            console.log("收到服务器内容", data.data);
            that.$store.state.num = data.data.num
            that.$store.state.numlist = data.data.list
            for(let i=0;i<data.data.list.length;i++){
              if(data.data.list[i].record_id == that.$store.state.numlists.record_id){
                that.$store.state.numlists = data.data.list[i]
                // console.log(data.data.list[i])
                // console.log(that.$store.state.numlists)
              }
            }
        }
      };
    },
    //点击联系人
    contacts(){
      let that = this
      var msg_obj = { "action_type": "admin_user_list", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,};
      var msg = JSON.stringify(msg_obj);
      that.global.ws.send(msg);
      that.global.ws.onmessage = function(res) {
        var data = JSON.parse(res.data)
        console.log(data.status)
        if(data.status == 9){
            that.$router.push('/login')
        }else if(data.status == 0){
            that.$message({
                message: data.msg,
                type: 'error'
            });
            that.intbefo()
        }else{
            console.log("收到服务器内容", data);
            switch(data.action_type){
                  case 'home_user_list':
                  that.$store.state.contactslist = data.data
                  that.$store.state.contactslists = data.data[0]
                  for(let i=0;i<data.data.length;i++){
                      if(data.data[i].id == that.$store.state.contactslists.id){
                          that.$store.state.contactslists = data.data[i]
                          console.log(data.data[i])
                          console.log(that.$store.state.contactslists)
                      }
                  }
                  break
                  case 'home_query_application':
              }
        }
      };
    },
    //点击群组
    groupslist(){
      let that = this
      var msg_obj = { "action_type": "admin_group_list", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,};
      var msg = JSON.stringify(msg_obj);
      that.global.ws.send(msg);
      that.global.ws.onmessage = function(res) {
        var data = JSON.parse(res.data)
        console.log(data.status)
        if(data.status == 9){
            that.$router.push('/login')
        }else if(data.status == 0){
            that.$message({
                message: data.msg,
                type: 'error'
            });
            that.intbefo()
        }else{
            console.log("收到服务器内容", data);
            switch(data.action_type){
                  case 'home_group_list':
                  that.$store.state.groupsdata = data.data
                  // that.$store.state.contactslists = data.data[0]
                  // for(let i=0;i<data.data.length;i++){
                  //     if(data.data[i].id == that.$store.state.contactslists.id){
                  //         that.$store.state.contactslists = data.data[i]
                  //         console.log(data.data[i])
                  //         console.log(that.$store.state.contactslists)
                  //     }
                  // }
                  break
                  case 'home_query_application':
              }
        }
      };
    },
    // refresh () {
    //   this.$store.state.oo_avatar = this.$store.state.oo_avatar
    //   this.oo_username = sessionStorage.oo_username
    // },
    change(){

    }
  },
  mounted () {
    if(this.global.inpage() == 0){
      this.$router.push('/login')
    }
    console.log(this.$store.state.oo_avatar)
    this.$store.state.oo_username = sessionStorage.oo_username
    this.$store.state.oo_avatar = sessionStorage.oo_avatar
    console.log(this.activeHight)
  },

};
</script>
<style>
  .sidelist .el-menu-vertical-demo{
    display:flex;
    border-bottom:1px solid #d5d9de;
    width: 100%;
  }
  .sidelist .item{
    flex:1
  }
.sidelist .el-input__inner {
  height: 36px;
  line-height: 36px;
  border-radius:2px;
  font-size: 15px;
  color: #818181;
  background-color: #fff;
}
.sidelist .el-input__prefix {
  top: -2px !important;
  left: 12px;
}
.sidelist .el-input--prefix .el-input__inner {
  padding-left: 40px;
}
.sidelist .el-input {
  border-bottom: 0!important;
  width: 95% !important;
}
.sidelist .user-img{
    height:50px;
    line-height:50px;
    display:flex;
    justify-content: space-between;
    padding:0 20px;
}
.sidelist .el-dialog__body{
  padding: 0;
  background: #f0f4f8;
}
.sidelist .el-dialog{
  min-width: 506px!important;
  margin-top: 0!important;
  position: absolute;
  top: calc(50% - 285px);
  left:calc(50% - 20%)
}
</style>
<style scoped lang="less">
  .message{
    width: 100%;
    height: 100%;
  }
  .set-content {
    width: calc(100% - 35%);
    min-width: 251px;
    height: 100%;
    background-color: #fff;
  }
  .search-list {
    width: 35%;
    min-width: 135px;
    height: 100%;
    background-color: #f0f4f8;
  }
.pic img{
  width: 14px
}
.side-content{
  border-bottom:1px solid #d5d9de;
}
.sidelist {
  width: 100%;
  // height: 100%;
  background-color: #f9f9f9;
  .user-img {
    // padding: 72px 0;
    // text-align: center;
    height:50px;
    line-height:50px;
    display:flex;
    justify-content: space-between;
    img {
      // width: 36px;
      // height: 36px;
      // border-radius: 50%;
      // margin-top: 7px
    }
  }
  
  .side-content {
    .el-menu {
      // border-right: solid 1px #303841;
      border: none;
      // background-color: #303841 !important;
      .el-menu-item {
        // background-color: #303841 !important;
        height: 68px;
        line-height: 68px;
        padding-left:0!important;
        padding-right:0!important;
      }
      .el-menu-item.is-active {
        // background-color: #404953 !important;

        // box-shadow: #404953 0px 2px 3px -1px;
      }
      .message {
        background: url("../../assets/img/message.png") center no-repeat;
        // background-size: 30px;
      }
      .friend {
        background: url("../../assets/img/tongxun.png") center no-repeat;
        // background-size: 30px;
      }
      .group {
        background: url("../../assets/img/qunliao.png") center no-repeat;
        // background-size: 30px;
      }
      .set {
        background: url("../../assets/img/set.png") center no-repeat;
        // background-size: 30px;
      }
      .item{
        padding-left: 0;
        padding-top: 20px;
        text-align: center;
        color: #808082
      }
    }
  }
}
</style>
<style>
  .el-badge__content.is-fixed.is-dot{
          right: 20px!important;
          top: 20px!important;
        }
  .el-badge__content.is-dot {
    height: 10px;
    width: 10px;
    padding: 0;
    right: 0;
    border-radius: 50%;
}
.el-badge__content.is-fixed {
    position: absolute;
    top: 0;
    right: 10px;
    -webkit-transform: translateY(-50%) translateX(100%);
    transform: translateY(-50%) translateX(100%);
}
.el-badge__content {
    background-color: #F56C6C;
    border-radius: 10px;
    color: #FFF;
    display: inline-block;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    padding: 0 6px;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #FFF;
}
</style>