<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      type: 'info' | 'success' | 'warning' | 'error';
      icon?: string;
      title?: string;
      description?: string;
    }>(),
    {
      type: 'info',
      icon: '',
      title: '',
      description: '',
    }
  );
  defineSlots<{
    title?: HTMLElement;
    description?: HTMLElement;
  }>();

  const color = computed(() => {
    switch (props.type) {
      case 'info':
        return 'blue';
      case 'success':
        return 'green';
      case 'warning':
        return 'yellow';
      case 'error':
        return 'red';
    }
  });
  const icon = computed(() => {
    if (props.icon) {
      return props.icon;
    }

    switch (props.type) {
      case 'info':
        return 'i-fa6-solid-circle-info';
      case 'success':
        return 'i-fa6-solid-circle-check';
      case 'warning':
        return 'i-fa6-solid-triangle-exclamation';
      case 'error':
        return 'i-fa6-solid-circle-exclamation';
    }
  });
</script>

<template>
  <UAlert :color="color" :icon="icon" :title="title" :description="description">
    <template #title v-if="$slots.title">
      <slot name="title" />
    </template>

    <template #description v-if="$slots.description">
      <slot name="description" />
    </template>
  </UAlert>
</template>
