import type { LocationQuery } from 'vue-router';

export default function () {
  // login
  const login = ({ data }: { data: Ref<AuthLoginData | undefined> }) => {
    return useApiFetch<AuthLoginData, AuthLoginResponse>('auth/login', {
      method: 'POST',
      immediate: false,
      watch: false,
      body: data,
    });
  };

  // logout
  const logout = () => {
    return useApiFetch<AuthLogoutData, AuthLogoutResponse>('auth/logout', {
      method: 'POST',
      immediate: false,
      watch: false,
    });
  };

  // registration
  const register = ({ data }: { data: Ref<AuthRegisterData | undefined> }) => {
    return useApiFetch<AuthRegisterData, AuthRegisterResponse>('auth/register', {
      method: 'POST',
      immediate: false,
      watch: false,
      body: data,
    });
  };

  // email verification
  const emailVerificationNotification = () => {
    return useApiFetch<
      AuthEmailVerificationNotificationData,
      AuthEmailVerificationNotificationResponse
    >('auth/email/verification-notification', {
      method: 'POST',
      immediate: false,
      watch: false,
    });
  };
  const emailVerify = ({
    path,
    params,
  }: {
    path: Ref<AuthEmailVerifyPath>;
    params: Ref<AuthEmailVerifyParams>;
  }) => {
    return useApiFetch<AuthEmailVerifyParams, AuthEmailVerifyResponse>(
      `auth/email/verify/${path.value.id}/${path.value.hash}`,
      {
        immediate: false,
        watch: false,
        params,
      }
    );
  };

  // forgot password
  const forgotPassword = ({ data }: { data: Ref<AuthForgotPasswordData | undefined> }) => {
    return useApiFetch<AuthForgotPasswordData, AuthForgotPasswordResponse>('auth/forgot-password', {
      method: 'POST',
      immediate: false,
      watch: false,
      body: data,
    });
  };

  // reset password
  const resetPassword = ({ data }: { data: Ref<AuthResetPasswordData | undefined> }) => {
    return useApiFetch<AuthResetPasswordData, AuthResetPasswordResponse>('auth/reset-password', {
      method: 'POST',
      immediate: false,
      watch: false,
      body: data,
    });
  };

  // user confirm password
  const userConfirmPassword = ({
    data,
  }: {
    data: Ref<AuthUserConfirmPasswordData | undefined>;
  }) => {
    return useApiFetch<AuthUserConfirmPasswordData, AuthUserConfirmPasswordResponse>(
      'auth/user/confirm-password',
      {
        method: 'POST',
        immediate: false,
        watch: false,
        body: data,
      }
    );
  };
  const userConfirmedPasswordStatus = () => {
    return useApiFetch<
      AuthUserConfirmedPasswordStatusData,
      AuthUserConfirmedPasswordStatusResponse
    >('auth/user/confirmed-password-status', {
      immediate: false,
      watch: false,
    });
  };

  // two factor authentication
  const enableTwoFactorAuthentication = () => {
    return useApiFetch<undefined, ApiResponse<undefined>>('auth/user/two-factor-authentication', {
      method: 'POST',
      immediate: false,
      watch: false,
    });
  };
  const disableTwoFactorAuthentication = () => {
    return useApiFetch<undefined, ApiResponse<undefined>>('auth/user/two-factor-authentication', {
      method: 'DELETE',
      immediate: false,
      watch: false,
    });
  };
  const twoFactorQrCode = () => {
    return useApiFetch<AuthUserTwoFactorQrCodeData, AuthUserTwoFactorQrCodeResponse>(
      'auth/user/two-factor-qr-code',
      {
        immediate: false,
        watch: false,
      }
    );
  };
  const confirmedTwoFactorAuthentication = ({
    data,
  }: {
    data: Ref<AuthUserConfirmedTwoFactorAuthenticationData | undefined>;
  }) => {
    return useApiFetch<
      AuthUserConfirmedTwoFactorAuthenticationData,
      AuthUserConfirmedTwoFactorAuthenticationResponse
    >('auth/user/confirmed-two-factor-authentication', {
      method: 'POST',
      immediate: false,
      watch: false,
      body: data,
    });
  };
  const twoFactorRecoveryCodes = () => {
    return useApiFetch<AuthUserTwoFactorRecoveryCodesData, AuthUserTwoFactorRecoveryCodesResponse>(
      'auth/user/two-factor-recovery-codes',
      {
        immediate: false,
        watch: false,
      }
    );
  };
  const twoFactorChallenge = ({ data }: { data: Ref<AuthTwoFactorChallengeData | undefined> }) => {
    return useApiFetch<AuthTwoFactorChallengeData, AuthTwoFactorChallengeResponse>(
      'auth/two-factor-challenge',
      {
        method: 'POST',
        immediate: false,
        watch: false,
        body: data,
      }
    );
  };

  // set password
  const setPassword = ({ data }: { data: Ref<AuthSetPasswordData> }) => {
    return useApiFetch<AuthSetPasswordData, AuthSetPasswordResponse>('auth/set-password', {
      method: 'POST',
      immediate: false,
      watch: false,
      body: data,
    });
  };

  // third party providers
  const authProviderRedirect = ({ provider }: { provider: AuthProvider }) => {
    return useApiFetch<undefined, AuthProviderResponse>(`auth/providers/${provider}/redirect`, {
      immediate: false,
      watch: false,
    });
  };
  const authProviderCallback = ({
    provider,
    query,
  }: {
    provider: AuthProvider;
    query?: LocationQuery;
  }) => {
    return useApiFetch<undefined, ApiResponse<undefined>>(`auth/providers/${provider}/callback`, {
      immediate: false,
      watch: false,
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
