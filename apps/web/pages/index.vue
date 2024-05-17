<script setup lang="ts">
  import { useAuthStore } from '@tituskirch/app-base/stores/auth'

  const authStore = useAuthStore()
  const { register, getCsrfToken } = useAuth()
  const { data, pending, execute } = register({
    input: {
      email: 'test@example.com',
      password: 'password',
      password_confirm: 'password',
    },
  })

  await getCsrfToken()

  const clickHandler = async () => {
    console.info('clickHandler')
    await execute()
  }
</script>

<template>
  <div>
    <p>Web! I have here a change too!</p>

    <div class="h-64 flex justify-center items-center flex-col gap-8">
      <UButton @click="clickHandler">Register</UButton>

      <pre class="w-1/2 p-8 bg-gray-700">{{ pending }}</pre>

      <pre class="w-1/2 p-8 bg-gray-700">{{ data }}</pre>
    </div>
  </div>
</template>
