const constantRouterMap = [
  {
    path: '/',
    name: 'Index',
    redirect: '/home',
    component: () => import('../views/index.vue'),
    children:[
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      unrequiresAuth: true
    },
    component: () => import('../views/login.vue')
  },
]


const ansyncRoutesMap = [ // eslint-disable-line no-unused-vars
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '首页',
      icon: 'el-icon-house'
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/index.vue'),
    redirect: '/user/userAdmin',
    meta: {
      title: '用户管理',
      icon: 'el-icon-user'
    },
    children: [
      {
        path: 'userAdmin',
        name: 'userAdmin',
        component: () => import('../views/UserAdmin.vue'),
        meta: {
          role: ['admin'],
          title: '中民用户管理',
        }
      }
    ]
  },
  {
    path: '/orderList',
    name: 'orderList',
    component: () => import('../views/orderList.vue'),
    meta: {
      role: ['admin', 'guest'],
      title: '订单管理',
    }
  }
]

export { constantRouterMap, ansyncRoutesMap }