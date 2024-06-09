<script setup lang="ts">
  withDefaults(
    defineProps<{
      classes?: string;
    }>(),
    {
      classes: '',
    }
  );
</script>

<template>
  <DevOnly>
    <UCard
      :class="classes"
      :ui="{
        base: 'overflow-hidden',
        body: {
          padding: '!px-0 !pb-0',
        },
      }"
    >
      <template #header>
        <CardHeader
          :title="$t('base.dev.card.header.title')"
          :description="$t('base.dev.card.header.description')"
        >
          <template #beforeActions>
            <UBadge color="red">
              {{ $t('base.dev.card.header.badge.title') }}
            </UBadge>
          </template>
        </CardHeader>
      </template>
      <slot />
    </UCard>
  </DevOnly>
</template>
