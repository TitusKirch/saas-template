<script setup lang="ts">
  const { t } = useI18n();
  const route = useRoute();
  const actions = ref([
    {
      key: 'navigateToAuthPasswordSet',
      label: t('user.noPasswordAlert.action.navigateToAuthPasswordSet.label'),
      color: 'orange',
      loading: false,
      disabled: false,
      click: () => {
        navigateToLocale({
          name: 'auth-password-set',
          query: {
            redirect: route.fullPath,
          },
        });
      },
    },
  ]);

  const { hasPassword } = useUser();

  const forceShow = computed(() => {
    if (
      route?.name &&
      ((route.name as string).startsWith('settings___') ||
        (route.name as string).startsWith('settings-'))
    ) {
      return true;
    }

    return false;
  });
</script>

<template>
  <BaseAlert
    v-if="!hasPassword()"
    id="user.noPasswordAlert"
    :title="$t('user.noPasswordAlert.title')"
    type="warning"
    :actions="actions"
    :can-be-closed="true"
    :force-show="forceShow"
  />
</template>
