import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import qs from 'qs'

import axios from 'axios'
import { Message} from 'element-ui';
// 导入element-ui的样式文件
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Vuex)

import root from '../config/dev.env.js'


var API = process.env.API_ROOT
var encode = function encodeUnicode(str, random) {
  var res = [];
  // console.log(random)
  random = parseInt(random)
      // 去除字符串的回车符
  str = str.replace(/[\r\n]/g, "")
      // console.log(str.length, '----')
      // console.log(random)
  for (var i = 0; i < str.length; i++) {
      // console.log(str.charCodeAt(i), str.charCodeAt(i) + random)
      res[i] = ("00" + (str.charCodeAt(i) + random).toString(16)).slice(-4)
          // res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  // console.log(res)
  return "\\u" + res.join("\\u");
}

// unicode解码
var decode = function decodeUnicode(str, random) {
  var res = [];
  str = str.replace(/\\/g, "%");
  str = unescape(str);
  random = parseInt(random)
  for (var i = 0; i < str.length; i++) {
      var a = str.charCodeAt(i) - random
      res[i] = ("00" + a.toString(16)).slice(-4)
  }
  str = "\\u" + res.join("\\u");
  str = str.replace(/\\/g, "%");
  return unescape(str);
}

    //获取当前时间
const now = new Date();
const state = {
    //联系人
    contacts:'',
    //联系人数组
    contactslist:'',
    //当前选择联系人数组
    contactslists:'',
    //消息
    news:'',
    //群组
    groupslist:'',
    //群组列表
    groupsdata:'',
    //选择的群组
    groupsdatas:'',
    //通知
    notices:'',
    //接收到的通知数
    num:'',
    //通知数组
    numlist:[],
    numlists:[],
    //选择的通知id
    noticesid:'',
    audioup:'',
    userids:[],
    conversation:'',
    roomToken1:'',
    roomToken2:'',
    email: '',
    // 添加朋友加号按钮
    active: 1,
    // 添加群组加号按钮
    activeGroup: 1,
    //  添加朋友按钮（消息列表）
    activeMessage: 1,
    // 输入的搜索值
    searchText: '',
    searchText2: '',
    zt:1,
    oo_avatar:sessionStorage.oo_avatar,
    oo_username:sessionStorage.oo_username,
    // 当前登录用户
    user: {
        name: 'ratel',
        img: 'static/images/UserAvatar.jpg'
    },
    // 对话好友列表
    chatlist: [

    ],
    // 好友列表
    friendlist: [

    ],
    grouplist: [],
    //emoji表情
    emojis: [{
            file: '100.gif',
            code: '/::)',
            title: '微笑',
            reg: /\/::\)/g,
            size: 'xs'
        },
        {
            file: '101.gif',
            code: '/::~',
            title: '伤心',
            reg: /\/::~/g,
            size: 'xs'
        },
        {
            file: '102.gif',
            code: '/::B',
            title: '美女',
            reg: /\/::B/g,
            size: 'xs'
        },
        {
            file: '103.gif',
            code: '/::|',
            title: '发呆',
            reg: /\/::\|/g,
            size: 'xs'
        },
        {
            file: '104.gif',
            code: '/:8-)',
            title: '墨镜',
            reg: /\/:8-\)/g,
            size: 'xs'
        },
        {
            file: '105.gif',
            code: '/::<',
            title: '哭',
            reg: /\/::</g,
            size: 'xs'
        },
        {
            file: '106.gif',
            code: '/::$',
            title: '羞',
            reg: /\/::\$/g,
            size: 'xs'
        },
        {
            file: '107.gif',
            code: '/::X',
            title: '哑',
            reg: /\/::X/g,
            size: 'xs'
        },
        {
            file: '108.gif',
            code: '/::Z',
            title: '睡',
            reg: /\/::Z/g,
            size: 'xs'
        },
        {
            file: '109.gif',
            code: '/::\'(',
            title: '哭',
            reg: /\/::'\(/g,
            size: 'xs'
        },
        {
            file: '110.gif',
            code: '/::-|',
            title: '囧',
            reg: /\/::-\|/g,
            size: 'xs'
        },
        {
            file: '111.gif',
            code: '/::@',
            title: '怒',
            reg: /\/::@/g,
            size: 'xs'
        },
        {
            file: '112.gif',
            code: '/::P',
            title: '调皮',
            reg: /\/::P/g,
            size: 'xs'
        },
        {
            file: '113.gif',
            code: '/::D',
            title: '笑',
            reg: /\/::D/g,
            size: 'xs'
        },
        {
            file: '114.gif',
            code: '/::O',
            title: '惊讶',
            reg: /\/::O/g,
            size: 'xs'
        },
        {
            file: '115.gif',
            code: '/::(',
            title: '难过',
            reg: /\/::\(/g,
            size: 'xs'
        },
        {
            file: '116.gif',
            code: '/::+',
            title: '酷',
            reg: /\/::\+/g,
            size: 'xs'
        },
        {
            file: '117.gif',
            code: '/:--b',
            title: '汗',
            reg: /\/:--b/g,
            size: 'xs'
        },
        {
            file: '118.gif',
            code: '/::Q',
            title: '抓狂',
            reg: /\/::Q/g,
            size: 'xs'
        },
        {
            file: '119.gif',
            code: '/::T',
            title: '吐',
            reg: /\/::T/g,
            size: 'xs'
        },
        {
            file: '120.gif',
            code: '/:,@P',
            title: '笑',
            reg: /\/:,@P/g,
            size: 'xs'
        },
        {
            file: '121.gif',
            code: '/:,@-D',
            title: '快乐',
            reg: /\/:,@-D/g,
            size: 'xs'
        },
        {
            file: '122.gif',
            code: '/::d',
            title: '奇',
            reg: /\/::d/g,
            size: 'xs'
        },
        {
            file: '123.gif',
            code: '/:,@o',
            title: '傲',
            reg: /\/:,@o/g,
            size: 'xs'
        },
        {
            file: '124.gif',
            code: '/::g',
            title: '饿',
            reg: /\/::g/g,
            size: 'xs'
        },
        {
            file: '125.gif',
            code: '/:|-)',
            title: '累',
            reg: /\/:\|-\)/g,
            size: 'xs'
        },
        {
            file: '126.gif',
            code: '/::!',
            title: '吓',
            reg: /\/::!/g,
            size: 'xs'
        },
        {
            file: '127.gif',
            code: '/::L',
            title: '汗',
            reg: /\/::L/g,
            size: 'xs'
        },
        {
            file: '128.gif',
            code: '/::>',
            title: '高兴',
            reg: /\/::>/g,
            size: 'xs'
        },
        {
            file: '129.gif',
            code: '/::,@',
            title: '闲',
            reg: /\/::,@/g,
            size: 'xs'
        },
        {
            file: '130.gif',
            code: '/:,@f',
            title: '努力',
            reg: /\/:,@f/g,
            size: 'xs'
        },
        {
            file: '131.gif',
            code: '/::-S',
            title: '骂',
            reg: /\/::-S/g,
            size: 'xs'
        },
        {
            file: '133.gif',
            code: '/:,@x',
            title: '秘密',
            reg: /\/:,@x/g,
            size: 'xs'
        },
        {
            file: '134.gif',
            code: '/:,@@',
            title: '乱',
            reg: /\/:,@@/g,
            size: 'xs'
        },
        {
            file: '135.gif',
            code: '/::8',
            title: '疯',
            reg: /\/::8/g,
            size: 'xs'
        },
        {
            file: '136.gif',
            code: '/:,@!',
            title: '哀',
            reg: /\/:,@!/g,
            size: 'xs'
        },
        {
            file: '137.gif',
            code: '/:!!!',
            title: '鬼',
            reg: /\/:!!!/g,
            size: 'xs'
        },
        {
            file: '138.gif',
            code: '/:xx',
            title: '打击',
            reg: /\/:xx/g,
            size: 'xs'
        },
        {
            file: '139.gif',
            code: '/:bye',
            title: 'bye',
            reg: /\/:bye/g,
            size: 'xs'
        },
        {
            file: '142.gif',
            code: '/:handclap',
            title: '鼓掌',
            reg: /\/:handclap/g,
            size: 'xs'
        },
        {
            file: '145.gif',
            code: '/:<@',
            title: '什么',
            reg: /\/:<@/g,
            size: 'xs'
        },
        {
            file: '147.gif',
            code: '/::-O',
            title: '累',
            reg: /\/::-O/g,
            size: 'xs'
        },
        {
            file: '153.gif',
            code: '/:@x',
            title: '吓',
            reg: /\/:@x/g,
            size: 'xs'
        },
        {
            file: '155.gif',
            code: '/:pd',
            title: '刀',
            reg: /\/:pd/g,
            size: 'xs'
        },
        {
            file: '156.gif',
            code: '/:<W>',
            title: '水果',
            reg: /\/:<W>/g,
            size: 'xs'
        },
        {
            file: '157.gif',
            code: '/:beer',
            title: '酒',
            reg: /\/:beer/g,
            size: 'xs'
        },
        {
            file: '158.gif',
            code: '/:basketb',
            title: '篮球',
            reg: /\/:basketb/g,
            size: 'xs'
        },
        {
            file: '159.gif',
            code: '/:oo',
            title: '乒乓',
            reg: /\/:oo/g,
            size: 'xs'
        },
        {
            file: '195.gif',
            code: '/:circle',
            title: '跳舞',
            reg: /\/:circle/g,
            size: 'xs'
        },
        {
            file: '160.gif',
            code: '/:coffee',
            title: '咖啡',
            reg: /\/:coffee/g,
            size: 'xs'
        },
        {
            file: '200.gif',
            code: '/:zb',
            title: '自闭',
            reg: /\/:zb/g,
            size: 'lg'
        },
        {
            file: '201.gif',
            code: '/:gxfc',
            title: '恭喜发财',
            reg: /\/:gxfc/g,
            size: 'lg'
        },
        {
            file: '202.gif',
            code: '/:hen',
            title: '哼',
            reg: /\/:hen/g,
            size: 'lg'
        },
        {
            file: '203.gif',
            code: '/:hb',
            title: '等红包',
            reg: /\/:hb/g,
            size: 'lg'
        },
        {
            file: '204.gif',
            code: '/:kl',
            title: '哭了',
            reg: /\/:kl/g,
            size: 'lg'
        },
        {
            file: '205.gif',
            code: '/:comeon',
            title: '来呀',
            reg: /\/:comeon/g,
            size: 'lg'
        },
        {
            file: '206.gif',
            code: '/:hello',
            title: '你好',
            reg: /\/:hello/g,
            size: 'lg'
        },
        {
            file: '207.gif',
            code: '/:o',
            title: '哦',
            reg: /\/:o/g,
            size: 'lg'
        },
        {
            file: '208.gif',
            code: '/:sleep',
            title: '睡了',
            reg: /\/:sleep/g,
            size: 'lg'
        },
        {
            file: '209.gif',
            code: '/:newyear',
            title: '新年快乐',
            reg: /\/:newyear/g,
            size: 'lg'
        }
    ],
    // 得知当前选择的是哪个对话
    selectId: 'default',
    // 得知当前选择的是哪个好友
    selectFriendId: -1,
    // 得知当前选择的是哪个群组
    selectGroupId: 0,

    selectnav: 'friend',
  user_account_id: sessionStorage.email,
    messageId:''
}

