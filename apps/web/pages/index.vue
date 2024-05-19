<script setup lang="ts">
  import { useAuthStore } from '@tituskirch/app-base/stores/auth';

  const authStore = useAuthStore();
  const { transformRegisterFormToData, register } = useAuth();
  const { data, error, pending, execute } = await register({
    data: transformRegisterFormToData({
      form: {
        email: 'test@example.com',
        password: 'password',
        password_confirm: 'password',
      },
    }),
  });

  const clickHandler = async () => {
    console.info('clickHandler');
    await execute();
  };
</script>

<template>
  <div>
    <p>Web! I have here a change too!</p>

    <div class="h-64 flex justify-center items-center flex-col gap-8">
      <UButton @click="clickHandler">Register</UButton>

      <pre class="w-1/2 p-8 bg-gray-700">{{ pending }}</pre>

      <pre class="w-1/2 p-8 bg-gray-700">{{ data }}</pre>

      <pre class="w-1/2 p-8 bg-gray-700">{{ error }}</pre>

      <pre class="w-1/2 p-8 bg-gray-700">{{ error?.data?.errors }}</pre>
    </div>
  </div>
</template>
