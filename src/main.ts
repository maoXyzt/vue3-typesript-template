import { createPinia } from 'pinia'
import { createApp } from 'vue'

import AppComponent from './App.vue'

import { registerPlugins, setupAssets } from './plugins'
import { setupRouter } from './router'

import 'virtual:uno.css'

import './styles/css/main.css'

async function setupApp() {
  setupAssets()

  const app = createApp(AppComponent)

  app.use(createPinia())

  await registerPlugins(app)
  await setupRouter(app)

  app.mount('#app')
}

setupApp()
