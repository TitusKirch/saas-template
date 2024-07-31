<script setup lang="ts">
  withDefaults(
    defineProps<{
      user?: User;
      src?: string;
      loading?: boolean;
      size?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    }>(),
    {
      user: undefined,
      src: undefined,
      loading: false,
      size: 'md',
    }
  );
</script>

<template>
  <UAvatar
    v-if="!loading"
    :src="src"
    :alt="`${user?.first_name} ${user?.last_name}`"
    :size="size"
  />
  <USkeleton
    v-else
    :ui="{ rounded: 'rounded-full' }"
    :class="{
      'size-4': size === '3xs',
      'size-5': size === '2xs',
      'size-6': size === 'xs',
      'size-8': size === 'sm',
      'size-10': size === 'md',
      'size-12': size === 'lg',
      'size-14': size === 'xl',
      'size-16': size === '2xl',
      'size-20': size === '3xl',
    }"
  />
</template>
