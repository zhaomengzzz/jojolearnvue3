import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from "@/views/system/MenuView.vue";
import {useMenuStore} from "@/stores/menu";
import {useTabsStore} from "@/stores/tabs";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: '首页',
            component: HomeView
        },
        {
            path: '/about',
            name: '关于',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/system',
            name: '系统配置',
            children: [{
                path: 'menu',
                name: '菜单设置',
                component: MenuView
            }]
        }
    ]
})
// 全局前置路由守卫
router.beforeEach((to) => {
    const menuStore = useMenuStore();
    const tabsStore = useTabsStore();
    const menu = menuStore.getByPath(to.path);
    menu && !tabsStore.comparePath(to.path) && tabsStore.add({name: menu.name, path: menu.path})
})

export default router
