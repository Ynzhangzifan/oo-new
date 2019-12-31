<template>
  <div class="safeset">
    <el-row>
      <p>{{$t('maininfo.隐私设置')}}</p>
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               class="form">

        <el-col>
          <!-- 账号-->
          <el-form-item prop="account" label="焚烧时间" style="display:flex;border-bottom:1px solid #d5d9de">
            <el-input v-model="ruleForm.account"
                      class="ver"
                      style="width:100%;">
            </el-input>s
            <!-- <span style="direction: rtl;">{{ruleForm.account}}</span> -->
          </el-form-item>
        </el-col>
        <el-col class="self-bottom">
          <el-button size="mini" type="primary" @click="changePwd">{{$t('maininfo.立即修改')}}</el-button>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      ruleForm: {
        account: sessionStorage.email,
      },
      rules: {
      }
    }
  },
  created () {
    if(this.global.inpage() == 0){
      this.$router.push('/login')
    }
    this.handdleMsg()
  },
  methods: {
    //scoket
    handdleMsg(msg) {
        let that = this;
        
        if (that.global.ws && that.global.ws.readyState == 1) {
            console.log("发送信息", msg);
            //  登陆成功后更改自身状态
            var msg_obj = { "action_type": "admin_yinsi_setting", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token};
            var msg = JSON.stringify(msg_obj);
            that.global.ws.send(msg);
        }
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
                    that.ruleForm.account = data.data.burn_time
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
    changePwd () {
      if(this.ruleForm.account == ''){
        this.$message({
            message: this.$t('maininfo.焚烧时间不能为空'),
            type: 'error'
        });
      }
      let that = this
      var msg_obj = { "action_type": "admin_save_yinsi_setting", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,burn_time:that.ruleForm.account};
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
                    that.$message({
                        message: data.msg,
                        type: 'success'
                    });
                    // sessionStorage.setItem('oo_avatar', that.editImage)
                    // sessionStorage.setItem('oo_username', that.name)
                    // that.$store.state.oo_avatar = that.editImage
                    // that.$store.state.oo_username = that.name
                }
            };
    }
  },
};
</script>
<style>
.safeset input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #818181;
}
.safeset input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #818181;
}
.safeset input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #818181;
}
.safeset input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #818181;
}
.safeset .form .el-input-group__append {
  padding: 0 10px 0 0 !important;
  color: #818181;
}
.safeset .form .el-input {
  border-bottom: 2px solid #4c4e4e;
  font-size: 18px;
}
.safeset .form .el-input__inner {
  color: #060606;
}
.safeset .form .el-input.is-disabled .el-input__inner {
  color: #818181;
}
.safeset .el-form-item__label{
  width:60%;
  text-align: left;
}
.safeset .el-form-item__content {
    width: 100%;
    text-align: right;
}
.safeset .form .el-form-item__error {
  color: #f55f5f;
  font-size: 18px;
  line-height: 10px;
  height: 20px;
  float: right;
  width: 120%;
  padding-left: 31px;
  position: absolute;
  top: 30%;
  left: 120%;
  background: url("../../assets/img/no.png") no-repeat;
}
</style>
<style scoped lang="less">
.safeset {
  height: 100%;
  width: 100%;
  padding: 15% 20px 15% 20px;
  background-color: #fff;
  .el-row {
    text-align: center;
    height: 100%;
    width: 100%;
    // padding: 140px 0 50px 0;
    p {
      font-size: 30px;
      color: #060606;
    }

    .form {
      width: 100%;
      margin: auto;
      padding-top: 50px;
      .self-bottom {
        // padding-top: 124px;
        .el-button {
          color: #fff;
        }
      }
    }
  }
}
</style>