<template>
  <div class="vue-chat">
    <p v-if="this.$store.state.contacts == 1" style="margin:10px 0 0 10px;background:#fff;width:25%;cursor: pointer;"  @click="dialog">
      <span>+联系人</span>
    </p>
    <p v-if="this.$store.state.groupslist == 1" style="margin:10px 0 0 10px;background:#fff;width:25%;cursor: pointer;"  @click="buildinggroup">
      <span>+群聊</span>
    </p>
    <el-col v-if="this.$store.state.news == 1" style="padding:30% 10% 0 10%;text-align:center">
      <img style="" src="../assets/img/tishi.png" alt="">
      <p style="font-size:20px;color:#000;font-weight:bold;margin:20px 0 20px 0;">开始在OO上聊天</p>
      <p style="font-size:14px;color:#808082">在联系人列表，选择添加联系人，等待对方同意后，即可开始与好友聊天！</p>
    </el-col>
    <!-- 通知 -->
    <el-col v-if="this.$store.state.notices == 1">
      <div class="msglist">
        <ul>
          <li v-for="item in $store.state.numlist" :key="item"
              class="sessionlist"
              :class="{ active: item.record_id === selectId }"
              @click="selectSession(item.record_id)">
            <div class="list-left">
              <img class="avatar"
                  width="54"
                  height="54"
                  :src="item.friend_image">{{item.index}}
              <span class="tips"
                    v-if="item.tips && item.record_id != selectId">{{item.tips}}</span>
            </div>
            <div class="list-right"
                @click="item.tips = 0" v-if="item.record_type == 'friend'">
              <div style="flex:12">
                <span style="color:rgb(48, 104, 204)" class="name">{{item.friend_name}}</span>
                <span class="name">{{item.msg1}}</span>
                <!-- <p class="time">{{item.remark}}</p> -->
                <span class="name time">{{item.applydate}}</span>
              </div>
              <div style="flex:1;line-height:54px">
                <span class="name">{{item.msg}}</span>
              </div>
            </div>
            <div class="list-right"
                @click="item.tips = 0" v-if="item.record_type == 'group'">
              <div style="flex:12">
                <span style="color:rgb(48, 104, 204)" class="name">{{item.friend_name}}</span>
                <span class="name">{{item.msg1}}</span>
                <!-- <p class="time">{{item.remark}}</p> -->
                <span class="name time">{{item.applydate}}</span>
              </div>
              <div style="flex:1;line-height:54px">
                <span class="name">{{item.msg}}</span>
              </div>
            </div>
            <div class="list-right"
                @click="item.tips = 0" v-if="item.record_type == 'self_friend'">
              <div style="flex:12">
                <span class="name">{{item.msg1}}</span>
                <span style="color:rgb(48, 104, 204)" class="name">{{item.friend_name}}</span>
                <span class="name">{{item.msg2}}</span>
                <span class="name time">{{item.applydate}}</span>
              </div>
              <div style="flex:1;line-height:54px">
                <span class="name">{{item.msg}}</span>
              </div>
            </div>
            <div class="list-right"
                @click="item.tips = 0" v-if="item.record_type == 'self_group'">
              <div style="flex:12">
                <span class="name">{{item.msg1}}</span>
                <span style="color:rgb(48, 104, 204)" class="name">{{item.friend_name}}</span>
                <span class="name">{{item.msg2}}</span>
                <span class="name time">{{item.applydate}}</span>
              </div>
              <div style="flex:1;line-height:54px">
                <span class="name">{{item.msg}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </el-col>
    <!-- 联系人 -->
    <el-col v-if="this.$store.state.contacts == 1">
      <div class="friendlist">
        <ul>
          <li v-for="item in $store.state.contactslist" :key="item"
              class="frienditem"
              :class="{ noborder: !item.initial}">
            <div class="list_title"
                v-if="item.initial">{{item.initial}}</div>
            <div class="friend-info"
                :class="{ active: item.id === selectFriendId }"
                @click="selectFriend(item.id)">
              <img class="avatar"
                  width="54"
                  height="54"
                  :src="item.img">
              <img v-if="item.state == 1" class="imgpic" src="../assets/img/zaixian.png" alt="">
              <img v-if="item.state == 2" class="imgpic" src="../assets/img/likai.png" alt="">
              <img v-if="item.state == 3" class="imgpic" src="../assets/img/wurao.png" alt="">
              <img v-if="item.state == 4" class="imgpic" src="../assets/img/yinshen.png" alt="">
              <div class="remark">{{item.old_nickname}}
                <span class="tips"
                      v-if="item.tips>0">{{item.tips}}</span>
              </div>

            </div>
          </li>
        </ul>
      </div>
    </el-col>
    <!-- 群聊 -->
    <el-col v-if="this.$store.state.groupslist == 1">
      <div class="friendlist">
        <ul>
          <li v-for="item in $store.state.groupsdata" :key="item"
              class="frienditem"
              :class="{ noborder: !item.initial}">
            <div class="list_title"
                v-if="item.initial">{{item.initial}}</div>
            <div class="friend-info"
                :class="{ active: item.id === selectFriendId }"
                @click="selectgroup(item.id)">
              <img class="avatar"
                  width="54"
                  height="54"
                  :src="item.img">
              <div class="remark">{{item.username}}
                <span class="tips"
                      v-if="item.tips>0">{{item.tips}}</span>
              </div>

            </div>
          </li>
        </ul>
      </div>
    </el-col>
    <el-dialog
      title="添加联系人"
      :visible.sync="dialogVisible"
      width="40%"
      center
      :before-close="handleClose">
      <div>
        <p class="addfriends">
          <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-search"
            v-model="input2"
            @keyup.native="change">
          </el-input>
        </p>
        <el-collapse accordion class="zhedie">
          <el-collapse-item v-for="(item,index) in pic" :key="index">
            
            <template slot="title" style="display:flex">
              <div>
                <img style="padding:5px" :src="item.image" alt="">
              </div>
              <div style="height:60px;">
                <div style="height:20px">{{item.username}}</div>
                <div >{{item.email}}</div>
              </div>
            </template>
            <div style="display:flex;justify-content: space-between;line-height:50px;">
              <div style="display:flex;flex-wrap: nowrap;">
                <p style="flex-wrap: nowrap;width:40%">备注:</p>
                <el-input
                  style="margin-top:10px;"
                  type="text"
                  placeholder="请输入内容"
                  v-model="text"
                  maxlength="10"
                  show-word-limit
                >
                </el-input>
              </div>
              <div style="margin-right:30px">
                <el-button size="mini" @click="add(item.id)" type="success" plain>添加</el-button>
              </div>
              
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-dialog>
    <el-dialog
      title="新建群组"
      :visible.sync="dialogVisible1"
      width="30%"
      center
      :before-close="handleClose">
      <div class="building">
        <div class="building-top">
          <div class="touxiang">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :data="{'token':token}"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="building-bot">
          <el-input
            style="text-align:center"
            type="text"
            placeholder="群聊名称"
            v-model="text1"
            maxlength="10"
            show-word-limit
            @blur="groupname"
          >
          </el-input>
        </div>
        <div class="building-bottom">
          <el-button icon="el-icon-right" circle @click="jixu"></el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="新建群组"
      class="xinjian"
      :visible.sync="dialogVisible2"
      width="30%"
      center>
      <i class="el-icon-back" @click="fanhui"></i>
      <div>
        <p style="height:48px;" class="addfriends">
          <el-input
            style="height:48px;"
            placeholder="请输入账号"
            prefix-icon="el-icon-search"
            v-model="friendemail"
            @keyup.native="changes">
          </el-input>
        </p>
      </div>
      <div class="friend-list">
          <ul>
            <li v-for="item in friendxin" :key="item"
                v-if="item.id != -1 && item.id != 0"
                class="frienditem"
                :class="{ noborder: !item.initial}">
              <div class="list_title"
                   v-if="item.initial">{{item.initial}}</div>
              <div class="friend-info"
                   @click="checked(item,item.id)">
                <img class="avatar"
                     width="36"
                     height="36"
                     :src="item.img">
                <div class="remark">{{item.nickname}}</div>
                <div class="check"
                     >
                  <i :class="(item.checked)? 'iconfont icon-duigoutianchong-':'iconfont icon-yuanquanweixuanfuben'"></i>
                </div>
              </div>
            </li>
          </ul>
          <div style="text-align:center">
            <el-button style="background:#3068cc;color:#fff;border:none" size="mini" @click="determine">{{$t('friend.确定')}}</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import friendslist from '../components/friendslist/friendslist'
import messagelist from '../components/messagelist/messagelist'
import { mapState,} from 'vuex'
var domainname = window.location.protocol
var lang = sessionStorage.lang
var domain = (process.env.API_ROOT != '') ? process.env.API_ROOT : (window.location.host + '/')
export default {
  components: {
    friendslist,
    messagelist
  },
  data(){
    return{
      uploadUrl: domainname + '//' + domain + 'OONew/index.php/Home/uploadGroupImage?lang='+lang,
      // active:'1',
      token: sessionStorage.oo_token,
      dialogVisible:false,
      dialogVisible1:false,
      dialogVisible2:false,
      input2:'',
      activeNames: ['1'],
      text:'我是',
      text1:'',
      pic:[],
      searchedFriendlist:[],
      editImage: '../assets/img/quntou.png',
      imageUrl1:'',
      miniLogo:'',
      friendemail:'',
      friendxin:[],
      selection:[],
      qunming:0
    }
  },
  computed: {
    ...mapState([
      'contacts',
      'contactslist',
      'contactslists',
      'news',
      'groupslist',
      'groupsdata',
      'groupsdatas',
      'notices',
      'selectFriendId',
      'numlist',
      'numlists',
      'selectId',
      'noticesid',
    ]),
  },
  created () {
    if(this.global.inpage() == 0){
      this.$router.push('/login')
    }
  },
  mounted(){
    console.log(this.$store.state.news)
    // if(this.$store.state.notices == 1){
    //   this.searchedFriendlist = this.$store.state.numlist
    // }
    // console.log(this.searchedFriendlist)
  },
  methods:{
    //群头像
    handleAvatarSuccess(res, file) {
        console.log(res)
        console.log(file)
            this.miniLogo = res.img
            this.imageUrl1 = URL.createObjectURL(file.raw);
            console.log(this.imageUrl1)
    },
    beforeAvatarUpload(file) {
      const isJPEG = file.type === 'image/jpeg';
      const isJPG = file.type === 'image/jpg';
      const isPNG = file.type === 'image/png';
      const isICO = file.type === 'image/ico';
      const isXICO = file.type === 'image/x-icon';
      const isLt2M = file.size / 1024 / 1024 < 1;

      
      if (!isJPEG && !isJPG && !isPNG && !isICO && !isXICO)  {
          this.$message.error(this.$t("management.上传图片必须是JPEG/JPG/PNG/ICO 格式!"));
      }
      if (!isLt2M) {
        this.$message.error(this.$t("management.上传图片大小不能超过 1MB!"));
      }
      return (isJPEG || isJPG || isPNG || isICO || isXICO) && isLt2M;
    },
    //创群点击下一步
    jixu(){
      if(this.imageUrl1==''){
        this.$message({
            message: '请设置群组头像',
            type: 'error'
        });
        return
      }else if(this.text1 == ''){
        this.$message({
            message: '群组名称不能为空',
            type: 'error'
        });
        return
      }else if(this.qunming == 1){
        // this.$message({
        //     message: '群名称已存在',
        //     type: 'error'
        // });
        return
      }else if(this.qunming == 0)
      {
        this.dialogVisible1 = false;
        this.dialogVisible2 = true;
        this.selection = []
        console.log(this.friendxin)
      }
      
    },
    //选择成员
    checked(item,id){
      if(item.checked == true){
        item.checked = false
        for(let i = 0;i<this.selection.length;i++){
          if(this.selection[i] == id){
            this.selection.splice(i,1)
            break;
          }
        }
        console.log(this.selection)
      }else{
        item.checked = true
        this.selection.push(id)
        console.log(this.selection)
      }
    },
    fanhui(){
      this.dialogVisible1 = true;
      this.dialogVisible2 = false;
    },
    //验证群名
    groupname(){
      let that = this
      that.qunming = 0
      var msg_obj = { "action_type": "admin_check_group_name", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,'type':'add',groupName:that.text1};
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
              that.qunming = 1
              return
          }else{
              console.log("收到服务器内容", data);
              // that.dialogVisible1 = true;
              // that.friendxin = data.data
          }
      };
    },
    //创群搜索群好友列表
    changes(){
      let that = this
      var msg_obj = { "action_type": "admin_group_search_friend", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,search:that.friendemail,friendid:that.selection};
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
              console.log(data);
              that.friendxin = data.data
              if(that.friendxin == []){
                that.friendxin = []
              }
          }
      };
    },
    //确定创建
    determine(){
      let that = this
      var msg_obj = { "action_type": "admin_create_group", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,groupUser:that.selection,groupName:that.text1,groupImg:that.miniLogo};
      var msg = JSON.stringify(msg_obj);
      that.global.ws.send(msg);
      that.global.ws.onmessage = function(res) {
          var data = JSON.parse(res.data)
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
                      case 'home_create_group':
                      that.$message({
                          message: data.msg,
                          type: 'success'
                      });
                      that.dialogVisible2 = false
                      break
                      case 'home_query_application':
                      that.$store.state.num = data.data.num
                      that.$store.state.numlist = data.data.list
                      console.log(data.data)
                      for(let i=0;i<data.data.list.length;i++){
                        if(data.data.list[i].record_id == that.$store.state.numlists.record_id){
                          that.$store.state.numlists = data.data.list[i]
                          // console.log(data.data.list[i])
                          // console.log(that.$store.state.numlists)
                        }
                      }
                      break
                      case 'home_group_list':
                      that.$store.state.groupsdata = data.data
                      // for(let i=0;i<data.data.length;i++){
                      //   if(data.data[i].id == that.$store.state.contactslists.id){
                      //     that.$store.state.contactslists = data.data[i]
                      //   }
                      // }
                      break
                  }
          }
      };
    },
    //点选击通知列表
    selectSession(id){
      console.log(id)
      // this.$store.state.noticesid = id
      for(let i=0;i<this.$store.state.numlist.length;i++){
        if(this.$store.state.numlist[i].record_id == id){
          this.$store.state.numlists = this.$store.state.numlist[i]
          console.log(this.$store.state.numlists)
        }
      }
    },
    //点选联系人
    selectFriend(id){
      console.log(id)
      // this.$store.state.noticesid = id
      for(let i=0;i<this.$store.state.contactslist.length;i++){
        if(this.$store.state.contactslist[i].id == id){
          this.$store.state.contactslists = this.$store.state.contactslist[i]
          console.log(this.$store.state.contactslists)
        }
      }
      if(id == this.$store.state.contactslists.id){
        this.$store.state.contactslists = this.$store.state.contactslists
      }
    },
    //点选群组
    selectgroup(id){
      console.log(id)
      // this.$store.state.noticesid = id
      let that = this
      var msg_obj = { "action_type": "admin_group_info", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,groupId:id};
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
              that.$store.state.groupsdatas = data
          }
      };
      // for(let i=0;i<this.$store.state.groupsdata.length;i++){
      //   if(this.$store.state.groupsdata[i].id == id){
      //     this.$store.state.groupsdatas = this.$store.state.groupsdata[i]
      //     console.log(this.$store.state.groupsdatas)
      //   }
      // }
      // if(id == this.$store.state.contactslists.id){
      //   this.$store.state.contactslists = this.$store.state.contactslists
      // }
    },
    // ...mapActions([
    //   'selectSession',
    //   // 'initData'
    // ]),
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //添加联系人按钮
    dialog(){
      this.pic = []
      this.text = ''
      this.input2 = ''
      this.dialogVisible = true
    },
    //创建群聊按钮
    buildinggroup(){
      let that = this
      var msg_obj = { "action_type": "admin_query_all_friend", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token};
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
              that.dialogVisible1 = true;
              that.friendxin = data.data
          }
      };
      
    },
    change(){
      let that = this
      var msg_obj = { "action_type": "admin_search_friend", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,search:that.input2};
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
                    console.log(data);
                    that.pic = data.data
                    if(that.pic == []){
                      that.pic = []
                    }
                }
            };
    },
    add(id){
      let that = this
      var msg_obj = { "action_type": "admin_add_friend", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,friendid:id,remark:that.text};
      var msg = JSON.stringify(msg_obj);
      that.global.ws.send(msg);
      that.global.ws.onmessage = function(res) {
                var data = JSON.parse(res.data)
                console.log(data)
                if(data.status == 9){
                    that.$router.push('/login')
                }else if(data.status == 0){
                    that.$message({
                        message: data.msg,
                        type: 'error'
                    });
                    that.intbefo()
                }else{
                  switch(data.action_type){
                      case 'home_add_friend':
                      that.$message({
                          message: data.msg,
                          type: 'success'
                      });
                      that.dialogVisible = false
                      break
                      case 'home_query_application':
                      that.$store.state.num = data.data.num
                      that.$store.state.numlist = data.data.list
                      console.log(data.data.list)
                      for(let i=0;i<data.data.list.length;i++){
                        if(data.data.list[i].record_id == that.$store.state.numlists.record_id){
                          that.$store.state.numlists = data.data.list[i]
                          console.log(data.data.list[i])
                          console.log(that.$store.state.numlists)
                        }
                      }
                      break
                      case 'home_user_list':
                      that.$store.state.contactslist = data.data
                      for(let i=0;i<data.data.length;i++){
                        if(data.data[i].id == that.$store.state.contactslists.id){
                          that.$store.state.contactslists = data.data[i]
                        }
                      }
                      break
                  }
                }
            };
    },
    intbefo(){
        let that = this;
        // that.global.loginout(sessionStorage.oo_id,sessionStorage.oo_token)
        var logins = that.global.loginout(sessionStorage.oo_id,sessionStorage.oo_token)
        console.log(logins)
        if(logins == 0){
            that.$router.push('/login')
        }
        setTimeout(function(){
            console.log(that.global.ws)
            console.log(that.global.ws.readyState)
            if (that.global.ws && that.global.ws.readyState == 1) {
                console.log("发送信息", msg);
                //  登陆成功后查询自身状态
                var msg_obj = { "action_type": "admin_query_status", "id": sessionStorage.oo_id,token:sessionStorage.oo_token};
                var msg = JSON.stringify(msg_obj);
                that.global.ws.send(msg);
            }
        },100)
        that.global.ws.onmessage = function(res) {
            var data = JSON.parse(res.data)
            console.log(data.status)
            if(data.status == 9){
                that.$router.push('/login')
            }else if(data.status == 0){
                console.log('qwe')
                that.$message({
                    message: data.msg,
                    type: 'error'
                });
            }else{
                console.log("收到服务器内容", data);
                switch(data.action_type){
                    case 'home_query_status':
                    that.ztall = data.stateList
                    that.value = data.state
                    that.$store.state.zt = that.value
                    console.log(that.ztall)
                    break
                }
            }
        };
    },
  }
    // computed: {
    // ...mapState([
    //   'active',
    // ]),
    // }
};
</script>
<style>
  .addfriends .el-input{
    border: none;
  }
  .zhedie img{
    width: 50px!important;
    height: 50px!important;
    border-radius: 50%;
  }
  .zhedie{
    padding: 10px;
    height: 300px;
    overflow-y:scroll
  }
  .zhedie .el-input{
    border: 1px solid #ddd;
  }
  .zhedie .el-input .el-input__inner{
    font-size: 14px;
  }
  .addfriends .el-input__inner{
    color: #fff
  }
  .vue-chat .el-dialog--center .el-dialog__body{
    padding: 0!important
  }
