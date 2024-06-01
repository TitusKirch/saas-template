type AuthLoginForm = {
  email: string;
  password: string;
};
type AuthLoginData = AuthLoginForm;
type AuthLoginResponse = ApiResponse<AuthLoginData>;

type AuthLogoutData = undefined;
type AuthLogoutResponse = ApiResponse<AuthLogoutData>;

type AuthRegisterForm = {
  email: string;
  email_confirm: string;
  password: string;
  password_confirm: string;
};
type AuthRegisterData = Omit<AuthRegisterForm, 'email_confirm' | 'password_confirm'> & {
  name: string;
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

type AuthForgotPasswordForm = {
  email: string;
};
type AuthForgotPasswordData = AuthForgotPasswordForm;
type AuthForgotPasswordResponse = ApiMessageResponse;

type AuthResetPasswordForm = {
  email: string;
  token: string;
  password: string;
  password_confirm: string;
};
type AuthResetPasswordData = Omit<AuthResetPasswordForm, 'password_confirm'> & {
  password_confirmation: string;
};
type AuthResetPasswordResponse = ApiResponse<AuthResetPasswordData>;
