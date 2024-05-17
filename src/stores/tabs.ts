import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useTabsStore = defineStore('tabs', () => {
    const tabList = ref([{name: '首页', path: '/'}] as Tab[]);
    const index = ref(0);
    const path = ref('/')
    const tabs = computed(() => tabList.value);

    /**
     * 设置当前选中标签
     * @param currentIndex
     */
    function activeTab(currentIndex: number) {
        index.value = currentIndex
    }

    /**
     * 设置当前选中路径
     * @param currentPath
     */
    function activePath(currentPath: string) {
        path.value = currentPath
    }

    /**
     * 比较当前页面是否是路由路径的页面
     * @param currentPath
     */
    function comparePath(currentPath: string): boolean {
        return path.value === currentPath
    }

    /**
     * 添加tab导航 如果存在则切换到对应tab标签
     * @param tab
     */
    function add(tab: Tab) {
        let index = 0
        if (!tabList.value.some(item => item.path === tab.path && item.name === tab.name)) {
            tabList.value.push(tab)
            index = tabList.value.findIndex(item => item.path === tab.path && item.name === tab.name);
            activeTab(index)
        } else { // 切换到标签
            index = tabList.value.findIndex(item => item.path === tab.path && item.name === tab.name);
            activeTab(index)
        }
        return index
    }

    /**
     * 通过下标移除tab标签
     * @param index
     */
    function remove(index: number) {
        tabList.value.splice(index, 1)
        activeTab(tabList.value.length === 0 ? 0 : tabList.value.length - 1)
    }

    return {tabList, index, path, tabs, comparePath, add, remove, activeTab, activePath}
});

/**
 * 导航栏标签
 */
interface Tab {
    name: string,
    path: string
}