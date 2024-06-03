export const useCurrency = (amount: MaybeRef<number>) => {
  const options = {
    style: 'currency',
    currency: 'USD',
  }

  const currency = computed(() => {
    return new Intl.NumberFormat('en-IN', options).format(unref(amount))
  })

  return {
    currency,
  }
}
