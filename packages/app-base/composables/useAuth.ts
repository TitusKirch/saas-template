export default function () {
  // login
  const login = ({ data }: { data: Ref<AuthLoginForm | undefined> }) => {
    const { post } = useApi();

    return post<AuthLoginForm, AuthLoginResponse>('login', {
      immediate: false,
      watch: false,
      prefix: 'auth',
      version: false,
      body: data,
    });
  };

  // logout
  const logout = () => {
    const { post } = useApi();

    return post<AuthLogoutData, AuthLogoutResponse>('logout', {
      immediate: false,
      watch: false,
      prefix: 'auth',
      version: false,
    });
  };

  // registration
  const transformRegisterFormToData = ({ form }: { form: AuthRegisterForm }): AuthRegisterData => {
    return {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      name: form.email,
      password: form.password,
      password_confirmation: form.password_confirm,
    };
  };
  const register = ({ data }: { data: Ref<AuthRegisterData | undefined> }) => {
    const { post } = useApi();

    return post<AuthRegisterData, AuthRegisterResponse>('register', {
      immediate: false,
      watch: false,
      prefix: 'auth',
      version: false,
      body: data,
    });
  };

  // email verification
  const emailVerificationNotification = () => {
    const { post } = useApi();

    return post<AuthEmailVerificationNotificationData, AuthEmailVerificationNotificationResponse>(
      'email/verification-notification',
      {
        immediate: false,
        watch: false,
        prefix: 'auth',
        version: false,
      }
    );
  };
  const emailVerify = ({
    id,
    hash,
    expires,
    signature,
  }: {
    id: string;
    hash: string;
  } & AuthEmailVerifyData) => {
    const { get } = useApi();

    return get<AuthEmailVerifyData, AuthEmailVerifyResponse>(`email/verify/${id}/${hash}`, {
      immediate: false,
      watch: false,
      prefix: 'auth',
      version: false,
      params: {
        expires,
        signature,
      },
    });
  };

  // forgot password
  const forgotPassword = ({ data }: { data: Ref<AuthForgotPasswordForm | undefined> }) => {
    const { post } = useApi();

    return post<AuthForgotPasswordForm, AuthForgotPasswordResponse>('forgot-password', {
      immediate: false,
      watch: false,
      prefix: 'auth',
      version: false,
      body: data,
    });
  };

  // reset password
  const transformResetPasswordFormToData = ({
    form,
  }: {
    form: AuthResetPasswordForm;
  }): AuthResetPasswordData => {
    return {
      email: form.email,
      token: form.token,
      password: form.password,
      password_confirmation: form.password_confirm,
    };
  };
  const resetPassword = ({ data }: { data: Ref<AuthResetPasswordData | undefined> }) => {
    const { post } = useApi();

    return post<AuthResetPasswordData, AuthResetPasswordResponse>('reset-password', {
      immediate: false,
      watch: false,
      prefix: 'auth',
      version: false,
      body: data,
    });
  };

  // user confirm password
  const userConfirmPassword = ({
    data,
  }: {
    data: Ref<AuthUserConfirmPasswordData | undefined>;
  }) => {
    const { post } = useApi();

    return post<AuthUserConfirmPasswordData, AuthUserConfirmPasswordResponse>(
      'user/confirm-password',
      {
        immediate: false,
        watch: false,
        prefix: 'auth',
        version: false,
        body: data,
      }
    );
  };
  const userConfirmedPasswordStatus = () => {
    const { get } = useApi();

    return get<AuthUserConfirmedPasswordStatusData, AuthUserConfirmedPasswordStatusResponse>(
      'user/confirmed-password-status',
      {
        immediate: false,
        watch: false,
        prefix: 'auth',
        version: false,
      }
    );
  };

  // third party providers
  const thirdPartyProviders = () => [
    {
      label: 'Google',
      icon: 'i-fa6-brands-google',
      click: () => {
        alert('Placeholder provider for Google');
      },
    },
    {
      label: 'Facebook',
      icon: 'i-fa6-brands-facebook',
      click: () => {
        alert('Placeholder provider for Facebook');
      },
    },
  ];

  return {
    login,
    logout,
    transformRegisterFormToData,
    register,
    emailVerificationNotification,
    emailVerify,
    forgotPassword,
    transformResetPasswordFormToData,
    resetPassword,
    userConfirmPassword,
    userConfirmedPasswordStatus,
    thirdPartyProviders,
  };
}
