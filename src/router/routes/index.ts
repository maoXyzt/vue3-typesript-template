import type { RouteRecordRaw } from 'vue-router'

export enum RouteNames {
  Root = 'root',
  NotFound = 'not-found',
  // TODO: add routes
}

/** 固定不变的路由(最后一项重定向未找到的路由须放置路由的最后一项) */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    name: RouteNames.NotFound,
    path: '/404',
    component: () => import('@/views/system/NotFound.vue'),
    meta: {
      title: 'not-found',
      constant: true,
      i18nKey: 'router.404',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: RouteNames.NotFound },
    meta: {
      title: 'not-found',
      constant: true,
    },
  },
]

export const customRoutes: Array<RouteRecordRaw> = [
  {
    name: RouteNames.Root,
    path: '/',
    component: () => import('@/components/layouts/globalLayout.vue'),
    redirect: {
      // TODO: add redirect target
    },
    children: [
      // TODO: add route definitions
    ],
  },
]
