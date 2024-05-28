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

  // registration
  const transformRegisterFormToData = ({ form }: { form: AuthRegisterForm }): AuthRegisterData => {
    return {
      email: form.email,
      name: form.email,
      password: form.password,
      password_confirmation: form.password_confirm,
    };
  };
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
    transformRegisterFormToData,
    register,
    thirdPartyProviders,
  };
}
