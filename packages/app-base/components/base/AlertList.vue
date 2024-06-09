<script setup lang="ts">
  defineProps<{
    items?: Record<string, string> | string[];
  }>();
  defineSlots<{
    item?: HTMLElement;
  }>();
</script>

<template>
  <ul class="list-disc list-outside ml-4">
    <li v-for="(item, key) in items" :key="key">
      <template v-if="$slots.item">
        <slot name="item" :item="item" />
      </template>
      <template v-else>
        {{ item }}
      </template>
    </li>
  </ul>
</template>
