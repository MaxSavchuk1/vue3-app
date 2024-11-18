import UserEntity from '@/entities/User.entity'

export const useUserStore = defineStore('user-store', () => {
  const user = ref<UserEntity>()

  const fetchCurrentUser = () => {
    return useApi().auth.getLoggedUserData({
      onSuccess: res => {
        user.value = new UserEntity(res)
      }
    })
  }

  const userData = computed(() => {
    return user.value
  })

  return {
    userData,
    fetchCurrentUser
  }
})
