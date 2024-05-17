<script setup lang="ts">
import locale from "element-plus/es/locale/lang/zh-cn"
import HeaderLayout from "@/views/layout/HeaderLayout.vue";
import AsideLayout from "@/views/layout/AsideLayout.vue";
import MainLayout from "@/views/layout/MainLayout.vue";
import TabsLayout from "@/views/layout/TabsLayout.vue";
import {useMenuStore} from "@/stores/menu";

const menuStore = useMenuStore();

</script>

<template>
  <el-config-provider :locale="locale">
    <div class="common-layout">
      <el-container class="common-layout">
        <el-header height="var(--header-height)">
          <HeaderLayout/>
        </el-header>
        <el-container class="common-center">
          <el-aside :width="menuStore.isCollapse ? 'var(--aside-fold-width)' : 'var(--aside-width)'">
            <AsideLayout/>
          </el-aside>
          <el-main class="common-main">
            <TabsLayout/>
            <el-scrollbar class="common-scrollbar">
              <MainLayout/>
            </el-scrollbar>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </el-config-provider>
</template>

<style scoped>
.common-layout {
  width: 100%;
  height: 100%;

  .common-center {
    height: calc(100% - var(--header-height));
    width: 100%;
  }

  .common-main {
    width: 100%;
    height: 100%;
    padding: 0;
  }

  .common-scrollbar {
    width: 100%;
    height: calc(100% - var(--tabs-height));
  }
}


</style>
