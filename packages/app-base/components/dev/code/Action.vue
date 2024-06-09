<script setup lang="ts">
  withDefaults(
    defineProps<{
      icon?: string;
      title?: string;
      disabled?: boolean;
    }>(),
    {
      icon: 'i-fa6-solid-wand',
      title: 'Untitled action',
      disabled: false,
    }
  );
  const emits = defineEmits<{
    onClick: [];
  }>();

  // click handler
  const clickHandler = () => {
    emits('onClick');
  };
</script>

<template>
  <div
    :class="{
      'opacity-30': disabled,
    }"
    class="hover:text-primary-700 dark:hover:text-primary-500 group flex items-center gap-2 p-4 text-gray-700 hover:cursor-pointer dark:text-gray-300 lg:justify-center"
    @click="clickHandler"
  >
    <UIcon :name="icon" class="text-lg" />
    <span class="text-sm">{{ title }}</span>
  </div>
</template>
