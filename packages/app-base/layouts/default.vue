<template>
  <div class="h-screen">
    <UHeader
      :ui="{
        logo: 'flex items-center space-x-2 group',
      }"
    >
      <template #logo>
        <UIcon
          name="i-fa6-solid-fire"
          class="w-6 text-primary-500 group-hover:text-primary-600 dark:bg-text-400 dark:group-hover:bg-text-500"
        />
        <span>{{ $t('app.name') }}</span>
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain
      :ui="{
        wrapper: 'mt-8',
      }"
    >
      <slot />
    </UMain>
  </div>
</template>
