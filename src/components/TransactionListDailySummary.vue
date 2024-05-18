<script setup lang="ts">
import { sumBy } from 'lodash'

import type { Transaction } from '~/types'

interface Props {
  date: string
  transactions: Transaction[]
}

const props = defineProps<Props>()

const sum = computed(() => {
  const incomes = props.transactions.filter((transaction) => transaction.type === 'income')
  const expenses = props.transactions.filter((transaction) => transaction.type === 'expense')

  return sumBy(incomes, 'amount') - sumBy(expenses, 'amount')
})

const { currency } = useCurrency(sum)
</script>

<template>
  <div class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 font-bold">
    <div class="flex items-center justify-between">
      {{ date }}
    </div>
    <div class="flex items-center justify-end mr-10">
      {{ currency }}
    </div>
  </div>
</template>