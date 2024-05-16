<script setup lang="ts">
useInterFont()
</script>

<template>
  <div class="container mx-auto max-w-4xl">
    <AppHeader />
    <main class="my-10">
      <slot />
    </main>
  </div>
</template>

<style>
body {
  font-family: 'Inter', sans-serif;

  @apply dark:bg-gray-900 bg-white;
}
</style>
