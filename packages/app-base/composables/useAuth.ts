import type { UseFetchOptions } from '#app'
import type { FetchError } from 'ofetch'

export default function () {
  // request
  const getRequest = ({ path }: { path: string }) => {
    const { getRequest: getApiRequest } = useApi()

    return getApiRequest({
      path: `auth/${path}`,
    })
  }

  // registration
  const register = ({
    input,
    options = {
      immediate: false,
      watch: false,
    },
  }: {
    input: AuthRegisterInput
    options?: UseFetchOptions<AuthRegisterResponse>
  }) => {
    const registerRequest: AuthRegisterRequest = {
      email: input.email,
      name: input.email,
      password: input.password,
      password_confirmation: input.password_confirm,
    }

    const { postData } = useApi()

    return postData<AuthRegisterResponse>(getRequest({ path: 'register' }), {
      body: registerRequest,
    })
  }

  return {
    getRequest,
    register,
  }
}