</style>
<style scoped lang="less">
.vue-chat {
  width: 100%;
  height:calc(100% - 155px);
  box-sizing: border-box;
  overflow-y: scroll;
  .container {
    width: 100%;
    height: 100%;
    .aside {
      width: 20%;
      min-width:230px;
      height: 100%;
      background-color: #f9f9f9;
      border-right:1px solid #d5d9de
    }
    .main {
      width: calc(100% - 20%);
      height: 100%;
    }
  }
  .addfriends{
    height: 60px;
    line-height: 60px;
    background: rgb(48, 104, 204);
  }
}
.imgpic{
   position: absolute;
   bottom: 16px;
   left: 60px;
   width: 12px;
}
.building-top{
  width: 100%;
  height: 130px;
  background: rgb(48, 104, 204);
  position: relative;
}
.el-icon-back{
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 18px;
}
.building-bot{
  padding: 10% 10% 30% 10%;
}
.building-bottom{
  padding: 0 20px 5% 20px;
  text-align: right;
}
.building-bottom .el-button{
  background: #3068cc;
  color: #fff;
  border: none;
}
.building-top .touxiang{
  position: absolute;
  top: 20%;
  // left: 40%
  left: calc(50% - 65px);
}
</style>
<style lang="stylus" scoped>
.friend-list
      padding 0 6%
      width 100%
      height 500px
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
          padding 10px 0 3px 0px
          color #999
        .friend-info
          display flex
          position relative
          padding 10px 10px
          transition background-color 0.1s
          &:hover
            background-color rgb(220, 220, 220)
          &.active
            background-color #c4c4c4
          .avatar
            border-radius 50%
            margin-right 12px
          .remark
            font-size 16px
            line-height 36px
            color #060606
            flex 3
            max-width 120px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
          .check
            position absolute
            right 15px
            top 18px
            padding 0px
            font-size 20px
            color #3068cc
            cursor pointer
            flex 1
