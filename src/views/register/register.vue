<template>
  <div class="register">
    <div class="content">
      <div class="logo">
        <img :src="registerLogo"
             alt="">
      </div>
      <div class="info">
        <el-row>
          <el-form :model="ruleForm"
                   :rules="rules"
                   ref="ruleForm"
                   class="form">
            <el-col>

              <el-form-item prop="account" v-if="this.emailValCode ==''&&this.phoneValCode== ''">

                <el-input v-model="ruleForm.account"
                          :placeholder="placehold"
                          style="width:100%">
                  <img slot="prepend"
                       src="../../assets/img/user.png"
                       alt="">
                  <el-select v-model="accountValue"
                             @change="accountChange"
                             slot="append"
                             style="width:100px"
                             placeholder="">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item prop="account" v-else>

                <el-input v-model="ruleForm.account"
                          :placeholder="placehold"
                          disabled
                          style="width:100%">
                  <img slot="prepend"
                       src="../../assets/img/user.png"
                       alt="">
                  <el-select v-model="accountValue"
                             @change="accountChange"
                             slot="append"
                             disabled
                             style="width:100px"
                             placeholder="">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </el-col>
            
            <el-col>

              <!-- 手机号验证码 -->
              <el-form-item prop="verification"
                            v-if="accountValue=='phone'">
                <el-input v-model="ruleForm.verification"
                          :placeholder="$t('register.输入收到的验证码')"
                          style="width:100%">
                  <img slot="prepend"
                       src="../../assets/img/validate.png"
                       alt="">
                  <template slot="append"><span @click="getphoneCode"
                          class="validate-number">{{codephoneMsg}}</span></template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col>

              <!-- 邮箱验证码-->
              <el-form-item prop="verification"
                            v-if="accountValue=='email'">
                <el-input v-model="ruleForm.verification"
                          :placeholder="$t('register.输入收到的验证码')"
                          style="width:100%">
                  <img slot="prepend"
                       src="../../assets/img/validate.png"
                       alt="">
                  <template slot="append"><span @click="getemailCode(ruleForm)"
                          class="validate-number">{{codemailMsg}}</span></template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col v-if="accountValue=='account'">
              <!-- 账号验证码 -->
              <el-form-item prop="accountVer">
                <el-input v-model="ruleForm.accountVer"
                          :placeholder="$t('register.输入验证码')"
                          class="ver"
                          style="width:100%">
                  <img slot="prepend"
                       src="../../assets/img/validate.png"
                       alt="">
                  <template slot="append">
                    <div :class="metauth?'auth':'auth2'"
                         @click="auth2"
                         ref="reg">
                      <i>{{ruleForm.num[0]}}</i>
                      <i>{{ruleForm.num[1]}}</i>
                      <i>{{ruleForm.num[2]}}</i>
                      <i>{{ruleForm.num[3]}}</i>
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item prop="password">
              <img src="../../assets/img/paw.png" alt="" class="acctive">
                <el-input v-model="ruleForm.password"
                          :placeholder="$t('register.输入6-8个字符的密码')"
                          type="password"
                          style="position:relative;padding:0 35px 0 35px"
                          :type="passwordType">
                </el-input>
                <span class="show-pwd"
                          style="position:absolute;right:12px;top:8px;color:#dfdfdf"
                          @click="showPwd">
                      <i :class="eyeIcon"></i>
                </span>
              </el-form-item>
              
            </el-col>
            <el-col>
              <el-form-item prop="repas" class="name">
                <img src="../../assets/img/paw.png" alt="" class="acctive">
                <el-input v-model="ruleForm.repas" :placeholder="$t('login.再次输入密码')" 
                type="password"
                style="position:relative;padding:0 35px 0 35px"
                :type="passwordType"
                ></el-input>
                <span class="show-pwd"
                    style="position:absolute;right:12px;top:8px;color:#dfdfdf"
                    @click="showPwd">
                <i :class="eyeIcon"></i>
                </span>
            </el-form-item>
            </el-col>
            <el-col>

              <el-form-item prop="secondpassword"
                            v-if="accountValue=='account'">
                <el-input v-model="ruleForm.secondpassword"
                          type="password"
                          :placeholder="$t('register.输入二级密码(忘记密码时使用)')"
                          style="width:100%">
                  <img slot="prepend"
                       src="../../assets/img/password.png"
                       alt="">

                </el-input>
              </el-form-item>
            </el-col>
            <el-col>

              <el-form-item style="margin-bottom:0px;">
                <p><span style=" cursor: pointer;"
                        @click="backLogin">{{$t('register.返回登录')}}</span></p>
              </el-form-item>
            </el-col>
            <el-col>

              <el-form-item>
                <el-button class="button"
                           @click="registerSubmit">{{$t('register.注册')}}</el-button>
              </el-form-item>
            </el-col>
          </el-form>

        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    var checkAccount = (rule, value, callback) => {
      var codemailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      var checkPhone =/^1[3|4|5|7|8][0-9]\d{8}$/
      if (this.accountValue == 'email' && value === '') {
        callback(new Error(this.$t('register.请输入邮箱')));
      } else if (this.accountValue == 'email' && !codemailReg.test(value)) {
        callback(new Error(this.$t('register.邮箱格式不正确')));
      } else if (this.accountValue == 'email' && value.length > 50) {
        callback(new Error(this.$t('register.邮箱不超过50位')));
      } else if (this.accountValue == 'phone' && value === '') {
        callback(new Error(this.$t('register.请输入手机号')));
      } else if (this.accountValue == 'phone' && !checkPhone.test(value)) {
        callback(new Error(this.$t('register.请输入正确的手机号')));
      } else if (this.accountValue == 'account' && value === '') {
        callback(new Error(this.$t('register.请输入普通账号')));
      } else if (this.accountValue == 'account' && (value.length < 4 || value.length > 10)) {
        callback(new Error(this.$t('register.普通账号为4-10位')));
      } else {
        callback();
      }
    };
    var repas2 = (rule, value, callback) => {

      if (value === '') {
        callback(new Error(this.$t('login.再次输入密码')));
      } else if (value !== this.ruleForm.password) {
        callback(new Error(this.$t('login.两次输入密码不一致')));
      } else {
        callback();
      }

    };
    var checkVerCode = (rule, value, callback) => {
      if (value == '') {
        callback(new Error(this.$t('register.请输入验证码')));
      } else if (value !== this.ruleForm.num) {
        callback(new Error(this.$t('register.验证码错误')));
      } else if (value.length > 4) {
        callback(new Error(this.$t('register.验证码不超过4位')));
      } else {
        callback();
      }
    };
    var checkVerPsw = (rule, value, callback) => {
      if (value == '') {
        callback(new Error(this.$t('register.请输入密码')));
      } else if (value.length < 6 || value.length > 8) {
        callback(new Error(this.$t('register.密码为6-8位')));
      } else {
        callback();
      }
    };
    var checkSecondpassword = (rule, value, callback) => {
      if (value == '') {
        callback(new Error(this.$t('register.请输入二级密码')));
      } else if (value.length < 6 || value.length > 8) {
        callback(new Error(this.$t('register.二级密码为6-8位')));
      } else {
        callback();
      }
    };
    var checkVerification = (rule, value, callback) => {
      // console.log(this.$md5(this.ruleForm.verification))
      if (value == '') {
        callback(new Error(this.$t('register.请输入您收到的验证码')));
      } else if (this.$md5(this.ruleForm.verification) != this.emailValCode && this.accountValue == 'email') {
        callback(new Error(this.$t('register.验证码错误')));
      } else if (this.$md5(this.ruleForm.verification) != this.phoneValCode && this.accountValue == 'phone') {
        callback(new Error(this.$t('register.验证码错误')));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: '',
        verification: '',
        accountVer: '',
        num: '',
        password: '',
        secondpassword: '',
        repas:''
      },
      options: [{
        value: 'email',
        label: this.$t('register.邮箱')
      }, {
        value: 'phone',
        label: this.$t('register.手机号')
      }, {
        value: 'account',
        label: this.$t('maininfo.账号')
      }],
      accountValue: 'email',
      // 倒计时秒数
      countdown: 60,
      // 按钮上的文字
      codemailMsg: this.$t('register.获取验证码'),
      // 倒计时秒数
      countdown1: 60,
      countdown2: 1,
      // 按钮上的文字
      codephoneMsg: this.$t('register.获取验证码'),
      // 是否禁用按钮
      codeDisabled: false,
      // 定时器
      timer: null,
      // 定时器
      timer1: null,
      metauth: false,
      placehold: this.$t('register.输入邮箱'),
      rules: {
        account: [
          { validator: checkAccount, trigger: ['blur', 'change'] },
        ],
        accountVer: [
          { validator: checkVerCode, trigger: ['blur', 'change'] },
        ],
        password: [
          { validator: checkVerPsw, trigger: ['blur', 'change'] },
        ],
        repas: [
          { validator: repas2, trigger: ['blur', 'change'] },
        ],
        secondpassword: [
          { validator: checkSecondpassword, trigger: ['blur', 'change'] }
        ],
        verification: [
          { validator: checkVerification, trigger: ['blur', 'change'] }
        ]
      },
      // 注册页logo
      registerLogo: '',
      emailValCode: '',
      phoneValCode: '',
      passwordType:'password',
      eyeIcon: 'iconfont icon-biyan',

    }
  },
  created () {
    if(sessionStorage.oo_id){
        this.global.ws.send(JSON.stringify({ "action_type": "loginOut",id:sessionStorage.oo_id}));
        sessionStorage.clear()
      }
    this.$axios.post('/Home/getLogo?lang=' + sessionStorage.lang, qs.stringify({ logoType: 'normal' })).then(res => {
      console.log(res)
      this.registerLogo = res.data.data.normalLogo
    })
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
    //点击验证码
    auth2 () {
      this.metauth = true
      this.rao()
      this.auth()
    },
    rao () {
      this.$nextTick(() => {
        var reg = this.$refs.reg
        console.log(reg)
        var regchildren = reg.children
        for (let i = 0; i < regchildren.length; i++) {
          var dg = parseInt(Math.random() * 100)
          regchildren[i].style.transform = "rotate(" + dg + "deg)"
        }
      })
    },
    auth () {
      this.rao()
      const auth = []
      var a = ''
      for (let i = 0; i < 4; i++) {
        const num = parseInt(Math.random() * 10)
        auth.push(num)
      }
      for (let key in auth) {
        a += auth[key]
      }
      this.ruleForm.num = a
    },
    accountChange (e) {
      console.log(e)
      this.ruleForm.account = ''
      if (e == 'phone') {
        this.placehold = this.$t('register.输入手机号')

      } else if (e == 'email') {
        this.placehold = this.$t('register.输入邮箱')
      } else if (e == 'account') {
        this.placehold = this.$t('register.输入普通账号')
      }
    },
    // 验证码
    getemailCode (ruleForm) {
      if(this.ruleForm.account == ''){
        this.$message({
              message: this.$t('register.邮箱不能为空'),
              type: 'error'
            })
            return
      }
      if (this.countdown == 60) {
        this.$axios.post('/Home/sendEmailRegCode?lang=' + sessionStorage.lang, qs.stringify({ email: this.ruleForm.account })).then(res => {
          if (res.data.status == 1) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.emailValCode = res.data.code
            // console.log(this.$md5(this.ruleForm.verification))

          } else if (res.data.status == 0) {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
            this.countdown2 = 0
          } else if (res.data.status == 9) {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
            this.$router.push('/login')
          }
        })
      }
      // 验证码60秒倒计时
      if (!this.timer) {
        this.timer = setInterval(() => {
          console.log(this.countdown2)
          if (this.countdown > 0 && this.countdown <= 60 &&this.countdown2 == 1) {
            this.countdown--;
            if (this.countdown !== 0) {
              this.codemailMsg = this.$t('register.重新发送') + "(" + this.countdown + ")";

            } else {
              clearInterval(this.timer);
              this.codemailMsg = this.$t('register.获取验证码');
              this.countdown = 60;

            }
          }
        }, 1000)
      }
    },
    // 验证码
    getphoneCode () {
      if(this.ruleForm.account == ''){
        this.$message({
              message: this.$t('register.手机号不能为空'),
              type: 'error'
            })
            return
      }
      if (this.countdown1 == 60) {

        this.$axios.post('/Home/sendPhoneRegCode?lang=' + sessionStorage.lang, qs.stringify({ email: this.ruleForm.account })).then(res => {
          if (res.data.status == 1) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.phoneValCode = res.data.code

          } else if (res.data.status == 0) {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
            this.countdown2 = 0
          } else if (res.data.status == 9) {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
            this.$router.push('/login')
          }
        })
      }
      // 验证码60秒倒计时
      if (!this.timer1) {
        this.timer1 = setInterval(() => {
          if (this.countdown1 > 0 && this.countdown1 <= 60 &&this.countdown2 == 1) {
            this.countdown1--;
            if (this.countdown1 !== 0) {
              this.codephoneMsg = this.$t('register.重新发送') + "(" + this.countdown1 + ")";
            } else {
              clearInterval(this.timer1);
              this.codephoneMsg = this.$t('register.获取验证码');
              this.countdown1 = 60;
              this.timer1 = null;
            }
          }
        }, 1000)
      }
    },
    // 返回登录
    backLogin () {
      this.$router.push('/login')
    },
    // 注册提交
    registerSubmit () {
      var form = {}
      if (this.accountValue == "email") {
        form = {
          email: this.ruleForm.account,
          password: this.ruleForm.password,
          verification: this.ruleForm.verification,
          regType: '1',
        }

      } else if (this.accountValue == "phone") {
        form = {
          email: this.ruleForm.account,
          password: this.ruleForm.password,
          verification: this.ruleForm.verification,
          regType: '2',
        }
      } else if (this.accountValue == "account") {
        form = {
          email: this.ruleForm.account,
          password: this.ruleForm.password,
          regType: '3',
          accountVer: this.ruleForm.accountVer,
          secondpassword: this.ruleForm.secondpassword
        }

      }
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$axios.post('/Home/register?lang=' + sessionStorage.lang, qs.stringify(form)).then(res => {
            console.log(res)
            if (res.data.status == 1) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.$router.push('/login')
            } else if (res.data.status == 0) {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            } else if (res.data.status == 9) {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
              this.$router.push('/login')
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
}
</script>
<style>
.register input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #818181;
}
.register input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #818181;
}
.register input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #818181;
}
.register input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #818181;
}
.register .content .el-input-group__prepend {
  padding: 0 8px 0 10px !important;
  color: #818181;
}

