<template>
  <el-row class="selfset">
    <el-col class="self-main">
      <!-- <img :src="image"
           alt=""> -->
      <div class="touxiang">
        <p><span><img :src="editImage"
                  alt=""><i @click="toggleShow"
                class="el-icon-edit-outline"
                style="cursor:pointer;"></i></span></p>
      </div>
      <div class="personal">
        <span>账号</span>
        <span>{{email}}</span>
      </div>
      <el-form class="personal">
        <el-form-item label="名字" prop="name">
        </el-form-item>
        <el-input v-model="name" class="inputdata"></el-input>
      </el-form>
      <el-form class="personal">
        <el-form-item label="性别">
        </el-form-item>
        <el-select v-model="value" placeholder="请选择" class="selectdata">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form>
      <el-form class="personal">
        <el-form-item label="地区">
        </el-form-item>
        <el-input v-model="address" class="inputdata"></el-input>
      </el-form>
      <el-form class="personal">
        <el-form-item label="个性签名">
        </el-form-item>
        <el-input v-model="sign" class="inputdata"></el-input>
      </el-form>
      <el-form class="queding">
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-col>
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
  </el-row>
</template>
<script>
import qs from 'qs'
import myUpload from 'vue-image-crop-upload'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState([
      'chatlist',
      'oo_avatar'
    ])
  },
  components: {
    'my-upload': myUpload
  },
  data () {
    return {
      image:'',
      name:'',
      email:'',
      value:'',
      address:'',
      sign:'',
      options:[],
      radio: '0',
      show: false,
      uploadUrl: '',
      editImage: '',
      address: '',
      sign: '',
      params: {
        token: sessionStorage.oo_token,
        name: 'avatar'
      },
    }
  },
  created () {
    // this.getSelfList()
    this.handdleMsg()
    if(this.global.inpage() == 0){
      this.$router.push('/login')
    }
  },
  methods: {
    //确定修改
    onSubmit(){
      if(this.name == ''){
        this.$message({
            message: this.$t('maininfo.名字不能为空'),
            type: 'error'
        });
        return
      }
      let that = this
      var msg_obj = { "action_type": "admin_save_setting", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,'username':that.name,'address':that.address,'sign':that.sign,'sex':that.value,'img':that.editImage};
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
                    sessionStorage.setItem('oo_avatar', that.editImage)
                    sessionStorage.setItem('oo_username', that.name)
                    that.$store.state.oo_avatar = that.editImage
                    that.$store.state.oo_username = that.name
                    console.log(that.$store.state.oo_avatar)
                        // that.email = data.data.email
                        // that.name = data.data.username
                        // that.options = data.data.sexList
                        // that.value = data.data.sex
                        // that.editImage = data.data.image
                        // that.address = data.data.address
                        // that.sign = data.data.sign
                        
                        
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
    handdleMsg(msg) {
            let that = this;
            
            if (that.global.ws && that.global.ws.readyState == 1) {
                console.log("发送信息", msg);
                //  登陆成功后更改自身状态
                var msg_obj = { "action_type": "admin_query_setting", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token};
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
                        that.email = data.data.email
                        that.name = data.data.username
                        that.options = data.data.sexList
                        that.value = data.data.sex
                        that.editImage = data.data.image
                        that.address = data.data.address
                        that.sign = data.data.sign
                        
                        
                }
            };
        },
    // getSelfList () {
    //   this.$axios.post('/updateInfomation?lang=' + sessionStorage.lang, qs.stringify({
    //     'token': sessionStorage.token,
    //     'action': 'read'
    //   })).then(res => {
    //     if (res.data.status == 1) {
    //       this.Info = res.data.data
    //     } else if (res.data.status == 0) {
    //       this.$message({
    //         type: 'error',
    //         message: res.data.msg
    //       })
    //     } else if (res.data.status == 9) {
    //       this.$message({
    //         type: 'error',
    //         message: res.data.msg
    //       })
    //       this.$router.push('/login')
    //     }
    //   })
    // },
    // 修改个人资料
    informEdit () {
      this.dialogVisible = true
      this.disabled = true
      this.name = this.Info.username
      this.radio = this.Info.sex
      this.editImage = this.Info.image
      this.address = this.Info.address
      this.sign = this.Info.sign
    },

    confirmName () {
      this.disabled = true
      this.editShow = true
    },
    confirmSign () {
      this.disabledSign = true
      this.editShowSign = true
    },
    confirmAddress () {
      this.disabledAddress = true
      this.editShowAddress = true
    },
    editname () {
      this.disabled = false
      this.editShow = false
    },
    editSign () {
      this.disabledSign = false
      this.editShowSign = false
    },
    editAddress () {
      this.disabledAddress = false
      this.editShowAddress = false
    },
    toggleShow () {
      this.show = !this.show;
      var domain = (process.env.API_ROOT != '') ? process.env.API_ROOT : (window.location.host + '/')
      var domainname = window.location.protocol
      this.uploadUrl = domainname + '//' + domain + 'OONew/index.php/Home/uploadHeadImage?lang=' + sessionStorage.lang
      console.log(domainname)
    },


    cropSuccess (imgDataUrl, field) {
      console.log('-------- crop success --------');
      this.editImage = imgDataUrl;
    },

    cropUploadSuccess (jsonData, field) {
      console.log('-------- upload success --------');
      console.log(jsonData);
      this.editImage = jsonData.img;
      // sessionStorage.setItem("avatar", jsonData.img);
      console.log('field: ' + field);
    },

    cropUploadFail (status, field) {
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    },
    // 修改个人资料提交
    // editSubmit () {
    //   this.$axios.post('/updateInfomation?lang=' + sessionStorage.lang, qs.stringify({
    //     'token': sessionStorage.token,
    //     'action': 'save',
    //     'username': this.name,
    //     'sex': this.radio,
    //     'img': this.editImage,
    //     'sign': this.sign,
    //     'address': this.address
    //   })).then(res => {
    //     if (res.data.status == 1) {
    //       this.$message({
    //         type: 'success',
    //         message: res.data.msg
    //       })
    //       this.dialogVisible = false
    //       sessionStorage.image = this.editImage
    //       sessionStorage.avatar = this.editImage
    //       sessionStorage.username = this.name;
    //       // location.reload()
    //       this.getSelfList()
    //     } else if (res.data.status == 0) {
    //       this.$message({
    //         type: 'error',
    //         message: res.data.msg
    //       })
    //     } else if (res.data.status == 9) {
    //       this.$message({
    //         type: 'error',
    //         message: res.data.msg
    //       })
    //       this.$router.push('/login')
    //     }
    //   })
    // },
    // 退出登录
    // Logout () {
    //   if (this.checked) {
    //     this.$router.push('/login')
    //     localStorage.clear()
    //     sessionStorage.clear()
    //     this.$store.state.chatlist = []
    //     this.$cookie.delCookie('user');
    //   } else {
    //     sessionStorage.removeItem('token')
    //     this.$router.push('/login')
    //   }
    // }
  },
};
</script>
<style>
.selfset .dialog-content .el-radio__input.is-checked .el-radio__inner {
  border-color: #52d68d;
  background: #52d68d;
}
.selfset .dialog-content .el-radio__inner:hover {
  border-color: #409eff;
}
.selfset .dialog-content .el-radio {
  margin-right: 6px;
}
.selfset .dialog-content .name .el-input {
  width: 50%;
  border-bottom: none;
  height: 36px;
  line-height: 33px;
  /* border: 1px solid #dcdfe6; */
  margin-left: 126px;
  text-align: right;
}

