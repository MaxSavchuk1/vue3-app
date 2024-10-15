<script setup lang="ts">
const { isLoading } = storeToRefs(useLoaderStore())
const route = useRoute()

const isHomePage = computed(() => {
  return route.path === '/'
})
</script>

<template>
  <SideBar />

  <main class="main-container">
    <div v-if="isHomePage" class="welcome-banner">
      <span>Vue 3 example project with TypeScript</span>
    </div>
    <router-view />
  </main>

  <teleport to="body">
    <div v-if="isLoading" class="loader-wrapper">
      <div class="loader"></div>
    </div>
  </teleport>
</template>
