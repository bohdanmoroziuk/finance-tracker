<script setup lang="ts">
import type { FormSubmitEvent, Form } from '#ui/types'

import { z } from 'zod'
import { cloneDeep } from 'lodash'

import type { Database, TransactionInsert } from '~/types'
import { typeOptions, categoryOptions } from '~/constants'

interface Emits {
  (event: 'added'): void
}

const emit = defineEmits<Emits>()

const notification = useNotification()

const supabase = useSupabaseClient<Database>()

const isOpen = defineModel<boolean>({ required: true })

const form = ref<Form<unknown>>()

const errors = computed(() => {
  return form.value?.errors.value ?? []
})

const hasErrors = computed(() => {
  return errors.value.length > 0
})

const clearErrors = () => {
  form.value?.clear()
}

const defaultSchema = z.object({
  amount: z.number().positive('Amount needs to be greater than zero'),
  created_at: z.string(),
  description: z.string().optional(),
})

const incomeSchema = z.object({
  type: z.literal('income'),
})

const expenseSchema = z.object({
  type: z.literal('expense'),
  category: z.string(),
})

const investmentSchema = z.object({
  type: z.literal('investment'),
})

const savingSchema = z.object({
  type: z.literal('saving'),
})

const schema = z.intersection(
  z.discriminatedUnion('type', [incomeSchema, expenseSchema, investmentSchema, savingSchema]),
  defaultSchema,
)

type Schema = z.output<typeof schema>

const initialState = {
  type: 'income',
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined,
}

const state = ref<TransactionInsert>(cloneDeep(initialState))

const resetState = () => {
  state.value = cloneDeep(initialState)
}

const close = () => {
  isOpen.value = false

  resetState()
  clearErrors()
}

const isLoading = ref(false)

const submit = async (event: FormSubmitEvent<Schema>) => {
  if (hasErrors.value) return

  isLoading.value = true

  try {
    const { error } = await supabase
      .from('transactions')
      .upsert(state.value)

    if (error) throw error

    notification.success({
      title: 'Transaction has been added',
    })

    close()

    emit('added')
  } catch (error) {
    notification.error({
      title: (error as Error).message,
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UModal
    v-model="isOpen"
    prevent-close
  >
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Add Transaction
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="close"
          />
        </div>
      </template>

      <template #default>
        <UForm
          :state="state"
          :schema="schema"
          ref="form"
          @submit="submit"
        >
          <UFormGroup
            class="mb-4"
            label="Transaction Type"
            name="type"
            required
          >
            <USelect
              v-model="state.type"
              :options="typeOptions"
              placeholder="Select the transaction type"
            />
          </UFormGroup>

          <UFormGroup
            class="mb-4"
            label="Amount"
            name="amount"
            required
          >
            <UInput
              v-model.number="state.amount"
              type="number"
              placeholder="Amount"
            />
          </UFormGroup>

          <UFormGroup
            class="mb-4"
            label="Transaction Date"
            name="created_at"
            required
          >
            <UInput
              v-model="state.created_at"
              type="date"
              icon="i-heroicons-calendar-days-20-solid"
            />
          </UFormGroup>

          <UFormGroup
            class="mb-4"
            label="Description"
            name="description"
            hint="Optional"
          >
            <UInput
              v-model.trim="state.description"
              type="text"
              placeholder="Description"
            />
          </UFormGroup>

          <UFormGroup
            v-if="state.type === 'expense'"
            class="mb-4"
            label="Category"
            name="category"
            required
          >
            <USelect
              v-model="state.category"
              :options="categoryOptions"
              placeholder="Category"
            />
          </UFormGroup>

          <UButton
            :loading="isLoading"
            type="submit"
            color="black"
            variant="solid"
            label="Save"
          />
        </UForm>
      </template>
    </UCard>
  </UModal>
</template>
