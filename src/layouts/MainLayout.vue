<script setup lang="ts">
const { isLoading } = storeToRefs(useLoaderStore())
const route = useRoute()

const target = ref(null)
const targetIsVisible = ref(false)

const isHomePage = computed(() => {
  return route.path === '/'
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting
})
</script>

<template>
  <div id="scroll-plug" ref="target"></div>

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
    <transition name="slide">
      <div
        v-if="!targetIsVisible && !isLoading"
        class="scroll-to-top-button"
        @click="scrollToTop"
      >
        <i class="ri-arrow-up-line"></i>
      </div>
    </transition>
  </teleport>
</template>
