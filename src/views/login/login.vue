<template>
  <div class="login">
    <div class="center"
         style="position:relative;">
      <div class="center-top">
        <img :src="img"
             alt=""
             class="img">
        <div> <img :src="national?flagpic:flagpic2"
               alt=""
               style="width:24px;height:24px;position:absolute;top:84px;right:185px">
        </div>
        <el-dropdown trigger="click"
                     @command="handleClick"
                     class="switch">
          <span class="el-dropdown-link china">
            {{$t('login.中(简)')}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="CN">{{$t('login.中(简)')}}</el-dropdown-item>
            <el-dropdown-item command="EN">{{$t('login.英文')}}</el-dropdown-item>
            <el-dropdown-item command="TW">{{$t('login.中(繁)')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-tabs v-model="activeName"
               @tab-click="handleClick1"
               class="label">
        <el-tab-pane :label="$t('login.账号登录')"
                     name="first"
                     class="first">
          <el-form :model="ruleForm"
                   :rules="rules"
                   ref="ruleForm"
                   class="demo-ruleForm">
            <el-form-item prop="name"
                          class="name">
              <img src="../../assets/img/name.png"
                   alt=""
                   class="acction">
              <el-input v-model="ruleForm.name"
                        :placeholder="$t('login.请输入手机号/邮箱/普通账号')"
                        v-if="types==1"></el-input>
            </el-form-item>
            <el-form-item prop="paw"
                          class="name">
              <img src="../../assets/img/paw.png"
                   alt=""
                   class="acctive">
              <el-input v-model="ruleForm.paw"
                        id="password"
                        :placeholder="$t('login.请输入密码')"
                        type="password"
                        style="position:relative"
                        :type="passwordType"></el-input>
              <span class="show-pwd"
                    style="position:absolute;right:12px;top:8px;color:#dfdfdf"
                    @click="showPwd">
                <i :class="eyeIcon"></i>
              </span>
              <p v-show="CapsLockShow"
                 style="height:22px;line-height:22px;color:#52d68a;float: right;">{{$t('login.大写键开启')}}</p>
            </el-form-item>
          </el-form>
          <div class="rem">
            <el-checkbox v-model="ruleForm.checked">{{remember}}</el-checkbox>
            <router-link to="/password"
                         tag="span">
              <span class="forget">{{forget}}</span>
            </router-link>
          </div>
          <el-button class="but"
                     @click.native.prevent="logins('ruleForm')">{{login}}</el-button>
          <router-link to="/register"
                       tag="p"
                       class="register">
            <p>{{register}}</p>
          </router-link>
        </el-tab-pane>
        <el-tab-pane :label="$t('login.扫码登录')"
                     name="second">
          <div class="scanning">
            <div id="qrcode"
                 ref="qrcode"
                 class="box info"></div>
          </div>
          <div class="scannings">
            <div>
              <img src="../../assets/img/Scan.png"
                   alt="">
            </div>
            <div>
              <p class="bottom">
                <span>{{$t('login.打开')}}</span>
                <span class="app">{{$t('login.手机app')}}</span>
              </p>
              <span class="sao">{{$t('login.扫一扫登录')}}</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
import QRCode from 'qrcodejs2'  // 引入qrcode
import qs from 'qs'
sessionStorage.setItem('lang','zh-cn')
import { mapState, } from 'vuex'
export default {

  data () {
    return {
      img: '',
      types: 1,
      activeName: 'first',
      ruleForm: {
        name: '',
        paw: '',
        checked: false,
        suffix: '',
      },
      // rules: null,
      rules: {
        name: [
          { required: true, message: this.$t('login.请输入您的账号'), trigger: 'blur' },
          { min: 3, max: 20, message: this.$t('login.长度在3到20个字符'), trigger: 'blur' }
        ],
        paw: [
          { required: true, message: this.$t('login.请输入密码'), trigger: 'blur' },
          { min: 3, max: 20, message: this.$t('login.长度在3到20个字符'), trigger: 'blur' }
        ],
      },
      passwordType: 'password',
      eyeIcon: 'iconfont icon-biyan',
      remember: this.$t('login.记住账号'),
      forget: this.$t('login.忘记密码'),
      login: this.$t('login.登录'),
      register: this.$t('login.立即注册'),
      flagpic: [],
      flagpic2: '',
      national: true,
      CapsLockShow: false,
      webSocket: null,
      url: '10.65.24.41:23426',
      types1: '给后台参数'
    }
  },
  computed: {
    ...mapState([
      'zt'
    ]),
    deflang () {
      return this.$store.state.deflang
    }
  },
  components: {
    QRCode: QRCode
  },
  methods: {
    qrcode () {
      let qrcode = new QRCode('qrcode', {
        width: 200,
        height: 200,
        text: 'http://rc.91skj.com/risk/public/index.php/receiveUP?' + this.str, // 需要二维码跳转的地址
      })
    },
    handleClick1 () {

    },
    // 大小写锁定
    detectCapsLock (event) {
      console.log(event)
      var e = event || window.event;
      var keyCode = e.keyCode || e.which; // 按键的keyCode
      var isShift = e.shiftKey || (keyCode == 16) || false; // shift键是否按住
      if (((keyCode >= 65 && keyCode <= 90) && !isShift) // Caps Lock 打开，且没有按住shift键
        || ((keyCode >= 97 && keyCode <= 122) && isShift)// Caps Lock 打开，且按住shift键
      ) {
        this.CapsLockShow = true
        // this.$message({
        //   message: '大写键开启',
        //   center: true,
        //   duration: 2000,
        // });
      } else {
        this.CapsLockShow = false

      }

    },
    handleClick (command) {
      console.log(command)
      if (command == 'CN') {
        this.changelang('zh-cn')
        // this.deflang = '中文'

      } else if (command == 'EN') {
        this.changelang('en-us')
        // this.deflang = 'English'
      } else if (command == 'TW') {
        // console.log(111)
        this.changelang('zh-tw')
        // this.deflang = '繁體'
      }
      location.reload()
      // this.load()
      // this.getloginList()
    },
    changelang (lang) {
      // console.log(3333)
      if (!sessionStorage.lang) {
        // localStorage.lang = 'zh-cn'
      }
      this.$i18n.locale = lang
      sessionStorage.lang = lang
      this.locale = lang

    },
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
    getloginList () {
      if(sessionStorage.oo_id){
        this.global.ws.send(JSON.stringify({ "action_type": "loginOut",id:sessionStorage.oo_id}));
        sessionStorage.clear()
      }
      this.$axios.post('Home/getLogo?lang=zh-cn', qs.stringify({
        'logoType': 'normal'
      })).then(res => {
        console.log(res.data)
        this.img = res.data.data.normalLogo
        // 小国旗
        if (sessionStorage.lang == 'zh-cn') {
          this.flagpic = res.data.data.cn
          console.log(this.flagpic)
        } else if (sessionStorage.lang == 'en-us') {
          this.flagpic = res.data.data.us
        } else if (sessionStorage.lang == 'zh-tw') {
          this.flagpic = res.data.data.tw
        }
        sessionStorage.setItem('systemname', res.data.data.system_name)
      })
    },
    logins (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.$axios.post('/Home/login?lang=' + sessionStorage.lang, qs.stringify({
              email: this.ruleForm.name,
              password: this.ruleForm.paw,
              device: 'pc'
            })).then(res => {
              console.log(res)
              if (res.data.status == 1) {
                sessionStorage.setItem('oo_token', res.data.token)
                sessionStorage.setItem('oo_username', res.data.username)
                sessionStorage.setItem('oo_email', this.ruleForm.name)
                sessionStorage.setItem('oo_image', res.data.img)
                sessionStorage.setItem('oo_avatar', res.data.img)
                sessionStorage.setItem('oo_secret_key', res.data.secret_key)
                sessionStorage.setItem('oo_id', res.data.id)
                sessionStorage.setItem('oo_statusNum', res.data.statusNum)
                // 账户名存到localStorage里面
                // localStorage.setItem('account', this.ruleForm.name)
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: 'success'
                });
                if (this.ruleForm.checked == true) {
                  // 拿到账户名
                  console.log(this.ruleForm.checked)
                  this.$cookie.setCookie('user', this.ruleForm.name, 7)
                }
                this.handdleMsg()
                this.$router.push('/message')
              } else if (res.data.status == 0) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: 'error'
                });

              }
              document.onkeydown = undefined;
              console.log(onkeydown)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
    handdleMsg(msg) {
      let that = this;
      console.log(that.global.ws);
      
      if (that.global.ws && that.global.ws.readyState == 1) {
        console.log("发送信息", msg);
        var msg_obj = { "action_type": "login", "id":sessionStorage.oo_id,token:sessionStorage.oo_token};
        var msg = JSON.stringify(msg_obj);
        that.global.ws.send(msg);
        
      }
      that.global.ws.onmessage = function(res) {
        
        var data = JSON.parse(res.data)
        if(data.status == 9){
            that.$router.push('/login')
        }else if(data.status == 0){
            this.$message({
                message: res.data.msg,
                type: 'error'
            });
        }
        console.log("收到服务器内容", data);
        // switch(data.action_type){
        //   case 'home_query_status':
        //   var zt = data.stateList
        //   console.log(that.$store.state.zt)
        //   sessionStorage.setItem('zt', JSON.stringify(zt))
        //   console.log('asd')
        //   break
        // }
      };
    }
  },
  mounted () {
    this.getloginList()
    this.qrcode()
  },
  created () {
    //读取cookie
    const account = this.$cookie.getCookie('user')
    if (account) {
      this.ruleForm.name = account
    }
    var _self = this;
    document.onkeydown = function (e) {

      var key = window.event.keyCode;

      if (key == 13 || key == 108) {

        _self.logins();

      }

    }
  },
  watch: {
    ruleForm: {
      handler (newVal) {
        document.getElementById('password').onkeypress = this.detectCapsLock

      },
      deep: true
    }
  }
}
</script>
<style scoped>
.login {
  background: linear-gradient(to right,#1CB3DE, #000851);
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.center {
  width: 500px;
  background: #fff;
  /* margin: 0 auto; */
  border-radius: 2px;
  padding: 60px 87px;
  color: #fff;
  box-sizing: border-box;
  position: absolute;
  top: calc(50% - 276px);
  left:calc(50% - 250px);
  color: #818181
}
.img {
  width: 134px;
  height: 77px;
}

.acction {
  position: absolute;
  top: 12px;
  left: 0;
  width: 22px;
  height: 23px;
  margin-left: 10px;
}
.acctive {
  position: absolute;
  top: 12px;
  left: 0;
  width: 22px;
  height: 23px;
  margin-left: 10px;
}
.rem {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}

.but {
  width: 325px;
  height: 46px;
  background: linear-gradient(to right,#1CB3DE, #000851);
  /* background: #3068cc; */
  border: none;
  border-radius: 2px;
  margin-top: 20px;
  font-size: 20px;
  color: #fff;
}
.register {
  color: #3068cc;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
}
.label {
  margin-top: 30px;
}
.switch {
  width: 132px;
  height: 32px;
  border: 1px solid #818181;
  margin-top: 20px;
  color: #818181;
  line-height: 32px;
  border-radius: 2px;
  cursor: pointer;
}
.center-top {
  display: flex;
  justify-content: space-between;
}
.china {
  padding-left: 45px;
}
.forget {
  cursor: pointer;
  color: #3068cc
}
.scanning {
  width: 230px;
  height: 230px;
  border: 1px solid #818181;
  border-radius: 2px;
  margin: auto;
}
.bottom {
  display: inline-block;
}
.scannings {
  text-align: center;
  margin-top: 10px;
}
.scannings div {
  display: inline-block;
  font-size: 16px;
}
.app {
  color: #3068cc;
}
</style>
<style>
.rem span {
  display: inline-block;
  font-size: 16px;
  color: #818181;
}
.first .el-input__inner {
  background: rgba(0, 0, 0, 0);
  border: none;
  border-bottom: 1px solid #fff;
  border-radius: 0;
  position: relative;
  padding-left: 40px;
  color: #818181;
  font-size: 18px;
}
.scanning #qrcode img {
  margin: 15px !important;
  border-radius: 2px;
}
.show-pwd {
  width: 20px;
  height: 20px;
}
.show-pwd i {
  width: 24px;
  height: 24px;
  color:#000
}
.china{
    font-size: 16px;
}
</style>
<style>
.login .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #3068cc;
}
.login .el-checkbox__input.is-checked .el-checkbox__inner {
  background: #3068cc;
  border: #3068cc;
}
.login .el-tabs__content{
  margin-top:30px;
}
.login input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #818181;
}
.login input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #818181;
}
.login input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #818181;
}
.login input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #818181;
}
</style>

