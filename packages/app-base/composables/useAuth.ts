export default function () {
  // third party providers
  const { authProviderRedirect } = useApiAuth();
  const authProviders: () => {
    provider: AuthProvider;
    label: string;
    icon: string;
    click: () => void;
  }[] = () => {
    const { t } = useI18n();

    const click = async ({ provider }: { provider: AuthProvider }): Promise<void> => {
      const { execute, data } = authProviderRedirect({
        provider,
        options: {
          immediate: false,
          watch: false,
        },
      });
      await execute();

      if (data.value?.redirect) {
        navigateTo(data.value.redirect, {
          external: true,
        });
      }
    };

    return [
      {
        provider: 'github',
        label: t('auth.provider.github.label'),
        icon: 'i-fa6-brands-github',
        click: async () => {
          await click({ provider: 'github' });
        },
      },
      {
        provider: 'google',
        label: t('auth.provider.google.label'),
        icon: 'i-fa6-brands-google',
        click: async () => {
          await click({ provider: 'google' });
        },
      },
    ];
  };

  return {
    authProviderRedirect,
    authProviders,
  };
}
