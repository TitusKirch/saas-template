import { useUserStore } from '@tituskirch/app-base/stores/user';

export default function () {
  // me
  const me = async () => {
    const userStore = useUserStore();
    await userStore.fetchUser();
    return userStore.user;
  };
  const reset = () => {
    const userStore = useUserStore();
    userStore.resetUser();
  };
  const isAuthenticated = () => {
    const userStore = useUserStore();
    return !!userStore.user;
  };
  const logout = async () => {
    const { logout } = useAuth();
    const { execute } = logout();
    await execute();
    reset();
  };
  const emailIsVerified = () => {
    const userStore = useUserStore();
    return userStore.user?.email_verified_at !== null;
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

  // transformers
  const transformUserData = ({ data }: { data: UserData }): User => {
    return {
      ...data,
      email_verified_at: data.email_verified_at ? new Date(data.email_verified_at) : null,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  };

  return {
    me,
    reset,
    isAuthenticated,
    emailIsVerified,
    logout,
    resendVerificationEmail,
    transformUserData,
  };
}
