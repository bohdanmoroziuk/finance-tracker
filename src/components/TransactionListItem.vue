<script setup lang="ts">
import type { Database, Transaction } from '~/types'

interface Props {
  transaction: Transaction
}

interface Emits {
  (event: 'deleted'): void
  (event: 'edited'): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const supabase = useSupabaseClient<Database>()

const notification = useNotification()

const modal = ref(false)

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

const isLoading = ref(false)

const startEditingTransaction = () => {
  modal.value = true
}

const handleTransactionDelete = async () => {
  isLoading.value = true

  try {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', props.transaction.id)

    if (error) {
      throw error
    }

    emit('deleted')

    notification.success({
      title: 'Transaction has been deleted',
    })
  } catch (error) {
    notification.error({
      title: (error as Error).message,
    })
  } finally {
    isLoading.value = false
  }
}

const items = [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: startEditingTransaction,
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      iconClass: 'text-red-600',
      click: handleTransactionDelete,
    },
  ]
]
</script>

<template>
  <div class="grid grid-cols-3 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
    <div class="flex items-center justify-between space-x-4 col-span-2">
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
          v-if="transaction.category"
          :label="transaction.category"
          color="white"
        />
      </div>
    </div>
    <div class="flex items-center justify-end space-x-2">
      <p>
        {{ currency }}
      </p>
      <div class="w-8">
        <UDropdown
          :items="items"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton
            :loading="isLoading"
            color="white"
            variant="ghost"
            trailing-icon="i-heroicons-ellipsis-horizontal"
          />
        </UDropdown>
      </div>
    </div>
  </div>

  <TransactionModal
    v-model="modal"
    :transaction="transaction"
    @submitted="emit('edited')"
  />
</template>
