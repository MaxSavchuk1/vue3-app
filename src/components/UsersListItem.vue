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
    <router-link :to="`/users/${user.id}`"
      ><i class="ri-arrow-right-wide-fill"></i
    ></router-link>
  </li>
</template>

<style lang="scss" scoped>
.users-list--item {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  width: min(400px, 95%);
  a {
    text-decoration: none;
    color: black;
  }
}
</style>
