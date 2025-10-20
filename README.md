# anna-web

A modern Vue 3 web application built with Vite, TypeScript, and UnoCSS.

## 1 - 技术栈 (Technology Stack)

### 1.1 核心框架 (Core Framework)

- **Vue 3** - 前端框架
- **Vite** - 前端构建工具
- **TypeScript** - JavaScript 的超集，提供类型安全
- **pnpm** - 包管理器

### 1.2 UI 和样式 (UI & Styling)

- **UnoCSS** - 即时原子化 CSS 引擎
- **Naive UI** - Vue 3 组件库
- **Bulma** - 现代 CSS 框架
- **PostCSS** - CSS 后处理器

### 1.3 状态管理和路由 (State Management & Routing)

- **Pinia** - Vue 3 状态管理库
- **Vue Router** - Vue.js 官方路由管理器
- **TanStack Vue Query** - 数据获取和缓存库

### 1.4 开发工具 (Development Tools)

- **OxLint** - 代码质量检查工具，更快速的 ESLint 替代品
- **Prettier** - 代码格式化工具
- **Husky** - Git hooks 工具
- **Vue DevTools** - Vue 开发调试工具

### 1.5 其他工具 (Other Tools)

- **Axios** - HTTP 客户端
- **Moment.js** - 日期处理库
- **Highlight.js** - 代码高亮
- **WebFontLoader** - 字体加载器

## 2 - 项目目录结构 (Project Directory Structure)

```bash
./
├── codegen/                   # 代码生成相关
│   ├── run-update.js          # OpenAPI 规范文件的更新脚本: 根据平台选择如下脚本之一执行
│   ├── update.ps1             # PowerShell 更新脚本
│   └── update.sh              # Shell 更新脚本
├── public/                    # 静态资源目录
│   └── favicon.ico            # 图标
├── src/                       # 源代码目录
│   ├── assets/                # 静态资源
│   ├── components/            # 公共组件目录
│   │   └── layouts/           # 公共布局组件目录
│   │       └── globalLayout.vue    # 全局布局组件
│   ├── lib/_client/           # 自动生成的 axios 客户端目录
│   ├── plugins/               # 插件配置
│   │   ├── assets.ts          # 资源插件
│   │   ├── index.ts           # 插件入口
│   │   ├── vue-query.ts       # Vue Query 配置
│   │   └── webfontloader.ts   # 字体加载器配置
│   ├── router/                # 路由配置
│   │   ├── index.ts           # 路由入口
│   │   └── routes/            # 路由定义
│   │       └── index.ts       # 路由配置
│   ├── services/              # 请求相关代码
│   │   ├── api/               # 对 `src/lib` 的二次封装
│   │   ├── common/            # 对 `src/lib` 二次封装时, 一些公共的工具函数
│   │   ├── queries/           # 利用 Vue Query 将 API 请求封装为带响应式状态和缓存管理 query hooks
│   │   └── index.ts
│   ├── stores/                # Pinia 状态管理目录
│   ├── styles/                # 样式文件
│   │   └── css/               # CSS 文件
│   │       ├── base.css
│   │       ├── global.css
│   │       └── main.css       # 主样式
│   ├── typings/               # 类型定义
│   │   ├── auto-imports.d.ts  # 自动导入类型
│   │   ├── components.d.ts    # 自动引用的组件
│   │   └── global.d.ts        # 全局类型
│   ├── views/                 # 页面组件
│   │   └── system/            # 系统页面
│   │       └── NotFound.vue   # 404 页面
│   ├── App.vue                # 根组件
│   └── main.ts                # 应用入口
├── .husky/                    # Git hooks 配置
├── .cursorrules               # cursor 的项目 prompt 文件
├── .env.example               # 环境变量配置文件 (.env) 模版
├── CHANGELOG.md               # 更新日志。由 `changelog-generate` 自动更新
├── eslint.config.ts           # ESLint 配置
├── index.html                 # HTML 入口文件
├── openapitools.yml           # OpenAPI 工具配置
├── package.json
├── pnpm-lock.yaml
├── README.md
├── start.sh                   # 启动脚本
├── tsconfig.app.json
├── tsconfig.json              # TypeScript 主配置
├── tsconfig.node.json
├── uno.config.ts              # UnoCSS 配置
└── vite.config.ts             # Vite 配置
```

## 3 - 开发环境设置 (Development Setup)

### 3.1 Node.js 环境

本项目基于 node 22 版本开发(版本详见 `.node-version` 文件)。

推荐使用 [fnm](https://github.com/Schniz/fnm) 管理 node 版本。

安装并激活 node 22, 启用 pnpm 作为包管理器, 然后安装依赖。

```bash
fnm install && fnm use
corepack enable pnpm
pnpm install
```

### 3.2 Python 环境

本项目使用了 openapi-generator-cli 生成 API Clients 代码 (详见 `package.json` 文件中 "scripts" 的 "client:generate" 命令)。

使用该功能前, 需要在 `.env` 中设置 `OPENAPI_SPEC_URL` 变量, 指向 API 的 OpenAPI 规范文件的 URL。

代码生成需要使用 [uv](https://astral.sh/uv/) 调用 `openapi-generator-cli[jdk4py]` 包, 因此需要安装 uv。

### 3.3 推荐 IDE 设置 (Recommended IDE Setup)

建议依照 `.vscode/extensions.json` 文件中的推荐扩展安装相关扩展。

打开插件侧边栏, 在下方的 "RECOMMENDED" 中可以看到上述推荐扩展。

## 4 - 项目设置 (Project Setup)

```sh
pnpm install
```

### 4.1 开发环境编译和热重载 (Compile and Hot-Reload for Development)

```sh
pnpm dev
```

### 4.2 类型检查、编译和生产环境构建 (Type-Check, Compile and Minify for Production)

```sh
pnpm build
```

### 4.3 使用 ESLint 进行代码检查 (Lint with ESLint)

```sh
pnpm lint
```

### 4.4 代码格式化 (Code Formatting)

```sh
pnpm format
```

### 4.5 预览构建结果 (Preview Build)

```sh
pnpm preview
```

### 4.6 自动生成 API Clients 代码

参考 `package.json` 文件中 "scripts" 的 "client:update-spec" 和 "client:generate" 命令。

- `pnpm client:update-spec` 命令用于更新 API 规范文件 (位于 `codegen/openapi.json` 文件中)
- `pnpm client:generate` 命令用于生成 API Clients 代码 (位于 `src/lib/_client` 文件夹中)

为了避免后端 API 接口名称、参数名称/顺序等非代码逻辑的变更, 造成 API Clients 在所有调用处报错,
因此在 `src/services/api` 文件夹中, 对 `src/lib/_client` 中的 API Clients 代码进行了二次封装。

每次更新 API Clients 后, 检查 `src/services/api` 文件夹中的封装代码, 确保没有报错。

### 4.7 Pre-commit Hooks

执行如下命令初始化 husky

```bash
pnpm prepare
```
