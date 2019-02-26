import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/',name: 'home',component: () => import('./views/Home.vue'),meta:{keepAlive:false}},
    {path: '/about',name: 'about',component: () => import('./views/About.vue'),meta:{keepAlive:true}},

    {path: '/openSourceInfo',name: 'openSourceInfo',component: () => import('./views/openSourceInfo.vue'),meta:{keepAlive:true}},
    {path: '/openSourceCase',name: 'openSourceCase',component: () => import('./views/openSourceCase.vue'),meta:{keepAlive:false}},
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
