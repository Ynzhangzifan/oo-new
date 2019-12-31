<!-- 文本输入框 -->
<template>
  <div class="text"
       v-if="selectId && selectId!='default'">
    <div class="contents">
      <div class="emoji">
        <!-- 表情 -->
        <img class="iconfont icon-xiaolian"
             src="../../assets/img/biaoqing.png"
             @click="showemoji">
        <transition name="showbox">
          <div class="emojiBox"
               v-show="showEmoji">
            <li v-for="(item, index) in emojis"
                @click="showEmoji=false">
              <img :src="'static/emoji/'+item.file"
                   :data="item.code"
                   @click="content +=item.code">
            </li>
          </div>
        </transition>
        <!-- 文件图片 -->
        <span class="fileinput-button ">
          <i :class="loading == true?'el-icon-loading':'el-icon-folder-opened'"
             aria-hidden="true"
             style="cursor: pointer;"></i>
          <!-- <img src="../../assets/img/wenjian.png"
               alt=""> -->
          <input type="file"
                 :disabled="loading == true ?true:false"
                 @change="Upload_File"
                 id="fileSelect"
                 name="fileSelect"
                 ref="inputer">
        </span>
        <!-- 撤回 -->
        <span style="width:25px;height:25px;display:inline-block">

          <img class="fa fa-undo recall"
               src="../../assets/img/chehui.png"
               @click="recall"
               style="margin-left:13px;">
        </span>
        <!-- <span style="margin-left:50px"
            class="atlog"
            @click="at"
            v-if="atdiv == true">@</span> -->
        <div :class="show == true?'fl open':'fl close'"
             v-if="show == true">
          <ul>
            <li v-for="item in groupmember"
                @click="choose(item.username)">
              <span>
                <img :src="item.img"
                     alt=""
                     style="width:14px;border-radius:50%">
                {{item.username}}
              </span>
            </li>
          </ul>
        </div>
        <!-- 语音 -->
        <img src="../../assets/img/yuyin.png"
             style="margin-left:26px;"
             ref="recorderControl"
             @click="start">
        <audio autoplay
               ref="audio">
        </audio>
        <!-- 截图 -->
        <img src="../../assets/img/jietu.png"
             :class="'iconfont icon-jiandao'"
             style="margin-left:13px;"
             @click="cropImg($event)">
        <!-- 焚烧 -->
        <span @click="burn()">
          <img v-if="showBurn"
               src="../../assets/img/fenshao1.png"
               :class="'iconfont icon-huore0'"
               style="margin-left:13px;color:#52d68a">
          <img v-else
               src="../../assets/img/fenshao.png"
               :class="'iconfont icon-huore0'"
               style="margin-left:13px;color:#52d68a">
        </span>
      </div>
      <div class="centers">
        <img :class="'iconfont icon-002dianhua'"
             src="../../assets/img/yuyin2.png"
             style="margin-left:13px;"
             @click="joinRooms()">
        <img :class="'iconfont icon-video'"
             src="../../assets/img/shipin.png"
             style="margin-left:13px;"
             @click="joinRoom()">
      </div>

    </div>

    <textarea ref="text"
              id="text"
              v-model="content"
              @keyup="onKeyup"
              @input="changeContent"
              @click="showEmoji=false,show=false"
              @paste="pasteListener($event, true)"
              maxlength="500">
    </textarea>
    <div class="send"
         @click="send">
      <img src="../../assets/img/send1.png"
           alt="">
      <transition name="appear">
        <div class="warn"
             v-show="warn">
          <div class="description">{{$t('message.不能发送空白信息')}}</div>
        </div>
      </transition>
    </div>

    <div :class="rec == false?'show':'hide'">
      <audio-recorder class="recorder"
                      :upload-url="url"
                      :attempts="3"
                      :time="2"
                      :before-recording="callback"
                      :after-recording="callback"
                      :before-upload="callback"
                      :successful-upload="sendvoice"
                      :failed-upload="callback">
      </audio-recorder>
      <i class="el-icon-close close"
         @click="close"></i>
    </div>
    <div v-show="yuyin"
         v-if="selectId.slice(0, 6) == 'friend'"
         @mousedown="move"
         id="top1">
      <div class="videos">
        <div></div>
        <div @click="Close1">×</div>
        <img src="../../assets/img/zoom.png"
             alt=""
             @click="switchScreen"
             class="daxiao">
      </div>

      <div id="remotetrackss"
           class="remotetrackss">

        
      </div>
      <div id="localtrackss"
             class="localtrackss"></div>
      <div class="cancel">
        <div></div>
        <div @click="Close1">{{$t('message.挂断')}}</div>
      </div>
    </div>
    <div v-show="yuyin"
         v-else
         @mousedown="move"
         id="top1">
      <div class="videos">
        <div></div>
        <!-- <div @click="enlarge">□</div> -->
        <div @click="Close1">×</div>
      </div>

      <div class="zooms">
        <div id="localtrackss"
             class="localtrackss1"></div>
        <div id="remotetrackss"
             class="remotetrackss1">
        </div>
      </div>

      <div class="cancel">
        <div></div>
        <div @click="Close1">{{$t('message.挂断')}}</div>
      </div>
    </div>
    <div v-show="audios"
         class="audios">
      <div>{{$t('message.语音通话')}}</div>
      <div>
        <img src="../../assets/img/audios.png">
      </div>
      <!-- <p @click="yuan()">
        <button>加入语音</button>
      </p> -->
      <div>
        <button @click="hangup">{{$t('message.取消')}}</button>
      </div>
    </div>
    <!-- 拖拽上传 -->
    <!-- <div class="filebox">
      <ol>
        <li v-for="item in fileList">{{item.name}}</li>
      </ol>
    </div> -->

    <!-- <div class="loading-box" v-if="loading==true"><div class="loading"><i class="fa fa-spinner fa-spin"></i><br>正在上传...</div></div> -->
    <el-dialog :title="$t('message.发送图片')"
               class="dialogImg"
               :visible.sync="dialogVisible"
               width="460px">
      <div id="dialogimg"
           style="heigth:300px;text-align:center">
        <img id="diaimg"
             src="../../assets/img/shipin.png"
             alt=""
             style="max-width:100%;max-height:100%">
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="mini"
                   @click="dialogVisible = false">{{$t('message.取消')}}</el-button>
        <el-button size="mini"
                   type="primary"
                   style="background-color: #52d68a;border-color: #52d68a;"
                   @click="sendImage">{{$t('message.确定')}}</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
