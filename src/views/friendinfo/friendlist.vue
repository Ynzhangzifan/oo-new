<!-- 好友信息 -->
<template>
   <div class="Info-wrapper">
    <div class="add-top">
      <p>{{$store.state.contactslists.old_nickname}}</p>
      <div v-if="this.$store.state.contactslists.state == 1">
        <img src="../../assets/img/zaixian.png" alt="">
        <span>在线</span>
      </div>
      <div v-if="this.$store.state.contactslists.state == 2">
        <img src="../../assets/img/likai.png" alt="">
        <span>离开</span>
      </div>
      <div v-if="this.$store.state.contactslists.state == 3">
        <img src="../../assets/img/wurao.png" alt="">
        <span>请勿打扰</span>
      </div>
      <div v-if="this.$store.state.contactslists.state == 4">
        <img src="../../assets/img/yinshen.png" alt="">
        <span>隐身</span>
      </div>
    </div>
    <div class="friendInfo">
      <div class="esInfo" >
        <div class="right">
            <img class="avatar"  width="136" height="136" :src="$store.state.contactslists.img">
        </div>
        <div class="left">
          <div class="people">
            <div class="nicknames">{{$store.state.contactslists.username}}</div>
          </div>
              <div class="wxid"><span>{{$t('friend.账号：')}}</span>{{$store.state.contactslists.email}}</div>
        </div>
      </div>
      <div style="text-align:center" class="beizhu">
        <span style="font-size:18px;">备注:</span>
        <el-input size="mini"
            ref="content"
                      maxlength="20"
                      @blur="confirmName"
                      :class="{disable: !disabled}"
                      :disabled="disabled"
                      v-model="$store.state.contactslists.nickname">
            </el-input>
            <i @click="editname"
               v-if="editShow"
               style="font-size:24px;"
               class="el-icon-edit-outline"></i>
      </div>
	   	</div>
       <div class="btn">
				<div class="send">
          <el-button id="top1" class="tongyi" size="mini" type="primary" @click="refuse">{{$t('friend.删除好友')}}</el-button>
          <el-button id="top" class="jujue" size="mini" type="info" @click="agree">{{$t('friend.发消息')}}</el-button>
				</div>
			</div>
   </div>
</template>

<script>
import router from '../../router'
import qs from 'qs'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  computed: {
      ...mapState([
        'contacts',
        'contactslist',
        'contactslists',
      ]),
	},
	data(){
    name:'friendlist'
		return{
      disabled: true,
      editShow: true,
      nickname:'',
		}
	},
  methods: {
      editname () {
        this.disabled = false
        this.editShow = false
        this.$nextTick(() =>{
          this.$refs.content.focus()
        })
      },
      confirmName () {
        if(this.$store.state.contactslists.nickname == ''){
          this.$message({
              message: '备注不能为空',
              type: 'error'
          });
          this.$store.state.contactslists.nickname = this.$store.state.contactslists.old_nickname
          return
        }
        this.disabled = true
        this.editShow = true
        let that = this
        var msg_obj = {"action_type": "admin_friend_nickname", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,friendid:that.$store.state.contactslists.id,nickname:that.$store.state.contactslists.nickname};
        var msg = JSON.stringify(msg_obj);
        that.global.ws.send(msg);
        console.log(11112333)
        that.global.ws.onmessage = function(res) {
            var data = JSON.parse(res.data)
            console.log("收到服务器内容", data);
            if(data.status == 9){
                that.$router.push('/login')
            }else if(data.status == 0){
                that.$message({
                    message: data.msg,
                    type: 'error'
                });
                that.intbefo()
            }else{
                // console.log("收到服务器内容", data);
                switch(data.action_type){
                    case 'home_friend_nickname':
                    that.$message({
                        message: data.msg,
                        type: 'success'
                    });
                    break
                    case 'home_user_list':
                    that.$store.state.contactslist = data.data
                    console.log(data.data)
                    for(let i=0;i<data.data.length;i++){
                      if(data.data[i].id == that.$store.state.contactslists.id){
                        that.$store.state.contactslists = data.data[i]
                        // console.log(data.data[i])
                        // console.log(that.$store.state.contactslists)
                      }
                    }
                }
            }
        };
      },
      refuse(){
      let that = this
      var msg_obj = { "action_type": "admin_friend_del", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,friendid:that.$store.state.contactslists.id};
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
                  case 'home_friend_del':
                  that.$message({
                      message: data.msg,
                      type: 'success'
                  });
                  break
                  case 'home_user_list':
                  that.$store.state.contactslist = data.data
                    console.log(data.data)
                    console.log(that.$store.state.contactslists)
                    console.log(data.data.length)
                    for(let i=0;i<data.data.length;i++){
                      if(data.data[i].id == that.$store.state.contactslists.id){
                        that.$store.state.contactslists = data.data[i]
                        console.log(data.data[i])
                        console.log(that.$store.state.contactslists)
                      }else{
                        console.log(777)
                          that.$store.state.contactslists = data.data[0]
                      }
                    }
                    if(data.data.length == 0){
                      console.log(666)
                      that.$store.state.contactslists = []
                      that.$router.push('/message')
                    }
                  }
              }
      };
    },
    agree(){
      let that = this
      
      var msg_obj = { "action_type": "admin_handle_application", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,record_type:that.$store.state.numlists.record_type,record_id:that.$store.state.numlists.record_id,record_status:1};
      console.log(msg_obj)
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
                  case 'home_handle_application':
                  that.$message({
                      message: data.msg,
                      type: 'success'
                  });
                  break
                  case 'home_query_application':
                  that.$store.state.num = data.data.num
                  that.$store.state.numlist = data.data.list
                  for(let i=0;i<data.data.list.length;i++){
                    if(data.data.list[i].record_id == that.$store.state.numlists.record_id){
                      that.$store.state.numlists = data.data.list[i]
                      console.log(data.data.list[i])
                      console.log(that.$store.state.numlists)
                    }
                  }
              }
          }
      };
    }
	},
	mounted(){
		if(this.global.inpage() == 0){
      this.$router.push('/login')
    }
	},
}
</script>

