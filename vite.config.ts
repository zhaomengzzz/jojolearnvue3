import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/dist/vite'
import IconsResolver from 'unplugin-icons/dist/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import path from "node:path";

const pathSrc = path.resolve(__dirname, 'src');
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        // 按需自动导入 插件
        AutoImport({
            resolvers: [
                // 自动导入 Element Plus 相关函数
                ElementPlusResolver(),
                // 自动导入图标组件
                IconsResolver({prefix: 'Icon'})
            ],
            dts: path.resolve(pathSrc, 'auto-imports.d.ts')
        }),
        Components({
            resolvers: [
                // 自动注册图标组件
                IconsResolver({enabledCollections: ['ep']}),
                // 自动导入 Element Plus 组件
                ElementPlusResolver()],
            dts: path.resolve(pathSrc, 'components.d.ts')
        }),
        Icons({autoInstall: true, compiler: 'vue3'})
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