.register .content .el-input-group__append {
  padding: 0 10px 0 0 !important;
  color: #818181;
}
.register .content .validate-number {
  color: #3068cc;
  cursor: pointer;
  font-size: 16px;
}
.register .content .ver .el-input-group__append {
  padding: 0px !important;
  height: 36px;
  /* vertical-align: bottom;  */
}
.register .content .el-form-item__error {
  color: #f55f5f;
  font-size: 18px;
  line-height: 10px;
  height: 20px;
  float: right;
  width: fit-content;
  padding-left: 31px;
  position: absolute;
  top: 38%;
  left: 130%;
  background: url("../../assets/img/no.png") no-repeat;
}
.register .el-input-group__append div.el-select .el-input__inner{
  font-size: 16px;
  color:#3068cc
}
</style>

<style lang="less" scoped >
.acctive{
    position: absolute;
    top: 12px;
    left: 0;
    width: 22px;
    height: 23px;
    margin-left: 10px
}
.show-pwd i {
        width: 24px;
        height: 24px;
        color:#000
    }
.register {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right,#1CB3DE, #000851);
  box-sizing: border-box;
  position: relative;
  .content {
    width: 500px;
    background: #fff;
    /* margin: 0 auto; */
    border-radius: 2px;
    padding: 60px 87px;
    color: #fff;
    box-sizing: border-box;
    position: absolute;
    top: calc(50% - 307px);
    left:calc(50% - 250px);
    .logo {
      text-align: center;
      img {
        width: 134px;
        height: 77px;
      }
    }
    .info {
      padding-top: 20px;
      p {
        height: 46px;
        line-height: 28px;
        text-align: right;
        color: #3068cc;
        font-size: 16px;
      }
      .button {
        width: 325px;
        height: 46px;
        background: linear-gradient(to right,#1CB3DE, #000851);
        border: none;
        font-size: 18px;
        color: #fff;
      }
      .ver {
        .auth {
          width: 100px;
          height: 36px;
          line-height: 36px;
          background-color: rgba(0, 0, 0, 0.5);
          /* border-radius: 5px; */
          z-index: 10;
          color: #fff;
          padding: 0 0 0 20px
        }
        .auth2 {
          width: 100px;
          height: 36px;
          line-height: 36px;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 10;
          color: #fff
        }
      }
    }
  }
}
</style>