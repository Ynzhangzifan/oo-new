<template>
    <div class="revision">
        <div class="center">
            <div class="logo">
                <img :src="registerLogo"
                    alt="">
            </div>
            <img src="../../assets/img/true.png" alt="" class="trues">
            <p>{{$t('login.密码设置成功！')}}</p>
            <router-link to="/login" tag="p" class="register">
                <p >{{register}}</p>
            </router-link>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return{
            registerLogo:'',
            register:this.$t('login.立即登录')
        }
    },
    created(){
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
    .revision{
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
        padding: 60px 87px 160px 87px;
        color: #fff;
        box-sizing: border-box;
        position: absolute;
        top: calc(50% - 250px);
        left:calc(50% - 250px);
        text-align:center
    }
    .logo {
      text-align: center;
      img {
        width: 134px;
        height: 77px;
      }
    }
    .trues{
        width: 41px;
        height: 41px;
        margin-top: 40px;
        margin-bottom: 30px;
    }
    .center>p{
        font-size: 30px;
        color: #000
    }
    .register p{
        font-size: 16px;
        color: #0368cc;
        margin-top: 30px;
        cursor: pointer;
    }
</style>

