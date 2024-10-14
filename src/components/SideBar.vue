<script setup lang="ts">
import { sidebarLinkList } from '@/helpers/constants'

const route = useRoute()
const router = useRouter()

const isActiveRoute = (path: string) => {
  return route.path === path
}
const hasActivePath = computed(() => {
  return sidebarLinkList.some(link => isActiveRoute(link.path))
})
</script>

<template>
  <nav class="nav-bar">
    <template v-if="hasActivePath">
      <router-link
        v-for="link in sidebarLinkList"
        :key="link.path"
        :to="link.path"
        :class="{ active: isActiveRoute(link.path) }"
      >
        {{ link.name }}
      </router-link>
    </template>

    <template v-else>
      <div @click="router.back()"><i class="ri-arrow-left-line"></i></div>
    </template>
  </nav>
</template>
