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
    {{ user.firstName }} {{ user.lastName }}, {{ user.age }}
  </li>
</template>

<style lang="scss" scoped>
.users-list--item {
  padding: 10px;
}
</style>
