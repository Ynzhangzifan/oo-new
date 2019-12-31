// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入element-ui
import ElementUI from 'element-ui'
import store from './store'
// 导入element-ui的样式文件
import 'element-ui/lib/theme-chalk/index.css'
// 导入自己的样式
import './assets/css/index.css'
import './assets/css/reset.css'

//调用socket
import global from './assets/js/global.js'
Vue.prototype.global = global

// 导入axios
import axios from 'axios'
// 导入qs
import qs from 'qs'
// 中英繁
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ftLocale from 'element-ui/lib/locale/lang/zh-TW'
import './assets/font/iconfont.css'
// import ElementLocale from 'element-ui/lib/locale'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
// 录音功能
import AudioRecorder from 'vue-audio-recorder'

Vue.use(AudioRecorder)
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
    // locale: localStorage.lang || 'zh-cn',
    // locale: 'zh-cn',
    locale: sessionStorage.lang || 'zh-cn',
    messages: {
        'en-us': Object.assign(require('./common/lang/en'), enLocale), //将我们项目中的语言包与Element的语言包进行合并
        'zh-cn': Object.assign(require('./common/lang/zh'), zhLocale),
        'zh-tw': Object.assign(require('./common/lang/ft'), ftLocale),
    },
});
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value) //在注册Element时设置i18n的处理方法
});




// Vue.use(VueCookies)
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
    // md5加密
import md5 from 'js-md5'
Vue.prototype.$md5 = md5;

import {
    setCookie,
    getCookie,
    delCookie
} from './assets/js/cookie'
Vue.prototype.$cookie = {
    setCookie,
    getCookie,
    delCookie
}

// 转为unicode 编码
Vue.prototype.encode = function encodeUnicode(str, random) {
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
Vue.prototype.decode = function decodeUnicode(str, random) {
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

Vue.config.productionTip = false
    // 配置基准地址
    // var domain = (process.env.API_ROOT != '') ? process.env.API_ROOT : (window.location.host + '/').replace(((window.location.host + '/').split('.')[0]), 'info')
var domain = (process.env.API_ROOT != '') ? process.env.API_ROOT : (window.location.host + '/')
var domainname = window.location.protocol
console.log(window.location.host)
console.log(window.location)
console.log(window.location.origin)
console.log(window.location.protocol)
console.log(domain)
Vue.prototype.$axios = axios
Vue.prototype.$http = axios
axios.defaults.baseURL = domainname + '//' + domain + 'OONew/index.php'
console.log(axios.defaults.baseURL)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    components: {
        App
    },
    template: '<App/>'
})