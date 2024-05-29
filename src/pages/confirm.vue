<script setup lang="ts">
useAuthGuard()
</script>

<template>
  <UCard>
    <template #header>
      Signing in...
    </template>

    <template #default>
      Wait a moment while we sign you in.
    </template>
  </UCard>
</template>
