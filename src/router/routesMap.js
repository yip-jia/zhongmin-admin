const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      unrequiresAuth: true
    },
    components: {
      login: () => import('../views/login.vue')
    }
  }
]


const ansyncRoutesMap = [ // eslint-disable-line no-unused-vars
  {
    path: '/',
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
    redirect: '/user/userAdmin',
    meta: {
      title: '用户管理',
      icon: 'el-icon-house'
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
      role: ['admin', 'guest']
    }
  }
]

export { constantRouterMap, ansyncRoutesMap }