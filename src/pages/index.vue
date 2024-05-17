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
</template>
