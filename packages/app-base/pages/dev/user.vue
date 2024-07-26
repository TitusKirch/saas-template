<script setup lang="ts">
  definePageMeta({
    layout: 'dev',
    middleware: ['dev-only'],
  });

  const { fetchCurrentUser, currentUser, fetchUserError, fetchUserStatus } = useNewCurrentUser();

  const click = async () => {
    await fetchCurrentUser();
  };
</script>

<template>
  <div>
    <DevCard>
      <DevCode :code="currentUser" title="currentUser" :default-is-open="true" />
      <DevCode :code="fetchUserError" title="fetchUserError" :default-is-open="true" />
      <DevCode :code="fetchUserStatus" title="fetchUserStatus" :default-is-open="true" />

      <UButton @click="click">Refetch</UButton>
    </DevCard>
  </div>
</template>
