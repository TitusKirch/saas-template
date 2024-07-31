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
      'h-4 w-4': size === '3xs',
      'h-5 w-5': size === '2xs',
      'h-6 w-6': size === 'xs',
      'h-8 w-8': size === 'sm',
      'h-10 w-10': size === 'md',
      'h-12 w-12': size === 'lg',
      'h-14 w-14': size === 'xl',
      'h-16 w-16': size === '2xl',
      'h-20 w-20': size === '3xl',
    }"
  />
</template>
