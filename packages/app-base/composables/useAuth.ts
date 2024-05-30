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
    transformRegisterFormToData,
    register,
    emailVerificationNotification,
    emailVerify,
    thirdPartyProviders,
  };
}
