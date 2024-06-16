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
    thirdPartyProviders,
  };
}