const mutations = {
    setroomToken(state,roomToken1){
      state.roomToken1 = roomToken1  
    },
    setroomTokens(state,roomToken2){
        state.roomToken2 = roomToken2
    },
    setconversation(state,conversation){
        state.conversation = conversation
    },
    // 从localStorage 中获取数据
    initData(state) {
        // console.log(state.chatlist)
        if (!state.chatlist) {
            // window.location.href = "/#/friend";
            router.push({
                path: '/friend'
            })
        }
        let data = JSON.parse(localStorage.getItem(sessionStorage.email)).chatlist
        console.log(data)
        if (data) {
            state.chatlist = data;
            state.selectId = state.chatlist[0].id
        }
        state.selectId = state.chatlist[0].id
    },
    // 获取搜索值
    search(state, value) {
        state.searchText = value
    },
    // 获取搜索值
    search2(state, value) {
        state.searchText2 = value
    },
    // 得知用户当前选择的是哪个对话。便于匹配对应的对话框
    selectSession(state, value) {
        console.log(state)
      state.selectId = value
      var datamess = 0
      state.numlist.forEach(item => {
        // if(item.tips > 0){
        //     datamess = 1
        // }
        if (item.record_id == value) {
          delete item.notice
        }
      })
        if(datamess == 0){
            state.conversation = 0
        }
        state.activeMessage = 1
    },
    // 得知用户当前选择的是哪个好友。
    selectFriend(state, value) {
        console.log(state)
        state.contactslist = value
            // active=1不显示添加好友按钮
        state.active = 1
    },
    // 得知用户当前选择的是哪个好友。
    selectGroup(state, value) {
        state.selectGroupId = value
            // active=1不显示添加好友按钮
        state.activeGroup = 1
    },
    // 发送信息
    sendMessage(state, msg) {
        let result = state.chatlist.find(session => session.id === state.selectId);
        console.log(msg)
        console.log(result)

        // function compare(property) {
        //     return function(obj1, obj2) {
        //         var value1 = obj1[property];
        //         var value2 = obj2[property];
        //         return value2 - value1; // 降序
        //     }
        // }
        // // var sortObj = state.chatlist.sort(compare("timestamp"));
        // state.chatlist.sort(compare("timestamp")).forEach((item, index) => {
        //     item.index = index + 1
        // })

        // console.log(state.chatlist,'------------------------------------------')


        if (msg.type) {
            result.messages.push({
                // content: msg.content,
                content: encode(msg.content,sessionStorage.secret_key),
                type: msg.type,
                image: msg.image,
                downloadUrl: msg.downloadUrl,
                videoUrl: msg.videoUrl,
                audioUrl: msg.audioUrl,
                url: msg.url,
                date: msg.date,
                shiping: msg.yuyin,
                self: true //发送者
            });
        } else {
            axios.post('/saveMessage?lang=' + sessionStorage.lang, qs.stringify({
                    token: sessionStorage.token,
                    id: state.selectId,
                    content: encode(msg.content, sessionStorage.secret_key),
                    showBurn:msg.showBurn
                }))
                .then(function(res) {
                  if (res.data.status == 1) {
                    state.messageId = res.data.id
                    console.log(state.messageId)
                    } else if (res.data.status == 0) {
                    // alert(res.data.msg)
                    Message({
                      showClose: true,
                      type: 'error',
                      message:res.data.msg
                    });
                        return false
                    }
                })
                // console.log(msg.content)
            result.messages.push({
                content: encode(msg.content,sessionStorage.secret_key),
                date: msg.date,
              self: true, //发送者
              showBurn: msg.showBurn,
              id:state.messageId
            });
            if (result.user.name === '机器人') {
                setTimeout(() => {
                    result.messages.push({
                        content:encode( msg.reply,sessionStorage.secret_key),
                        date: new Date(),
                        self: false //他人
                    });
                }, 500)
            }
        }

    },
    recallMessage() {
        let result = state.chatlist.find(session => session.id === state.selectId);
        axios.post('/deleteMessage?lang=' + sessionStorage.lang, qs.stringify({
                token: sessionStorage.token,
                id: state.selectId
            }))
            .then(function(res) {
              if (res.data.status == 0) {
                Message({
                  showClose: true,
                  type: 'warning',
                  message: res.data.msg
                });
         
                    // alert(res.data.msg)
                    return false
                } else {
                    var msg = result.messages
                    var mymessage = []
                    for (var item in msg) {
                        if (msg[item].self == true && msg[item].recall != true) {
                            mymessage.push(msg[item])
                        }
                    }
                    var lastmessage = mymessage.pop()
                    lastmessage.content =encode('已撤回',sessionStorage.secret_key)
                    lastmessage.recall = true
                }
            })
    },
    clearlocalstorage() {
        // localStorage.clear()
        // state.chatlist = []
    },
    clearMessage(state, value) {
        state.chatlist.forEach(item => {
            if (item.id == value) {
                // state.chatlist.splice(index,1);
                item.last = null
                // item.chatname=''
                // item.content=''
              item.messages = []
            }
        })
    },
    // 选择好友后，点击发送信息。判断在聊天列表中是否有该好友，有的话跳到该好友对话。没有的话
    // 添加该好友的对话 并置顶
    sendFriend(state) {
        console.log(state.selectFriendId)
        console.log(state.friendlist)
        console.log(state.chatlist)
        let result = state.friendlist.find(friend => friend.id === state.selectFriendId)
        let msg = state.chatlist.find(msg => msg.user.name === result.username)
        console.log(result)
        console.log(msg)
        state.email = result.email
        if (!msg) {
            state.selectId = state.selectFriendId
                // state.selectId = 1
            for (let i = 0; i < state.chatlist.length; i++) {
                // state.chatlist[i].id++;
                state.chatlist[i].index++;
            }
            state.chatlist.unshift({
                id: state.selectFriendId,
                // id: 1,
                user: {
                    name: result.username,
                  img: result.img,
                    email:result.email

                },
                messages: [{
                    // content: '已经置顶聊天，可以给我发信息啦！',
                        content: encode('已经置顶聊天，可以发信息啦！',sessionStorage.secret_key),
                    date: new Date(),
                    img: result.img
                }],
                index: 1
            })
            router.push({
                path: '/message'
            })
        } else {
            // state.selectId = result.id
            state.selectId = msg.id
            router.push({
                path: '/message'
            })
        }
    },
    // 通过群聊里面私聊好友
    sendPrivatemess(state, value) {
        console.log(value)
        let result = state.friendlist.find(friend => friend.id === value)
        let msg = state.chatlist.find(msg => msg.user.name === result.username)
        console.log(result)
        console.log(msg)
        if (!msg) {
            state.selectId = value
                // state.selectId = 1
            for (let i = 0; i < state.chatlist.length; i++) {
                // state.chatlist[i].id++;
                state.chatlist[i].index++;
            }
            state.chatlist.unshift({
                id: value,
                // id: 1,
                user: {
                    name: result.username,
                    img: result.img,
                    email: result.email,

                },
                messages: [{
                    // content: '已经置顶聊天，可以给我发信息啦！',
                    content: encode('已经置顶聊天，可以发信息啦！',sessionStorage.secret_key),
                    date: new Date(),
                    img: result.img
                }],
                index: 1
            })

        } else {
            // state.selectId = result.id
            state.selectId = msg.id

        }
    },
    sendGroup(state) {
        console.log(state)
        let result = state.grouplist.find(group => group.id === state.selectGroupId)
        let msg = state.chatlist.find(msg => msg.user.name === result.username)
        console.log(msg)

        if (!msg) {
            // state.selectId = 1
            state.selectId = state.selectGroupId
            for (let i = 0; i < state.chatlist.length; i++) {
                // state.chatlist[i].id++;
                state.chatlist[i].index++;
            }
            state.chatlist.unshift({
                // id: 1,
                id: state.selectGroupId,
                user: {
                    name: result.username,
                    img: result.img
                },
              //   messages: [{
              //     // content: encode('已经置顶聊天，可以给我发信息啦！',sessionStorage.secret_key),
              //     content:'已经置顶聊天，可以给我发信息啦！',
              //       date: new Date(),
              //       img: result.img
              // }],
              messages: [],
                index: 1
            })
            router.push({
                path: '/message'
            })
        } else {
            state.selectId = msg.id
            router.push({
                path: '/message'
            })
        }
    },
    // 设置当前点击导航
    nav(state, value) {
        console.log(value)
        state.selectnav = value
        refresh(state.selectnav)
    },
    delchat(state, value) {
        var newArr = []
        for (var item in state.chatlist) {
            if (state.chatlist[item].id != value) {
                newArr.push(state.chatlist[item])
            }
        }
        state.chatlist = newArr
        state.selectId = ''
    }


}
const getters = {
    // 筛选出含有搜索值的聊天列表
    searchedChatlist(state) {
        for (var item in state.chatlist) {
            if (state.chatlist[item].user.name == null) {
                state.chatlist[item].user.name = '未知'
            }
        }
        let sessions = state.chatlist.filter(sessions => sessions.user.name.includes(state.searchText));
        return sessions
    },
    //筛选出含有搜索值的通知
    searchednumlist(state){
        for (var item in state.numlist) {
            if (state.numlist[item].friend_name == null) {
                state.numlist[item].friend_name = '未知'
            }
        }
        let sessions = state.numlist.filter(sessions => sessions.friend_name.includes(state.searchText));
        return sessions
    },
    // 筛选出含有搜索值的好友列表
    searchedFriendlist(state) {
        let friends = state.friendlist.filter(friends => friends.username.includes(state.searchText));
        return friends
    },
    // 筛选出含有搜索值的群组列表
    searchedGrouplist(state) {
        let groups = state.grouplist.filter(groups => groups.username.includes(state.searchText));
        return groups
    },
    // 筛选出含有搜索值的好友列表
    searchedFriendlist2(state) {
        let friends = state.friendlist.filter(friends => friends.username.includes(state.searchText2));
        return friends
    },
    // 通过当前选择是哪个对话匹配相应的对话
    selectedChat(state) {
        let session = state.chatlist.find(session => session.id === state.selectId);
      // console.log(session)
      // session.content = decode(session.content, sessionStorage.secret_key)
      // session.messages.forEach((item) => {
      //   item.content = decode(item.content,sessionStorage.secret_key)
      // })
        return session
    },
    // 通过当前选择是哪个好友匹配相应的好友
    selectedFriend(state) {
        let friend = state.friendlist.find(friend => friend.id === state.selectFriendId);
        return friend
    },
    // 通过当前选择是哪个好友匹配相应的群组
    selectedGroup(state) {
        let group = state.grouplist.find(group => group.id === state.selectGroupId);
        return group
    },
    messages(state) {
        let session = state.chatlist.find(session => session.id === state.selectId);
        return session.messages
    },
}

