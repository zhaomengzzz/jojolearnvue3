<script setup lang="ts">
import {useMenuStore} from "@/stores/menu";
import {useTabsStore} from "@/stores/tabs";
import {watch} from "vue";


const tabsStore = useTabsStore();
const store = useMenuStore();
watch(() => store.menuList, (value) => {
  console.log("菜单", value)
})

function menuSelect(index: string) {
  console.log(index)
  const menu = store.getByPath(index);
  if (menu) {
    tabsStore.add({name: menu.name, path: menu.path})
  }
}
</script>

<template>
  <el-scrollbar>
    <el-menu class="aside-menu" :collapse="store.isCollapse" router @select="menuSelect" v-model="tabsStore.path"
             :default-active="tabsStore.path" unique-opened>
      <div class="aside-collapse-div">
        <el-icon class="aside-collapse-btn" :style="{marginRight: store.isCollapse ? '18px' : '0'}" size="24px"
                 @click="() => store.collapsed(!store.isCollapse)">
          <i-ep-expand v-if="store.isCollapse"/>
          <i-ep-fold v-else/>
        </el-icon>
      </div>
      <template v-for="menu in store.menus" :key="menu.path">
        <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
          <template #title>
            <el-icon>
              <icon-common :icon="menu.icon"/>
            </el-icon>
            <span>{{ menu.name }}</span>
          </template>
          <recursive-menu :menu-items="menu.children"/>
        </el-sub-menu>
        <el-menu-item v-else :index="menu.path">
          <el-icon>
            <icon-common :icon="menu.icon"/>
          </el-icon>
          <span>{{ menu.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>
.aside-menu {
  margin-top: 10px;
  height: 100%;

  .aside-collapse-div {
    display: flex;
    justify-content: end;
    height: 24px;
    line-height: 24px;

    .aside-collapse-btn {
      cursor: pointer;
    }
  }
}

</style>