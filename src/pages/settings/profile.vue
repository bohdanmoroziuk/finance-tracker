<script setup lang="ts">
import { z } from 'zod'

import type { Database } from '~/types'

const supabase = useSupabaseClient<Database>()

const user = useSupabaseUser()

const notification = useNotification()

const pending = ref(false)

const state = ref({
  name: user.value?.user_metadata?.full_name ?? '',
  email: user.value?.email ?? '',
})

const changes = computed(() => {
  return {
    data: {
      full_name: state.value.name,
    },
    ...(
      state.value.email !== user.value?.email
        ? {
            email: state.value.email,
          }
        : {}
    ),
  }
})

const schema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
})

const submit = async () => {
  pending.value = true

  try {
    const { error } = await supabase.auth.updateUser(changes.value)

    if (error) throw error

    notification.success({
      title: 'Your profile has been updated',
    })
  } catch (error) {
    notification.error({
      title: (error as Error).message,
    })
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <UForm
    :state="state"
    :schema="schema"
    @submit="submit"
  >
    <UFormGroup
      class="mb-4"
      label="Full Name"
      name="name"
    >
      <UInput
        v-model="state.name"
      />
    </UFormGroup>

    <UFormGroup
      class="mb-4"
      label="Email"
      name="email"
      help="If you change it you will receive a confirmation email on both addresses"
    >
      <UInput
        v-model="state.email"
      />
    </UFormGroup>

    <UButton
      :loading="pending"
      type="submit"
      label="Save"
      color="black"
      variant="solid"
    />
  </UForm>
</template>