const actions = {
    search: ({
        commit
    }, value) => {
        setTimeout(() => {
            commit('search', value)
        }, 100)
    },
    search2: ({
        commit
    }, value) => {
        setTimeout(() => {
            commit('search2', value)
        }, 100)
    },
    selectSession: ({
        commit
    }, value) => commit('selectSession', value),
    selectFriend: ({
        commit
    }, value) => commit('selectFriend', value),
    delchat: ({
        commit
    }, value) => commit('delchat', value),
    selectGroup: ({
        commit
    }, value) => commit('selectGroup', value),
    sendMessage: ({
        commit
    }, msg) => commit('sendMessage', msg),
    recallMessage: ({
        commit
    }) => commit('recallMessage'),
    clearlocalstorage: ({
        commit
    }) => commit('clearlocalstorage'),
    clearMessage: ({
        commit
    }, value) => commit('clearMessage', value),
    sendGroup: ({
        commit
    }) => commit('sendGroup'),
    sendFriend: ({
        commit
    }) => commit('sendFriend'),
    sendPrivatemess: ({
        commit
    }, value) => commit('sendPrivatemess', value),
    initData: ({
        commit
    }) => commit('initData'),
    nav: ({
        commit
    }, value) => commit('nav', value),
}
const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})

// 监听聊天列表的值， 发生变化就保存在localStorage中
store.watch(
        (state) => state,
        (val) => {
            // console.log(val)
            // if (sessionStorage.email) {

            localStorage.setItem(sessionStorage.email, JSON.stringify(val));
            // } else {
            // val = {}
            // }


        }, {
            deep: true
        }

    )
    // state.selectId = state.chatlist[0].id
