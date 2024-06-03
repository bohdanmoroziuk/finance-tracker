import sumBy from 'lodash/sumBy';

import type { Database, Period } from '~/types'

export const useFetchTransactions = async (period: MaybeRef<Period>) => {
  const supabase = useSupabaseClient<Database>()

  const key = computed(() => {
    const from = unref(period).from.toDateString()
    const to = unref(period).to.toDateString()

    return `transactions-${from}-${to}`
  })

  const { data, pending, refresh } = await useAsyncData(key.value, async () => {
    const from = unref(period).from.toISOString()
    const to = unref(period).to.toISOString()

    const { data, error } = await supabase
      .from('transactions')
      .select()
      .gte('created_at', from)
      .lte('created_at', to)
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

  watch(period, async () => {
    await refresh()
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
