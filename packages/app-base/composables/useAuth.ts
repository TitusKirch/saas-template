import type { LocationQuery } from 'vue-router';

export default function () {
  // login
  const login = ({ data }: { data: Ref<AuthLoginData | undefined> }) => {
    const { post } = useApi();

    return post<AuthLoginData, AuthLoginResponse>('auth/login', {
      immediate: false,
      watch: false,
      version: 'v1',
      body: data,
    });
  };

  // logout
  const logout = () => {
    const { post } = useApi();

    return post<AuthLogoutData, AuthLogoutResponse>('auth/logout', {
      immediate: false,
      watch: false,

      version: 'v1',
    });
  };

  // registration
  const register = ({ data }: { data: Ref<AuthRegisterData | undefined> }) => {
    const { post } = useApi();

    return post<AuthRegisterData, AuthRegisterResponse>('auth/register', {
      immediate: false,
      watch: false,
      version: 'v1',
      body: data,
    });
  };

  // email verification
  const emailVerificationNotification = () => {
    const { post } = useApi();

    return post<AuthEmailVerificationNotificationData, AuthEmailVerificationNotificationResponse>(
      'auth/email/verification-notification',
      {
        immediate: false,
        watch: false,
        version: 'v1',
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
      `auth/email/verify/${path.value.id}/${path.value.hash}`,
      {
        immediate: false,
        watch: false,
        version: 'v1',
        params,
      }
    );
  };

  // forgot password
  const forgotPassword = ({ data }: { data: Ref<AuthForgotPasswordData | undefined> }) => {
    const { post } = useApi();

    return post<AuthForgotPasswordData, AuthForgotPasswordResponse>('auth/forgot-password', {
      immediate: false,
      watch: false,
      version: 'v1',
      body: data,
    });
  };

  // reset password
  const resetPassword = ({ data }: { data: Ref<AuthResetPasswordData | undefined> }) => {
    const { post } = useApi();

    return post<AuthResetPasswordData, AuthResetPasswordResponse>('auth/reset-password', {
      immediate: false,
      watch: false,
      version: 'v1',
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
      'auth/user/confirm-password',
      {
        immediate: false,
        watch: false,
        version: 'v1',
        body: data,
      }
    );
  };
  const userConfirmedPasswordStatus = () => {
    const { get } = useApi();

    return get<AuthUserConfirmedPasswordStatusData, AuthUserConfirmedPasswordStatusResponse>(
      'auth/user/confirmed-password-status',
      {
        immediate: false,
        watch: false,
        version: 'v1',
      }
    );
  };

  // two factor authentication
  const enableTwoFactorAuthentication = () => {
    const { post } = useApi();

    return post<undefined, ApiResponse<undefined>>('auth/user/two-factor-authentication', {
      immediate: false,
      watch: false,
      version: 'v1',
    });
  };
  const disableTwoFactorAuthentication = () => {
    const { delete: del } = useApi();

    return del<undefined, ApiResponse<undefined>>('auth/user/two-factor-authentication', {
      immediate: false,
      watch: false,
      version: 'v1',
    });
  };
  const twoFactorQrCode = () => {
    const { get } = useApi();

    return get<AuthUserTwoFactorQrCodeData, AuthUserTwoFactorQrCodeResponse>(
      'auth/user/two-factor-qr-code',
      {
        immediate: false,
        watch: false,
        version: 'v1',
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
    >('auth/user/confirmed-two-factor-authentication', {
      immediate: false,
      watch: false,
      version: 'v1',
      body: data,
    });
  };
  const twoFactorRecoveryCodes = () => {
    const { get } = useApi();

    return get<AuthUserTwoFactorRecoveryCodesData, AuthUserTwoFactorRecoveryCodesResponse>(
      'auth/user/two-factor-recovery-codes',
      {
        immediate: false,
        watch: false,
        version: 'v1',
      }
    );
  };
  const twoFactorChallenge = ({ data }: { data: Ref<AuthTwoFactorChallengeData | undefined> }) => {
    const { post } = useApi();

    return post<AuthTwoFactorChallengeData, AuthTwoFactorChallengeResponse>(
      'auth/two-factor-challenge',
      {
        immediate: false,
        watch: false,
        version: 'v1',
        body: data,
      }
    );
  };

  // set password
  const setPassword = ({ data }: { data: Ref<AuthSetPasswordData> }) => {
    const { post } = useApi();

    return post<AuthSetPasswordData, AuthSetPasswordResponse>('auth/set-password', {
      immediate: false,
      watch: false,
      version: 'v1',
      body: data,
    });
  };

  // third party providers
  const authProviderRedirect = ({ provider }: { provider: AuthProvider }) => {
    const { get } = useApi();

    return get<undefined, AuthProviderResponse>(`auth/providers/${provider}/redirect`, {
      immediate: false,
      watch: false,
      version: 'v1',
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

    return get<undefined, ApiResponse<undefined>>(`auth/providers/${provider}/callback`, {
      immediate: false,
      watch: false,
      version: 'v1',
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
