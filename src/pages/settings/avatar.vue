<script setup lang="ts">
import { faker } from '@faker-js/faker'

const supabase = useSupabaseClient()

const user = useSupabaseUser()

const notification = useNotification()

const uploading = ref(false)

const fileInput = ref()

const file = computed<File | null>(() => {
  return fileInput.value.input.files[0]
})

const fileName = computed(() => {
  if (!file.value) return ''

  return [
    faker.string.nanoid(),
    file.value.name.split('.').reverse()[0],
  ].join('.')
})

const filePath = computed(() => {
  if (!file.value) return ''

  return `public/${fileName.value}`
})

const saveAvatar = async () => {
  if (!file.value) {
    return notification.error({
      title: 'Select a file to upload first',
    })
  }

  try {
    uploading.value = true

    const currentAvatarUrl = user.value?.user_metadata?.avatar_url

    const { data, error: uploadError } = await supabase
      .storage
      .from('avatars')
      .upload(filePath.value, file.value)

    if (uploadError) throw uploadError

    const { error: updateUserError } = await supabase
      .auth
      .updateUser({
        data: {
          avatar_url: data.path,
        },
      })

    if (updateUserError) throw updateUserError

    if (currentAvatarUrl) {
      const { error: removeError } = await supabase
        .storage
        .from('avatars')
        .remove([currentAvatarUrl])

      if (removeError) throw removeError
    }

    fileInput.value.input.value = null

    notification.success({
      title: 'Avatar uploaded',
    })
  } catch (error) {
    notification.error({
      title: (error as Error).message,
    })
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <div>
    <UFormGroup
      label="Current avatar"
      class="w-full mb-4"
      help="This would be blank by default"
    >
      <UAvatar
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        size="3xl"
      />
    </UFormGroup>

    <UFormGroup
      label="New avatar"
      class="w-full mb-4"
      name="avatar"
      help="After choosing an image click Save to actually upload the new avatar"
    >
      <UInput
        type="file"
        ref="fileInput"
      />
    </UFormGroup>

    <UButton
      type="submit"
      color="black"
      variant="solid"
      label="Save"
      :loading="uploading"
      :disabled="uploading"
      @click="saveAvatar"
    />
  </div>
</template>
