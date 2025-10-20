<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import { lightTheme, useMessage } from 'naive-ui'

window.$message = useMessage()

hljs.registerLanguage('json', json)
</script>

<template>
  <n-config-provider :hljs="hljs" :theme="lightTheme">
    <n-message-provider keep-alive-on-hover :duration="5000" closable>
      <router-view />
      <VueQueryDevtools />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
