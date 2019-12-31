<template>
  <div class="add-new">
    <!-- 主动添加 -->
    <div v-if="this.$store.state.numlists.record_type == 'friend'" class="add-top">
      <p>{{$store.state.numlists.friend_name}}</p>
      <!-- <p>{{this.$store.state.numlist}}</p> -->
      <div v-if="this.$store.state.numlists.friend_state == 1">
        <img src="../../assets/img/zaixian.png" alt="">
        <span>在线</span>
      </div>
      <div v-if="this.$store.state.numlists.friend_state == 2">
        <img src="../../assets/img/likai.png" alt="">
        <span>离开</span>
      </div>
      <div v-if="this.$store.state.numlists.friend_state == 3">
        <img src="../../assets/img/wurao.png" alt="">
        <span>请勿打扰</span>
      </div>
      <div v-if="this.$store.state.numlists.friend_state == 4">
        <img src="../../assets/img/yinshen.png" alt="">
        <span>隐身</span>
      </div>
    </div>
    <div v-if="this.$store.state.numlists.record_type == 'self_friend'" class="add-top">
      <p>{{$store.state.numlists.friend_name}}</p>
      <!-- <p>{{this.$store.state.numlist}}</p> -->
      <div v-if="this.$store.state.numlists.friend_state == 1">
        <img src="../../assets/img/zaixian.png" alt="">
        <span>在线</span>
      </div>
      <div v-if="this.$store.state.numlists.friend_state == 2">
        <img src="../../assets/img/likai.png" alt="">
        <span>离开</span>
      </div>
      <div v-if="this.$store.state.numlists.friend_state == 3">
        <img src="../../assets/img/wurao.png" alt="">
        <span>请勿打扰</span>
      </div>
      <div v-if="this.$store.state.numlists.friend_state == 4">
        <img src="../../assets/img/yinshen.png" alt="">
        <span>隐身</span>
      </div>
    </div>
    <div v-if="this.$store.state.numlists.record_type == 'self_group'" class="add-top">
      <p>{{$store.state.numlists.group_name}}</p>
      <!-- <p>{{this.$store.state.numlist}}</p> -->
    </div>
    <div v-if="this.$store.state.numlists.record_type == 'group'" class="add-top">
      <p>{{$store.state.numlists.group_name}}</p>
      <!-- <p>{{this.$store.state.numlist}}</p> -->
    </div>
    <div v-if="this.$store.state.numlists.record_type == 'friend'" class="content">
      <div class="content-top">
        <img :src="this.$store.state.numlists.friend_image" alt="">
        <div class="content-right">
          <p style="color:#000;font-size:18px">{{this.$store.state.numlists.friend_name}}</p>
          <p>账号:{{this.$store.state.numlists.friend_email}}</p>
          <p>附加消息:{{this.$store.state.numlists.remark}}</p>
        </div>
      </div>
      <div v-if="this.$store.state.numlists.record_status == '0'" class="content-bottom">
        <el-button id="top" class="jujue" size="mini" type="info" @click="refuse">拒绝</el-button>
        <el-button id="top1" class="tongyi" size="mini" type="primary" @click="agree">同意</el-button>
        <div id="bot" style="display:none" class="dengdai">已同意</div>
        <div id="bot1" style="display:none" class="dengdai">已拒绝</div>
      </div>
      <div v-if="this.$store.state.numlists.record_status == '1'" class="content-bottom">
        <div class="dengdai">{{this.$store.state.numlists.msg}}</div>
      </div>
      <div v-if="this.$store.state.numlists.record_status == '2'" class="content-bottom">
        <div class="dengdai">{{this.$store.state.numlists.msg}}</div>
      </div>
    </div>
    <div v-if="this.$store.state.numlists.record_type == 'group'" class="content">
      <div class="content-top">
        <img :src="this.$store.state.numlists.friend_image" alt="">
        <div class="content-right">
          <p style="color:#000;font-size:18px;line-height:96px">{{this.$store.state.numlists.group_name}}</p>
          <!-- <p>账号:{{this.$store.state.numlists.friend_email}}</p>
          <p>附加消息:{{this.$store.state.numlists.remark}}</p> -->
        </div>
      </div>
      <div v-if="this.$store.state.numlists.record_status == '0'" class="content-bottom">
        <el-button id="top" class="jujue" size="mini" type="info" @click="refuse">拒绝</el-button>
        <el-button id="top1" class="tongyi" size="mini" type="primary" @click="agree">同意</el-button>
        <div id="bot" style="display:none" class="dengdai">已同意</div>
        <div id="bot1" style="display:none" class="dengdai">已拒绝</div>
      </div>
      <div v-if="this.$store.state.numlists.record_status == '1'" class="content-bottom">
        <div class="dengdai">{{this.$store.state.numlists.msg}}</div>
      </div>
      <div v-if="this.$store.state.numlists.record_status == '2'" class="content-bottom">
        <div class="dengdai">{{this.$store.state.numlists.msg}}</div>
      </div>
    </div>
    <div v-if="this.$store.state.numlists.record_type == 'self_friend'" class="content">
      <div class="content-top">
        <img :src="this.$store.state.numlists.friend_image" alt="">
        <div class="content-right">
          <p style="color:#000;font-size:18px">{{this.$store.state.numlists.friend_name}}</p>
          <p>账号:{{this.$store.state.numlists.friend_email}}</p>
          <p>附加消息:{{this.$store.state.numlists.remark}}</p>
        </div>
      </div>
      <div class="content-bottom">
        <div class="dengdai">{{this.$store.state.numlists.msg}}</div>
      </div>
    </div>
    <div v-if="this.$store.state.numlists.record_type == 'self_group'" class="content">
      <div class="content-top">
        <img :src="this.$store.state.numlists.friend_image" alt="">
        <div class="content-right">
          <p style="color:#000;font-size:18px;line-height:96px">{{this.$store.state.numlists.group_name}}</p>
          <!-- <p>账号:{{this.$store.state.numlists.friend_email}}</p>
          <p>附加消息:{{this.$store.state.numlists.remark}}</p> -->
        </div>
      </div>
      <div class="content-bottom">
        <div class="dengdai">{{this.$store.state.numlists.msg}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import { mapState,} from 'vuex'
export default {
  computed: {
    ...mapState([
      // 'contacts',
      // 'news',
      // 'groupslist',
      // 'notices',
      // 'selectFriendId',
      'numlist',
      'num',
      'numlists',
      'noticesid',
      'groupsdata',
      // 'selectId'
    ]),
  },
  data () {
    return {
      Info: {},
      remark: '',
      name:'',
      type:'1',
      // agree:0
    }
  },
  created () {
    if(this.global.inpage() == 0){
      this.$router.push('/login')
    }
  },
  methods: {
    refuse(){
      let that = this
      var msg_obj = { "action_type": "admin_handle_application", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,record_type:that.$store.state.numlists.record_type,record_id:that.$store.state.numlists.record_id,record_status:2};
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
                  console.log(data.data.list)
                  for(let i=0;i<data.data.list.length;i++){
                    if(data.data.list[i].record_id == that.$store.state.numlists.record_id){
                      that.$store.state.numlists = data.data.list[i]
                      console.log(data.data.list[i])
                      console.log(that.$store.state.numlists)
                    }
                  }
              }
              // this.agree = 1
              // that.global.ws.onclose()
              // that.$router.push('/login')
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
                  break
                  case 'home_group_list':
                  that.$store.state.groupsdata = data.data
                  console.log(that.$store.state.groupsdata)
                  // for(let i=0;i<data.data.list.length;i++){
                  //   if(data.data.list[i].record_id == that.$store.state.numlists.record_id){
                  //     that.$store.state.numlists = data.data.list[i]
                  //     console.log(data.data.list[i])
                  //     console.log(that.$store.state.numlists)
                  //   }
                  // }
                  break
              }
              // this.agree = 1
              // that.global.ws.onclose()
              // that.$router.push('/login')
          }
      };
    }
  },
}
</script>
<style>
.add-new {
  border-radius: 0 10px 10px 0;
}
.add-new .add-main .searchinput .el-input__inner {
  width: 96%;
  height: 36px;
  line-height: 36px;
  border-radius: 100px;
  font-size: 15px;
  color: #060606;
  background-color: #fff;
  box-shadow: 0 3px 3px 0px #16171626;
}
.add-new .add-main .remark .el-input__inner {
  /* min-height: 18px !important; */
  border: 1px solid #dcdfe6;
  height: 34px;
  line-height: 34px;
  color: #606266;
  border-radius: 8px;
}
.add-new .add-main .remark .el-input {
  width: 40%;
  border-bottom: none;
}
.add-new .add-main .searchinput.el-input {
  border-bottom: 0;
  color: #060606;
  width: 96% !important;
}
.add-new .add-main .el-input__prefix {
  top: -3px !important;
  left: 28px;
  color: #060606;
}
.add-new .el-input--prefix .el-input__inner {
  padding-left: 40px;
}
</style>
<style scoped lang="less">
.add-new {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  .content{
    padding: 10% 20%;
    text-align: center;
    .content-top{
      display: flex;
      justify-content: center;
      vertical-align: middle;
      img{
        vertical-align: middle;
        width: 136px;
        height: 136px;
        border-radius: 50%
      }
      .content-right{
        padding: 20px 20px;
        text-align: left;
        p{
          line-height: 32px;
          color: rgb(128, 128, 130);
          font-size: 12px;
        }
      }
    }
    .content-bottom{
      padding: 10% 25%;
      display: flex;
      justify-content: center;
      .jujue{
        width: 180px;
        height: 34px;
        background: #D5D9DE;
        border: none;
        color:#000
      }
      .tongyi{
        width: 180px;
        height: 34px;
        background: rgb(48, 104, 204);
        margin-left: 25px;
        border: none;
      }
      .dengdai{
        width: 180px;
        height: 34px;
        background: #D5D9DE;
        border: none;
        color:#000;
        line-height: 34px;
        border-radius: 3px;
      }
    }
  }
  .add-top {
    width: 100%;
    height: 86px;
    border-bottom: 1px solid #d5d9de;
    text-align: left;
    padding: 20px;
    p {
      color: #000;
      font-size: 20px;
    }
    img{
      width: 12px;
      vertical-align: middle;
    }
    span{
      color:rgb(154, 162, 166);
      font-size: 12px;
    }
  }
  .add-main {
    width: 100%;
    // height: 728px;
    padding-top: 26px;
    text-align: center;
    .new-friend {
      display: flex;
      width: 100%;
      height: 236px;
      border-bottom: 1px solid #bdbfbf;
      // height: 666px;
      .info {
        flex: 1;
        padding-top: 60px;
        .userfemale {
          color: #060606;
          font-size: 30px;
          height: 60px;
          line-height: 60px;
          span {
            display: inline-block;
            width: 30px;
            height: 24px;
            margin-left: 20px;
            background: url("../../assets/img/woman.png") center no-repeat;
          }
        }
        .usermale {
          color: #060606;
          font-size: 30px;
          height: 60px;
          line-height: 60px;
          span {
            display: inline-block;
            width: 30px;
            height: 24px;
            margin-left: 20px;
            background: url("../../assets/img/men.png") center no-repeat;
          }
        }
        .account {
          color: #818181;
          margin-top: 10px;
          font-size: 16px;
          span {
            margin-left: 10px;
          }
        }
        .remark {
          color: #818181;
          margin-top: 10px;
          font-size: 16px;
          height: 34px;
          line-height: 34px;
        }
      }
      .img {
        flex: 1;
        padding-top: 50px;
        img {
          width: 108px;
          height: 108px;
          vertical-align: middle;
          border-radius: 50%;
        }
      }
    }
    .account-no {
      width: 100%;
      height: 236px;
      border-bottom: 1px solid #bdbfbf;
      padding-top: 80px;
      p {
        font-size: 30px;
        color: #8e8e8e;
      }
    }
  }
  .addBtn {
    // height: 430px;
    text-align: center;
    .el-button {
      // width: 108px;
      background-color: #52d68a;
      color: #fff;
      border-radius: 10px;
      font-size: 18px;
      position: absolute;
      bottom: 60px;
      right: 42%;
      // margin-top: 240px;
    }
  }
}
</style>