var pageTimer = {}


refreshChatList()
refreshFriendList()
refreshGroupList()
    // sortAction()
// setInterval(refreshChatList, 5000)
// setInterval(refreshFriendList, 5000)
// setInterval(refreshGroupList, 5000)
    // setInterval(sortAction, 1000)

// 根据导航刷新所选列表
function refresh(params) {
    if (params == 'group') {
        refreshGroupList()
        pageTimer[params] = setInterval(refreshGroupList, 1000)
    }
    //全部清除方法
    for (var item in pageTimer) {
        if (item != params) {
            clearInterval(pageTimer[item]);
        }
    }
}

async function refreshChatList() {
    if (!sessionStorage.token) {
        return
    }
    var _this = this;
    var domain = (process.env.API_ROOT != '') ? process.env.API_ROOT : (window.location.host + '/')
    var domainname = window.location.protocol
    axios.defaults.baseURL = domainname + '//' + domain + 'OO/index.php'
    await axios.post('/messageList?lang=' + sessionStorage.lang, qs.stringify({
            token: sessionStorage.token
        }))
        .then(function(res) {
            if (res.data.status == 1) {
                // console.log(res)
                // state.chatlist = res.data.data
                sessionStorage.secret_key = res.data.secret_key
                messagehandle(res.data.data,res.data.sound,res.data.message)
            } else if (res.data.status == 9) {
              Message({
                showClose: true,
                type: 'error',
                message:'登录已失效，请重新登录'
              });
                sessionStorage.clear()
                window.location.href = "/#/login";
            }
        })
}

