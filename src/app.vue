<script setup lang="ts">
/**
 * FIX: dark mode is not activated by default
 */
const { isDark, toggleDark } = useDark()

if (isDark.value === false) {
  toggleDark()
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>
