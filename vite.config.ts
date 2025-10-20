import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import * as child from 'child_process'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import postcssNesting from 'postcss-nesting'
// import postcssPxtorem from 'postcss-pxtorem'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueDevTools from 'vite-plugin-vue-devtools'

const viteIconPrefix = 'icon'
const viteIconLocalPrefix = 'icon-local'
/** 本地svg图标集合名称 */
const collectionName = viteIconLocalPrefix.replace(`${viteIconPrefix}-`, '')
const localIconPath = path.join(process.cwd(), 'src/assets/icons')

const commitHash = () => {
  try {
    return child.execSync('git rev-parse --short HEAD').toString().trim()
  } catch {
    return undefined
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // unplugin-auto-import
    AutoImport({
      dts: 'src/typings/auto-imports.d.ts',
    }),
    // unplugin-vue-components
    Components({
      dts: 'src/typings/components.d.ts',
      resolvers: [
        NaiveUiResolver(),
        IconsResolver({
          customCollections: [collectionName],
          componentPrefix: viteIconPrefix,
        }),
      ],
    }),
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `${viteIconLocalPrefix}-[dir]-[name]`,
      inject: 'body-last',
      customDomId: '__SVG_ICON_LOCAL__',
    }),
    UnoCSS(),
    // [unplugin-icons](https://github.com/antfu/unplugin-icons)
    Icons({
      compiler: 'vue3',
      customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath, (svg) =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" '),
        ),
      },
      scale: 1,
      defaultClass: 'inline-block',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssNesting(),
        // postcssPxtorem({
        //   rootValue: 37.5, // 换算基数，默认值 16。 UI设计稿的宽度/10
        //   unitPrecision: 3, // 允许REM单位增长到的十进制数字，小数点后保留的位数。
        //   propList: ['*'],
        //   // 可以用正则表达式排除某些文件夹的方法，例如 /(node_module)/
        //   // 如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值 (false)
        //   exclude: /(node_module)/,
        //   // 要忽略并保留为px的选择器，本项目我是用的 naive ui 框架，所以忽略它
        //   selectorBlackList: ['.n'],
        //   mediaQuery: false, // (布尔值) 允许在媒体查询中转换 px。
        //   minPixelValue: 1, // 设置要替换的最小像素值
        // }),
        autoprefixer,
      ],
    },
  },
  define: {
    'process.env': {
      COMMIT_HASH: commitHash(),
    },
  },
  base: '/',
  server: {
    // host: '0.0.0.0',
    port: 38088,
    strictPort: true,
    allowedHosts: [
      'www.cubicraft.zoe.sensetime.com',
      'dash-vigen.zoe.sensetime.com',
      'dash-vigen-test.zoe.sensetime.com',
    ],
    cors: true,
    proxy: {
      '/api': {
        // target: 'http://api.cubicraft.zoe.sensetime.com',
        target: 'http://localhost:38090',
        changeOrigin: true,
        secure: false,
      },
      '/assets': {
        // target: 'http://api.cubicraft.zoe.sensetime.com',
        target: 'http://localhost:38090',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/statics/, ''),
      },
    },
    warmup: {
      clientFiles: ['./src/components/**/*.vue', './src/plugins/*.ts'],
    },
  },
  preview: {
    port: 38089,
    strictPort: true,
    allowedHosts: [
      'www.cubicraft.zoe.sensetime.com',
      'dash-vigen.zoe.sensetime.com',
      'dash-vigen-test.zoe.sensetime.com',
    ],
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:38090',
        changeOrigin: true,
        secure: false,
      },
      '/assets': {
        target: 'http://localhost:38090',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/statics/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      // Customize the Rollup config here
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // 让每个插件都打包成独立的文件
            if (id.includes('node_modules/.pnpm')) {
              return id.toString().split('node_modules/.pnpm/')[1].split('/')[0].toString()
            } else {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        },
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
      },
    },
  },
  esbuild: {
    // Drop debugger in production.
    drop: process.env.NODE_ENV === 'production' ? ['debugger'] : [],
  },
})
