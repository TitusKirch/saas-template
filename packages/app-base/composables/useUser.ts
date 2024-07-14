import { useUserStore } from '@tituskirch/app-base/stores/user';
import { useAuthStore } from '@tituskirch/app-base/stores/auth';

export default function () {
  // me
  const me = async () => {
    const userStore = useUserStore();
    await userStore.fetchUser();
    return computed(() => {
      return userStore.user;
    });
  };
  const updateMe = ({ data }: { data: Ref<UpdateUsersMeData | undefined> }) => {
    const { put } = useApi();

    return put<UpdateUsersMeData, UpdateUsersMeResponse>('auth/user/profile-information', {
      immediate: false,
      watch: false,
      version: 'v1',
      body: data,
    });
  };
  const updateMeAvatar = ({ data }: { data: Ref<UpdateUsersMeAvatarData | undefined> }) => {
    const { post } = useApi();

    return post<UpdateUsersMeAvatarData, UpdateUsersMeAvatarResponse>('users/me/avatar', {
      immediate: false,
      watch: false,
      setDefaultContentType: false,
      version: 'v1',
      body: data,
    });
  };
  const refetchMe = async () => {
    const userStore = useUserStore();
    await userStore.fetchUser({
      force: true,
    });
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
    const authStore = useAuthStore();
    authStore.reset();
  };
  const emailIsVerified = () => {
    const userStore = useUserStore();
    return userStore.user?.emailVerifiedAt !== null;
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
  const hasPassword = () => {
    const userStore = useUserStore();
    return userStore.user?.has_password ?? false;
  };

  // transformers
  const transformUsersData = ({ data }: { data: UsersData }): User => {
    const { created_at, updated_at, ...rest } = data;
    return {
      ...rest,
      createdAt: new Date(created_at),
      updatedAt: new Date(updated_at),
    };
  };
  const transformUsersMeData = ({ data }: { data: UsersMeData }): UsersMe => {
    const { email_verified_at, two_factor_confirmed_at, created_at, updated_at, ...rest } = data;

    return {
      ...rest,
      emailVerifiedAt: email_verified_at ? new Date(email_verified_at) : null,
      twoFactorConfirmedAt: two_factor_confirmed_at ? new Date(two_factor_confirmed_at) : null,
      createdAt: new Date(created_at),
      updatedAt: new Date(updated_at),
    };
  };

  return {
    me,
    updateMe,
    updateMeAvatar,
    refetchMe,
    reset,
    isAuthenticated,
    emailIsVerified,
    hasPassword,
    logout,
    resendVerificationEmail,
    transformUsersData,
    transformUsersMeData,
  };
}
