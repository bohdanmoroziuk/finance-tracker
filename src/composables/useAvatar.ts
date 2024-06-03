export type Avatar = {
  url: string | null
}

export const useAvatar = () => {
  const supabase = useSupabaseClient()

  const user = useSupabaseUser()

  const avatar = ref<Avatar>({
    url: null,
  })

  const getPublicUrl = () => {
    if (!user.value) return null
    if (!user.value.user_metadata.avatar_url) return null

    const { data: { publicUrl } } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(user.value.user_metadata.avatar_url)

    return publicUrl
  }

  watch(user, () => {
    avatar.value.url = getPublicUrl()
  }, {
    immediate: true,
  })

  return avatar
}
