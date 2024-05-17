<script setup lang="ts">
import {useMenuStore} from "@/stores/menu";
import {CirclePlus, Edit, Refresh, Remove, Search} from "@element-plus/icons-vue";

const menuStore = useMenuStore();

function deleteHandler(id: string) {
  ElMessageBox.confirm('是否删除菜单？', '删除提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const isDelete = menuStore.removeById(id);
    isDelete ? ElMessage.success('删除成功') : ElMessage.error('删除失败')
  })
}
</script>

<template>
  <el-card>
    <el-form class="search-form" inline>
      <MenuAdd :icon="CirclePlus"/>
      <el-divider direction="vertical"/>
      <el-form-item label="名称" style="margin-left: 10px;">
        <el-input/>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" type="primary">搜索</el-button>
        <el-button :icon="Refresh">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-table :data="menuStore.menuList" row-key="path">
    <el-table-column type="selection"/>
    <el-table-column type="index"/>
    <el-table-column label="名称">
      <template #default="{row: {icon, name}}">
        <el-icon style="margin-right: 5px;">
          <icon-common :icon="icon"/>
        </el-icon>
        {{ name }}
      </template>
    </el-table-column>
    <el-table-column prop="path" label="路径"/>
    <el-table-column prop="sort" label="排序" sortable/>
    <el-table-column width="180" label="操作">
      <template #default="{row}">
        <MenuAdd size="small" :icon="Edit" edit :menu-data="row" style="margin-right: 5px;"/>
        <el-button size="small" type="danger" :icon="Remove" @click="deleteHandler(row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
:deep(.search-form .el-form-item) {
  margin-bottom: 0;
}

.el-table :deep(.cell) {
  display: flex;
  align-items: center;
}
</style>