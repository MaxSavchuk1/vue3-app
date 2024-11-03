<script setup lang="ts">
import { sidebarLinkList } from '@/helpers/constants'

const profileLink = { name: 'Profile', path: '/profile' }

const route = useRoute()
const router = useRouter()

const isActiveRoute = (path: string) => {
  return route.path === path
}
const hasActivePath = computed(() => {
  return [...sidebarLinkList, profileLink].some(link =>
    isActiveRoute(link.path)
  )
})
const logOut = () => {
  useAuthStore().signOut()
}

const goBack = () => {
  if (router.options.history.state.back === '/login') {
    return router.push({ name: 'Home' })
  }
  return router.back()
}
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

      <div class="divider"></div>

      <router-link
        :to="profileLink.path"
        :class="{ active: isActiveRoute(profileLink.path) }"
      >
        <i class="ri-user-line"></i>
        My profile
      </router-link>
      <div class="log-out" @click="logOut">
        <i class="ri-logout-box-line"></i>
        Log out
      </div>
    </template>

    <template v-else>
      <div class="back-btn" @click="goBack">
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

  a,
  .log-out {
    font-weight: 600;
    color: $gray-800;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 6px;

    &.active {
      background-color: rgba($gray-50, 0.5);
    }
    &:focus {
      outline: none;
    }
    &:focus-visible {
      outline: 1px solid $gray-200;
    }
  }
  .divider {
    width: 100%;
    border-top: 1px solid gray;
    margin: 20px 0;
  }
  .log-out {
    cursor: pointer;
  }
}
</style>
