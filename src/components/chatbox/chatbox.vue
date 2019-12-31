<!-- 消息框 -->
<template>
  <div class="message">
    <header class="header">

      <div class="friendname"
           v-if="selectedChat.id.slice(0,5)=='group'">{{selectedChat.user.name}}{{'('+groupNum+')'}}</div>
      <div class="friendname"
           v-else>{{selectedChat.user.name}}<span style="font-size:14px;color:#818181;margin-left:26px;"
              v-if="selectedChat.user.sign"><span class="sign"></span><span style="padding-left:6px;">{{selectedChat.user.sign}}</span></span></div>
    </header>

    <div class="message-wrapper"
         ref="list">
      <div style="cursor:pointer"
           class="list-a"
           @click="atClick">
        <el-alert v-show="atShow"
                  :title="$t('message.有好友@你了,点击查看')"
                  effect="dark"
                  id="Group"
                  @close="closeNotice()"
                  type="info">
        </el-alert>
      </div>
      <ul v-if="selectedChat"
          class="ul-chatbox">
        <li v-for="item in selectedChat.messages"
            style="overflow:hidden"
            class="message-item">
          <div class="time">
            <!-- <span v-if="item.date"></span> -->
          </div>
          <div class="main"
               :class="{ self: item.self }">
            <img class="avatar"
                 width="52"
                 height="52"
                 :src="item.self ? avatar : item.img" />
            <div class="content-box">
              <!-- <span>{{item.name}}</span> -->
              <!-- {{item}} -->
              <div v-if="item.type && item.image"
                   class="content-imag">
                <div v-if="item.recall"
                     class="recall">{{$t('message.撤回了一张图片')}}</div>
                <div v-else>
                  <p style="display:none">{{item.content}}</p>
                  <img :src="item.image"
                       style="border-radius:5px;max-width:200px;cursor:pointer"
                       @click="details(item.image)">
                </div>
              </div>

              <div v-else-if="item.type && item.downloadUrl && !item.url"
                   class="content-el">
                <div v-if="item.recall"
                     class="recall">{{$t('message.撤回了一个文件')}}</div>
                <div v-else>

                  <!-- <p v-if="!item.self&&selectedChat.id.slice(0,5)=='group'"
                     style="color:#000">{{item.content}}</p> -->
                  <p style="color:#000">{{decode(item.content,secret_key)}}</p>
                  <!-- <p v-if="!item.self"
                     style="color:#000">{{item.content}}</p> -->
                  <!-- <i class="fa fa-folder-o"></i> -->
                  <img src="../../assets/img/wenjian.png"
                       style="width:16px;height:12px;"
                       alt="">
                  <a @click="download(item.downloadUrl)"
                     style="cursor:pointer;color:#38a53d;font-size:13px;">{{$t('message.点击下载')}}</a>
                </div>
              </div>
              <div v-else-if="item.type && item.downloadUrl && item.url"
                   class="content-el">
                <div v-if="item.recall"
                     class="recall">{{$t('message.撤回了一个文件')}}</div>
                <div v-else>
                  <!-- <p v-if="!item.self&&selectedChat.id.slice(0,5)=='group'">{{item.content}}</p> -->
                  <p>{{decode(item.content,secret_key)}}</p>
                  <!-- <p v-if="item.self">{{item.content}}</p>
                  <p v-if="!item.self">{{item.content}}</p> -->
                  <i class="fa fa-folder-o"></i>
                  <a @click="download(item.downloadUrl)"
                     style="cursor:pointer;color:#38a53d;font-size:13px;">{{$t('message.点击下载')}}</a>
                  <a :href="item.url"
                     target="_blank"
                     style="cursor:pointer">{{$t('message.预览')}}</a>
                </div>
              </div>

              <div v-else-if="item.type && item.videoUrl"
                   class="content-el">
                <div v-if="item.recall"
                     class="recall">{{$t('message.撤回了一个视频')}}</div>
                <div v-else>
                  <!-- <p class="filename">{{item.content}}</p> -->
                  <!-- <p v-if="!item.self&&selectedChat.id.slice(0,5)=='group'"
                     class="filename">{{item.content}}</p> -->
                  <p class="filename">{{decode(item.content,secret_key)}}</p>

                  <video width="300"
                         height="auto"
                         controls>
                    <source :src="item.videoUrl"
                            type="video/mp4">
                  </video>
                </div>
              </div>

              <div v-else-if="item.shiping"
                   class="content">
                <div v-if="item.recall"
                     class="recall">
                  {{$t('message.撤回了一个通话')}}
                </div>
                <div v-else>

                  <div class="filename"
                       @click="joinRoom(item.filename,item.type)">
                    {{decode(item.content,secret_key)}}
                  </div>
                </div>

              </div>

              <div v-else-if="item.type && item.audioUrl"
                   class="content-el">
                <div v-if="item.recall"
                     class="recall">{{$t('message.撤回了一段语音')}}</div>
                <div v-else>
                  <!-- <p v-if="!item.self&&selectedChat.id.slice(0,5)=='group'"
                     class="filename">{{item.content}}</p> -->
                  <p class="filename">{{decode(item.content,secret_key)}}</p>

                  <audio controls
                         v-if="!item.recall">
                    <source :src="item.audioUrl"
                            type="audio/mpeg">
                    {{$t('message.您的浏览器不支持 audio 元素。')}}
                  </audio>
                </div>
              </div>

              <div v-else-if="!item.type"
                   class="content">
                <div v-if="item.recall"
                     class="recall">{{$t('message.撤回了一条消息')}}
                </div>
                <div :id="item.id"
                     v-else>
                  <div v-if="item.is_burn==1"
                       @click="burnInformation(item.id)"
                       style="position:relative">
                    <span style="font-size:16px;color:#818181">{{$t('message.点击查看')}}
                    </span>
                    <img style="width:16px;position:absolute;top:-9px;right:-16px"
                         src="../../assets/img/beforeburn.png">
                  </div>
                  <div v-else-if="item.is_burn==2"
                       style="position:relative">
                    <span style="width:20px;height:20px;text-align:center;color:#ffff;line-height:20px;background-color:#f55f5f;display:inline-block;border-radius:50%;position:absolute;top:-14px;right:-18px;">
                    </span>
                    <span v-html="replaceFace(item.content)"
                          style="font-size:16px;color:#818181;white-space: normal;">{{decode(item.content,secret_key)}}</span>
                  </div>
                  <div v-else-if="item.is_burn==3">
                    <span style="font-size:16px;">{{$t('message.已焚烧')}}</span>
                  </div>

                  <div v-else-if="item.showBurn"
                       class="text"
                       style="position:relative;">
                    <img style="width:16px;position:absolute;top:-9px;left:-18px"
                         src="../../assets/img/beforeburn.png">
                    <span style="color:#fff;font-size:16px;white-space: normal;"
                          v-html="replaceFace(item.content)">{{decode(item.content,secret_key)}}
                    </span>
                  </div>

                  <div v-else
                       class="text"
                       v-html="replaceFace(item.content)">{{decode(item.content,secret_key)}}
                  </div>
                  <!-- <div v-else
                       class="text">{{decode(item.content,secret_key)}}
                  </div> -->
                </div>
              </div>
              <span>{{item.date}}</span>
            </div>
          </div>
        </li>
      </ul>
      <iframe style="display:none"
              :src="downloadUrl"
              frameborder="0"></iframe>
    </div>
    <div class="modal"
         v-show="dialog=='open'">
      <i class="el-icon el-icon-close"
         @click="close"></i>
      <img :src="imgSrc">
    </div>

    <div v-show="yuyin"
         v-if="selectId.slice(0, 6) == 'friend'"
         @mousedown="move"
         id="top">
      <div class="videos">
        <div></div>
        <div @click="Closes">×</div>

        <img src="../../assets/img/zoom.png"
             alt=""
             @click="switchScreen"
             class="daxiao">

      </div>
      <div id="remotetracks"
           class="remotetracks">
        <div id="localtracks"
             class="localtracks"></div>
      </div>
      <div class="cancel">
        <div></div>
        <div @click="Closes">{{$t('message.挂断')}}</div>
      </div>
    </div>
    <div v-show="yuyin"
         v-else
         @mousedown="move"
         id="top">
      <div class="videos">
        <div></div>
        <div @click="Closes">×</div>

        <img v-if="selectId.slice(0, 6) == 'friend'"
             src="../../assets/img/zoom.png"
             alt=""
             @click="switchScreen"
             class="daxiao">

      </div>
      <div class="zoom">
        <div id="localtracks"
             class="localtracks1">
        </div>
        <div id="remotetracks"
             class="remotetracks1">
        </div>
      </div>

      <div class="cancel">
        <div></div>
        <div @click="Closes">{{$t('message.挂断')}}</div>
      </div>
    </div>
    <div v-show="dataaudio"
         class="dataaudio">
      <div>{{$t('message.语音通话')}}</div>
      <div>
        <img src="../../assets/img/audios.png">
      </div>
      <div>
        <button @click="hangup">{{$t('message.取消')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import { mapGetters, mapState } from 'vuex'
import { setTimeout } from 'timers';
import * as QNRTC from "pili-rtc-web";
import jquery from 'jquery'
import nicescroll from 'jquery.nicescroll'
export default {
  data () {
    return {
      avatar: sessionStorage.avatar,
      downloadUrl: '',
      imgSrc: '',
      dialog: 'close',
      yuyin: false,
      data: [],
      secret_key: sessionStorage.secret_key,
      audiodata: 1,
      dataaudio: false,
      releases: [],
      AllGroupUser: [],
      groupNum: '',
      isShowBurn: false,
      burnValue: 30,
      // 定时器
      timer: null,
      id: '',
      // 群成员信息
      groupInfo: [],
      atShow: false,
      closenotice: {},
      noticeId: ''
    }
  },
  computed: {
    ...mapGetters([
      'selectedChat',
      'messages',
    ]),
    ...mapState([
      'user',
      'emojis',
      'roomToken2',
      'grouplist',
      'selectId',
      'audioup'
    ])
  },
  mounted () {
    //  在页面加载时让信息滚动到最下面
    console.log('滚动到最下')
    this.getGroupNum()
    this.loadgroupInfo()
    // console.log(this.selectedChat.messages)
    if (this.$refs.list.scrollHeight) {
      setTimeout(() => this.$refs.list.scrollTop = this.$refs.list.scrollHeight, 0)
    }
    jquery("body").niceScroll({
      cursorwidth:"8px"
    })
  },

  watch: {
    audioup(curval,oldval){
      console.log(curval,oldval)
      if(curval == 1){
        console.log(curval,oldval)
        this.joinRoom (filename, type)
        console.log('1111')
      }
    },
    // 发送信息后,让信息滚动到最下面
    messages () {
      setTimeout(() => this.$refs.list.scrollTop = this.$refs.list.scrollHeight, 0)
      console.log(this.$refs.list.scrollTop, this.$refs.list.scrollHeight)
    },
    // 更换聊天对象后，让信息滚动到最下面
    selectedChat () {
      this.loadgroupInfo()
      console.log(this.selectedChat)
      this.$store.state.chatlist.forEach(item => {
        if (item.id == this.selectedChat.id) {
          if (item.noticeRight) {
            console.log(1111)
            this.atShow = true
          } else {
            this.atShow = false
          }
        }

      })
      setTimeout(() => this.$refs.list.scrollTop = this.$refs.list.scrollHeight, 0)
      this.AllGroupUser = this.grouplist
      this.AllGroupUser.forEach(item => {
        if (this.selectedChat.id == item.id) {
          this.groupNum = item.num
        }
      })


    },
    grouplist () {
      this.AllGroupUser = this.grouplist
      this.AllGroupUser.forEach(item => {
        if (this.selectedChat.id == item.id) {
          this.groupNum = item.num
        }
      })
    },


  },
  created () {

    setTimeout(() => this.$refs.list.scrollTop = this.$refs.list.scrollHeight, 0)
  },
  methods: {

    // 获取群人数
    getGroupNum () {
      this.$axios.post('groupList?lang=' + sessionStorage.lang, qs.stringify({
        token: sessionStorage.token
      })).then(res => {
        this.AllGroupUser = res.data.data
        this.AllGroupUser.forEach(item => {
          if (this.selectedChat.id == item.id) {
            this.groupNum = item.num
          }
        })
      })

    },
    // 获取所有群成员
    loadgroupInfo () {
      this.$axios.post('queryAllGroupUser?lang=' + sessionStorage.lang, qs.stringify({ 'group_id': this.selectedChat.id, 'token': sessionStorage.token }))
        .then(res => {
          if (res.data.status == 1) {
            this.groupInfo = res.data.data


          } else if (res.data.status == 0) {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
    },
    // 阅后即焚
    burnInformation (id) {
      console.log(id)
      this.id = id
      this.$axios.post('changeBurn?lang=' + sessionStorage.lang, qs.stringify({
        token: sessionStorage.token,
        type: this.selectedChat.id,
        id: id,
        is_burn: '2'
      })).then(res => {
        if (res.data.status == 1) {
          this.selectedChat.messages.forEach(item => {
            console.log(item.id)
            if (item.id == id) {
              item.is_burn = 2
              console.log(1231231)

              console.log(document.getElementById(id).children[0].children[0])
              document.getElementById(id).children[0].children[0].innerHTML = 30
              // console.log(document.getElementById(id).children(0).lastChild)
            }
          })
          var burnValue = 30
          var timer = setInterval(() => {
            if (document.getElementById(id).children[0].children[0].innerHTML > 0 && document.getElementById(id).children[0].children[0].innerHTML <= 30) {
              --document.getElementById(id).children[0].children[0].innerHTML
            }
            if (document.getElementById(id).children[0].children[0].innerHTML == 0) {
              clearInterval(timer);
              this.$axios.post('changeBurn?lang=' + sessionStorage.lang, qs.stringify({
                token: sessionStorage.token,
                type: this.selectedChat.id,
                id: id,
                is_burn: '3'
              })).then(res => {
                if (res.data.status == 1) {
                  this.selectedChat.messages.forEach(item => {
                    console.log(item)
                    if (item.id == id) {
                      item.is_burn = 3
                    }
                  })

                }
              })
            }
          }, 1000)
        }
      })

    },
    move (e) {
      let op = document.getElementById('top');    //获取目标元素
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
    switchScreen () {
      console.info("---switchScreen-----")
      const localPlayers = document.getElementById("localtracks");
      const remotePlayers = document.getElementById("remotetracks");
      // 交换 2 个元素的 
      console.log(localPlayers.className)
      if (localPlayers.className === "localtracks") {
        localPlayers.className = "remotetracks";
        remotePlayers.className = "localtracks";
      } else {
        localPlayers.className = "localtracks";
        remotePlayers.className = "remotetracks";
      }
    },
    Closes () {
      this.yuyin = false
      console.log(this.data._users.size)
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

    },
    hangup () {
      this.dataaudio = false
      for (const localTrack of this.releases) {
        // 如果这是麦克风采集的音频 Track，我们就不播放它。
        // if (localTrack.info.tag === "audio") continue;
        // 调用 Track 对象的 play 方法在这个元素下播放视频轨
        // localTrack.play(localElement, true);
        console.log(localTrack)
        localTrack.release()
      }
      this.data.leaveRoom();
      this.audiodata = 1
    },
    async joinRoom (filename, type) {
      console.log(filename)
      var that = this
      if (that.yuyin == true || that.dataaudio == true) {
        return
      }
      // 初始化一个房间 Session 对象, 这里使用 Track 模式
      var myRoom = new QNRTC.TrackModeSession();
      that.data = myRoom
      var tonken1 = JSON.parse(filename)
      console.log(tonken1)
      if (that.selectId.substring(0, 1) == 'f') {
        console.log(that.selectId.substring(0, 1))
        console.log(tonken1.roomToken2)
        console.log(type)
        if (tonken1.type == 'video') {
          // 这里替换成刚刚生成的 RoomToken
          await myRoom.joinRoomWithToken(tonken1.roomToken2);
          console.log(myRoom._users.size)
          if (myRoom._users.size < 2) {
            myRoom.leaveRoom()
            return
          }
          that.autoSubscribe(myRoom);
          that.yuyin = true

          console.log(12)
        } else if (tonken1.type == 'audio') {
          that.audiodata = 2
          console.log(userstoken)
          await myRoom.joinRoomWithToken(tonken1.roomToken2);
          if (myRoom._users.size < 2) {
            myRoom.leaveRoom()
            return
          }
          that.autoSubscribe(myRoom);
          that.dataaudio = true
        }
      } else {
        for (let i = 0; i < tonken1.length; i++) {
          console.log(sessionStorage.getItem('id'))
          if (tonken1[i].id == sessionStorage.getItem('id')) {
            var userstoken = tonken1[i].token
          } else {
            console.log(tonken1[i].id)
            continue
          }
          if (type == 'video') {
            // 这里替换成刚刚生成的 RoomToken
            await myRoom.joinRoomWithToken(userstoken);
            console.log(tonken1[i])
            console.log(myRoom._users.size)
            if (myRoom._users.size < 2) {
              myRoom.leaveRoom()
              return
            }
            that.autoSubscribe(myRoom);
            that.yuyin = true

            console.log(12)
          } else if (type == 'audio') {
            that.audiodata = 2
            console.log(userstoken)
            await myRoom.joinRoomWithToken(userstoken);
            if (myRoom._users.size < 2) {
              myRoom.leaveRoom()
              return
            }
            that.autoSubscribe(myRoom);
            that.dataaudio = true
          }
          break
        }
      }



    },

    // 这里的参数 myRoom 是指刚刚加入房间时初始化的 Session 对象, 同上
    // trackInfoList 是一个 trackInfo 的列表，订阅支持多个 track 同时订阅。
    async subscribe (myRoom, trackInfoList) {
      console.log(myRoom)
      // 通过传入 trackId 调用订阅方法发起订阅，成功会返回相应的 Track 对象，也就是远端的 Track 列表了
      const remoteTracks = await myRoom.subscribe(trackInfoList.map(info => info.trackId));

      // 选择页面上的一个元素作为父元素，播放远端的音视频轨
      console.log('remotetracks')
      const remoteElement = document.getElementById("remotetracks");
      // 遍历返回的远端 Track，调用 play 方法完成在页面上的播放
      console.log(remoteTracks)
      for (const remoteTrack of remoteTracks) {
        remoteTrack.play(remoteElement);
      }

      if (this.selectId.slice(0, 5) == 'group') {
        var videoArr = document.getElementsByTagName('video')
        console.log(videoArr)

        for (let i = 0; i < videoArr.length; i++) {
          console.log(videoArr[i])
          // console.log(videoArr[i].parentNode.id)
          if (videoArr[i].parentNode.id == 'remotetracks') {
            videoArr[i].style.width = '25%'
          }
        }
      }
    },
    autoSubscribe (myRoom) {
      const trackInfoList = myRoom.trackInfoList;

      // 调用我们刚刚编写的 subscribe 方法
      // 注意这里我们没有使用 async/await，而是使用了 Promise，大家可以思考一下为什么
      this.subscribe(myRoom, trackInfoList)
        .then(() => console.log('2'), this.ben())
        .catch(e => console.error("3"));

      // 添加事件监听，当房间中出现新的 Track 时就会触发，参数是 trackInfo 列表

      myRoom.on("track-add", (trackInfoList) => {
        console.log("4");
        this.subscribe(myRoom, trackInfoList)
          .then(() => console.log('5'))
          .catch(e => console.error("6"));
      });

      myRoom.on("track-remove", tracks => {
        setTimeout(() => {
          if (myRoom._users.size < 2) {
            console.log("track removed", tracks);
            this.Closes()
            this.hangup()
          }
        }, 1000)
      })


      // 就是这样，就像监听 DOM 事件一样通过 on 方法监听相应的事件并给出处理函数即可
      console.log(11)
      //this.ben()
    },
    async ben () {
      var myRoom = this.data
      // 初始化一个房间 Session 对象, 这里使用 Track 模式
      // const myRoom = new QNRTC.TrackModeSession();
      // // 这里替换成刚刚生成的 RoomToken
      // await myRoom.joinRoomWithToken("CXQ0-jkPJTKH0CrBtOnXJuzLtttZkaLRfndxHEFg:VqvhFvGP8mujRcqgkeAhjEfTYOQ=:eyJhcHBJZCI6ImVjMzB6dW85MyIsInJvb21OYW1lIjoiMTIzIiwidXNlcklkIjoienpmIiwiZXhwaXJlQXQiOjE1NjcyNDcyOTMsInBlcm1pc3Npb24iOiJ1c2VyIn0=");
      // console.log("7");
      console.log(myRoom)
      await this.publish(myRoom);
    },

    // 增加一个函数 publish，用于采集并发布自己的媒体流
    // 这里的参数 myRoom 是指刚刚加入房间时初始化的 Session 对象
    async publish (myRoom) {
      if (this.audiodata == 1) {
        // 我们打开了 3 个参数，即采集音频，采集视频，采集屏幕共享。
        // 这个函数会返回一个列表，列表中每一项就是一个音视频轨对象
        const localTracks = await QNRTC.deviceManager.getLocalTracks({
          audio: { enabled: true, tag: "audio" },
          video: { enabled: true, tag: "video" },
          // screen: { enabled: true, tag: "screen" },
        });
        console.log("8");
        this.releases = localTracks
        // 将刚刚的 Track 列表发布到房间中
        await myRoom.publish(localTracks);
        console.log("9");

        // 获取页面上的一个元素作为播放画面的父元素
        const localElement = document.getElementById("localtracks");
        console.log("10");

        // 遍历本地采集的 Track 对象
        for (const localTrack of localTracks) {
          // 如果这是麦克风采集的音频 Track，我们就不播放它。
          if (localTrack.info.tag === "audio") continue;
          // 调用 Track 对象的 play 方法在这个元素下播放视频轨
          localTrack.play(localElement, true);
        }
      } else if (this.audiodata == 2) {
        // 我们打开了 3 个参数，即采集音频，采集视频，采集屏幕共享。
        // 这个函数会返回一个列表，列表中每一项就是一个音视频轨对象
        const localTracks = await QNRTC.deviceManager.getLocalTracks({
          audio: { enabled: true, tag: "audio" },
          // screen: { enabled: true, tag: "screen" },
        });
        console.log("8");
        this.releases = localTracks
        // 将刚刚的 Track 列表发布到房间中
        await myRoom.publish(localTracks);
        console.log("9");

        // 获取页面上的一个元素作为播放画面的父元素
        const localElement = document.getElementById("localtracks");
        console.log("10");

        // 遍历本地采集的 Track 对象
        // for (const localTrack of localTracks) {
        //   // 如果这是麦克风采集的音频 Track，我们就不播放它。
        //   if (localTrack.info.tag === "audio") continue;
        //   // 调用 Track 对象的 play 方法在这个元素下播放视频轨
        //   localTrack.play(localElement, true);
        // }
      }

    },
    closeNotice () {
      // document.getElementById(this.selectedChat.id).style.display="block"
      // document.getElementById(this.selectedChat.id).removeAttribute("style")
      this.atShow = false
      // this.at
      this.$store.state.chatlist.forEach(item => {
        if (item.id == this.selectedChat.id && item.noticeRight) {
          delete item.noticeRight
        }
      })
    },
    atClick () {
      // console.log($('#' + this.noticeId).offset())
      // console.log($('#' + this.noticeId).parent().parent().parent().parent())
      // console.log($('#' + this.noticeId).parent().parent().parent().parent().offset())
      // console.log($('#' + this.noticeId).parent().parent().parent().parent()[0].offsetTop)
      var top = $('#' + this.noticeId).parent().parent().parent().parent()[0].offsetTop
      var ultop = $('.ul-chatbox')[0].offsetTop
      console.log(this.noticeId, ultop)
      $('.message-wrapper').animate({
        scrollTop: top - ultop      },
        { duration: 100, easing: "swing" })
      this.closeNotice()

    },
    //  在发送信息之后，将输入的内容中属于表情的部分替换成emoji图片标签
    //  再经过v-html 渲染成真正的图片
    replaceFace (con) {
      con = this.decode(con, this.secret_key)
      this.$store.state.chatlist.forEach(item => {
        if (item.id == this.selectedChat.id && item.notice) {
          delete item.notice
        }
        if (item.id == this.selectedChat.id) {
          if (item.noticeRight) {
            // console.log(item.id, 'noticeRight')
            this.noticeId = item.noticeId
            this.atShow = true
            document.getElementById('Group').style.display = "block"
            // console.log(this.atShow)
          } else {
            this.atShow = false

          }
        }
        if (item.id == this.selectedChat.id && item.messages.length == 0) {
          // console.log('aaaaaaaaaaa')
          this.atShow = false
          document.getElementById('Group').style.display = "none"
          delete item.noticeRight
        }

      })


      // console.log(con)
      if (con.includes('/:')) {
        var emojis = this.emojis;
        for (var i = 0; i < emojis.length; i++) {
          if (emojis[i].size == 'xs') {
            con = con.replace(emojis[i].reg, '<img src="static/emoji/' + emojis[i].file + '"  alt="" style="vertical-align: middle;" />');
          } else {
            con = con.replace(emojis[i].reg, '<img src="static/emoji/' + emojis[i].file + '"  alt="" style="vertical-align: middle; width: 100px;" />');
          }
        }
        this.groupInfo.forEach(item => {

          con = con.replace(new RegExp('@' + item.username, 'g'), '<span class="atfriend" style="color:#f55f5f;font-weight:700">' + '@' + item.username + '</span>')
        })
        return con;
      } else {
        con = con.replace(/\n/g, "<br/>")

        this.groupInfo.forEach(item => {
          con = con.replace(new RegExp('@' + item.username, 'g'), '<span class="atfriend" style="color:#f55f5f">' + '@' + item.username + '</span>')
        })
      }
      return con;
    },
    details (image) {
      console.log(image)
      this.imgSrc = image
      this.dialog = 'open'
    },
    close () {
      this.dialog = "close"
      console.log(this.dialog)
    },
    download (url) {
      this.downloadUrl = url
      console.log('已设置')
      setTimeout(function () { this.downloadUrl = ''; console.log('已清空') }, 1000)
    }
  },
  filters: {
    // 将日期过滤为 hour:minutes
    time (date) {
      if (typeof date === 'string') {
        date = new Date(date);
      }
      if (date.getMinutes() < 10) {
        return date.getHours() + ':0' + date.getMinutes();
      } else {
        return date.getHours() + ':' + date.getMinutes();
      }
    }
  },
  destroyed () {
    myRoom.leaveRoom();
  }
}
</script>

<style lang="stylus" scoped>
.filename
  text-align center
  font-size 14px
  color #000
.message
  position relative
  .modal
    position absolute
    display flex
    align-items center
    height 90%
    left 0
    right 0
    top 0
    bottom 0
    margin auto
    background rgba(0, 0, 0, 0.6)
    z-index 10
    .el-icon.el-icon-close
      position absolute
      right 0px
      top 0px
      padding 6px
      cursor pointer
      color #fff
      font-size 18px
      font-weight 700
    .el-icon.el-icon-close:hover
      background-color red
    img
      align-items center
      margin auto
      max-width 90%
      max-height 90%
  width 100%
  height 75%
  background-color #f2f7f7
  border-bottom 1px solid #cccccc40
  .header
    height 86px
    line-height 86px
    box-sizing border-box
    .friendname
      padding-left 30px
      box-shadow 0 3px 3px 0px #16171612
      font-size 26px
      color #303841
      .sign
        display inline-block
        width 10px
        height 10px
        border-radius 50%
        background-color #52d68a
  .message-wrapper
    height calc(100% - 86px)
    padding 10px 15px
    box-sizing border-box
    overflow-y auto
    .message
      margin-bottom 15px
    .time
      width 100%
      font-size 12px
      margin 7px auto
      text-align center
      span
        display inline-block
        padding 4px 6px
        color #b2b2b2
        border-radius 3px
    .main
      display flex
      padding 5px 0
      .avatar
        box-shadow 0px 3px 6px 0 #818181
        float left
        margin 0 5px
        border-radius 50%
        min-width 52px
      .content-box
        flex-direction column
        vertical-align text-bottom
        line-height 54px
        width 90%
        span
          display inline-block
          font-size 12px
          color #888
          white-space nowrap
          text-overflow ellipsis
        .content
          display inline-block
          margin-left 10px
          position relative
          color #000
          padding 4px 10px
          max-width 60%
          min-height 34px
          line-height 24px
          box-sizing border-box
          font-size 16px
          text-align left
          word-break break-all
          background-color #fff
          border-radius 4px
          &:before
            content ' '
            position absolute
            top 12px
            right 100%
            border 6px solid transparent
            border-right-color #fff
        .content-imag
          background none
          display inline-block
          margin-left 10px
          position relative
          padding 4px 10px
          max-width 330px
          min-height 34px
          line-height 24px
          box-sizing border-box
          font-size 16px
          text-align left
          word-break break-all
          border-radius 4px
          .recall
            color #888
            padding 5px 10px
            background-color #fff
            border-radius 4px
            position relative
        .content-el
          display inline-block
          margin-left 10px
          position relative
          padding 4px 10px
          max-width 70%
          min-height 34px
          line-height 24px
          box-sizing border-box
          font-size 16px
          text-align left
          word-break break-all
          background-color #ffffff
          border-radius 4px
          padding 6px 14px
          &:before
            content ' '
            position absolute
            top 12px
            right 100%
            border 6px solid transparent
            border-right-color #fff
        .recall
          color #888
          font-size 16px
    .self
      display block
      text-align right
      .avatar
        float right
        margin 0 15px
        box-shadow 0px 3px 6px 0 #818181
      .content-box
        .content
          background-color #52d68a
          color #fff
          float right
          margin-top 12px
          &:before
            right -12px
            vertical-align middle
            border-right-color transparent
            border-left-color #52d68a
        .content-imag
          background none
          color #fff
          float right
          margin-top 12px
        .content-el
          background-color #fff
          border 2px solid #52d68a
          color #fff
          float right
          margin-top 12px
          padding 6px 14px
          &:before
            right -12px
            vertical-align middle
            border-right-color transparent
            border-left-color #52d68a
        .recall
          color #888
          font-size 16px
</style>
<style scoped>
.message .message-wrapper .list-a {
  position: absolute;
  top: 86px;
  left: 0;
  right: 0;
  z-index: 100;
}
.message .message-wrapper .main.self .content-box .content-imag .recall {
  border: 2px solid #52d68a;
}
.message .message-wrapper .main.self .content-box .content-imag .recall:before {
  content: " ";
  position: absolute;
  top: 12px;
  left: 100%;
  border: 6px solid transparent;
  border-left-color: #52d68a;
}
.message .message-wrapper .main .content-box .content-imag .recall:before {
  content: " ";
  position: absolute;
  top: 12px;
  right: 100%;
  border: 6px solid transparent;
  border-right-color: #fff;
}
#top {
  position: fixed;
  width: 800px;
  top: 10%;
  z-index: 999999;
  background: #323232;
}
.zoom {
  position: relative;
  width: 800px;
  height: 540px;
  display: flex;
  flex-wrap: wrap;
  background: #000;
}
.remotetracks1 {
  display: flex;
  width: 100%;
  height: 33%;
  flex-wrap: wrap;
}
.localtracks1 {
  width: 25%;
  height: 33%;
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 0;
}
.remotetracks {
  position: fixed;
  width: 220px;
}
.localtracks {
  position: absolute;
  width: 800px;
  height: 540px;
  background: #000;
  z-index: -999;
}
.videos {
  width: 800px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  position: relative;
  background: #323232;
}
.videos div:nth-child(2) {
  cursor: pointer;
  color: #fff;
  line-height: 40px;
  font-size: 24px;
}
.daxiao {
  position: absolute;
  bottom: -40px;
  right: 10px;
  z-index: 9999999;
  width: 30px;
  height: 30px;
}
.dataaudio {
  position: absolute;
  top: 6.5%;
  right: -251.8px;
  width: 240px;
  height: 70%;
  background: #fff;
  z-index: 999;
}
.dataaudio div:nth-child(1) {
  text-align: center;
  width: 100%;
  font-size: 20px;
  font-weight: 550;
}
.dataaudio div:nth-child(2) {
  text-align: center;
  margin-top: 20px;
}
.dataaudio div:nth-child(3) {
  text-align: center;
  margin-top: 20px;
}
.dataaudio div:nth-child(3) button {
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
  width: 800px;
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
<style>
  /* AGENT_SHEET */
.message scrollbarbutton[sbattr="scrollbar-up-top"],
.message scrollbarbutton[sbattr="scrollbar-down-top"],
.message scrollbarbutton[sbattr="scrollbar-up-bottom"],
.message scrollbarbutton[sbattr="scrollbar-down-bottom"]
{
  -moz-appearance: none !important;
  display: none !important;
}

.message scrollbar thumb
{
  position: relative !important;
  -moz-appearance: none !important;
  background: rgba(150,150,150,.5) !important;
  border: 0 !important;
  border-radius: 5px !important;
  border: 0 !important;
}

.message scrollbar thumb:hover
{
  background: rgba(120,120,120,.5) !important;
}

.message scrollbar thumb:active
{
  background: rgba(100,100,100,.5) !important;
}

.message scrollbar[orient="vertical"] thumb
{
  width: 7px !important;
}

.message scrollbar[orient="vertical"]
{
  padding: 1px 0 !important;
}

.message scrollbar[orient="horizontal"]
{
  padding: 0 1px !important;
}

 .message scrollbar[orient="vertical"],
.message scrollbar[orient="horizontal"]
{
  padding: 1px !important;
}

.message scrollbar
{
  -moz-appearance: none !important;
  background: none !important;
  position: relative !important;
  z-index: 9999 !important;
}

.message scrollbar[orient="vertical"]
{
  margin-left: -11px !important;
}

.message scrollbar[orient="horizontal"] thumb
{
  height: 7px !important;
}

.message scrollbar[orient="horizontal"]
{
  margin-top: -11px !important;
}
</style>
<style>
  .nicescroll-cursors{
    position: relative;
    top: 234px;
    float: right;
    width: 8px;
    height: 430px;
    background-color: rgb(129, 129, 129)!important;
    border: 1px solid rgb(255, 255, 255);
    background-clip: padding-box;
    border-radius: 15px;
  }
</style>
