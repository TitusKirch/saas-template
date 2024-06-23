import type { LocationQuery, RouteParams } from 'vue-router';

export default function () {
  // login
  const login = ({ data }: { data: Ref<AuthLoginData | undefined> }) => {
    const { post } = useApi();

    return post<AuthLoginData, AuthLoginResponse>('login', {
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
    path,
    params,
  }: {
    path: Ref<AuthEmailVerifyPath>;
    params: Ref<AuthEmailVerifyParams>;
  }) => {
    const { get } = useApi();

    return get<AuthEmailVerifyParams, AuthEmailVerifyResponse>(
      `email/verify/${path.value.id}/${path.value.hash}`,
      {
        immediate: false,
        watch: false,
        prefix: 'auth',
        version: false,
        params,
      }
    );
  };

  // forgot password
  const forgotPassword = ({ data }: { data: Ref<AuthForgotPasswordData | undefined> }) => {
    const { post } = useApi();

    return post<AuthForgotPasswordData, AuthForgotPasswordResponse>('forgot-password', {
      immediate: false,
      watch: false,
      prefix: 'auth',
      version: false,
      body: data,
    });
  };

  // reset password
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

  // two factor authentication
  const enableTwoFactorAuthentication = () => {
    const { post } = useApi();

    return post<undefined, ApiResponse<undefined>>('user/two-factor-authentication', {
      immediate: false,
      watch: false,
      prefix: 'auth',
      version: false,
    });
  };
  const disableTwoFactorAuthentication = () => {
    const { delete: del } = useApi();

    return del<undefined, ApiResponse<undefined>>('user/two-factor-authentication', {
      immediate: false,
      watch: false,
      prefix: 'auth',
      version: false,
    });
  };
  const twoFactorQrCode = () => {
    const { get } = useApi();

    return get<AuthUserTwoFactorQrCodeData, AuthUserTwoFactorQrCodeResponse>(
      'user/two-factor-qr-code',
      {
        immediate: false,
        watch: false,
        prefix: 'auth',
        version: false,
      }
    );
  };
  const confirmedTwoFactorAuthentication = ({
    data,
  }: {
    data: Ref<AuthUserConfirmedTwoFactorAuthenticationData | undefined>;
  }) => {
    const { post } = useApi();

    return post<
      AuthUserConfirmedTwoFactorAuthenticationData,
      AuthUserConfirmedTwoFactorAuthenticationResponse
    >('user/confirmed-two-factor-authentication', {
      immediate: false,
      watch: false,
      prefix: 'auth',
      version: false,
      body: data,
    });
  };
  const twoFactorRecoveryCodes = () => {
    const { get } = useApi();

    return get<AuthUserTwoFactorRecoveryCodesData, AuthUserTwoFactorRecoveryCodesResponse>(
      'user/two-factor-recovery-codes',
      {
        immediate: false,
        watch: false,
        prefix: 'auth',
        version: false,
      }
    );
  };
  const twoFactorChallenge = ({ data }: { data: Ref<AuthTwoFactorChallengeData | undefined> }) => {
    const { post } = useApi();

    return post<AuthTwoFactorChallengeData, AuthTwoFactorChallengeResponse>(
      'two-factor-challenge',
      {
        immediate: false,
        watch: false,
        prefix: 'auth',
        version: false,
        body: data,
      }
    );
  };

  // set password
  const setPassword = ({ data }: { data: Ref<AuthSetPasswordData> }) => {
    const { post } = useApi();

    return post<AuthSetPasswordData, AuthSetPasswordResponse>('set-password', {
      immediate: false,
      watch: false,
      prefix: 'auth',
      version: false,
      body: data,
    });
  };

  // third party providers
  const authProviderRedirect = ({ provider }: { provider: AuthProvider }) => {
    const { get } = useApi();

    return get<undefined, AuthProviderResponse>(`provider/${provider}`, {
      immediate: false,
      watch: false,
      prefix: 'auth',
      version: false,
    });
  };
  const authProviderCallback = ({
    provider,
    query,
  }: {
    provider: AuthProvider;
    query?: LocationQuery;
  }) => {
    const { get } = useApi();

    return get<undefined, ApiResponse<undefined>>(`provider/${provider}/callback`, {
      immediate: false,
      watch: false,
      prefix: 'auth',
      version: false,
      query,
    });
  };
  const authProviders: () => {
    provider: AuthProvider;
    label: string;
    icon: string;
    click: () => void;
  }[] = () => {
    const { t } = useI18n();

    const click = async ({ provider }: { provider: AuthProvider }): Promise<void> => {
      const { execute, data } = authProviderRedirect({ provider });
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
    login,
    logout,
    register,
    emailVerificationNotification,
    emailVerify,
    forgotPassword,
    resetPassword,
    userConfirmPassword,
    userConfirmedPasswordStatus,
    enableTwoFactorAuthentication,
    disableTwoFactorAuthentication,
    twoFactorQrCode,
    confirmedTwoFactorAuthentication,
    twoFactorRecoveryCodes,
    twoFactorChallenge,
    setPassword,
    authProviderRedirect,
    authProviderCallback,
    authProviders,
  };
}
