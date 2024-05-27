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
