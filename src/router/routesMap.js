const constantRouterMap = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
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
        path: '/userAdmin',
        name: 'UserAdmin',
        component: () => import('../views/UserAdmin.vue'),
        meta: {
            role: ['admin',]
        }
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