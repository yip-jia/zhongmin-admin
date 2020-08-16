const constantRouterMap = [

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
  /*  {
     path: '/home',
     name: 'home',
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
   }, */
  {
    path: '/zmUser',
    component: () => import('../views/index.vue'),
    meta: {
      title: '用户管理',
      icon: 'el-icon-user'
    },
    children: [
      {
        path: 'userAdmin',
        name: 'userAdmin',
        component: () => import('../views/zmUser/userAdmin.vue'),
        meta: {
          role: ['admin'],
          title: '中民用户管理',
        },
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
  },
  {
    path: '/admin',
    component: () => import('../views/index.vue'),
    meta: {
      title: '后台用户权限管理',
      icon: 'el-icon-user'
    },
    children: [
      {
        path: 'adminUser',
        name: 'adminUser',
        component: () => import('../views/admin/adminUser.vue'),
        meta: {
          role: ['admin', 'guest'],
          title: '后台用户管理',
        }
      }
    ],
  }
]

export { constantRouterMap, ansyncRoutesMap }