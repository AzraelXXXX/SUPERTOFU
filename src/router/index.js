import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/login/Login.vue'
import Register from '../components/register/Register.vue'
import Index from '../components/Index.vue'
import FirstPage from '../components/home/FirstPage.vue'
import Paging from '../components/home/Paging.vue'
import Detail from '../components/Detail.vue'
import Car from '../components/goods/Car.vue'
import Order from '../components/order/Order.vue'
import Settlement from '../components/settlement/Settlement.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    component: Index,
    children: [
      { path: '/', redirect: '/index/firstpage' },
      { path: 'firstpage', component: FirstPage },
      { path: 'paging', component: Paging },
    ],
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/detail', component: Detail },
  { path: '/car', component: Car },
  { path: '/order', component: Order },
  { path: '/settlement', component: Settlement },
]

// router.beforeEach((to, from, next) => {

// })

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
