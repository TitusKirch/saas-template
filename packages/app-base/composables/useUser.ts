import { useUserStore } from '@tituskirch/app-base/stores/user';

export default function () {
  // me
  const me = async () => {
    const userStore = useUserStore();
    await userStore.fetchUser();
    return computed(() => {
      return userStore.user;
    });
  };
  const updateMe = ({ data }: { data: Ref<UpdateUserMeData | undefined> }) => {
    const { put } = useApi();

    return put<UpdateUserMeData, UpdateUserMeResponse>('user/profile-information', {
      immediate: false,
      watch: false,
      prefix: 'auth',
      version: false,
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

  // transformers
  const transformUserData = ({ data }: { data: UserData }): User => {
    return {
      ...data,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  };
  const transformUserMeData = ({ data }: { data: UserMeData }): UserMe => {
    return {
      ...data,
      emailVerifiedAt: data.email_verified_at ? new Date(data.email_verified_at) : null,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  };
  const transformUserUpdateMeFormToData = ({
    form,
  }: {
    form: UpdateUserMeForm;
  }): UpdateUserMeData => {
    return {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirm,
    };
  };

  return {
    me,
    updateMe,
    refetchMe,
    reset,
    isAuthenticated,
    emailIsVerified,
    logout,
    resendVerificationEmail,
    transformUserData,
    transformUserMeData,
    transformUserUpdateMeFormToData,
  };
}
