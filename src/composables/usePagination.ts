export const usePagination = () => {
  const total = ref(0)
  const skip = ref(0)
  const currentPage = ref(1)

  const handleChangePage = (
    selectedPage: number,
    limit: number,
    cb: () => any
  ) => {
    currentPage.value = selectedPage
    skip.value = (selectedPage - 1) * limit
    cb()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return { total, skip, currentPage, handleChangePage }
}
