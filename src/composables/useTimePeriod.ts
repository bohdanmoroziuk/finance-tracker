import {
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
  sub,
} from 'date-fns'

import type { Period } from '~/types'

export const useTimePeriod = (period: MaybeRef<string>) => {
  const current = computed<Period>(() => {
    switch (unref(period)) {
      case 'daily':
        return {
          from: startOfDay(new Date()),
          to: endOfDay(new Date()),
        }
      case 'monthly':
        return {
          from: startOfMonth(new Date()),
          to: endOfMonth(new Date()),
        }
      case 'yearly':
        return {
          from: startOfYear(new Date()),
          to: endOfYear(new Date()),
        }
      default:
        throw new Error('Unknown time period')
    }
  })

  const previous = computed<Period>(() => {
    switch (unref(period)) {
      case 'daily':
        return {
          from: startOfDay(sub(new Date(), { days: 1 })),
          to: endOfDay(sub(new Date(), { days: 1 })),
        }
      case 'monthly':
        return {
          from: startOfMonth(sub(new Date(), { months: 1 })),
          to: endOfMonth(sub(new Date(), { months: 1 })),
        }
      case 'yearly':
        return {
          from: startOfYear(sub(new Date(), { years: 1 })),
          to: endOfYear(sub(new Date(), { years: 1 })),
        }
      default:
        throw new Error('Unknown time period')
    }
  })

  return {
    current,
    previous,
  }
}