function messagehandle(data,sound,message) {
    // localStorage.clear()
    // 先将新消息好友添加进list
    var temp = {}
    // if(message == 1){
    //    var aaa = localStorage.getItem(sessionStorage.email)
    //    console.log(aaa)
    //    aaa={message:message}
    // }
    for (var x in data) {
        temp[x] = true
        for (var y in state.chatlist) {
            if (data[x].id == state.chatlist[y].id) {
                temp[x] = false
            }
        }
    }
    for (var x in data) {
        if (temp[x] == true) {
            data[x].messages = []
            state.chatlist.push(data[x])
        }
    }
    // 如果chatlist有值,与data比对，将新消息插入chatlist
    for (var x in data) {
        // console.log(data)
        if (data[x].talk.length > 0) {
            for (var y in state.chatlist) {
                if (data[x].id == state.chatlist[y].id) {
                    for (var z in data[x].talk) {
                        console.log(data[x].talk[z])
                        if(message == 1){
                            state.conversation = 1
                        }
                        if(data[x].talk[z].content_type == 'shiping'){
                            state.audioup = 1
                        }
                        if (data[x].talk[z].recall) {
                            for (var i in state.chatlist[y].messages) {
                                if (state.chatlist[y].messages[i].id == data[x].talk[z].id) {
                                    state.chatlist[y].messages[i].content = encode('撤回了一条消息',sessionStorage.secret_key)
                                    state.chatlist[y].messages[i].recall = true
                                }
                            }
                        } else {
                            state.chatlist[y].messages.push(data[x].talk[z])
                        }

                        if (state.chatlist[y].id != state.selectId) {
                            if (state.chatlist[y].tips) {
                                state.chatlist[y].tips += 1
                            } else {
                                state.chatlist[y].tips = 1
                            }
                        }
                        playSound(sound);
                        // 新消息置顶
                        state.chatlist[y].index = 1
                        for (let i = 0; i < state.chatlist.length; i++) {
                            state.chatlist[i].index++;
                        }
                        // mutations.selectSession(state,data[x].id)
                    }
                }
            }
        }
    }
    // 实时更新网名和头像和最新消息时间
    for (var x in data) {
      for (var y in state.chatlist) {
        if (data[x].id == state.chatlist[y].id) {
                if (data[x].notice) {
                  state.chatlist[y].notice = data[x].notice
                  state.chatlist[y].noticeRight = data[x].notice
                  state.chatlist[y].noticeId = data[x].noticeId
                  
                }
                state.chatlist[y].user.name = data[x].user.name
                state.chatlist[y].user.img = data[x].user.img
                state.chatlist[y].user.email = data[x].user.email
                state.chatlist[y].user.sign = data[x].user.sign
                state.chatlist[y].user.address = data[x].user.address
                state.chatlist[y].master = data[x].master
                state.chatlist[y].applydate = data[x].applydate
               state.chatlist[y].content = data[x].content
                // state.chatlist[y].content = decode(data[x].content, sessionStorage.secret_key)
                state.chatlist[y].timestamp = data[x].timestamp
            }
        }
    }
    // console.log(localStorage.getItem(sessionStorage.email))
}
// }

