<script setup lang="ts">
import { z } from 'zod'

import { viewOptions } from '~/constants';

const supabase = useSupabaseClient()

const user = useSupabaseUser()

const notification = useNotification()

const pending = ref(false)

const state = ref({
  view: user.value?.user_metadata?.preferences?.view ?? 'monthly',
})

const schema = z.object({
  view: z.string(),
})

const changes = computed(() => {
  return {
    data: {
      preferences: {
        view: state.value.view,
      },
    }
  }
})

const submit = async () => {
  pending.value = true

  try {
    const { error } = await supabase.auth.updateUser(changes.value)

    if (error) throw error

    notification.success({
      title: 'Settings updated',
    })
  } catch (error) {
    notification.error({
      title: (error as Error).message
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
      label="Transaction View"
      class="mb-4"
      help="Choose how you would like to view transactions"
    >
      <USelect
        v-model="state.view"
        :options="viewOptions"
      />
    </UFormGroup>

    <UButton
      type="submit"
      color="black"
      variant="solid"
      label="Save"
      :loading="pending"
      :disabled="pending"
    />
  </UForm>
</template>
