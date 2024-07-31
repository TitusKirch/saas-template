import { useCurrentUserStore } from '@tituskirch/app-base/stores/currentUser';
import { useAuthStore } from '@tituskirch/app-base/stores/auth';

export default function () {
  // general
  const logout = async () => {
    const { logout } = useApiAuth();
    const { execute } = logout({
      options: {
        immediate: false,
        watch: false,
      },
    });
    await execute();
    const currentUserStore = useCurrentUserStore();
    currentUserStore.reset();
    const authStore = useAuthStore();
    authStore.reset();
  };
  const resendVerificationEmail = async () => {
    const { emailVerificationNotification } = useApiAuth();
    const { execute } = emailVerificationNotification({
      options: {
        immediate: false,
        watch: false,
      },
    });
    await execute();

    const { t } = useNuxtApp().$i18n;
    useNotification({
      title: t('user.resendVerificationEmail.notification.success.title'),
      description: t('user.resendVerificationEmail.notification.success.description'),
      type: 'success',
    });
  };

  return {
    logout,
    resendVerificationEmail,
  };
}
