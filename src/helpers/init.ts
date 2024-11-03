export default async function init() {
  if (useAuthStore().accessToken) {
    try {
      await useAuthStore().refresh()
      await useUserStore().fetchCurrentUser()
    } catch (error) {
      console.error('init error', error)
    }
  }
  return true
}
