const constantRouterMap = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('../views/index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'el-icon-house'
        }
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
    component: () => import('../views/index.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'el-icon-house'
        }
      }
    ]
  },
  {
    path: '/user',
    component: () => import('../views/index.vue'),
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
        },
        children: [
          {
            path: 'A',
            name: 'A',
            component: () => import('../views/A.vue'),
            meta: {
              role: ['admin'],
              title: 'A',
            },
          },

          {
            path: 'B',
            name: 'B',
            component: () => import('../views/B.vue'),
            meta: {
              role: ['admin'],
              title: 'B',
            }
          }
        ]
      }
    ]
  },
  {
    path: '/orderList',
    component: () => import('../views/index.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/orderList/index.vue'),
        meta: {
          icon: 'el-icon-s-order',
          role: ['admin', 'guest'],
          title: '订单管理',
        }
      }
    ],
  }
]

export { constantRouterMap, ansyncRoutesMap }