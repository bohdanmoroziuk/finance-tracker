<script setup lang="ts">
import type { Database } from '~/types'

const toast = useToast()

const supabase = useSupabaseClient<Database>()

const success = ref(false)

const pending = ref(false)

const state = ref({
  email: '',
})

const handleLogin = async () => {
  pending.value = true

  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: state.value.email,
      options: {
        emailRedirectTo: 'http://localhost:3000',
      },
    })

    if (error) throw error

    success.value = true
  } catch (error) {
    toast.add({
      title: (error as Error).message,
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
    })
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <UCard v-if="success">
    <template #header>
      Email has been sent
    </template>

    <template #default>
      <p class="text-center mb-4">
        We have sent an email to <strong>{{ state.email }}</strong> with a link to sing-in.
      </p>
      <p class="text-center">
        <strong>Important:</strong> The link will expire in 5 minutes.
      </p>
    </template>
  </UCard>
  <UCard v-else>
    <template #header>
      Sign-in to Finance Tracker
    </template>

    <template #default>
      <form @submit.prevent="handleLogin">
        <UFormGroup
          class="mb-4"
          label="Email"
          hint="You will receive an email with a confirmation link"
          name="email"
          required
        >
          <UInput
            v-model="state.email"
            type="email"
            placeholder="Email"
            required
          />
        </UFormGroup>

        <UButton
          type="submit"
          variant="solid"
          color="black"
          label="Sign-in"
          :loading="pending"
        />
      </form>
    </template>
  </UCard>
</template>
