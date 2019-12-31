<template>
  <div id="app">
    <router-view />
    <div id="newMsg"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  
  created () {
    // this.$store.dispatch('initData')
    console.log(1)
    this.localSocket()
    
    console.log(2)
  },
  methods:{
    localSocket() {
      let that = this;
      if ("WebSocket" in window) {
        console.log("您的浏览器支持 WebSocket!");
        
        that.ws = new WebSocket(`ws://10.65.24.41:23426/`);
        
        that.global.setWs(that.ws);
        that.ws.onopen = function() {
          if(sessionStorage.oo_id){
            that.global.ws.send(JSON.stringify({ "action_type": "loginIn",id:sessionStorage.oo_id}));
          }
          
          // 关闭 websocket
          console.log("onopen...");
           setInterval(() => {
          console.log(123)
              that.global.ws.send(JSON.stringify({ "action_type": "test"}));
          }, 10000);
        };
        // that.ws.onclose = that.OnClose()
        that.ws.onmessage = function() {
          // 关闭 websocket
          console.log("onmessage...");
        };
        that.ws.onerror = function() {
          // 关闭 websocket
          console.log("onerror...")
        };
        console.log(that.ws)
        that.ws.onclose = function() {
          // 关闭 websocket
          console.log("连接已关闭...");
          // setTimeout(() => {
          //   that.localSocket();
          // }, 2000);
        };
      } else {
        // 浏览器不支持 WebSocket
        console.log("您的浏览器不支持 WebSocket!");
      }
    },
    
  },
  mounted(){
    let that = this
    console.log(1212)
    that.global.ws.onmessage = function(res) {
            var data = JSON.parse(res.data)
            console.log(data.status)
        };
  }
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  position: relative;
  left: 0;
  top: 0;
  bottom: 0;
}
</style>
