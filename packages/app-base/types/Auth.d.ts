type AuthLoginData = {
  email: string;
  password: string;
  remember?: boolean;
};
type AuthLoginResponse = ApiResponse<
  | AuthLoginData
  | {
      two_factor: boolean;
    }
>;

type AuthLogoutData = undefined;
type AuthLogoutResponse = ApiResponse<AuthLogoutData>;

type AuthRegisterData = {
  first_name: string;
  last_name: string;
  email: string;
  email_confirmation: string;
  password: string;
  password_confirmation: string;
};
type AuthRegisterResponse = ApiResponse<AuthRegisterData>;

type AuthEmailVerificationNotificationData = undefined;
type AuthEmailVerificationNotificationResponse = ApiResponse<AuthEmailVerificationNotificationData>;

type AuthEmailVerifyData = {
  expires: string;
  signature: string;
};
type AuthEmailVerifyResponse = ApiResponse<AuthEmailVerifyData>;

type AuthForgotPasswordData = {
  email: string;
};
type AuthForgotPasswordResponse = ApiMessageResponse;

type AuthResetPasswordData = {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
};
type AuthResetPasswordResponse = ApiResponse<AuthResetPasswordData>;

type AuthUserConfirmPasswordData = {
  password: string;
};
type AuthUserConfirmPasswordResponse = ApiMessageResponse;

type AuthUserConfirmedPasswordStatusData = {
  confirmed: boolean;
};
type AuthUserConfirmedPasswordStatusResponse = ApiResponse<AuthUserConfirmedPasswordStatusData>;

type AuthUserTwoFactorQrCodeData = {
  svg: string;
  url: string;
};
type AuthUserTwoFactorQrCodeResponse = ApiResponse<AuthUserTwoFactorQrCodeData>;

type AuthUserConfirmedTwoFactorAuthenticationData = {
  code: string;
};
type AuthUserConfirmedTwoFactorAuthenticationResponse =
  ApiResponse<AuthUserConfirmedTwoFactorAuthenticationData>;

type AuthUserTwoFactorRecoveryCodesData = string[];
type AuthUserTwoFactorRecoveryCodesResponse = ApiResponse<AuthUserTwoFactorRecoveryCodesData>;

type AuthTwoFactorChallengeType = 'code' | 'recoveryCode';
type AuthTwoFactorChallengeData =
  | {
      code: string;
    }
  | {
      recoveryCode: string;
    };
type AuthTwoFactorChallengeResponse = ApiResponse<AuthTwoFactorChallengeData>;
