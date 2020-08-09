
import { constantRouterMap, ansyncRoutesMap } from '../../router/routesMap'

const state = {
    token: '',
    routers: constantRouterMap,
    addRouters: [],
    roles: [],
    oroles: false // 是否已经动态加载过路由
}

const getters = {
    token: state => state.token,
    roles: state => state.roles,
    addRouters: state => state.addRouters,
    oroles: state => state.oroles
}
const mutations = {
    'SET_TOKEN': (state, token) => {
        state.token = token
    },
    'SET_ROUTES': (state, routers) => {
        state.addRouters = routers
        state.routers = constantRouterMap.concat(routers)
    },
    'SET_ROLES': (state, roles) => {
        state.roles = roles
    },
    'SET_OROLES': (state, oroles) => {
        state.oroles = oroles
    },
}

const actions = {
    getInfo({ commit }, roles) {
        let { key, token } = roles
        commit('SET_TOKEN', token)
        commit('SET_ROLES', key)
    },
    GenerateRoutes({ commit }, roles) {
        return new Promise(resolve => {
            let accessedRoutes
            /* if (roles.includes('admin')) {
                accessedRoutes = ansyncRoutesMap || []
            } else */
            accessedRoutes = filterAsyncRoutes(ansyncRoutesMap, roles)

            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })

    }
}

function filterAsyncRoutes(asyncRoutes, roles) {
    const res = []
    asyncRoutes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) { //如果有子路由
                tmp.children = filterAsyncRoutes(tmp.children, roles) // 递归进去
            }
            res.push(tmp)
        }
    })

    return res
}

function hasPermission(roles, route) { //筛选那些路由的权限和用户角色一样的
    if (route.meta && route.meta.role) {
        return roles.some(role => { return route.meta.role.includes(role) })
    } else {
        return true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}