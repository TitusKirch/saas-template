import type { FetchOptions } from '@tituskirch/app-base/types/Fetch';
import type { LocationQuery } from 'vue-router';

export default function () {
  // login
  const login = ({
    data,
    options,
  }: {
    data: Ref<AuthLoginData | undefined>;
    options?: FetchOptions<AuthLoginResponse>;
  }) =>
    useApiFetch<AuthLoginData, AuthLoginResponse>('auth/login', {
      method: 'POST',
      body: data,
      ...options,
    });

  // logout
  const logout = ({ options }: { options?: FetchOptions<AuthLogoutResponse> } = {}) =>
    useApiFetch<AuthLogoutData, AuthLogoutResponse>('auth/logout', {
      method: 'POST',
      ...options,
    });

  // registration
  const register = ({
    data,
    options,
  }: {
    data: Ref<AuthRegisterData | undefined>;
    options?: FetchOptions<AuthRegisterResponse>;
  }) =>
    useApiFetch<AuthRegisterData, AuthRegisterResponse>('auth/register', {
      method: 'POST',
      body: data,
    });

  // email verification
  const emailVerificationNotification = ({
    options,
  }: {
    options?: FetchOptions<AuthEmailVerificationNotificationResponse>;
  } = {}) =>
    useApiFetch<AuthEmailVerificationNotificationData, AuthEmailVerificationNotificationResponse>(
      'auth/email/verification-notification',
      {
        method: 'POST',
        ...options,
      }
    );
  const emailVerify = ({
    path,
    params,
    options,
  }: {
    path: Ref<AuthEmailVerifyPath>;
    params: Ref<AuthEmailVerifyParams>;
    options?: FetchOptions<AuthEmailVerifyResponse>;
  }) =>
    useApiFetch<AuthEmailVerifyParams, AuthEmailVerifyResponse>(
      `auth/email/verify/${path.value.id}/${path.value.hash}`,
      {
        params,
        ...options,
      }
    );

  // forgot password
  const forgotPassword = ({
    data,
    options,
  }: {
    data: Ref<AuthForgotPasswordData | undefined>;
    options?: FetchOptions<AuthForgotPasswordResponse>;
  }) =>
    useApiFetch<AuthForgotPasswordData, AuthForgotPasswordResponse>('auth/forgot-password', {
      method: 'POST',
      body: data,
      ...options,
    });

  // reset password
  const resetPassword = ({
    data,
    options,
  }: {
    data: Ref<AuthResetPasswordData | undefined>;
    options?: FetchOptions<AuthResetPasswordResponse>;
  }) =>
    useApiFetch<AuthResetPasswordData, AuthResetPasswordResponse>('auth/reset-password', {
      method: 'POST',
      body: data,
      ...options,
    });

  // user confirm password
  const userConfirmPassword = ({
    data,
    options,
  }: {
    data: Ref<AuthUserConfirmPasswordData | undefined>;
    options?: FetchOptions<AuthUserConfirmPasswordResponse>;
  }) =>
    useApiFetch<AuthUserConfirmPasswordData, AuthUserConfirmPasswordResponse>(
      'auth/user/confirm-password',
      {
        method: 'POST',
        body: data,
        ...options,
      }
    );
  const userConfirmedPasswordStatus = ({
    options,
  }: {
    options?: FetchOptions<AuthUserConfirmedPasswordStatusResponse>;
  } = {}) =>
    useApiFetch<AuthUserConfirmedPasswordStatusData, AuthUserConfirmedPasswordStatusResponse>(
      'auth/user/confirmed-password-status',
      {
        ...options,
      }
    );

  // two factor authentication
  const enableTwoFactorAuthentication = ({
    options,
  }: {
    options?: FetchOptions<ApiResponse<undefined>>;
  } = {}) =>
    useApiFetch<undefined, ApiResponse<undefined>>('auth/user/two-factor-authentication', {
      method: 'POST',
      ...options,
    });
  const disableTwoFactorAuthentication = ({
    options,
  }: {
    options?: FetchOptions<ApiResponse<undefined>>;
  } = {}) =>
    useApiFetch<undefined, ApiResponse<undefined>>('auth/user/two-factor-authentication', {
      method: 'DELETE',
      ...options,
    });
  const twoFactorQrCode = ({
    options,
  }: {
    options?: FetchOptions<AuthUserTwoFactorQrCodeResponse>;
  } = {}) =>
    useApiFetch<AuthUserTwoFactorQrCodeData, AuthUserTwoFactorQrCodeResponse>(
      'auth/user/two-factor-qr-code',
      {
        ...options,
      }
    );
  const confirmedTwoFactorAuthentication = ({
    data,
    options,
  }: {
    data: Ref<AuthUserConfirmedTwoFactorAuthenticationData | undefined>;
    options?: FetchOptions<AuthUserConfirmedTwoFactorAuthenticationResponse>;
  }) =>
    useApiFetch<
      AuthUserConfirmedTwoFactorAuthenticationData,
      AuthUserConfirmedTwoFactorAuthenticationResponse
    >('auth/user/confirmed-two-factor-authentication', {
      method: 'POST',
      body: data,
      ...options,
    });
  const twoFactorRecoveryCodes = ({
    options,
  }: {
    options?: FetchOptions<AuthUserTwoFactorRecoveryCodesResponse>;
  } = {}) =>
    useApiFetch<AuthUserTwoFactorRecoveryCodesData, AuthUserTwoFactorRecoveryCodesResponse>(
      'auth/user/two-factor-recovery-codes',
      {
        ...options,
      }
    );
  const twoFactorChallenge = ({
    data,
    options,
  }: {
    data: Ref<AuthTwoFactorChallengeData | undefined>;
    options?: FetchOptions<AuthTwoFactorChallengeResponse>;
  }) =>
    useApiFetch<AuthTwoFactorChallengeData, AuthTwoFactorChallengeResponse>(
      'auth/two-factor-challenge',
      {
        method: 'POST',
        body: data,
        ...options,
      }
    );

  // set password
  const setPassword = ({
    data,
    options,
  }: {
    data: Ref<AuthSetPasswordData>;
    options?: FetchOptions<AuthSetPasswordResponse>;
  }) =>
    useApiFetch<AuthSetPasswordData, AuthSetPasswordResponse>('auth/set-password', {
      method: 'POST',
      body: data,
      ...options,
    });

  // third party providers
  const authProviderRedirect = ({
    provider,
    options,
  }: {
    provider: AuthProvider;
    options?: FetchOptions<AuthProviderResponse>;
  }) =>
    useApiFetch<undefined, AuthProviderResponse>(`auth/providers/${provider}/redirect`, {
      ...options,
    });
  const authProviderCallback = ({
    provider,
    query,
    options,
  }: {
    provider: AuthProvider;
    query?: LocationQuery;
    options?: FetchOptions<ApiResponse<undefined>>;
  }) =>
    useApiFetch<undefined, ApiResponse<undefined>>(`auth/providers/${provider}/callback`, {
      query,
      ...options,
    });

  // user profile information
  const updateUserProfileInformation = async ({
    data,
    options,
  }: {
    data: Ref<UpdateUserMeData>;
    options?: FetchOptions<UpdateUserMeResponse>;
  }) =>
    useApiFetch<UpdateUserMeData, UpdateUserMeResponse>('auth/user/profile-information', {
      method: 'PUT',
      body: data,
      ...options,
    });

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
    updateUserProfileInformation,
  };
}