var API = process.env.API_ROOT
import { mapGetters, mapState } from 'vuex'
import qs from 'qs'
import jquery from 'jquery'
import * as QNRTC from "pili-rtc-web";
// console.log("current version is", QNRTC.version);
// import { HZRecorder } from './record.js';
import VueAudioRecorder from 'vue-audio-recorder'

export default {
  name: 'text',
  data () {
    return {
      yuyin: false,
      content: '',
      reply: this.$t('message.未找到'),
      frequency: 0,
      warn: false,
      showEmoji: false,
      showBurn: false,
      show: false,
      atdiv: false,
      groupmember: [],
      down: 0,
      rec: true,
      recorder: {},
      isVoice: false,
      promise: '',
      url: '',
      loading: false,
      fileList: [],
      dialogVisible: false,
      imgSrc: '',
      data: [],
      secret_key: sessionStorage.secret_key,
      parameter: 1,
      audios: false,
      releases: []
    };
  },
  computed: {
    ...mapState([
      'selectId',
      'emojis',
      'roomToken1'
    ]),
    ...mapGetters([
      'selectedChat',
      'searchedFriendlist',
    ])
  },
  methods: {
    // 粘贴
    pasteListener (event, isLimit) {
      // console.log(event, isLimit)
      var that = this
      $.each(event.clipboardData.items, function (index, item) {
        if (item.kind == "file" && item.type.match("image/*")) {
          var file = item.getAsFile();
          if (isLimit && file.size > 2 * 1024 * 1024) {
            // parent.index.layers("msg", "粘贴的图片内容过大，最大支持为2M。");
            return true;
          }
          var fileReader = new FileReader();
          fileReader.onload = function (event) {
            // console.log(event.target.result)

            that.imgSrc = event.target.result
            document.getElementById("diaimg").src = event.target.result

          }
          fileReader.readAsDataURL(file);
          that.dialogVisible = true

        } else if (item.kind == "string" && item.type.match("text/plain")) {
          // item.getAsString(function (str) {
          //   var selection = window.getSelection();
          //   var range = selection.getRangeAt(0);
          //   range.insertNode(new Text(str));
          //   selection.anchorOffset = selection.focusOffset;
          //   selection.collapseToEnd();
          // });
        }
      });
      return false;
    },
    // @
    choose (name) {
      // this.content += '@' + name + ' '
      this.content += name + ' '
      this.show = false
      this.$refs.text.focus()
    },
    at () {
      if (this.show == false) {
        this.show = true
      } else {
        this.show = false
      }
    },
    changeContent (e) {
      console.log(e)
      if (e.data == '@' && this.selectId.slice(0, 5) == 'group') {
        this.show = true
      } else {
        this.show = false
      }
    },
    //语音
    joinRooms () {
      this.parameter = 2
      this.joinRoom()
      this.yuan()
    },
    //挂断语音
    hangup () {
      for (const localTrack of this.releases) {
        // 如果这是麦克风采集的音频 Track，我们就不播放它。
        // if (localTrack.info.tag === "audio") continue;
        // 调用 Track 对象的 play 方法在这个元素下播放视频轨
        // localTrack.play(localElement, true);
        console.log(localTrack)
        localTrack.release()

      }
      this.data.leaveRoom();
      this.audios = false
      this.parameter = 1

    },
    //关闭视频
    Close1 () {
      // 遍历本地采集的 Track 对象
      for (const localTrack of this.releases) {
        // 如果这是麦克风采集的音频 Track，我们就不播放它。
        // if (localTrack.info.tag === "audio") continue;
        // 调用 Track 对象的 play 方法在这个元素下播放视频轨
        // localTrack.play(localElement, true);
        console.log(localTrack)
        localTrack.release()

      }
      this.data.leaveRoom();
      console.log(this.data._users.size)
      this.yuyin = false;
    },
    //视频通话框拖拽
    move (e) {
      let op = document.getElementById('top1');    //获取目标元素
      //算出鼠标相对元素的位置
      let x = e.clientX - op.offsetLeft;
      let y = e.clientY - op.offsetTop;
      document.onmousemove = (e) => {    //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let oClientL = document.documentElement.clientWidth || document.body.clientWidth;
        let oClientT = document.documentElement.clientHeight || document.body.clientHeight;
        let sCorllT = document.documentElement.scrollTop || document.body.scrollTop;
        let sCorllL = document.documentElement.scrollLeft || document.body.scrollLeft
        let X = e.clientX - x;
        let Y = e.clientY - y;
        let w = op.offsetWidth;
        let h = op.offsetHeight;

        if (X < 0) {
          X = 0;
        }
        if (Y < 0) {
          Y = 0;
        }
        if (X > oClientL - w) {
          X = oClientL - w;
        }
        if (Y > oClientT - h) {
          Y = oClientT - h;
        }
        //绑定元素位置到positionX和positionY上面
        // this.positionX = top;
        // this.positionY = left;

        //移动当前元素
        op.style.left = X + 'px';
        op.style.top = Y + 'px';
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    // enlarge(){
    //   let enlarges = document.getElementById('top1')
    //   enlarges.style.width = '60%'
    // },
    //视频大小窗口切换
    switchScreen () {

      console.info("---switchScreen-----")
      const localPlayer = document.getElementById("localtrackss");
      const remotePlayer = document.getElementById("remotetrackss");
      // 交换 2 个元素的 
      if (this.data.users.length == 2) {
        console.log(localPlayer.className)
        if (localPlayer.className === "localtrackss") {
          localPlayer.className = "remotetrackss";
          remotePlayer.className = "localtrackss";
        } else {
          localPlayer.className = "localtrackss";
          remotePlayer.className = "remotetrackss";
        }
      }


    },
    //音视频
    async joinRoom () {
      let that = this
      var myRoom = new QNRTC.TrackModeSession();
      // console.log(myRoom.users)
      console.log(myRoom)
      console.log(myRoom.users);
      console.log(myRoom.users[0]);
      console.log(myRoom.users.length);
      that.data = myRoom
      if (that.yuyin == true || that.audios == true) {
        return
      }
      let type = ''
      if (that.parameter == 1) {
        type = 'video'
        that.yuyin = true
      } else if (that.parameter == 2) {
        type = 'audio'
        that.audios = true
      }
      await that.$axios.post('/yuyin?lang=' + sessionStorage.lang, qs.stringify({
        token: sessionStorage.token,
        id: that.selectId,
        type: type
      }))
        .then(function (res) {

          if (res.data.status == 1) {
            console.log(res)
            if (that.selectId.substring(0, 1) == 'f') {
              that.$store.commit('setroomToken', res.data.roomToken1)
              that.$store.commit('setroomTokens', res.data.roomToken2)
              if (that.parameter == 1) {
                var msg = {
                  // content: this.encode('语音信息', this.secret_key),
                  content:that.$t('message.视频通话'),
                  date: that.time(),
                  type: 'text',
                  self: true,
                  yuyin: 2
                }
                that.$store.dispatch('sendMessage', msg)
              } else if (that.parameter == 2) {
                var msg = {
                  // content: this.encode('语音信息', this.secret_key),
                  content:that.$t('message.语音通话'),
                  date: that.time(),
                  type: 'text',
                  self: true,
                  yuyin: 2
                }
                that.$store.dispatch('sendMessage', msg)
              }
            } else {

              for (let i = 0; i < res.data.token.length; i++) {
                if (res.data.token[i].id == sessionStorage.getItem('id')) {
                  var tokens = res.data.token[i].token
                }
              }
              that.$store.commit('setroomToken', tokens)
              if (that.parameter == 1) {
                var msg = {
                  // content: this.encode('语音信息', this.secret_key),
                  content: that.$t('message.视频通话'),
                  date: that.time(),
                  type: 'text',
                  self: true,
                  yuyin: 2
                }
                that.$store.dispatch('sendMessage', msg)
              } else if (that.parameter == 2) {
                var msg = {
                  // content: this.encode('语音信息', this.secret_key),
                  content: that.$t('message.语音通话'),
                  date: that.time(),
                  type: 'text',
                  self: true,
                  yuyin: 2
                }
                that.$store.dispatch('sendMessage', msg)
              }
            }
          } else if (res.data.status == 0) {
            that.hangup()
            that.Close1()
            that.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
      // 初始化一个房间 Session 对象, 这里使用 Track 模式


      // 这里替换成刚刚生成的 RoomToken
      await myRoom.joinRoomWithToken(that.roomToken1 + "");

      await that.publish(myRoom);
      console.log(myRoom)

    },
    // 增加一个函数 publish，用于采集并发布自己的媒体流
    // 这里的参数 myRoom 是指刚刚加入房间时初始化的 Session 对象
    async publish (myRoom) {
      // 我们打开了 3 个参数，即采集音频，采集视频，采集屏幕共享。
      // 这个函数会返回一个列表，列表中每一项就是一个音视频轨对象
      if (this.parameter == 1) {
        const localTracks = await QNRTC.deviceManager.getLocalTracks({
          audio: { enabled: true, tag: "audio" },
          video: { enabled: true, tag: "video" },
          // screen: { enabled: true, tag: "screen" },
        });
        this.releases = localTracks
        console.log("1");
        // 将刚刚的 Track 列表发布到房间中
        await myRoom.publish(localTracks);
        console.log("2");
        //监听到加入房间  这边自动加入房间 
        myRoom.on("track-add", (trackInfoList) => {
          console.log("get track-add event!", trackInfoList);
          this.yuan()
          // this.subscribe(myRoom, trackInfoList)
          //   .then(() => console.log("7"))
          //   .catch(e => console.error("8"));
        });
        myRoom.on("user-publish", (user) => {

          myRoom.setMergeStreamLayout(user.userId, {
            x: 0, y: 0, w: 920, h: 580, hidden: false, muted: false,
          });
          console.log(user.userId)
        });
        // 获取页面上的一个元素作为播放画面的父元素
        const localElement = document.getElementById("localtrackss");
        // 遍历本地采集的 Track 对象
        for (const localTrack of localTracks) {
          // 如果这是麦克风采集的音频 Track，我们就不播放它。
          if (localTrack.info.tag === "audio") continue;
          // 调用 Track 对象的 play 方法在这个元素下播放视频轨
          localTrack.play(localElement, true);
        }
      } else if (this.parameter == 2) {
        const localTracks = await QNRTC.deviceManager.getLocalTracks({
          audio: { enabled: true, tag: "audio" },
          // screen: { enabled: true, tag: "screen" },
        });
        this.releases = localTracks
        console.log("1");
        // 将刚刚的 Track 列表发布到房间中
        await myRoom.publish(localTracks);
        console.log("2");
        myRoom.on("track-add", (trackInfoList) => {
          console.log("get track-add event!", trackInfoList);
          this.yuan()
          // this.subscribe(myRoom, trackInfoList)
          //   .then(() => console.log("7"))
          //   .catch(e => console.error("8"));
        });
        // 获取页面上的一个元素作为播放画面的父元素
        const localElement = document.getElementById("localtrackss");
        // 遍历本地采集的 Track 对象
        for (const localTrack of localTracks) {
          // 如果这是麦克风采集的音频 Track，我们就不播放它。
          if (localTrack.info.tag === "audio") continue;
          // 调用 Track 对象的 play 方法在这个元素下播放视频轨
          localTrack.play(localElement, true);
        }
      }

    },
    async yuan () {
      // 初始化一个房间 Session 对象, 这里使用 Track 模式
      // const myRoom = new QNRTC.TrackModeSession();
      // // 这里替换成刚刚生成的 RoomToken
      // await myRoom.joinRoomWithToken("CXQ0-jkPJTKH0CrBtOnXJuzLtttZkaLRfndxHEFg:9EQBk-UI8IVFHTC9qJR9t0kH9KM=:eyJhcHBJZCI6ImVjMzB6dW85MyIsInJvb21OYW1lIjoiMTIzIiwidXNlcklkIjoienpmMSIsImV4cGlyZUF0IjoxNTY3MjQ3MjkzLCJwZXJtaXNzaW9uIjoidXNlciJ9");
      // console.log("3");
      var myRoom = this.data
      this.autoSubscribe(myRoom);
    },
    // 这里的参数 myRoom 是指刚刚加入房间时初始化的 Session 对象, 同上
    // trackInfoList 是一个 trackInfo 的列表，订阅支持多个 track 同时订阅。
    async subscribe (myRoom, trackInfoList) {
      // 通过传入 trackId 调用订阅方法发起订阅，成功会返回相应的 Track 对象，也就是远端的 Track 列表了
      const remoteTracks = await myRoom.subscribe(trackInfoList.map(info => info.trackId));
      console.log(777)
      // 选择页面上的一个元素作为父元素，播放远端的音视频轨
      const remoteElement = document.getElementById("remotetrackss");
      // 遍历返回的远端 Track，调用 play 方法完成在页面上的播放
      for (const remoteTrack of remoteTracks) {
        remoteTrack.play(remoteElement);
      }
      if (this.selectId.slice(0, 5) == 'group') {
        var videoArr = document.getElementsByTagName('video')
        console.log(videoArr)

        for (let i = 1; i < videoArr.length; i++) {
          if (videoArr[i].parentNode.id == 'remotetrackss') {
            videoArr[i].style.width = '25%'
          }
        }
      }
    },
    autoSubscribe (myRoom) {
      const trackInfoList = myRoom.trackInfoList;
      console.log("4")

      // 调用我们刚刚编写的 subscribe 方法
      // 注意这里我们没有使用 async/await，而是使用了 Promise，大家可以思考一下为什么
      this.subscribe(myRoom, trackInfoList)
        .then(() => console.log("5"))
        .catch(e => console.error("6"));

      // 添加事件监听，当房间中出现新的 Track 时就会触发，参数是 trackInfo 列表
      myRoom.on("track-add", (trackInfoList) => {
        console.log("get track-add event!", trackInfoList);
        this.subscribe(myRoom, trackInfoList)
          .then(() => console.log("7"))
          .catch(e => console.error("8"));
      });

      //监听离开房间  一方离开房间  两方都离开

      myRoom.on("track-remove", tracks => {
        setTimeout(() => {
          console.log(myRoom._users.size)
          if (myRoom._users.size < 2) {
            this.hangup()
            this.Close1()
            console.log("track removed", tracks);
          }
        }, 1000)
      })




      // 就是这样，就像监听 DOM 事件一样通过 on 方法监听相应的事件并给出处理函数即可
    },
    showemoji () {
      // this.showEmoji = true
      if (this.showEmoji == false) {
        this.showEmoji = true
      } else {
        this.showEmoji = false
      }
    },
    burn () {
      if (this.showBurn == false) {
        this.showBurn = true
      } else {
        this.showBurn = false
      }
    },

    // 截图
    cropImg (e) {
      // e.ctrlKey = true
      // e.altKey = true

      // e.keyCode = 17
      // e.keyCode = 18
      // e.keyCode = 65
      // console.log(e.keyCode)
      console.log(e)
      console.log('---截图--')

    },
    // 发送截图图片
    sendImage () {
      console.log(this.imgSrc)
      //  this.$axios.post('/') 
      this.$axios.post('/saveBaseImage?lang=' + sessionStorage.lang, qs.stringify({ id: this.selectId, token: sessionStorage.token, base64Src: this.imgSrc }))
        .then(res => {
          // _this.groupmember = res.data.data
          this.dialogVisible = false
          if (res.data.status == 1) {
            // this.$message({
            //   type:'success',
            //   message:res.data.msg
            // })
            var msg = {
              content: this.encode(this.$t('message.截图'), this.secret_key),
              date: this.time(),
              type: 'image/png'
            }
            msg['image'] = res.data.path
            this.$store.dispatch('sendMessage', msg)
          }
        })
    },
    callback (msg) {
      console.log(msg)
    },

    close () {
      this.rec = true
    },
    start () {
      // console.log(this.url)

      if (this.rec == true) {
        this.rec = false
      } else {
        this.rec = true
      }
    },
    sendvoice (data) {

      if (data.data.status == 1) {
        var msg = {
          // content: this.encode('语音信息', this.secret_key),
          // content: '语音信息',
          content: 'record.mp3',
          type: 'audio/wav',
          audioUrl: data.data.path,
          date: this.time()
        }
        this.$store.dispatch('sendMessage', msg)
        this.rec = true
        VueAudioRecorder.AudioRecorder.methods.removeRecord(0)
        return false
      }
    },

    //上传按钮的事件axios
    Upload_File () {
      console.log(this.loading)
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      if (inputDOM.files.length > 1) {
        this.$message({
          type: 'warning',
          message: this.$t('message.文件只能单个上传')
        })
        this.loading = false
        return false
      }
      this.file = inputDOM.files[0];
      if (this.file.size > 2 * 1024 * 1024) {
        // alert('文件大小上限为2M')
        this.$message({
          type: 'warning',
          message: this.$t('message.文件大小上限为2M')
        })
        this.loading = false
        return false
      }
      // console.log(this.file)
      let formdata = new FormData();
      formdata.append('fileSelect', inputDOM.files[0]);
      formdata.append('id', this.selectedChat.id)
      formdata.append('token', sessionStorage.token)
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }; //添加请求头
      var _this = this
      this.loading = true
      this.$axios.post('/saveFileMessage?lang=' + sessionStorage.lang, formdata, config)
        .then(function (res) {


          if (res.data.status == 1) {
            var msg = {
              content: _this.file.name,
              reply: _this.reply,
              type: _this.file.type,
              date: _this.time()
            }
            // console.log(_this.file)
            // 图片类型
            if (_this.file.type == 'image/gif' || _this.file.type == 'image/jpeg' || _this.file.type == 'image/png') {
              msg['image'] = res.data.path
            } else if (_this.file.type == 'text/plain' || _this.file.type == 'application/x-zip-compressed') {
              msg['downloadUrl'] = res.data.path
            } else if (_this.file.type == "application/pdf") {
              msg['downloadUrl'] = res.data.path
              msg['url'] = res.data.url
            } else if (_this.file.type == 'video/mp4') {
              msg['videoUrl'] = res.data.path
            } else if (_this.file.type == 'audio/mp3') {
              msg['audioUrl'] = res.data.path
            } else {
              msg['downloadUrl'] = res.data.path
              msg['type'] = 'more'
            }
            _this.$store.dispatch('sendMessage', msg)
            _this.$refs.inputer.value = ''
            _this.loading = false
          } else {
            _this.$message({
              type: 'warning',
              message: res.data.msg
            })
            _this.loading = false
          }
        })
    },
    // 按回车发送信息
    onKeyup (e) {
      var e = e || window.event, ec = e.keyCode || e.which;
      // console.log(e)
      if (!e.ctrlKey && 13 == ec) {
        this.send()
        // return false;
      }
      if (e.ctrlKey && 13 == ec) {
        this.content += '\n'
      }
      // if (e.key == '@' && this.selectId.slice(0, 5) == 'group') {
      //   this.show = true
      // }
      // if (e.key == "Backspace") {
      //   this.show = false
      // }
      // else {
      //   this.show = false
      // }

      // console.log(e)
      // if ( e.key == 'Control' && e.keyCode === 13 ) {
      //     console.log('enter')
      //     this.content += '\n'
      // }
      // if ( e.key != 'Control' && e.keyCode === 13 ){
      //     console.log('send')
      //     this.send()
      // }

    },
    getObjectURL (file) {
      var url = null;
      if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    // 点击发送按钮发送信息
    send () {
      // console.log(this.content.length, this.secret_key.length)
      var kong = true
      for (var i in this.content) {
        if (this.content[i] != ' ' && this.content[i] != '\n') {
          kong = false
        }
      }
      if (kong != false) {
        this.warn = true
        this.content = ''
        setTimeout(() => {
          this.warn = false;
        }, 1000)
      } else {
        if (this.selectedChat.user.name === '机器人') {
          this.$http.get(`https://zhaoplus.com/api/AI?search=${this.content}`).then(res => {
            this.reply = res.data.result.text
            if (this.content.includes('/:')) {
              this.reply = '嘻嘻'
            }
            // console.log(this.content)
            var msg = {
              content: this.content,
              reply: this.reply
            }
            this.$store.dispatch('sendMessage', msg)
            this.content = ''
          })
        } else {
          // unicode编码
          var msg = {
            // content: this.encode(this.content, this.secret_key),
            content: this.content,
            date: this.time(),
            showBurn: this.showBurn
          }
          this.$store.dispatch('sendMessage', msg)
          this.content = ''
          this.showBurn = false
        }
      }
    },
    time () {
      var date = new Date();
      if (date.getMinutes() < 10) {
        return date.getHours() + ':0' + date.getMinutes();
      } else {
        return date.getHours() + ':' + date.getMinutes();
      }
    },
    recall () {
      this.$store.dispatch('recallMessage')
    },
    getGroupNum () {
      this.$axios.post('/queryAllGroupUserNoMe?lang=' + sessionStorage.lang, qs.stringify({ group_id: this.selectId, token: sessionStorage.token }))
        .then(res => {
          this.groupmember = res.data.data
        })
    }
  },
  // 在进入的时候 聚焦输入框
  mounted () {
    this.$refs.text.focus()
    this.getGroupNum()
    if (this.selectId.substring(0, 5) == 'group') {
      this.atdiv = true
    } else {
      this.atdiv = false
    }
    var domain = (process.env.API_ROOT != '') ? process.env.API_ROOT : (window.location.host + '/')
    var domainname = window.location.protocol
    // this.url = "/saveFileMessage?token=" + sessionStorage.token + "&id=" + this.selectedChat.id + ""
    // this.url = domainname + '//' + domain + "OO/index.php/saveFileMessage?token=" + sessionStorage.token + "&id=" + this.selectedChat.id + ""
    // console.log(this.selectedChat.id)
    this.url = domainname + '//' + domain + "OO/index.php/saveFileMessage?lang=" + sessionStorage.lang + "&token=" + sessionStorage.token + "&id=" + this.selectedChat.id + ""
  },

  watch: {
    // 在选择其它对话的时候 聚焦输入框
    selectId () {
      this.content = ''
      this.show = false
      var domain = (process.env.API_ROOT != '') ? process.env.API_ROOT : (window.location.host + '/')
      var domainname = window.location.protocol
      this.url = domainname + '//' + domain + "OO/index.php/saveFileMessage?lang=" + sessionStorage.lang + "&token=" + sessionStorage.token + "&id=" + this.selectId + ""
      if (this.selectId.substring(0, 5) == 'group') {
        this.atdiv = true
      } else {
        this.atdiv = false
      }
      setTimeout(() => {
        this.$refs.text.focus()
      }, 0)
      this.getGroupNum()
      // var _this = this;
      // this.$axios.post('/queryAllGroupUserNoMe?lang=' + sessionStorage.lang, qs.stringify({ group_id: this.selectId, token: sessionStorage.token }))
      //   .then(function (res) {
      //     _this.groupmember = res.data.data
      //   })
    },
    // 当输入框中的值为空时 弹出提示  并在一秒后消失
    content () {
      if (this.content === '') {
        if (this.frequency === 0) {
          this.warn = true;
          this.frequency++
          setTimeout(() => {
            this.warn = false;
          }, 1000)
        }
      }

    },
    showEmoji () {
      if (this.showEmoji == false)
        this.$refs.text.focus()
    }
  },
  destroyed () {
    myRoom.leaveRoom();
  }
}
</script>
<style>
.text .el-dialog {
  border-radius: 5px;
  color: #444;
  text-align: center;
}
/* .text .ar-icon__lg {
  width: 55px;
  height: 55px;
  line-height: 55px;
}
 */
.text .ar-icon__sm {
  line-height: 27px;
}
.text .ar-content .ar-recorder__records-limit {
  top: 60px;
  font-size: 12px;
}
.text .ar-content .ar-recorder__duration {
  font-size: 24px;
  margin-top: 16px;
  margin-bottom: 16px;
}
.text .ar-content .ar-recorder__time-limit {
  top: 104px;
}
.text .ar-content .ar-records__record {
  height: 38px;
  padding: 0 10px;
  margin: 0 auto;
  line-height: 38px;
  padding: 0 16px;
}
.text .ar-content .ar-records {
  margin-bottom: 0px;
}
.text .ar-content .ar__rm {
  left: -3px;
  bottom: 0;
  top: -5px;
  font-weight: 700;
  color: #f55f5f;
}
.text .ar-content .ar__text,
.text .ar-content .ar-player__time {
  font-size: 14px;
}
.text .ar-content .ar-player-bar {
  height: 30px;
}
.text .ar-content .ar-recorder__duration {
  color: #7d8280;
}
</style>
<style lang="stylus" scoped>
.show
  position absolute
  z-index 1
  opacity 1
.hide
  position absolute
  z-index -1
  opacity 0
.loading-box
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 10
  display flex
  align-items center
  background rgba(0, 0, 0, 0.5)
  .loading
    i
      font-size 50px
      margin-bottom 10px
    font-size 12px
    color #fff
    margin auto
.recorder
  width 420px
  height 328px
  margin-top -450px
.close
  position absolute
  top -442px
  right 12px
  cursor pointer
  font-size 16px
.text
  position relative
  height 25%
  background #fff
  .emoji
    position relative
    flex 3
    height 40px
    line-height 40px
    font-size 12px
    padding 0 5%
    box-sizing border-box
    color #7c7c7c
    .icon-look
      cursor pointer
      &:hover
        color #43abe0
    .fl
      position absolute
      width 100px
      top -90px
      left 30px
      height 100px
      background #fff
      border 1px solid #888
      ul
        padding 0 0 0 5px
        height 100%
        overflow scroll
        li
          line-height 20px
          cursor pointer
          &:hover
            background #e8e8e8
      &.open
        transition all 0.3s linear
        opacity 1
      &.close
        transition all 0.3s linear
        opacity 0
    .emojiBox
      position absolute
      display flex
      justify-content space-between
      flex-wrap wrap
      top -250px
      left -100px
      width 300px
      padding 5px
      background-color #fff
      border 1px solid #d1d1d1
      border-radius 2px
      box-shadow 0 1px 2px 1px #d1d1d1
      &.showbox-enter-active, &.showbox-leave-active
        transition all 0.5s
      &.showbox-enter, &.showbox-leave-active
        opacity 0
      img
        width 25px
  .fileinput-button
    position relative
    overflow hidden
    margin-left 13px
    font-size 17px
    input
      position absolute
      right 6px
      top 2px
      opacity 0
      width 25px
    .el-icon-folder-opened
      font-size 26px
      vertical-align middle
      margin-top 3px
    .el-icon-loading
      color #52d68a
      font-size 26px
      vertical-align middle
      margin-top 3px
  .recall
    font-size 16px
    cursor pointer
    position absolute
    top 14px
    z-index 1
    left 97px
  .atlog
    position absolute
    margin-left 46px
    font-size 16px
    margin-top -1px
  .voice
    position absolute
    margin-left 86px
    font-size 16px
    margin-top 12px
    cursor pointer
  textarea
    box-sizing border-box
    padding 0 30px
    height calc(100% - 40px - 40px)
    width 100%
    border none
    outline none
    font-family 'Micrsofot Yahei'
    resize none
  .send
    position relative
    text-align right
    margin-right 30px
    box-sizing border-box
  .warn
    position absolute
    top -50px
    right 0
    width 110px
    height 30px
    line-height 30px
    font-size 12px
    text-align center
    border 1px solid #bdbdbd
    border-radius 4px
    box-shadow 0 1px 5px 1px #bdbdbd
    &.appear-enter-active, &.appear-leave-active
      transition all 1s
    &.appear-enter, &.appear-leave-active
      opacity 0
    &:before
      content ' '
      position absolute
      top 100%
      right 20px
      border 7px solid transparent
      border-top-color #fff
      filter drop-shadow(1px 3px 2px #bdbdbd)
</style>

<style scoped>
.text .contents .iconfont {
  font-size: 20px;
}

.text .contents {
  padding-top: 4px;
  display: flex;
  justify-content: space-between;
}
.text .centers {
  height: 40px;
  line-height: 40px;
  padding-right: 5%;
  /* width: 20%; */
  box-sizing: border-box;
  flex:1
}
#top1 {
  position: fixed;
  width: 40%;
  top: 10%;
  z-index: 999999;
}
.icon-xiaolian,
.icon-fanhui,
.icon-maikefeng,
.icon-jiandao,
.icon-huore0,
.icon-002dianhua,
.icon-video {
  cursor: pointer;
}
.videos {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  position: relative;
  background: #323232;
  box-sizing: border-box;
}
.videos div:nth-child(2) {
  cursor: pointer;
  color: #fff;
  font-size: 24px;
  line-height: 40px;
}
.remotetrackss {
  position: fixed;
  width:15%;
}
.localtrackss {
  position: absolute;
  width: 100%;
  height: 540px;
  background: #000;
  z-index: -999;
}
.zooms {
  position: relative;
  width: 100%;
  height: 540px;
  display: flex;
  flex-wrap: wrap;
  background: #000;
}
.localtrackss1 {
  width: 25%;
  height: 33%;
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 0;
}
.remotetrackss1 {
  display: flex;
  width: 100%;
  height: 33%;
  flex-wrap: wrap;
}
.daxiao {
  position: absolute;
  bottom: -40px;
  right: 10px;
  z-index: 9999999;
  width: 30px;
  height: 30px;
}
.audios {
  position: absolute;
  top: -280%;
  right: -43.5%;
  width: 240px;
  height: 290%;
  background: #fff;
  z-index: 999;
  text-align: center;
}
.audios div:nth-child(1) {
  text-align: center;
  width: 100%;
  font-size: 20px;
  font-weight: 550;
}
.audios div:nth-child(2) {
  text-align: center;
  margin-top: 20px;
}
.audios div:nth-child(3) {
  text-align: center;
  margin-top: 20px;
}
.audios div:nth-child(3) button {
  width: 96px;
  height: 30px;
  background: #f55f5f;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}
.cancel {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  display: fixed;
  position: absolute;
  top: 540px;
  background: #0f1011;
  color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
}
.cancel div:nth-child(2) {
  width: 60px;
  background: #f55f5f;
  height: 30px;
  text-align: center;
  margin-top: 5px;
  line-height: 30px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
