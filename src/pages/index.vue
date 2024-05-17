<script setup lang="ts">
import { viewOptions } from '~/constants'

const view = ref(viewOptions[0])
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
      :amount="4000"
      :last-amount="3000"
      :loading="false"
      title="Income"
      color="green"
    />
    <TrendCard
      :amount="4000"
      :last-amount="5000"
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

  <section>
    <TransactionListItem />
    <TransactionListItem />
    <TransactionListItem />
    <TransactionListItem />
  </section>
</template>
