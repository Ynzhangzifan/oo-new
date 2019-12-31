<template>
    <div class="frist">
        <p style="text-align:right;height:86px;border-bottom:1px solid #ddd;padding:30px">
            <img @click="signout" src="../../assets/img/tuichu.png" alt="" class="sign">
        </p>
        <div class="ziliao">
            <p>欢迎，{{$store.state.oo_username}}</p>
            <div class="imgs">
                <img class="pic" :src="$store.state.oo_avatar" alt="">
                <div>
                    <img v-if="this.$store.state.zt == 1" src="../../assets/img/zaixian.png" alt="">
                    <img v-if="this.$store.state.zt == 2" src="../../assets/img/likai.png" alt="">
                    <img v-if="this.$store.state.zt == 3" src="../../assets/img/wurao.png" alt="">
                    <img v-if="this.$store.state.zt == 4" src="../../assets/img/yinshen.png" alt="">
                </div>
            </div>
            <div style="position:relative;width:200px;margin:auto">
                <div style="position: absolute;left:25px;top:11px" class="phota">
                    <img v-if="this.$store.state.zt == 1" src="../../assets/img/zaixian.png" alt="">
                    <img v-if="this.$store.state.zt == 2" src="../../assets/img/likai.png" alt="">
                    <img v-if="this.$store.state.zt == 3" src="../../assets/img/wurao.png" alt="">
                    <img v-if="this.$store.state.zt == 4" src="../../assets/img/yinshen.png" alt="">
                </div>
                <el-select v-model="value"
                        slot="append"
                        style="width:200px;border-bottom:1px solid #ddd;"
                        @change="zhuangtai">
                <el-option v-for="item in ztall"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                            <img class="avatar" :src="item.src" style="height:14px">
                            <span>{{item.name}}</span>
                </el-option>
                </el-select>
            </div>
            
        </div>
    </div>
</template>
<script>
import { mapState, } from 'vuex'
export default {
    data() {
        return {
            img:'',
            username:'',
            ztall:[],
            value:'',
        }
    },
    computed: {
        ...mapState([
        'zt',
        'oo_username',
        'oo_avatar',
        'numlist',
        'num',
        'contactslist',
        'contactslists',
        ]),
    },
    created(){
        this.username = sessionStorage.oo_username
        this.img = sessionStorage.oo_avatar
        // console.log(this.username)
        // if(this.$store.state.zt == 1){
        //     this.value = '在线'
        // }else if(this.$store.state.zt == 2){
        //     this.value = '离开'
        // }else if(this.$store.state.zt == 3){
        //     this.value = '请勿打扰'
        // }else if(this.$store.state.zt == 4){
        //     this.value = '隐身'
        // }
    },
    mounted(){
        // this.initSocket()
        this.intbefo()
        if(this.global.inpage() == 0){
            this.$router.push('/login')
        }
    },
    methods:{
        zhuangtai(){
            var that = this
            let zhuang = that.handdleMsg()
            console.log(zhuang)
            // if(zhuang == 0){

            // }else{
                
            // }
        },
        signout(){
            let that = this
            var msg_obj = { "action_type": "loginOut", "id": sessionStorage.oo_id,'token':sessionStorage.oo_token,};
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
                    // that.global.ws.onclose()
                    // that.$router.push('/login')
                }
            };
            sessionStorage.clear()
            that.global.ws.onclose()
            that.$router.push('/login')
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
                        case 'home_query_application':
                        that.$store.state.num = data.data.num
                        that.$store.state.numlist = data.data.list
                        console.log(that.$store.state.num)
                        console.log(that.$store.state.numlist)
                    }
                }
            };
        },
        handdleMsg(msg) {
            let that = this;
            
            if (that.global.ws && that.global.ws.readyState == 1) {
                console.log("发送信息", msg);
                var msg_obj = { "action_type": "admin_update_status", "id": sessionStorage.oo_id,token:sessionStorage.oo_token,'state':this.value};
                var msg = JSON.stringify(msg_obj);
                that.global.ws.send(msg);
            }
            that.global.ws.onmessage = function(res) {
                var data = JSON.parse(res.data)
                console.log(data)
                if(data.status == 9){
                    that.$router.push('/login')
                }else if(data.status == 0){
                    that.$message({
                        message: data.msg,
                        type: 'error'
                    });
                    that.intbefo()
                }else{
                    switch(data.action_type){
                        case 'home_update_status':
                        if(that.value == 1){
                            that.$store.state.zt = 1
                        }else if(that.value == 2){
                            that.$store.state.zt = 2
                        }else if(that.value == 3){
                            that.$store.state.zt = 3
                        }else if(that.value == 4){
                            that.$store.state.zt = 4
                        }
                        break
                        case 'home_user_list':
                        that.$store.state.contactslist = data.data
                        for(let i=0;i<data.data.length;i++){
                            if(data.data[i].id == that.$store.state.contactslists.id){
                                that.$store.state.contactslists = data.data[i]
                                console.log(data.data[i])
                                console.log(that.$store.state.contactslists)
                            }
                        }
                    }
                }
            };
        }
    }
}
</script>
<style scoped>
    .frist{
        /* padding:30px; */
    }
    .sign{
        cursor: pointer;
    }
    .ziliao{
        text-align:center;
        margin-top:15%;
    }
    .ziliao p{
        font-size: 40px;
        font-weight: bold;
        color:#000;
        margin-bottom: 20px;
    }
    .imgs{
        position: relative;
        width: 200px;
        margin: auto;
        margin-bottom: 20px;
    }
    .imgs img{
        width: 20px;
    }
    .imgs div{
        position: absolute;
        bottom: 0px;
        right: 50px;
        z-index: 999;
    }
    .imgs .pic{
        width: 140px;
        height: 140px;
        border-radius: 50%;
    }
    .phota img{
        width: 14px;
    }
</style>
<style>
    .frist .el-input--suffix .el-input__inner{
        text-align: center;
        color:#333;
        font-size:18px;
    }
</style>

