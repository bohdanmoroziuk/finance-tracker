<script setup lang="ts">
interface Props {
  title: string
  amount: number
  lastAmount: number
  color: string
  loading: boolean
}

const props = defineProps<Props>()

const { currency } = useCurrency(props.amount)

const percentageTrend = computed(() => {
  if (props.amount === 0) return '∞%'
  if (props.lastAmount === 0) return '∞%'

  const a = Math.max(props.amount, props.lastAmount)
  const b = Math.min(props.amount, props.lastAmount)

  const ratio = ((a - b) / b) * 100

  return Math.ceil(ratio)
})

const trendingUp = computed(() => {
  return props.amount > props.lastAmount
})

const iconName = computed(() => {
  return trendingUp.value ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down'
})

const iconClass = computed(() => {
  return {
    'green': trendingUp.value,
    'red': !trendingUp.value,
  }
})
</script>

<template>
  <div>
    <h3
      :class="[color]"
      class="font-bold"
    >
      {{ title }}
    </h3>

    <div class="text-2xl font-extrabold text-black dark:text-white mb-2">
      <USkeleton
        v-if="loading"
        class="w-full h-8"
      />
      <p v-else>
        {{ currency }}
      </p>
    </div>

    <div>
      <USkeleton
        v-if="loading"
        class="w-full h-6"
      />
      <div
        v-else
        class="flex space-x-1 items-center text-sm"
      >
        <UIcon
          :name="iconName"
          :class="iconClass"
          class="w-6 h-6"
        />
        <p class="text-gray-500 dark:text-gray-400">
          {{ percentageTrend }}% vs last period
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.green {
  @apply text-green-600 dark:text-green-400;
}

.red {
  @apply text-red-600 dark:text-red-400;
}
</style>