function refreshFriendList() {
    var _this = this;
    axios.post('userList?lang=' + sessionStorage.lang, qs.stringify({
        token: sessionStorage.token
    })).then(res => {
        if (res.data.status == 1) {
            state.friendlist = res.data.data
                // 实时更新网名和头像和最新消息时间
            state.userids = state.friendlist[0].tips
            var data = res.data.data
            // console.log(state.friendlist[0].ids)
            // console.log(data[0].ids)
            // var leng = 1;
            // for(let i=0;i<state.friendlist[0].ids.length;i++){
            //     console.log(state.friendlist[0].ids[i])
            //     console.log(state.friendlist[0].ids[i].length)
            //     for(let j=0;j<state.userids.length;j++){
            //         console.log(state.userids[j])
            //         if(state.friendlist[0].ids[i] == state.userids[j]){
            //             leng++;
            //             continue
            //         }
            //     }
            // }
            // console.log(leng)
            
            for (var x in data) {
                for (var y in state.friendlist) {
                    if (state.friendlist[y].id == data[x].id) {
                        state.friendlist[y].username = data[x].username
                        state.friendlist[y].img = data[x].img
                        state.friendlist[y].applydate = data[x].applydate
                        state.friendlist[y].ids = data[x].ids
                    }
                }
            }
        } else if (res.data.status == 0) {
            this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'error'
            });
        }
    })
}

