export const useAuthGuard = (url = '/') => {
  const user = useSupabaseUser()

  watch(user, (user) => {
    if (user) {
      navigateTo(url)
    }
  }, {
    immediate: true,
  })
}
