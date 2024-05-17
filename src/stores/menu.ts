import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";

export const useMenuStore = defineStore('menu', () => {
    const menuList = ref([
        {id: '1710407509609', name: '首页', path: '/', icon: 'home-filled', sort: 1},
        {
            id: '1710407554624', name: '系统配置', path: '/system', icon: 'setting', sort: 2, children: [
                {id: '1710407569367', name: '菜单配置', path: '/system/menu', icon: 'menu', sort: 1}
            ]
        },
        {id: '1710407591455', name: '关于', path: '/about', icon: 'warning-filled', sort: 3}
    ] as Menu[]);
    const isCollapse = ref(false);
    const menus = computed(() => menuList.value);

    function get(index: number): Menu {
        return menuList.value[index]
    }

    function getByPath(path: string): Menu | undefined {
        return recursiveSearch(menuList.value, path)
    }

    function add(menu: Menu) {
        menuList.value.push(menu)
    }

    function modify(menu: Menu) {
        recursiveModify(menuList.value, menu)
    }

    function remove(index: number) {
        menuList.value.splice(index, 1)
    }

    function removeById(id: string) {
        return recursiveRemove(menuList.value, id);
    }

    function collapsed(collapse: boolean) {
        isCollapse.value = collapse
    }

    function $reset() {
        menuList.value = [
            {id: '1710407509609', name: '首页', path: '/', icon: 'home-filled', sort: 1},
            {
                id: '1710407554624', name: '系统配置', path: '/system', icon: 'setting', sort: 2, children: [
                    {id: '1710407569367', name: '菜单配置', path: '/system/menu', icon: 'menu', sort: 1}
                ]
            },
            {id: '1710407591455', name: '关于', path: '/about', icon: 'warning-filled', sort: 3}
        ] as Menu[]
        isCollapse.value = false
    }

    /**
     * 递归调用 查询菜单
     * @param menus 菜单数组
     * @param path 菜单路径
     */
    function recursiveSearch(menus: Array<Menu>, path: string): Menu | undefined {
        // 遍历数组中的每个元素
        for (let i = 0; i < menus.length; i++) {
            const menu = menus[i];
            // 如果当前元素是数组，递归地搜索该子数组
            if (menu.children && menu.children.length > 0 && menu.path !== path) {
                // 递归调用，查找子数组中是否包含目标元素
                const result = recursiveSearch(menu.children, path);
                if (result !== undefined) {
                    return result; // 如果找到了目标元素，则返回该元素
                }
            } else if (menu.path === path) {
                return menu; // 如果当前元素就是目标元素，则返回该元素
            }
        }
        return undefined; // 如果数组中没有包含目标元素，则返回 null
    }

    /**
     * 递归调用 按path 删除指定菜单
     * @param menus 菜单数组
     * @param id 菜单路径
     */
    function recursiveRemove(menus: Array<Menu>, id: string): boolean {
        // 遍历数组中的每个元素
        for (let i = 0; i < menus.length; i++) {
            const menu = menus[i];
            // 如果当前元素是数组，递归地搜索该子数组
            if (menu.children && menu.children.length > 0 && menu.id !== id) {
                // 递归调用，查找子数组中是否包含目标元素
                recursiveRemove(menu.children, id);
            } else if (menu.id === id) {
                // 如果当前元素就是目标元素，则删除元素
                menus.splice(i, 1)
                return true
            }
        }
        return false
    }

    /**
     * 递归调用 按id 修改指定菜单
     * @param menus 菜单数组
     * @param menuModify 菜单路径
     */
    function recursiveModify(menus: Array<Menu>, menuModify: Menu): boolean {
        // 遍历数组中的每个元素
        for (let i = 0; i < menus.length; i++) {
            const menu = menus[i];
            // 如果当前元素是数组，递归地搜索该子数组
            if (menu.children && menu.children.length > 0 && menu.id !== menuModify.id) {
                // 递归调用，查找子数组中是否包含目标元素
                recursiveModify(menu.children, menuModify);
            } else if (menu.id === menuModify.id) {
                // 如果当前元素就是目标元素，则修改元素
                menus[i] = reactive({...menu, ...menuModify})
                return true
            }
        }
        return false
    }

    return {isCollapse, menus, menuList, get, getByPath, add, modify, remove, removeById, collapsed, $reset}
});

/**
 * 菜单
 */
export interface Menu {
    id: string,
    name: string,
    path: string,
    icon: string,
    sort: number,
    children: Array<Menu>
}