.selfset .dialog-content .name .el-input.disable {
  border: 1px solid #dcdfe6;
  border-radius: 10px;
}
.selfset .dialog-content .name .el-input.disable .el-input__inner {
  color: #060606;
}
.selfset .dialog-content .el-input--mini .el-input__inner {
  border-bottom: 0;
  color: #818181;
  width: 96% !important;
  height: 36px;
  line-height: 36px;
  text-align: right;
}
.selfset .self-bottom .el-checkbox__label {
  font-size: 18px !important;
}
.selfset .self-bottom .el-checkbox__inner::after {
  height: 10px;
  left: 6px;
  top: 1px;
  width: 4px;
}
.selfset .self-bottom .el-checkbox {
  color: #818181;
}
.selfset .self-bottom .el-checkbox__inner:hover {
  border-color: #52d68d;
}
.selfset .el-dialog .el-input.is-disabled .el-input__inner {
  background-color: #fff;
}
.selfset .self-bottom .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #52d68d;
  border-color: #52d68d;
}
.selfset .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #818181;
}
.selfset .self-bottom .el-checkbox__inner {
  width: 18px;
  height: 18px;
}
.selfset .el-dialog .el-dialog__body {
  padding: 0px 20px;
}
.selfset .el-dialog .el-dialog__header {
  background-color: #dfdfdf;
  text-align: left;
  padding: 0 0 0 20px;
}
.selfset .el-dialog .el-dialog__title {
  height: 38px;
  line-height: 38px;
  color: #060606;
}
.selfset .inputdata .el-input__inner{
  text-align: right!important
}
.personal .el-form-item__label{
  line-height: 50px
}
.personal .el-input--suffix .el-input__inner{
  padding-right:0!important
}
</style>
<style scoped lang="less">
.selfset {
  width: 100%;
  height: 100%;
  background-color: #fff;
  text-align: center;
  padding: 5% 0 5% 0;
  box-sizing: border-box;
  .self-main {
    img {
      width: 136px;
      height: 136px;
      border-radius: 50%;
    }
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
    .information {
      color: #060606;
      font-size: 16px;
      margin-top: 10px;
      i {
        padding-left: 4px;
        cursor: pointer;
      }
    }
  }
  .self-bottom {
    padding-top: 6%;
    box-sizing: border-box;
    .el-button {
      // width: 108px;
      color: #fff;
      background-color: #52d68d;
      font-size: 18px;
      margin-top: 14px;
      border-radius: 10px;
    }
  }
  .dialog-content {
    width: 100%;
    height: 100%;
    text-align: left;
    font-size: 18px;
    color: #060606;
    p {
      border-bottom: 2px solid #eeeeee;
      height: 64px;
      line-height: 64px;
    }
    .name {
      i {
        cursor: pointer;
      }
    }
    .account {
      span {
        color: #818181;
        // margin-left: 224px;
      }
    }
    .sex {
      span {
        margin-left: 238px;
      }
    }
    .sign {
      i {
        cursor: pointer;
      }
    }
  }
  .touxiang {
      p {
        width: 136px;
        margin: auto;
        position: relative;
        margin-bottom: 20px;
        img {
          width: 136px;
          // margin: 0 17px 0 246px;
          border-radius: 50%;
        }
        i{
          position: absolute;
          bottom: -5px;
          right: 0px;
          font-size: 24px;
        }
      }
    }
  .dialog-footer {
    display: inline-block;
    padding-top: 28px;
    .el-button {
      font-size: 18px;
      border-radius: 10px;
    }
    .el-button--primary {
      background-color: #52d68d;
      color: #fff;
      border-color: #52d68d;
    }
    .el-button--mini,
    .el-button--mini.is-round {
      padding: 5px 15px;
    }
  }
}
.personal{
  border-bottom: 1px solid #d5d9de;
  margin: 0 50px;
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
}
.inputdata{
  width: 70%!important;
  text-align: right!important
}

.selectdata{
  width: 25%!important;
  text-align: right
}
.queding{
  margin-top: 20px;
}
</style>