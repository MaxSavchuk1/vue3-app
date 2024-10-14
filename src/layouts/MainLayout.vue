<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const linkList = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Users', path: '/users' }
]

const route = useRoute()
const router = useRouter()

const isActiveRoute = (path: string) => {
  return route.path === path
}
const hasActivePath = computed(() => {
  return linkList.some(link => isActiveRoute(link.path))
})
</script>

<template>
  <nav class="nav-bar">
    <template v-if="hasActivePath">
      <router-link
        v-for="link in linkList"
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

  <main class="container">
    <router-view />
  </main>
</template>
