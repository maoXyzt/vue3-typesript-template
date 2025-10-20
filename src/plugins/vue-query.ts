import { VueQueryPlugin } from '@tanstack/vue-query'

import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import type { App } from 'vue'

export const setupVueQuery = (app: App) => {
  const vueQueryPluginOptions: VueQueryPluginOptions = {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          staleTime: 5000,
          refetchOnWindowFocus: false,
        },
      },
    },
    enableDevtoolsV6Plugin: true,
  }

  app.use(VueQueryPlugin, vueQueryPluginOptions)
}
