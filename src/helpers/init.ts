export default async function init() {
  console.log(useAuthStore())
  if (useAuthStore().accessToken) {
    try {
      await useAuthStore().refresh()
    } catch (error) {
      console.error('init error', error)
    }
  }
  return true
}
