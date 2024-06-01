<script setup lang="ts">
const user = useSupabaseUser()

const supabase = useSupabaseClient()

const handleLogout = async () => {
  await supabase.auth.signOut()

  navigateTo('/login')
}

const items = [
  [
    {
      slot: 'account',
      disabled: true,
    },
  ],
  [
    {
      label: 'Settings',
      icon: 'i-heroicons-cog-8-tooth',
      click: () => console.log('Link to settings in the future'),
    },
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: handleLogout,
    }
  ],
]
</script>

<template>
  <UDropdown
    v-if="user"
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-64' }"
  >
    <UAvatar
      src="https://avatars.githubusercontent.com/u/739984?v=4"
      alt="Avatar"
    />

    <template #account>
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p class="font-medium text-gray-900 dark:text-white">
          {{ user.email }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon
        :name="item.icon"
        class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
      />
    </template>
  </UDropdown>
</template>