</style>

<style lang="stylus" scoped>
.msglist
  .sessionlist
    display flex
    padding 16px 12px
    transition background-color 0.1s
    font-size 0
    &:hover
      background-color #fff
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
      display flex
      .name
        display inline-block
        vertical-align top
        font-size 14px
        color #000
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
      .time
        color rgb(128, 128, 130)
        font-size 12px
        vertical-align top
        margin-top 18px
        display: block
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
<style lang="stylus" scoped>
.friendlist
  height calc(100% - 86px)
  overflow-y auto
  .frienditem
    &:first-child, &.noborder
      border-top none
    .list_title
      box-sizing border-box
      width 100%
      font-size 16px
      padding 10px 0 5px 10px
      color rgb(128, 128, 130)
      background #f9f9f9
    .friend-info
      position relative
      display flex
      padding 16px 20px
      transition background-color 0.1s
      font-size 0
      &:hover
        background-color #fff
      &.active
        background-color #fff
      .avatar
        min-width 48px
        border-radius 50%
        margin-right 12px
      .remark
        font-size 16px
        line-height 54px
        position relative
        color #000
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
<style>
.vue-chat::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/*正常情况下滑块的样式*/

.vue-chat::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在该类指向的控件上时滑块的样式*/

.vue-chat:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在滑块上时滑块的样式*/

.vue-chat::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*正常时候的主干部分*/

.vue-chat::-webkit-scrollbar-track {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: white;
}
/*鼠标悬浮在滚动条上的主干部分*/

.vue-chat::-webkit-scrollbar-track:hover {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.01);
}
.touxiang .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .touxiang .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .touxiang .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    background:#f9f9f9;
    border-radius:50%
  }
  .touxiang .avatar {
    width: 120px;
    height: 120px;
    display: block;
    border-radius: 50%;
  }
  .building-bot .el-input .el-input__inner{
    text-align: center;
  }
  .building-bot .el-input__inner{
    height: 30px;
    line-height: 30px;
  }
  .vue-chat .xinjian .el-dialog--center{
    position: relative;
    position: absolute;
    top: calc(50% - 300px);
    left: calc(50% - 15%);
    margin-top:0!important;
  }
</style>
