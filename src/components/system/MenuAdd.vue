<script setup lang="ts">
import {type ComponentInstance, reactive, ref, watch} from "vue";
import {type Menu, useMenuStore} from "@/stores/menu";
import {type FormInstance, type FormRules} from "element-plus";
import * as Icon from "@element-plus/icons-vue";

interface Props {
  edit?: boolean,
  menuData?: Menu
}

interface MenuAdd {
  id: string,
  name: string,
  path: string,
  icon: string,
  sort: number
}

const props = withDefaults(defineProps<Props>(), {
  edit: false,
  menuData: () => ({}) as Menu
});
const menuStore = useMenuStore();
const show = ref(false);
let menu = ref(props.edit ? {...props.menuData} : {} as Menu);
const rules = reactive<FormRules<MenuAdd>>({
  name: [{required: true, message: '请输入菜单名称', trigger: 'blur'}],
  path: [{required: true, message: '请输入菜单路径', trigger: 'blur'}],
  sort: [{required: true, message: '请输入菜单排序', trigger: 'blur'}]
});
const IconComponent = reactive(Icon)
watch(show, (value) => {
  if (!value) {
    menu.value = {} as Menu
  } else {
    menu = ref(props.edit ? {...props.menuData} : {} as Menu)
  }
})
const iconHandler = (icon: ComponentInstance<Icon>) => {
  menu.value.icon = icon.__name
  console.log('icon', icon)
}
const okHandler = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((isValid) => {
    if (isValid) {
      if (props.edit) {
        menuStore.modify(menu.value)
        ElMessage.success('修改成功')
      } else {
        menu.value.id = new Date().getTime().toString()
        menuStore.add(menu.value)
        ElMessage.success('新增成功')
      }
      show.value = false
    } else {
      ElMessage.error('请输入表单必填项')
    }
  })
}
</script>

<template>
  <el-button v-bind="$attrs" @click="show = true">{{ props.edit ? '编辑' : '新增' }}</el-button>

  <el-dialog v-model="show" append-to-body :title="props.edit ? '编辑菜单':'新增菜单'" width="500" draggable>
    <el-form ref="formRef" class="menu-add-form" :model="menu" :rules="rules">
      <el-form-item label="名称" prop="name">
        <el-input v-model="menu.name"/>
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input v-model="menu.path"/>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="menu.sort"/>
      </el-form-item>
      <el-form-item label="图标">
        <div class="menu-icon" :class="{'select': menu.icon === icon.__name}" v-for="(icon, index) in IconComponent"
             :key="index" @click="iconHandler(icon)">
          <el-icon size="30">
            <component :is="icon"/>
          </el-icon>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="okHandler($refs.formRef as FormInstance)">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.menu-add-form {
  margin: 0 20px;

  .menu-icon {
    height: 42px;
    width: 42px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: var(--color-background-mute);
    }

    &.select {
      border: 2px solid var(--el-color-danger);
    }
  }
}
</style>