<style lang="stylus" scoped>
.newfriend
  box-sizing border-box
.nickname
  font-size 26px
  text-align center
  line-height 86px
  border-bottom 1px solid #e7e7e7
.newfriend-list
  width 100%
  margin 50px auto
  .list-item
    display flex
    position relative
    width 100%
    padding 15px 40px
    border-bottom 1px solid #e7e7e7
    .avatar
      border-radius 50%
    .info
      margin-left 20px
      padding 5px 0px
    .button
      position absolute
      right 20px
      width 60px
      text-align center
      padding 6px 6px
      background #52d68a
      color white
      font-size 18px
      border-radius 6px
      margin-top 23px
      cursor pointer
.search-box
  margin 20px
  height 485px
  width 94%
  .search-input
    position relative
    background-color #e7e7e7
    border 1px solid #d9d7d6
    border-radius 2px
    input
      background-color #e7e7e7
      padding 5px
      font-size 10px
      width 400px
      outline none
    i
      position absolute
      top 4px
      right 10px
      cursor pointer
  .search-result
    width 400px
    margin 50px auto
    border-top 1px solid #e7e7e7
    border-bottom 1px solid #e7e7e7
    .result-info
      display flex
      position relative
      padding 30px 10px
      .avatar
        border-radius 3px
        position absolute
        right 0
      p
        font-size 10px
    .error-info
      padding 30px 0
      padding 30px 10px
      text-align center
      color #888
  .add
    width 100%
    span
      margin auto
      display block
      width 100px
      text-align center
      line-height 36px
      font-size 14px
      color #fff
      background-color #1aad19
      cursor pointer
      border-radius 2px
.friendInfo
  padding 10% 20%
.esInfo
  display flex
  justify-content center
  
  .left
    padding 20px
    .people
      line-height 48px
      .nickname
        display inline-block
        font-size 20px
      .gender-male, .gender-female
        display inline-block
        width 18px
        height 18px
        vertical-align top
        margin-top 2px
      .gender-male
        background-size cover
      .gender-female
        background-size cover
    .signature
      font-size 14px
      color rgba(153, 153, 153, 0.8)
  .right
    .avatar
      border-radius 50%
</style>
<style scoped>
.add-top {
    width: 100%;
    height: 86px;
    border-bottom: 1px solid #d5d9de;
    text-align: left;
    padding: 20px;
}
.add-top span{
  color: #9aa2a6;
  font-size: 12px;
}
.beizhu{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.add-top>p {
    color: #000;
    font-size: 20px;
}
.add-top>div img{
    width: 12px;
    vertical-align: middle;
}
.nickname {
  box-shadow: 0px 3px 3px 0px #16171612;
}
.usernames {
  font-size: 20px;
  color: #060606;
  margin-top: 5px;
}
.buttons {
  position: absolute;
  right: 20px;
  text-align: center;
  line-height: 75px;
  font-size: 18px;
  color: #818181;
}
.people .nicknames {
  font-size: 30px;
  color: #060606;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}
.wxid {
  font-size: 16px;
  color: #818181;
  line-height:48px
}
.btn {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}
.send {
  /* flex: 1; */
  text-align: center;
}
.send .jujue {
  width: 180px;
  height: 34px;
  background: rgb(48, 104, 204);
  margin-left: 25px;
  border: none;
}
.send .tongyi {
  width: 180px;
  height: 34px;
  background: #D5D9DE;
  border: none;
  color:red
}
.Info-wrapper {
  background: #fff;
  height: 100%;
  border-radius: 0 16px 16px 0;
}
.newfriend {
  height: 100%;
  overflow: auto;
}
.newfriend::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/*正常情况下滑块的样式*/

.newfriend::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在该类指向的控件上时滑块的样式*/

.newfriend:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在滑块上时滑块的样式*/

.newfriend::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*正常时候的主干部分*/

.newfriend::-webkit-scrollbar-track {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: white;
}
/*鼠标悬浮在滚动条上的主干部分*/

.newfriend::-webkit-scrollbar-track:hover {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.01);
}
</style>
<style>
  .beizhu .el-input{
    width: 30%!important;
  }
  .Info-wrapper .el-input.is-disabled .el-input__inner{
    background:#fff!important
  }
</style>


