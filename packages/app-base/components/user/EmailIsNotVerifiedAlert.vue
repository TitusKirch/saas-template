<script setup lang="ts">
  const { t } = useI18n();
  const actions = ref([
    {
      key: 'resendVerificationEmail',
      label: t('user.emailIsNotVerifiedAlert.action.resendVerificationEmail.label'),
      color: 'orange',
      loading: false,
      disabled: false,
      click: async () => {
        await resendVerificationEmailAction();
      },
    },
  ]);
  const updateActionByKey = ({
    key,
    action,
  }: {
    key: string;
    action: Partial<(typeof actions.value)[0]>;
  }) => {
    actions.value = actions.value.map((a) => {
      if (a.key === key) {
        return {
          ...a,
          ...action,
        };
      }
      return a;
    });
  };

  const { emailIsVerified, resendVerificationEmail } = useUser();
  const tryAgainInInterval = ref<NodeJS.Timeout | null>(null);
  const tryAgainIn = ref(0);
  const resendVerificationEmailAction = async () => {
    updateActionByKey({
      key: 'resendVerificationEmail',
      action: { loading: true },
    });
    await resendVerificationEmail();

    tryAgainIn.value = 60;
    updateActionByKey({
      key: 'resendVerificationEmail',
      action: {
        loading: false,
        disabled: true,
        label: t('global.tryAgainIn', { count: tryAgainIn.value }),
      },
    });
    tryAgainInInterval.value = setInterval(() => {
      tryAgainIn.value -= 1;
      if (tryAgainIn.value === 0) {
        if (tryAgainInInterval.value) {
          clearInterval(tryAgainInInterval.value);
        }
        updateActionByKey({
          key: 'resendVerificationEmail',
          action: {
            disabled: false,
            label: t('user.emailIsNotVerifiedAlert.action.resendVerificationEmail.label'),
          },
        });
      } else {
        updateActionByKey({
          key: 'resendVerificationEmail',
          action: {
            label: t('global.tryAgainIn', { count: tryAgainIn.value }),
          },
        });
      }
    }, 1000);
  };
  onBeforeUnmount(() => {
    if (tryAgainInInterval.value) {
      clearInterval(tryAgainInInterval.value);
    }
  });
</script>

<template>
  <BaseAlert
    v-if="!emailIsVerified()"
    id="user.emailIsNotVerifiedAlert"
    :title="$t('user.emailIsNotVerifiedAlert.title')"
    type="warning"
    :actions="actions"
  />
</template>
