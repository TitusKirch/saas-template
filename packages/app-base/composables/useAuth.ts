import type { UseFetchOptions } from '#app';

export default function () {
  // request
  const getRequest = ({ path }: { path: string }) => {
    const { getRequest: getApiRequest } = useApi();

    return getApiRequest({
      path: `auth/${path}`,
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
  const register = ({
    data,
    options = {
      immediate: false,
      watch: false,
    },
  }: {
    data: AuthRegisterData;
    options?: UseFetchOptions<AuthRegisterResponse>;
  }) => {
    const { post } = useApi();

    return post<AuthRegisterData, AuthRegisterResponse>(getRequest({ path: 'register' }), {
      ...options,
      body: data,
    });
  };

  return {
    getRequest,
    transformRegisterFormToData,
    register,
  };
}
