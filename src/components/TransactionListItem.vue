<script setup lang="ts">
import type { Transaction } from '~/types'

interface Props {
  transaction: Transaction
}

const props = defineProps<Props>()

const { currency } = useCurrency(props.transaction.amount)

const isIncome = computed(() => {
  return props.transaction.type === 'income'
})

const iconName = computed(() => {
  return isIncome.value ? 'i-heroicons-arrow-up-right' : 'i-heroicons-arrow-down-left'
})

const iconClass = computed(() => {
  return isIncome.value ? 'text-green-600' : 'text-red-600'
})

const items = [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        console.log('Edit')
      },
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        console.log('Delete')
      },
    },
  ]
]
</script>

<template>
  <div class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-1">
        <UIcon
          :name="iconName"
          :class="iconClass"
        />
        <p>
          {{ transaction.description }}
        </p>
      </div>
      <div>
        <UBadge
          :label="transaction.category"
          color="white"
        />
      </div>
    </div>
    <div class="flex items-center justify-end space-x-2">
      <p>
        {{ currency }}
      </p>
      <div>
        <UDropdown
          :items="items"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton
            color="white"
            variant="ghost"
            trailing-icon="i-heroicons-ellipsis-horizontal"
          />
        </UDropdown>
      </div>
    </div>
  </div>
</template>