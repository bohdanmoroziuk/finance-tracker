import { sumBy } from 'lodash';

import type { Database } from '~/types'

export const useFetchTransactions = async () => {
  const supabase = useSupabaseClient<Database>()

  const { data, pending, refresh } = await useAsyncData('transactions', async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select()
      .order('created_at', { ascending: false })

    if (error) return []

    return data
  })

  const transactions = computed(() => {
    return data.value ?? []
  })

  const income = computed(() => {
    return transactions.value.filter((transaction) => transaction.type === 'income')
  })

  const expense = computed(() => {
    return transactions.value.filter((transaction) => transaction.type === 'expense')
  })

  const incomeCount = computed(() => {
    return income.value.length
  })

  const expenseCount = computed(() => {
    return expense.value.length
  })

  const incomeTotal = computed(() => {
    return sumBy(income.value, 'amount')
  })

  const expenseTotal = computed(() => {
    return sumBy(expense.value, 'amount')
  })

  return {
    transactions,
    pending,
    income,
    incomeCount,
    incomeTotal,
    expense,
    expenseCount,
    expenseTotal,
    refresh,
  }
}
