<script setup lang="ts">
import {useDark, useToggle} from '@vueuse/core'
import {Moon, Sunny} from '@element-plus/icons-vue'
import {ref} from "vue";

const isDark = useDark()
const mode = ref(!!isDark);
const toggleDark = useToggle(isDark)
</script>

<template>
  <el-row class="header-layout" justify="space-between" align="middle">
    <el-col :span="6" class="logo-col">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="35" height="35"/>
      <span class="header-name">Vue3-TypeScript-Test</span>
    </el-col>
    <el-col :span="18" style="display: flex;justify-content: flex-end;">
      <el-switch @click="toggleDark()" v-model="mode" :active-value="false" :inactive-value="true" inline-prompt
                 style="--el-switch-on-color: var(--color-border); --el-switch-off-color: var(--color-border)"
                 :active-action-icon="Moon" :inactive-action-icon="Sunny"/>
    </el-col>
  </el-row>
</template>

<style scoped>
.header-layout {
  height: 100%;

  .logo-col {
    display: flex;
    align-items: center;

    .logo {
      display: block;
      margin: 1rem;
    }

    .header-name {
      display: block;
      font-size: 22px;
      font-weight: bold;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}


</style>