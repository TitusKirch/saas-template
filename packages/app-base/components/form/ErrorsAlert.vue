<script setup lang="ts">
  defineProps<{
    errorMessages: Record<string, string>;
  }>();
</script>

<template>
  <BaseAlert
    v-if="!!Object.keys(errorMessages).length > 0"
    type="error"
    :title="$t('base.form.errorsAlert.title')"
    class="mb-8"
  >
    <template #description>
      <BaseAlertList :items="errorMessages" />
    </template>
  </BaseAlert>
</template>
