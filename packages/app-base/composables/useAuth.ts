export default function () {
  // registration
  const transformRegisterFormToData = ({ form }: { form: AuthRegisterForm }): AuthRegisterData => {
    return {
      email: form.email,
      name: form.email,
      password: form.password,
      password_confirmation: form.password_confirm,
    };
  };
  const register = ({ data }: { data: AuthRegisterData }) => {
    const { post } = useApi();

    return post<AuthRegisterData, AuthRegisterResponse>('register', {
      immediate: false,
      watch: false,
      prefix: 'auth',
      body: data,
    });
  };

  return {
    transformRegisterFormToData,
    register,
  };
}
