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
      <div class="back-btn" @click="router.back()">
        <i class="ri-arrow-left-line"></i>
      </div>
    </template>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.nav-bar {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 200px;
  padding: 30px 4px 0;
  gap: 4px;
  background-color: $orange-300;

  .back-btn {
    margin: 0 auto;
    font-size: 1.5em;
    color: $gray-800;
    border: 2px solid $gray-700;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
  }

  a {
    font-weight: 600;
    color: $gray-800;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 6px;

    &.active {
      background-color: rgba($gray-50, 0.5);
    }
    &:hover {
      text-decoration: underline;
      color: $gray-900;
    }
    &:focus {
      outline: none;
    }
    &:focus-visible {
      outline: 1px solid $gray-200;
    }
  }
}
</style>
