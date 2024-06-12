<script setup lang="ts">
  const props = defineProps<{
    value: string;
  }>();

  const { t } = useI18n();
  const copy = () => {
    navigator.clipboard.writeText(props.value);
    useNotification({
      type: 'success',
      title: t('copy.button.notification.success.title'),
      description: t('copy.button.notification.success.description'),
    });
  };
</script>

<template>
  <UButton color="primary" variant="link" @click="copy">
    <slot>
      <UIcon name="i-fa6-solid-copy" />
    </slot>
  </UButton>
</template>
