/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */
// import { defineAsyncComponent } from "vue"

import setupAssets from './assets'
import { setupVueQuery } from './vue-query'
import { loadFonts } from './webfontloader'

import type { App } from 'vue'

export { setupAssets }

export async function registerPlugins(app: App) {
  // register plugins here
  loadFonts()
  setupVueQuery(app)
  return app
}

export function registerComponents(app: App) {
  // register components here
  return app
}
