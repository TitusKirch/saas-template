<template>
  <UContainer
    :class="{
      'mt-8': $slots.default,
    }"
    :ui="{
      base: 'grid grid-cols-1 gap-4',
    }"
  >
    <slot />
  </UContainer>
</template>
