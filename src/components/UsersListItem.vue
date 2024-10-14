<script setup lang="ts">
defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <li class="users-list--item">
    <div>{{ user.firstName }} {{ user.lastName }}, {{ user.age }} y.o.</div>
    <router-link :to="`/users/${user.id}`">View</router-link>
  </li>
</template>

<style lang="scss" scoped>
.users-list--item {
  padding: 15px;
  display: flex;
  gap: 15px;
}
</style>
