<script setup lang="ts">
const success = ref(false)

</script>

<template>
  <UCard v-if="success">
    <template #header>
      Email has been sent
    </template>

    <template #default>
      <p class="text-center mb-4">
        We have sent an email to <strong>rmsil@gmail.com</strong> with a link to sing-in.
      </p>
      <p class="text-center">
        <strong>Important:</strong> The link will expire in 5 minutes.
      </p>
    </template>
  </UCard>
  <UCard v-else>
    <template #header>
      Sign-in to Finance Tracker
    </template>

    <template #default>
      <form>
        <UFormGroup
          class="mb-4"
          label="Email"
          hint="You will receive an email with a confirmation link"
          name="email"
          required
        >
          <UInput
            type="email"
            placeholder="Email"
            required
          />
        </UFormGroup>

        <UButton
          type="submit"
          variant="solid"
          color="black"
          label="Sign-in"
          @click="success = true"
        />
      </form>
    </template>
  </UCard>
</template>
