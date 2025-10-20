<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { RouteNames } from '@/router'

defineOptions({ name: 'NotFound' })

const route = useRoute()
const router = useRouter()

function goToHome() {
  router.push({ name: RouteNames.Root })
}

const description = computed(() => {
  if (!route?.redirectedFrom?.path) {
    return '找不到页面'
  } else {
    return '找不到页面：' + route.redirectedFrom.path
  }
})
</script>

<template>
  <n-layout embedded content-style="padding: 24px;" class="wh-full">
    <n-result status="404" title="404 Not Found" :description="description">
      <template #footer>
        <n-button type="primary" @click="goToHome"> 回到主页 </n-button>
      </template>
    </n-result>
  </n-layout>
</template>
