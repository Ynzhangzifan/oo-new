<template>
  <div class="safeset">
    <el-row>
      <p>{{$t('maininfo.修改密码')}}</p>
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               class="form">

        <el-col>
          <!-- 账号-->
          <el-form-item prop="account" label="账号" style="display:flex;border-bottom:1px solid #d5d9de">
            <!-- <el-input v-model="ruleForm.account"
                      :disabled="true"
                      class="ver"
                      style="width:100%;">
            </el-input> -->
            <span >{{ruleForm.account}}</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="oldPwd" label="旧密码" style="display:flex;border-bottom:1px solid #d5d9de">
            <el-input v-model="ruleForm.oldPwd"
                      :placeholder="$t('maininfo.旧密码')"
                      type="password"
                      style="width:100%;"
                      :type="passwordType"
                      @blur="verification">
            </el-input>
            <span class="show-pwd"
                  style="position:absolute;right:0px;top:3px;color:#000"
                  @click="showPwd">
              <i :class="eyeIcon"></i>
            </span>
          </el-form-item>

        </el-col>

        <el-col>
          <el-form-item prop="password" label="新密码" style="display:flex;border-bottom:1px solid #d5d9de">
            <el-input v-model="ruleForm.password"
                      :placeholder="$t('maininfo.新密码')"
                      type="password"
                      style="width:100%;"
                      :type="passwordType">
            </el-input>
            <span class="show-pwd"
                  style="position:absolute;right:0px;top:3px;color:#000"
                  @click="showPwd">
              <i :class="eyeIcon"></i>
            </span>
          </el-form-item>

        </el-col>
        <el-col>
          <el-form-item prop="repeatPwd" label="再次输入新密码" style="display:flex;border-bottom:1px solid #d5d9de">
            <el-input v-model="ruleForm.repeatPwd"
                      :placeholder="$t('maininfo.再次输入密码')"
                      type="password"
                      style="width:100%;"
                      :type="passwordType">
            </el-input>
            <span class="show-pwd"
                  style="position:absolute;right:0px;top:3px;color:#000"
                  @click="showPwd">
              <i :class="eyeIcon"></i>
            </span>
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
    var checkVeroldPsw = (rule, value, callback) => {
      if (value == '') {
        callback(new Error(this.$t('maininfo.请输入旧密码')));
      } else if (value.length < 6 || value.length > 8) {
        callback(new Error(this.$t('register.密码为6-8位')));
      } else {
        callback();
      }
    };
    var checkpassword = (rule, value, callback) => {
      if (value == '') {
        callback(new Error(this.$t('maininfo.请输入新密码')));
      } else if (value.length < 6 || value.length > 8) {
        callback(new Error(this.$t('register.密码为6-8位')));
      } else if (value == this.ruleForm.oldPwd) {
        callback(new Error(this.$t('maininfo.新密码不能和旧密码相同')));
      } else {
        callback();
      }
    };
    var checkrepeatPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('maininfo.请再次输入新密码')));
      } else if (value != this.ruleForm.password) {
        callback(new Error(this.$t('maininfo.两次输入的密码不一致')));
      } else {
        callback();
      }
    };
    return {
      passwordType: 'password',
      eyeIcon: 'iconfont icon-biyan',
      ruleForm: {
        account: sessionStorage.email,
        oldPwd: '',
        password: '',
        repeatPwd: '',
      },
      rules: {
        oldPwd: [
          { required: true,validator: checkVeroldPsw, trigger: ['blur', 'change'] },
        ],
        password: [
          { required: true, validator: checkpassword, trigger: ['blur', 'change'] },
        ],
        repeatPwd: [
          { required: true, validator: checkrepeatPwd, trigger: ['blur', 'change'] },
        ]

      }
    }
  },
  created () {
    this.handdleMsg()
    if(this.global.inpage() == 0){
      this.$router.push('/login')
    }
  },
  methods: {
    showPwd () {
      console.log(this.passwordType)
      if (this.passwordType === "password") {
        this.passwordType = "";
        this.eyeIcon = 'iconfont icon-yanjing'
      } else {
        this.passwordType = "password";
        this.eyeIcon = 'iconfont icon-biyan'
      }
    },
    //scoket
    handdleMsg(msg) {
        let that = this;
        
        if (that.global.ws && that.global.ws.readyState == 1) {
            console.log("发送信息", msg);
            //  登陆成功后更改自身状态
            var msg_obj = { "action_type": "admin_anquan_setting", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token};
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
                    that.ruleForm.account = data.data.email
                    that.ruleForm.oldPwd = data.data.old_password
                    that.ruleForm.password = data.data.new_password
                    that.ruleForm.repeatPwd = data.data.new_two_password
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
    //验证旧密码
    verification(){
      let that = this
      var msg_obj = { "action_type": "admin_check_old_password", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,'old_password':that.ruleForm.oldPwd};
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
                    // that.$message({
                    //     message: data.msg,
                    //     type: 'success'
                    // });
                }
            };
    },
    changePwd () {
      let that = this
      if(that.ruleForm.password != that.ruleForm.repeatPwd){
        that.$message({
            message: this.$t('maininfo.两次输入的密码不一致'),
            type: 'error'
        });
        return
      }
      var msg_obj = { "action_type": "admin_save_anquan_setting", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,'old_password':that.ruleForm.oldPwd,'new_password':that.ruleForm.password};
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
                    that.$router.push('/login')
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
/* .safeset .safeset .form .el-input__inner{
  text-align: right!important
} */
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
  text-align: right!important;
  padding-right: 30px;
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
  text-align: left;
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