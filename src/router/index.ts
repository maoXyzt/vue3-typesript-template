import { createRouter, createWebHistory } from 'vue-router'

import { constantRoutes, customRoutes } from './routes'
export { RouteNames } from './routes'

import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [...customRoutes, ...constantRoutes]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

/** Setup Vue Router */
export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
