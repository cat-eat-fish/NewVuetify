import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// vue-video-player
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);
// vuetify
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css' 



import '@/assets/css/style.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
