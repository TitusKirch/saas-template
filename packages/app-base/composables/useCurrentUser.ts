import { useCurrentUserStore } from '@tituskirch/app-base/stores/currentUser';
import { useAuthStore } from '@tituskirch/app-base/stores/auth';

export default function () {
  // me
  const updateCurrentUser = ({ data }: { data: Ref<UpdateUserMeData | undefined> }) => {
    return useApiFetch<UpdateUserMeData, UpdateUserMeResponse>('auth/user/profile-information', {
      method: 'PUT',
      immediate: false,
      watch: false,
      version: 'v1',
      body: data,
    });
  };

  // general
  const reset = () => {
    const currentUserStore = useCurrentUserStore();
    currentUserStore.reset();
  };
  const logout = async () => {
    const { logout } = useAuth();
    const { execute } = logout();
    await execute();
    reset();
    const authStore = useAuthStore();
    authStore.reset();
  };
  const resendVerificationEmail = async () => {
    const { emailVerificationNotification } = useAuth();
    const { execute } = emailVerificationNotification();
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
    reset,
    updateCurrentUser,
  };
}
