<script setup lang="ts">
  defineProps<{
    errorMessages: string[];
  }>();
</script>

<template>
  <BaseAlert
    v-if="errorMessages.length"
    type="error"
    :title="$t('base.form.errorsAlert.title')"
    class="mb-8"
  >
    <template #description>
      <ul class="list-disc list-inside">
        <li v-for="errorMessage in errorMessages">{{ errorMessage }}</li>
      </ul>
    </template>
  </BaseAlert>
</template>