function refreshGroupList() {
    var _this = this;
    axios.post('groupList?lang=' + sessionStorage.lang, qs.stringify({
            token: sessionStorage.token
        }))
        .then(function(res) {
            if (res.data.status == 1) {
                state.grouplist = res.data.data
                    // 实时更新网名和头像和最新消息时间
                var data = res.data.data
                for (var x in data) {
                    for (var y in state.grouplist) {
                        if (data[x].id == state.grouplist[y].id) {
                            state.grouplist[y].username = data[x].username
                          state.grouplist[y].uimg = data[x].img
                        
                            state.grouplist[y].applydate = data[x].applydate
                        }
                    }
                }
            }
        })
}


function playSound(sound) {
  console.log(sound)
    var borswer = window.navigator.userAgent.toLowerCase();
    if (borswer.indexOf("ie") >= 0) {
        //IE内核浏览器
      // if (!document.getElementById('audioPlay')) {
        var soundflag1 = 0
        // 好友新消息声音开关
        if (sound.soundFriendSwitch == 1) {
          if (sound.xiangFriend == 1) {
            document.getElementById("newMsg").innerHTML = '<embed name="embedPlay" src='+sound.sound+ 'autostart="true" hidden="true" loop="false"></embed>'
            
            soundflag1=1
            }
        }
        if (soundflag1 == 0) {
          if (sound.soundGroupSwitch == 1) {
            if (sound.xiangGroup == 1) {
              document.getElementById("newMsg").innerHTML = '<embed name="embedPlay" src='+sound.sound+ 'autostart="true" hidden="true" loop="false"></embed>'
              }
            }
          }
        // }
        var embed = document.embedPlay;
        //浏览器不支持 audion，则使用 embed 播放
        embed.volume = 100;
        //embed.play();这个不需要
    } else {
        //非IE内核浏览器
      // if (!document.getElementById('audioPlay')) {
        var soundflag = 0
        // 好友新消息声音开关
        if (sound.soundFriendSwitch == 1) {
          if (sound.xiangFriend == 1) {
            document.getElementById("newMsg").innerHTML = '<audio id=audioPlay src=' + sound.sound + ' hidden=true>'
              console.log( document.getElementById("newMsg"))
            soundflag=1
            }
        }
        if (soundflag == 0) {
          if (sound.soundGroupSwitch == 1) {
            if (sound.xiangGroup == 1) {
              document.getElementById("newMsg").innerHTML = '<audio id=audioPlay src='+sound.sound+' hidden=true>'
              }
            }
          }
      // }
        var audio = document.getElementById("audioPlay");
        //浏览器支持 audion
        audio.play();
    }
}

// function sortAction() {
//     state.chatlist.sort(function(a, b) {
//         return b.timestamp - a.timestamp; // 降序
//     }).forEach((item, index) => {
//         item.index = index + 1
//     })
// }


export default store;