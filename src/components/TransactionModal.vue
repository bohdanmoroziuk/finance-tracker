<script setup lang="ts">
import type { FormSubmitEvent, Form } from '#ui/types'

import { z } from 'zod'

import type { TransactionInsert } from '~/types'
import { typeOptions, categoryOptions } from '~/constants'

const isOpen = defineModel<boolean>({ required: true })

const close = () => {
  isOpen.value = false
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

const state = ref<Partial<TransactionInsert>>({
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined,
})

const form = ref<Form<unknown>>()

const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  await form.value!.validate()

  console.log(event.data)
}
</script>

<template>
  <UModal v-model="isOpen">
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
          @submit="handleSubmit"
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
