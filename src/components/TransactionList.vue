<script setup lang="ts">
import { format } from 'date-fns'
import { groupBy } from 'lodash'

import type { Transaction } from '~/types'

interface Props {
  transactions: Transaction[]
}

type TransactionsGroupedByDate = Record<string, Transaction[]>

const props = defineProps<Props>()

const transactionsGroupedByDate = computed<TransactionsGroupedByDate>(() => {
  return groupBy(props.transactions, (transaction: Transaction) => {
    return format(transaction.created_at, 'yyyy-MM-dd')
  })
})

console.log(transactionsGroupedByDate.value)
</script>

<template>
  <section>
    <div
      v-for="(transactionsOnDay, date) in transactionsGroupedByDate"
      :key="date"
      class="mb-10"
    >
      <TransactionListDailySummary
        :date="date"
        :transactions="transactionsOnDay"
      />
      <TransactionListItem
        v-for="transaction of transactionsOnDay"
        :key="transaction.id"
        :transaction="transaction"
      />
    </div>
  </section>
</template>
