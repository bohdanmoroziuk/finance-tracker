<script setup lang="ts">
import { viewOptions } from '~/constants'

const view = ref(viewOptions[0])

const modal = ref(false)

const showModal = () => {
  modal.value = true
}

const { current, previous } = useTimePeriod(view)

const {
  transactions,
  pending,
  incomeCount,
  incomeTotal,
  expenseCount,
  expenseTotal,
  refresh,
} = await useFetchTransactions(current)

const {
  incomeTotal: previousIncomeTotal,
  expenseTotal: previousExpenseTotal,
} = await useFetchTransactions(previous)
</script>

<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">
      Summary
    </h1>
    <div>
      <USelectMenu
        v-model="view"
        :options="viewOptions"
      />
    </div>
  </section>

  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-16 mb-10">
    <TrendCard
      :amount="incomeTotal"
      :last-amount="previousIncomeTotal"
      :loading="false"
      title="Income"
      color="green"
    />
    <TrendCard
      :amount="expenseTotal"
      :last-amount="previousExpenseTotal"
      :loading="false"
      title="Expense"
      color="red"
    />
    <TrendCard
      :amount="4000"
      :last-amount="3000"
      :loading="false"
      title="Investments"
      color="green"
    />
    <TrendCard
      :amount="4000"
      :last-amount="4100"
      :loading="false"
      title="Saving"
      color="red"
    />
  </section>

  <section class="flex justify-between mb-10">
    <div>
      <h2 class="text-2xl font-extrabold">
        Transactions
      </h2>
      <div class="text-gray-500 dark:text-gray-400">
        You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this period
      </div>
    </div>
    <div>
      <UButton
        icon="i-heroicons-plus-circle"
        color="white"
        variant="solid"
        label="Add"
        @click="showModal"
      />
    </div>
  </section>

  <template v-if="pending">
    <USkeleton
      v-for="n in 4"
      :key="n"
      class="w-full h-8 mb-2"
    />
  </template>
  <template v-else>
    <TransactionList
      :transactions="transactions"
      @transaction-deleted="refresh"
    />
  </template>

  <TransactionModal
    v-model="modal"
    @added="refresh"
  />
</template>
