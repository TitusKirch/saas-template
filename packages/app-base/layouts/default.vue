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
          class="text-primary-500 group-hover:text-primary-600 dark:text-primary-400 dark:group-hover:text-primary-500 w-6"
        />
        <span>{{ $t('app.name') }}</span>
      </template>

      <template #right>
        <UColorModeButton />

        <BaseLink
          :to="{
            name: 'auth-logout',
          }"
        >
          <UButton color="gray" variant="ghost" icon="i-fa6-solid-right-to-bracket" />
        </BaseLink>
      </template>
    </UHeader>

    <BaseAlertContainer>
      <UserNoPasswordAlert />
      <UserEmailIsNotVerifiedAlert />
    </BaseAlertContainer>

    <UMain
      :ui="{
        wrapper: 'mt-8',
      }"
    >
      <slot />
    </UMain>
  </div>
</template>
