import type { UseFetchOptions } from '#app'

export default function () {
  // request
  const getRequest = ({ path }: { path: string }) => {
    const runtimeConfig = useRuntimeConfig()

    return `${runtimeConfig.public.apiUrl}/auth/${path}`
  }

  const getCsrfToken = async () => {
    const runtimeConfig = useRuntimeConfig()

    const response = await fetch(`${runtimeConfig.public.apiUrl}/sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'include',
    })

    return response
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

    const csrfToken = useCookie('XSRF-TOKEN')

    return useFetch<AuthRegisterResponse>(getRequest({ path: 'register' }), {
      method: 'POST',
      body: JSON.stringify(registerRequest),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-XSRF-TOKEN': csrfToken,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      credentials: 'include',
      ...options,
    })
  }

  return {
    getCsrfToken,
    getRequest,
    register,
  }
}
