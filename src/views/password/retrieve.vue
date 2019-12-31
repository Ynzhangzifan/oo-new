<template>
    <div class="retrieve">
        <div class="center">
            <div class="logo">
                <img :src="registerLogo"
                    alt="">
                <p class="retrieves">{{$t('login.找回账号密码')}}</p>
            </div>
            <el-form :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    class="demo-ruleForm">
            <el-form-item prop="name" class="name">
                <img src="../../assets/img/name.png" alt="" class="acction">
                <el-input v-model="ruleForm.name" :placeholder="$t('login.请输入手机号/邮箱')"></el-input>
            </el-form-item>
            <el-form-item prop="newpas2" class="name">
                <img src="../../assets/img/paw.png" alt="" class="acctive">
                <el-input v-model="ruleForm.newpas2" :placeholder="$t('login.请输入新密码')" 
                type="password"
                style="position:relative"
                :type="passwordType"
                ></el-input>
                <span class="show-pwd"
                    style="position:absolute;right:12px;top:8px;color:#dfdfdf"
                    @click="showPwd">
                <i :class="eyeIcon"></i>
                </span>
            </el-form-item>
            <el-form-item prop="repas" class="name">
                <img src="../../assets/img/paw.png" alt="" class="acctive">
                <el-input v-model="ruleForm.repas" :placeholder="$t('login.再次输入密码')" 
                type="password"
                style="position:relative"
                :type="passwordType"
                ></el-input>
                <span class="show-pwd"
                    style="position:absolute;right:12px;top:8px;color:#dfdfdf"
                    @click="showPwd">
                <i :class="eyeIcon"></i>
                </span>
            </el-form-item>
            </el-form>
            <el-button class="but" @click.native.prevent="logins">{{$t('login.确定')}}</el-button>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        var newpas2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('login.请输入新密码')));
        if (!value) {
          return callback(new Error(this.$t('login.不能为空')));
        } else {
          callback()
        }
      };
    }
    var newpas2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('login.请输入新密码')));
      } else {
        const pwdReg = new RegExp(this.pwdReg)
        const exp = pwdReg.test(value)
        console.log(exp)
        if (!exp) {
          callback(new Error(this.pwdRegMsg));
        } else {
          callback()
        }
      }
    };
    var repas2 = (rule, value, callback) => {

      if (value === '') {
        callback(new Error(this.$t('login.再次输入密码')));
      } else if (value !== this.ruleForm.newpas2) {
        callback(new Error(this.$t('login.两次输入密码不一致')));
      } else {
        callback();
      }

    };
        return{
            registerLogo:'',
            ruleForm: {
                name:'',
                newpas2:'',
                repas:'',
                checked:false,
                suffix:'',
            },
             rules:{
                  name: [
                    { required: true, message:this.$t('login.请输入您的账号') , trigger: 'blur' },
                    { min: 3, max: 20, message: this.$t('login.长度在3到20个字符') , trigger: 'blur' }
                ],
                newpas2:[
                    { required: true,  validator: newpas2, trigger: 'blur' },
                    { min: 3, max: 20, message: this.$t('login.长度在3到20个字符'), trigger: 'blur' }
                ],
                repas:[
                    { required: true,  validator: repas2, trigger: 'blur' },
                    { min: 3, max: 20, message: this.$t('login.长度在3到20个字符'), trigger: 'blur' }
                ],
            },
            passwordType:'password',
            eyeIcon: 'iconfont icon-biyan',
        }
    },
    methods:{
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
        getRouterData() {
            this.ruleForm.name = this.$route.params.name
            console.log(this.ruleForm.name)
        },
        logins(){
            if(this.ruleForm.newpas2==this.ruleForm.repas){
                  this.$axios.post('/Home/saveForPwd?lang=zh-cn', qs.stringify({ email: this.ruleForm.name,secondpassword:this.ruleForm.repas,})).then(res => {
                console.log(res)
                if (res.data.status == 1) {
                        // this.$message({
                        //     message: res.data.msg,
                        //     type: 'success'
                        // });
                        this.$router.push('/revision')
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
            }
        }
    },
    created(){
        this.getRouterData()
        if(sessionStorage.oo_id){
            this.global.ws.send(JSON.stringify({ "action_type": "loginOut",id:sessionStorage.oo_id}));
            sessionStorage.clear()
        }
         this.$axios.post('/Home/getLogo?lang=zh-cn', qs.stringify({ logoType: 'mini' })).then(res => {
        console.log(res)
        this.registerLogo = res.data.data.normalLogo
        })
    }
}
</script>
<style scoped lang="less">
    .but{
        width: 325px;
        height: 46px;
        background: linear-gradient(to right,#1CB3DE, #000851);
        border: none;
        border-radius: 8px;
        margin-top: 20px;
        font-size: 20px;
        color: #fff
    }
    .show-pwd i {
        width: 24px;
        height: 24px;
        color:#000
    }
    .retrieve{
        background: linear-gradient(to right,#1CB3DE, #000851);
        height: 100%;
        box-sizing: border-box;
        position: relative;
    }
    .center{
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
    }
    .logo {
      text-align: center;
      img {
        width: 134px;
        height: 77px;
      }
    }
    .retrieves{
        color: #3068cc;
        margin: 25px 0;
        font-size: 20px;    
    }
    .acction{
        position: absolute;
        top: 12px;
        left: 0;
        width: 22px;
        height: 23px;
        margin-left: 10px
    }
    .acctive{
        position: absolute;
        top: 12px;
        left: 0;
        width: 22px;
        height: 23px;
        margin-left: 10px
    }
</style>
<style>
    .demo-ruleForm .el-input__inner{
        background: rgba(0, 0, 0, 0);
        border: none;
        border-bottom: 1px solid #fff;
        border-radius: 0;
        position: relative;
        padding-left: 40px;
        color: #818181;
        font-size: 18px;
    }
    .retrieve input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #818181;
}
.retrieve input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #818181;
}
.retrieve input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #818181;
}
.retrieve input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #818181;
}
</style>

