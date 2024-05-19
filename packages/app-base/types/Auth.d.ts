type AuthRegisterForm = {
  email: string;
  password: string;
  password_confirm: string;
};

type AuthRegisterData = Omit<AuthRegisterForm, 'password_confirm'> & {
  name: string;
  password_confirmation: string;
};
type AuthRegisterResponse = ApiResponse;
