import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import { constantRouterMap } from './routesMap'

Vue.use(VueRouter)






const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})



router.beforeEach((to, from, next) => {
  if (to.meta.unrequiresAuth) {
    if (store.getters.token) {
      next('/')
    } else {
      next()
    }
  } else {
    if (store.getters.token) {
      if (!store.getters.oroles) {
        store.dispatch('GenerateRoutes', store.getters.roles).then(() => {
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          store.commit('SET_OROLES', true)
          //next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          next()
        })
      } else {
        next()
      }
    } else {
      next({ path: '/login' })
    }
  }
})












export default router
