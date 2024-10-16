export const useAbortOnLeave = () => {
  const abortController = ref<AbortController>()

  const getSignal = () => {
    abortController.value = new AbortController()
    return abortController.value?.signal
  }

  onBeforeRouteLeave(() => {
    return abortController.value && abortController.value.abort()
  })

  return { getSignal }
}
