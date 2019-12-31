<template>
  <div class="soundset">
    <el-row>
      <p>{{$t('maininfo.修改声音')}}</p>
      <el-col class="sound-main">
        <p><span>{{$t('maininfo.声音')}}</span>
          <el-switch class="switch"
                     v-model="switchValue1"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </p>
        <p><span>{{$t('maininfo.群声音')}}</span>
          <el-switch class="switch"
                     v-model="switchValue2"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </p>
        <p><span>{{$t('maininfo.提示音')}}</span>
          <el-select v-model="soundValue"
                     :placeholder="$t('maininfo.请选择')">
            <el-option v-for="item in soundOptions"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
        </p>
      </el-col>

      <el-col class="sound-bottom">
        <el-button size="mini" type="primary" @click="submitChange">{{$t('maininfo.立即修改')}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {

    return {
      switchValue1: true,
      switchValue2: true,
      soundValue: '',
      soundOptions: [],
      soundFriend: '',
      soundGroup: '',
    }
  },
  created () {
    this.handdleMsg()
    if(this.global.inpage() == 0){
      this.$router.push('/login')
    }
    
  },
  methods: {
    handdleMsg(msg) {
        let that = this;
        
        if (that.global.ws && that.global.ws.readyState == 1) {
            console.log("发送信息", msg);
            //  登陆成功后更改自身状态
            var msg_obj = { "action_type": "admin_sound_setting", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token};
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
                    that.switchValue1 = data.data.soundFriend
                    that.switchValue2 = data.data.soundGroup
                    that.soundValue = data.data.soundValue
                    that.soundOptions = data.data.sound
                    console.log(that.switchValue2)
            }
        };
    },
    submitChange () {
      let that = this
      var msg_obj = { "action_type": "admin_save_sound_setting", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,soundValue:that.soundValue,soundFriend:that.switchValue1,soundGroup:that.switchValue2};
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
              that.$message({
                  message: data.msg,
                  type: 'success'
              });
          }
      };
    }
  },
};
</script>
<style>
.soundset .sound-main p .el-select {
  width: 50%;
}
.soundset .sound-main p .el-select .el-input__inner {
  color: #818181;
}
</style>
<style scoped lang="less">
.soundset {
  height: 100%;
  width: 100%;
  border-radius: 10px 10px 0 0;
  background-color: #fff;
  .el-row {
    text-align: center;
    height: 100%;
    width: 100%;
    padding: 12% 0 50px 0;
    p {
      font-size: 30px;
      color: #060606;
    }
    .sound-main.el-col {
      text-align: center;
      padding-top: 34px;
      p {
        font-size: 18px;
        width: 326px;
        margin: auto;
        height: 66px;
        padding: 0 20px;
        line-height: 66px;
        border-bottom: 1px solid #d5d9de;
        display: flex;
        justify-content: space-between;
        .switch.el-switch {
          height: 66px;
          line-height: 66px;
        }
      }
    }
    .sound-bottom {
      padding-top: 10%;
      .el-button {
        // width: 108px;
        color: #fff;
      }
    }
  }
}
</style>