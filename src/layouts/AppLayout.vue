<script setup lang="ts">
const route = useRoute()
const { isLoading } = storeToRefs(useLoaderStore())

const target = ref(null)
const targetIsVisible = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting
})
</script>

<template>
  <div id="scroll-plug" ref="target"></div>

  <component :is="route.meta.layoutComponent">
    <slot />
  </component>

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
