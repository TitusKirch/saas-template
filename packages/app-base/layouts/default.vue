<template>
  <div class="h-screen">
    <UHeader
      :ui="{
        logo: 'flex items-center space-x-2 group',
      }"
    >
      <template #logo>
        <UIcon name="i-fa6-solid-fire" class="w-6 text-primary-500 group-hover:text-primary-600" />
        <span>{{ $t('app.name') }}</span>
      </template>

      <template #right>
        <UColorModeButton />

        <NuxtLinkLocale
          :to="{
            name: 'login',
          }"
        >
          <UButton color="gray" variant="ghost" icon="i-fa6-solid-right-to-bracket" />
        </NuxtLinkLocale>
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
