import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index/Index'),
    meta: {auth: true, title: '首页'}
  },
  {
    path: '/logistics-query',
    name: 'LogisticsQuery',
    component: () => import('@/views/LogisticsQuery/LogisticsQuery'),
    meta: {auth: true, title: '物流查询'}
  },
  {
    path: '/partner',
    name: 'Partner',
    component: () => import('@/views/Partner/Partner'),
    meta: {auth: true, title: '合作伙伴'}
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: () => import('@/views/AboutUs/AboutUs'),
    meta: {auth: true, title: '关于我们'}
  },
  {
    path: '/apply-for-cooperation',
    name: 'ApplyForCooperation',
    component: () => import('@/views/ApplyForCooperation/ApplyForCooperation'),
    meta: {auth: true, title: '申请合作'}
  }
  // {
  //   path: '/',
  //   name: 'HelloWorld',
  //   component: HelloWorld
  // }
]
let router = new Router({
  // mode: 'history',
  history: false,
  hashbang: true,
  base: process.env.ROUTER_BASE,
  routes
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
router.afterEach((to, from, next) => {
})
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
