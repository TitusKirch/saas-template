<script setup lang="ts">
  definePageMeta({
    layout: 'dev',
    middleware: ['dev-only'],
  });

  const { getUsersMe } = useUsersMe();
  const { data, error, status, execute } = await getUsersMe();

  const click = async () => {
    await execute();
  };
</script>

<template>
  <div>
    <DevCard>
      <DevCode :code="data" title="data" :default-is-open="true" />
      <DevCode :code="error" title="error" :default-is-open="true" />
      <DevCode :code="status" title="status" :default-is-open="true" />

      <UButton @click="click">Refetch</UButton>
    </DevCard>
  </div>
</template>
