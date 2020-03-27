// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { AlertPlugin, ConfirmPlugin } from 'vux'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      var userName = localStorage.getItem('userName')
      this.$store.commit('updateUserName', userName)
      var userId = localStorage.getItem('userId')
      this.$store.commit('updateUserId', userId)
    }
  }
})
