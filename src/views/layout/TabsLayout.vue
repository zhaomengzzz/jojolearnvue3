<script setup lang="ts">
import {useTabsStore} from "@/stores/tabs";
import {useRoute, useRouter} from "vue-router";
import {watch} from "vue";

const router = useRouter();
const route = useRoute();

const store = useTabsStore();

watch(() => store.index, (value) => {
  const tab = store.tabList[value];

  if (tab && route.path !== tab.path) {
    store.activePath(tab.path);
    router.push(tab.path);
  }
})

function toHandle(item: Tab, index: number) {
  store.activeTab(index)
}

function closeHandle(index: number) {
  store.remove(index)
}

/**
 * 导航栏标签
 */
interface Tab {
  name: string,
  path: string
}
</script>

<template>
  <div class="tabs">
    <el-tag class="tabs-tab" v-for="(item, index) in store.tabs" :type="store.index === index ? 'primary' : 'info'"
            :key="index" @close="closeHandle(index)"
            :closable="index !== 0" size="large" @click="toHandle(item, index)">
      {{ item.name }}
    </el-tag>
  </div>
</template>

<style scoped>
.tabs {
  margin: 0 10px;
  border-bottom: var(--color-border) solid 1px;
  height: var(--tabs-height);

  .tabs-tab {
    user-select: none;
    cursor: pointer;
    margin: 5px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

</style>