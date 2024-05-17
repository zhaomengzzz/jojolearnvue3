<!--递归构建菜单-->
<script setup lang="ts">
import type {Component} from "vue";

defineProps({
  menuItems: {
    type: Array<Menu>,
    required: true
  }
})

/**
 * 菜单
 */
interface Menu {
  name: string,
  path: string,
  icon: Component,
  children: Array<Menu>
}
</script>

<template>
  <template v-for="menuItem in menuItems" :key="menuItem.path">
    <el-sub-menu v-if="menuItem.children && menuItem.children.length > 0" :index="menuItem.path">
      <template #title>
        <el-icon>
          <icon-common :icon="menuItem.icon"/>
        </el-icon>
        <span>{{ menuItem.name }}</span>
      </template>
      <recursive-menu :menu-items="menuItem.children"/>
    </el-sub-menu>
    <el-menu-item v-else :index="menuItem.path">
      <el-icon>
        <icon-common :icon="menuItem.icon"/>
      </el-icon>
      <span>{{ menuItem.name }}</span>
    </el-menu-item>
  </template>
</template>

<style scoped>

</style>