// 路由-相关模块
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Layout from '../views/Layout'
import Layout from '../views/Layout/index.vue'
import Home from '../views/Home/index.vue'
import Search from '../views/Search/index.vue'
import Play from '../views/Play/index.vue'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/layout'
    },
    {
        path: '/layout',
        component: Layout,
        redirect: '/layout/home',
        children: [
            {
                path: 'home',
                component: Home,
                meta: { // meta保存路由对象额外信息的
                    title: "首页"
                }
            },
            {
                path: 'search',
                component: Search,
                meta: {
                    title: "搜索"
                }
            }
        ]
    },
    {
        path: '/play',
        component: Play
    }
]

const router = new VueRouter({
    routes
})

export default router