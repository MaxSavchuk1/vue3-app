<script setup lang="ts">
import { useRoute } from 'vue-router'

const linkList = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Users', path: '/users' }
]

const route = useRoute()

const isActiveRoute = (path: string) => {
  return route.path === path
}
</script>

<template>
  <nav class="nav-bar">
    <router-link
      v-for="link in linkList"
      :key="link.path"
      :to="link.path"
      :class="{ active: isActiveRoute(link.path) }"
    >
      {{ link.name }}
    </router-link>
  </nav>
  <main class="container">
    <router-view />
  </main>
</template>
